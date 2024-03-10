import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Root, ErrorPage, Home } from './App'
import { Patient, Patients } from './components/patient'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <Root><ErrorPage/></Root>,
        children: [
            { index: true, element: <Home/> },
            { 
                path: 'patient', 
                element: <Patient/>,
                children: [
                    { path: ":patientID", element: <Patients/> } 
                ]
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)