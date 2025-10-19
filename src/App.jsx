import React from 'react';
import ReactDOM from 'react-dom/client';
import LiquidChrome from "./LiquidChrome";
// import the userNavigate hook
// used to let you programatically navigate to another route after a button is
import { useNavigate } from "react-router-dom";
import MagicCard from './MagicCardEffect';
import './styles/magicCardEffect.css';
import HomepageTextEffect from "./HomepageTextEffect";
import StatisticsSection from './StatisticsSection';
import SearchBar from './SearchBar';

function App() {

const navigate = useNavigate();
  return (
    <div className="home-bg">
      {/* Liquid Chrome Background Effect */}
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
        <div className="hero-content" >
        <div className="hero-logo">🧬</div>
        <HomepageTextEffect
          text="Gene Sphere"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-2xl mb-8 hero-title"
        />
        <h2 className="hero-sub">Explore Cancer Genomics Data</h2>
      <div className="hero-cards-container">
      <StatisticsSection />
      <div>
        <SearchBar />
      </div>
      <div className="hero-cards">
        <MagicCard
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </div>
      
    </div>
    </div>
    </div>
  );
}

export default App