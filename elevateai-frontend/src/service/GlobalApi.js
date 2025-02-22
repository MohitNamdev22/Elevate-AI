export default {
    // Resume Related APIs
    createResume: (data) => fetch('http://localhost:3000/api/resumes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()),
  
    getResumes: (userId) => fetch(`http://localhost:3000/api/resumes?userId=${userId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()),
  
    updateResume: (id, data) => fetch(`http://localhost:3000/api/resumes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()),
  
    generateSummary: (data) => fetch('http://localhost:3000/api/resumes/generate-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
}