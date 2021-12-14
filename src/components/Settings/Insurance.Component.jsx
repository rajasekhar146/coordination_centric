import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import Dropzone from 'react-dropzone'
import UploadIcon from '../../assets/icons/upload.png'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromHTML, convertFromRaw } from 'draft-js';
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
import { withStyles } from "@material-ui/core/styles";
import { isUpperCase } from "is-upper-case";
import { isLowerCase } from "is-lower-case";
import CheckedIcon from '../../assets/icons/checked.png'
import UncheckedIcon from '../../assets/icons/unchecked.png'
import history from '../../history'


const styles = theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        background: "#FFFFFF",
        width: '100%'
    },
    dropdownStyle: {
        border: "1px solid black",
        borderRadius: "5px",
        width: '50px',
        height: '200px'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    },
    input: {
        background: "#FFFFFF",
        borderRadius: "8px",
        width: '100%'
    },
});


const InsuranceComponent = props => {
    const {
        userDetails,
        classes,
        setOpenFlash,
        setAlertMsg,
        setSubLabel,
        getMemberDetails,
        setAlertColor
    } = props

    const [policyType, setPolicyType] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [insuranceInfo, setInsuranceInfo] = useState(null)
    const [policyList, setPolicyList] = useState([])

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm()

    const submit = (data) => {
        // e.preventDefault()
        // e.stopPropagation()
        // setIsSubmit(true)
        data.policy_type = policyType;
        const res = settinService.addInsuranceInfo(data)
        res.then(() => {
            // history.push('/resetpasswordsuccess')
            setOpenFlash(true)
            setAlertMsg('Updated')
            setSubLabel('Your insurance information was successfully updated.')
            setAlertColor('success')
            getMemberDetails()
        }).catch(() => {

        })
        // SignInStore.load('ResetPassword', {
        //     resetData,
        //     successCallback: (data) => {
        //         history.push('/resetpasswordsuccess')
        //     },
        //     errorCallback: (err) => {

        //     }
        // })
    }

    const fetchInsuranceInfo = async () => {
        const response = await settinService.getInsuranceInfo(userDetails._id).catch(error => {

        })
        if (get(response, ['data', "status"], '') === 200) {
            setInsuranceInfo(get(response, ['data', 'data', 'data', '0', 'totalData', '0', 'insurance_info', '0'], null))
        } else {
            console.log(response)
        }
    }

    const getPolicyList = async () => {
        const response = await commonService.getPolicyList().catch(error => {

        })
        if (get(response, ['data', "status"], '') === 200) {
            setPolicyList(get(response, ['data', 'data', 'data'], null))
        } else {
            console.log(response)
        }
    }

    useEffect(() => {
        fetchInsuranceInfo()
        getPolicyList()
    }, [])

    useEffect(() => {
        if (insuranceInfo) {
            setValue('company_name', get(insuranceInfo, ['company_name'], ''))
            setValue('policy_id', get(insuranceInfo, ['policy_id'], ''))
            setPolicyType(get(insuranceInfo, ['policy_type'], ''))
            setValue('policy_validity', get(insuranceInfo, ['policy_validity'], ''))
        }
    }, [insuranceInfo])

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
            }}
        />
    );

    return (
        <div className="io_p_info">
            <form className="io_password_form" onSubmit={handleSubmit(submit)}>
                <div className="io_password">
                    <div className="od__row">
                        <div className="od__p_title io_pl0">
                            Insurance Information
                            <div className="io_p_info_label">
                                Add or update your insurance details here.
                            </div>
                        </div>

                    </div>
                    <ColoredLine color="#E4E7EC" />
                    <div className="od__row_password">
                        <div className="od_label_p" >
                            Insurance Company Name

                        </div>
                        <div className="od_input_p io_radio">
                            <TextField
                                {...register('company_name', {
                                    required: 'Company Name is required.'
                                })}
                                margin="normal"
                                type="text"
                                className={classes.input}
                                InputProps={{ className: 'si__right__content_resend' }}
                            />
                        </div>
                    </div>
                    <ColoredLine color="#E4E7EC" />
                    <div className="od__row_password">
                        <div className="od_label_p" >
                            Policy ID
                        </div>
                        <div className="od_input_p io_radio">
                            <TextField
                                // {...useInput('facilityName', { isRequired: true })}
                                {...register('policy_id', {
                                    required: 'Policy Id is required.'
                                })}
                                margin="normal"
                                type="text"
                                className={classes.input}
                                InputProps={{ className: 'si__right__content_resend' }}
                            />
                        </div>
                    </div>
                    <ColoredLine color="#E4E7EC" />

                    <div className="od__row_password">
                        <div className="od_label_p" >
                            Policy Type
                        </div>
                        <div className="od_input_p io_radio">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <Select
                                    onChange={(e) => {
                                        setPolicyType(e.target.value)
                                    }}
                                    value={policyType}
                                    className={classes.select}
                                    id="demo-simple-select-helper"
                                    MenuProps={{ classes: { paper: classes.dropdownStyle } }}

                                >
                                    {
                                       policyList.map(c => (
                                            <MenuItem value={c.policy_name} key={c.id}>
                                                {c.policy_name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>

                        </div>
                    </div>
                    <ColoredLine color="#E4E7EC" />
                    <div className="od__row_password">
                        <div className="od_label_p" >
                            Policy validity details

                        </div>
                        <div className="od_input_p io_radio">
                            <TextField
                                // {...useInput('facilityName', { isRequired: true })}
                                {...register('policy_validity', {
                                    required: 'policy validity Id is required.'
                                })}
                                margin="normal"
                                type="text"
                                className={classes.input}
                                InputProps={{ className: 'si__right__content_resend' }}
                            />
                        </div>
                    </div>
                    <ColoredLine color="#E4E7EC" />
                    <div className="od__row od_flex_space_between">
                        <div className="od__p_title io_pl0">

                        </div>
                        <div className="od__btn__div od__align__right io_pr0">
                            <Button
                                onClick={() => {
                                    history.push('/dashboard')
                                }}
                                className="io_p_cancel">
                                Cancel
                            </Button>

                            <Button type="submit" className="io__save__btn">
                                Save
                            </Button>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default withStyles(styles)(InsuranceComponent)