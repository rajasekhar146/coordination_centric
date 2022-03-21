import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/core/styles'
import MemberInviteIcon from '../../assets/icons/member_invite.png'
import { organizationService } from '../../services'
import history from '../../history'
import CloseIcon from '../../assets/icons/close.png'

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

const InvitePatientSuccess = props => {
    const { selectedOrg, 
        clickCloseButton,
        getPatientRecords
    } = props

    const handleSubmit = () => {
        clickCloseButton()
        getPatientRecords()
    }
    const classes = useStyles()
    return (
        <div className="io__main__div">
            <div className="io__row io__icon">

                <img width="200" src={MemberInviteIcon} alt="TwoFaImg" />
            </div>
            <div className="io__row io__icon">
                <div className="io_enter_label">
                    <label>Invite Sent Successfully</label>
                </div>
                <div>
                    <label>
                    The patient will receive an email to access this medical record.
                    </label>
                </div>
            </div>
            <div className="io__conform">
                <div style={{ textAlign: "center" }}>
                    <Button onClick={handleSubmit} type="submit" className="io__done__btn">
                        Done
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InvitePatientSuccess
