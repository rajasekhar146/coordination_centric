import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import Dropzone from 'react-dropzone'
import UploadIcon from '../../assets/icons/upload.png'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromHTML } from 'draft-js';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ToggleOnIcon from '../../assets/icons/toggle_on.png'
import ToggleOnIcOff from '../../assets/icons/toggle_off.png'



const useStyles = makeStyles(theme => ({
    input: {
        background: "#F9FAFB",
        borderRadius: "8px",
    },
    select: {
        background: "#FFFFFF",
        borderRadius: "8px",
        width: "100%",
        height: "48px"
    },
    multiselect: {
        position: 'relative',
        width: '100%',
        height: '100px',
        borderRadius: '5px',
        backgroundColor: '#FFFFFF',
    },
    timeInput: {
        background: "#FFFFFF",
        height: '34px',
        width: '100%'
    }
}))





const PersonalInfo = props => {
    const {
        day
    } = props
    const classes = useStyles()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const [toggleOn, setToggleOn] = useState(true);


    return (
        <div className="io_availablity mb_25">
            <div className="io_availablity mb_25">
                <div >
                    {toggleOn ?
                        <img
                            className="toggle_icon"
                            onClick={() => {
                                setToggleOn(false)
                            }}
                            src={ToggleOnIcon}
                            alt="upload" />
                        :
                        <img
                            className="toggle_icon"
                            onClick={() => {
                                setToggleOn(true)
                            }}
                            src={ToggleOnIcOff}
                            alt="upload" />
                    }

                </div>

                <div className="io_day">
                    <label>{day}</label>
                </div>
            </div>
            <div className="io_morning_time">
                <div className="io_timelabel">
                    Morning
                    <div className="io_times">
                        <label className="io_from">From:</label>
                        <TextField
                            {...register('email', {
                                required: 'Email is required.',

                            })}
                            type="time"
                            margin="normal"
                            defaultValue="07:30"
                            InputProps={{
                                className: classes.timeInput,
                            }}
                        />
                        <label className="io_from">To:</label>
                        <TextField
                            {...register('email', {
                                required: 'Email is required.',

                            })}
                            type="time"
                            margin="normal"
                            defaultValue="07:30"
                            InputProps={{
                                className: classes.timeInput,
                            }}
                        />
                    </div>
                </div>

            </div>
            <div className="io_morning_time">
                <div className="io_timelabel">
                    <span>
                        Afternoon
                    </span>

                    <div className="io_times">
                        <label className="io_from">From:</label>
                        <TextField
                            {...register('email', {
                                required: 'Email is required.',

                            })}
                            type="time"
                            margin="normal"
                            defaultValue="07:30"
                            InputProps={{

                                className: classes.timeInput,
                            }}
                        />
                        <label className="io_from">To:</label>
                        <TextField
                            {...register('email', {
                                required: 'Email is required.',
                            })}
                            type="time"
                            margin="normal"
                            defaultValue="07:30"
                            InputProps={{
                                className: classes.timeInput,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PersonalInfo