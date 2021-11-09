import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import Button from '@mui/material/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel.Component';
import ProfessionalInfo from './PersonalInfo.component'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import './Settings.Component.css'

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
                aria-label="secondary tabs example"
                inkBarStyle={{ background: 'red' }}
                TabIndicatorProps={{ className: classes.indicator }}
            >
                <TabItem value="0" label="My Details" />
                <TabItem value="1" label="Professional Info" />
                <TabItem value="2" label="Password" />
                <TabItem value="3" label="Plan" />
                <TabItem value="4" label="Notifications" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <ProfessionalInfo />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProfessionalInfo />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProfessionalInfo />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ProfessionalInfo />
            </TabPanel>
        </div >
    )
}

export default OrganizationViewComponent
