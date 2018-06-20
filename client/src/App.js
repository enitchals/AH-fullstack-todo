import React, { Component } from 'react';
import axios from 'axios';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
axios.defaults.withCredentials = true;

class App extends Component {
  constructor(){
    super();
    this.state = {
      todos: [{title: "sample task"}],
    }
  }

  refresh = () => {
    axios.get('http://localhost:8000/api/todo/all')
      .then(res => {
        console.log("RES MESSAGE", res.data.todos);
        this.setState({todos: res.data.todos})
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
      <SignUp/>
      <br/><br/>
      <SignIn/>
          <button onClick={this.refresh}>Refresh</button>
          {this.state.todos.map(todo => <div>{todo.title}</div>)}
      </div>
    );
  }
}

export default App;
