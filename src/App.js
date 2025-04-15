import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import './App.css';
import LandingPage from './components/LandingPage';
import UploadPage from './components/UploadPage';
import HistoryPage from './components/HistoryPage';
import HighlightedPage from './components/HighlightedPage';  // Import HighlightedPage
import MCQsPage from './components/MCQsPage';  // Import MCQsPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/highlighted" element={<HighlightedPage />} />  {/* Highlighted Page */}
        <Route path="/mcqs" element={<MCQsPage />} />  {/* MCQs Page */}
      </Routes>
    </Router>
  );
};

export default App;
