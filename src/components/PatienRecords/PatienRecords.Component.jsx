import React, { useState } from 'react'
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

const rows = [
  { name: 'Rajasekhar', email: 'raj@gmail.com', speciality: 'General Pracice', licence: '145214', date: '05-10-2021' },
  { name: 'Raj', email: 'raju@gmail.com', speciality: 'Dermatologist', licence: '145214', date: '05-10-2021' },
  { name: 'Jhon', email: 'jhon@gmail.com', speciality: 'General Pracice', licence: '145214', date: '05-10-2021' },
  { name: 'ram', email: 'ram@gmail.com', speciality: 'General Pracice', licence: '145214', date: '05-10-2021' },
  { name: 'Rohit', email: 'rohit@gmail.com', speciality: 'General Pracice', licence: '145214', date: '05-10-2021' },
]

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
  const [menuOptions, setMenuOptions] = React.useState([])
  const [invitePatientClicked, setInvitePatientClicked] = useState(false)
  const [openInvitePatientSuccess, setOpenInvitePatientSuccess] = useState(false)
  const [openSharePatientRecord, setOpenSharePatientRecord] = useState(false)

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

  const handleMenuAction = (e, action, index, orgId) => {
    e.preventDefault()
    e.stopPropagation()
    switch (action) {
      case 'setInvitePatientClicked':
        setInvitePatientClicked(true)
        break
      case 'setOpenSharePatientRecord':
        setOpenSharePatientRecord(true)
      default:
        return null
    }
    setAnchorEl(null)
  }

  const handleClick = (event, status) => {
    event.preventDefault()
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
    const menus = menuList.filter(m => m.menu === status.toLowerCase())
    console.log('menus', menus)
    if (menus.length > 0) setMenuOptions(menus[0].options)
    else setMenuOptions([])

    console.log('menus[0].options', menus[0].options)
  }

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
                    <TableCell style={{ fontWeight: 'bold', fontSize: 14 }}>Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: 14 }}>Email</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: 14 }}>Speciality</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: 14 }}>License</TableCell>
                    <TableCell style={{ fontWeight: 'bold', fontSize: 14 }}>Status</TableCell>
                    <TableCell align={'right'} style={{ fontWeight: 'bold', fontSize: 14 }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell key={index}>{row.name}</TableCell>
                      <TableCell key={index}>{row.email}</TableCell>
                      <TableCell key={index}>{row.speciality}</TableCell>
                      <TableCell key={index}>{row.licence}</TableCell>
                      <TableCell
                        key={index}
                      // align={'center'}
                      >
                        <CircleIcon fontSize="small" sx={{ color: '#027A48' }} />
                      </TableCell>
                      <TableCell key={index} align={'right'}>
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={e => handleClick(e, `open`)}
                        >
                          <MoreVertRoundedIcon />
                        </IconButton>
                        <Menu
                          MenuListProps={{
                            'aria-labelledby': 'long-button',
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          className={classes.menu}
                        >
                          {menuOptions.map((option, idx) => (
                            <MenuItem
                              key={option}
                              onClick={e => handleMenuAction(e, option.fnKey, index, row.id)}
                              className={`${classes.menuItem} ${classes[getTextColor(option.text)]} od__menu__row od__menu__text`}
                            >
                              <div className="od__menu__icon__column">
                                <img width={18} src={option.icon} alt={option.text} />
                              </div>
                              <div className="od__menu__text__column">{option.text}</div>
                            </MenuItem>
                          ))}
                        </Menu>
                      </TableCell>
                    </TableRow>
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
