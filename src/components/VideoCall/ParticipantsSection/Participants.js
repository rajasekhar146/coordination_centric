import React from 'react'
import SingleParticipant from './SingleParticipant';
import { connect } from "react-redux";
const Participants =({participants})=>{
  console.log("Here is ", participants)
    return (
        <div className="participants_container">
        {participants.map((participant, index) => {
          return (
            <SingleParticipant
              key={participant.identity}
              identity={participant.identity}
              lastItem={participants.length === index + 1}
            />
          );
        })}
      </div>
    )
}
const mapStoreStateToProps = (state) => {
    return {
      ...state.videoCallReducer,
    };
  };
  
  export default connect(mapStoreStateToProps)(Participants);