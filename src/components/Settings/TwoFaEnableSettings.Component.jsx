import React, { useState, useEffect } from 'react'
import { withStyles } from "@material-ui/core/styles";
import EnableLockIcon from '../../assets/icons/enable_lock.png'
import DisableLockIcon from '../../assets/icons/disable_lock.png'
import ToggleOnIcon from '../../assets/icons/toggle_on.png'
import ToggleOnIcOff from '../../assets/icons/toggle_off.png'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import DisableTwoFaSetting from '../ModelPopup/DisableTwoFaSettingPopup'
import history from '../../history'
import { useDispatch } from 'react-redux'
import { enableTwofa } from '../../redux/actions/commonActions'


const disableModelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    height: 250,
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
    borderRadius: 3,
    p: 3,
}



const TwoFaEnableSettings = props => {
    const {
        enableTwoFa,
        classes,
        setOpenFlash,
        setAlertMsg,
        setSubLabel,
        getMemberDetails,
        setAlertColor
    } = props
    const [twoFaValue, setTwoFaValue] = useState(null)
    const [disableTwoFaPopup, setDisableTwoFaPopup] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setTwoFaValue(enableTwoFa)
    }, [enableTwoFa])

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
            }}
        />
    );

    const closeApproveModel = () => {
        setDisableTwoFaPopup(false)
    }


    const showDisable = (value) => {
        switch(value) {
            case "none":
            case "skipped":
                return false
            default:
            return true
        }
    }


    return (
        <div className="io_p_info_twofa">
            <div className="od__row od_flex_space_between">
                <div className="od__p_title io_pl0">
                    Enable / Disable 2 Factor-Authentication
                    <div className="io_p_info_label">
                        Here you can enable, disable or update your preferred 2FA method
                    </div>
                </div>

            </div>
            <ColoredLine color="#E4E7EC" />
            <div className="od__row_password">
                <div className="od_label_p_twofa" >
                    {showDisable(twoFaValue) ?
                        <img src={EnableLockIcon} alt="" />
                        :
                        <img src={DisableLockIcon} alt="" />
                        
                    }
                    <label>2 Factor-Authentication is:
                        <span className={showDisable(twoFaValue) ? 'io_enable' : 'io_disable'}>
                            {showDisable(twoFaValue) ? 'Enabled' : 'Disabled'}
                        </span>
                    </label>


                </div>
                <div className="od_input_p io-twofa">
                    {showDisable(twoFaValue) ? (
                        
                        <img
                            className="toggle_icon"
                            onClick={() => {
                                setTwoFaValue('disabled')
                                setDisableTwoFaPopup(true)
                            }}
                            src={ToggleOnIcon}
                            alt="upload"
                        />

                    ) : (
                        <img
                            className="toggle_icon"
                            onClick={() => {
                                setTwoFaValue('enabled')
                                history.push('/enable2fa')
                                dispatch(enableTwofa(true))
                            }}
                            src={ToggleOnIcOff}
                            alt="upload"
                        />
                    )}
                </div>
                <Modal
                    open={disableTwoFaPopup}
                    // onClose={setIsAcceptClicked}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={disableModelStyle}>
                        <DisableTwoFaSetting
                            clickCloseButton={closeApproveModel}
                            setOpenFlash={setOpenFlash}
                            setAlertMsg={setAlertMsg}
                            setSubLabel={setSubLabel}
                            setTwoFaValue={setTwoFaValue}
                            getMemberDetails={getMemberDetails}
                            setAlertColor = {setAlertColor}
                        />
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default TwoFaEnableSettings