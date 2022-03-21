import React from 'react';
import ParticipantLabel from './ParticipantLabel';
import Participants from './Participants';
import './ParticipantsSection.css';
export default function ParticipantsSection() {
    return (
        <div className="participants_section_container">
            <ParticipantLabel/>
            <Participants/>
        </div>
    )
}
