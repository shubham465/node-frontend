import React from "react";

const TodoModal = ({
  modalVisible,
  editingTodo,
  taskInput,
  setTaskInput,
  showInputError,
  onSave,
  onCancel
}) => {
  if (!modalVisible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="glass-card sm:p-8 w-full max-w-md mx-2">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          {editingTodo ? "Edit Task" : "Add Task"}
        </h2>
        <form action="" onSubmit={e => { e.preventDefault(); taskInput ? onSave() : setTaskInput(""); }}>
          <input
            autoFocus
            className="glass-input"
            placeholder="Enter task..."
            required={true}
            value={taskInput}
            onChange={e => setTaskInput(e.target.value)}
          />
          {showInputError && (
            <span className="text-red-500 text-sm block mb-2">
              Task can't be empty
            </span>
          )}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 cursor-pointer transition font-semibold text-sm sm:text-base"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-slate-300 text-gray-700 rounded-lg hover:bg-slate-400 cursor-pointer transition font-semibold text-sm sm:text-base"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
