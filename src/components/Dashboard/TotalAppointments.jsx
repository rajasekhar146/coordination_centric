import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { withStyles } from "@material-ui/core/styles";
import AppointmentsIcon from '../../assets/icons/appointments.png'
import get from 'lodash.get'

const styles = theme => ({
    card: {
        background: "#FFFFFF",
        width: "30%",
        margin: 10,
        boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)',
        borderRadius: '8px'
    },
    content: {
        display: 'flex',
        paddingBottom: '15px'
    }
});

const TotalAppointments = (props) => {
    const {
        classes,
        checkDoctorOrPatent,
        dashboardDetails,
        role
    } = props

    const getValue = () => {
        switch (role) {
            case 'doctor':
            case 'patient':
                return get(dashboardDetails, ['totalAppointmentCount'], '')
                break
            case 'superadmin':
                return get(dashboardDetails, ['0', 'totals', 'totalAppointments'], '')
                break
            case 'admin':
                return get(dashboardDetails, ['0', 'totals', 'totalAppointments'], '')
        }
    }

    return (
        <Card
            classes={{ root: classes.card }}
            sx={{
                background: '#fff',
                boxShadow: '0 2px 4px #00000029',
                borderRadius: '4px',
            }}
        >
            <CardContent className={classes.content}>
                <div>
                    <img style={{ marginTop: '5px' }} width="30" height="28" src={AppointmentsIcon} alt="user_icon" />
                </div>
                <div className="db_stats_label_fields">
                    <label className="db_stats_label">
                        Total Appointments
                    </label>
                    <label className="db_stats_value">{getValue()}</label>
                </div>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(TotalAppointments)