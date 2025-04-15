import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './MCQsPage.css';

const MCQsPage = () => {
  const { state } = useLocation();
  const { mcqs } = state || { mcqs: 'No MCQs generated.' };
  const navigate = useNavigate();  // Initialize navigate hook

  // Function to handle back button click
  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
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
