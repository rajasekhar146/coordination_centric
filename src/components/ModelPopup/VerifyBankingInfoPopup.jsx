import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import React, { useEffect, useState, useMemo } from 'react'


const VerifyBankingInfoPopup = props => {
    
const firstDepositHandle = (e) =>{
        props.setFirstDepositErr(false)
        props.setFirstDeposit(e.target.value)
}
const secondDepositHandle = (e) =>{
        props.setSecondDepositErr(false)
        props.setSecondDeposit(e.target.value)
}
    return (
        <div className="verify_bank_info"> 
        <h3>Verify Bank account</h3>
        <span>stripe sent two small deposits to this bank account. To verify this account please confirm the amounts of these deposits</span>
        <div className="pas__row pas__height">
        <div className="pas__problem__txtbox__section">
          <TextField
            margin="normal"
            placeholder="e.g. First deposit"
            inputProps={{ className: 'pas__problem__textbox' }}
            onChange={firstDepositHandle}
          />
        </div>
      </div>
      {props.firstDepositErr && <span className="reason_error">First Deposit is required</span>}

      <div className="pas__row pas__height ">
        <div className="pas__problem__txtbox__section mar-top-10">
          <TextField
            margin="normal"
            placeholder="e.g. Second deposit"
            inputProps={{ className: 'pas__problem__textbox' }}
            onChange={secondDepositHandle}
          />
        </div>
      </div>
      {props.secondDepositErr && <span className="reason_error">Second Deposit is required</span>}
      <p >*Please use 32 and 45 as primary and secondary deposit respectively for testing purpose.</p>
      <p>*Giving invalid data for three times concurrently, will block the bank verification process</p>


      <div className="pas__row mar-top-15">
        <div className="io__cancel">
          <Button className="io__cancel__btn" onClick={props.clickCloseButton} >
            Back
          </Button>
        </div>
        <div className="io__approve">
          <Button className="io__Approve__btn" onClick={props.clickSubmitButton}>
            Submit
          </Button>
        </div>
      </div>
    </div>
    )
}
export default VerifyBankingInfoPopup
