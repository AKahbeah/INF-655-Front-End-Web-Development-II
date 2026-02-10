import React from "react";
import Greeting from "./Greeting";
import UserInfo from "./UserInfo";
import TaskComponent from "./TaskComponent";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Greeting />
      <UserInfo />
      <TaskComponent task="Example task" />
    </div>
  );
}

export default App;

