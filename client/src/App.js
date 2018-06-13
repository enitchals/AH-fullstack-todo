import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

class App extends Component {
  constructor(){
    super();
    this.state = {
      signupUsername: "",
      signupPassword: "",
      loginUsername: "",
      loginPassword: "",
      text: "",
      session: null,
    }
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  signup = () => {
    axios
      .post("http://localhost:8000/register",{
        username: this.state.signupUsername,
        password: this.state.signupPassword,
        withCredentials: true
      })
      .then(res => console.log("RESPONSE", res));
  }

  login = () => {
    axios
      .post("http://localhost:8000/login",{
        username: this.state.loginUsername,
        password: this.state.loginPassword,
        withCredentials: true
      })
      .then(res => console.log("RESPONSE", res))
      .catch(err => console.log(err));
  }

  refresh = () => {
    axios.get('http://localhost:8000/')
      .then(res => {
        console.log(res);
        this.setState({text: res.data.message})
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
      <h1>{this.state.text}</h1>
      <h3>Sign Up:</h3>
        <input
          name="signupUsername"
          value={this.state.signupUsername}
          onChange={this.onChange}/>
        <input
          name="signupPassword"
          value={this.state.signupPassword}
          onChange={this.onChange}/>
        <input
          type="button"
          value="Sign Up"
          onClick={this.signup}/>

      <h3>Log In:</h3>
      <input
          name="loginUsername"
          value={this.state.loginUsername}
          onChange={this.onChange}/>
        <input
          name="loginPassword"
          value={this.state.loginPassword}
          onChange={this.onChange}/>
        <input
          type="button"
          value="Sign In"
          onClick={this.login}/>

          <button onClick={this.refresh}>Refresh</button>
      </div>
    );
  }
}

export default App;
