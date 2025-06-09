import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { FiPlus } from 'react-icons/fi';
import Snackbar from '../Snackbar';
import TodoModal from './TodoModal';
import TodoItem from './TodoItem';

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
  const listRef = useRef(null);

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
      if (res.status !== 200) throw new Error("Unauthorized");
      setTodos(res.data);
    } catch (err) {
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
      await fetchTodos();
      
      if (!editingTodo && listRef.current) {
        setTimeout(() => {
          listRef.current.scrollTo({
            top: listRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      }
    } catch (err) {
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
    <div className="h-full w-full flex flex-col items-center py-8 px-2">
      <div className="w-full glass-card sm:p-8 mt-0 sm:mt-8 max-w-full sm:max-w-xl">
        <h1 className=" font-custom text-2xl md:text-5xl font-bold text-center text-gray-800 mb-8">To-Do List</h1>

        <div className="flex justify-end mb-6">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 transition text-sm sm:text-base cursor-pointer"
            onClick={() => {
              setTaskInput('');
              setEditingTodo(null);
              setModalVisible(true);
            }}
          >
            <FiPlus className="text-lg" />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>

        <ul
          className="space-y-4 max-h-[50vh] overflow-y-auto pr-2"
          ref={listRef}
        >
          {todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>

      <TodoModal
        modalVisible={modalVisible}
        editingTodo={editingTodo}
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        showInputError={showInputError}
        onSave={() => { taskInput ? handleSave() : setShowInputError(true); }}
        onCancel={() => setModalVisible(false)}
      />

      <Snackbar message={snackbarMessage} visible={snackbarVisible} />
    </div>
  );
};

export default Todo;
