import React, { useEffect, useState } from 'react'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from '@material-ui/core/styles'
import successIcon from '../../assets/icons/success.png'
import SnackbarContent from '@mui/material/SnackbarContent';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#03A65A",
        width: '350px',
    },
    icon: {
        position: "absolute",
        bottom: "75px"
    }

}))



// const AlertMui = React.forwardRef(function Alert(props, ref) {
//     const classes = useStyles()
//     return <MuiAlert className={classes.alert} elevation={6} ref={ref} variant="filled" {...props} />;
// });



const Alert = (props) => {
    const classes = useStyles()
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
                <SnackbarContent
                    className={classes.root}
                    message={
                        <span>
                            <img className={classes.icon} src={successIcon} alt="success_icon" />
                            <h4>{alertMsg}</h4>
                            <label>
                                {subLebel}
                            </label>
                        </span>

                    }
                >
                </SnackbarContent>

            </Snackbar>
        </div>

    )
}



export default Alert
