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


const columns = [
    { id: 'first_name', label: 'Name', minWidth: 180, align: 'left', visible: true },
    { id: 'email', label: 'Email', minWidth: 100, align: 'left', visible: true },
    { id: 'roles', label: 'Roles', minWidth: 200, align: 'left', visible: true },
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
       
    } = props


   

    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClose = () => {
        setAnchorEl(null)
    }

    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    const [patientList, setPatientList] = useState([])
    const [openflash, setOpenFlash] = React.useState(false)
    const [alertMsg, setAlertMsg] = React.useState('')
    const [subLebel, setSubLabel] = useState('')
    const [totalPage, setTotalPage] = React.useState(0)
    const [page, setPage] = React.useState(1)

    const getStaffList = async () => {
        const res = await memberService.getStaffList(organizationId, 'patient', limit, skip)
        if (res.status === 200) {
            setPatientList(get(res, ['data', 'data', '0', 'totalData'], []))
        } else {

        }

    }
    useEffect(() => {
        getStaffList()
    }, [])

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
                        <TableBody>
                            {patientList.map((row, index) => (
                                <PatientItem
                                    row={row}
                                    index={index}
                                    columns={columns}
                                    setAnchorEl={setAnchorEl}
                                    handleClose={handleClose}
                                    organizationId
                                    setSkip={setSkip}
                                    setOpenFlash={setOpenFlash}
                                    setAlertMsg={setAlertMsg}
                                    setSubLabel={setSubLabel}
                                    setPatientList={setPatientList}
                                />
                            ))
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default PatientComponent
