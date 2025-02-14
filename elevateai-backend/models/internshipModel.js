const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema({
    title: { type: String, default: "N/A" },
    company: { type: String, default: "N/A" },
    active: { type: Boolean, default: false },
    category: { type: String, required: true },
    duration: { type: String, default: "N/A" },
    last_updated: { type: Date, default: Date.now },
    link: { type: String, default: "No link" },
    location: { type: String, default: "Online" },
    posted_time: { type: String, default: "N/A" },
    source: { type: String, default: "internshala" },
    stipend: { type: String, default: "N/A" }
});

module.exports = mongoose.model("Internship", InternshipSchema);
