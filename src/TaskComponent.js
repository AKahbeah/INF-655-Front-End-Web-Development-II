import React, { useState } from "react";

function TaskComponent({ tasks, addTask, deleteTask }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Add task (Firebase version)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName.trim()) {
      alert("Task name cannot be empty");
      return;
    }

    addTask(taskName, taskDescription);

    setTaskName("");
    setTaskDescription("");
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort WITHOUT mutating props
  const sortedTasks = [...filteredTasks].sort((a, b) =>
    a.taskName.localeCompare(b.taskName)
  );

  return (
    <div>
      <h2>Task Manager</h2>

      {/* ADD TASK FORM */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* TASK LIST */}
      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id}>
            <strong>{task.taskName}</strong>
            <p>{task.taskDescription}</p>

            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this task?")) {
                  deleteTask(task.id);
                }
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskComponent;