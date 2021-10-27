import React, { useEffect, useState } from 'react'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    alert: {
        width: '300px',

    }
}))



const AlertMui = React.forwardRef(function Alert(props, ref) {
    const classes = useStyles()
    return <MuiAlert className={classes.alert} elevation={6} ref={ref} variant="filled" {...props} />;
});



const Alert = (props) => {
    const {
        handleCloseFlash,
        alertMsg,
        openflash
    } = props

    const [subLebel, setSubLabel] = useState('')

    useEffect(() => {
        switch (alertMsg) {
            case 'Verified':
                setSubLabel('This account was successfully verified.')
                break
            case 'Rejected':
                setSubLabel('This account was successfully rejected, and is now disabled.')
                break
            case 'Activated':
                setSubLabel('This account was successfully activated.')
                break
            case 'Re-sended':
                setSubLabel('Another invitation was sended to this organization.')
                break
            case 'Another invitation was sended to this organization.':
                break
            case 'Deactivated':
                setSubLabel('This account was deactivated, users no longer have access.')
                break
            case 'Cancelled':
                setSubLabel('The invitation was cancelled')
                break
            default:
                return null
        }
    }, [alertMsg])


    return (
        <div style={{ width: "300px" }}>
            <Snackbar
                open={openflash}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                autoHideDuration={2000}
                onClose={handleCloseFlash}
            >
                <AlertMui onClose={handleCloseFlash} severity="success" sx={{ width: '300' }}>
                    <h1>{alertMsg}</h1>
                    <label>
                        {subLebel}
                    </label>
                </AlertMui>
            </Snackbar>
        </div>

    )
}



export default Alert
