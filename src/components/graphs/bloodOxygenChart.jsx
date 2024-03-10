import React, { useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import Chart from 'chart.js/auto'

import VitalSigns from '../../data/patient_data.json'

const BloodOxygenChart = ({bloodOxygenColor}) => {
    const { patientID } = useParams()
    const vitalSigns = VitalSigns.vital_signs.filter(sign => sign.patientID === patientID)

    const bloodOxygenChartRef = useRef(null)

    useEffect(() => {
        const bloodOxygenData = vitalSigns.map(sign => ({
            x: sign.transmitTime,
            y: sign.bloodOxygen,
        }))

        const bloodOxygenChart = new Chart(bloodOxygenChartRef.current, {
            type: 'line',
            data: {
                datasets: [{
                    label: '',
                    data: bloodOxygenData,
                    borderColor: bloodOxygenColor, 
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
            bloodOxygenChart.destroy()
        }
    }, [vitalSigns])

    return (
        <canvas ref={bloodOxygenChartRef}></canvas>
    )
}

export default BloodOxygenChart;