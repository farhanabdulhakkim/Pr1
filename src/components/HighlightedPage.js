import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './HighlightedPage.css';  // Make sure to create a CSS file for styling

const HighlightedPage = () => {
  const { state } = useLocation();
  const { highlightedText } = state || { highlightedText: 'No highlighted text generated.' }; // Get the highlighted text or a default message
  const navigate = useNavigate();  // Initialize navigate hook

  // Function to handle back button click
  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  return (
    <div className="highlighted-page">
      <h2>Highlighted Text</h2>
      <pre>{highlightedText}</pre>

      {/* Back Button */}
      <button className="back-btn" onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default HighlightedPage;
