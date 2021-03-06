import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import CollaboratorItem from './CollaboratorItem.Component'
import get from 'lodash.get'
import { memberService } from '../../services'
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination'
import InviteCollaborator from '../ModelPopup/InviteCollaboratorComponent'
import InviteCollaboratorSuccess from '../ModelPopup/InviteCollaboratorSuccess'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

const columns = [
    { id: 'facilityName', label: 'Name', minWidth: 180, align: 'left', visible: true },
    { id: 'facilityEmail', label: 'Email', minWidth: 100, align: 'left', visible: true },
    // { id: 'roles', label: 'Role', minWidth: 200, align: 'left', visible: true },
    { id: 'status', label: 'Status', minWidth: 150, align: 'left', visible: true },
    { id: 'action', label: 'Action', minWidth: 40, align: 'center', visible: true },
]


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
const colorcodes = {
    invited: '#2E90FA',
    pending_verification: '#F79009',
    active: '#12B76A',
    pending_acceptance: '#7A5AF8',
    cancelled: '#757500',
    inactive: '#A0A4A8',
    declined: '#B42318',
}


const CollaboratorComponent = props => {
    const {
        orgDet,
        colorcodes,
        organizationId,
        setCollaboratorList,
        collaboratorList,
        setOpenFlash,
        setAlertMsg,
        setSubLabel,
        setAlertColor,
        orgId,
        openInviteCollaborator,
        setOpenInviteCollaborator,
        openInviteCollaboratorSuccess,
        setOpenInviteCollaboratorSuccess
    } = props

    // const collaboratorList = get(orgDet, ['invited_facilityName'], [])

    const [anchorEl, setAnchorEl] = React.useState(null)
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(10)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(50)
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const closeInviteModel = () => {
        setOpenInviteCollaborator(false)
    }

    const closeInviteSuccessModel = () => {
        setOpenInviteCollaboratorSuccess(false)
        getStaffList()
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const getStaffList = async () => {
        setIsLoading(true)
        memberService.getStaffList(organizationId, 'facility', limit, skip).then((res) => {
            setCollaboratorList(get(res, ['data', 'data', '0', 'totalData'], []))
            setCount(get(res, ['data', 'data', '0', 'totalCount', '0', 'count'], []))
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
        })
    }
    useEffect(() => {
        getStaffList()
    }, [collaboratorList.length, skip, limit, rowsPerPage])

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


    return (
        <div>
            <Paper sx={{ width: '100%', height: '40%', overflow: 'hidden' }}>
                <TableContainer id="scrollableDiv" sx={{ maxHeight: 500 }}>
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

                                {collaboratorList.length === 0
                                    ? <tr>
                                        <td className="app_loader" colSpan={15}>
                                            <label>No Results Found</label>
                                        </td>

                                    </tr> :
                                    collaboratorList.map((row, index) => (
                                        <CollaboratorItem
                                            row={row}
                                            index={index}
                                            columns={columns}
                                            setAnchorEl={setAnchorEl}
                                            handleClose={handleClose}
                                            setOpenFlash={setOpenFlash}
                                            setAlertMsg={setAlertMsg}
                                            setSubLabel={setSubLabel}
                                            setCollaboratorList={setCollaboratorList}
                                            setSkip={setSkip}
                                            organizationId={organizationId}
                                            collaboratorList={collaboratorList}
                                            getStaffList={getStaffList}
                                            setAlertColor={setAlertColor}
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
                        orgId={orgId}
                        organizationId={get(orgDet, ['user_details', '0', '_id'], null)}
                        setCollaboratorList={{setCollaboratorList}}
                        collaboratorList={collaboratorList}
                        // setMembersList={setMembersList}
                        // setOpenFlash={setOpenFlash}
                        // setAlertMsg={setAlertMsg}
                        // setSubLabel={setSubLabel}
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
        </div>
    )
}

export default CollaboratorComponent
