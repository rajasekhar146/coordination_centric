import React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import CircleIcon from '@mui/icons-material/Circle'
import IconButton from '@mui/material/IconButton'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { setAppointmentDetails } from '../../redux/actions/appointmentActions'
import ViewImageComponent from '../Shared/AppointmentCalender/ViewImage/ViewImage.Component'
// import { setAppointmentDetails } from '../../redux/actions/appointmentActions'
import moment from 'moment'
import {
    primaryAppointmentDate,
    secondaryAppointmentDate,
} from '../../redux/actions/commonActions'
//   import ViewAppointmentComponent from './ViewAppointment.Component'
import history from '../../history'

const useStyles = makeStyles(theme => ({
    menuItem: {
        fontSize: 14,
        borderBottom: '1px solid #E8E8E8',
        paddingTop: 5,
        paddingBottom: 15,
        display: 'flex',
        justifyContent: "space-between"
    },
    approved: {
        color: '#03B575',
    },
    reject: {
        color: '#E74F48',
    },
    defaultStyle: {
        color: '#25282B',
    },
    menu: {
        padding: 0,
        position: 'fixed',
        zIndex: 1300,
        right: 0,
        left: -75,
        top: 0,
        bottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
    },
}))


const menuList = [
    {
        menu: 'accepted',
        options: [
            { text: 'View', fnKey: 'setIsViewClicked', icon: require('../../assets/icons/view_details.png').default },
            { text: 'Re-schedule', icon: require('../../assets/icons/resend_calender.png').default },
            { text: 'Cancel Appointment', fnKey: 'setCancelAppointment', icon: require('../../assets/icons/reject.png').default },
        ],
        historyOptions: [
            { text: 'View', fnKey: 'setIsViewClicked', icon: require('../../assets/icons/view_details.png').default },
        ]
    },
    {
        menu: 'pending',
        doctorOptions: [
            { text: 'View', fnKey: 'setIsViewClicked', icon: require('../../assets/icons/view_details.png').default },
            { text: 'Re-schedule', fnKey: 'setIsRescheduleClicked', icon: require('../../assets/icons/resend_calender.png').default },
            { text: 'Approve', fnKey: 'setIsConfirmClicked', icon: require('../../assets/icons/resend_calender.png').default },
            { text: 'Reject', fnKey: 'setIsRejectClicked', icon: require('../../assets/icons/reject.png').default },
        ],
        patientOptions: [
            { text: 'View', fnKey: 'setIsViewClicked', icon: require('../../assets/icons/view_details.png').default },
            { text: 'Re-schedule', fnKey: 'setPatientReschedule', icon: require('../../assets/icons/resend_calender.png').default },
            { text: 'Cancel Appointment', fnKey: 'setCancelAppointment', icon: require('../../assets/icons/reject.png').default },
        ],
        historyOptions: [
            { text: 'View', fnKey: 'setIsViewClicked', icon: require('../../assets/icons/view_details.png').default },
        ]
    },
    {
        menu: 'declined',
        options: [
            // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
            { text: 'View', fnKey: 'setIsViewClicked', icon: require('../../assets/icons/view_details.png').default },
        ],
        historyOptions: [
            { text: 'View', fnKey: 'setIsViewClicked', icon: require('../../assets/icons/view_details.png').default },
        ]
    },
    {
        menu: 'request_to_reschedule',
        options: [
            { text: 'View', fnKey: 'setIsViewClicked', icon: require('../../assets/icons/view_details.png').default },
            { text: 'Re-schedule', fnKey: 'setPatientReschedule', icon: require('../../assets/icons/resend_calender.png').default },
            { text: 'Reject', fnKey: 'setIsRejectClicked', icon: require('../../assets/icons/reject.png').default },
        ],
        historyOptions: [
            { text: 'View', fnKey: 'setIsViewClicked', icon: require('../../assets/icons/view_details.png').default },
        ]
    },
    {
        menu: 'rescheduled',
        options: [
            { text: 'View', fnKey: 'setIsViewClicked', icon: require('../../assets/icons/view_details.png').default },
            { text: 'Approve', fnKey: 'setIsConfirmClicked', icon: require('../../assets/icons/resend_calender.png').default },
            { text: 'Reject', fnKey: 'setIsRejectClicked', icon: require('../../assets/icons/reject.png').default },
        ],
        historyOptions: [
            { text: 'View', fnKey: 'setIsViewClicked', icon: require('../../assets/icons/view_details.png').default },
        ]
    },



]


