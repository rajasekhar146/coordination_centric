import React, { useState } from 'react'
import './Dashboard.Component.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/core/styles'
import TwoFaImg from '../../assets/icons/TowFaAuthentication.png'
import { organizationService } from '../../services'
import history from '../../history'
import CloseIcon from '../../assets/icons/close.png'
import { useDispatch } from 'react-redux'
import { setCompleteProfile } from '../../redux/actions/commonActions'


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

const CompleateProfile = props => {
    const {
        userId,
        setIsOpenCompleateProfile
    } = props
    const classes = useStyles()
    const dispatch = useDispatch()
    return (
        <div>
            <div className="io__row io__icon">

                <img width="200" src={TwoFaImg} alt="TwoFaImg" />
            </div>
            <div className="io__row io__icon">
                <h3>Complete your profile</h3>
                <label>
                    Please complete your professional information to acccess
                    all the functionalities of our platform.
                </label>
            </div>
            <div className="io__complete">
                <div style={{ textAlign: "center" }}>
                    <Button
                        onClick={() => {
                            history.push(`/settings/${userId}`)
                            setIsOpenCompleateProfile(false)
                            dispatch(setCompleteProfile(false))
                        }}
                        type="submit" className="io__done__btn">
                        Complete Profile
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default CompleateProfile
