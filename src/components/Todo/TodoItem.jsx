import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const TodoItem = ({ todo, onEdit, onDelete }) => (
  <li
    className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-100/40 cursor-pointer rounded-md px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out"
  >
    <span className="text-gray-900 text-base sm:text-lg break-words">{todo.task}</span>
    <div className="flex mt-2 sm:mt-0 space-x-2">
      <button
        className="p-2 bg-yellow-800 text-white rounded hover:bg-yellow-900 cursor-pointer transition font-medium flex items-center justify-center"
        aria-label="Edit"
        onClick={() => onEdit(todo)}
      >
        <FiEdit2 className="text-lg" />
      </button>
      <button
        className="p-2 bg-red-800 text-white rounded hover:bg-red-900 transition cursor-pointer font-medium flex items-center justify-center"
        aria-label="Delete"
        onClick={() => onDelete(todo._id)}
      >
        <FiTrash2 className="text-lg" />
      </button>
    </div>
  </li>
);

export default TodoItem;
