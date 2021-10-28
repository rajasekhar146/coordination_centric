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
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Alert from '../Alert/Alert.component'
import get from 'lodash.get'
import { authenticationService } from '../../services'
import MenuItemComponent from "./MenuItemComponent";

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
      { text: 'Send Message', icon: require('../../assets/icons/edit_icon.png').default },
      { text: 'Verify', fnKey: 'setIsAcceptClicked', icon: require('../../assets/icons/approve.png').default },
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
      { text: 'Activate', icon: require('../../assets/icons/activate.png').default },
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
      { text: 'Send Message', icon: require('../../assets/icons/edit_icon.png').default },
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
    name: 'All Status', value: "all"
  },
  {
    name: 'Verified', value: "active"
  },
  {
    name: 'Pending Verification', value: "pending_verification"
  },
  {
    name: 'Declined', value: "declined"
  },
  {
    name: 'Pending Acceptance', value: "pending_acceptance"
  },
  {
    name: 'Unverified', value: "unverified"
  },
  {
    name: 'Suspended', value: "inactive"
  },
  {
    name: 'Invited', value: "invited"
  },
  {
    name: 'Cancelled', value: "cancelled"
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
  { id: 'referredBy', label: 'Referred by', minWidth: 110, align: 'left', visible: true },
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
  const [page, setPage] = React.useState(1)
  // const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [menuOptions, setMenuOptions] = React.useState([])
  const [IsAddOrganizationClicked, setAddOrganizationClicked] = React.useState(false)
  const [isRejectClicked, setIsRejectClicked] = useState(false)
  const [isAcceptClicked, setIsAcceptClicked] = useState(false)
  const [isDeactivateClicked, setIsDeactivateClicked] = useState(false)
  const [isCalcelInviteClicked, setIsCancelInviteClicked] = useState(false)
  const [isAcivated, setIsActivateClicked] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const [selectedStatus, setSelectedStatus] = React.useState([
    'all',
    'active',
    'pending_verification',
    'declined',
    'pending_acceptance',
    'unverified',
    'inactive',
    'invited',
    'cancelled',
  ])
  const [rows, setOrganizations] = React.useState([])
  const [totalPage, setTotalPage] = React.useState(0)
  const [skip, setSkip] = React.useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [openflash, setOpenFlash] = React.useState(false)
  const [alertMsg, setAlertMsg] = React.useState('')
  const [isStatusFieldsChanged, setIsStatusFieldsChanged] = React.useState(false)
  const [searchText, setSearchText] = React.useState('')
  const [searchDate, setSearchDate] = React.useState(null)
  const [count, setCount] = React.useState(null)
  const [subLebel, setSubLabel] = useState('')


  // const [searchStatus, setSearchStatus] = React.useState('')
  // useEffect(() => {
  //   getOrganization()
  //   return () => { }
  // }, [])

  const currentUser = authenticationService.currentUserValue
  const organizationStatus = get(currentUser, ['data', 'organizationStatus'], false)
  const role = get(currentUser, ['data', 'data', 'role'], false)

  const planType = get(currentUser, ['data', 'planType'], '')




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
    if (
      !isDeactivateClicked
      && !isRejectClicked
      && !isAcceptClicked
      && !isAcivated
    ) {
      getOrganization(searchText, searchDate, selectedStatus)
    }
    return () => { }
  }, [
    skip,
    isDeactivateClicked,
    searchText,
    searchDate,
    selectedStatus,
    isAcivated
  ])

  useEffect(() => {
    if (isStatusFieldsChanged) {
      getOrganization(searchText, searchDate, selectedStatus)
    }
  }, [isStatusFieldsChanged])



  const handleCloseFlash = (event, reason) => {
    setOpenFlash(false)
  }



  const getOrganization = async (nsearchText, nsearchDate, nsearchStatus) => {
    setIsLoading(true)
    const allOrganizations = await organizationService.allOrganization(skip, 10, nsearchText, nsearchDate, nsearchStatus)
    console.log('allOrganizations', allOrganizations)
    if (allOrganizations != null) {
      const totalCount = get(allOrganizations, 'totalCount', 'count', null)
      console.log('totalCount', totalCount)
      setCount(totalCount)
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
          status: r.status,
          action: '',
        }

        data.push(record)
      })

      console.log('new totalData', data)

      setOrganizations(data)
    }
    setIsLoading(false)
  }

  const handleChange = event => {
    const {
      target: { value },
    } = event
    setSelectedStatus(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const handleChangePage = async (event, newPage) => {
    setPage(newPage)
    const skipRecords = (newPage - 1) * 10
    console.log('skipRecords', skipRecords)
    const allOrganizations = await organizationService.allOrganization(skipRecords, 10, searchText, searchDate, selectedStatus)
    console.log('skipRecords >> Records', allOrganizations)
    const totalCount = get(allOrganizations, 'totalCount', 'count', null)
    console.log('totalCount', totalCount)
    if (allOrganizations != null) {
      const totalData = allOrganizations?.totalData
      console.log('skipRecords >> totalData', totalData)
      setCount(totalCount)
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
          status: r.status,
          action: '',
        }

        data.push(record)
      })

      console.log('new totalData', data)

      setOrganizations(data)
    }
  }

  const handleChangeRowsPerPage = event => {
    // setRowsPerPage(+event.target.value)
    setPage(0)
  }

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

  const handleAddOrganizationOpen = () => {
    setAddOrganizationClicked(true)
    getOrganization()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
    console.log('Page Number >> ', value)
  }

  const loadMore = () => {
    if (rows.length !== count) {
      setSkip(skip + 10)
      setIsLoading(true)
    }
  }

  const handleSearchText = e => {
    setSearchText(e.target.value)
    // getOrganization(e.target.value, searchDate, searchStatus)
  }

  const handleSearchDate = e => {
    setSearchDate(e)
    setOrganizations([])
    setSkip(1)
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


  return (
    <div className="od__main__div">
      <div className="od__row">
        <div className="od__title__text">Organizations Queue</div>
        <div className="od__btn__div od__align__right">
          {role === "superadmin" || (planType === "premium") ? (
            <Button className={role === "superadmin" || organizationStatus === 'active' ? "od__add__organization__btn" : "od__add__organization__btn_disabled"} onClick={handleAddOrganizationOpen}>
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
              <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedStatus}
                // onChange={e => handleSearchStatus(e)}
                input={<OutlinedInput />}
                renderValue={selected => selected.join(', ')}
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
                value={searchDate}
                maxDate={new Date()}
                onChange={e => handleSearchDate(e)}
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
            <TableContainer id="scrollableDiv" sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map(column =>
                      column.visible ? (
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
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(planType === "premium") || (role === "superadmin")
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
                      />
                    ))
                    : null
                  }

                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
      {(planType === "premium" && rows.length >= 10) || (role === "superadmin" && rows.length >= 10)
        ?
        <div className="od__row">
          <div className="od__pagination__section">
            <Stack spacing={2}>
              <Pagination count={totalPage} page={page} variant="outlined" onChange={handleChangePage} shape="rounded" />
            </Stack>
          </div>
        </div>
        : null
      }
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
            clickCloseButton={closeApproveModel}
            setSkip={setSkip}
            selectedOrg={selectedOrg}
            setOrganizations={setOrganizations}
            setOpenFlash={setOpenFlash}
            setAlertMsg={setAlertMsg}
            setSubLabel={setSubLabel}
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
            clickCloseButton={closeApproveModel}
            setSkip={setSkip}
            selectedOrg={selectedOrg}
            setOrganizations={setOrganizations}
            setOpenFlash={setOpenFlash}
            setAlertMsg={setAlertMsg}
            setSubLabel={setSubLabel}
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
            clickCloseButton={closeApproveModel}
            setSkip={setSkip}
            selectedOrg={selectedOrg}
            setOrganizations={setOrganizations}
            setOpenFlash={setOpenFlash}
            setAlertMsg={setAlertMsg}
            setSubLabel={setSubLabel}
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
            clickCloseButton={closeApproveModel}
            setSkip={setSkip}
            selectedOrg={selectedOrg}
            setOrganizations={setOrganizations}
            setOpenFlash={setOpenFlash}
            setAlertMsg={setAlertMsg}
            setSubLabel={setSubLabel}
          />
        </Box>
      </Modal>
      <Alert
        handleCloseFlash={handleCloseFlash}
        alertMsg={alertMsg}
        openflash={openflash}
        subLebel={subLebel}
      />
    </div>
  )
}

export default OrganizationDashboardComponent
