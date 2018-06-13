import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

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
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  signup = () => {
    axios
      .post("http://localhost:8000/register",{
        username: this.state.signupUsername,
        password: this.state.signupPassword
      })
      .then(res => {});
  }

  login = () => {
    // axios
    //   .post("http://localhost:8000/login",{
    //     username: this.state.loginUsername,
    //     password: this.state.loginPassword
    //   })
    //   .then(res => {
    //     this.setState({session: res.session})
    //     console.log(this.state.session);
    //   })
    // const username = this.state.loginUsername;
    // const password = this.state.loginPassword;
    // const signin = function(){axios
    //   .post("http://localhost:8000/login",{username,password})}
    // const get = function(req, res){ axios
    //   .get("http://localhost:8000/")
    //   .then(res => {
    //     console.log("res:", res);
    //     this.setState({text: res.message})
    //     })
    //   .catch(err => {
    //     console.log(err);
    //     })
    //   }
    // axios.all([signin(), get()])
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
      </div>
    );
  }
}

export default App;
