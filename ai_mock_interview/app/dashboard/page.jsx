import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import Interviewlist from './_components/Interviewlist'

function Dashboard() {
  
  return (
    <div>
      <h2 className='font-bold text-2xl'>ElevateAI: AI Mock Interview</h2>
      <h2 className='text-gray-500 my-2 text-xl'>Create and Start your AI Mock Interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 my-8'>
        <AddNewInterview/>
      </div>
      {/* Previous Interview list */}
      <Interviewlist/>
    </div>
  )
}

export default Dashboard