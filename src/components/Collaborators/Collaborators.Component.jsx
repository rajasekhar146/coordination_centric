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
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination'


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

    const planType = get(currentUser, ['data', 'planType'], '')
    const role = get(currentUser, ['data', 'data', 'role'], false)
    const organizationStatus = get(currentUser, ['data', 'organizationStatus'], false)

    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    const [openflash, setOpenFlash] = React.useState(false)
    const [alertMsg, setAlertMsg] = React.useState('')
    const [subLebel, setSubLabel] = useState('')
    const [totalPage, setTotalPage] = React.useState(0)
    const [openInviteCollaborator, setOpenInviteCollaborator] = useState(false)
    const [openInviteCollaboratorSuccess, setOpenInviteCollaboratorSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(50)
    const [rowsPerPage, setRowsPerPage] = useState(10);

   
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
        <div className="od__main__div">
            <div className="od__row od_flex_space_between">
                <div className="od__title__text">Collaborators</div>
                {role === "superadmin" || (planType !== "free") &&
                    <div className="od__btn__div od">
                        <Button
                            onClick={() => {
                                setOpenInviteCollaborator(true)
                            }}
                            className={role === "superadmin" || organizationStatus === 'active' ? "od__add__organization__btn" : "od__add__organization__btn_disabled"}
                        >
                            &nbsp;&nbsp; Add Collaborator
                        </Button>
                    </div>
                }

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
                color="success"
            />
        </div>

    )
}

export default CollaboratorsComponent
