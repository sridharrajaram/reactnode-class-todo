import Tasklist from './Tasklist';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

function Task() {

    const [todo, setToDo] = useState([]);
    const [task, setTask] = useState("");

    const fecthData = async () => {
        try {
            let tasks = await axios.get("http://localhost:3001/todo-list");
            console.log(tasks);
            setToDo([...tasks.data]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fecthData();
    }, [])


    const handleCreateTask = async () => {
        try {
            await axios.post("http://localhost:3001/create-task", { task })
            fecthData();
            setTask("");

        } catch (error) {
            console.log("error");
        }
    }

    const updateTask = async (checkStatus, id) => {
        try {
            await axios.put(`http://localhost:3001/update-task/${id}`, { status: checkStatus })
            fecthData();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async (id, checkStatus) => {

        try {
            let result = checkStatus ? window.confirm("task completed, press ok to delete") : window.confirm("task pending, are you sure want to delete?");
            if (result) {
                await axios.delete(`http://localhost:3001/delete-task/${id}`)
                fecthData();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <h1> Todo list </h1>
                </div>
                <div className="row">
                    <div className="row">
                        <div className="col-lg-3">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Add task" value={task} onChange={(e) => { setTask(e.target.value) }} aria-label="Add task" aria-describedby="button-addon2" />
                                <button onClick={handleCreateTask} class="btn btn-outline-secondary" type="button" id="button-addon2">Add</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <ul className="list-group">
                            {
                                todo.map((obj) => {
                                    return <Tasklist handleData={obj} handleChange={updateTask} handleDelete={deleteTask} ></Tasklist>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task
