import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close';



const InviteMember = ({ 
    c, 
    index,
    setInvitedMembers,
    invitedMembers,
    handleClose
}) => {

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm()

    useEffect(() => {
      invitedMembers[index].email = watch('email')
      setInvitedMembers([...invitedMembers])
    }, [watch('email')])


    return (
      <div className="mar-bot-10 relative">
        {index > 0 &&
          <div className="close_icon">
            <span onClick={(e) => handleClose(e, index)}>
              <CloseIcon className="svg_icons" />
            </span>
          </div>
        }
        <TextField
          // {...useInput('facilityEmail', { isRequired: true })}
          {...register('email', {
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Please enter a valid email',
            },
          })}
          margin="normal"
          // error={errors.facilityEmail && isSubmit}
          InputProps={{
            className: 'io__text__box',
          }}
        />
        {errors.email && <p className="io__required">{errors.email.message}</p>}
{/* 
        <TextField
          margin="normal"
          key={index}
          value={c.email}
          inputProps={{ className: 'pas__problem__textbox' }}
          onChange={(e) => { updateInviteEmail(e.target.value, index) }}
        /> */}

        {!c.validator &&
          <span className="error"> Invalid mail
          </span>}

      </div>
    )
  }

export default InviteMember