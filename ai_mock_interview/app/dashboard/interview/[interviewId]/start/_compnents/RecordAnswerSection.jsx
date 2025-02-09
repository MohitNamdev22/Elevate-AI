import React, { useEffect, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
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


  const handleUserMediaError = () => {
    setCameraError(true);
  };

  const handleUserMediaSuccess = () => {
    setCameraError(false);
  };



  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => console.log("Camera permission granted"))
      .catch((error) => {
        console.error("Camera permission denied:", error);
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

  console.log(mockInterViewQuestion.questions?.[activeQuestionIndex])
  console.log(activeQuestionIndex)

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
        variant="outline" 
        onClick={StartStopRecording} 
        className="my-10"
      >
        {isRecording ? (
          <h2 className="flex items-center justify-center text-red-600 gap-2">
            <StopCircle />
            Recording...
          </h2>
        ) : (
          <h2 className="flex items-center justify-center gap-2">
            <Mic />
            {loading ? "Processing..." : "Start Recording"}
          </h2>
        )}
      </Button>

      {/* Add submission status */}
      {loading && (
        <div className="text-blue-600 flex items-center gap-2">
          <div className="animate-spin h-4 w-4 border-2 border-blue-600 rounded-full border-t-transparent" />
          Processing your answer...
        </div>
      )}
    </div>
  );
}

export default RecordAnswerSection;
