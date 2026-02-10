import React from "react";

function TaskComponent({ task }) {
  return (
    <div>
      <h3>Random Task:</h3>
      <h3>{task}</h3>
    </div>
  );
}

export default TaskComponent;
