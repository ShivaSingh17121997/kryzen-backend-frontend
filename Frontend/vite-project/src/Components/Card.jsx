import React, { useState } from 'react';
import axios from 'axios';

export default function Card({ title, completed, _id, createdAt }) {
    const [userName, setUserName] = useState("");
    const [editing, setEditing] = useState(false);
    const [completedButton, setCompletedButton] = useState(false);
    



    const handleDelete = (_id) => {
        axios.delete(`http://localhost:8080/tasks/${_id}`)
            .then((res) => {
                console.log("Data deleted:", res);
                location.reload();
            })
            .catch((error) => {
                console.error("Error deleting data:", error);
            });
    };

    //Edit

    const handleEdit = (_d) => {
        setEditing(true)
    };

    //save edit

    const saveEdit = () => {
        axios.put(`http://localhost:8080/tasks/${_id}`, {
            title: userName,
            completed
        }).then((res) => {
            console.log("Data updated:", res);
            setEditing(false); // Disable editing mode
            location.reload();
        })
            .catch((error) => {
                console.error("Error updating data:", error);
            });


    };


    // filter by time

    return (
        <div>
            <div>
                <div class=" bg-gray-200 max-w-full bg-white px-14  border-gray-300 rounded-lg shadow dark:bg-gray-100 dark:border-gray-700">
                    <div class=" flex justify-between my-4 bg-rose-30	 p-5">

                        <div class='w-1/2 text-left	' >
                            {editing ? (
                                <>
                                    <input
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        type="text"
                                        className='rounded-md m-2 bg-slate-100 border-slate-950 px-3 py-2 w-1/2'
                                        placeholder='Enter task here'
                                    />
                                 

                                </>
                            ) :
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{title}</h5>
                            }
                        </div>



                        <div>
                            <p class="mb-3 font-normal text-balck-700 dark:text-gray-900"> {createdAt}</p>
                        </div>


                        <div>
                            <button
                                onClick={() => setCompletedButton(!completedButton)}
                                className={`py-2  px-2 rounded font-bold text-white ${completedButton ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'
                                    }`}
                            >
                                {completedButton ? "Completed" : "Not completed"}
                            </button>                        </div>



                        <div  >
                            {editing ? (
                                <button onClick={saveEdit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Save
                                </button>
                            ) : (
                                <button onClick={handleEdit} className="bg-blue-500 mx-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Edit
                                </button>
                            )}
                            <button onClick={() => handleDelete(_id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Delete
                            </button>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
