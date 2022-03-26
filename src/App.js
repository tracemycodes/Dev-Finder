import React, { Component } from 'react';
import Navbar from './components/layouts/Navbar';
// import UserItem from './components/users/UserItem';
import Users from './components/users/Users';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar title='Dev Finder' icon='fab fa-github' />
        {/* <UserItem /> */}
        <Users />
      </div>
    );
  }
}

export default App; 
