import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './MCQsPage.css';  // Make sure to import the CSS file

const MCQsPage = () => {
  const { state } = useLocation();
  const { mcqs } = state || { mcqs: 'No MCQs generated.' };
  const navigate = useNavigate();

  // Function to go back to the previous page
  const handleBack = () => {
    navigate(-1);  // Go back to the previous page without refreshing the file or state
  };

  return (
    <div className="mcqs-page">
      <h2>Generated MCQs</h2>
      <pre>{mcqs}</pre>

      {/* Back Button */}
      <button className="back-btn" onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default MCQsPage;
