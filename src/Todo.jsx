import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from './Snackbar/Snackbar.jsx';
import "./Todo.css";
import axios from 'axios';

const API_URL = "/todos";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [showInputError, setShowInputError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const showSnackbarAndRedirect = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
    setTimeout(() => {
      navigate("/user/login");
    }, 1000);
  };

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      console.log("res", res)
      if (res.status !== 200) throw new Error("Unauthorized");
      setTodos(res.data);
    } catch (err) {
      console.log("catch 1")
      showSnackbarAndRedirect("Session expired. Please log in again.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSave = async () => {
    const method = editingTodo ? 'put' : 'post';
    const url = editingTodo ? `${API_URL}/${editingTodo._id}` : API_URL;
    setShowInputError(false);
    try {
      const res = await axios({
        method,
        url,
        data: { task: taskInput }
      });

      if (res.status !== 200 && res.status !== 201) throw new Error("Unauthorized");

      setTaskInput('');
      setEditingTodo(null);
      setModalVisible(false);
      fetchTodos();
    } catch (err) {
      console.log("catch 2");
      showSnackbarAndRedirect("Action failed. Please login again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);

      if (res.status !== 200) throw new Error("Unauthorized");
      fetchTodos();
    } catch (err) {
      showSnackbarAndRedirect("Unable to delete. Please log in.");
    }
  };

  const handleEdit = (todo) => {
    setTaskInput(todo.task);
    setEditingTodo(todo);
    setModalVisible(true);
  };

  return (
    <div className='app-container'>
      <h1 className="heading">📝 To-Do List</h1>

      <button className="add-button" onClick={() => {
        setTaskInput('');
        setEditingTodo(null);
        setModalVisible(true);
      }}>
        Add Task
      </button>

      <ul className="task-list">
        {todos.map(todo => (
          <li key={todo._id} className="task-item">
            <span style={{color: 'black'}} className="task-text">{todo.task}</span>
            <div className="task-buttons">
              <button className="edit-button" onClick={() => handleEdit(todo)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-title">{editingTodo ? "Edit Task" : "Add Task"}</h2>
            <input
              className="modal-input"
              placeholder="Enter task..."
              required={true}
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            {showInputError && (
              <span style={{ color: 'red', alignSelf: 'flex-start', marginBottom: '10px' }}>
                Task can't be empty
              </span>
            )}
            <div className="modal-actions">
              <button className="save-button" onClick={() => { taskInput ? handleSave() : setShowInputError(true) }}>Save</button>
              <button className="cancel-button" onClick={() => setModalVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Snackbar message={snackbarMessage} visible={snackbarVisible} />
    </div>
  );
};

export default Todo;
