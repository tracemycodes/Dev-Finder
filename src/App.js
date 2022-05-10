import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import './App.css';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';

const App = () => {
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);

  // const getSingleUser = async (username) => {
  //   setLoading(true);
  //   const res = await axios.get(
  //     `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECERT}`
  //   );

  //   setUser(res.data);
  // };

  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECERT}`
    );

    setRepos(res.data);
  };

  const clearUsers = () => {
    setUsers([]);
  };

  const setMyAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  return (
    // <GithubState>
    <GithubState>
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
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={setMyAlert}
                    />
                    <Users />
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
                    getUserRepos={getUserRepos}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
