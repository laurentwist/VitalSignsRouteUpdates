import React, { useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import Chart from 'chart.js/auto'

import VitalSigns from '../../data/patient_data.json'

const RespirationRateChart = ({respiratoryRateColor}) => {
    const { patientID } = useParams()
    const vitalSigns = VitalSigns.vital_signs.filter(sign => sign.patientID === patientID)

    const respirationRateChartRef = useRef(null)

    useEffect(() => {
        const respirationRateData = vitalSigns.map(sign => ({
            x: sign.transmitTime,
            y: sign.respirationRate,
        }))

        const respirationRateChart = new Chart(respirationRateChartRef.current, {
            type: 'line',
            data: {
                datasets: [{
                    label: '',
                    data: respirationRateData,
                    borderColor: respiratoryRateColor, 
                    fill: false,
                }],
            },
            options: {
                plugins: {
                    legend: {
                        display: false, 
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'white', 
                        },
                        grid: {
                            color: 'white',
                            display: true, 
                        },
                    },
                    y: {
                        ticks: {
                            color: 'white', 
                        },
                        grid: {
                            color: 'white',
                            display: true, 
                        },
                    },
                },
            },
        })

        return () => {
            respirationRateChart.destroy()
        }
    }, [vitalSigns])

    return (
        <canvas ref={respirationRateChartRef}></canvas>
    )
}

export default RespirationRateChart;