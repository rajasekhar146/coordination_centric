import React, { useEffect, useState } from 'react'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from '@material-ui/core/styles'
import SuccessIcon from '../../assets/icons/success.png'
import UnionSuccess from '../../assets/icons/green_bobbles.png'
import SnackbarContent from '@mui/material/SnackbarContent';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#03A65A",
        width: '438px',
        height: '132px',
        borderRadius: '32px'
    },
    icon: {
        position: "absolute",
        bottom: "110px"
    },
    union: {
        position: "absolute",
        bottom: 0,
        borderBottomLeftRadius: '32px',
        left: 0,
    },
    header: {
       fontWeight: 450,
    //    fontFamily: 'Poppins',
       fontSize: '30px',
       lineHeight: '40px',
       letterSpacing: '-0.035em',
       color: '#ffffff',
       paddingLeft: "120px",
       position: 'absolute',
       top: 0
    },
    subText: {
       fontSize: '15px',
       lineHeight: '23px',
       letterSpacing: '0.02em',
       color: '#ffffff',
       paddingLeft: "120px",
       position: 'absolute',
       bottom: '23px'
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
                            <img className={classes.icon} src={SuccessIcon} alt="success_icon" />
                            <h1 className={classes.header}>{alertMsg}</h1>
                            <label className={classes.subText}>
                                {subLebel}
                            </label>
                            <img className={classes.union} src={UnionSuccess} alt="success_icon" />

                        </span>

                    }
                >
                </SnackbarContent>

            </Snackbar>
        </div>

    )
}



export default Alert
