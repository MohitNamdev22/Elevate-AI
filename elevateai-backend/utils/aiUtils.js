const axios = require('axios');

async function generateSummary(jobTitle, experience, skills) {
    try {
        const prompt = `Create a professional resume summary for a ${jobTitle} position.
        Experience: ${experience}
        Skills: ${skills.join(', ')}
        
        Please provide a concise, professional summary (2-3 sentences) highlighting the experience and skills that would be most relevant for this position.`;

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