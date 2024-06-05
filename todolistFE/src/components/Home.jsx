import React, { useState, useEffect } from 'react';
import Create from '../Create';
import axios from 'axios';
import { BsCircleFill } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8060/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios.put('http://localhost:8060/update/' + id)
      .then(result =>{
        location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete('http://localhost:8060/delete/' + id)
      .then(result =>{
        location.reload();
      })
      .catch(err => console.log(err));
  };
  

  return (
    <div className='home'>
      <h2>ToDo List</h2>
      <Create />
      {
        todos.length === 0 ? <h2>No Recorded todo...</h2> :
        todos.map((todo, index) => (

          <div key={index} className='task'>
            <div className='checkbox' onClick={()=>handleEdit(todo._id)}>
                {todo.done ? <BsFillCheckCircleFill className='icon'/>
                : <BsCircleFill className='icon' />
            }
              <p className={todo.done ? "todoEdit" : ""}>{todo.task}</p>  
            </div>
           <div>
            <span><BsFillTrash3Fill className='icon' onClick={()=>handleDelete(todo._id)}/></span>
           </div>
          </div>
        ))
      }
    </div>
  );
}

export default Home;
