import React, { useState } from 'react';
import { Editor, EditorProvider, Toolbar, BtnBold, BtnItalic, 
  BtnUnderline, BtnStrikeThrough, BtnNumberedList, BtnBulletList, 
  BtnLink, Separator } from 'react-simple-wysiwyg';
import { FaMagic } from 'react-icons/fa';

const RichTextEditor = ({ value, onChange, onGenerateAI, loading, label = "Summary" }) => {
  const handleChange = (e) => {
    // Preserve HTML formatting in the onChange event
    onChange({
      target: {
        name: e.target.name,
        value: e.target.value
      }
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <button
          type="button"
          onClick={onGenerateAI}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Generating...
            </span>
          ) : (
            <>
              <FaMagic /> Generate with AI
            </>
          )}
        </button>
      </div>
      <EditorProvider>
      <Editor 
          value={value} 
          onChange={handleChange}
          // Add these props to ensure HTML content is preserved
          contentEditable={true}
          name="content"
          className="min-h-[200px] w-full p-2 border rounded-md"
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;