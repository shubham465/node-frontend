import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import Snackbar from '../Snackbar';

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
      fetchTodos();
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
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">📝 To-Do List</h1>

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

        <ul className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
          {todos.map(todo => (
            <li
              key={todo._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-100/40 cursor-pointer rounded-md px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out"
            >
              <span className="text-gray-900 text-base sm:text-lg break-words">{todo.task}</span>
              <div className="flex mt-2 sm:mt-0 space-x-2">
                <button
                  className="p-2 bg-yellow-800 text-white rounded hover:bg-yellow-900 cursor-pointer transition font-medium flex items-center justify-center"
                  aria-label="Edit"
                  onClick={() => handleEdit(todo)}
                >
                  <FiEdit2 className="text-lg" />
                </button>
                <button
                  className="p-2 bg-red-800 text-white rounded hover:bg-red-900 transition cursor-pointer font-medium flex items-center justify-center"
                  aria-label="Delete"
                  onClick={() => handleDelete(todo._id)}
                >
                  <FiTrash2 className="text-lg" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="glass-card sm:p-8 w-full max-w-md mx-2">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
              {editingTodo ? "Edit Task" : "Add Task"}
            </h2>
            <input
              className="glass-input"
              placeholder="Enter task..."
              required={true}
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            {showInputError && (
              <span className="text-red-500 text-sm block mb-2">
                Task can't be empty
              </span>
            )}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 cursor-pointer transition font-semibold text-sm sm:text-base"
                onClick={() => { taskInput ? handleSave() : setShowInputError(true) }}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-slate-300 text-gray-700 rounded-lg hover:bg-slate-400 cursor-pointer transition font-semibold text-sm sm:text-base"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Snackbar message={snackbarMessage} visible={snackbarVisible} />
    </div>
  );
};

export default Todo;
