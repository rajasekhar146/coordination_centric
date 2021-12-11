import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import Dropzone from 'react-dropzone'
import UploadIcon from '../../assets/icons/upload.png'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, convertFromHTML, convertFromRaw } from 'draft-js'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import { setCountries } from '../../redux/actions/commonActions'
import { useSelector, useDispatch } from 'react-redux'
import { commonService } from '../../services'
import { settinService } from '../../services'
import { memberService } from '../../services'
import FormControl from '@material-ui/core/FormControl'
import moment from 'moment-timezone'
import { withStyles } from '@material-ui/core/styles'
import history from '../../history'
import get from 'lodash.get'
import { memberSpecialties } from '../../redux/actions/memberActions'
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    background: '#FFFFFF',
    width: '100%',
  },
  dropdownStyle: {
    border: '1px solid black',
    borderRadius: '5px',
    width: '50px',
    height: '200px',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  input: {
    background: '#FFFFFF',
    borderRadius: '8px',
    width: '100%',
  },
})

const PersonalInfo = props => {
  const timezones = moment.tz.names()
  console.log(timezones)

  const { userDetails, classes, setOpenFlash, setAlertMsg, setSubLabel, getMemberDetails ,setAlertColor} = props
  const [profilepic, setProfilePic] = useState('')
  const [prfileUrl, setProfileUrl] = useState('')
  const [updatedUrl, setUpdatedUrl] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [textCount, setTextCount] = useState(500)
  const dispatch = useDispatch()
  const [countries, setAllCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedTimeZone, setSelectedTimeZone] = useState('')
  const [states, setStates] = useState([])
  const [amazonProfileURL, setAmazonProfileURL] = useState([])
  const memberSpecialities = useSelector(state => state.memberSpecialties)
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const arrayBufferToBase64 = buffer => {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }

  const getProfile = async userDetails => {
    const urlData = {
      name: `doctors_certificate/${userDetails.profilePic}`,
    }
    const response = await commonService.getProfile(urlData).catch(error => {
      console.log(error)
    })
    if (response && response.data.status === 200) {
      setProfileUrl(arrayBufferToBase64(get(response, ['data', 'data', 'data', 'data'], [])))
    }
  }

  const fetchMemberProfessionalInfo = async () => {
    const response = await settinService.getProfessionalInfoDetails().catch(err => {
      console.log(err)
    })
    const memberData = get(response, ['data', 'data', 'data'], null)
    console.log('response', memberData)

    const specialization = memberData?.specialization

    var tSpecialization = []
    if (specialization) {
      specialization.map(s => {
        const nSpl = {
          id: s._id,
          speciality_name: s.speciality_name,
        }
        tSpecialization.push(nSpl)
      })
    }
    console.log('tSpecialization', tSpecialization)
    dispatch(memberSpecialties(tSpecialization))
  }

  useEffect(async () => {
    fetchCountries()
    await fetchMemberProfessionalInfo()
    console.log('userDetails', userDetails)
    if (get(userDetails, ['biograhpy_object'], null)) {
      userDetails.biograhpy_object.entityMap = {}
      const data = convertFromRaw(userDetails.biograhpy_object)
      setEditorState(EditorState.createWithContent(data))
    } else if (get(userDetails, ['bio'], '')) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw({
            entityMap: {},
            blocks: [
              {
                key: 'd2h1g',
                text: `${get(userDetails, ['bio'], '')}`,
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
          })
        )
      )
    }
    setValue('first_name', get(userDetails, ['first_name'], ''))
    setValue('middle_name', get(userDetails, ['middle_name'], ''))
    setValue('last_name', get(userDetails, ['last_name'], ''))
    setValue('email', get(userDetails, ['email'], ''))
    setValue('role', get(userDetails, ['role'], ''))
    // setValue('phoneNumber', get(userDetails, ['phoneNumber'], ''))
    // setValue('gender', get(userDetails, ['ssn'], ''))
    // setValue('address', get(userDetails, ['ssn'], ''))
    // setValue('country', get(userDetails, ['country'], ''))
    setSelectedCountry(get(userDetails, ['country'], ''))
    setSelectedTimeZone(get(userDetails, ['timezone'], ''))
    setProfilePic(get(userDetails, ['profilePic'], ''))
    setAmazonProfileURL(get(userDetails , ['profilePic'] , ''))
    setValue('country', get(userDetails, ['country'], ''))
    setValue('city', get(userDetails, ['city'], ''))
    await fetchStates(get(userDetails, ['country'], ''))
    setValue('state', get(userDetails, ['state'], ''))
    setValue('postalCode', get(userDetails, ['postalCode'], ''))
    // setValue('postalCode', get(userDetails, ['ssn'], ''))
    // setValue('gender', get(userDetails, ['ssn'], ''))
    if (userDetails) {
      getProfile(userDetails)
    }
  }, [userDetails])

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
      }}
    />
  )

  const handleDrop = files => {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
      const reader = new FileReader()
      // reader.onload = () => {
      //   setUpdatedUrl(URL.createObjectURL(file))
       
  })
      memberService
      .uploadFile(formData
        // setProgress(Math.round((100 * event.loaded) / event.total));
      )
      .then(response => {
        setAmazonProfileURL(response.data.data)
      })
      .catch(() => {})
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
  const fetchCountries = async () => {
    const response = await commonService.getCountries().catch(error => {
      console.log(error)
    })

    console.log('getCountries', response.data.data)
    setAllCountries(response.data.data.data)
    dispatch(setCountries(response.data.data.data))
  }

  const onSubmit = async data => {
    data.timezone = selectedTimeZone
    //data.country = selectedCountry
    data.profilePic = amazonProfileURL
    data.biograhpy_object = convertToRaw(editorState.getCurrentContent())
    const res = await settinService.updateMemberDetails(userDetails._id, data).catch(err => {})
    if (get(res, ['data', 'status'], '') === 200) {
      setOpenFlash(true)
      setAlertMsg('Updated')
      setSubLabel('Your changes are updated successfully')
      setAlertColor('success')
      getMemberDetails()
    }
  }

  const fetchStates = async selectedCountryCode => {
    console.log('selected country code: ' + selectedCountryCode)
    const response = await commonService.getStates(selectedCountryCode).catch(error => {
      console.log(error)
    })

    setStates(response.data.data.data)
  }

  return (
    <div className="io_p_info">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="od__row od_flex_space_between">
          <div className="od__p_title io_pl0">
            Personal info
            <div className="io_p_info_label">Update your photo and personal details here.</div>
          </div>
        </div>

        <ColoredLine color="#E4E7EC" />

        <div className="od__row_p">
          <div className="od_label_p">First Name</div>
          <div className="od_input_p">
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                {...register('first_name', {
                  required: 'First Name is required.',
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
          <div className="od_label_p">Last Name</div>
          <div className="od_input_p">
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                {...register('last_name', {
                  required: 'Last Name is required.',
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
          <div className="od_label_p">Email address</div>
          <div className="od_input_p">
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                {...register('email', {
                  required: 'Email is required.',
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
            Your photo
            <div className="io_p_info_label">This will be displayed on your profile.</div>
          </div>
          <div className="od_input_p io_drop">
            <div className="od_dropzone">
              <Dropzone onDrop={handleDrop} accept="image/jpeg, image/png, image/svg, image/gif" maxSize={524288000}>
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
            <div>
              {profilepic && (
                <img
                  src={amazonProfileURL}
                  alt="profile"
                  className="io_profile"
                />
              )}
            </div>
          </div>
        </div>
        <ColoredLine color="#E4E7EC" />
        <div className="od__row_p">
          <div className="od_label_p">Role</div>
          <div className="od_input_p ">
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                {...register('role', {
                  required: 'role is required.',
                })}
                disabled
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
            <div className="od_address_label mb_25">Country</div>
            <div className="od_address_label mb_25">State</div>
            <div className="od_address_label mb_25">City</div>
            <div className="od_address_label mb_25">Zipcode</div>
          </div>
          <div className="od_input_p">
            <div className="od_address mb_25">
            <select
            {...register('country')}
            className="ac__dropdown"
            onChange={e => fetchStates(e.target.value)}
          >
            {countries &&
              countries.map(c => (
                <option value={c.code} key={c.code} className="ac__dropdown">
                  {c.name}
                </option>
              ))}
          </select>
            </div>
            <div className="mb_25">
            <select {...register('state')} className="ac__dropdown">
            {states &&
              states.map(c => (
                <option value={c.statecode} key={c.statecode} className="ac__dropdown">
                  {c.name}
                </option>
              ))}
          </select>
            </div>
            <div className="mb_25">
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  {...register('city', {
                    required: 'city is required.',
                  })}
                  margin="normal"
                  InputProps={{
                    className: classes.input,
                  }}
                />
              </FormControl>
            </div>
            <div className="mb_25">
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  {...register('postalCode', {
                    required: 'zipcode is required.',
                  })}
                  margin="normal"
                  InputProps={{
                    className: classes.input,
                  }}
                />
              </FormControl>
            </div>
          </div>

          {/* <div className="od_label_p" >
                        Country
                    </div> */}
        </div>
        <ColoredLine color="#E4E7EC" />
        <div className="od__row_p">
          <div className="od_label_p">Timezone</div>
          <div className="od_input_p">
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                // {...register('timezone', {
                //     required: 'timezone is required.',
                // })}
                onChange={e => {
                  setSelectedTimeZone(e.target.value)
                }}
                value={selectedTimeZone}
                MenuProps={{ classes: { paper: classes.dropdownStyle } }}
                id="demo-simple-select-helper"
                // value={userDetails.timezone}
              >
                {timezones.map(op => (
                  <MenuItem key={op} value={op}>
                    <ListItemText primary={op} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <Select 
                        className={classes.select}
                        onChange={e => register({ name: 'timezone', value: e.target.value })}>
                            {timezones.map(op => (
                                <MenuItem key={op} value={op}>
                                    <ListItemText primary={op} />
                                </MenuItem>
                            ))}
                            </Select> */}
          </div>
        </div>
        <ColoredLine color="#E4E7EC" />
        <div className="od__row_p">
          <div className="od_label_p">
            Bio
            <div className="io_p_info_label">Write a short introduction.</div>
          </div>
          <div className="od_input_p">
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                options: ['inline', 'list'],
                inline: {
                  inDropdown: false,
                  className: 'test',
                  component: undefined,
                  dropdownClassName: undefined,
                  options: ['bold', 'italic'],
                  bold: { className: 'test', style: { color: 'red' } },
                  italic: { className: undefined },
                  underline: { className: undefined },
                },
                list: {
                  inDropdown: false,
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                  options: ['unordered', 'ordered', 'indent', 'outdent'],
                },
              }}
            />
            <p className="io_count_label">{textCount} characters left</p>
          </div>
        </div>
        <ColoredLine color="#E4E7EC" />
        <div className="od__row od_flex_space_between">
          <div className="od__p_title io_pl0"></div>
          <div className="od__btn__div od__align__right io_pr0">
            <Button
              onClick={() => {
                history.push('/dashboard')
              }}
              className="io_p_cancel"
            >
              Cancel
            </Button>

            <Button type="submit" className="io__save__btn">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default withStyles(styles)(PersonalInfo)
