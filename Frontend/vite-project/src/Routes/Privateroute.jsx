import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContextProvider';


export default function Privateroute({ children }) {
    const { isAuth } = useContext(AuthContext);

    if (!isAuth) {
        alert("Login first")
        return <Navigate to="/login" />
    }


    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}
