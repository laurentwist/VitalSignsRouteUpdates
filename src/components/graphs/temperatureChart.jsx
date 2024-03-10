import React, { useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import Chart from 'chart.js/auto'

import VitalSigns from '../../data/patient_data.json'

const TemperatureChart = () => {
    const { patientID } = useParams()
    const vitalSigns = VitalSigns.vital_signs.filter(sign => sign.patientID === patientID)

    const temperatureChartRef = useRef(null)

    useEffect(() => {
        const temperatureData = vitalSigns.map(sign => ({
            x: sign.transmitTime,
            y: sign.temperature,
        }))

        const temperatureChart = new Chart(temperatureChartRef.current, {
            type: 'line',
            data: {
                datasets: [{
                    label: '',
                    data: temperatureData,
                    borderColor: 'black', 
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
            temperatureChart.destroy()
        }
    }, [vitalSigns])

    return (
        <canvas ref={temperatureChartRef}></canvas>
    )
}

export default TemperatureChart;