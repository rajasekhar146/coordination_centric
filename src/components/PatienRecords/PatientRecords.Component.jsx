import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import CircleIcon from '@mui/icons-material/Circle'
import Checkbox from '@mui/material/Checkbox'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import getOptions from '../../models/menuoptions'
import Modal from '@mui/material/Modal'
import InvitePatient from '../ModelPopup/InvitePatient.Component'
import Box from '@mui/material/Box'
import InvitePatientSuccess from '../ModelPopup/InvitePatientSuccess.Component'
import SharePatientRecord from '../ModelPopup/SharePatientRecord.Component'
import PatientItem from './PatientItem.Component'
import { memberService } from '../../services'
import { authenticationService } from '../../services'
import get from 'lodash.get'
import TablePagination from '@mui/material/TablePagination'
import CircularProgress from '@mui/material/CircularProgress';
import AddPatientRecordPopup from './AddrecordPopup'
import Alert from '../Alert/Alert.component'
import './PatientRecords.Component.css'

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

const invitepatientModelStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 0,
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  padding: '0px',
  paddingTop: 0,
  overflow: 'auto'
}

const invitePatientSuccess = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 0,
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  padding: '15px',
}

const addRecordStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: 0,
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  padding: '15px',
}
const menuList = getOptions()

const PatienRecordsComponent = (props) => {
  const {
    fromVideCall,
    setfromVideCall,
    videoClick
  } = props

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [invitePatientClicked, setInvitePatientClicked] = useState(false)
  const [openInvitePatientSuccess, setOpenInvitePatientSuccess] = useState(false)
  const [openSharePatientRecord, setOpenSharePatientRecord] = useState(false)
  const [selectedItem, setSelectedItem] = React.useState(null)
  const currentUser = authenticationService.currentUserValue
  const userId = get(currentUser, ['data', 'data', '_id'], '')
  const role = get(currentUser, ['data', 'data', 'role'], false)
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)
  const [patientRecords, setPatientRecords] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(50)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const open = Boolean(anchorEl)
  const classes = useStyles()
  const [addPatientRecordPopup, setAddPatientRecordPopup] = useState(false)
  const [openflash, setOpenFlash] = React.useState(false)
  const [alertMsg, setAlertMsg] = React.useState('')
  const [subLebel, setSubLabel] = useState('')
  const handleClose = () => {
    setAnchorEl(null)
  }

  const closeModel = () => {
    setInvitePatientClicked(false)
    setOpenInvitePatientSuccess(false)
    setOpenSharePatientRecord(false)
  }

  const getPatientRecords = async () => {
    setIsLoading(true)
    memberService.getPatientRecords(userId, limit, skip).then((res) => {
      setPatientRecords(get(res, ['data', 'data', '0', 'totalData'], []))
      // setCount(get(res, ['data', 'data', '0', 'totalCount', '0', 'count'], 0))
      setIsLoading(false)
    }).catch((err) => {
      console.log(err)
      setIsLoading(false)
    })

  }

  useEffect(() => {
    getPatientRecords()
  }, [skip, limit, rowsPerPage])

  const handleCloseFlash = (event, reason) => {
    setOpenFlash(false)
  }

  const columns = [
    { id: 'id', label: 'ID', minWidth: 50, align: 'left', visible: false },
    { id: 'name', label: 'Patient', minWidth: 180, align: 'left', visible: true },
    { id: 'doctor_name', label: 'Doctor', minWidth: 100, align: 'left', visible: true },
    { id: 'email', label: 'Email', minWidth: 200, align: 'left', visible: true },
    { id: 'state', label: 'Status', minWidth: 150, align: 'left', visible: true },
    { id: 'action', label: 'Action', minWidth: 40, align: 'center', visible: true },
  ]

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

  const closeInviteSuccessModel = () => {
    setAddPatientRecordPopup(false)
  }

  return (
    <div className="od__main__div">
      <div className="od__row">
        <div className="od__title__text">Patient Records</div>
        <div className="od__btn__div od">
          <Button
            onClick={() => {
              setAddPatientRecordPopup(true)
            }}
            className="od_add_member_btn">
            &nbsp;&nbsp; Add Record
          </Button>
        </div>
      </div>
      <div className="od__row">
        <div className="od__table__org">
          <Paper sx={{ width: '100%', height: '40%', overflow: 'hidden' }}>
            <TableContainer id="scrollableDiv" sx={{ maxHeight: 530 }}>
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
                    {patientRecords.length === 0
                      ? <tr>
                        <td className="app_loader" colSpan={15}>
                          <label>No Results Found</label>
                        </td>

                      </tr> :
                      patientRecords.map((row, index) => (
                        <PatientItem
                          row={row}
                          index={index}
                          open={open}
                          handleClose={handleClose}
                          classes={classes}
                          getTextColor={getTextColor}
                          menuList={menuList}
                          setOpenSharePatientRecord={setOpenSharePatientRecord}
                          setInvitePatientClicked={setInvitePatientClicked}
                          setSelectedItem={setSelectedItem}
                          columns={columns}
                          fromVideCall={fromVideCall}
                          setfromVideCall={setfromVideCall}
                          videoClick={videoClick}
                        />
                      ))
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
      <Alert
        handleCloseFlash={handleCloseFlash}
        alertMsg={alertMsg}
        openflash={openflash}
        subLebel={subLebel}
        color="success"
      />
      <Modal
        open={invitePatientClicked}
        // onClose={setIsAcceptClicked}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={invitepatientModelStyle}>
          <InvitePatient
            clickCloseButton={closeModel}
            setOpenInvitePatientSuccess={setOpenInvitePatientSuccess}
            selectedItem={selectedItem}
            userId={userId}
          />
        </Box>
      </Modal>
      <Modal
        open={openInvitePatientSuccess}
        // onClose={setIsAcceptClicked}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={invitePatientSuccess}>
          <InvitePatientSuccess
            clickCloseButton={closeModel}
            getPatientRecords={getPatientRecords}
          />
        </Box>
      </Modal>
      <Modal
        open={openSharePatientRecord}
        // onClose={setIsAcceptClicked}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={invitePatientSuccess}>
          <SharePatientRecord
            clickCloseButton={closeModel}

          />
        </Box>
      </Modal>
      <Modal
        open={addPatientRecordPopup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={addRecordStyle}>
          <AddPatientRecordPopup
            clickCloseButton={closeInviteSuccessModel}
            getPatientRecords={getPatientRecords}
            setAlertMsg={setAlertMsg}
            setOpenFlash={setOpenFlash}
            setSubLabel={setSubLabel}
          />
        </Box>
      </Modal>
    </div>
  )
}

export default PatienRecordsComponent
