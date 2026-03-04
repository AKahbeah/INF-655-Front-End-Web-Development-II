import React from "react";

function Greeting({ username }) {
  const today = new Date().toDateString();

  const paragraphStyle = {
    color: "blue",
    fontSize: "18px"
  };

  return (
    <div>
      <h1>Hello, {username}! Welcome to React!</h1>
      <p style={paragraphStyle}>
        Today’s date is: {today}
      </p>
    </div>
  );
}

export default Greeting;
