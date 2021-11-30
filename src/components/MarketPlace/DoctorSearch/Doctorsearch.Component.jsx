import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import Menu from '@mui/material/Menu'
import { styled, alpha } from '@mui/material/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Button from '@mui/material/Button'
import './Doctorsearch.Component.css'

const handleSearchText = e => {
  // setSearchText(e.target.value)
  // getOrganization(e.target.value, searchDate, searchStatus)
}
const DoctorsearchComponent = () => {
  const [searchText, setSearchText] = React.useState('')

  const handleClear = () => {
    setSearchText('')
  }

  const StyledMenu = styled(props => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const [menuOptions, setMenuOptions] = React.useState([])

  return (
    <div className="ds__section">
      <div className="ds__row__div">
        <div className="ds__column__div" style={{ width: '30%' }}>
          <TextField
            margin="normal"
            placeholder="Search"
            onChange={e => handleSearchText(e)}
            value={searchText}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: '#CACCCF' }} />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="ds__column__div ds__dropdown__section">
          <div className="ds__menu">
            <div className="ds__spl__menu">
              <select className="ds__dropdown__menu ds__spl__adj">
                <option>All Specialties</option>
              </select>
            </div>
            <div className="ds__status__menu">
              <select className="ds__dropdown__menu">
                <option>All Locations</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorsearchComponent
