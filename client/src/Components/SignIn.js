import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;


export default class SignIn extends Component {
  constructor(){
    super();
    this.state = {
      loginUsername: "",
      loginPassword: "",
    }
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  login = () => {
    const loginUsername = "";
    const loginPassword = "";
    axios
      .post("http://localhost:8000/login",{
        username: this.state.loginUsername,
        password: this.state.loginPassword,
        withCredentials: true
      })
      .then(res => {
          console.log("RESPONSE", res);
          this.setState({loginUsername, loginPassword});
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="SignIn">
      <h3>Log In:</h3>
      <input
          name="loginUsername"
          value={this.state.loginUsername}
          onChange={this.onChange}/><br/>
        <input
          name="loginPassword"
          value={this.state.loginPassword}
          onChange={this.onChange}
          type="password"/><br/>
        <input
          type="button"
          value="Sign In"
          onClick={this.login}/><br/><br/>
      </div>
    );
  }
}
