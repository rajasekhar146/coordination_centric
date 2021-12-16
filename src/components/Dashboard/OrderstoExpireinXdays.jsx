import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { withStyles } from "@material-ui/core/styles";
import MedicalKit from '../../assets/icons/medical_kit.png'

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
const OrderstoExpireinXdays = (props) => {
    const {
        classes,
        checkDoctorOrPatent
    } = props


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
                        Orders to Expire in X days
                    </label>
                    <label className="db_stats_value">153</label>
                </div>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(OrderstoExpireinXdays)