import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (

        <div class='px-4 m-auto flex-evenly rounded-lg w-full  py-5  bg-gray-900' >
            <div>
                <h5 class="mb-2  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">TasK Builder</h5>
            </div>


            <div className='flex-rounded text-white ' >
                <Link to="/" >Home</Link>
                <Link to="/login" > Login</Link>
                <Link to="/signup" >Signup</Link>
            </div>

        </div>

    )
}
