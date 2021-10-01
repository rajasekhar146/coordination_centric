import React from 'react'
import './OrganizationDashboard.Component.css'
import Button from '@mui/material/Button';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const OrganizationDashboardComponent = () => {
    return (
        <div className="db__main__div">
            <div className="db__row">
                <div className="od__title__text">Organizations</div>
                <div><input type="text" className="od__serach__text" /></div>
                <div className="od__btn__div"><Button className="od__add__organization__btn">
                <AddCircleOutlineOutlinedIcon /> &nbsp;&nbsp; Add Organization
              </Button></div>
            </div>

            <div className="db__row">
                <div className="db__placeholder">
                </div>
            </div>

            <div className="db__row">
              
                <div className="db__left__placeholder">
                </div>
                <div className="db__right__placeholder">
                </div>
               
            </div>
        </div>
    )
}

export default OrganizationDashboardComponent
