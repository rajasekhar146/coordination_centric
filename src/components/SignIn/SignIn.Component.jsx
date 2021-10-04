import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { authenticationService } from '../../services'; 
import history from '../../history';

const SignInComponent = () => {

const handleLogin = () => {
    authenticationService.login('superadmin@yopmail.com', 'Augusta@12')
                            .then(
                                user => {
                                    //const { from } = this.props.location.state || { from: { pathname: "/" } };
                                   // this.props.history.push(from);
                                   history.push('/dashboard');
                                },
                                error => {
                                    console.log(error);
                                    //setSubmitting(false);
                                    //setStatus(error);
                                }
                            );

    
}

    return (
        <div className="ac__main__div">
            <div className="ac__title__text">Welcome to Coordination Centric!</div>       
            <div>
                <div className="ac__form">
                    <div className="ac__header__text">Login</div>
                        <div>
                    <div className="ac__row">
                        <div className="ac__column">
                            <div className="ac__label">User Name <span className="ac__required">*</span></div>
                            <TextField id="" defaultValue="" className="ac__text__box" margin="normal" />
                        </div>
                        </div>
                        <div className="ac__row">
                            <div className="ac__column">
                                <div className="ac__label">Password <span className="ac__required">*</span></div>
                                <TextField id="" defaultValue="" type="password" className="ac__text__box" margin="normal" />
                            </div>
                        </div>
                        <div className="ac__row">
                            <div className="ac__column">
                                <Button className="od__add__organization__btn" onClick={handleLogin}>
                                     Login
                                </Button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default SignInComponent;
