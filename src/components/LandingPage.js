import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Separate CSS for this component

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1 className="title">InkBlaze</h1>
      <Link to="/upload">
        <button className="get-started-btn">Get Started</button>
      </Link>
    </div>
  );
};

export default LandingPage;
