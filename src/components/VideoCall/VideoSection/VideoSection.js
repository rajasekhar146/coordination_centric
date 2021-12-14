import React, {useState} from 'react';
import store from '../../../redux/store';
import Videos from './Videos';

export default function VideoSection({room,setRoom}) {
    return (
        <div className="video_section_container">
          
            <Videos room={room} setRoom={setRoom}/>
        </div>
    )
}
