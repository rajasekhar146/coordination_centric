import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import MemberItem from './MemberItem.Component'
import get from 'lodash.get'
import { memberService } from '../../services'


const columns = [
    { id: 'id', label: 'ID', minWidth: 50, align: 'left', visible: false },
    { id: 'first_name', label: 'Name', minWidth: 180, align: 'left', visible: true },
    { id: 'email', label: 'Email', minWidth: 100, align: 'left', visible: true },
    { id: 'role', label: 'Role', minWidth: 200, align: 'left', visible: true },
    { id: 'memberStatus', label: 'Status', minWidth: 150, align: 'left', visible: true },
    { id: 'action', label: 'Action', minWidth: 40, align: 'center', visible: true },
]

const colorcodes = {
    invited: '#2E90FA',
    active: '#12B76A',
    inactive: '#A0A4A8',
}

const MembersComponent = props => {
    const {
        colorcodes,
        getOrgDetails,
        organizationId,
        setMembersList,
        membersList,
        setOpenFlash,
        setAlertMsg,
        setSubLabel,
    } = props
    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    
    const [page, setPage] = React.useState(1)
    

    const getStaffList = async () => {
        const res = await memberService.getStaffList(organizationId, 'member', limit, skip)
        if (res.status === 200) {
            setMembersList(get(res, ['data', 'data', '0', 'totalData'], []))
        } else {

        }

    }
    useEffect(() => {
        getStaffList()
    }, [membersList.length, skip])


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
                            {membersList.map((row, index) => (
                                <MemberItem
                                    row={row}
                                    index={index}
                                    columns={columns}
                                    setOpenFlash={setOpenFlash}
                                    setAlertMsg={setAlertMsg}
                                    setSubLabel={setSubLabel}
                                    setMembersList={setMembersList}
                                    setSkip={setSkip}
                                    organizationId={organizationId}
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

export default MembersComponent
