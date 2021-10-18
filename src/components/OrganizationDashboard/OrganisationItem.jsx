import React, { useState } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import CircleIcon from '@mui/icons-material/Circle';
import IconButton from '@mui/material/IconButton'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'


const ITEM_HEIGHT = 60


const OrganisationItem = props => {
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
        menuList
    } = props
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const [menuOptions, setMenuOptions] = React.useState([])


    const handleClick = (event, status) => {
        
        setAnchorEl(event.currentTarget)
        console.log('status', status, menuOptions)
        const menus = menuList.filter(m => m.menu === status.toLowerCase())
        console.log('menus', menus)
        if (menus.length > 0) setMenuOptions(menus[0].options)
        else setMenuOptions([])
    
        console.log('menus[0].options', menus[0].options)
      }
    
      const handleClose = () => {
        setAnchorEl(null)
      }

    const handleMenuAction = (action, index) => {
        switch (action) {
          case 'setIsAcceptClicked':
            setIsAcceptClicked(true)
            break;
          case 'setIsRejectClicked':
            setIsRejectClicked(true)
            break;
          default:
            return null;
        }
        setAnchorEl(null)
        setSelectedOrg(rows[index])
    
      }
    return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
            {columns.map(column => {
                var value = row[column.id]
                if (row[column.id]) value = row[column.id]
                else if (column.id === 'orgName') value = 'John Deo'
                else if (column.id === 'referedBy') value = 'Sachin Smith'

                return column.id == 'status' ? (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ paddingBottom: 10, paddingTop: 10, textAlign: "center" }}
                    >
                        <div className={`od__${value.toLowerCase()}__status`}>
                            <CircleIcon fontSize="small" sx={{ color: colorcodes[value.toLowerCase()] }} />
                            <div className={`od__${value.toLowerCase()}__label`}>{column.format && typeof value === 'number' ? column.format(value) : value === 'active' ? 'verified' : value}</div>
                        </div>
                    </TableCell>
                ) : column.id == 'action' ? (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ paddingBottom: 10, paddingTop: 10 }}
                    >
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
                                    onClick={e => handleMenuAction(option.fnKey, index)}
                                    className={`${classes.menuItem} ${classes[getTextColor(option.text)]} od__menu__row od__menu__text`}
                                >
                                    <div className="od__menu__icon__column">
                                        <img src={option.icon} alt={option.text} />
                                    </div>
                                    <div>{option.text}</div>
                                </MenuItem>
                            ))}
                        </Menu>
                    </TableCell>
                ) : (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ paddingBottom: 10, paddingTop: 10 }}
                    >
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                )
            })}
        </TableRow>
        )
}

export default OrganisationItem
