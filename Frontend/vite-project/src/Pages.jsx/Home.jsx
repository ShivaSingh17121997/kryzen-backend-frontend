import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Components/Card';

export default function Home() {
    const [taskData, setTaskData] = useState([]);
    const [userName, setUserName] = useState("");
    const [checkbox, setCheckbox] = useState(false);
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        fetchTaskData();
    }, []);

    const fetchTaskData = async () => {
        try {
            const res = await axios.get("http://localhost:8080/tasks/");
            setTaskData(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTasks = async (e) => {
        e.preventDefault();
        if (!userName) {
            setFormError("Please fill out all required fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/tasks/addtask", {
                title: userName,
                completed: checkbox,
            });
            setTaskData(prevData => [...prevData, response.data]);
            setUserName(""); // Clear input fields after successful submission
            setCheckbox(false); // Reset checkbox to false after successful submission
            setFormError(null); // Reset form error
        } catch (error) {
            console.error(error);
        }
    };

    const handleFilterByTime = async () => {
        try {
            const res = await axios.get("http://localhost:8080/tasks/sortByTime");
            setTaskData(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={handleTasks} className='max-w-4/5' action="">
                    <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        type="text"
                        className='rounded-md m-10 bg-slate-100 border-slate-950 px-3 py-4 w-2/5'
                        placeholder='Enter task here'
                    />

                    <input
                        checked={checkbox}
                        onChange={(e) => setCheckbox(e.target.checked)} // Update checkbox value to the checked status
                        id="helper-checkbox"
                        aria-describedby="helper-checkbox-text"
                        type="checkbox"
                        className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 rounded-lg"
                    />
                    <label className='mx-1' >Completed</label>

                    <button type="submit" className="bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>

                    {formError && <p className="text-red-500">{formError}</p>}
                </form>

                {/* Filter by time button */}
                <div className='text-right mx-0'>
                    <button onClick={handleFilterByTime} type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Filter by time
                    </button>
                </div>

                <div>
                    {taskData.map((item) => <Card key={item._id} {...item} />)}
                </div>
            </div>
        </div>
    );
}
