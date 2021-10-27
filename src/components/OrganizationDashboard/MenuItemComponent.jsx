import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'



const OrganisationItem = props => {
    const {
        selectedStatus,
        status,
        setSelectedStatus,
        statusNames,
        setIsStatusFieldsChanged
    } = props

    console.log(selectedStatus)



    return (
        <MenuItem key={status.value} value={status.value}>
            <Checkbox
                checked={selectedStatus.indexOf(status.value) > -1}
                onChange={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    if (!e.target.checked) {
                        if(status.value === "All Status") {
                            selectedStatus.splice(selectedStatus.indexOf('all'), 1)
                        } else {
                            selectedStatus.splice(selectedStatus.indexOf(status.value), 1)
                            selectedStatus.splice(selectedStatus.indexOf('all'), 1)

                        }
                        setSelectedStatus([...selectedStatus])
                        setIsStatusFieldsChanged(true)
                    }
                    if (e.target.checked) {
                        if (status.value === "all") {
                            setSelectedStatus([
                                'all',
                                'verified',
                                'pending_verification',
                                'declined',
                                'Pending Acceptance',
                                'Unverified',
                                'Suspended',
                                'Invited',
                                'Cancelled',
                            ])
                        } else {
                            selectedStatus.push(status.name)
                            setSelectedStatus([...selectedStatus])
                            
                        }
                        setIsStatusFieldsChanged(true)
                    }
                }}
            />
            <ListItemText primary={status.name} />
        </MenuItem>
    )
}

export default OrganisationItem
