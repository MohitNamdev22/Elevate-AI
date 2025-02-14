const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title: { type: String, default: "N/A" },
    active: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now },
    link: { type: String, default: "No link" },
    social_links: {
        twitter: { type: String, default: "" }
    },
    source: { type: String, default: "internshala" },
    status: { type: String, default: "Open" },
    status_tags: { type: [String], default: [] }
});

module.exports = mongoose.model("Hackathon", JobSchema);
