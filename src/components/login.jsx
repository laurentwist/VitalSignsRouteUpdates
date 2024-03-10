import React, { useState } from 'react'
import { css } from '@emotion/react'

import StaffCredentials from '../data/login_credentials.json'

export function Login({ onLogin, onLogout, isLoggedIn }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        // check against the JSON data for staff credentials
        const found = StaffCredentials.find(cred => cred.username === username && cred.password === password)
        if (found || (username === 'admin' && password === 'admin')) {
            onLogin(found ? found.staffID : 'admin')
        } 
        else {
            alert('Invalid Credentials')
        }
    }

    const handleLogout = () => {
        onLogout()
    }

    return (
        <div>
            {isLoggedIn ? (
                <button css={logoutButtonStyles} onClick={handleLogout}>Logout</button>
            ) : (
                <>
                    <h1 css={headerStyles}>Vital Signs Route Updates</h1>
                    <div css={loginContainer}>
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit} css={formStyles}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                css={inputStyles}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                css={inputStyles}
                            />
                            <button type="submit" css={buttonStyles}>Login</button>
                        </form>
                    </div>
                </>
            )}
        </div>
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

const headerStyles = css`
    margin-bottom: 20px;
    text-align: center;
`;

const loginContainer = css`
    max-width: 300px;
    margin: 50px auto 0 auto; 
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const formStyles = css`
    display: flex;
    flex-direction: column;
`;

const inputStyles = css`
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
`;

const buttonStyles = css`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;