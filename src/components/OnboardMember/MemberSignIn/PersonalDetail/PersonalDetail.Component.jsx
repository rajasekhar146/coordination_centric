import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import './PersonalDetail.Component.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import history from '../../../../history'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import Button from '@mui/material/Button'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'

const PersonalDetailComponent = () => {
  const [age, setAge] = useState('')
  const [value, setValue] = useState(new Date())

  const handleChange = event => {
    setAge(event.target.value)
  }

  const handleNext = () => {
    history.push('/members/profile-setup')
  }

  return (
    <div className="pdc__main__div">
      <div className="pdc__row">
        <div className="pdc__back__button" onClick={e => history.push('/members/register')}>
          <ArrowBackIosNewIcon /> &nbsp;Back
        </div>
        <div className="pdc__step__text">STEP 01/02</div>
      </div>
      <div className="pdc__header__text">Personal Detail</div>
      <div className="pdc__content__div">
        Help us to get to know you a little more. All information remains private.
      </div>
      <div className="pdc__row">
        <div className="pdc__details__div">
          <div className="pdc__row">
            <div className="pdc__column">
              <div className="pdc__label">
                First Name <span className="pdc__required">*</span>
              </div>
              <TextField id="" defaultValue="" className="pdc__text__box" margin="normal" />
            </div>

            <div className="pdc__column">
              <div className="pdc__label">
                Middle Name <span className="pdc__required">*</span>
              </div>
              <TextField id="" defaultValue="" className="pdc__text__box" margin="normal" />
            </div>

            <div className="pdc__column">
              <div className="pdc__label">
                Last Name <span className="pdc__required">*</span>
              </div>
              <TextField id="" defaultValue="" className="pdc__text__box" margin="normal" />
            </div>
          </div>
          <div className="pdc__row">
            <div className="pdc__column">
              <div className="pdc__label">
                SSN/ITIN <span className="pdc__required">*</span>
              </div>
              <TextField
                id=""
                defaultValue=""
                style={{ minWidth: '450px' }}
                className="pdc__text__box"
                margin="normal"
              />
            </div>

            <div className="pdc__column">
              <div className="pdc__label">
                Occupation <span className="pdc__required">*</span>
              </div>
              <TextField
                id=""
                defaultValue=""
                style={{ minWidth: '450px' }}
                className="pdc__text__box"
                margin="normal"
              />
            </div>
          </div>

          <div className="pdc__row">
            <div className="pdc__column">
              <div className="pdc__label">
                Date of Birth <span className="pdc__required">*</span>
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={value}
                  onChange={newValue => {
                    setValue(newValue)
                  }}
                  renderInput={params => <TextField {...params} />}
                  InputProps={{ className: 'pdc__date__field' }}
                />
              </LocalizationProvider>
            </div>

            <div className="pdc__column">
              <div className="pdc__label">
                Phone Number <span className="pdc__required">*</span>
              </div>
              <TextField
                id=""
                defaultValue=""
                style={{ minWidth: '380px' }}
                className="pdc__text__box"
                margin="normal"
              />
            </div>

            <div className="pdc__column">
              <div className="pdc__label">
                Gender <span className="pdc__required">*</span>
              </div>
              <FormControl sx={{ m: 1, minWidth: 250 }}>
                <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem value="">
                    <em>Select an option</em>
                  </MenuItem>
                  <MenuItem value={10}>Male</MenuItem>
                  <MenuItem value={20}>Female</MenuItem>
                  <MenuItem value={30}>Other</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="pdc__row">
            <div className="pdc__column">
              <div className="pdc__label">
                Address <span className="pdc__required">*</span>
              </div>
              <TextField
                id=""
                defaultValue=""
                style={{ minWidth: '925px' }}
                margin="normal"
                placeholder="Address Line"
              />
            </div>
          </div>

          <div className="pdc__row">
            

            <div className="pdc__column">
            <div className="pdc__label">Country</div>
            <FormControl sx={{ m: 1, minWidth: 210 }}>
              <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="">
                  <em>Country</em>
                </MenuItem>
                <MenuItem value={10}>Male</MenuItem>
                <MenuItem value={20}>Female</MenuItem>
                <MenuItem value={30}>Other</MenuItem>
              </Select>
            </FormControl>
          </div>

            <div className="pdc__column">
              <div className="pdc__label">State</div>
              <FormControl sx={{ m: 1, minWidth: 210 }}>
                <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem value="">
                    <em>State</em>
                  </MenuItem>
                  <MenuItem value={10}>Male</MenuItem>
                  <MenuItem value={20}>Female</MenuItem>
                  <MenuItem value={30}>Other</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="pdc__column">
            <div className="pdc__label">City</div>
            <FormControl sx={{ m: 1, minWidth: 210 }}>
              <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="">
                  <em>City</em>
                </MenuItem>
                <MenuItem value={10}>Male</MenuItem>
                <MenuItem value={20}>Female</MenuItem>
                <MenuItem value={30}>Other</MenuItem>
              </Select>
            </FormControl>
          </div>
            <div className="pdc__column">
              <div className="pdc__label">Postal Code</div>
              <TextField id="" defaultValue="" style={{ minWidth: 100 }} margin="normal" />
            </div>
          </div>

          <div className="pdc__row pdc__align__right">
            <Button className="pdc__next__btn" onClick={handleNext}>
              Next &nbsp;
              <ArrowForwardIosRoundedIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalDetailComponent
