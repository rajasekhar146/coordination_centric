import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import './Doctorsearch.Component.css'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {appointmentService} from '../../../services'
import get from 'lodash.get'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  indeterminateColor: {
    color: '#f50057',
  },
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  variant: 'menu',
}
const options = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]

const DoctorsearchComponent = props => {
  const classes = useStyles()
  const [selected, setSelected] = useState([])
  const [specialists, setSpecialties] = useState([])
  const isAllSelected = specialists.length > 0 && selected.length === specialists.length
  const handleChange = event => {
    const value = event.target.value
    console.log("handleChange",value);
    if (value[value.length - 1] === 'all') {
      setSelected(selected.length === specialists.length ? [] : specialists)
      return
    }
    setSelected(value)
    props.setSearchSpecialists(value)
  }

  const handleSearchText = e => {
    props.setSearchText(e.target.value)
    // getOrganization(e.target.value, searchDate, searchStatus)
  }
  // const [searchText, setSearchText] = React.useState('')

  // const handleClear = () => {
  //   props.setSearchText('')
  // }



  // const StyledMenu = styled(props => (
  //   <Menu
  //     elevation={0}
  //     anchorOrigin={{
  //       vertical: 'bottom',
  //       horizontal: 'right',
  //     }}
  //     transformOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     {...props}
  //   />
  // ))

  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget)
  // }
  // const [anchorEl, setAnchorEl] = React.useState(null)
  // const open = Boolean(anchorEl)
  // const [menuOptions, setMenuOptions] = React.useState([])

  useEffect(async () => {
    const response = await appointmentService.getAllSpecializations()
    const data = get(response, ['data', 'data'], '')
    var newSpecialities = []
    data.forEach(d => {
      newSpecialities.push(d.speciality_name)
    })
    const uniqueSpecialities = new Set(newSpecialities)
    setSpecialties([...uniqueSpecialities])
  }, [])
  return (
    <div className="ds__section" style={{marginBottom:20}}>
      <div className="ds__row__div">
        <div className="ds__column__div" style={{ width: '30%' }}>
          <TextField
            margin="normal"
            placeholder="Search"
            onChange={e => handleSearchText(e)}
            value={props.searchText}
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
              <FormControl className={classes.formControl}>
                <Select
                  labelId="mutiple-select-label"
                  multiple
                  value={selected}
                  onChange={handleChange}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                  className="ds__dropdown__menu"
                >
                  
                  <MenuItem
                    value="all"
                    classes={{
                      root: isAllSelected ? classes.selectedAll : '',
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        classes={{ indeterminate: classes.indeterminateColor }}
                        checked={isAllSelected}
                        indeterminate={selected.length > 0 && selected.length < specialists.length}
                      />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.selectAllText }} primary="Select All" />
                  </MenuItem>
                  {specialists && specialists.map(option => (
                    <MenuItem key={option} value={option}>
                      <ListItemIcon>
                        <Checkbox checked={selected.indexOf(option) > -1} />
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="ds__status__menu">
             
                <Select 
                  labelId="mutiple-select-label"
                  multiple
                  value={[props.searchState,props.searchCity,props.searchZipcode]}
                  renderValue={selected =>selected.filter(x=>x).join(', ')}
                  // onChange={handleChange}
                  MenuProps={MenuProps}
                  className="ds__dropdown__menu"
                >
                  <MenuItem>
                    <ListItemIcon>
                <TextField margin="normal" defaultValue={props.searchState}  placeholder="State"   inputProps={{ className: 'pas__problem__textbox' }}  onChange={(e)=>{props.setSearchState(e.target.value)}}/>
                    </ListItemIcon>
                  </MenuItem>
                    <MenuItem >
                      <ListItemIcon>
                      <TextField margin="normal" defaultValue={props.searchCity}  placeholder="City"  inputProps={{ className: 'pas__problem__textbox' }} onChange={(e)=>{props.setSearchCity(e.target.value)}}/>

                      </ListItemIcon>
                    </MenuItem>
                    <MenuItem >
                      <ListItemIcon>
                      <TextField margin="normal"   placeholder="Zipcode" defaultValue={props.searchZipcode}   inputProps={{ className: 'pas__problem__textbox' }} onChange={(e)=>{props.setSearchZipcode(e.target.value)}}/>

                      </ListItemIcon>
                    </MenuItem>
                </Select>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorsearchComponent
