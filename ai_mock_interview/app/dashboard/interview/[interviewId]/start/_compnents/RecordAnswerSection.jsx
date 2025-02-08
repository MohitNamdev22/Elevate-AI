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
      setUserAnswer((prev) => prev + results.map((res) => res.transcript).join(" "));
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
      const feedbackPrompt = `Question: ${mockInterViewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}...`;
      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp = result.response.text().replace(/```json|```/g, "");
      const feedbackResponse = JSON.parse(mockJsonResp);

      await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterViewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterViewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: feedbackResponse.feedback,
        rating: feedbackResponse.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
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

      <Button disabled={loading} variant="outline" onClick={StartStopRecording} className="my-10">
        {isRecording ? (
          <h2 className="flex items-center justify-center text-red-600 gap-2">
            <StopCircle />
            Recording...
          </h2>
        ) : (
          <h2 className="flex items-center justify-center gap-2">
            <Mic />
            Start Recording
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
