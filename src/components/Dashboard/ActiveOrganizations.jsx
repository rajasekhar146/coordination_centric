import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { withStyles } from "@material-ui/core/styles";
import MedicalKit from '../../assets/icons/medical_kit.png'
import get from 'lodash.get'


const styles = theme => ({
    superAdminCard: {
        background: "#FFFFFF",
        width: "31%",
        margin: 10,
        boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)',
        borderRadius: '8px'
    },
    memberCard: {
        background: "#FFFFFF",
        width: "22%",
        margin: 10,
        boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)',
        borderRadius: '8px'
    },
    content: {
        display: 'flex',
        paddingBottom: '15px'
    }
});
const ActiveOrganizations = (props) => {
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
                return get(dashboardDetails, ['activeOrganization'], 0)
                break
            case 'superadmin':
                return get(dashboardDetails, ['0', 'totals', 'activeOrganization'], 0)
                break
            case 'admin':
                return get(dashboardDetails, ['0', 'totals', 'activeOrganization'], 0)
        }
    }
    
    return (
        <Card
        classes={{ root: checkDoctorOrPatent() ? classes.memberCard : classes.superAdminCard }}
            sx={{
                background: '#fff',
                boxShadow: '0 2px 4px #00000029',
                borderRadius: '4px',
            }}
        >
            <CardContent className={classes.content}>
                <div>
                    <img style={{ marginTop: '5px' }} width="30" height="28" src={MedicalKit} alt="user_icon" />
                </div>
                <div className="db_stats_label_fields">
                    <label className="db_stats_label">
                        Active Organizations
                    </label>
                    <label className="db_stats_value">{getValue()}</label>
                </div>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(ActiveOrganizations)