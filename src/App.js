import Routes from './Routes'
import React from 'react'
import './App.css';
import {useState} from 'react';
import { getTokenFn, onMessageListener } from './firebase';
import {Button, Row, Col, Toast} from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import eventBus from "./helpers/eventbus";
  // import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  // getTokenFn(setTokenFound);

  onMessageListener().then(payload => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    eventBus.dispatch("notification", {title: payload.notification.title, body: payload.notification.body});
    console.log("12343",payload);
  }).catch(err => console.log('failed: ', err));

  return (
    <div className="App">
  
      {/* {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
      {!isTokenFound && <h1> Need notification permission ❗️ </h1>} */}
  {show && (
 <div className="toast">
        <div className="toast-header">
          {notification.title}
          
          <Button onClick={()=>{setShow(false)}} className="close">
            <CloseIcon  />
            </Button>
          
        </div>
        <div className="toast-body"></div>
        {notification.body}

      </div>

)}
      {' '}
      <Routes />

    </div>
  )
}

export default App
