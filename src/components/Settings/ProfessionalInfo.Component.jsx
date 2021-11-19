import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import Dropzone from 'react-dropzone'
import UploadIcon from '../../assets/icons/upload.png'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, convertFromHTML } from 'draft-js'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import UploadFile from './UploadFile.Component'
import AvailablityItem from './AvailablityItem.Component.jsx'
import ToggleOnIcon from '../../assets/icons/toggle_on.png'
import ToggleOnIcOff from '../../assets/icons/toggle_off.png'
import { memberService, commonService, settinService } from '../../services'
import get from 'lodash.get'
import { useSelector, useDispatch } from 'react-redux'
import {
  memberProfessionalInfo,
  memberAvaliabilities,
  memberProfessionalInfoCertificates,
} from '../../redux/actions/memberActions' //'../../../redux/actions/memberActions'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import UploadCertificateFile from './UploadCertificateFile'
import { useParams } from 'react-router-dom'
import './Settings.Component.css'
import Alert from '../Alert/Alert.component'
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  root: {
      display: "flex",
      flexWrap: "wrap",
  },
  formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      background: "#FFFFFF",
      width: '100%'
  },
  dropdownStyle: {
      border: "1px solid black",
      borderRadius: "5px",
      width: '50px',
      height: '200px'
  },
  selectEmpty: {
      marginTop: theme.spacing.unit * 2
  },
  input: {
      background: "#FFFFFF",
      borderRadius: "8px",
      width: '100%'
  },
});

const PersonalInfo = props => {
  const {
    classes
  } = props
  const [profilepic, setProfilePic] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [textCount, setTextCount] = useState(500)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isSpeciality, setIsSpeciality] = useState(false)
  const [speciality, setSpeciality] = useState([])
  const [specialities, setSpecialities] = useState([])
  const [mpToggleOn, setMPToggleOn] = useState(true)
  const [pcToggleOn, setPCToggleOn] = useState(true)
  const [availabilities, setAvailabilities] = useState([])
  const [npiId, setNPIID] = useState('')
  const [email, setEmail] = useState('')
  const { userId } = useParams()
  const dispatch = useDispatch()
  const mProfessionalInfo = useSelector(state => state.memberProfessionalInfo)
  const certificates = useSelector(state => state.memberProfessionalInfoCertificates)
  const mAvaliabilities = useSelector(state => state.memberAvaliabilities)
