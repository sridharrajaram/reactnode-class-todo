import React from 'react'

function Tasklist(props) {
    
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <input onChange={(e)=>{props.handleChange(e.target.checked,props.handleData._id)}} style={{cursor:'pointer'}} checked ={props.handleData.status} className="form-check-input" type="checkbox" value="" id="flexCheckChecked" default/> &nbsp;
                <label className="form-check-label" for="flexCheckChecked">
                    <span style={{textDecoration: props.handleData.status ? "line-through": ""}}>{props.handleData.task}</span>
                    
                </label>
            </div>
            <span onClick={()=>{props.handleDelete(props.handleData._id,props.handleData.status)}} className="badge bg-danger rounded-pill" style={{cursor:'pointer'}}>X</span>
        </li>
    )
}

export default Tasklist