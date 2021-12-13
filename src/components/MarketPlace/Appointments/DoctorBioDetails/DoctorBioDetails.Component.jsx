import React, { useEffect, useState } from 'react'
import './DoctorBioDetails.Component.css'
import Button from '@mui/material/Button'
import DoctorDetailsComponent from './DoctorDetails/DoctorDetails.Component'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import history from '../../../../history'
import ReactStars from 'react-rating-stars-component'
import { settinService } from '../../../../services'
import get from 'lodash.get'
import moment from 'moment'
import {
  primaryAppointmentDate,
  secondaryAppointmentDate,
  appointmentAvailableTimeSlots,
  calendarAppointmentDate,
} from '../../../../redux/actions/commonActions' //'../../../redux/actions/commonActions'
import { useSelector, useDispatch } from 'react-redux'
const DoctorBioDetailsComponent = props => {
  const dispatch = useDispatch()
  const [doctorInfo, setDoctorInfo] = useState()
  const startProperty = {
    size: 30,
    value: 4.5,
    edit: false,
    isHalf: true,
    //   color: "blue",
    // activeColor: "red",
  }

  useEffect(() => {
    getDoctorBioInfo(props.id)
  }, [props.id])

  const getDoctorBioInfo = id => {
    settinService.getMemberDetails(id).then(
      res => {
        let info = get(res, ['data', 'data', 'data'], [])
        console.log('Get doctorBio', info)
        if (res?.data?.status === 200) {
          let obj = {
            name: info.first_name.charAt(0).toUpperCase() + info.first_name.slice(1) + ' ' + info.last_name,
            bioText: styleBioText(info?.biograhpy_object?.blocks?.[0]),
            profilePic: info.profilePic,
            speciality: info.speciality,
          }

          setDoctorInfo(obj)
        }
      },
      error => {
        console.log('Get doctorBio', error)
      }
    )
  }
  const styleBioText = bioObject => {
    if (!bioObject) return
    let text = bioObject.text
    let style = bioObject.inlineStyleRanges
    style.forEach(element => {
      let string = text.substring(element.offset, element.length)
      if (element.style == 'BOLD') {
        string = string.bold()
      }
      if (element.style == 'ITALIC') {
        string = string.italics()
      }

      text = replaceRange(text, element.offset, element.length, string)
    })
    return text
  }

  const replaceRange = (s, start, end, substitute) => {
    return s.substring(0, start) + substitute + s.substring(end)
  }

  const moveBack = () => {
    const selectedDate = {
      Day: null,
      timings: {
        startTime: null,
        endTime: null,
        timeSlotId: null,
      },
    }
    
    const calenderDate = {
        Year: moment().format('YYYY'),
        Month: moment().format('MM'),
        Day: moment().format('DD'),
    }
    console.log('moveBack >> calenderDate', calenderDate)
    // dispatch(appointmentAvailableTimeSlots([]))
    dispatch(calendarAppointmentDate(calenderDate))
    dispatch(primaryAppointmentDate(selectedDate))
    dispatch(secondaryAppointmentDate(selectedDate))
    history.push('/marketplace')
  }
  return (
    <div className="dbd__main__div">
      <div className="dbd__row">
        <div>
          <Button className="dbd__button" onClick={moveBack}>
            <ArrowBackIosNewIcon fontSize="sm" /> &nbsp;&nbsp; Back
          </Button>
        </div>
        <div className="dbd__doctor__name">Dr.{doctorInfo?.name}</div>
      </div>
      <div className="dbd__row">
        <div className="dbd__doctor__bio__details">
          <DoctorDetailsComponent
            name={doctorInfo?.name}
            pic={doctorInfo?.profilePic}
            speciality={doctorInfo?.speciality}
          />
        </div>
        <div className="dbd__bio__details">
          <div className="dbd__doctor__section">
            <div className="dbd__row">
              <div className="dbd__bio__name">Biography</div>
            </div>
            <div className="dbd__row">
              <div className="dbd__bio__section__details" dangerouslySetInnerHTML={{ __html: doctorInfo?.bioText }}>
                {/* {doctorInfo.bioText} */}
              </div>
            </div>
            <div
              className="dbd__row"
              style={{
                paddingBottom: 0,
                borderTopWidth: 1,
                borderTopColor: '#f1e9e9',
                borderTopStyle: 'solid',
                marginTop: 15,
                paddingTop: 20,
              }}
            >
              <div className="dbd__bio__name" style={{ paddingBottom: 0 }}>
                Rating
              </div>
            </div>
            <div className="dbd__row" style={{ paddingTop: 0 }}>
              <ReactStars {...startProperty} />{' '}
              <div className="dbd__bio__name" style={{ marginTop: 5, fontSize: 16, marginLeft: 5 }}>
                4.5
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorBioDetailsComponent
