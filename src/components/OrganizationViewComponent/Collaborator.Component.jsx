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


const columns = [
    { id: 'facilityName', label: 'Name', minWidth: 180, align: 'left', visible: true },
    { id: 'facilityEmail', label: 'Email', minWidth: 100, align: 'left', visible: true },
    { id: 'roles', label: 'Role', minWidth: 200, align: 'left', visible: true },
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


const CollaboratorComponent = props => {
    const {
        orgDet,
        colorcodes,
        admin
    } = props

    // const collaboratorList = get(orgDet, ['invited_facilityName'], [])

    const [anchorEl, setAnchorEl] = React.useState(null)
    const [collaboratorList, setCollaboratorList] = React.useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(10)
    const handleClose = () => {
        setAnchorEl(null)
    }
    const getStaffList = async () => {
        const res = await memberService.getStaffList(admin._id, 'facility', limit, skip)
        if (res.status === 200) {
            setCollaboratorList(get(res, ['data', 'data', '0', 'totalData'], []))
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
                            {collaboratorList.map((row, index) => (
                                <CollaboratorItem
                                    row={row}
                                    index={index}
                                    columns={columns}
                                    setAnchorEl={setAnchorEl}
                                    handleClose={handleClose}
                                // colorcodes={colorcodes}
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

export default CollaboratorComponent
