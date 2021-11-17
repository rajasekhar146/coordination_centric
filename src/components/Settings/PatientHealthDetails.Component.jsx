import React, { useState, useEffect } from 'react'
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
import { setCountries } from '../../redux/actions/commonActions'
import { useSelector, useDispatch } from 'react-redux'
import { commonService } from '../../services'
import UploadFile from './UploadFile.Component'
import FormControl from "@material-ui/core/FormControl";


const useStyles = makeStyles(theme => ({
    input: {
        background: "#F9FAFB",
        borderRadius: "8px",
    },
    select: {
        background: "#FFFFFF",
        borderRadius: "8px",
        width: "100%",
        height: "48px",
        maxHeight: 200
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%"
    },
}))


const PatientHealthDetails = props => {
    const classes = useStyles()
    const [profilepic, setProfilePic] = useState('')
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [textCount, setTextCount] = useState(500)
    const dispatch = useDispatch()
    const [countries, setAllCountries] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([]);


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
    const fetchCountries = async () => {
        const response = await commonService.getCountries().catch(error => {
            console.log(error)
        })

        console.log('getCountries', response.data.data)
        setAllCountries(response.data.data.data)
        dispatch(setCountries(response.data.data.data))
    }

    useEffect(() => {
        fetchCountries()
    }, [])

    const height = [
        145,
        160,
        145,
        160,
        145,
        160,
        145,
        160,
        145,
        160,
        145,
        160,
    ]

    return (
        <div className="io_p_info">

            <div className="od__row od_flex_space_between">
                <div className="od__p_title io_pl0">
                    Health info
                    <div className="io_p_info_label">
                        Update your health details here.
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
                <div className="od_input_p io_radio">
                    <div className="io_height">
                        height
                        <div style={{ marginTop: "10px" }}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <Select
                                    {...register('country', {
                                        required: 'Country is required.',
                                    })}
                                    className={classes.select}
                                    id="demo-simple-select-helper"
                                >
                                    {height &&
                                        height.map(option => (
                                            <MenuItem value={option} key={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="io_height">
                        Weight
                        <div style={{ marginTop: "10px" }}>
                            <Select
                                {...register('role', {
                                    required: 'Role is required.',
                                })}
                                className={classes.select}
                                id="demo-simple-select-helper"
                            >

                            </Select>
                        </div>
                    </div>


                </div>
            </div>
            <ColoredLine color="#E4E7EC" />
            <div className="od__row_p">
                <div className="od_label_p" >
                    Do you take any medication?
                    <div className="io_p_info_label">
                        If yes, please describe
                    </div>
                </div>
                <div className="od_input_p">
                    <div className="io_radio">
                        <div className="io_radio_item">
                            <label className="radio_container">
                                Yes
                                <input
                                    type="radio"
                                    name="dashboard"
                                />
                                <span className="check"></span>
                            </label>

                        </div>

                        <div>
                            <label className="radio_container">
                                No
                                <input
                                    type="radio"
                                    name="dashboard"
                                />
                                <span className="check"></span>
                            </label>

                        </div>
                    </div>

                    <div>
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
            </div>
            <ColoredLine color="#E4E7EC" />
            <div className="od__row_p">
                <div className="od_label_p">
                    Any previous health problems?
                </div>
                <div className="od_input_p">
                    <div className="io_radio">
                        <label className="container">
                            Checkbox
                            <input
                                type="checkbox"
                                checked={true}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">
                            Checkbox
                            <input
                                type="checkbox"
                                checked={true}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">
                            Checkbox
                            <input
                                type="checkbox"
                                checked={true}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">
                            Checkbox
                            <input
                                type="checkbox"
                                checked={true}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>

                    <div>
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
export default PatientHealthDetails