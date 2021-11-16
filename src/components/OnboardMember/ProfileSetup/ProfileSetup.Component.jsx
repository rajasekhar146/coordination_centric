import React, { useEffect } from 'react'
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

const ProfileSetupComponent = () => {
  const defaultSrc =
    'https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png'

  const [files, selectFiles] = useFileUpload()
  var {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const dispatch = useDispatch()
  const member = useSelector(state => state.newMember)

  console.log('member', member)

  useEffect(() => {
    const newMemberDetail = member?.member
    if (newMemberDetail) {
      setValue('bio', newMemberDetail.bio)
    }
  }, [])

  const onSubmit = async data => {
    var memberData = member.member
    memberData.bio = data.bio
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
          <div className="psp__back__button" onClick={e => history.push('/members/personal-detail')}>
            <ArrowBackIosNewIcon /> &nbsp;Back
          </div>
          <div className="psp__step__text">STEP 02/02</div>
        </div>
        <div className="psp__row psp__header__space"></div>
        <div className="psp__row psp__header__text">Setup your profile</div>
        <div className="psp__row psp__subtitle">
          Define the setting of your profile, you can always edit them later.{' '}
        </div>
        <div className="psp__row">
          <div className="psp__image__preview">
            {' '}
            <img className="psp__profile__img" src={files?.source || defaultSrc} alt="preview" />
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
                memberService.uploadCertificate(formData, 'doctor', null)
              })
            }
          >
            <img src={CamerLogo} /> &nbsp; Upload Profile Photo
          </Button>
        </div>
        <div className="psp__row">
          <div className="psp__label">Short Biography</div>
        </div>

        <div className="psp__row psp__submit__btn__center__align">
          <TextField
            className="psp__multiline__text__box"
            style={{ width: '600px' }}
            {...register('bio')}
            margin="normal"
            multiline
            rows={5}
          />
          &nbsp; &nbsp;
          <Button className="psp__next__btn" type="submit">
            Submit &nbsp;
            <ArrowForwardIosRoundedIcon />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProfileSetupComponent
