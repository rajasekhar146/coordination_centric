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
                        if(status.value === "all") {
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
                                'active',
                                'pending_verification',
                                'declined',
                                'pending_acceptance',
                                'unverified',
                                'inactive',
                                'invited',
                                'cancelled',
                            ])
                        } else {
                            selectedStatus.push(status.value)
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
