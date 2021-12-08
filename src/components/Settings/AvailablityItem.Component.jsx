import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import Dropzone from 'react-dropzone'
import UploadIcon from '../../assets/icons/upload.png'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, convertFromHTML } from 'draft-js'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ToggleOnIcon from '../../assets/icons/toggle_on.png'
import ToggleOnIcOff from '../../assets/icons/toggle_off.png'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { memberAvaliabilities } from '../../redux/actions/memberActions' //'../../../redux/actions/memberActions'

const useStyles = makeStyles(theme => ({
  input: {
    background: '#F9FAFB',
    borderRadius: '8px',
    fontsize: '12px',
  },
  select: {
    background: '#FFFFFF',
    borderRadius: '8px',
    width: '100%',
    height: '48px',
  },
  multiselect: {
    position: 'relative',
    width: '100%',
    height: '100px',
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
  },
  timeInput: {
    background: '#FFFFFF',
    height: '34px',
    width: '100%',
    fontsize: '10px',
  },
}))

const defaultValues = [
  {
    day: 'Monday',
    first_half_starting_time: '2021-11-14 07:00:00',
    first_half_ending_time: '2021-11-14 12:00:00',
    second_half_starting_time: '2021-11-14 12:00:00',
    second_half_ending_time: '2021-11-14 22:00:00',
    is_available: true,
  },
  {
    day: 'Tuesday',
    first_half_starting_time: '2021-11-14 07:00:00',
    first_half_ending_time: '2021-11-14 12:00:00',
    second_half_starting_time: '2021-11-14 12:00:00',
    second_half_ending_time: '2021-11-14 22:00:00',
    is_available: true,
  },
  {
    day: 'Wednesday',
    first_half_starting_time: '2021-11-14 07:00:00',
    first_half_ending_time: '2021-11-14 12:00:00',
    second_half_starting_time: '2021-11-14 12:00:00',
    second_half_ending_time: '2021-11-14 22:00:00',
    is_available: true,
  },
  {
    day: 'Thursday',
    first_half_starting_time: '2021-11-14 07:00:00',
    first_half_ending_time: '2021-11-14 12:00:00',
    second_half_starting_time: '2021-11-14 12:00:00',
    second_half_ending_time: '2021-11-14 22:00:00',
    is_available: true,
  },
  {
    day: 'Friday',
    first_half_starting_time: '2021-11-14 07:00:00',
    first_half_ending_time: '2021-11-14 12:00:00',
    second_half_starting_time: '2021-11-14 12:00:00',
    second_half_ending_time: '2021-11-14 22:00:00',
    is_available: true,
  },
  {
    day: 'Saturday',
    first_half_starting_time: '2021-11-14 07:00:00',
    first_half_ending_time: '2021-11-14 12:00:00',
    second_half_starting_time: '2021-11-14 12:00:00',
    second_half_ending_time: '2021-11-14 22:00:00',
    is_available: true,
  },
  {
    day: 'Sunday',
    first_half_starting_time: '2021-11-14 07:00:00',
    first_half_ending_time: '2021-11-14 12:00:00',
    second_half_starting_time: '2021-11-14 12:00:00',
    second_half_ending_time: '2021-11-14 22:00:00',
    is_available: true,
  },
]

