import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSections({activeQuestionIndex, mockInterViewQuestion}) {
    
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech. Please use Chrome.");
    }
  };

  const questions = mockInterViewQuestion?.questions || [];

   return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-center">
        {questions.map((question, index) => (
          <h2
            key={index}
            className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
              activeQuestionIndex === index && '!bg-primary text-white'
            }`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      
      {questions[activeQuestionIndex] && (
        <>
          <h2 className="my-5 text-sm md:text-lg">
            <strong>Q.</strong> {questions[activeQuestionIndex].question}
          </h2>
          <Volume2
            className="cursor-pointer"
            onClick={() => textToSpeech(questions[activeQuestionIndex].question)}
          />
        </>
      )}

      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center text-blue-700">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="my-2 text-sm text-blue-700">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>
    </div>
  );
}

export default QuestionsSections