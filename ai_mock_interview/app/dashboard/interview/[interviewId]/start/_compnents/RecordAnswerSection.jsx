'use client';
import React, { useEffect, useState, useRef } from "react";

import Image from "next/image";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection({ activeQuestionIndex, mockInterViewQuestion, interviewData }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const { user } = useUser();
  const [transcribedText, setTranscribedText] = useState("");
  const webcamRef = useRef(null); // Added reference for the webcam
  const [modelsLoaded, setModelsLoaded] = useState(false); // Added to track model loading
  const [referenceDescriptor, setReferenceDescriptor] = useState(null); // Store reference face descriptor

  // Function to capture reference image and create face descriptor
  const captureReferenceImage = async () => {
    if (!webcamRef.current || !webcamRef.current.video) return;
    const video = webcamRef.current.video;
    const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

    if (detections) {
      setReferenceDescriptor(detections.descriptor);
      toast("Reference face captured successfully.");
    } else {
      toast("No face detected for reference. Please ensure your face is clearly visible.");
    }
  };

  // Function to handle face recognition and comparison
 // Function to handle face recognition and comparison using FaceMatcher
const runFaceRecognition = async () => {
  if (!webcamRef.current || !webcamRef.current.video || !referenceDescriptor) return;

  const video = webcamRef.current.video;

  // Detect face in the video stream for recognition
  const singleResult = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

  if (!singleResult) {
    toast("No face detected. Please ensure your face is visible.");
    return;
  }

  // If reference descriptor exists, create a FaceMatcher
  if (referenceDescriptor) {
    const labeledDescriptors = [
      new faceapi.LabeledFaceDescriptors("Reference User", [referenceDescriptor])
    ];
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7);

    // Find the best match for the current face descriptor
    const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor);

    // Check if the label matches "Reference User"
    if (bestMatch.label === "Reference User") {
      toast("Face verified successfully.");
    } else {
      toast(`Invalid user detected! Match: ${bestMatch.toString()}`);
    }
  }
};


  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; // Replace with the path to your models folder
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ]);
        setModelsLoaded(true);
        toast("Models loaded successfully!");
      } catch (error) {
        console.error("Error loading face-api models:", error);
        toast("Failed to load models.");
      }
    };

    if (typeof window !== 'undefined') {
      loadModels();
    }
  }, []);


  const handleUserMediaError = () => {
    setCameraError(true);
  };

  const handleUserMediaSuccess = () => {
    setCameraError(false);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })  // Added "audio: true"
      .then(() => console.log("Camera and microphone permission granted"))
      .catch((error) => {
        console.error("Camera or microphone permission denied:", error);
        setCameraError(true);
      });
  }, []);

  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({ continuous: true, useLegacyResults: false });

  useEffect(() => {
    if (error) {
      toast(error);
    }
  }, [error]);

  useEffect(() => {
    if (results.length > 0) {
      const newText = results.map((res) => res.transcript).join(" ");
      setUserAnswer((prev) => prev + newText);
      setTranscribedText(newText);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswerInDb();
    }
  }, [isRecording, userAnswer]);

  const UpdateUserAnswerInDb = async () => {
    try {
      setLoading(true);
      const currentQuestion = mockInterViewQuestion.questions?.[activeQuestionIndex];
    
      if (!currentQuestion?.question || !userAnswer) {
        throw new Error("Missing required question or answer data");
      }

      const feedbackPrompt = `Generate feedback in JSON format for the following interview response:
      Question: ${currentQuestion.question}
      Answer: ${userAnswer}
      
      Return response in this exact format:
      {
        "feedback": "detailed feedback here",
        "rating": number between 1-10
      }`;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const rawResponse = await result.response.text();

      let feedbackResponse;

      try {
        const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
        feedbackResponse = jsonMatch 
          ? JSON.parse(jsonMatch[0])
          : {
              feedback: "Unable to generate detailed feedback at this time.",
              rating: 5
            };
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError);
        feedbackResponse = {
          feedback: "Unable to generate detailed feedback at this time.",
          rating: 5
        };
      }

      await db.insert(UserAnswer).values({
        mockIdRef: interviewData.mockId,
        question: currentQuestion.question,
        correctAns: currentQuestion.answer || "No model answer provided",
        userAns: userAnswer,
        feedback: feedbackResponse.feedback || "No feedback available",
        rating: parseInt(feedbackResponse.rating) || 5,
        userEmail: user?.primaryEmailAddress?.emailAddress || "anonymous",
        createdAt: moment().format("DD-MM-YYYY")
      });

      toast("User Answer recorded successfully!");
      setUserAnswer("");
      setResults([]);
    } catch (err) {
      console.error("Error saving answer:", err);
      toast("Failed to save user answer.");
    } finally {
      setLoading(false);
    }
  };

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  // Run face recognition every 5 seconds if models are loaded and webcam is active
  useEffect(() => {
    if (modelsLoaded && webcamRef.current && referenceDescriptor) {
      const interval = setInterval(runFaceRecognition, 5000);
      return () => clearInterval(interval);
    }
  }, [modelsLoaded, referenceDescriptor]);

  if (!mockInterViewQuestion.questions?.[activeQuestionIndex]) {
    return <div>No active question found. Please check.</div>;
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        {cameraError ? (
          <p className="text-white">
            Please enable camera permissions in your browser to continue.
          </p>
        ) : (
          <>
            <Image
              src={"/webcam.png"}
              width={200}
              height={200}
              className="absolute"
              alt="Webcam background"
            />
            <Webcam
              ref={webcamRef}
              mirrored={true}
              style={{
                height: "50vh",
                width: "100%",
                zIndex: 10,
              }}
              onUserMediaError={handleUserMediaError}
              onUserMedia={handleUserMediaSuccess}
            />
          </>
        )}
      </div>

      <Button
        disabled={loading}
        variant="outline"
        onClick={captureReferenceImage} // Added to capture reference image
        className="my-4"
      >
        Capture Reference Face
      </Button>

      <div className="w-full max-w-2xl mt-5">
        {isRecording && (
          <div className="bg-gray-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-red-600 font-medium">Recording in progress...</span>
            </div>
            <p className="text-gray-700">{transcribedText || "Speak now..."}</p>
          </div>
        )}

        {!isRecording && userAnswer && (
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-medium mb-2">Your recorded answer:</h3>
            <p className="text-gray-700">{userAnswer}</p>
          </div>
        )}
      </div>

      <Button
        disabled={loading}
        variant={isRecording ? "destructive" : "default"}
        className="my-4"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <>
            <StopCircle className="mr-2 h-4 w-4" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="mr-2 h-4 w-4" />
            Start Recording
          </>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
