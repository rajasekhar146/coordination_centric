import React, { useState } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import CircleIcon from '@mui/icons-material/Circle'
import IconButton from '@mui/material/IconButton'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { memberService } from '../../services'
import '../OrganizationDashboard/OrganizationDashboard.Component.css'
import PatientRecordsDeatils from '../VideoCall/PatientRecordsDeatils/PatientRecordsDeatils'
import { useParams } from 'react-router-dom'


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
        case 'invited':
            return 'Closed'
            break
        default:
            return 'Open'
    }
}

const menuList = [
    {
        menu: 'open',
        options: [
            // { text: 'View', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
            { text: 'Invite Patient', fnKey: 'setInvitePatientClicked', icon: require('../../assets/icons/resent_invitation.png').default },
            // { text: 'Share', fnKey: 'setIsAcceptClicked', icon: require('../../assets/icons/share_icon.png').default },
            // { text: 'Archive', fnKey: 'setIsRejectClicked', icon: require('../../assets/icons/suspend.png').default },
        ],
    },
]



const colorcodes = {
    open: '#12B76A',
    closed: '#F79009'
}

const PatientItemComponent = props => {
    const classes = useStyles()
    const [rowData, setRowData] = useState('');
    const {
        row,
        columns,
        index,
        setSkip,
        setOpenFlash,
        setAlertMsg,
        setSubLabel,
        setCollaboratorList,
        setInvitePatientClicked,
        setSelectedItem,
        fromVideCall,
        setfromVideCall,
        videoClick
    } = props

    const handleStatus = (org, status) => {
        const res = memberService.updateStatus(org._id, status, 'facility')
        res.then(res => {
            setSkip(0)
            setOpenFlash(true)
            setCollaboratorList([])
        })
    }

    const handleMenuAction = (e, action, index, orgId) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('orgId', orgId)
        switch (action) {
            case 'setInvitePatientClicked':
                setInvitePatientClicked(true)
                break
            case 'setIsActivateClicked':
                handleStatus(row, 'active')
                // setIsActiva/teClicked(true)
                break
            case 'setIsResendClicked':
                handleStatus(row, 'resend')
                setAlertMsg('Resent')
                setSubLabel('Another invitation was sended to this Member.')
                break
            // case 'setIsActivateClicked':
            //   handleActivate()
            case 'viewdetails':
            // routeDirect(orgId)

            default:
                return null
        }
        setAnchorEl(null)
        setSelectedItem(row)
    }

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


    const handleRowClick = (index, row) => {
        if (videoClick) {
            setRowData(row);
            setfromVideCall(true);
        }
    }
    const closeList = (e) => {
        setfromVideCall(false)
        e.stopPropagation();
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
            onClick={(e) => {
                handleRowClick(index, row); e.stopPropagation();
            }}
            hover
            role="checkbox"
            style={{ width: '100%' }} tabIndex={-1} key={row.id}>
            {columns.map(column => {
                var value = row[column.id]
                if (row[column.id]) value = row[column.id]
                // else if (column.id === 'orgName') value = 'John Deo'
                // else if (column.id === 'referedBy') value = 'Sachin Smith'

                return column.id == 'state' ? (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ paddingBottom: 10, paddingTop: 10, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <div className={value[0] ? `od__closed__status` : `od__open__status`}>
                            <CircleIcon fontSize="small" sx={{ color: colorcodes[value[0] ? 'closed' : 'open'] }} />
                            <div className={value[0] ? `od__closed__label` : `od__open__label`}>
                                {getValue(value[0])}
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
                            onClick={e => handleClick(e, `open`)}
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
            {/* {
            fromVideCall &&
            <PatientRecordsDeatils closeList = {closeList} rowData={rowData}></PatientRecordsDeatils>
            } */}
        </TableRow>
    )
}

export default PatientItemComponent
