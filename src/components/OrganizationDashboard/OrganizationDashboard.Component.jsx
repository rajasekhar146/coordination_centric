import React, { useEffect, useState, useMemo } from 'react'
import './OrganizationDashboard.Component.css'
import Button from '@mui/material/Button'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import InviteOrganization from '../../pages/invite-organization'
import TextField from '@mui/material/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import OrganisationItem from './OrganisationItem'
import EditIcon from '../../assets/icons/edit_icon.png'
import { organizationService } from '../../services'
import InfiniteScroll from 'react-infinite-scroll-component'
import AprroveOrganization from '../../pages/approve-model'
import RejectOrganization from '../../pages/reject-model'
import DeactivateOrganization from '../../pages/deactivate_model'
import CancelInviteModel from '../ModelPopup/CancelInviteModel'
import VerifyBankingInfoPopup from '../ModelPopup/VerifyBankingInfoPopup'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Alert from '../Alert/Alert.component'
import get from 'lodash.get'
import { authenticationService, memberService } from '../../services'
import MenuItemComponent from "./MenuItemComponent";
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
}

const approveModelStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 298,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
}
const rejectModelStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 360,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
}
const verifyBankModelStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
}

const useStyles = makeStyles(theme => ({
  menuItem: {
    fontSize: 14,
    borderBottom: '1px solid #E8E8E8',
    paddingTop: 5,
    paddingBottom: 15,
    display: 'flex',
    justifyContent: "space-between"
  },
  approved: {
    color: '#03B575',
  },
  reject: {
    color: '#E74F48',
  },
  defaultStyle: {
    color: '#25282B',
  },
  menu: {
    padding: 0,
    position: 'fixed',
    zIndex: 1300,
    right: 0,
    left: -75,
    top: 0,
    bottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
}))

const options1 = [
  {
    id: 1,
    label: 'Active',
    icon: '',
  },
  {
    id: 2,
    label: 'Disabled',
    icon: '',
  },
  {
    id: 3,
    label: 'Pending',
    icon: '',
  },
  {
    id: 4,
    label: 'Sent',
    icon: '',
  },
  {
    id: 5,
    label: 'Edit',
    icon: '',
  },
  {
    id: 6,
    label: 'Resent Invitation',
    icon: '',
  },
  {
    id: 7,
    label: 'View Details',
    icon: '',
  },
  {
    id: 8,
    label: 'Approve',
    icon: '',
  },
  {
    id: 9,
    label: 'Reject',
    icon: '',
  },
]

const menuList = [
  {
    menu: 'sent',
    options: [
      // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
      { text: 'Resent Invitation', icon: require('../../assets/icons/resent_invitation.png').default },
    ],
  },
  {
    menu: 'pending_verification',
    options: [
      { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
      // { text: 'Send Message', icon: require('../../assets/icons/edit_icon.png').default },
      { text: 'Verify', fnKey: 'setIsAcceptClicked', icon: require('../../assets/icons/approve.png').default },
      // { text: 'Verify', icon: require('../../assets/icons/suspend.png').default },
      { text: 'Reject', fnKey: 'setIsRejectClicked', icon: require('../../assets/icons/reject.png').default },
    ],
  },
  {
    menu: 'pending_bank_verification',
    options: [
      { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
      // { text: 'Send Message', icon: require('../../assets/icons/edit_icon.png').default },
      { text: 'Verify', fnKey: 'setIsVerifyBankClicked', icon: require('../../assets/icons/approve.png').default },
      // { text: 'Verify', icon: require('../../assets/icons/suspend.png').default },
      { text: 'Reject', fnKey: 'setIsRejectClicked', icon: require('../../assets/icons/reject.png').default },
    ],
  },
  {
    menu: 'cancelled',
    options: [
      { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
      // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
      // { text: 'Resent Invitation', icon: require('../../assets/icons/resent_invitation.png').default },
      // { text: 'Suspend', icon: require('../../assets/icons/suspend.png').default },
    ],
  },
  {
    menu: 'declined',
    options: [
      { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
      // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
      // { text: 'Resent Invitation', icon: require('../../assets/icons/resent_invitation.png').default },
      // { text: 'Suspend', icon: require('../../assets/icons/suspend.png').default },
    ],
  },
  {
    menu: 'active',
    options: [
      { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
      // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
      { text: 'Deactivate', fnKey: 'setIsDeactivateClicked', icon: require('../../assets/icons/suspend.png').default },
    ],
  },
  {
    menu: 'inactive',
    options: [
      { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
      // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
      { text: 'Activate', fnKey: 'setIsActivateClicked', icon: require('../../assets/icons/activate.png').default },
    ],
  },
  {
    menu: 'invited',
    options: [
      { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
      {
        text: 'Resend Invitation',
        fnKey: 'setIsResendClicked',
        icon: require('../../assets/icons/resent_invitation.png').default,
      },
      {
        text: 'Cancel Invite',
        fnKey: 'setIsCancelInviteClicked',
        icon: require('../../assets/icons/suspend.png').default,
      },
    ],
  },

  {
    menu: 'suspended',
    options: [
      { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
      // { text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default },
      { text: 'Activate', fnKey: 'setIsActivateClickedFromSuspend', icon: require('../../assets/icons/activate.png').default },
    ],
  },
  {
    menu: 'verified',
    options: [
      { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
      { text: 'Deactivate', icon: require('../../assets/icons/edit_icon.png').default },
    ],
  },
  {
    menu: 'unverified',
    options: [
      { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
      { text: 'Send Message', icon: require('../../assets/icons/edit_icon.png').default },
      { text: 'Verify', fnKey: 'setIsAcceptClicked', icon: require('../../assets/icons/approve.png').default },
      { text: 'Reject', fnKey: 'setIsRejectClicked', icon: require('../../assets/icons/reject.png').default },
    ],
  },
  {
    menu: 'pending_acceptance',
    options: [
      { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
      // { text: 'Send Message', icon: require('../../assets/icons/edit_icon.png').default },
      { text: 'Verify', icon: require('../../assets/icons/suspend.png').default },
      { text: 'Reject', fnKey: 'setIsRejectClicked', icon: require('../../assets/icons/reject.png').default },
    ],
  },
  {
    menu: 'cancelled',
    options: [
      { text: 'View Details', fnKey: 'viewdetails', icon: require('../../assets/icons/view_details.png').default },
      {
        text: 'Resend Invitation',
        fnKey: 'setIsResendClicked',
        icon: require('../../assets/icons/resent_invitation.png').default,
      },
      { text: 'Cancel Invite', icon: require('../../assets/icons/suspend.png').default },
    ],
  },
]

const ITEM_HEIGHT = 60

const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const statusNames = [
  {
    name: 'All Status', value: "All Status", key: "all"
  },
  {
    name: 'Verified', value: "Verified", key: "active"
  },
  {
    name: 'Pending Verification', value: "Pending Verification", key: "pending_verification"
  },
  {
    name: 'Pending Bank Verification', value: "Pending Bank Verification", key: "pending_bank_verification"
  },
  {
    name: 'Declined', value: "Declined", key: "declined"
  },
  {
    name: 'Pending Acceptance', value: "Pending Acceptance", key: "pending_acceptance"
  },
  {
    name: 'Unverified', value: "Unverified", key: "unverified"
  },
  {
    name: 'Suspended', value: "Suspended", key: "inactive"
  },
  {
    name: 'Invited', value: "Invited", key: "invited"
  },
  {
    name: 'Cancelled', value: "Cancelled", key: "cancelled"
  }
]

const columns1 = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2),
  },
]

const columns = [
  { id: 'id', label: 'ID', minWidth: 0, align: 'left', visible: false },
  { id: 'facilityName', label: 'Organization Name', minWidth: 180, align: 'left', visible: true },
  { id: 'orgName', label: 'Org Admin', minWidth: 100, align: 'left', visible: true },
  { id: 'facilityAddress', label: 'Address', minWidth: 200, align: 'left', visible: true },
  { id: 'invited_facilityName', label: 'Referred by', minWidth: 110, align: 'left', visible: true },
  { id: 'status', label: 'Status', minWidth: 150, align: 'left', visible: true },
  { id: 'action', label: 'Action', minWidth: 40, align: 'center', visible: true },
]

const colorcodes = {
  invited: '#2E90FA',
  pending_verification: '#F79009',
  active: '#12B76A',
  pending_acceptance: '#7A5AF8',
  cancelled: '#757500',
  inactive: '#A0A4A8',
  declined: '#B42318',
  pending_bank_verification: '#F79009'
}

const createData = (name, code, population, size) => {
  const density = population / size
  return { name, code, population, size, density }
}

const createRowData = (id, name, address, status, action) => {
  return { id, name, address, status, action }
}

const rows1 = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
]

// const rows = [
//   createRowData(1, 'Saint Barnabas Medical Center', '3891 Ranchview Dr. Richardson, California 62639', 'Active', null),
//   createRowData(2, 'St. Francis Hospital', '6391 Elgin St. Celina, Delaware 10299', 'Declined', null),
//   createRowData(3, 'Montefiore Medical Center', '2118 Thornridge Cir. Syracuse, Connecticut 35624', 'Pending', null),
// ]

const OrganizationDashboardComponent = () => {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  // const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [menuOptions, setMenuOptions] = React.useState([])
  const [IsAddOrganizationClicked, setAddOrganizationClicked] = React.useState(false)
  const [isRejectClicked, setIsRejectClicked] = useState(false)
  const [isAcceptClicked, setIsAcceptClicked] = useState(false)
  const [isDeactivateClicked, setIsDeactivateClicked] = useState(false)
  const [isVerifyBankClicked, setIsVerifyBankClicked] = useState(false);
  const [isCalcelInviteClicked, setIsCancelInviteClicked] = useState(false)
  const [isAcivated, setIsActivateClicked] = useState(false)
  const [isActivateClickedFromSuspend, setIsActivateClickedFromSuspend] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const [selectedStatus, setSelectedStatus] = React.useState([

  ])
  const [rows, setOrganizations] = React.useState([])
  const [totalPage, setTotalPage] = React.useState(0)
  const [skip, setSkip] = React.useState(0)
  const [limit, setLimit] = useState(10)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [openflash, setOpenFlash] = React.useState(false)
  const [alertMsg, setAlertMsg] = React.useState('')
  const [isStatusFieldsChanged, setIsStatusFieldsChanged] = React.useState(false)
  const [searchText, setSearchText] = React.useState('')
  const [searchStartDate, setSearchStartDate] = React.useState(null)
  const [searchEndDate, setSearchEndDate] = React.useState(null)
  const [count, setCount] = React.useState(null)
  const [subLebel, setSubLabel] = useState('')
  const [alertColor, setAlertColor] = useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [firstDeposit, setFirstDeposit] = useState(0)
  const [secondDeposit, setSecondDeposit] = useState(0)
  const [secondDepositErr, setSecondDepositErr] = useState(false)
  const [firstDepositErr, setFirstDepositErr] = useState(false)

  // const [searchStatus, setSearchStatus] = React.useState('')
  // useEffect(() => {
  //   getOrganization()
  //   return () => { }
  // }, [])

  const currentUser = authenticationService.currentUserValue
  const organizationStatus = get(currentUser, ['data', 'organizationStatus'], false)
  const role = get(currentUser, ['data', 'data', 'role'], false)
  const organizationId = get(currentUser, ['data', 'data', '_id'], '')

  const planType = get(currentUser, ['data', 'data', 'planType'], '')



  // const memoizedStateList = useMemo(() => {
  //   setSelectedStatus()
  // }, [selectedStatus]);



  const getTextColor = text => {
    switch (text) {
      case 'Approve':
        return 'approved'
        break
      case 'Reject':
        return 'reject'
        break
      default:
        return 'defaultStyle'
    }
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      if (
        !isDeactivateClicked
        && !isRejectClicked
        && !isAcceptClicked
        && !isAcivated
      ) {
        setIsLoading(true)
        getOrganization(searchText, searchStartDate, searchEndDate, selectedStatus)
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [
    skip,
    isDeactivateClicked,
    searchText,
    searchStartDate,
    searchEndDate,
    selectedStatus,
    isAcivated,
    rowsPerPage
  ])

  useEffect(() => {
    if (isStatusFieldsChanged) {
      getOrganization(searchText, searchStartDate, searchEndDate, selectedStatus)
    }
  }, [isStatusFieldsChanged])



  const handleCloseFlash = (event, reason) => {
    setOpenFlash(false)
  }

  const setOrganisations = (allOrganizations) => {
    if (allOrganizations != null) {
      const totalCount = get(allOrganizations, 'totalCount', 'count', null)
      console.log('totalCount', totalCount)
      setCount(totalCount.count)
      var totalData = allOrganizations?.totalData
      const totalPage = Math.ceil(totalCount?.count / 10)
      var data = []

      console.log('totalPage', totalPage)
      // console.log('totalCount', totalCount?.count)
      // console.log('totalData', totalData)
      setTotalPage(totalPage)

      totalData.map(r => {
        var admin = r.admin
        console.log(admin)

        var fullName = ''
        if (admin?.length > 0) fullName = admin[0].fullName
        var record = {
          id: r._id,
          facilityName: r.facilityName,
          orgName: fullName,
          facilityAddress: r.facilityAddress,
          referredBy: r.referred_by == "0" ? '' : r.referred_by,
          invited_facilityName: get(r, ['invited_facilityName'], ''),
          status: r.status,
          action: '',
          planType: r?.planType,
        }

        data.push(record)
      })
      console.log('new totalData', data)
      setOrganizations(data)
    }
  }



  const getOrganization = () => {
    setIsLoading(true)
    let allOrganizations;
    if (role === 'admin') {
      // memberService.getStaffList(organizationId, 'facility', limit, skip).then((res) => {
      organizationService.allOrganization(skip, limit, searchText, searchStartDate, searchEndDate, selectedStatus).then((data) => {
        setOrganisations(data)
        setIsLoading(false)
      }).catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
    } else {
      organizationService.allOrganization(skip, limit, searchText, searchStartDate, searchEndDate, selectedStatus).then((data) => {
        setOrganisations(data)
        setIsLoading(false)
      }).catch((err) => {
        setIsLoading(false)
      })
    } console.log('allOrganizations', allOrganizations)
  }

  // const handleChange = event => {
  //   const {
  //     target: { value },
  //   } = event
  //   setSelectedStatus(
  //     // On autofill we get a the stringified value.
  //     typeof value === 'string' ? value.split(',') : value
  //   )
  // }

  // const handleChangePage = async (event, newPage) => {
  //   setPage(newPage)
  //   const skipRecords = (newPage - 1) * 10
  //   console.log('skipRecords', skipRecords)
  //   let allOrganizations;
  //   if (role === 'admin') {
  //     memberService.getStaffList(organizationId, 'facility', 10, skipRecords).then((data) => {
  //       allOrganizations = data
  //       setOrganisations(data)
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  //   } else {
  //     organizationService.allOrganization(skipRecords, 10, searchText, searchStartDate, searchEndDate, selectedStatus).then((data) => {
  //       allOrganizations = data
  //       setOrganisations(data)
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  //   }
  // }

  const handleAddOrganizationClose = () => {
    console.log('On Click - Close button')
    setAddOrganizationClicked(false)
    getOrganization()
  }

  const closeApproveModel = () => {
    setIsAcceptClicked(false)
    setIsRejectClicked(false)
    setIsDeactivateClicked(false)
    setIsCancelInviteClicked(false)
    getOrganization()
  }

  const closeVerifyBankButton = () => {
    setIsVerifyBankClicked(false)
    getOrganization()

  }

  const verifyBankHanlde = () => {
    setFirstDepositErr(false);
    setSecondDepositErr(false)
    if (!firstDeposit && !secondDeposit) {
      setFirstDepositErr(true);
      setSecondDepositErr(true)
      return;
    }
    if (!firstDeposit) {
      setFirstDepositErr(true);
      return
    }
    if (!secondDeposit) {
      setSecondDepositErr(true)
      return
    }
    const amnt = [];
    amnt.push(Number(firstDeposit))
    amnt.push(Number(secondDeposit))
    const bankDetail = {
      amount: amnt,
      facilityId: selectedOrg.id
    }

    organizationService.verifyBankHanlde(bankDetail).then((data, err) => {
      if (data.data) {
        setOpenFlash(true)
        setAlertMsg('Verified')
        setSubLabel(data.data.message)
        setAlertColor('success')
      } else {
        setOpenFlash(true)
        setAlertMsg('Error')
        setSubLabel('You have tried to verify 3 times. To continue please reach out to us directly.')
        setAlertColor('fail')
      }
      setIsVerifyBankClicked(false)
      getOrganization();


    })

  }

  const handleAddOrganizationOpen = () => {
    setAddOrganizationClicked(true)
    getOrganization()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSkip(limit * newPage)
    setIsLoading(true)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setSkip(0)
    setLimit(parseInt(event.target.value, 10))
    setIsLoading(true)
  };

  // const loadMore = () => {
  //   if (rows.length !== count) {
  //     setSkip(skip + 10)
  //     setIsLoading(true)
  //   }
  // }

  const handleSearchText = e => {
    setSearchText(e.target.value)
    // getOrganization(e.target.value, searchDate, searchStatus)
  }

  const handleSearchStartDate = e => {
    console.log('start Date', e)
    setSearchStartDate(e)
    setOrganizations([])
    setSkip(0)
    // getOrganization(searchText, e, searchStatus)
  }

  const handleSearchEndDate = e => {
    console.log('end Date', e)
    setSearchEndDate(e)
    setOrganizations([])
    setSkip(0)
    // getOrganization(searchText, e, searchStatus)
  }

  const handleSearchStatus = e => {
    if (e.target.value.indexOf('All Status') > -1) {
      setSelectedStatus([...statusNames])
    } else {
      setSelectedStatus(e.target.value)
    }
    // setSearchStatus(e.target.value)
    // getOrganization(searchText, searchDate, e.target.value)
  }

  const handleClear = () => {
    setSearchText('')
    setSearchStartDate(null)
    setSearchEndDate(null)
    setSelectedStatus([])
  }


  return (
    <div className="od__main__div">
      <div className="od__row od_flex_space_between">
        <div className="od__title__text">Organizations Queue</div>
        <div className="od__btn__div od__align__right">
          <Button className="od_clear_btn" onClick={handleClear}>
            &nbsp;&nbsp; Clear Filters
          </Button>
          {role === "superadmin" ? (
            <Button className="od__add__organization__btn" onClick={handleAddOrganizationOpen}>
              <AddCircleOutlineOutlinedIcon /> &nbsp;&nbsp; Invite Organization
            </Button>
          ) : null}
        </div>
      </div>
      <div className="od__row">
        <div className="od__left__section">
          <TextField
            margin="normal"
            placeholder="Search"
            onChange={e => handleSearchText(e)}
            value={searchText}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: '#CACCCF' }} />
                </InputAdornment>
              ),
              className: 'od__serach__text',
            }}
          />
        </div>
        <div className="od__right__section od_status">
          <div style={{ width: "162px" }} className="od__btn__div">
            <FormControl sx={{ m: 1, width: 200 }}>
              {/* <InputLabel id="demo-multiple-checkbox-label">Status</InputLabel> */}
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                inputProps={{ placeholder: 'select' }}

                value={selectedStatus}
                // onChange={e => handleSearchStatus(e)}
                input={<OutlinedInput placeholder='Status' />}
                renderValue={selected => {
                  return selected.map(element => element.name).join(', ')

                }}

                MenuProps={MenuProps}
                className="od__date__field"
              >
                {statusNames.map(status => (
                  <MenuItemComponent
                    selectedStatus={selectedStatus}
                    status={status}
                    setSelectedStatus={setSelectedStatus}
                    statusNames={statusNames}
                    setIsStatusFieldsChanged={setIsStatusFieldsChanged}
                  />
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="od__btn__div">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={searchEndDate}
                maxDate={new Date()}
                onChange={e => handleSearchEndDate(e)}
                renderInput={params => <TextField {...params} />}
                InputProps={{ className: 'od__date__field' }}
              />
            </LocalizationProvider>
          </div>
          <div className="od__btn__div">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={searchStartDate}
                maxDate={new Date()}
                onChange={e => handleSearchStartDate(e)}
                renderInput={params => <TextField {...params} />}
                InputProps={{ className: 'od__date__field' }}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>

      <div className="od__row">
        <div className="od__table__org">
          <Paper sx={{ width: '100%', height: '40%', overflow: 'hidden' }}>
            <TableContainer id="scrollableDiv" sx={{ maxHeight: 470 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map(column =>
                      column.id === 'invited_facilityName' && role !== 'superadmin' ? (
                        null
                      ) : (column.visible ? (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            fontWeight: 'bold',
                            fontSize: 14,
                            visibility: column.visible ? 'visible' : 'hidden',
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ) : null
                      ))
                    }


                  </TableRow>
                </TableHead>

                {isLoading
                  ? <TableBody>
                    <tr>
                      <td className="app_loader" colSpan={15}>
                        <CircularProgress />
                      </td>
                    </tr>
                  </TableBody>
                  :
                  <TableBody >

                    {rows.length === 0
                      ? <tr>
                        <td className="app_loader" colSpan={15}>
                          <label>No Results Found</label>
                        </td>

                      </tr> :
                      (planType !== "free") || (role === "superadmin")
                        ? rows.map((row, index) => (
                          <OrganisationItem
                            row={row}
                            index={index}
                            columns={columns}
                            colorcodes={colorcodes}
                            open={open}
                            handleClose={handleClose}
                            classes={classes}
                            menuOptions={menuOptions}
                            setIsRejectClicked={setIsRejectClicked}
                            setIsAcceptClicked={setIsAcceptClicked}
                            setIsDeactivateClicked={setIsDeactivateClicked}
                            setIsVerifyBankClicked={setIsVerifyBankClicked}
                            getTextColor={getTextColor}
                            setSelectedOrg={setSelectedOrg}
                            rows={rows}
                            menuList={menuList}
                            setSkip={setSkip}
                            setOrganizations={setOrganizations}
                            setOpenFlash={setOpenFlash}
                            setAlertMsg={setAlertMsg}
                            setIsCancelInviteClicked={setIsCancelInviteClicked}
                            setSubLabel={setSubLabel}
                            setIsActivateClicked={setIsActivateClicked}
                            role={role}
                            setAlertcolor={setAlertColor}
                            setIsActivateClickedFromSuspend={setIsActivateClickedFromSuspend}
                            getOrganization={getOrganization}
                          />
                        ))
                        : null
                    }

                  </TableBody>
                }
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25]}
              count={count}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
      {/* {(planType !== "free" && count > 10) || (role === "superadmin" && count > 10)
        ?
        <div className="od__row">
          <div className="od__pagination__section">
            <Stack spacing={2}>
              <Pagination count={totalPage} page={page} variant="outlined" onChange={handleChangePage} shape="rounded" />
            </Stack>
          </div>
        </div>
        : null
      } */}

      <Modal
        open={IsAddOrganizationClicked}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InviteOrganization
            clickCloseButton={handleAddOrganizationClose}
            getOrganization={getOrganization}
            setOpenFlash={setOpenFlash}
            setAlertMsg={setAlertMsg}
            setSubLabel={setSubLabel}
            setAlertColor={setAlertColor}
          />
        </Box>
      </Modal>
      <Modal
        open={isRejectClicked}
        // onClose={closeApproveModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={rejectModelStyle}>
          <RejectOrganization
            getOrganization={getOrganization}
            clickCloseButton={closeApproveModel}
            setSkip={setSkip}
            selectedOrg={selectedOrg}
            setOrganizations={setOrganizations}
            setOpenFlash={setOpenFlash}
            setAlertMsg={setAlertMsg}
            setSubLabel={setSubLabel}
            setAlertColor={setAlertColor}
          />
        </Box>
      </Modal>
      <Modal
        open={isAcceptClicked}
        // onClose={setIsAcceptClicked}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={approveModelStyle}>
          <AprroveOrganization
            getOrganization={getOrganization}
            clickCloseButton={closeApproveModel}
            setSkip={setSkip}
            selectedOrg={selectedOrg}
            setOrganizations={setOrganizations}
            setOpenFlash={setOpenFlash}
            setAlertMsg={setAlertMsg}
            setSubLabel={setSubLabel}
            setAlertColor={setAlertColor}
          />
        </Box>
      </Modal>
      <Modal
        open={isDeactivateClicked}
        // onClose={setIsAcceptClicked}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={approveModelStyle}>
          <DeactivateOrganization
            getOrganization={getOrganization}
            clickCloseButton={closeApproveModel}
            setSkip={setSkip}
            selectedOrg={selectedOrg}
            setOrganizations={setOrganizations}
            setOpenFlash={setOpenFlash}
            setAlertMsg={setAlertMsg}
            setSubLabel={setSubLabel}
            setAlertColor={setAlertColor}
          />
        </Box>
      </Modal>
      <Modal
        open={isCalcelInviteClicked}
        // onClose={setIsAcceptClicked}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={approveModelStyle}>
          <CancelInviteModel
            getOrganization={getOrganization}
            clickCloseButton={closeApproveModel}
            setSkip={setSkip}
            selectedOrg={selectedOrg}
            setOrganizations={setOrganizations}
            setOpenFlash={setOpenFlash}
            setAlertMsg={setAlertMsg}
            setSubLabel={setSubLabel}
            setAlertColor={setAlertColor}
          />
        </Box>
      </Modal>
      <Modal
        open={isVerifyBankClicked}
        // onClose={setIsAcceptClicked}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={verifyBankModelStyle}>
          <VerifyBankingInfoPopup
            clickCloseButton={closeVerifyBankButton}
            clickSubmitButton={verifyBankHanlde}
            setSkip={setSkip}
            selectedOrg={selectedOrg}
            setOrganizations={setOrganizations}
            setOpenFlash={setOpenFlash}
            setAlertMsg={setAlertMsg}
            setSubLabel={setSubLabel}
            setAlertColor={setAlertColor}
            setFirstDeposit={setFirstDeposit}
            setSecondDeposit={setSecondDeposit}
            firstDeposit={firstDeposit}
            secondDeposit={secondDeposit}
            firstDepositErr={firstDepositErr}
            secondDepositErr={secondDepositErr}
            setFirstDepositErr={setFirstDepositErr}
            setSecondDepositErr={setSecondDepositErr}

          />
        </Box>
      </Modal>

      <Alert
        handleCloseFlash={handleCloseFlash}
        alertMsg={alertMsg}
        openflash={openflash}
        subLebel={subLebel}
        color={alertColor}
      />
    </div>
  )
}

export default OrganizationDashboardComponent
