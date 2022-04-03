import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import './App.css';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  // async componentDidMount() {
  //   this.setState({loading: true})
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECERT}`);

  //   this.setState({users: res.data, loading: false})
  // }

  // search github users value
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECERT}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  getSingleUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECERT}`
    );

    this.setState({ user: res.data, loading: false });
  };

  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECERT}`
    );

    this.setState({ repos: res.data, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 4000);
  };

  render() {
    const { users, loading, alert, user, repos } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar title='Dev Finder' icon='fab fa-github' />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getSingleUser={this.getSingleUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    loading={loading}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
