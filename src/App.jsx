import './App.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import LiquidChrome from "./LiquidChrome";
import { useNavigate } from "react-router-dom";

function App() {
const navigate = useNavigate();

  return (
    <div className="home-bg">
      {/* Liquid Chrome Effect */}
    <div className="liquidchrome-bg">
      <LiquidChrome
        baseColor={[0.8, 0.75, 0.95]}
        speed={0.7}
        amplitude={0.22}
        interactive={true}
      />
    </div>
      {/* Overlay for readability */}
      <div className="homepage-overlay"></div>
        <div className="hero-content" style={{ position: "relative", zIndex: 2 }}>

        <div className="hero-logo">🧬</div>
        <h1 className="hero-title">GeneCore</h1>
        <h2 className="hero-sub">Advanced Genetics Platform</h2>
        <div className="hero-desc">
          Explore, analyze, and visualize genetic data with cutting-edge tools.
        </div>
        <div className="hero-cards">
          <div className="hero-card">
            <div className="card-icon">📊</div>
            <div className="card-title">Dashboard</div>
            <div className="card-desc">Overview of your genetic metrics</div>
            <button className="card-btn" onClick={() => navigate("/dashboard")}>Go</button>
          </div>
          <div className="hero-card">
            <div className="card-icon">🗂️</div>
            <div className="card-title">Gene Database</div>
            <div className="card-desc">Browse and search gene profiles</div>
            <button className="card-btn" onClick={() => navigate("/database")}>Go</button>
          </div>
          <div className="hero-card">
            <div className="card-icon">🧪</div>
            <div className="card-title">Analysis</div>
            <div className="card-desc">Run advanced genetic analyses</div>
            <button className="card-btn" onClick={() => navigate("/analysis")}>Go</button>
          </div>
          <div className="hero-card">
            <div className="card-icon">📄</div>
            <div className="card-title">Reports</div>
            <div className="card-desc">View and export analysis reports</div>
            <button className="card-btn" onClick={() => navigate("/reports")}>Go</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App