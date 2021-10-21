import React, { useState } from 'react'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/core/styles'
import RejectOrgIcon from '../../assets/icons/reject_org.png'
import { organizationService } from '../../services'

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

const RejectModel = props => {
  const { selectedOrg } = props

  const handleSubmit = () => {
    const res = organizationService.updateOrganization(selectedOrg._id, 'declined')
    res.then(() => {
      props.clickCloseButton()
    })
  }
  const classes = useStyles()
  return (
    <div className="io__main__div">
      <div className="io__row io__icon">
        <img src={RejectOrgIcon} alt="Approve Org" />
      </div>
      <div className="io__row io__text__center">
        <label className="io__title">Reject Organisation</label>
      </div>
      <div className="io__row io__text__center io__conform__title">
        <label>Are you sure you want to reject this organisation?</label>
      </div>

      <div className="io__row io_input">
        <div className="io__reason__label">reason (Optional)</div>
        <TextField
          margin="normal"
          type="text"
          placeholder={'e.g. Website design'}
          className={classes.textField}
          InputProps={{
            className: classes.input,
          }}
        />
      </div>

      <div className="io__row io__btn">
        <div className="io__same__line">
          <div className="io__cancel">
            <Button className="io__cancel__btn" onClick={props.clickCloseButton}>
              Close
            </Button>
          </div>
          <div className="io__approve">
            <Button type="submit" className="io__Approve__btn" onClick={handleSubmit}>
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RejectModel
