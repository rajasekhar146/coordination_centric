import React, { useState } from 'react'
import './EnableTwoFactorAuthComponent.Component.css'
import SmsIcon from '../../assets/icons/typing.png'
import DeviceIcon from '../../assets/icons/mobile.png'
import MailIcon from '../../assets/icons/mail.png'
import Button from '@mui/material/Button'
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
import history from '../../history'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const EnableTwoFactorAuth = () => {
    const [activeTab, setActiveTab] = useState(null)

    return (
        <div className="io__two_fa">
            <div className="io__two_justify">
                <div>
                    <label className="header__label">
                        Enable Two Factor Authentication
                    </label>
                </div>
                <div className="io__two_justify">
                    <label className="info__label">
                        Add an extra layer of security to your Coordination Centric
                        account by enabling two-factor authentication - an entirely
                        optional feature of your account. If enabled you will be
                        required to enter a variable code generated by authenticator
                        app each time you log in.
                    </label>
                </div>
                <div className="io__tf_query">
                    <h4 className="io__query">
                        How would you like to recieve your authentication code
                    </h4>
                </div>
                <div className="io__tf__options">
                    <div
                        onClick={() => {
                            setActiveTab('sms')
                        }}
                        className={activeTab === 'sms' ? 'io__active__option' : 'io__nonActive__option'}>
                        <div
                            className="io__option_icon"

                        >
                            <img src={SmsIcon} alt="sms" />
                        </div>
                        <label className="io__text">SMS</label>
                        <span className={activeTab === 1 ? 'io__active__icon' : 'io__nonactive__icon'}>
                            <Brightness1OutlinedIcon sx={{ color: (activeTab === "sms") ? "#E42346" : "#DCDCDC" }} />
                        </span>
                    </div>
                    <div
                        onClick={() => {
                            setActiveTab('email')
                        }}
                        className={activeTab === 'email' ? 'io__active__option' : 'io__nonActive__option'}>
                        <div
                            className="io__option_icon"

                        >
                            <img src={MailIcon} alt="email" />
                        </div>
                        <label className="io__text">Email</label>
                        <span className={activeTab === 2 ? 'io__active__icon' : 'io__nonactive__icon'}>
                            <Brightness1OutlinedIcon sx={{ color: (activeTab === "email") ? "#E42346" : "#DCDCDC" }} />
                        </span>
                    </div>
                    <div
                        onClick={() => {
                            setActiveTab('app')
                        }}
                        className={activeTab === "app" ? 'io__active__option' : 'io__nonActive__option'}>
                        <div
                            className="io__option_icon"

                        >
                            <img src={DeviceIcon} alt="app" />
                        </div>
                        <label className="io__text">App</label>
                        <span className={activeTab === 3 ? 'io__active__icon' : 'io__nonactive__icon'}>
                            <Brightness1OutlinedIcon sx={{ color: (activeTab === 'app') ? "#E42346" : "#DCDCDC" }} />
                        </span>
                    </div>
                </div>
                <div className="io__two_justify io__margin__32 io__width__45">
                    <Button
                        type="submit"
                        className={activeTab ? 'io__activate__enable' : 'io__activate__disable'}
                        onClick={() => {
                            history.push(`/verification/${activeTab}`)
                        }}
                    >
                        Continue
                    </Button>
                </div>
            </div>
            <div className="io__back"
                onClick={() => {
                    history.push('/dashboard')
                }}
            >
                <span className="io__back__arrow"><ArrowBackIosNewIcon fontSize="sm" /></span>
                <label className="io__same__line"> Back</label>
            </div>


        </div>
    )
}

export default EnableTwoFactorAuth
