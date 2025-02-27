import axios from 'axios';

const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

if (!import.meta.env.VITE_GOOGLE_API_KEY) {
  throw new Error('Missing VITE_GOOGLE_API_KEY environment variable');
}

export default {
    // Resume Related APIs
    createResume: (data) =>
      fetch('http://localhost:3000/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json()),
      
  
    getResumes: (userId) =>
      fetch(`http://localhost:3000/api/resumes?userId=${userId}`, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json()),
  
    updateResume: (id, data) =>
      fetch(`http://localhost:3000/api/resumes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json()),
  
    generateSummary: (data) =>
      fetch('http://localhost:3000/api/resumes/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json()),

      generateExperience: async (data) => {
        try {
            const prompt = `Create 3-4 short, impactful bullet points for a ${data.title} position at ${data.companyName}.
            Each bullet point should:
            - Be 10-15 words maximum
            - Include one quantifiable achievement
            - Focus on key responsibilities and impact
            - Start with a strong action verb
    
            Example:
            • Increased user engagement 30% through new feature development
            • Led 5-person engineering team, delivering 3 major projects
            • Reduced system downtime 25% by implementing automated monitoring
    
            Format as plain text with bullet points (•).`;
    
            const response = await axios.post(
                GEMINI_API_URL,
                {
                    contents: [{ parts: [{ text: prompt }] }],
                },
                {
                    headers: { "Content-Type": "application/json" },
                    params: { key: GEMINI_API_KEY },
                }
            );
    
            // Clean up the response text
            let content = response.data.candidates[0].content.parts[0].text;
            
            // Remove HTML tags and clean up formatting
            content = content
                .replace(/<\/?[^>]+(>|$)/g, '') // Remove HTML tags
                .replace(/```/g, '')            // Remove code blocks
                .split('\n')                    // Split into lines
                .filter(line => line.trim())    // Remove empty lines
                .map(line => line.trim())       // Trim whitespace
                .join('\n');                    // Join back with newlines
    
            return { content };
        } catch (error) {
            console.error('Error generating experience:', error);
            throw new Error('Failed to generate experience content');
        }
    }
  };
  