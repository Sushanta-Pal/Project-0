import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import {authActions} from '../../store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {
    const dispatch =useDispatch();
    const id=sessionStorage.getItem('id')
    const cardid=sessionStorage.getItem('cardid')
  const [input, setinput] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
    if (input.title ===''||input.description==='') {
      toast('plz fill the data');
    }else{
      await axios.put(`${window.location.origin}/api/v2/updateTask/${cardid}`, { title: input.title, description: input.description, id: id })
      .then((res)=> {
        alert(res.data.message);
      dispatch(authActions.upDateDone())
      sessionStorage.removeItem('cardid');
      }
      )
    }
      
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  return (
    <>
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h3>Update Your Task</h3>
      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        name="title"
        value={input.title}
        onChange={handleChange}
      />
      <textarea
        className="todo-inputs w-100 p-3"
        name="description"
        value={input.description}
        onChange={handleChange}
      />
      <button className="btn btn-dark my-4" onClick={handleUpdate}>
        UPDATE
      </button>
      <button className="btn btn-danger my-4 mx-3" onClick={() => {
        
        sessionStorage.removeItem('cardid');
        dispatch(authActions.upDateDone())
      }}>
        Close
      </button>
    </div>
    <ToastContainer position="top-center"/>
    </>
  );
};

export default Update;
