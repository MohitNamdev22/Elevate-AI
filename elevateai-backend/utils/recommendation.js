const axios = require('axios');
const Internship = require('../models/internshipModel');

const API_KEY = process.env.GOOGLE_API_KEY;


const getTopCategoriesAndJobs = async (studentProfile, categories) => {
  const { skills, experience, collegeName, yearOfStudy, certificates, achievements } = studentProfile;

  const prompt = `
    You are an AI assistant specialized in job recommendations. 
    Analyze the given student profile and match it with the provided job categories.

    Student Profile:
    Skills: ${skills.join(', ')}
    Experience: ${experience.map(exp => `${exp.title} at ${exp.company}`).join(', ')}
    College Name: ${collegeName}
    Year of Study: ${yearOfStudy}
    Certificates: ${certificates.join(', ')}
    Achievements: ${achievements}

    Job Categories: ${categories.join(', ')}

    Provide the top 3 job categories that best match the student's profile.
  `;
  console.log(prompt)
  try {
    console.log(API_KEY)
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: API_KEY },
      }
    );

    const analysisText = response.data.candidates[0]?.content?.parts[0]?.text || 'No analysis available';
    console.log(analysisText)
    const topCategories = extractTopCategories(analysisText);

    const topJobs = await getTopJobs(topCategories);

    return { topCategories, topJobs };
  } catch (error) {
    console.error('Error fetching top categories and jobs:', error);
    throw error;
  }
};


const extractTopCategories = (analysisText) => {
  const topCategories = [];
  const lines = analysisText.split('\n');
  let capture = false;

  for (const line of lines) {
    if (line.includes('1.')) {
      capture = true;
    }
    if (capture) {
      const match = line.match(/^\d+\.\s*\*\*(.*?):/);
      if (match) {
        const category = match[1].trim().toLowerCase().replace(/\s+/g, '-');
        topCategories.push(category);
      }
      if (topCategories.length >= 3) break;
    }
  }

  return topCategories;
};


const getTopJobs = async (topCategories) => {
  try {
    console.log(topCategories)
    const jobs = await Internship.find({ category: { $in: topCategories } })
      .sort({ last_updated: -1 })
      .limit(9);

      console.log(jobs)

    return jobs;
  } catch (error) {
    console.error('Error fetching top jobs:', error);
    throw error;
  }
};

module.exports = { getTopCategoriesAndJobs };