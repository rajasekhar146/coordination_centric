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
import get from 'lodash.get'
import { settinService } from '../../services'
import { memberService } from '../../services'
import FormControl from "@material-ui/core/FormControl";
import moment from 'moment-timezone'

const useStyles = makeStyles(theme => ({
    input: {
        background: "#FFFFFF",
        borderRadius: "8px",
    },
    select: {
        background: "#FFFFFF",
        borderRadius: "8px",
        width: "10%",
        height: "48px",
        maxHeight: 200
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%"
    },
}))


const PersonalInfo = props => {
    const timezones = moment.tz.names();
    console.log(timezones);

    const {
        userDetails,
    } = props
    const classes = useStyles()
    const [profilepic, setProfilePic] = useState('')
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [textCount, setTextCount] = useState(500)
    const dispatch = useDispatch()
    const [countries, setAllCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedTimeZone, setSelectedTimeZone] = useState('')

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm()


    useEffect(() => {
        fetchCountries()
        setValue('first_name', get(userDetails, ['first_name'], ''))
        setValue('middle_name', get(userDetails, ['middle_name'], ''))
        setValue('last_name', get(userDetails, ['last_name'], ''))
        setValue('email', get(userDetails, ['email'], ''))
        setValue('role', get(userDetails, ['role'], ''))
        // setValue('phoneNumber', get(userDetails, ['phoneNumber'], ''))
        // setValue('gender', get(userDetails, ['ssn'], ''))
        // setValue('address', get(userDetails, ['ssn'], ''))
        // setValue('country', get(userDetails, ['country'], ''))
        setSelectedCountry(get(userDetails, ['country'], ''))
        setSelectedTimeZone(get(userDetails, ['timezone'], ''))
        setProfilePic(get(userDetails, ['profilePic'], ''))
        // setValue('city', get(userDetails, ['ssn'], ''))
        // setValue('postalCode', get(userDetails, ['ssn'], ''))
        // setValue('gender', get(userDetails, ['ssn'], ''))
    }, [userDetails])


    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
            }}
        />
    );

    const handleDrop = (files) => {
        const formData = new FormData()
        files.forEach(file => {


        });
        files.forEach(file => {
            formData.append(`image`, file)
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePic(URL.createObjectURL(file))
                memberService.uploadCertificate(formData, 'doctor', (event) => {
                    // setProgress(Math.round((100 * event.loaded) / event.total));
                }).then((response) => {
                    console.log(response)
                    setProfilePic(get(response, ['data', 'data'], ''))
                }).catch(() => {

                })
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
    const fetchCountries = async () => {
        const response = await commonService.getCountries().catch(error => {
            console.log(error)
        })

        console.log('getCountries', response.data.data)
        setAllCountries(response.data.data.data)
        dispatch(setCountries(response.data.data.data))
    }



    const onSubmit = async (data) => {
        data.timezone = selectedTimeZone;
        data.country = selectedCountry;
        data.biograhpy_object = convertToRaw(editorState.getCurrentContent())
        const res = await settinService.updateMemberDetails(userDetails._id, data).catch((err) => {

        })
    }

    return (
        <div className="io_p_info">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        First Name
                    </div>
                    <div className="od_input_p">
                        <TextField
                            {...register('first_name', {
                                required: 'First Name is required.',
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
                        Last Name
                    </div>
                    <div className="od_input_p">
                        <TextField
                            {...register('last_name', {
                                required: 'Last Name is required.',
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
                                accept="image/jpeg, image/png, image/svg, image/gif"
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
                            {...register('role', {
                                required: 'Email is required.',

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
                        <div className="od_address_label mb_25"  >
                            Country
                        </div>
                        <div className="od_address_label mb_25" >
                            State
                        </div>
                        <div className="od_address_label mb_25" >
                            City
                        </div>
                        <div className="od_address_label mb_25" >
                            Zipcode
                        </div>
                    </div>
                    <div className="od_input_p">
                        <div className="od_address mb_25">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <Select
                                    // {...register('country', {
                                    //     onChange: e => setValue('country', e.target.value),
                                    // })}
                                    onChange={(e) => {
                                        setSelectedCountry(e.target.value)
                                    }}
                                    value={selectedCountry}
                                    className={classes.select}
                                    id="demo-simple-select-helper"
                                    inputProps={{

                                    }}
                                >
                                    {countries &&
                                        countries.map(c => (
                                            <MenuItem value={c.code} key={c.code}>
                                                {c.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="mb_25">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <Select
                                    // {...register('country', {
                                    //     onChange: e => setValue('country', e.target.value),
                                    // })}
                                    onChange={(e) => {
                                        setSelectedCountry(e.target.value)
                                    }}
                                    // value={selectedCountry}
                                    className={classes.select}
                                    id="demo-simple-select-helper"
                                    inputProps={{

                                    }}
                                >
                                    {countries &&
                                        countries.map(c => (
                                            <MenuItem value={c.code} key={c.code}>
                                                {c.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="mb_25">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <TextField
                                    {...register('city', {
                                        required: 'city is required.',
                                    })}
                                    margin="normal"
                                    InputProps={{

                                        className: classes.input,
                                    }}
                                />
                            </FormControl>
                        </div>
                        <div className="mb_25">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <TextField
                                    {...register('zipcode', {
                                        required: 'zipcode is required.',
                                    })}
                                    margin="normal"
                                    InputProps={{

                                        className: classes.input,
                                    }}
                                />
                            </FormControl>
                        </div>
                    </div>

                    {/* <div className="od_label_p" >
                        Country
                    </div> */}
                </div>
                <ColoredLine color="#E4E7EC" />
                <div className="od__row_p">
                    <div className="od_label_p" >
                        Timezone
                    </div>
                    <div className="od_input_p">
                        <Select
                            // {...register('timezone', {
                            //     required: 'timezone is required.',
                            // })}
                            onChange={(e) => {
                                setSelectedTimeZone(e.target.value)
                            }}
                            value={selectedTimeZone}
                            className={classes.select}
                            id="demo-simple-select-helper"
                        // value={userDetails.timezone}
                        >
                            {timezones.map(op => (
                                <MenuItem key={op} value={op}>
                                    <ListItemText primary={op} />
                                </MenuItem>
                            ))}
                        </Select>
                        {/* <Select 
                        className={classes.select}
                        onChange={e => register({ name: 'timezone', value: e.target.value })}>
                            {timezones.map(op => (
                                <MenuItem key={op} value={op}>
                                    <ListItemText primary={op} />
                                </MenuItem>
                            ))}
                            </Select> */}

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

                        <Button type="submit" className="io__save__btn">
                            Save
                        </Button>

                    </div>
                </div>
            </form>
        </div>
    );
}
export default PersonalInfo