import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const res = await api.post("/tasks", { title: newTask });
      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task");
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks by search
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-6 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-100 transition-all">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-1 tracking-tight">
            🧾 Task Dashboard
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base">
            Manage, search, and organize your daily tasks with ease.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-full mx-auto">
          <input
            type="text"
            placeholder="🔍 Search tasks by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm md:text-base shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition placeholder:text-gray-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition text-xs sm:text-sm md:text-base"
            >
              ✕
            </button>
          )}
        </div>

        {/* Add Task Form */}
        <form
          onSubmit={handleAddTask}
          className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-8 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
        >
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="✍️ Write a new task..."
            className="flex-1 min-w-0 bg-transparent px-10 py-4 sm:px-6 sm:py-6 outline-none text-gray-700 placeholder-gray-400 text-xs sm:text-lg md:text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
          <button
            type="submit"
            className="flex-shrink-0 w-full sm:w-auto px-3 sm:px-1 py-2 sm:py-1 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition text-xs sm:text-s md:text-base whitespace-nowrap"
          >
            ➕ Add
          </button>
        </form>

        {/* Task List */}
        {loading ? (
          <p className="text-gray-500 text-center text-sm sm:text-base">Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center italic text-sm sm:text-base">
            {tasks.length === 0
              ? "No tasks yet. Add one above! 🚀"
              : "No matching tasks found 🔍"}
          </p>
        ) : (
          <ul className="space-y-3">
            {filteredTasks.map((task) => (
              <li
                key={task._id}
                className="flex flex-col sm:flex-row justify-between items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex-1 flex items-center gap-2">
                  {editingTask?._id === task._id ? (
                    <>
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-md text-sm sm:text-base"
                        autoFocus
                      />
                      <button
                        onClick={async () => {
                          try {
                            await api.put(`/tasks/${task._id}`, {
                              title: editingTitle,
                            });
                            setEditingTask(null);
                            fetchTasks();
                          } catch (err) {
                            console.error(err);
                            alert("Failed to update task");
                          }
                        }}
                        className="px-3 py-1.5 bg-green-500 text-white rounded-md text-sm sm:text-base"
                      >
                        💾 Save
                      </button>
                    </>
                  ) : (
                    <h4 className="text-gray-800 font-semibold text-sm sm:text-base md:text-lg">
                      {task.title}
                    </h4>
                  )}
                </div>

                <div className="flex gap-2 mt-2 sm:mt-0">
                  {editingTask?._id !== task._id && (
                    <button
                      onClick={() => {
                        setEditingTask(task);
                        setEditingTitle(task.title);
                      }}
                      className="px-3 py-1.5 text-xs sm:text-sm md:text-base text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      ✏️ Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-3 py-1.5 text-xs sm:text-sm md:text-base text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
