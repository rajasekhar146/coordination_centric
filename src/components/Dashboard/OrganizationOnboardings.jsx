import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ReactHighcharts from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { withStyles } from "@material-ui/core/styles";
import ActivePatientIcon from '../../assets/icons/appointment_user.png'

const styles = theme => ({
    card: {
        background: "#FFFFFF",
        width: "100%",
        margin: 10,
        boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)',
        borderRadius: '8px'
    },
    content: {
        display: 'flex',
        paddingBottom: '15px'
    }
});

const options = {
    chart: {
        type: 'areaspline',
    },
    title: {
        text: '',
    },
    xAxis: {
        categories: ['2020-1', '2020-2', '2020-3', '2020-4', '2020-5', '2020-6', '2020-7', '2020-8', '2020-9', '2020-10', '2020-11', '2020-12'],
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
        y: 25,
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
            name: 'Patient',
            data: [5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 0, 2],
            color: '#336CFB'
            
        },
        {
            name: 'Doctor',
            data: [3, 7, 4, 7, 8, 5, 3, 4, 8, 2, 9, 12],
            color: '#F79009'
        },
    ],
}

const OrganizationOnboardings = (props) => {
    const {
        classes,
        checkDoctorOrPatent
    } = props
    return (
        <Card
            classes={{ root: classes.card }}
            sx={{
                background: '#fff',
                boxShadow: '0 2px 4px #00000029',
                borderRadius: '4px',
            }}
        >
            <CardContent >
                <Typography component="div" variant="h6">
                    <label className="db_org_graph">
                        Organization Onboardings
                    </label>


                </Typography>
                <div className={classes.content}>
                    <ReactHighcharts
                        highcharts={Highcharts}
                        options={options}
                        containerProps={{ style: { width: '100%' } }}
                    >
                    </ReactHighcharts>
                </div>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(OrganizationOnboardings)