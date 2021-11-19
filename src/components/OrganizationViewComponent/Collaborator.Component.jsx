import React, { useEffect } from 'react'
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


const columns = [
    { id: 'facilityName', label: 'Name', minWidth: 180, align: 'left', visible: true },
    { id: 'facilityEmail', label: 'Email', minWidth: 100, align: 'left', visible: true },
    { id: 'roles', label: 'Roles', minWidth: 200, align: 'left', visible: true },
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
        list
    } = props

    // const collaboratorList = get(orgDet, ['invited_facilityName'], [])

    const [anchorEl, setAnchorEl] = React.useState(null)
    const [collaboratorList, setCollaboratorList] = React.useState([])

    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        setCollaboratorList([...list])
    }, [list.length])

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
