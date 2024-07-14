import React, { useState, useEffect } from "react";
import "./todo.css";
import Todocard from "./Todocard";
import axios from "axios";
import Update from "./update";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Todo = () => {
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.auth.isUpdate);
  const id = sessionStorage.getItem("id");
  const [input, setInput] = useState({ title: "", description: "" });
  const [items, setItems] = useState([]);
  const [todo, setTodo] = useState([]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    if (input.title === "" || input.description === "") {
      toast.warn("Fill the title and description ");
    } else if (id) {
      await axios
        .post(`${window.location.origin}/api/v2/task`, { title: input.title, description: input.description, id: id })
        .then((res) => {
          toast(res.data.message);
          setInput({ title: "", description: "" });
          fetchTasks();
        });
    } else {
      setTodo([...todo, input]);
      setInput({ title: "", description: "" });
      toast.info('Added But not saved');
    }
    document.getElementById('des').style.display = 'none';
  };

  const del = async (cardid) => {
    if (id) {
      await axios
        .delete(`${window.location.origin}/api/v2/deleteTodo/${cardid}`, { data: { id: id } })
        .then((res) => {
          alert(res.data.message);
          fetchTasks();
        });
    } else {
      toast.success('Deleted Successfully');
      setTodo(todo.filter((item, index) => index !== cardid));
    }
  };

  const dis = (cardid) => {
    if (id) {
      dispatch(authActions.upDate());
      sessionStorage.setItem('cardid', cardid);
    } else {
      toast.error('Sign in first');
    }
  };

  const show = () => {
    document.getElementById('des').style.display = 'block';
  };

  const fetchTasks = async () => {
    if (id) {
      await axios.get(`${window.location.origin}/api/v2/getTodo/${id}`).then((res) => {
        setItems(res.data.list);
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [handleClick]);

  return (
    <div className="todo-container">
      <div className="input-section">
        <div className="col-md-4 title">
          <label htmlFor="validationDefaultUsername" className="form-label">
            TITLE
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="validationDefaultUsername"
              aria-describedby="inputGroupPrepend2"
              name="title"
              value={input.title}
              onChange={handleChange}
              onClick={show}
              required
            />
          </div>
        </div>
        <div className="col-md-4" id="des">
          <label htmlFor="validationDefaultUsername" className="form-label">
            Description
          </label>
          <div className="input-group">
            <textarea
              type="text"
              className="form-control"
              id="validationDefaultUsername"
              aria-describedby="inputGroupPrepend2"
              name="description"
              value={input.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit" onClick={handleClick}>
            Add
          </button>
        </div>
      </div>

      <div className="todo-cards">
        {id && items && Array.isArray(items) && items.map((item, index) => (
          <div key={index} className="col-lg-3 mx-5 my-3">
            <Todocard
              title={item.title}
              description={item.description}
              id={item._id}
              deleteId={del}
              display={dis}
            />
          </div>
        ))}
        {!id && todo && Array.isArray(todo) && todo.map((item, index) => (
          <div key={index} className="col-lg-3 mx-5 my-3">
            <Todocard
              title={item.title}
              description={item.description}
              id={index}
              deleteId={del}
              display={dis}
            />
          </div>
        ))}
      </div>

      {isUpdate && (
        <div className="todo-update" id="update">
          <Update />
        </div>
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Todo;
