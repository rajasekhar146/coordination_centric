import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    input: {
        background: "#F9FAFB",
        borderRadius: "8px",
        border: '1px solid #D0D5DD',
        boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',

    },
}))

const PersonalInfo = props => {
    const classes = useStyles()

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
            }}
        />
    );
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    return (
        <div className="io_p_info">

            <div className="od__row od_flex_space_between">
                <div className="od__p_title io_pl0">
                    Personal info
                    <div className="io_p_info_label">
                        Update your photo and personal details here.

                    </div>
                </div>
                <div className="od__btn__div od__align__right io_pr0">
                    <Button className="io_p_cancel">
                        Cancel
                    </Button>

                    <Button className="io__save__btn">
                        Save
                    </Button>

                </div>
            </div>

            <ColoredLine color="#E4E7EC" />

            <div className="od__row_p">
                <div className="od_label_p" >
                    Name
                </div>
                <div className="od_input_p">
                    <TextField
                        {...register('email', {
                            required: 'Email is required.',
                            pattern: {
                                value:
                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            },
                        })}
                        margin="normal"
                        InputProps={{
                          
                            className: classes.input,
                        }}
                    />
                </div>
            </div>
            <ColoredLine color="#E4E7EC" />
            <div className="od__row_p">
                <div className="od_label_p" >
                Email address
                </div>
                <div className="od_input_p">
                    <TextField
                        {...register('email', {
                            required: 'Email is required.',
                            pattern: {
                                value:
                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            },
                        })}
                        margin="normal"
                        InputProps={{
                          
                            className: classes.input,
                        }}
                    />
                </div>
            </div>
            <ColoredLine color="#E4E7EC" />
            <div className="od__row_p">
            <div className="od_label_p">
            Your photo

                    <div className="io_p_info_label">
                    This will be displayed on your profile.


                    </div>
                </div>
                <div className="od_input_p">
                    <TextField
                        {...register('email', {
                            required: 'Email is required.',
                            pattern: {
                                value:
                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            },
                        })}
                        margin="normal"
                        InputProps={{
                          
                            className: classes.input,
                        }}
                    />
                </div>
            </div>
            <ColoredLine color="#E4E7EC" />
        </div>
    );
}
export default PersonalInfo