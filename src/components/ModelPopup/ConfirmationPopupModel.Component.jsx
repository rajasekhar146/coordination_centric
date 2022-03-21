import React, { useState } from 'react'
import Button from '@mui/material/Button'
import history from '../../history';
const ConfirmationPopupModel = props=> {
    return (
        <div className="gn__main__div">
        <div className="gn__row">
          <div className="gn__column gn__title mar-bot-10">Confirmation?</div>
        </div>
  
        <div className="gn__row">
          <div className=" gn__sub__title">
            The data you have entered will be lost. Are you sure you want quit?
        </div>
        </div>
        <div className="gn__row">
          <div style={{ marginTop: '30px' }} className="gn__same__line">
            <div>
              <Button className="gn__close__btn" onClick={props.closeScreen}>
                Cancel
              </Button>
            </div>
            <div>
              <Button type="submit" onClick={()=>{
                  history.push(props.url)
              }} className="gn__submit__btn" type="submit">
                Okay 
              </Button>
            </div>
          </div>
        </div>
      
      </div>
    )

}

export default ConfirmationPopupModel;