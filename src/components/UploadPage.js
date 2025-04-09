import React, { useState } from 'react';
import axios from 'axios';
import './UploadPage.css';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState(""); // Changed to allow any number
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showNumQuestionsInput, setShowNumQuestionsInput] = useState(false); // To toggle input visibility

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage(null); // Reset error when a new file is selected
  };

  const handleNumQuestionsChange = (e) => {
    setNumQuestions(e.target.value); // Change the number of questions based on user input
  };

  const highlightText = async () => {
    if (!file) {
      setErrorMessage('Please upload a PDF file first.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/highlight-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponseData(response.data.highlighted_text);
    } catch (error) {
      console.error('Error highlighting text:', error);
      setErrorMessage('Failed to highlight text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateMCQs = async () => {
    if (!file) {
      setErrorMessage('Please upload a PDF file first.');
      return;
    }

    if (!numQuestions || numQuestions <= 0) {
      setErrorMessage('Please enter a valid number of questions.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('num_questions', numQuestions); // Send the user input number of questions

    try {
      const response = await axios.post('http://127.0.0.1:5000/generate-mcqs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponseData(response.data.mcqs);
    } catch (error) {
      console.error('Error generating MCQs:', error);
      setErrorMessage('Failed to generate MCQs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMCQsClick = () => {
    setShowNumQuestionsInput(true); // Show input only when user clicks "Generate MCQs"
  };

  return (
    <div className="upload-page">
      <div className="container">
        <h2>InkBlaze</h2>
        <p className="sub-title">Upload Your PDF and Choose an Action</p>

        <div className="upload-container">
          <input type="file" onChange={handleFileChange} />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Show number of questions input only when the "Generate MCQs" button is clicked */}
        {showNumQuestionsInput && (
          <div className="questions-container">
            <label htmlFor="numQuestions">Number of Questions:</label>
            <input
              type="number"
              id="numQuestions"
              value={numQuestions}
              onChange={handleNumQuestionsChange}
              min="1"
              placeholder="Enter number of questions"
            />
          </div>
        )}

        <div className="buttons-container">
          <button
            className="action-btn"
            onClick={highlightText}
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : 'Highlight Text'}
          </button>

          <button
            className="action-btn"
            onClick={handleGenerateMCQsClick} // Ask for number of questions when clicked
            disabled={loading}
          >
            Generate MCQs
          </button>

          {showNumQuestionsInput && (
            <button
              className="action-btn"
              onClick={generateMCQs} // Now calls the MCQ generation process
              disabled={loading}
            >
              {loading ? <div className="spinner"></div> : 'Generate Questions'}
            </button>
          )}
        </div>

        <div className="response">
          {responseData && (
            <div>
              <h3>Response:</h3>
              <pre>{responseData}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
