import React, { useState } from 'react'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/core/styles'
import ApproveOrg from '../../assets/icons/approve_org.png'
import CloneIcon from '../../assets/icons/clone.png'
import { organizationService } from '../../services'

const useStyles = makeStyles(theme => ({
    textField: {
        width: '90%',
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

const SharePatientRecord = props => {
    const { selectedOrg, setSkip, setOrganizations, setOpenFlash, setAlertMsg, setSubLabel } = props
    const [reason, setReason] = useState(null)

    const handleSubmit = () => {
        const res = organizationService.updateOrganization(selectedOrg.id, 'declined', reason)
        res.then(() => {
            setOrganizations([])
            setSkip(0)
            setOpenFlash(true)
            setAlertMsg('Rejected')
            setSubLabel('This account was successfully rejected, and is now disabled.')
            props.clickCloseButton()
        })
    }
    const classes = useStyles()
    return (
        <div className="io__main__div">
            <div className="io__row">
                <img src={ApproveOrg} alt="Approve Org" />
            </div>
            <div className="io__row">
                <label className="io__title">Share this Record</label>
            </div>
            <div className="io__row io__text__center io__conform__title">
                <label> </label>
            </div>

            <div style={{ position: "relative"}} className="io__row io_input">
                <div className="io__share__label">Share link</div>
                <TextField
                    margin="normal"
                    type="text"
                    onChange={(e) => {
                        setReason(e.target.value)
                    }}
                    // placeholder={'e.g. Website design'}
                    className={classes.textField}
                    InputProps={{
                        className: classes.input,
                    }}
                />
                <img className="io_clone" src={CloneIcon} alt="Approve Org" />
            </div>

            <div className="io__row io__btn">
                <div className="io__same__line">
                    <div className="io__cancel">
                        <Button className="io__cancel__btn" onClick={props.clickCloseButton}>
                            Cancel
                        </Button>
                    </div>
                    <div className="io__approve">
                        <Button type="submit" className="io__Approve__btn" onClick={handleSubmit}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SharePatientRecord
