import React, { useState, useEffect } from 'react'
import ProblemAndSymptomIcon from '../../assets/icons/problem_symptons.png'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const ProblemAndSymptomsComponent = props => {
  const [invitedMembers, setInvitedMembers] = useState([])
  const handleAddMembers = () => {
    console.log('Clicked')
    var members = invitedMembers
    const newMember = {
      email: '',
    }
    members.push(newMember)
    console.log('members', members)
    setInvitedMembers(members)
  }

  useEffect(() => {
    var members = {
      email: '',
    }
    setInvitedMembers([members])
  }, [])
  return (
    <div className="pas__main__div">
      <div className="pas__row">
        <div className="pca__center__align">
          <div>
            <img src={ProblemAndSymptomIcon} alt="Approve Org" />
          </div>
        </div>
      </div>
      <div className="pas__row pas__height">
        <div className="pas__title">What do you feel?</div>
      </div>
      <div className="pas__row pas__height">
        <div className="pas__help__title">Please help us understand why you want to make this appointment.</div>
      </div>
      <div className="pas__row pas__height">
        <div className="pas__problem__label">What’s your medical problem or symptoms?*</div>
      </div>
      <div className="pas__row pas__height">
        <div className="pas__problem__txtbox__section">
          <TextField
            margin="normal"
            placeholder="e.g. Feel pain in my chest"
            inputProps={{ className: 'pas__problem__textbox' }}
          />
        </div>
      </div>
      <div className="pas__row">
        <div className="pas__problem__label">Do you want to invite someone to join the appointment?</div>
      </div>
      <div className="pas__row pas__height">
        {invitedMembers.map(im => (
          <div className="pas__problem__txtbox__section" key={im.email}>
            <TextField margin="normal" inputProps={{ className: 'pas__problem__textbox' }} />
          </div>
        ))}
      </div>
      <div className="pas__row">
        <div className="pas__invite__button">
          <Button onClick={handleAddMembers}>+ &nbsp;Invite more people</Button>
        </div>
      </div>

      <div className="pas__row">
        <div className="pas__problem__label">Supporting Documents</div>
      </div>

      <div className="pas__row">
        <div className="pas__invite__button">
          <Button>+ &nbsp;Add Supporting Documents (optional)</Button>
        </div>
      </div>

      <div className="pas__row">
        <div className="io__cancel">
          <Button className="io__cancel__btn" onClick={props.clickBackButton}>
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

export default ProblemAndSymptomsComponent
