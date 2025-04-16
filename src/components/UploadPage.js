import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UploadPage.css';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [numQuestions, setNumQuestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showNumQuestionsInput, setShowNumQuestionsInput] = useState(false);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [generateMCQsClicked, setGenerateMCQsClicked] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
      setFileURL(URL.createObjectURL(uploadedFile)); // Create preview URL
      setErrorMessage(null);
      setGenerateMCQsClicked(false);
      setShowNumQuestionsInput(false);
    } else {
      setErrorMessage('Only PDF files are supported.');
    }
  };

  const handleNumQuestionsChange = (e) => {
    setNumQuestions(e.target.value);
  };

  const highlightText = async () => {
    if (!file) {
      setErrorMessage('Please upload a file first.');
      return;
    }

    setIsHighlighting(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/highlight-text', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/highlighted', { state: { highlightedText: response.data.highlighted_text } });
    } catch (error) {
      console.error('Error highlighting text:', error);
      setErrorMessage('Failed to highlight text. Please try again.');
    } finally {
      setIsHighlighting(false);
    }
  };

  const generateMCQs = async () => {
    if (!file) {
      setErrorMessage('Please upload a file first.');
      return;
    }

    if (!numQuestions || numQuestions <= 0) {
      setErrorMessage('Please enter a valid number of questions.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('num_questions', numQuestions);

    try {
      const response = await axios.post('http://127.0.0.1:5000/generate-mcqs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/mcqs', { state: { mcqs: response.data.mcqs } });
    } catch (error) {
      console.error('Error generating MCQs:', error);
      setErrorMessage('Failed to generate MCQs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMCQsClick = () => {
    setGenerateMCQsClicked(true);
    setShowNumQuestionsInput(true);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="upload-page">
      <div className="container">
        <h2>InkBlaze</h2>
        <p className="sub-title">Upload Your PDF and Choose an Action</p>

        <button className="back-btn" onClick={handleBackClick}>
          &larr; Back
        </button>

        <div className="upload-container">
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {fileURL && (
          <div className="pdf-preview">
            <h4>PDF Preview</h4>
            <iframe
              src={fileURL}
              title="PDF Preview"
              width="100%"
              height="500px"
              style={{ border: '1px solid #ccc', borderRadius: '8px' }}
            ></iframe>
          </div>
        )}

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
          {!generateMCQsClicked && (
            <>
              <button
                className="action-btn"
                onClick={highlightText}
                disabled={loading || isHighlighting}
              >
                {loading || isHighlighting ? <div className="spinner"></div> : 'Highlight Text'}
              </button>

              <button
                className="action-btn"
                onClick={handleGenerateMCQsClick}
                disabled={loading || isHighlighting}
              >
                Generate MCQs
              </button>
            </>
          )}

          {showNumQuestionsInput && (
            <button
              className="action-btn"
              onClick={generateMCQs}
              disabled={loading || isHighlighting}
            >
              {loading ? <div className="spinner"></div> : 'Generate Questions'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
