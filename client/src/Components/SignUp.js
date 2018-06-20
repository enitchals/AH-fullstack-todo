import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default class SignUp extends Component {
  constructor(){
    super();
    this.state = {
      signupUsername: "",
      signupPassword: "",
    }
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  signup = () => {
    const signupUsername = "";
    const signupPassword = "";
    axios
      .post("http://localhost:8000/register",{
        username: this.state.signupUsername,
        password: this.state.signupPassword,
        withCredentials: true
      })
      .then(res => {
          console.log("RESPONSE", res);
          this.setState({signupUsername, signupPassword});
        })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="SignUp">
        <h3>Sign Up:</h3>
        <input
          name="signupUsername"
          value={this.state.signupUsername}
          onChange={this.onChange}/><br/>
        <input
          name="signupPassword"
          value={this.state.signupPassword}
          onChange={this.onChange}
          type="password"/><br/>
        <input
          type="button"
          value="Sign Up"
          onClick={this.signup}/>
      </div>
    );
  }
}
