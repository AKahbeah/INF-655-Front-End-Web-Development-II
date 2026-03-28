import React, { Component } from "react";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "John Doe",
      profession: "Software Developer",
      luckyNumber: Math.floor(Math.random() * 100) + 1
    };
  }

  generateLuckyNumber = () => {
    this.setState({ luckyNumber: Math.floor(Math.random() * 100) + 1 });
  };

  render() {
    return (
      <div>
        <h2>User Information</h2>
        <p>Name: {this.state.name}</p>
        <p>Profession: {this.state.profession}</p>
        <p>Your lucky number is: {this.state.luckyNumber}</p>
        <button onClick={this.generateLuckyNumber}>
          Generate New Lucky Number
        </button>
      </div>
    );
  }
}

export default UserInfo;
