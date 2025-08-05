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
       
      </div>
    </div>
  );
}

export default App