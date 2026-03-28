import React, { useState } from "react";
import Greeting from "./Greeting";
import UserInfo from "./UserInfo";
import TaskComponent from "./TaskComponent";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1" },
    { id: 2, name: "Task 2" }
  ]);

  const addTask = (newTask) => setTasks([...tasks, newTask]);
  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));

  return (
    <div className="App">
      <Greeting username="Alice" />
      <hr />
      <UserInfo />
      <hr />
      <TaskComponent tasks={tasks} addTask={addTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
