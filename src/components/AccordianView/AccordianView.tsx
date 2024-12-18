/** Accordian view to display the list  in viewport less than 998px*/
/**
 * Based on the selected episode in the state, the detail view is rendered.
 */

import React, { memo } from "react";
import "./accordian.css";
import EpisodeEntry from "../EpisodeEntry/EpisodeEntry"
import DetailView from "../DetailView/DetailView";
import { Episode } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";


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

export default memo(Accordion);
