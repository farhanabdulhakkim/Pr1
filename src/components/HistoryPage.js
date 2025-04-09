import React, { useState } from 'react';
import './HistoryPage.css'; // Separate CSS for this component

const HistoryPage = () => {
  const [history] = useState([
    { fileName: 'file1.pdf', type: 'highlighted', content: 'Highlighted content for file 1' },
    { fileName: 'file2.pdf', type: 'mcqs', content: 'MCQs generated for file 2' },
  ]);

  return (
    <div className="history-page">
      <h2>My File History</h2>
      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <h3>{item.fileName}</h3>
            <p>{item.type}: {item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
