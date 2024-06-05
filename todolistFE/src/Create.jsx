import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";

function Create() {

  const [task, setTask] = useState();

 
  const handleAdd =()=>{
    axios.post('http://localhost:8060/add', {task : task})
    .then(result=> {location.reload();})
    .catch(err => console.log(err));

    document.getElementById("todoInput").value= "";

  }

  return (
    <div className='create_form'>
        <input type="text"  name='' id='todoInput'  placeholder='Enter Task' onChange={(e)=>{
          setTask(e.target.value)
        }} />
        <button type='button' onClick={handleAdd}> Add</button>

    </div>
  )
}

export default Create