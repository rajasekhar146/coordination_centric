import React from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './TermsAndConditions.Component.css'


const TermsAndConditionsComponent = () => {
    return (
        <div className="ac__main__div">
    <div className="ac__title__text">T&C and Policies</div>
        <div className="ac__subtitle__text">Please read carefully our terms and conditions and policies to finalize your registration
        </div>
        <div>
          <div className="ac__form">
            <div className="ac__header__text">T&C and Pocicies</div>
            <div className="ac__gap__div"></div>
            <div>
              <div className="ac__row">
              <FormGroup>
              <div className="ac__column">             
                <FormControlLabel control={<Checkbox defaultChecked />} label="I have read and agree with the terms and conditions" />
              </div>
              <div className="ac__column">             
                <FormControlLabel control={<Checkbox defaultChecked />} label="I have read and agree with the Privacy Policy" />
              </div>
              </FormGroup>
              </div>
              <div className="ac__gap__div"></div>
          </div>
        </div>
    </div>
        
    </div>

    )
}

export default TermsAndConditionsComponent