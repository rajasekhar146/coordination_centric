import React, { useEffect, useState } from 'react'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const AlertMui = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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
            case 'Canceled':
                setSubLabel('The invitation was canceled')
                break
            default:
                return null
        }
    }, [alertMsg])


    return (
        <Snackbar
            open={openflash}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            autoHideDuration={2000}
            onClose={handleCloseFlash}
        >
            <AlertMui onClose={handleCloseFlash} severity="success" sx={{ width: '100%' }}>
                <h1>{alertMsg}</h1>
                <label>
                    {subLebel}
                </label>
            </AlertMui>
        </Snackbar>
    )
}



export default Alert
