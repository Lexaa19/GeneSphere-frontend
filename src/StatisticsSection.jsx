import React from "react";
import {FaVial, FaUser, FaDna} from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";
import { DiStreamline } from "react-icons/di";
import  "./styles/statisticsSection.css";

export default function StatisticsSection(){
  return (
  <section className="stats-section">
    <div className="stats-actions">
      <button className="stats-btn">
        <GiSpellBook className="stats-icon" />
        Browse studies
      </button>
       <button className="stats-btn">
        <DiStreamline className="stats-icon" />
        Start Query
      </button>
    </div>
  </section>
  );
}
