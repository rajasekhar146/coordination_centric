import React, { useState } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import CircleIcon from '@mui/icons-material/Circle'
import IconButton from '@mui/material/IconButton'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useHistory } from 'react-router-dom'
import { organizationService } from '../../services'

const ITEM_HEIGHT = 60

const PatientItem = props => {
    const history = useHistory()
    const {
        row,
        index,
        classes,
        getTextColor,
        menuList,
        setIsDeactivateClicked,
        setOrganizations,
        setSkip,
        setOpenFlash,
        setAlertMsg,
        setIsCancelInviteClicked,
        setSubLabel,
        setIsActivateClicked,
        setInvitePatientClicked,
        setOpenSharePatientRecord,
        setSelectedItem
    } = props
    const [menuOptions, setMenuOptions] = React.useState([])

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

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

    const handleMenuAction = (e, action, index, orgId, row) => {
        e.preventDefault()
        e.stopPropagation()
        switch (action) {
            case 'setInvitePatientClicked':
                setInvitePatientClicked(true)
                setSelectedItem(row)
                break
            case 'setOpenSharePatientRecord':
                setOpenSharePatientRecord(true)
            default:
                return null
        }
        setAnchorEl(null)
    }

    const handleClose = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(null)
    }

    const handleActivate = org => {
        const res = organizationService.updateOrganization(org.id, 'active')
        res.then(() => {
            setOrganizations([])
            setSkip(1)
            setAlertMsg('Activated')
            setSubLabel('This account was successfully activated.')
            setOpenFlash(true)
            setIsActivateClicked(false)
        })
    }

    const handleResend = org => {
        const res = organizationService.resendInvite(org.id)
        res.then(res => {
            setOrganizations([])
            setSkip(1)
            setAlertMsg('Re-sended')
            setSubLabel('Another invitation was sended to this organization.')
            setOpenFlash(true)
        })
    }



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

    function routeDirect(orgId) {
        history.push(`/organization-view/${orgId}`)
    }
    return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
            <TableCell key={index}>{row.name}</TableCell>
            <TableCell key={index}>{row.email}</TableCell>
            <TableCell key={index}>{row.speciality}</TableCell>
            <TableCell key={index}>{row.licence}</TableCell>
            <TableCell
                key={index}
            // align={'center'}
            >
                <CircleIcon fontSize="small" sx={{ color: '#027A48' }} />
            </TableCell>
            <TableCell key={index} align={'right'}>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls="long-menu"
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
                >
                    {menuOptions.map((option, idx) => (
                        <MenuItem
                            key={option}
                            onClick={e => handleMenuAction(e, option.fnKey, index, row.id, row)}
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
        </TableRow>
    )
}

export default PatientItem
