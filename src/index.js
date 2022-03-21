import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'
import store from './redux/store'
import AplicationPopup from '../src/PopupModal/AplicationPopup';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     <AplicationPopup/> 
    </Provider>
  </React.StrictMode>,
  document.getElementById('popup-portal-wrp')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