const AppointmentItemComponent = props => {
    const classes = useStyles()

    const {
        row,
        columns,
        index
    } = props
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const [menuOptions, setMenuOptions] = React.useState([])




    const handleClose = () => {
        setAnchorEl(null)
    }

    const getTextColor = text => {
        switch (text) {
            case 'Approve':
                return 'approved'
                break
            case 'Reject':
                return 'reject'
                break
            default:
                return 'defaultStyle'
        }
    }


    const getValue = val => {
        switch (val) {
            case 'accepted':
                return 'Confirmed'
                break

            case 'cancelled':
                return 'Cancelled'
                break
            case 'pending':
                return 'Pending acceptance'
                break
            case 'accepted':
                return 'Accepted'
                break
            case 'declined':
                return 'Declined'
                break
            case 'request_to_reschedule':
                return 'Requested to Re-schedule'
                break
            case 'rescheduled':
                return 'Rescheduled'
            default:
                return null
        }
    }



    const colorcodes = {
        accepted: '#12B76A',
        pending: '#7A5AF8',
        cancelled: '#757500',
        declined: '#B42318',
        request_to_reschedule: '#F79009',
        rescheduled: '#F79009'
    }

    return (
        <TableRow
            hover
            role="checkbox"
            style={{ width: '100%' }} tabIndex={-1} key={row.id}>
            {columns.map(column => {
                var value = row[column.id]
                if (row[column.id]) value = row[column.id]
                // else if (column.id === 'orgName') value = 'John Deo'
                // else if (column.id === 'referedBy') value = 'Sachin Smith'

                return column.id == 'status' ? (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ paddingBottom: 10, paddingTop: 10, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <div className={`od__${value?.toLowerCase()}__status`}>
                            <CircleIcon fontSize="small" sx={{ color: colorcodes[value.toLowerCase()] }} />
                            <div className={`od__${value?.toLowerCase()}__label`}>
                                {getValue(value)}
                            </div>
                        </div>
                    </TableCell>
                ) : column.id == 'profile' ? (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ paddingBottom: 10, paddingTop: 10, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <div className={`od__${value?.toLowerCase()}__status`}>
                            <div >
                                {value ?
                                    <img src={value} alt="Profile" className="nb__profile__image" /> :
                                    <img src={require('../../assets/icons/default_profile_image.png').default} alt="profile" className="nb__profile__image" />
                                }
                                {/* <ViewImageComponent category={'doctors_certificate'} pic={value} imageClass={"ap_profile"} /> */}
                            </div>
                        </div>
                    </TableCell>
                ) :
                    // column.id == 'action' ? (
                    //     <TableCell key={column.id} align={column.align} style={{ paddingBottom: 10, paddingTop: 10 }}>
                    //         <IconButton
                    //             aria-label="more"
                    //             id="long-button"
                    //             aria-controls="long-menu"
                    //             aria-expanded={open ? 'true' : undefined}
                    //             aria-haspopup="true"
                    //             disabled={row['status'] === 'compleated' || row['status'] === 'cancelled'}
                    //             onClick={e => handleClick(e, `${row['status']}`)}
                    //         >
                    //             <MoreVertRoundedIcon />
                    //         </IconButton>
                    //         <Menu
                    //             MenuListProps={{
                    //                 'aria-labelledby': 'long-button',
                    //             }}
                    //             anchorEl={anchorEl}
                    //             open={open}
                    //             onClose={handleClose}
                    //             className={classes.menu}
                    //         // PaperProps={{
                    //         //     style: {
                    //         //         maxHeight: ITEM_HEIGHT * 4.5,
                    //         //         width: '20ch',
                    //         //         boxShadow:
                    //         //             '0px 5px 5px -3px rgba(0,0,0,0),0px 2px 2px 1px rgba(0,0,0,0),0px 3px 14px 2px rgba(0,0,0,0)',
                    //         //         border: '1px solid #9fa2a3',
                    //         //         left: '-75px'
                    //         //     },
                    //         // }}
                    //         >
                    //             {menuOptions.map((option, idx) => (
                    //                 <MenuItem
                    //                     key={option}
                    //                     onClick={e => handleMenuAction(e, option.fnKey, index, row.id)}
                    //                     className={`${classes.menuItem} ${classes[getTextColor(option.text)]} od__menu__row od__menu__text`}
                    //                 >
                    //                     <div className="od__menu__icon__column">
                    //                         <img width={18} src={option.icon} alt={option.text} />
                    //                     </div>
                    //                     <div className="od__menu__text__column">{option.text}</div>
                    //                 </MenuItem>
                    //             ))}
                    //         </Menu>
                    //     </TableCell>
                    // ) 
                    // : 
                    column.id == 'id' ? null : (
                        <TableCell key={column.id} align={column.align} style={{ paddingBottom: 10, paddingTop: 10 }}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                    )
            })}
        </TableRow>
    )
}

export default AppointmentItemComponent
