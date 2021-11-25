import React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import CircleIcon from '@mui/icons-material/Circle'
import IconButton from '@mui/material/IconButton'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { memberService } from '../../services'

const colorcodes = {
    invited: '#2E90FA',
    pending_verification: '#F79009',
    active: '#12B76A',
    pending_acceptance: '#7A5AF8',
    cancelled: '#757500',
    inactive: '#A0A4A8',
    declined: '#B42318',
}

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

const getValue = val => {
    switch (val) {
        case 'active':
            return 'Verified'
            break
        case 'inactive':
            return 'Suspended'
            break
        case 'unverified':
            return 'Unverified'
            break
        case 'invited':
            return 'Invited'
            break
        case 'pending_verification':
            return 'Pending verification'
            break
        case 'pending_acceptance':
            return 'Pending acceptance'
            break
        case 'cancelled':
            return 'cancelled'
            break
        case 'declined':
            return 'declined'
            break
        default:
            return null
    }
}

const menuList = [
    {
        menu: 'sent',
        options: [
            // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
            { text: 'Resent Invitation', icon: require('../../assets/icons/resent_invitation.png').default },
        ],
    },
    {
        menu: 'pending_verification',
        options: [
            { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
            { text: 'Send Message', icon: require('../../assets/icons/edit_icon.png').default },
            { text: 'Verify', fnKey: 'setIsAcceptClicked', icon: require('../../assets/icons/approve.png').default },
            // { text: 'Verify', icon: require('../../assets/icons/suspend.png').default },
            { text: 'Reject', fnKey: 'setIsRejectClicked', icon: require('../../assets/icons/reject.png').default },
        ],
    },
    {
        menu: 'cancelled',
        options: [
            { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
            // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
            // { text: 'Resent Invitation', icon: require('../../assets/icons/resent_invitation.png').default },
            // { text: 'Suspend', icon: require('../../assets/icons/suspend.png').default },
        ],
    },
    {
        menu: 'declined',
        options: [
            { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
            // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
            // { text: 'Resent Invitation', icon: require('../../assets/icons/resent_invitation.png').default },
            // { text: 'Suspend', icon: require('../../assets/icons/suspend.png').default },
        ],
    },
    {
        menu: 'active',
        options: [
            { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
            // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
            { text: 'Deactivate', fnKey: 'setIsDeactivateClicked', icon: require('../../assets/icons/suspend.png').default },
        ],
    },
    {
        menu: 'inactive',
        options: [
            { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
            // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
            { text: 'Activate', fnKey: 'setIsActivateClicked', icon: require('../../assets/icons/activate.png').default },
        ],
    },
    {
        menu: 'true',
        options: [
            { text: 'Deactivate', fnKey: 'setIsDeactivateClicked', icon: require('../../assets/icons/suspend.png').default },

        ],
    },

    {
        menu: 'suspended',
        options: [
            { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
            // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
            { text: 'Activate', icon: require('../../assets/icons/activate.png').default },
        ],
    },
    {
        menu: 'verified',
        options: [
            { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
            { text: 'Deactivate', icon: require('../../assets/icons/edit_icon.png').default },
        ],
    },
    {
        menu: 'unverified',
        options: [
            { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
            { text: 'Send Message', icon: require('../../assets/icons/edit_icon.png').default },
            { text: 'Verify', fnKey: 'setIsAcceptClicked', icon: require('../../assets/icons/approve.png').default },
            { text: 'Reject', fnKey: 'setIsRejectClicked', icon: require('../../assets/icons/reject.png').default },
        ],
    },
    {
        menu: 'pending_acceptance',
        options: [
            { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
            { text: 'Send Message', icon: require('../../assets/icons/edit_icon.png').default },
            { text: 'Verify', icon: require('../../assets/icons/suspend.png').default },
            { text: 'Reject', fnKey: 'setIsRejectClicked', icon: require('../../assets/icons/reject.png').default },
        ],
    },
    {
        menu: 'cancelled',
        options: [
            { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
            {
                text: 'Resend Invitation',
                fnKey: 'setIsResendClicked',
                icon: require('../../assets/icons/resent_invitation.png').default,
            },
            { text: 'Cancel Invite', icon: require('../../assets/icons/suspend.png').default },
        ],
    },
    {
        menu: 'invited',
        options: [
            { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
            {
                text: 'Resend Invitation',
                fnKey: 'setIsResendClicked',
                icon: require('../../assets/icons/resent_invitation.png').default,
            },
            {
                text: 'Cancel Invite',
                fnKey: 'setIsCancelInviteClicked',
                icon: require('../../assets/icons/suspend.png').default,
            },
        ],
    },
]


const MemberItemComponent = props => {
    const classes = useStyles()

    const {
        row,
        columns,
        index,
        setSkip,
        setOpenFlash,
        setAlertMsg,
        setSubLabel,
        setMembersList,
        organizationId
    } = props

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const [menuOptions, setMenuOptions] = React.useState([])


    const handleClick = (event, status) => {
        event.preventDefault()
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
        const menus = menuList.filter(m => m.menu === status.toLowerCase())
        console.log('menus', menus)
        if (menus.length > 0) setMenuOptions(menus[0].options)
        else setMenuOptions([])

        console.log('menus[0].options', menus[0].options)
    }

    const resendInvite = async(org, status) => {
        const res = await memberService.resendInvite(organizationId, status, 'member')
        if (res.status === 200) {
            setSkip(1)
            setOpenFlash(true)
            setMembersList([])
            setAlertMsg('Re-sended')
            setSubLabel('Another invitation was sended to this Member.')
        } else {
            setSkip(1)
            setOpenFlash(true)
            setAlertMsg('Error')
            // setSubLabel('Another invitation was sended to this Member.')
        }
    }

    const cancelInvite = async(org, status) => {
        const res = await memberService.cancelInvite(organizationId, status, 'member')
        if (res.status === 200) {
            setSkip(1)
            setOpenFlash(true)
            setMembersList([])
            setAlertMsg('Cancelled')
            setSubLabel('Ivitation Cancelled.')
        } else {
            setSkip(1)
            setOpenFlash(true)
            setAlertMsg('Error')
        }
    }

    const handleMenuAction = (e, action, index, orgId) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('orgId', orgId)
        switch (action) {
            case 'setIsAcceptClicked':
                // setIsAcceptClicked(true)
                break
            case 'setIsRejectClicked':
                // setIsRejectClicked(true)
                break
            case 'setIsDeactivateClicked':
                // setIsDeactivateClicked(true)
                break
            case 'setIsCancelInviteClicked':
                cancelInvite(row, 'cancel')

                break
            case 'setIsActivateClicked':
                // handleStatus(row, 'active')
                // setIsActiva/teClicked(true)
                break
            case 'setIsResendClicked':
                resendInvite(row, 'resend')
                break
            // case 'setIsActivateClicked':
            //   handleActivate()
            case 'viewdetails':
            // routeDirect(orgId)

            default:
                return null
        }
        setAnchorEl(null)
    }

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

                return column.id == 'memberStatus' ? (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ paddingBottom: 10, paddingTop: 10, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <div className={`od__${value?.toLowerCase()}__status`}>
                            <CircleIcon fontSize="small" sx={{ color: colorcodes[value.toLowerCase()] }} />

                            <div className={`od__${value?.toLowerCase()}__label`}>
                                {column.format && typeof value === 'number' ? column.format(value) : getValue(value)}
                            </div>
                        </div>
                    </TableCell>
                ) : column.id == 'action' ? (
                    <TableCell key={column.id} align={column.align} style={{ paddingBottom: 10, paddingTop: 10 }}>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls="long-menu"
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={e => handleClick(e, `${row['memberStatus']}`)}
                        >
                            <MoreVertRoundedIcon />
                        </IconButton>
                        <Menu
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            className={classes.menu}
                        // PaperProps={{
                        //     style: {
                        //         maxHeight: ITEM_HEIGHT * 4.5,
                        //         width: '20ch',
                        //         boxShadow:
                        //             '0px 5px 5px -3px rgba(0,0,0,0),0px 2px 2px 1px rgba(0,0,0,0),0px 3px 14px 2px rgba(0,0,0,0)',
                        //         border: '1px solid #9fa2a3',
                        //         left: '-75px'
                        //     },
                        // }}
                        >
                            {menuOptions.map((option, idx) => (
                                <MenuItem
                                    key={option}
                                    onClick={e => handleMenuAction(e, option.fnKey, index, row.id)}
                                    className={`${classes.menuItem} ${classes[getTextColor(option.text)]} od__menu__row od__menu__text`}
                                >
                                    <div className="od__menu__icon__column">
                                        <img width={18} src={option.icon} alt={option.text} />
                                    </div>
                                    <div className="od__menu__text__column">{option.text}</div>
                                </MenuItem>
                            ))}
                        </Menu>
                    </TableCell>
                ) : column.id == 'id' ? null : (
                    <TableCell key={column.id} align={column.align} style={{ paddingBottom: 10, paddingTop: 10 }}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                )
            })}
        </TableRow>
    )
}

export default MemberItemComponent
