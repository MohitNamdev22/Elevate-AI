const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema({
    title: { type: String, default: "N/A" },  //job title
    company: { type: String, default: "N/A" }, //company name
    active: { type: Boolean, default: false },  // true hi dalna hai
    category: { type: String, required: true },  //category
    duration: { type: String, default: "N/A" },    // nhi dalni
    description:{type:String, default: "N/A"}, //description
    last_updated: { type: Date, default: Date.now },  
    link: { type: String, default: "No link" },  // ghar ki link dalegi
    location: { type: String, default: "Online" }, //worklocation
    posted_time: { type: String, default: "N/A" },  // date.now
    source: { type: String, default: "internshala" }, // I have to add manual here
    stipend: { type: String, default: "N/A" } ,// isko change karna hai
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // optional recruiter field
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // array of applicants
});

module.exports = mongoose.model("Internship", InternshipSchema);
