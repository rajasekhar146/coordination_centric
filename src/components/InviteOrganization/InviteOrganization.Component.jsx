import React from 'react'
import './InviteOrganization.Component.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import OrganizationNameIcon from '../../assets/icons/organization_name.png'
import OrganizationEmailIcon from '../../assets/icons/organization_email.png'
import OrganizationHomeIcon from '../../assets/icons/organization_home.png'
import OrganizationPhoneIcon from '../../assets/icons/organization_phone.png'
// import OrganizationNameIcon from '../../assets/icons/OrganizationName.png'

const InviteOrganizationComponent = () => {
    return (
        <div className="io__main__div">
        <div className="io__title__text">Invite Organization</div>           
            <div>
              <div className="io__form">
               
                <div className="io__row">
                    <div className="io__label">Organization Name <span className="ac__required">*</span></div>
                    <TextField id="" defaultValue="" className="od__text__box" margin="normal" InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={OrganizationNameIcon} alt="Organization Name" />
                          </InputAdornment>
                         )
                        }}/>
                </div>

                <div className="io__row">
                    <div className="io__label">Organization Email <span className="ac__required">*</span></div>
                    <TextField id="" defaultValue="" className="od__text__box" margin="normal" InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={OrganizationEmailIcon} alt="Organization Email" />
                          </InputAdornment>
                         )
                        }}/>
                </div>

                <div className="io__row">
                    <div className="io__label">Address</div>
                    <TextField id="" defaultValue="" className="od__text__box" margin="normal" InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={OrganizationHomeIcon} alt="Organization Home" />
                          </InputAdornment>
                         )
                        }}/>
                </div>

                <div className="io__row">
                    <div className="io__label">Phone Number</div>
                    <TextField id="" defaultValue="" className="od__text__box" margin="normal" InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={OrganizationPhoneIcon} alt="Organization Phone" />
                          </InputAdornment>
                         )
                        }}/>
                </div>

                <div className="io__row">
                    <div className="io__same__line">
                        <div className="io__column">
                            <Button className="io__add__organization__btn__close">
                                Close
                            </Button>
                        </div>
                        <div className="io__column io__invite__org__btn">
                            <Button className="io__add__organization__btn">
                                Invite Organization
                            </Button>
                        </div>
                    </div>
                </div>
                  
              </div>
            </div>
        </div>
    )
}

export default InviteOrganizationComponent
