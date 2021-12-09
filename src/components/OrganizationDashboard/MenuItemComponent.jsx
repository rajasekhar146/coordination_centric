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
        <MenuItem key={status.key} value={status.key}>
            <Checkbox
                checked={selectedStatus.map(function(e) { return e.key; }).indexOf(status.key) > -1}
                onChange={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    if (!e.target.checked) {
                        if(status.key === "all") {
                            
                            selectedStatus.splice(selectedStatus.map(function(e) { return e.key; }).indexOf('all'), 1)
                        } else {
                            selectedStatus.splice(selectedStatus.map(function(e) { return e.key; }).indexOf(status.key), 1)
                            if(selectedStatus.map(function(e) { return e.key; }).indexOf('all') > -1) {
                                selectedStatus.splice(selectedStatus.map(function(e) { return e.key; }).indexOf('all'), 1)
                            }
                        }
                        setSelectedStatus([...selectedStatus])
                        setIsStatusFieldsChanged(true)
                    }
                    if (e.target.checked) {
                        if (status.key === "all") {
                            setSelectedStatus([...statusNames])
                        } else {
                            selectedStatus.push(status)
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
