import React, { useState } from "react";
import "./accordian.css";
import EpisodeEntry from "../EpisodeEntry/EpisodeEntry"
import DetailView from "../DetailView/DetailView";
import { Episode } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";

interface AccordionProps {
  episode: Episode; 
}

const Accordion = ({ episode }:AccordionProps) => {
  const {selected} = useSelector((state:RootState)=>state.episodes)
  
  return (
    <div className="accordion-wrapper">
      <div className="header">
        <EpisodeEntry data={episode} />
      </div>

      {selected?.episode_id === episode.episode_id && (
        <div className="content">
          <DetailView />
        </div>
      )}
    </div>
  );
};

export default Accordion;
