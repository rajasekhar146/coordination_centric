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
  padding: '15px',
  paddingBottom: '40px',
  paddingTop: 0,
  height: '580px'
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

const menuList = getOptions()

const PatienRecordsComponent = (props) => {

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

  const open = Boolean(anchorEl)
  const classes = useStyles()

  const handleClose = () => {
    setAnchorEl(null)
  }

  const closeModel = () => {
    setInvitePatientClicked(false)
    setOpenInvitePatientSuccess(false)
    setOpenSharePatientRecord(false)
  }


  const getPatientRecords = async () => {
    const res = await memberService.getPatientRecords(userId, limit, skip)
    if (res.status === 200) {
      setPatientRecords(get(res, ['data', 'data', '0', 'totalData'], []))
    } else {

    }

  }

  useEffect(() => {
    getPatientRecords()
  }, [])


  const columns = [
    { id: 'id', label: 'ID', minWidth: 50, align: 'left', visible: false },
    { id: 'first_name', label: 'Patient', minWidth: 180, align: 'left', visible: true },
    { id: 'last_name', label: 'Doctor', minWidth: 100, align: 'left', visible: true },
    { id: 'email', label: 'Email', minWidth: 200, align: 'left', visible: true },
    { id: 'status', label: 'Status', minWidth: 150, align: 'left', visible: true },
    { id: 'action', label: 'Action', minWidth: 40, align: 'center', visible: true },
  ]


  return (
    <div className="od__main__div">
      <div className="od__row">
        <div className="od__title__text">Patient Records</div>
        <div className="od__btn__div od__align__right">
          {1 === 1 ? (
            <Button className="od__add__organization__btn">
              <AddCircleOutlineOutlinedIcon /> &nbsp;&nbsp; Add Record
            </Button>
          ) : null}
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
                  {patientRecords.map((row, index) => (
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
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
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
    </div>
  )
}

export default PatienRecordsComponent
