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

const MemberInviteSuccess = props => {
    const { selectedOrg, clickCloseButton } = props

    const handleOK = () => {
        //props.clickCloseButton()
        history.push('/enable2fa')
    }
    const classes = useStyles()
    return (
        <div className="io__main__div">
            <div className="io__row io__icon">

                <img width="200" src={MemberInviteIcon} alt="TwoFaImg" />
            </div>
            <div className="io__row io__icon">
                <h5>Invite Sent Successfully</h5>
                <label>The staff member will receive an invitation by email to join your organization.</label>
            </div>
            <div className="io__conform">
                <div className="io__same__line">
                    <div className="io__skip">
                        <Button className="io__skip__btn" onClick={clickCloseButton}>
                            Done
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberInviteSuccess
