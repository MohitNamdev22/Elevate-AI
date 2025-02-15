import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import { FaTrash, FaPlus, FaMagic, FaGripVertical, FaFilePdf, FaSave } from "react-icons/fa";
import { Document, Packer, Paragraph, TextRun } from "docx";
import jsPDF from "jspdf";

// Template sections with default content
const defaultSections = [
  {
    id: "personal",
    title: "Personal Information",
    content: "DANIELLE BRASSEUR\n4567 8th Avenue, Carson City, NV 10111 | (313) 555-0100 | danielle@example.com | www.linkedin.com"
  },
  {
    id: "summary",
    title: "Professional Summary",
    content: "Dynamic and detail-oriented professional with expertise in [Your Field] and comprehensive experience. Known for delivering top-notch strategic solutions and fostering business growth through effective collaboration and ownership mentality."
  },
  {
    id: "education",
    title: "Education",
    content: "**Bachelor of Science in [Your Major]** | [University Name]\nDegree obtained [Month Year]\n- GPA: [X.XX]\n- Relevant coursework: [Course 1], [Course 2]"
  },
  {
    id: "experience",
    title: "Experience",
    content: "**[Job Title]** | [Company Name] | [Location]\n[Start Date] – [End Date]\n- [Key Achievement or Responsibility 1]\n- [Key Achievement or Responsibility 2]\n- [Key Achievement or Responsibility 3]"
  },
  {
    id: "skills",
    title: "Skills",
    content: "- Technical Skill 1\n- Technical Skill 2\n- Soft Skill 1\n- Soft Skill 2\n- Language or Certification"
  }
];

