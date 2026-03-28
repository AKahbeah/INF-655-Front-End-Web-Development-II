import React, { useState } from "react";

function TaskComponent({ tasks, addTask, deleteTask }) {
  const [taskName, setTaskName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return alert("Task name cannot be empty");
    addTask({ id: Date.now(), name: taskName });
    setTaskName("");
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = () => {
    tasks.sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <input
        type="text"
        placeholder="Search Tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSort}>Sort by Name</button>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            {task.name}{" "}
            <button onClick={() => {
              if (window.confirm("Are you sure to delete this task?")) deleteTask(task.id);
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskComponent;