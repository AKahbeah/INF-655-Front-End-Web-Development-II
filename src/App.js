import React, { useState } from "react";
import Greeting from "./Greeting";
import UserInfo from "./UserInfo";
import Counter from "./Counter";
import TaskComponent from "./TaskComponent";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    "Task 1",
    "Task 2",
    "Task 3",
    "Task 4",
    "Task 5"
  ]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleAlert = () => {
    alert("Button clicked!");
  };

  return (
    <div className="App">

      {/* Task 1: Props */}
      <Greeting username="Alice" />
      <Greeting username="Bob" />

      <hr />

      {/* Task 2: Counter */}
      <Counter />

      <hr />

      {/* Task 3: Display List */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>

      {/* Task 5: Controlled Form (using TaskComponent) */}
      <TaskComponent addTask={addTask} />

      <hr />

      {/* Task 4: Function as Prop */}
      <UserInfo handleClick={handleAlert} />

    </div>
  );
}

export default App;