const ResumeBuilder = () => {
  const [sections, setSections] = useState(defaultSections);
  const [selectedSection, setSelectedSection] = useState(defaultSections[0]);
  const [aiLoading, setAiLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [editingTitle, setEditingTitle] = useState(null);


  // Handle drag-and-drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSections(items);
    // Force preview update
    setTimeout(() => {
      const preview = document.getElementById('resume-preview');
      if (preview) {
        preview.style.opacity = '0.99';
        setTimeout(() => {
          preview.style.opacity = '1';
        }, 0);
      }
    }, 0);
  };

  const SectionListItem = ({ section, index }) => {
    return (
      <Draggable key={section.id} draggableId={section.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer ${
              selectedSection.id === section.id
                ? "bg-blue-50 border border-blue-200"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => setSelectedSection(section)}
          >
            <div className="flex items-center flex-1">
              <FaGripVertical className="mr-2 text-gray-400" />
              {editingTitle === section.id ? (
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                  onBlur={() => setEditingTitle(null)}
                  onKeyPress={(e) => e.key === 'Enter' && setEditingTitle(null)}
                  className="flex-1 px-2 py-1 border rounded"
                  autoFocus
                />
              ) : (
                <span
                  onDoubleClick={() => setEditingTitle(section.id)}
                  className="flex-1"
                >
                  {section.title}
                </span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeSection(section.id);
              }}
              className="text-gray-400 hover:text-red-500 ml-2"
            >
              <FaTrash size={14} />
            </button>
          </div>
        )}
      </Draggable>
    );
  };

  // Update section content
  const updateContent = (content) => {
    const updatedSections = sections.map((section) =>
      section.id === selectedSection.id ? { ...section, content } : section
    );
    setSections(updatedSections);
    setSelectedSection((prev) => ({ ...prev, content }));
  };

  const updateSectionTitle = (id, newTitle) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, title: newTitle } : section
    );
    setSections(updatedSections);
    setEditingTitle(null);
  };

  const enhanceWithAI = async () => {
    try {
      setAiLoading(true);
      const prompt = `Enhance the following resume section professionally while maintaining its original meaning. Ensure the content remains concise, impactful, and achievement-oriented. Format it strictly using Markdown for readability, avoiding unnecessary bold symbols or redundant headings.\n\nContent:\n${selectedSection.content}\n\nOutput Markdown Format Guidelines:\n- Do not repeat the section heading.\n- Use bullet points for clarity where applicable.\n- Avoid excessive bold or italic formatting unless necessary for emphasis.\n- Ensure readability and consistency in Markdown.`;



      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
          params: { key: import.meta.env.VITE_GOOGLE_API_KEY },
        }
      );

      const enhancedText = response.data.candidates[0].content.parts[0].text;
      updateContent(enhancedText);
    } catch (error) {
      console.error("AI Enhancement failed:", error);
      alert("AI enhancement failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  // Add new section
  const addSection = (type = "custom") => {
    const newId = `section-${Date.now()}`;
    const newSection = {
      id: newId,
      title: "New Section",
      content: "## New Section\nAdd your content here"
    };
    setSections([...sections, newSection]);
    setSelectedSection(newSection);
  };

  // Remove section
  const removeSection = (id) => {
    if (sections.length <= 1) return;
    const filteredSections = sections.filter((section) => section.id !== id);
    setSections(filteredSections);
    setSelectedSection(filteredSections[0]);
  };

  

  // Resume Template Component
  const ResumeTemplate = () => {
    return (
      <div className="w-full max-w-[21cm] mx-auto bg-white p-8 text-gray-800" style={{ fontSize: '11pt' }}>
        {/* Sections with updated styles */}
        <style jsx global>{`
          .resume-section h1 { font-size: 16pt; }
          .resume-section h2 { font-size: 14pt; }
          .resume-section p { font-size: 11pt; }
          .resume-section ul { font-size: 11pt; }
        `}</style>
        
        {sections.map(section => (
          <div key={section.id} className="resume-section mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 mb-3">
              {section.title.toUpperCase()}
            </h2>
            <ReactMarkdown 
              className="prose max-w-none"
              remarkPlugins={[remarkGfm]}
            >
              {section.content}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    );
  };

  // Export resume
  const exportResume = async (format = "pdf") => {
    try {
      setExportLoading(true);
      
      if (format === "pdf") {
        const pdf = new jsPDF({
          unit: 'pt',
          format: 'a4',
          orientation: 'portrait'
        });
  
        // Set default font sizes
        const fontSizes = {
          header: 16,
          subheader: 14,
          normal: 11,
          small: 10
        };
  
        // Set margins
        const margin = {
          top: 40,
          left: 40,
          right: 40,
          bottom: 40
        };
  
        // Calculate usable width
        const pageWidth = pdf.internal.pageSize.width;
        const maxWidth = pageWidth - margin.left - margin.right;
  
        let currentY = margin.top;
  
        // Helper function to add text with proper wrapping
        const addWrappedText = (text, fontSize, isBold = false) => {
          pdf.setFontSize(fontSize);
          pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
          
          const lines = pdf.splitTextToSize(text, maxWidth);
          lines.forEach(line => {
            if (currentY > pdf.internal.pageSize.height - margin.bottom) {
              pdf.addPage();
              currentY = margin.top;
            }
            pdf.text(line, margin.left, currentY);
            currentY += fontSize * 1.5;
          });
          currentY += fontSize * 0.5; // Add spacing after paragraph
        };
  
        // Process each section
        sections.forEach(section => {
          // Add section title
          addWrappedText(section.title.toUpperCase(), fontSizes.header, true);
          currentY += 10; // Space after title
  
          // Process content with Markdown formatting
          const lines = section.content.split('\n');
          lines.forEach(line => {
            if (line.trim() === '') {
              currentY += fontSizes.normal;
              return;
            }
  
            // Handle different markdown elements
            if (line.startsWith('##')) {
              addWrappedText(line.replace('##', '').trim(), fontSizes.subheader, true);
            } else if (line.startsWith('**')) {
              addWrappedText(line.replace(/\*\*/g, ''), fontSizes.normal, true);
            } else if (line.trim().startsWith('-')) {
              pdf.setFontSize(fontSizes.normal);
              const bulletText = '• ' + line.substring(1).trim();
              addWrappedText(bulletText, fontSizes.normal, false);
              currentY -= 5; // Reduce space after bullet points
            } else {
              addWrappedText(line, fontSizes.normal, false);
            }
          });
  
          currentY += 20; // Space between sections
        });
  
        pdf.save("resume.pdf");
      } else if (format === "docx") {
        // Create a new Document
        const doc = new Document({
          sections: [{
            properties: {},
            children: sections.map(section => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: section.title.toUpperCase(),
                    bold: true,
                    size: 28 // 14pt
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: section.content,
                    size: 22 // 11pt
                  })
                ]
              })
            ]).flat()
          }]
        });
  
        // Save document
        const blob = await Packer.toBlob(doc);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume.docx';
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    } finally {
      setExportLoading(false);
    }
  };

  

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sections Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        <div className="mb-4">
          <button
            onClick={() => addSection()}
            className="w-full flex items-center justify-between px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Add Section</span>
            <FaPlus className="ml-2" />
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections-list">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-1 overflow-y-auto"
              >
                {sections.map((section, index) => (
                  <SectionListItem 
                    key={section.id} 
                    section={section} 
                    index={index} 
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Editor Panel */}
      <div className="flex-1 p-6 border-r border-gray-200">
      <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{selectedSection?.title || "Select a Section"}</h2>
          <button
            onClick={enhanceWithAI}
            disabled={aiLoading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaMagic className="mr-2" />
            {aiLoading ? "Enhancing..." : "Enhance with AI"}
          </button>
        </div>

        <textarea
          value={selectedSection?.content || ""}
          onChange={(e) => updateContent(e.target.value)}
          className="w-full h-[calc(100vh-180px)] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Write your content here..."
        />
      </div>

      {/* Preview Panel */}
      <div className="w-[600px] bg-white p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Resume Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={() => exportResume("pdf")}
              disabled={exportLoading}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
              title="Export as PDF"
            >
              <FaFilePdf size={18} />
            </button>
            <button
              onClick={() => exportResume("docx")}
              disabled={exportLoading}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
              title="Save as Word"
            >
              <FaSave size={18} />
            </button>
          </div>
        </div>

        <div 
          id="resume-preview" 
          className="w-full bg-white"
          style={{ minHeight: '1056px' }} // A4 height in pixels
        >
          <ResumeTemplate />
        </div>
      </div>

    </div>
  );
};

export default ResumeBuilder;