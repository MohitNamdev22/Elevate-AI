"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      const userEmail = user.primaryEmailAddress.emailAddress;
      
      // Store email in localStorage
      localStorage.setItem('userEmail', userEmail);
      
      // Encode email for URL safety
      const encodedEmail = encodeURIComponent(userEmail);
      
      // Redirect to student dashboard with email parameter
      window.location.href = `https://elevate-ai-xi.vercel.app/student/dashboard?email=${encodedEmail}`;
    }
  }, [user, isLoaded]);

  const sanitizeJSON = (rawJSON) => {
    try {
      let cleanedJSON = rawJSON.replace(/```json/g, '').replace(/```/g, '').trim();
      return cleanedJSON.replace(/\\(?=")/g, '');
    } catch (error) {
      console.error("Error sanitizing JSON:", error);
      return rawJSON;
    }
  };

  const onSubmit = async (e) => {
    try {
      
      setLoading(true);
      e.preventDefault();

      const InputPromt = `Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION} interview questions and answers in JSON format based on the following: Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Only return the JSON, without any additional text.`;
      
      const result = await chatSession.sendMessage(InputPromt);
      const MockJsonResp = sanitizeJSON(await result.response.text());
      
      // Validate JSON before inserting
      const parsedJson = JSON.parse(MockJsonResp);

      // Insert into database
      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: MockJsonResp,
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress || "default-email",
        createdAt: moment().format("DD-MM-YYYY")
      }).returning();

      if (resp && resp[0]) {
        router.push(`/dashboard/interview/${resp[0].mockId}`);
        setOpenDialog(false);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      // Handle error appropriately - you might want to show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg hover:scale-105 hover:shadow-md cursor-pointer transition-all delay-100"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add new</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, Job description
                    and years of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      value={jobPosition}
                      onChange={(event) => setJobPosition(event.target.value)}
                      placeholder="Ex. Full Stack Developer"
                      required
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Job Description/Tech Stack (In Short)</label>
                    <Textarea
                      value={jobDesc}
                      onChange={(event) => setJobDesc(event.target.value)}
                      placeholder="Ex. React, Angular, NodeJs, NextJs etc."
                      required
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Years of experience</label>
                    <Input
                      value={jobExperience}
                      onChange={(event) => setJobExperience(event.target.value)}
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;