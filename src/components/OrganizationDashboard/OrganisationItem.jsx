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
import './OrganizationDashboard.Component.css'

const ITEM_HEIGHT = 60

const OrganisationItem = props => {
  const history = useHistory()
  const {
    row,
    index,
    columns,
    colorcodes,
    classes,
    getTextColor,
    setIsAcceptClicked,
    setIsRejectClicked,
    setSelectedOrg,
    rows,
    menuList,
    setIsDeactivateClicked,
    setOrganizations,
    setSkip,
    setOpenFlash,
    setAlertMsg,
    setIsCancelInviteClicked,
    setSubLabel,
    setIsActivateClicked,
    role,
    setAlertcolor
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

  const handleClose = e => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(null)
  }

  const handleActivate = org => {
    const params = {
      facilityId: org.id,
    }
    console.log('handleActivate', params)
    const response = organizationService.subscriptionOrganization(params).catch(err => {
      console.log(err)
    })
    console.log('handleActivate >> 1 ', response)
    if (response.status === 200) {
      const res = organizationService.updateOrganization(org.id, 'active').catch(err => {
        console.log(err)
      })
      console.log('handleActivate >> 2 ', res)
      if (res.status === 200) {
        setOrganizations([])
        setSkip(0)
        setAlertMsg('Activated')
        setSubLabel('This account was successfully activated.')
        setAlertcolor('success')
        setOpenFlash(true)
        setIsActivateClicked(false)
      }
    }
  }

  const handleResend = org => {
    const res = organizationService.resendInvite(org.id , 'facility')
    res.then(res => {
      setOrganizations([])
      setSkip(0)
      setAlertMsg('Re-sended')
      setSubLabel('Another invitation was sended to this organization.')
      setAlertcolor('success')
      setOpenFlash(true)
    })
  }

  const handleMenuAction = (e, action, index, orgId) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('orgId', orgId)
    switch (action) {
      case 'setIsAcceptClicked':
        setIsAcceptClicked(true)
        break
      case 'setIsRejectClicked':
        setIsRejectClicked(true)
        break
      case 'setIsDeactivateClicked':
        setIsDeactivateClicked(true)
        break
      case 'setIsCancelInviteClicked':
        setIsCancelInviteClicked(true)
        break
      case 'setIsActivateClicked':
        handleActivate(row, 'active')
        setIsActivateClicked(true)
        break
      case 'setIsResendClicked':
        handleResend(row, 'resend')
        break
      // case 'setIsActivateClicked':
      //   handleActivate()
      case 'viewdetails':
        routeDirect(orgId)

      default:
        return null
    }
    setAnchorEl(null)
    setSelectedOrg(row)
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
      case 'pending_bank_verification':
        return 'Pending Bank Verification'
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
    <TableRow
      onClick={() => {
        routeDirect(row.id)
      }}
      hover
      role="checkbox"
      style={{ width: '100%' }}
      tabIndex={-1}
      key={row.id}
    >
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
              onClick={e => handleClick(e, `${row['status']}`)}
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
        ) : column.id === 'invited_facilityName' && role !== 'superadmin' ? null : column.id == 'id' ? null : (
          <TableCell key={column.id} align={column.align} style={{ paddingBottom: 10, paddingTop: 10 }}>
            {column.format && typeof value === 'number' ? column.format(value) : value}
          </TableCell>
        )
      })}
    </TableRow>
  )
}

export default OrganisationItem
