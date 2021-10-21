import React, { useState } from 'react'
import './Dashboard.Component.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/core/styles'
import TwoFaImg from '../../assets/icons/TowFaAuthentication.png'
import { organizationService } from '../../services'
import history from '../../history'

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
    background: '#FFFFFF',
    borderRadius: 12,
  },
  input: {
    color: '#838486',
    height: '44px',
  },
}))

const TwoFaModel = props => {
  const { selectedOrg } = props

  const handleOK = () => {
    props.clickCloseButton()
    history.push('/enable2fa')
  }
  const classes = useStyles()
  return (
    <div>
      <div className="io__row io__icon">
        <img width="200" src={TwoFaImg} alt="TwoFaImg" />
      </div>
      <div className="io__row io__icon">
        <h5>Two-Facto Authentication</h5>
        <label>would you like to activate the 2 Factor-Authentication</label>
      </div>
      <div className="io__conform">
        <div className="io__same__line">
          <div className="io__skip">
            <Button className="io__skip__btn" onClick={props.clickCloseButton}>
              Skip
            </Button>
          </div>
          <div className="io__ok">
            <Button type="submit" className="io__Approve__btn" onClick={handleOK}>
              Yes, activate now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwoFaModel
