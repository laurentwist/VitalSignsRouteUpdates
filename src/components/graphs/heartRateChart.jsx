import React, { useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import Chart from 'chart.js/auto'

import VitalSigns from '../../data/patient_data.json'

const HeartRateChart = ({heartRateColor}) => {
    const { patientID } = useParams()
    const vitalSigns = VitalSigns.vital_signs.filter(sign => sign.patientID === patientID)

    const heartRateChartRef = useRef(null)

    useEffect(() => {
        const heartRateData = vitalSigns.map(sign => ({
            x: sign.transmitTime,
            y: sign.heartRate,
        }))

        const heartRateChart = new Chart(heartRateChartRef.current, {
            type: 'line',
            data: {
                datasets: [{
                    label: '',
                    data: heartRateData,
                    borderColor: heartRateColor, 
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
            heartRateChart.destroy()
        }
    }, [vitalSigns])

    return (
        <canvas ref={heartRateChartRef}></canvas>
    )
}

export default HeartRateChart;