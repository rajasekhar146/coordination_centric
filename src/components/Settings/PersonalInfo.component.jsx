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
}))


const PersonalInfo = props => {
    const classes = useStyles()
    const [profilepic, setProfilePic] = useState('')
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [textCount, setTextCount] = useState(500)

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

    const handleDrop = (files) => {
        const formData = new FormData()
        files.forEach(file => {
            formData.append(`file`, file)
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePic(URL.createObjectURL(file))
            }
            reader.readAsArrayBuffer(file)
        });
    }

    const onEditorStateChange = editorState => {
        if (editorState) {
            if (editorState.getCurrentContent().getPlainText().length < 500) {
                setEditorState(editorState)
                setTextCount(500 - editorState.getCurrentContent().getPlainText().length)
            } else {
                setTextCount(0)
            }
        } else {
            setEditorState(EditorState.createEmpty())
        }

    };


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
                <div className="od_input_p io_drop">
                    <div className="od_dropzone">
                        <Dropzone
                            onDrop={handleDrop}
                            accept="image/*"
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section>

                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <img className="io_upload_icon" src={UploadIcon} alt="upload" />
                                        <p className="io_upload_label">
                                            <span className="io_highlite">Click to upload</span> or drag and drop
                                            <br />
                                            SVG, PNG, JPG or GIF (max. 800x400px)
                                        </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div>
                        {profilepic
                            && <img
                                src={profilepic}
                                alt="profile"
                                className="io_profile"
                            />
                        }
                    </div>

                </div>
            </div>
            <ColoredLine color="#E4E7EC" />
            <div className="od__row_p">
                <div className="od_label_p" >
                    Role
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
                    Country
                </div>
                <div className="od_input_p">
                <Select
                        {...register('role', {
                            required: 'Role is required.',
                        })}
                        className={classes.select}
                        id="demo-simple-select-helper"
                    >
                        {['option'].map(op => (
                            <MenuItem key={op} value={op}>
                                <ListItemText primary={op} />
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            <ColoredLine color="#E4E7EC" />
            <div className="od__row_p">
                <div className="od_label_p" >
                    Timezone
                </div>
                <div className="od_input_p">
                    <Select
                        {...register('role', {
                            required: 'Role is required.',
                        })}
                        className={classes.select}
                        id="demo-simple-select-helper"
                    >
                        {['option'].map(op => (
                            <MenuItem key={op} value={op}>
                                <ListItemText primary={op} />
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            <ColoredLine color="#E4E7EC" />
            <div className="od__row_p">
                <div className="od_label_p" >
                    Bio
                    <div className="io_p_info_label">
                        Write a short introduction.
                    </div>
                </div>
                <div className="od_input_p">
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                        toolbar={{
                            options: ["inline", 'list'],
                            inline: {
                                inDropdown: false,
                                className: "test",
                                component: undefined,
                                dropdownClassName: undefined,
                                options: ["bold", "italic"],
                                bold: { className: "test", style: { color: "red" } },
                                italic: { className: undefined },
                                underline: { className: undefined },
                            },
                            list: {
                                inDropdown: false,
                                className: undefined,
                                component: undefined,
                                dropdownClassName: undefined,
                                options: ['unordered', 'ordered', 'indent', 'outdent'],
                            },
                        }}
                    />
                    <p className="io_count_label">{textCount} characters left</p>
                </div>
            </div>
            <ColoredLine color="#E4E7EC" />
            <div className="od__row od_flex_space_between">
                <div className="od__p_title io_pl0">

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
        </div>
    );
}
export default PersonalInfo