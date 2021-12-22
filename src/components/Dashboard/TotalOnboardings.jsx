import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ReactHighcharts from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { withStyles } from "@material-ui/core/styles";
import ActivePatientIcon from '../../assets/icons/appointment_user.png'
import moment from 'moment'
import get from 'lodash.get'

const styles = theme => ({
    card: {
        background: "#FFFFFF",
        width: "100%",
        // margin: 10,
        boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)',
        borderRadius: '8px'
    },
    content: {
        display: 'flex',
        paddingBottom: '15px'
    }
});

const TotalOnboardings = (props) => {
    const {
        classes,
        checkDoctorOrPatent,
        dashboardDetails = null,
        role
    } = props
    const [appointmentData, setAppointmentData] = useState(null)
    const [chartOptions, setChartOptions] = useState(null)

    const getValue = () => {
        switch (role) {
            case 'superadmin':
                return get(dashboardDetails, ['0', 'graphAppointmentCount'], 0)
                break
            case 'admin':
                return get(dashboardDetails, ['0', 'graphAppointmentCount'], 0)
                break
            default:
                return null
        }
    }

    useEffect(() => {
        setAppointmentData(getValue(role))
    }, [dashboardDetails])

    useEffect(() => {
        const getCategories = () => {
            const categoryArray = []
            appointmentData.forEach(appointment => {
                const d= new Date();
                const year = d.getFullYear(appointment.year)
                const month = d.getMonth(appointment.month)
                const day = d.getDate(appointment.day)
                const catItem = moment(`${day}-${month + 1}-${year}`, "DD-MM-YYYY").format('DD-MM-YYYY');
                categoryArray.push(catItem)
            });
            return categoryArray;
        }
        const getSeries = () => {
            const seriesArray = []
            appointmentData.forEach(appointment => {
                seriesArray.push(appointment.total)
            });
            return seriesArray;
        }
        

        if (appointmentData) {

            const options = {
                chart: {
                    type: 'areaspline',
                },
                title: {
                    text: '',
                },
                xAxis: {
                    categories: getCategories(),
                },
                yAxis: {
                    min: 0,
                    gridLineWidth: 0,
                    minorGridLineWidth: 0,
                    title: {
                        text: '',
                    },
                    // stackLabels: {
                    //     enabled: true,
                    //     style: {
                    //         fontWeight: 'bold',
                    //         color:
                    //             // theme
                    //             (Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || 'gray',
                    //     },
                    // },
                },
                legend: {
                    align: 'right',
                    x: -30,
                    verticalAlign: 'top',
                    y: 0,
                    floating: true,
                    backgroundColor: 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                },
                // tooltip: {
                //     headerFormat: '<b>{point.x}</b><br/>',
                //     pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                // },
                plotOptions: {
                    series: {
                        animation: false,
                        // color: '#07b062',
                        marker: {
                            enabled: false
                        },
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.Color('#336CFB').setOpacity(0.5).get('rgba')],
                                [1, Highcharts.Color('#336CFB').setOpacity(0.0).get('rgba')]
                            ]
                        }
                    }
                },
                series: [
                    {
                        name: 'Appointments',
                        data: getSeries(),
                        color: '#336CFB'

                    },
                ],
            }
            setChartOptions(options)
        }
    }, [appointmentData])


    return (
        <Card
            classes={{ root: classes.card }}
            sx={{
                background: '#fff',
                boxShadow: '0 2px 4px #00000029',
                borderRadius: '4px',
            }}
        >
            {/* <CardContent > */}
            <Typography component="div" variant="h6">
                <label className="db_org_graph">
                    Total Appointments
                </label>


            </Typography>
            <div className={classes.content}>
                <ReactHighcharts
                    highcharts={Highcharts}
                    options={chartOptions}
                    containerProps={{ style: { width: '100%' } }}
                >
                </ReactHighcharts>
            </div>
            {/* </CardContent> */}
        </Card>
    )
}

export default withStyles(styles)(TotalOnboardings)