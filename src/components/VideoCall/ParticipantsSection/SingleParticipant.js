import React from 'react'

export default function SingleParticipant({identity,lastItem}) {
    console.log("DDDD",identity);
    const getParticipantName=(identity)=>{
        
        return identity.slice(36,identity.length);
    }
    return (
        <>
            <p className="participants_paragraph"> {getParticipantName(identity)}</p>
            {!lastItem && <span className="participants_separator_line"></span>}
        </>
    )
}