const AvailablityItem = props => {
  const {
    day,
    first_half_starting_time,
    first_half_ending_time,
    second_half_starting_time,
    second_half_ending_time,
    is_available,
  } = props.avaliablity
  // const[availableTime, setAvailableTime] = defaultValues
  console.log(' props.avaliablity',  props.avaliablity)
  const classes = useStyles()
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [toggleOn, setToggleOn] = useState(true)
  const dispatch = useDispatch()
  const mAvaliabilities = useSelector(state => state.memberAvaliabilities)

  const handleAvailablity = IsEnbaled => {
    setToggleOn(IsEnbaled)
    //setAvailabilities(IsEnbaled)
    if (mAvaliabilities.length > 0) {
      var newAvailable = mAvaliabilities.map(m => {
        if (m.day === day) return { ...m, is_available: IsEnbaled }
        else return m
      })
      dispatch(memberAvaliabilities(newAvailable))
    }
  }

  const setAvailabilities = isAvailable => {
    if (mAvaliabilities.length > 0) {
      const newAvailable = mAvaliabilities.map(m => {
        return { ...m, is_available: isAvailable }
      })
      dispatch(memberAvaliabilities(newAvailable))
    }

    // if (!isAvailable) {
    //   // const newAvailable = mAvaliabilities.map(m => {
    //     // if (m.day === day) {
    //     //   var time = moment().toDate()
    //     //   console.log('time', time)
    //     //   time.setHours(0)
    //     //   time.setMinutes(0)
    //     //   time.setSeconds(0)
    //     //   time.setMilliseconds(0)

    //     //   return {
    //     //     day: m.day,
    //     //     first_half_starting_time: time,
    //     //     first_half_ending_time: time,
    //     //     second_half_starting_time: time,
    //     //     second_half_ending_time: time,
    //     //     is_available: false,
    //     //   }
    //     // } else {
    //     //   return m
    //     // }
    //   //   return {...m, is_available: false}
    //   // })

    //   dispatch(memberAvaliabilities(newAvailable))
    //   return newAvailable;
    // } else {
    //   return defaultValues
    // }
  }

  const handleUpdateTime = (propertyName, e) => {
    setValue(propertyName, e.target.value)
    console.log('handleUpdateTime', day, propertyName, e.target.value)
    //var currentDate = new Date()
    //currentDate.setTime(e.target.value//)

    const currentDate = getDay(day)
    const updateTime = moment(currentDate).format('YYYY-MM-DD ' + e.target.value + '')
    console.log(moment(updateTime))
    if (mAvaliabilities.length > 0) {
      const newAvailable = mAvaliabilities.map(m => {
        if (m.day === day) {
          switch (propertyName) {
            case 'first_half_starting_time':
              return { ...m, first_half_starting_time: updateTime }
            case 'first_half_ending_time':
              return { ...m, first_half_ending_time: updateTime }
            case 'second_half_starting_time':
              return { ...m, second_half_starting_time: updateTime }
            case 'second_half_ending_time':
              return { ...m, second_half_ending_time: updateTime }
          }
        } else return m
      })
      console.log('newAvailable', newAvailable)
      dispatch(memberAvaliabilities(newAvailable))
    }
  }

  const getDay = day => {
    let cDate = moment(new Date())
    var dayName = moment(cDate).format('dddd')
    console.log('day, dayName', day, dayName)
    while (dayName != day) {
      cDate = cDate.add(1, 'd')
      dayName = moment(cDate).format('dddd')
      console.log('day, dayName', day, dayName)
      console.log('day, dayName', cDate._d)
    }
    
    console.log('getDay', cDate)
    return cDate._d
  }

  useEffect(() => {
    console.log(
      day,
      first_half_starting_time,
      first_half_ending_time,
      second_half_starting_time,
      second_half_ending_time
    )
    setValue('day', day)
    setValue('first_half_starting_time', moment(first_half_starting_time).format('hh:mm'))
    setValue('first_half_ending_time', moment(first_half_ending_time).format('hh:mm'))
    setValue('second_half_starting_time', moment(second_half_starting_time).format('hh:mm'))
    setValue('second_half_ending_time', moment(second_half_ending_time).format('hh:mm'))
    setToggleOn(is_available)
  }, [])

  return (
    <div className="io_availablity mb_25">
      <div className="io_availablity mb_25">
        <div>
          {toggleOn ? (
            <img className="toggle_icon" onClick={e => handleAvailablity(false)} src={ToggleOnIcon} alt="upload" />
          ) : (
            <img className="toggle_icon" onClick={e => handleAvailablity(true)} src={ToggleOnIcOff} alt="upload" />
          )}
        </div>

        <div className="io_day">
          <label>{day.substring(0, 3)}</label>
        </div>
      </div>
      <div className="io_morning_time">
        <div className="io_timelabel">
          Morning
          <div className="io_times">
            <label className="io_from">From:</label>
            <TextField
              {...register('first_half_starting_time', {
                onChange: e => {
                  handleUpdateTime('first_half_starting_time', e)
                },
              })}
              type="time"
              margin="normal"
              disabled={!toggleOn}
              InputProps={{
                className: classes.timeInput,
              }}
            />
            <label className="io_from">To:</label>
            <TextField
              {...register('first_half_ending_time', {
                onChange: e => {
                  handleUpdateTime('first_half_ending_time', e)
                },
              })}
              type="time"
              margin="normal"
              disabled={!toggleOn}
              InputProps={{
                className: classes.timeInput,
              }}
            />
          </div>
        </div>
      </div>
      <div className="io_morning_time">
        <div className="io_timelabel">
          <span>Afternoon</span>

          <div className="io_times">
            <label className="io_from">From:</label>
            <TextField
              {...register('second_half_starting_time', {
                onChange: e => {
                  handleUpdateTime('second_half_starting_time', e)
                },
              })}
              type="time"
              margin="normal"
              disabled={!toggleOn}
              InputProps={{
                className: classes.timeInput,
              }}
            />
            <label className="io_from">To:</label>
            <TextField
              {...register('second_half_ending_time', {
                onChange: e => {
                  handleUpdateTime('second_half_ending_time', e)
                },
              })}
              type="time"
              margin="normal"
              disabled={!toggleOn}
              InputProps={{
                className: classes.timeInput,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default AvailablityItem