const [openflash, setOpenFlash] = useState(false)
const [alertMsg, setAlertMsg] = useState('')
const [subLabel, setSubLabel] = useState('')
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
      }}
    />
  )
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  const handleDrop = files => {
    files.forEach((file, index) => {
      selectedFiles.push(file)
      setSelectedFiles([...selectedFiles])
    })
  }

  const onEditorStateChange = editorState => {
    if (editorState) {
      if (editorState.getCurrentContent().getPlainText().length < 500) {
        setEditorState(editorState)
        setTextCount(500 - editorState.getCurrentContent().getPlainText().length)
      } else {
        setTextCount(0)
      }
    } else {
      setEditorState(EditorState.createEmpty())
    }
  }

  const fetchMemberProfessionalInfo = async () => {
    const response = await memberService.getMemberProfessionalInfo(userId).catch(err => {
      console.log(err)
    })
    dispatch(memberProfessionalInfo(response?.data?.data))
    console.log('response', response)
    loadFormData(response?.data?.data)
  }

  useEffect(() => {
    fetchMemberProfessionalInfo()
    console.log('formData', mProfessionalInfo)
    const memberData = mProfessionalInfo.member
    //loadFormData(memberData)
  }, [])

  const handleDeleteSpecialties = () => {}
  const loadFormData = async data => {
    handleSpecialitySearch('')
     const res = await settinService.getMemberDetails(userId).catch(err => {})
     if (get(res, ['data', 'status'], '') === 200) {
       console.log('res', get(res, ['data', 'data', 'data', 'email'], null))
       setEmail(get(res, ['data', 'data', 'data', 'email'], null))
     }
    // setSpecialities(links)
    console.log('load >> formdata', data)
    const mpInfo = data
    if (mpInfo) {
      setValue('npiId', mpInfo.npiId)
      setNPIID(mpInfo.npiId)

      const services = mpInfo.services
      console.log('services', services)
      setMPToggleOn(services?.marketPlace)
      setPCToggleOn(services?.consultation)

      const specialization = mpInfo.specialization

      var tSpecialization = []
      specialization.map(s => {
        const nSpl = {
          id: s._id,
          speciality_name: s.speciality_name,
        }
        tSpecialization.push(nSpl)
      })
      setSpeciality(tSpecialization)

      const availability = mpInfo.availability
      console.log('availability', availability)
      
      getAvailability(availability)
    } else {
      console.log('Else')
      //   setSpeciality(links)
      getAvailability(null)
    }
  }

  const handleSpecialitySearch = async searchText => {
    const response = await commonService.getSpecializations(searchText).catch(err => {
      console.log(err)
    })
    console.log('setSpecialities', response.data.data.data)
    var tSpecializations = []
    var data = response.data?.data?.data
    data?.map(d => {
      tSpecializations.push({
        id: d.id,
        speciality_name: d.speciality_name,
      })
    })
    setSpecialities(tSpecializations)
  }

  const getLabel = value => {
    return (
      <div>
        <Chip variant="outlined" label={value} onDelete={handleDeleteSpecialties} />
      </div>
    )
  }

  const handleChange = (event, value) => {
    setSpeciality(value)
    // console.log(speciality)
  }

  const handleSave = async () => {
    console.log('npiId', npiId)
    console.log('Certificates', certificates)
    console.log('Specialties ', speciality)
    console.log('Availabilty ', mAvaliabilities)
    console.log('Market Place ', mpToggleOn)
    console.log('Presendial Con ', pcToggleOn)

    var newSpecialties = []
    speciality.map(s => {
      newSpecialties.push(s.id)
    })

    var newAvailabilities = []
    mAvaliabilities.map(a => {
      if (a.is_available) {
        const av = {
          day: a.day,
          first_half_starting_time: a.first_half_starting_time,
          first_half_ending_time: a.first_half_ending_time,
          second_half_starting_time: a.second_half_starting_time,
          second_half_ending_time: a.second_half_ending_time,
        }
        newAvailabilities.push(av)
      }
    })

    var newCertificates = []
    certificates.map(c => {
      newCertificates.push(c.certificate_name)
    })

    const formData = {
      email: email,
      npiID: npiId,
      certificates: newCertificates,
      speciality: newSpecialties,
      availabilities: {days: newAvailabilities},
      services: {
        marketPlace: mpToggleOn,
        consultation: pcToggleOn,
      },
    }

    console.log('formData 1234', formData)
    const response = await memberService.updatePrefessionalInfo(formData).catch(err => console.log(err))
    console.log('response', response)
    if (get(response, ['data', 'status'], '') === 200) {
      setOpenFlash(true)
      setAlertMsg('Saved')
      setSubLabel('Your changes are saved')
    }
  }
  const handleCloseFlash = (event, reason) => {
    setOpenFlash(false)
  }

  const getAvailability = newavailability => {
    const defaultValues = [
      {
        day: 'Monday',
        first_half_starting_time: '2021-11-14 07:00:00.000',
        first_half_ending_time: '2021-11-14 12:00:00.000',
        second_half_starting_time: '2021-11-14 12:00:00.000',
        second_half_ending_time: '2021-11-14 22:00:00.000',
        is_available: true,
      },
      {
        day: 'Tuesday',
        first_half_starting_time: '2021-11-14 07:00:00.000',
        first_half_ending_time: '2021-11-14 12:00:00.000',
        second_half_starting_time: '2021-11-14 12:00:00.000',
        second_half_ending_time: '2021-11-14 22:00:00.000',
        is_available: true,
      },
      {
        day: 'Wednesday',
        first_half_starting_time: '2021-11-14 07:00:00.000',
        first_half_ending_time: '2021-11-14 12:00:00.000',
        second_half_starting_time: '2021-11-14 12:00:00.000',
        second_half_ending_time: '2021-11-14 22:00:00.000',
        is_available: true,
      },
      {
        day: 'Thursday',
        first_half_starting_time: '2021-11-14 07:00:00.000',
        first_half_ending_time: '2021-11-14 12:00:00.000',
        second_half_starting_time: '2021-11-14 12:00:00.000',
        second_half_ending_time: '2021-11-14 22:00:00.000',
        is_available: true,
      },
      {
        day: 'Friday',
        first_half_starting_time: '2021-11-14 07:00:00.000',
        first_half_ending_time: '2021-11-14 12:00:00.000',
        second_half_starting_time: '2021-11-14 12:00:00.000',
        second_half_ending_time: '2021-11-14 22:00:00.000',
        is_available: true,
      },
      {
        day: 'Saturday',
        first_half_starting_time: '2021-11-14 07:00:00.000',
        first_half_ending_time: '2021-11-14 12:00:00.000',
        second_half_starting_time: '2021-11-14 12:00:00.000',
        second_half_ending_time: '2021-11-14 22:00:00.000',
        is_available: true,
      },
      {
        day: 'Sunday',
        first_half_starting_time: '2021-11-14 07:00:00.000',
        first_half_ending_time: '2021-11-14 12:00:00.000',
        second_half_starting_time: '2021-11-14 12:00:00.000',
        second_half_ending_time: '2021-11-14 22:00:00.000',
        is_available: true,
      },
    ]
    console.log('newavailability', newavailability)
    // setAvailabilities(defaultValues)

    if (newavailability != null) {
      const nAvailable = defaultValues.map(n => {
        const tAvailable = newavailability.filter(a => a.day === n.day)
        if (tAvailable.length > 0) {
          return {
            day: tAvailable[0].day,
            first_half_starting_time: tAvailable[0].first_half_starting_time,
            first_half_ending_time: tAvailable[0].first_half_ending_time,
            second_half_starting_time: tAvailable[0].second_half_starting_time,
            second_half_ending_time: tAvailable[0].second_half_ending_time,
            is_available: true,
          }
        } else return {...n, is_available: false}
      })
      console.log('NEW Avaliablity', nAvailable)
      setAvailabilities(nAvailable)
      dispatch(memberAvaliabilities(nAvailable))
    } else {
      setAvailabilities(defaultValues)
      dispatch(memberAvaliabilities(defaultValues))
    }
  }
  return (
    <div className="io_p_info">
      <div className="od__row od_flex_space_between">
        <div className="od__p_title io_pl0">
          Professional info
          <div className="io_p_info_label">Update your certificates and professional details here.</div>
        </div>
      </div>

      <ColoredLine color="#E4E7EC" />

      <div className="od__row_p">
        <div className="od_label_p">
          NPI ID <span className="pdc__required">*</span>
        </div>
        <div className="od_input_p">
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            {...register('npiId', {
              required: 'NPI ID is required.',
              onChange: e => setNPIID(e.target.value),
            })}
            margin="normal"
            InputProps={{
              className: classes.input,
            }}
          />
          </FormControl>
        </div>
      </div>
      <ColoredLine color="#E4E7EC" />

      <div className="od__row_p">
        <div className="od_label_p">
          Degrees/Certifications
          <div className="io_p_info_label">Upload the documents</div>
        </div>
        <div className="od_input_p">
          <div className="od_dropzone_prof mb_25">
            <Dropzone
              onDrop={handleDrop}
              accept="image/jpeg, image/png, application/pdf, .pdf, .docx"
              maxSize={524288000}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img className="io_upload_icon" src={UploadIcon} alt="upload" />
                    <p className="io_upload_label">
                      <span className="io_highlite">Click to upload</span> or drag and drop
                      <br />
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          {selectedFiles.map(file => (
            <UploadCertificateFile file={file} />
          ))}
        </div>
      </div>
      <ColoredLine color="#E4E7EC" />
      <div className="od__row_p">
        <div className="od_label_p">
          Specialties <span className="pdc__required">*</span>
        </div>
        <div className="od_input_p">
          <div className="mb_25">
            <Stack spacing={3} sx={{ width: 500 }}>
              <Autocomplete
                multiple
                onChange={(event, value) => {
                  console.log(value)
                  handleChange(event, value)
                }}
                options={specialities}
                getOptionLabel={option => option.speciality_name}
                defaultValues={speciality}
                renderInput={params => <TextField {...params} />}
              />
            </Stack>
          </div>
        </div>
      </div>
      <ColoredLine color="#E4E7EC" />
      <div className="od__row_p_availablity">
        <div className="od_label_p_av">
          Availability <span className="pdc__required">*</span>
        </div>
        <div className="od_input_p">
          {availabilities &&
            availabilities.map(avaliablity => {
              return <AvailablityItem avaliablity={avaliablity} />
            })}
        </div>
      </div>

      <ColoredLine color="#E4E7EC" />
      <div className="od__row_p">
        <div className="od_label_p">
          What services? <span className="pdc__required">*</span>
        </div>
        <div>
          <div className="io_availablity mb_25">
            <div>
              {mpToggleOn ? (
                <img
                  className="toggle_icon"
                  onClick={() => {
                    setMPToggleOn(false)
                  }}
                  src={ToggleOnIcon}
                  alt="upload"
                />
              ) : (
                <img
                  className="toggle_icon"
                  onClick={() => {
                    setMPToggleOn(true)
                  }}
                  src={ToggleOnIcOff}
                  alt="upload"
                />
              )}
            </div>
            <div className="io_services">Marketplace</div>
          </div>
          <div className="io_availablity mb_25">
            <div>
              {pcToggleOn ? (
                <img
                  className="toggle_icon"
                  onClick={() => {
                    setPCToggleOn(false)
                  }}
                  src={ToggleOnIcon}
                  alt="upload"
                />
              ) : (
                <img
                  className="toggle_icon"
                  onClick={() => {
                    setPCToggleOn(true)
                  }}
                  src={ToggleOnIcOff}
                  alt="upload"
                />
              )}
            </div>
            <div className="io_services">Presential Consultation</div>
          </div>
        </div>
      </div>
      <ColoredLine color="#E4E7EC" />
      <div className="od__row od_flex_space_between">
        <div className="od__p_title io_pl0"></div>
        <div className="od__btn__div od__align__right io_pr0">
          <Button className="io_p_cancel">Cancel</Button>

          <Button className="io__save__btn" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
      <Alert handleCloseFlash={handleCloseFlash} alertMsg={alertMsg} openflash={openflash} />
    </div>
  )
}
export default withStyles(styles)(PersonalInfo)
