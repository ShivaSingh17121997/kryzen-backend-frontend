import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../Pages.jsx/Home';
import Login from '../Pages.jsx/Login';
import Signup from '../Pages.jsx/Signup';
import Privateroute from './Privateroute';

export default function AllRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/' element={
                    <Privateroute>  <Home />   </Privateroute>
                } />

                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </div>
    );
};
