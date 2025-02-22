const axios = require('axios');

async function generateSummary(jobTitle, experience, skills) {
    try {
        const prompt = `Create 3 different professional resume summaries for a ${jobTitle} position.
    
    Please provide 3 different professional summaries (2-3 sentences each) in an array format JSON data. Each summary should highlight different aspects of the experience and skills while maintaining a professional tone. The summaries should be ready to use without any placeholder information.`;

        

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
            {
                contents: [{ parts: [{ text: prompt }] }],
            },
            {
                headers: { "Content-Type": "application/json" },
                params: { key: process.env.GOOGLE_API_KEY },
            }
        );

        // Extract the generated text from Gemini's response
        const generatedText = response.data.candidates[0].content.parts[0].text;
        return generatedText.trim();
    } catch (error) {
        console.error('Error generating AI summary:', error);
        throw new Error('Failed to generate AI summary');
    }
}

module.exports = {
    generateSummary
};