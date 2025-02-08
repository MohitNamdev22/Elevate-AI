"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSections from "./_compnents/QuestionsSections";
import RecordAnswerSection from "./_compnents/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();


  const getInterviewDetail = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result && result.length > 0) {
        setMockInterviewQuestion(result[0].jsonMockResp);
        setInterviewData(result[0]);
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    getInterviewDetail();
  }, []);

  useEffect(() => {
    if (pathname) {
      window.parent.postMessage(
        {
          action: "navigate",
          url: `http://localhost:3000${pathname}`,
        },
        "*"
      );
    }
  }, [pathname]);


  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : !mockInterviewQuestion?.questions ? (
        <div>No questions found for this interview.</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <QuestionsSections
              activeQuestionIndex={activeQuestionIndex}
              mockInterViewQuestion={mockInterviewQuestion}
            />
            <RecordAnswerSection
              activeQuestionIndex={activeQuestionIndex}
              mockInterViewQuestion={mockInterviewQuestion}
              interviewData={interviewData}
            />
          </div>

          <div className="flex justify-end gap-6">
            {activeQuestionIndex > 0 && (
              <Button onClick={() => setActiveQuestionIndex((prev) => prev - 1)}>
                Previous Question
              </Button>
            )}

            {activeQuestionIndex < mockInterviewQuestion.questions.length - 1 && (
              <Button onClick={() => setActiveQuestionIndex((prev) => prev + 1)}>
                Next Question
              </Button>
            )}

            {activeQuestionIndex === mockInterviewQuestion.questions.length - 1 && (
              <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                <Button>End Interview</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

      export default StartInterview;