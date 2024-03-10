import React, { useState } from 'react'
import { NavLink, Outlet, useRouteError, useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'

import { Login } from './components/login'

import VitalSigns from './data/patient_data.json'

export function Home() {
    return (
        <></>
    )
}

export function Root({ children }) {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false) 
    const [loggedInStaff, setLoggedInStaff] = useState(null)

    const handleLogin = (staffID) => {
        // set authentication status to true upon successful login
        setIsLoggedIn(true)
        // set the staffID of the logged-in staff
        setLoggedInStaff(staffID)
    }

    const handleLogout = () => {
        // set authentication status to false upon logout
        setIsLoggedIn(false) 
        // reset the staffID of the logged-in staff
        setLoggedInStaff(null)
        // navigate back to the home route ("/")
        navigate("/")
    }

    return (
        <div className="container">
            {isLoggedIn ? ( // render based on authentication status
                <>
                    <h1>Vital Signs Route Updates</h1>
                    <button css={logoutButtonStyles} onClick={handleLogout}>Logout</button>
                    <div>
                        <SideBar patients={VitalSigns.patients} loggedInStaff={loggedInStaff} />
                    </div>
                    <main className="content">
                        {children || <Outlet />}
                    </main>
                </>
            ) : (
                <Login onLogin={handleLogin} /> 
            )}
        </div>
    )
}

export function SideBar({ patients, loggedInStaff }) {
    let filteredPatients = patients;

    if (loggedInStaff !== 'admin') {
        // filter patients based on the logged-in staff's ID
        filteredPatients = patients.filter(patient => patient.doctorID === loggedInStaff)
    }


    return (
        <nav css={sidebarStyles} className="sidebar">
            <h3>Patients</h3>
            <ul css={patientListStyles}>
                {filteredPatients.map(patient => (
                    <li key={patient.patientID} css={patientItemStyles}>
                        <NavLink to={`/patient/${patient.patientID}`} className="sidebar-link" css={navLinkStyles}>
                            {patient.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>
            <p>Error: {error.statusText || error.message}</p>
        </>
    )
}

const logoutButtonStyles = css`
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 8px 16px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #c82333;
    }
`;

const sidebarStyles = css`
    padding: 10px;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const patientListStyles = css`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
`;

const patientItemStyles = css`
    margin-right: 10px;
`;

const navLinkStyles = css`
    color: #333;
    text-decoration: none;
    padding: 5px;
    &:hover {
        background-color: #ddd;
    }
`;
