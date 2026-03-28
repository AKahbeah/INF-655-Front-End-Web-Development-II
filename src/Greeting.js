import React, { useState } from "react";

function Greeting({ username }) {
  const [greeting, setGreeting] = useState("Hello");
  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div>
      <h1>{greeting}, {username}!</h1>
      <p style={{ color: "blue", fontSize: "18px" }}>Today's date: {today}</p>
      <button onClick={() => setGreeting(greeting === "Hello" ? "Hi" : "Hello")}>
        Change Greeting
      </button>
    </div>
  );
}

export default Greeting;
