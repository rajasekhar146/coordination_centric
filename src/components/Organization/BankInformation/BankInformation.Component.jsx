import React from 'react'
import './BankInformation.Component.css'
import TextField from '@mui/material/TextField'

const BankInformationComponent = () => {
  return (
    <div className="bi__main__div">
      <div className="bi__title__text">Banking Information</div>
      <div className="bi__subtitle__text">
        This is optional at this point, if you don’t want to fill it right know you can skip this step.
      </div>
      <div>
        <div className="bi__form">
          <div className="bi__header__text">Organization Banking Info</div>
          <div>
            <div className="bi__row">
              <div className="bi__column">
                <div className="bi__label">
                  Routing Number <span className="ac__required">*</span>
                </div>
                <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
              </div>

              <div className="bi__column">
                <div className="bi__label">
                  Name Associated with Bank Account <span className="ac__required">*</span>
                </div>
                <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
              </div>

              <div className="bi__column">
                <div className="bi__label">
                  Phone Number <span className="ac__required">*</span>
                </div>
                <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
              </div>
            </div>
          </div>

          <div className="ac__gap__div"></div>
        </div>
      </div>
    </div>
  )
}

export default BankInformationComponent
