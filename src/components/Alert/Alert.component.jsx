import React, { useEffect, useState } from 'react'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from '@material-ui/core/styles'
import SuccessIcon from '../../assets/icons/success.png'
import success_bubbles from '../../assets/icons/green_bobbles.png'
import SnackbarContent from '@mui/material/SnackbarContent';
import fail_bubbles from '../../assets/icons/red_bubbles.png'
import cancel_bubbles from '../../assets/icons/blue_bubbles.png'
import failIcon from '../../assets/icons/fail.png'
import cancelIcon from '../../assets/icons/cancel.png'
import CloseIcon from '@mui/icons-material/Close';



const useStyles = makeStyles(theme => ({
    root: {
        // backgroundColor: "#03A65A",
        width: '400px',
        height: '120px',
        borderRadius: '32px !important'
    },
    icon: {
        position: "absolute",
        bottom: "100px"
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
       fontSize: '24px',
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
    },
    closeIcon : {
        right: '15px' ,
        position: 'absolute',
        top: '20px',
        cursor: 'pointer'
    }
}))

const colorcodes = {
    success : '#03A65A',
    fail : '#F63E50',
    cancel : '#739BE5',
  }
  const bubbles = {
    success : success_bubbles,
    fail : fail_bubbles,
    cancel : cancel_bubbles,
  }
  const icon = {
    success : SuccessIcon,
    fail : failIcon,
    cancel : cancelIcon,
  }


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
        subLebel,
        color
    } = props


    return (
        <div style={{ maxWidth: "300px" }}>

            <Snackbar
                open={openflash}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                autoHideDuration={2000}
                onClose={handleCloseFlash}
            >
                <SnackbarContent style={{backgroundColor:colorcodes[color]}}
                    className={classes.root}
                    message={
                        <span>
                            <CloseIcon className={classes.closeIcon} onClick={handleCloseFlash}  />
                            <img className={classes.icon} src={icon[color]} alt="icon" />
                            <h1 className={classes.header}>{alertMsg}</h1>
                            <label className={classes.subText}>
                                {subLebel}
                            </label>
                            <img className={classes.union} src={bubbles[color]} alt="icon" />

                        </span>

                    }
                >
                </SnackbarContent>

            </Snackbar>
        </div>

    )
}



export default Alert
