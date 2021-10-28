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
        openflash,
        subLebel
    } = props


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
                    <h4>{alertMsg}</h4>
                    <label>
                        {subLebel}
                    </label>
                </AlertMui>
            </Snackbar>
        </div>

    )
}



export default Alert
