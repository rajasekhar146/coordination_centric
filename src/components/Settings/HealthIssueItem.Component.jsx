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
        item,
        problems,
        setProblems,
        allProblems,
    } = props
   


    return (
        <label className="container">
            {item.name}
            <input
                type="checkbox"
                checked={problems.indexOf(item.name) > -1}
                onChange={(e) => {
                    if (e.target.checked) {
                        problems.push(item.name)
                    } else {
                        problems.splice(problems.indexOf(item.name), 1)
                    }
                    setProblems([...problems])
                }}

            />
            <span className="checkmark"></span>
        </label>
    );
}
export default PersonalInfo













