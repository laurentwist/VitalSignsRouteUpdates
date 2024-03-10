import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useParams } from "react-router-dom"
import { css } from "@emotion/react";

import { SideBar } from '../App'
import VitalSigns from '../data/patient_data.json'

import SystolicBPChart from './graphs/systolicBPChart'
import DiastolicBPChart from './graphs/diastolicBPChart'
import HeartRateChart from './graphs/heartRateChart'
import TemperatureChart from './graphs/temperatureChart'
import RespirationRateChart from './graphs/respirationRateChart'
import BloodOxygenChart from './graphs/bloodOxygenChart';

export function Patients() {
    return (
        <SideBar patients={VitalSigns.patients}>
            <Outlet />
        </SideBar>
    )
}

export function Patient() {
    const { patientID } = useParams();
    const patient = VitalSigns.patients.find(patient => patient.patientID === patientID)
    const vitalSigns = VitalSigns.vital_signs.filter(sign => sign.patientID === patientID)

    const [currentIndex, setCurrentIndex] = useState(0)

    // display data in 30 second intervals
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % vitalSigns.length)
        }, 30000)

        return () => clearInterval(intervalId)
    }, [vitalSigns])

    if (!patient) {
        return <div>Patient not found</div>
    }

    const currentVitalSign = vitalSigns[currentIndex]

    // could change the green and red color for readability

    // determine color based on respiratory rate
    let respiratoryRateColor
    if (currentVitalSign.respirationRate >= 12 && currentVitalSign.respirationRate <= 25) {
        respiratoryRateColor = 'green'
    } 
    else if (
        (currentVitalSign.respirationRate >= 9 && currentVitalSign.respirationRate <= 11) ||
        (currentVitalSign.respirationRate >= 26 && currentVitalSign.respirationRate <= 29)
    ) {
        respiratoryRateColor = 'yellow'
    } 
    else if (currentVitalSign.respirationRate <= 8 || currentVitalSign.respirationRate >= 30 ) {
        respiratoryRateColor = 'red'
    }

    // determine color based on heart rate
    let heartRateColor
    if (currentVitalSign.heartRate >= 50 && currentVitalSign.heartRate <= 110) {
        heartRateColor = 'green'
    }
    else if (
        (currentVitalSign.heartRate >= 41 && currentVitalSign.heartRate <= 49) || 
        (currentVitalSign.heartRate >= 111 && currentVitalSign.heartRate <= 129)
    ) {
        heartRateColor = 'yellow'
    }
    else if (currentVitalSign.heartRate <= 40 || currentVitalSign.heartRate >= 130) {
        heartRateColor = 'red'
    }

    // determine color based on systolic blood pressure 
    let bloodPressureColor
    if (currentVitalSign.systolicBP >= 90 && currentVitalSign.systolicBP <= 150) {
        bloodPressureColor = 'green'
    }
    else if (
        (currentVitalSign.systolicBP >= 81 && currentVitalSign.systolicBP <= 89) || 
        (currentVitalSign.systolicBP >= 151 && currentVitalSign.systolicBP <= 179)
    ) {
        bloodPressureColor = 'yellow'
    }
    else if (currentVitalSign.systolicBP <= 80 || currentVitalSign.systolicBP >= 180) {
        bloodPressureColor = 'red'
    }

    // determine color based on blood oxygen 
    let bloodOxygenColor
    if (currentVitalSign.bloodOxygen >= 95) {
        bloodOxygenColor = 'green'
    }
    else if (currentVitalSign.bloodOxygen >= 86 && currentVitalSign.bloodOxygen <= 94) {
        bloodOxygenColor = 'yellow'
    }
    else if (currentVitalSign.bloodOxygen <= 85) {
        bloodOxygenColor = 'red'
    }

    return (
        <div css={vitalSignBox}>
            <h2>{patient.name}</h2>
            <h3>DOB: {patient.DOB}</h3>
            <h3>Transport Time: {patient.transportTime}</h3>
            <h3>Transmit Time: {currentVitalSign.transmitTime}</h3>

            <div css={vitalSignBoxContent}>
                <div css={vitalSignContainer}>
                    <div css={vitalSign}>
                        <div css={vitalSignName}>Systolic BP</div>
                        <div css={[vitalSignValue, { color: bloodPressureColor }]}>
                            {currentVitalSign.systolicBP}
                        </div>
                    </div>
                    <div css={vitalSign}>
                        <div css={vitalSignName}>Diastolic BP</div>
                        <div css={[vitalSignValue, { color: bloodPressureColor }]}>
                            {currentVitalSign.diastolicBP}
                        </div>
                    </div>
                    <div css={vitalSign}>
                        <div css={vitalSignName}>Heart Rate</div>
                        <div css={[vitalSignValue, { color: heartRateColor }]}>
                            {currentVitalSign.heartRate}
                        </div>
                    </div>
                    <div css={vitalSign}>
                        <div css={vitalSignName}>Temperature</div>
                        <div css={[vitalSignValue, { color: 'black' }]}>
                            {currentVitalSign.temperature}
                        </div>
                    </div>
                    <div css={vitalSign}>
                        <div css={vitalSignName}>Respiration Rate</div>
                        <div css={[vitalSignValue, { color: respiratoryRateColor }]}>
                            {currentVitalSign.respirationRate}
                        </div>
                    </div>
                    <div css={vitalSign}>
                        <div css={vitalSignName}>Blood Oxygen</div>
                        <div css={[vitalSignValue, { color: bloodOxygenColor }]}>
                            {currentVitalSign.bloodOxygen}
                        </div>
                    </div>
                </div>
            </div>

            <div css={vitalSignBoxContent}>
                <div css={GraphContainer}>
                    <div css={vitalSign}>
                        <div css={vitalSignName}>Systolic BP</div>
                        <SystolicBPChart bloodPressureColor={bloodPressureColor}/>
                    </div>
                    <div css={vitalSign}>
                        <div css={vitalSignName}>Diastolic BP</div>
                        <DiastolicBPChart bloodPressureColor={bloodPressureColor}/>
                    </div>
                    <div css={vitalSign}>
                        <div css={vitalSignName}>Heart Rate</div>
                        <HeartRateChart heartRateColor={heartRateColor}/>
                    </div>
                    <div css={vitalSign}>
                        <div css={vitalSignName}>Temperature</div>
                        <TemperatureChart/>
                    </div>
                    <div css={vitalSign}>
                        <div css={vitalSignName}>Respiration Rate</div>
                        <RespirationRateChart respiratoryRateColor={respiratoryRateColor}/>
                    </div>
                    <div css={vitalSign}>
                        <div css={vitalSignName}>Blood Oxygen</div>
                        <BloodOxygenChart bloodOxygenColor={bloodOxygenColor}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

const vitalSignBox = css`
    background-color: white;
    color: black;
    padding: 20px;
`;

const vitalSignBoxContent = css`
    font-size: 18px;
`;

const vitalSignContainer = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
`;

const GraphContainer = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
`;

const vitalSign = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: grey;
    color: white;
    padding: 10px;
    border-radius: 5px;
`;

const vitalSignName = css`
    font-weight: bold;
    font-size: 18px;
`;

const vitalSignValue = css`
    font-size: 40px;
`;
