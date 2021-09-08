import Tasklist from './Tasklist';
import axios from 'axios';
import { useEffect, useState} from 'react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import env from './UrlSettings';

function Task() {

    const [todo, setToDo] = useState([]);
    const [task, setTask] = useState("");
    const history = useHistory();

    const fecthData = async () => {
        try {
            let tasks = await axios.get(`${env.api}/todo-list`,{
                headers:{
                    "Authorization":window.localStorage.getItem("app_token")
                }
            });
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
            await axios.post(`${env.api}/create-task`, { task },{
                headers:{
                    "Authorization":window.localStorage.getItem("app_token")
                }
            })
            fecthData();
            setTask("");

        } catch (error) {
            console.log("error");
        }
    }

    const updateTask = async (checkStatus, id) => {
        try {
            await axios.put(`${env.api}/update-task/${id}`, { status: checkStatus },{
                headers:{
                    "Authorization":window.localStorage.getItem("app_token")
                }
            })
            fecthData();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async (id, checkStatus) => {

        try {
            let result = checkStatus ? window.confirm("task completed, press ok to delete") : window.confirm("task pending, are you sure want to delete?");
            if (result) {
                await axios.delete(`${env.api}/delete-task/${id}`,{
                    headers:{
                        "Authorization":window.localStorage.getItem("app_token")
                    }
                })
                fecthData();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-lg-4">
                        <h3>Welcome User</h3>
                    </div>
                    <div className="col-lg-2"><h1> Todo list </h1></div>
                    <div dir="rtl" className="col-lg-6">
                        <button className="btn btn-primary"
                            onClick={()=>{
                                window.localStorage.removeItem("app_token")
                                history.push("/login")
                            }}
                        >logout</button>
                    </div>
                    
                    
                </div>
                <div className="row mt-2">
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
