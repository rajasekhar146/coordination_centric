import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import Button from '@mui/material/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel.Component';
import PersonalInfo from './PersonalInfo.component'
import ProfessionalInfo from './ProfessionalInfo.Component'
import PatientHealthDetails from './PatientHealthDetails.Component'
import { settinService } from '../../services'
import get from 'lodash.get'
import PasswordSettings from './PasswordSettings.Component'
import InsuranceComponent from './Insurance.Component';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import './Settings.Component.css'
import Alert from '../Alert/Alert.component'

const useStyles = makeStyles(theme => ({
    indicator: {
        backgroundColor: "#E42346",
        height: "3px"
    }
}));



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 0,
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
}

const successStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    border: 0,
    borderRadius: '10px'
}
const OrganizationViewComponent = () => {
    const classes = useStyles()
    const history = useHistory()
    const [value, setValue] = React.useState('0');
    const { userId } = useParams()
    const [userDetails, setUserDetails] = useState(null)
    const [openflash, setOpenFlash] = React.useState(false)
    const [alertMsg, setAlertMsg] = React.useState('')
    const [subLebel, setSubLabel] = useState('')


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(async () => {
        const res = await settinService.getMemberDetails(userId).catch((err) => {

        })
        if (get(res, ['data', "status"], '') === 200) {
            // setValue('first_name', res?.data?.first_name)
            // setValue('middle_name', res?.data?.middle_name)
            // setValue('last_name', res?.data?.last_name)
            // setValue('ssn', res?.data?.ssn)
            // setValue('occupation', res?.data?.occupation)
            // // setValue('dob', newMemberDetail.dob)
            // setValue('phoneNumber', res?.data?.phoneNumber)
            // setValue('gender', res?.data?.gender)
            // setValue('address', res?.data?.address)
            // // setValue('country', newMemberDetail.country)
            // // setValue('state', newMemberDetail.state)
            // setValue('city', res?.data?.city)
            // setValue('postalCode', res?.data?.postalCode)
            // setValue('gender', res?.data?.gender)
            console.log(get(res, ['data', 'data', 'data'], null))
            setUserDetails(get(res, ['data', 'data', 'data'], null))
        } else {
            console.log(res)
        }

    }, [])

    const handleCloseFlash = (event, reason) => {
        setOpenFlash(false)
    }



    const TabItem = withStyles((theme) => ({
        root: {
            backgroundColor: '#F6F8FB',
            color: '#667085',
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: 500,
            '&:hover': {
                backgroundColor: '#F6F8FB',
                color: '#667085',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontWeight: 500,
            },
            '&$selected': {
                backgroundColor: '#F6F8FB',
                color: '#E42346',
                fontWeight: theme.typography.fontWeightMedium,
            },
        },
        tab: {
            padding: '0.5rem',
            fontFamily: 'Open Sans',
            fontSize: '2rem',
            backgroundColor: 'grey',
            color: 'black',
            '&:hover': {
                backgroundColor: 'red',
                color: 'white',
                opacity: 1,
            },
        },
        selected: {},
    }))((props) => <Tab {...props} />)




    return (
        <div className="od__setting__div">
            <div
                className="io__back_setting"
                onClick={() => {
                    history.push('/dashboard')
                }}
            >
                <span className="io__back__arrow_setting">
                    <ArrowBackIosNewIcon fontSize="sm" />
                </span>
                <label className="io__same__line"> Back to Dashboard </label>
            </div>
            <div className="io_setting_label">
                <label className="io__same__line"> Settings </label>
            </div>

            <Tabs
                value={value}
                // textColor="secondary"
                // indicatorColor="secondary"
                onChange={handleChange}
                aria-label="secondary tabs example"
                inkBarStyle={{ background: 'red' }}
                TabIndicatorProps={{ className: classes.indicator }}
            >
                <TabItem value="0" label="My Details" />
                {/* {get(userDetails, ['role'], '') === 'doctor'
                    && <TabItem value="1" label="Professional Info" />
                }
                {get(userDetails, ['role'], '') === 'patient'
                    && <TabItem value="2" label="Health Info" />
                } */}

                <TabItem value="1" label="Professional Info" />


                <TabItem value="2" label="Health Info" />

                <TabItem value="3" label="Password" />
                <TabItem value="4" label="2Factor-Authentication" />
                <TabItem value="5" label="Insurance Information" />
                <TabItem value="6" label="Notifications" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <PersonalInfo
                    userDetails={userDetails}
                    setOpenFlash={setOpenFlash}
                    setAlertMsg={setAlertMsg}
                    setSubLabel={setSubLabel}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProfessionalInfo />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PatientHealthDetails
                    userDetails={userDetails}
                    setOpenFlash={setOpenFlash}
                    setAlertMsg={setAlertMsg}
                    setSubLabel={setSubLabel}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <PasswordSettings
                    setOpenFlash={setOpenFlash}
                    setAlertMsg={setAlertMsg}
                    setSubLabel={setSubLabel}
                />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <InsuranceComponent
                    setOpenFlash={setOpenFlash}
                    setAlertMsg={setAlertMsg}
                    setSubLabel={setSubLabel}
                />
            </TabPanel>
            <Alert
                handleCloseFlash={handleCloseFlash}
                alertMsg={alertMsg}
                openflash={openflash}
                subLebel={subLebel}
            />
        </div >
    )
}

export default OrganizationViewComponent
