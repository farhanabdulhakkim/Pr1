import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Top SVG Divider */}
      <div className="custom-shape-divider-top">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,
          82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,
          985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,
          600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>

      <div className="landing-container">
        <h1 className="title">InkBlaze</h1>
        <p className="subtitle">Smart Document Highlighting & Management</p>

        <div className="button-group">
          <a href="https://your-firebase-project.firebaseapp.com/google-signin" className="auth-btn google-btn">
            Sign in with Google
          </a>
          <a href="https://your-firebase-project.firebaseapp.com/phone-signin" className="auth-btn phone-btn">
            Sign in with Mobile Number
          </a>
        </div>

        <a href="/upload">
          <button className="get-started-btn">Skip & Get Started</button>
        </a>
      </div>

      {/* Bottom SVG Wave (Animated) */}
      <div className="custom-shape-divider-bottom">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,100 900,0 1200,100 L1200,0 L0,0 Z" className="shape-fill"></path>
        </svg>
      </div>
    </div>
  );
};

export default LandingPage;
