import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from './Home';
import Microservice from './Microservice';
import Login from './Login';
import Register from './Register';
import PrivateRoute from './PrivateRoute';
import auth from './auth';

class App extends Component {
    logout(){
        auth.removeToken();
    }

  render() {
    return (
      <div className="App">
        <header style={{minHeight: '7vh', backgroundColor: '#0f6ab4', display: 'flex'}}>
            <p style={{margin: 'auto 20px', color: 'white', width: '12%', cursor: 'pointer'}}
               onClick={() => window.location = '/home'}>
                The PurplePages
            </p>
            <div style={{margin: 'auto 0px', width: '72%', color: 'white'}}>
                Software Architecture - Team 01
            </div>

            <div style={{margin: 'auto 0px'}}>
                { auth.getToken()
                    ?
                        <span onClick={() => {
                            this.logout();
                            window.location = '/';
                        }} style={{color: 'white', cursor: 'pointer'}}>
                            Logout
                        </span>
                    :
                    <div>
                        <span onClick={() => window.location = '/login'} style={{color: 'white', cursor: 'pointer'}}>
                            Login
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span onClick={() => window.location = '/register'} style={{color: 'white', cursor: 'pointer'}}>
                            Register
                        </span>
                    </div>
                }

            </div>
        </header>
        <Router>
            <Switch>
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/microservice" component={Microservice} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/" component={Home} />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
