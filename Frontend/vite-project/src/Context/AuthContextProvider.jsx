import React, { useState } from 'react'
import { createContext } from 'react';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState("");

    const login = (token) => {
        if (token) {
            setIsAuth(true);
            setToken(token);
        }
    }

    const logout = () => {
        setIsAuth(false);
        setToken("");
    }


    return (
        <AuthContext.Provider value={{ isAuth, login, logout , token}} >
            {children}
        </AuthContext.Provider>
    )
};