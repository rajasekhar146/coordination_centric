import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './OrganizationView.component.css'
import StatusMenu from './StatusMenu'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Document } from 'react-pdf'
import Modal from '@mui/material/Modal'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel.Component';
import Overview from './Overview.Component';
import Members from './Members.Component';
import InviteMemberComponent from '../ModelPopup/InviteMemberComponent'
import InviteMemberSuccess from '../ModelPopup/MemberInvitationSuccess'
import { organizationService } from '../../services'
import { makeStyles, withStyles } from '@material-ui/core/styles'

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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const successStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}
const OrganizationViewComponent = () => {
    const classes = useStyles()
    const { orgId } = useParams()
    const history = useHistory()
    const [orgDet, setOrgDetails] = useState({})
    const [value, setValue] = React.useState('0');
    const [openInviteMember, setOpenInviteMember] = useState(false)
    const [openInviteMemberSuccess, setOpenInviteMemberSuccess] = useState(false)



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getOrgDetails()
    }, [])



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

    const getOrgDetails = async () => {
        let orgDetails = await organizationService.getOrganizationDetails(orgId)
        setOrgDetails(orgDetails)
    }

    const getButton = () => {
        switch (value) {
            case '1':
                return (
                    <div className="od__btn__div od">
                        <Button 
                        onClick={() => {
                            setOpenInviteMember(true)
                        }}
                        className="od_add_member_btn">
                            &nbsp;&nbsp; Add Member
                        </Button>
                    </div>
                )
                break
            case '2':
                break
            default:
                return null
        }
    }

    const closeModel = () => {
        setOpenInviteMember(false)
        setOpenInviteMemberSuccess(false)
    }

    return (
        <div className="od__main__div">
            <div className="od__row od_flex_space_between">
                <div className="headerCont">
                    <Button
                        variant="outlined"
                        color="error"
                        className="backBtn"
                        onClick={() => {
                            history.push('/organizations')
                        }}
                    >

                        <ArrowBackIosNewIcon style={{ fontSize: '10', marginRight: '4' }} /> Back
                    </Button>
                    <h5 className="orgTitle">{orgDet && orgDet.facilityName}</h5>

                </div>
                {getButton()}

            </div>
            <Tabs
                value={value}
                onChange={handleChange}
                // textColor="secondary"
                // indicatorColor="secondary"
                aria-label="secondary tabs example"
                inkBarStyle={{ background: 'red' }}
                TabIndicatorProps={{ className: classes.indicator }}
            >
                <TabItem value="0" label="Overview" />
                <TabItem value="1" label="Members" />
                <TabItem value="2" label="Collaborators" />
                <TabItem value="3" label="Patients" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Overview orgDet={orgDet} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Members orgDet={orgDet} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Three
            </TabPanel>
            <Modal
                open={openInviteMember}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <InviteMemberComponent
                        clickCloseButton={closeModel}
                        setOpenInviteMemberSuccess={setOpenInviteMemberSuccess}
                        // setSkip={setSkip}
                        // selectedOrg={selectedOrg}
                        // setOrganizations={setOrganizations}
                        // setOpenFlash={setOpenFlash}
                        // setAlertMsg={setAlertMsg}
                        // setSubLabel={setSubLabel}
                    />
                </Box>
            </Modal>
            <Modal
                open={openInviteMemberSuccess}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={successStyle}>
                <InviteMemberSuccess
                        clickCloseButton={closeModel}
                        // setSkip={setSkip}
                        // selectedOrg={selectedOrg}
                        // setOrganizations={setOrganizations}
                        // setOpenFlash={setOpenFlash}
                        // setAlertMsg={setAlertMsg}
                        // setSubLabel={setSubLabel}
                    />
                </Box>
            </Modal>
        </div >
    )
}

export default OrganizationViewComponent
