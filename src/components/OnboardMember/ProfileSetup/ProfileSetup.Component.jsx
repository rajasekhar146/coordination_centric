import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import './ProfileSetup.Component.css'
import { useFileUpload } from 'use-file-upload'
import CamerLogo from '../../../assets/icons/camere_logo.png'
import TextField from '@mui/material/TextField'
import history from '../../../history'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { newMember, resetMember } from '../../../redux/actions/memberActions'
import { memberService } from '../../../services'
import userLogo from '../../../assets/icons/user_circle.svg';
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import ConfirmationPopupModel from '../../ModelPopup/ConfirmationPopupModel.Component'
import { useParams } from 'react-router-dom'
import { commonService } from '../../../services'
import get from 'lodash.get'
import { async } from 'rxjs'
import { setQuickProfileSetup } from '../../../redux/actions/commonActions'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 2,
}
const ProfileSetupComponent = () => {
  const defaultSrc =
    'https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png'
  const[profilePicName, setProfilePicName] = useState(null)
  const [files, selectFiles] = useFileUpload()
  var {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const dispatch = useDispatch()
  const member = useSelector(state => state.newMember)
  const [openModel, setBool] = useState('')
  const [prfileUrl, setProfileUrl] = useState('')


  const { invitetoken } = useParams()
  const { referredby } = useParams()
  const { invitedBy } = useParams()
  const arrayBufferToBase64 = buffer => {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
}
const getProfilePic = async profilePicName => {
  console.log('---pro' , profilePicName)
  const urlData = {
      name: `doctors_certificate/${profilePicName}`,
  }
  console.log('---' , urlData)
  const response = await commonService.getProfile(urlData).catch(error => {
      console.log(error)
  })
  if (response && response.data.status === 200) {
      setProfileUrl(arrayBufferToBase64(get(response, ['data', 'data', 'data', 'data'], [])))
  }
}
  useEffect(async () => {
    dispatch(setQuickProfileSetup({activeStep: 1}))
    const newMemberDetail = member?.member
    if (newMemberDetail) {
      setValue('bio', newMemberDetail.bio);
      console.log('-------profile' , newMemberDetail.profilePic)
     await getProfilePic(newMemberDetail.profilePic);
      // setProfileUrl(arrayBufferToBase64(newMemberDetail.profilePic))
    }
  }, [])
  const handleCloseModalPopup = () => {
    setBool(!openModel)
  }
  const onSubmit = async data => {
    var memberData = member.member
    memberData.bio = data.bio
    memberData.profilePic = profilePicName
    dispatch(newMember(memberData))
    console.log('save member data >> ', memberData)
    var response = await memberService.saveMember(memberData).catch(err => {
      console.log(err)
    })
    dispatch(resetMember({}))

    if (response.status === 200) {
      history.push('/signin')
    } else {
      console.log(response)
    }
  }

  return (
    <div className="psp__main__div">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="psp__row">
          <div className="psp__back__button" onClick={newValue => {
                      setBool(true)
                    }}>
            <ArrowBackIosNewIcon /> &nbsp;Back
          </div>
          <div className="psp__step__text">STEP 02/02</div>
        </div>
        <div className="psp_sub_div">
          <div className="psp__row psp__header__text">Setup your profile</div>
          <div className="psp__row psp__subtitle">
            Define the setting of your profile, you can always edit them later.{' '}
          </div>
          <div className="psp__row mar-top-50">
            <div className="psp__image__preview">
              {' '}
              <img className="psp__profile__img" src={files?.source || userLogo} alt="preview" />
            </div>
          </div>
          <div className="psp__row">
            <Button
              className="psp__updload__btn"
              onClick={() =>
                selectFiles({ accept: 'image/*' }, ({ name, size, source, file }) => {
                  const formData = new FormData()
                  formData.append(`image`, file)
                  console.log('Files Selected', { name, size, source, file })
                  memberService
                    .uploadCertificate(formData, 'doctor', null)
                    .then(response => {
                      if (response?.data) {
                        var fileData = response.data
                        console.log('fileData', fileData)
                        setProfilePicName(fileData.data)
                        member.member.profilePic = fileData.data
                    dispatch(newMember(member.member))
                      }
                    })
                    .catch(err => console.log('Error profile pic', err))
                })
              }
            >
              <img src={CamerLogo} /> &nbsp; Upload Profile Photo
            </Button>
          </div>
          <div className="psp__row mar-top-50">
            <div className="psp__label">Short Biography</div>
          </div>

          <div className="psp__row psp__submit__btn__center__align">
            <TextField className="psp__multiline__text__box" {...register('bio')} margin="normal" multiline rows={5} />
            &nbsp; &nbsp;
            <Button className="psp__next__btn" type="submit">
              Submit &nbsp;
              <ArrowForwardIosRoundedIcon />
            </Button>
          </div>
        </div>
        <Modal open={openModel } aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={modalStyle}>
              <ConfirmationPopupModel closeScreen={handleCloseModalPopup} url={`/members/personal-detail/${invitetoken}/${referredby}/${invitedBy}`} />
            </Box>
          </Modal>
      </form>
    </div>
  )
}

export default ProfileSetupComponent
