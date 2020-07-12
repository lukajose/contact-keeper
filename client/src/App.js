import React,{Fragment} from 'react';
import NavBar from './components/layout/Nav';
import Alerts from './components/layout/Alerts';
import './App.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import PrivateRoute from './components/routing/PrivateRoute';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState'
import setAuthToken from './utils/setAuthToken'
import SideBar from './components/layout/Sidebar'
if(localStorage.token) {
  setAuthToken(localStorage.token)
}


const App = ()=> {
  return (
    <AuthState>
      <ContactState>
        <AlertState>  
          <Router>
            <Fragment>
              <NavBar/>
              <SideBar/>
              <div className="container">
                <Alerts/>
                <Switch>
                  <PrivateRoute exact path='/' component={Home}></PrivateRoute>
                  <Route exact path='/about' component={About}></Route>
                  <Route exact path='/register' component={Register}></Route>
                  <Route exact path='/login' component={Login}></Route>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  )

};

export default App;