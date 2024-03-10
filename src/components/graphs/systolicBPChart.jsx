import React, { useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import Chart from 'chart.js/auto'

import VitalSigns from '../../data/patient_data.json'

const SystolicBPChart = ({bloodPressureColor}) => {
    const { patientID } = useParams()
    const vitalSigns = VitalSigns.vital_signs.filter(sign => sign.patientID === patientID)

    const systolicBPChartRef = useRef(null)

    useEffect(() => {
        const bloodPressureData = vitalSigns.map(sign => ({
            x: sign.transmitTime,
            y: sign.systolicBP,
        }))

        const bloodPressureChart = new Chart(systolicBPChartRef.current, {
            type: 'line',
            data: {
                datasets: [{
                    label: '',
                    data: bloodPressureData,
                    borderColor: bloodPressureColor, 
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
            bloodPressureChart.destroy()
        }
    }, [vitalSigns])

    return (
        <canvas ref={systolicBPChartRef}></canvas>
    )
}

export default SystolicBPChart;