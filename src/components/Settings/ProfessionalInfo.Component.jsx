import React, { useEffect, useState } from 'react'
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
import UploadFile from './UploadFile.Component'
import AvailablityItem from './AvailablityItem.Component.jsx'
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
    const classes = useStyles()
    const [profilepic, setProfilePic] = useState('')
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [textCount, setTextCount] = useState(500)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isSpeciality, setIsSpeciality] = useState(false)
    const [speciality, setSpeciality] = useState([])
    const [toggleOn, setToggleOn] = useState(true);


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
        setValue,
        watch,
        formState: { errors },
    } = useForm()

    const handleDrop = (files) => {
        files.forEach((file, index) => {
            selectedFiles.push(file)
            setSelectedFiles([...selectedFiles])
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

    useEffect(() => {
        setValue('speciality', speciality.join(','))
    }, [speciality.length])

    const links = [
        'Pediatrics',
        'dental'
    ]

    const getLabel = (value) => {
        return (
            <label onClick={() => {
                speciality.push(value)
                setSpeciality([...speciality])
            }} className="io_link">{value}</label>
        )
    }



    return (
        <div className="io_p_info">
            <div className="od__row od_flex_space_between">
                <div className="od__p_title io_pl0">
                    Professional info
                    <div className="io_p_info_label">
                        Update your certificates and professional details here.
                    </div>
                </div>
            </div>
            <ColoredLine color="#E4E7EC" />

            <div className="od__row_p">
                <div className="od_label_p" >
                    NPI ID
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
                    Degrees/Certifications
                    <div className="io_p_info_label">
                        Upload the documents
                    </div>
                </div>
                <div className="od_input_p">
                    <div className="od_dropzone_prof mb_25">
                        <Dropzone
                            onDrop={handleDrop}
                            accept="image/jpeg, image/png, application/pdf, .pdf, .docx"
                            maxSize={524288000}
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

                    {selectedFiles.map((file) => (
                        <UploadFile file={file} />
                    ))
                    }
                </div>
            </div>
            <ColoredLine color="#E4E7EC" />
            <div className="od__row_p">
                <div className="od_label_p" >
                    Specialties
                </div>
                <div className="od_input_p">
                    <div className="mb_25">
                        <TextField
                            {...register('speciality', {
                                required: 'Speciality is required.',

                            })}
                            margin="normal"
                            InputProps={{

                                className: classes.multiselect,
                            }}
                        />
                    </div>

                    <div>
                        {links.map((value) => (
                            getLabel(value)
                        ))
                        }
                    </div>
                </div>
            </div>
            <ColoredLine color="#E4E7EC" />
            <div className="od__row_p_availablity">
                <div className="od_label_p_av" >
                    Availability
                </div>
                <div className="od_input_p">

                    <AvailablityItem day="Mon" />
                    <AvailablityItem day="Tue" />
                    <AvailablityItem day="Wed" />
                    <AvailablityItem day="Thu" />
                    <AvailablityItem day="Fri" />
                    <AvailablityItem day="Sat" />
                    <AvailablityItem day="Sun" />

                </div>

            </div>

            <ColoredLine color="#E4E7EC" />
            <div className="od__row_p">
                <div className="od_label_p" >
                    What services?
                </div>
                <div >
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
                        <div className="io_services">
                            Marketplace
                        </div>


                    </div>
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
                        <div className="io_services">
                            Presential Consultation
                        </div>
                    </div>

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

                    <Button
                        type="submit"
                        className="io__save__btn"
                    >
                        Save
                    </Button>

                </div>
            </div>
        </div>
    );
}
export default PersonalInfo