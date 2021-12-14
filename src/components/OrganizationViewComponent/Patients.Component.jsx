import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import PatientItem from './PatientItem'
import get from 'lodash.get'
import { memberService } from '../../services'
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination'


const columns = [
    { id: 'name', label: 'Name', minWidth: 180, align: 'left', visible: true },
    { id: 'email', label: 'Email', minWidth: 100, align: 'left', visible: true },
    { id: 'memberStatus', label: 'Status', minWidth: 150, align: 'left', visible: true },
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

const PatientComponent = props => {
    const {
        orgDet,
        colorcodes,
        organizationId,
        patientList,
        setPatientList,
        setOpenFlash,
        setAlertMsg,
        setSubLabel,
    } = props




    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClose = () => {
        setAnchorEl(null)
    }

    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    // const [openflash, setOpenFlash] = React.useState(false)
    // const [alertMsg, setAlertMsg] = React.useState('')
    // const [subLebel, setSubLabel] = useState('')
    const [totalPage, setTotalPage] = React.useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(50)
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const getStaffList = async () => {
        setIsLoading(true)
        memberService.getStaffList(organizationId, 'patient', limit, skip).then((res) => {
            setPatientList(get(res, ['data', 'data', '0', 'totalData'], []))
            setCount(get(res, ['data', 'data', '0', 'totalCount', '0', 'count'], []))
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getStaffList()
    }, [patientList.length, skip, limit, rowsPerPage])

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

                                {patientList.length === 0
                                    ? <tr>
                                        <td className="app_loader" colSpan={15}>
                                            <label>No Results Found</label>
                                        </td>

                                    </tr> :
                                    patientList.map((row, index) => (
                                        <PatientItem
                                            row={row}
                                            index={index}
                                            columns={columns}
                                            setAnchorEl={setAnchorEl}
                                            handleClose={handleClose}
                                            organizationId={organizationId}
                                            setSkip={setSkip}
                                            setOpenFlash={setOpenFlash}
                                            setAlertMsg={setAlertMsg}
                                            setSubLabel={setSubLabel}
                                            setPatientList={setPatientList}
                                        />
                                    ))
                                }
                            </TableBody>
                        }
                        <TableBody>


                        </TableBody>
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
    )
}

export default PatientComponent
