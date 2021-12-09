import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import CollaboratorItem from './CollaboratorItem'
import get from 'lodash.get';
import { memberService } from '../../services'
import { authenticationService } from '../../services'
import Button from '@mui/material/Button'
import Alert from '../Alert/Alert.component'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';
import InviteCollaborator from '../ModelPopup/InviteCollaboratorComponent'
import InviteCollaboratorSuccess from '../ModelPopup/InviteCollaboratorSuccess'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'

const columns = [
    { id: 'id', label: 'ID', minWidth: 50, align: 'left', visible: false },
    { id: 'facilityName', label: 'Name', minWidth: 180, align: 'left', visible: true },
    { id: 'facilityEmail', label: 'Email', minWidth: 100, align: 'left', visible: true },
    { id: 'role', label: 'Role', minWidth: 200, align: 'left', visible: true },
    { id: 'status', label: 'Status', minWidth: 150, align: 'left', visible: true },
    { id: 'action', label: 'Action', minWidth: 40, align: 'center', visible: true },
]

const colorcodes = {
    invited: '#2E90FA',
    active: '#12B76A',
    inactive: '#A0A4A8',
}

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
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    border: 0,
    borderRadius: '10px'
}

const CollaboratorsComponent = props => {

    const [collaboratorList, setCollaboratorList] = React.useState([])
    const currentUser = authenticationService.currentUserValue
    const organizationId = get(currentUser, ['data', 'data', '_id'], '')
    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    const [openflash, setOpenFlash] = React.useState(false)
    const [alertMsg, setAlertMsg] = React.useState('')
    const [subLebel, setSubLabel] = useState('')
    const [totalPage, setTotalPage] = React.useState(0)
    const [openInviteCollaborator, setOpenInviteCollaborator] = useState(false)
    const [openInviteCollaboratorSuccess, setOpenInviteCollaboratorSuccess] = useState(false)
    const [page, setPage] = React.useState(1)

    const getStaffList = async () => {
        const res = await memberService.getStaffList(organizationId, 'facility', limit, skip)
        if (res.status === 200) {
            setCollaboratorList(get(res, ['data', 'data', '0', 'totalData'], []))
        } else {

        }

    }

    useEffect(() => {
        getStaffList()
    }, [collaboratorList.length, skip])

    const handleCloseFlash = (event, reason) => {
        setOpenFlash(false)
    }

    const closeInviteModel = () => {
        setOpenInviteCollaborator(false)
    }


    const closeInviteSuccessModel = () => {
        setOpenInviteCollaboratorSuccess(false)
    }

    const handleChangePage = async (event, newPage) => {
        setPage(newPage)
        const skipRecords = (newPage - 1) * 10
        setSkip(skipRecords)

    }

    return (
        <div className="od__main__div">
            <div className="od__row od_flex_space_between">
                <div className="od__title__text">Collaborators</div>
                <div className="od__btn__div od">
                    <Button
                        onClick={() => {
                            setOpenInviteCollaborator(true)
                        }}
                        className="od_add_member_btn">
                        &nbsp;&nbsp; Add Collaborator
                    </Button>
                </div>

            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                            {collaboratorList.map((row, index) => (
                                <CollaboratorItem
                                    row={row}
                                    index={index}
                                    columns={columns}
                                    setOpenFlash={setOpenFlash}
                                    setAlertMsg={setAlertMsg}
                                    setSubLabel={setSubLabel}
                                    setCollaboratorList={setCollaboratorList}
                                    setSkip={setSkip}
                                    organizationId={organizationId}
                                />
                            ))
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Modal
                open={openInviteCollaborator}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <InviteCollaborator
                        clickCloseButton={closeInviteModel}
                        setOpenInviteCollaborator={setOpenInviteCollaborator}
                        setOpenInviteCollaboratorSuccess={setOpenInviteCollaboratorSuccess}
                        organizationId={organizationId}
                        setCollaboratorList={setCollaboratorList}
                    />
                </Box>
            </Modal>
            <Modal
                open={openInviteCollaboratorSuccess}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <InviteCollaboratorSuccess
                        clickCloseButton={closeInviteSuccessModel}
                    />
                </Box>
            </Modal>
            {collaboratorList.length >= 10
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
            <Alert
                handleCloseFlash={handleCloseFlash}
                alertMsg={alertMsg}
                openflash={openflash}
                subLebel={subLebel}
                color = "success"
            />
        </div>

    )
}

export default CollaboratorsComponent
