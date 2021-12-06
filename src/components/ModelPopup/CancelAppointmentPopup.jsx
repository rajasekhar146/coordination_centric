import React, { useState, useEffect } from 'react'
import '../InviteOrganization/InviteOrganization.Component.css'
import './ApproveModel.Component.css'
import Button from '@mui/material/Button'
import ResendCalender from '../../assets/icons/resend_calender.png'
import { appointmentService } from '../../services'
import get from 'lodash.get'
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import ReScheduleIcon from '../../assets/icons/reject_org.png'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import history from '../../history'


const CancelAppointment = props => {
    const {
        clickCloseButton,
    } = props

    const [isChecked, setIsChecked] = useState(true)


    const handleReSchedule = async () => {
        history.push('reschedule_appointment')
    }



    return (
        <div className="io_reschedule">
            <div className="io__row io__icon">
                <img src={ReScheduleIcon} alt="Approve Org" />
            </div>
            <div className="io__row io__text__center io_width_50">
                <label className="io__title">
                    Appointment Canceling Terms & Conditions
                </label>
            </div>
            <div className="io__row io__text__center width_80">
                <label className="io__head_info">
                    Please read carefuly and accept this terms before canceling your appointment.

                </label>
            </div>
            <div className="io__row io_info_label">
                <label>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum tellus lorem
                    libero, nisl. Justo, elementum id adipiscing diam blandit. Dignissim purus
                    aliquet ut nisl. Volutpat auctor urna, tristique id elementum ut curabitur.
                    Egestas semper sem posuere ac lobortis urna arcu felis. Nisi ut id lacus hendrerit
                    viverra eleifend mauris ipsum. Massa, aliquam urna faucibus ac et. Dui nibh nisl pharetra, est pulvinar. Aenean purus in mollis sollicitudin vitae. Eget sagittis quis eu amet donec. Nullam cum sed orci magnis cras. Mi viverra sem vitae condimentum curabitur varius pharetra.
                </label>
            </div>
            <div className="io__row">
                <FormGroup>
                    <div className="ac__column">
                        <label className="container">
                            <span className="io_terms_conditions">
                                I agree to cancel the appointment and I am aware of the Coordination
                                 Centric Terms & Conditions.
                            </span>

                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                    setIsChecked(e.target.checked)
                                }}

                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>

                </FormGroup>
            </div>

            <div className="io__row io__btn io_width97">
                <div className="io__same__line">
                    <div className="io__cancel">
                        <Button className="io__cancel__btn" onClick={clickCloseButton}>
                            Back
                        </Button>
                    </div>
                    <div className="io__approve">
                        <Button type="submit" className={isChecked ? 'io__Approve__btn' : 'io__disable__btn'}
                            onClick={handleReSchedule}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CancelAppointment
