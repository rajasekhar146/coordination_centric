import React, { useState } from 'react'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/core/styles'
import RriangleDisable from '../../assets/icons/triangle_disable.png'
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

const DisableTwoFaSetting = props => {
    const {
        setOpenFlash,
        setAlertMsg,
        setSubLabel,
        setTwoFaValue,
        getMemberDetails,
        setAlertColor
    } = props
    const [reason, setReason] = useState(null)

    const handleSubmit = () => {
        const res = organizationService.disableTwoFa()
        res.then(() => {
            getMemberDetails()
            setTwoFaValue('none')
            setOpenFlash(true)
            setAlertMsg('2FA Disabled')
            setSubLabel('The 2FA was successfully disabled from your account.')
            setAlertColor('success')
            // localStorage.removeItem('twoFaVerfied')
            props.clickCloseButton()
        })
    }
    const classes = useStyles()
    return (
        <div className="io__main__div">
            <div className="io__row io__icon">
                <img src={RriangleDisable} alt="Approve Org" />
            </div>
            <div className="io__row io__text__center">
                <label className="io__title">Disable 2Factor-Authentication</label>
            </div>
            <div className="io__row io__text__center io__conform__title_twofa">
                <label>Do you want to disable the 2 Factor-Authentication method from your account?</label>
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
                            Disable
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisableTwoFaSetting
