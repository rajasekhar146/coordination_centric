import Routes from './Routes'
import React from 'react'
import './App.css';
import {useState} from 'react';
import { getTokenFn, onMessageListener } from './firebase';
// import {Button, Row, Col, Toast} from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import eventBus from "./helpers/eventbus";
  // import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  const [notificationList,setNotificationList] = useState([]);
  // getTokenFn(setTokenFound);

  onMessageListener().then(payload => {

    let notifArray = [...notificationList];
    setShow(true);
    setTimeout(() => {
      // setShow(false);
      // setNotificationList([]);
    }, 15000);
    notifArray.unshift({title: payload.notification.title, body: payload.notification.body});
    setNotificationList(notifArray);
    // setNotification({title: payload.notification.title, body: payload.notification.body})


    eventBus.dispatch("notification", {title: payload.notification.title, body: payload.notification.body});
    console.log("12343",payload);
  }).catch(err => console.log('failed: ', err));
const toDisplay =(index)=>{
  
  setTimeout(() => {
    let notificationListTemp =[...notificationList];
    notificationListTemp.splice(index,1);
    setNotificationList(notificationListTemp);
  }, 15000);
  return true;
}
  return (
    <div className="App">
  
      {/* {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
      {!isTokenFound && <h1> Need notification permission ❗️ </h1>} */}
  {show && (
      <div className="notification-popup">
  
    {(notificationList.map((item,index)=>{
      if(toDisplay(index)){
 return <div className="toast" key={item}>
        <div className="toast-header">
          {item.title}
          
          <button onClick={()=>{setShow(false)}} className="close">
            <CloseIcon  />
            </button>
          
        </div>
        <div className="toast-body"></div>
        {item.body}

      </div>
}}))}
</div>
)}
      {' '}
      <Routes />

    </div>
  )
}

export default App
