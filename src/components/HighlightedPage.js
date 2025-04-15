import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './HighlightedPage.css';  // Make sure to import the CSS file

const HighlightedPage = () => {
  const { state } = useLocation();
  const { highlightedText } = state || { highlightedText: 'No highlighted text generated.' };
  const navigate = useNavigate();

  // Function to go back to the previous page
  const handleBack = () => {
    navigate(-1);  // Go back to the previous page without refreshing the file or state
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
