import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import React,{useState,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch,Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import Login from './components/Login'
import {connect} from 'react-redux'

// set PORT=3000 && 


function App({userdata}) {
  const [state,setState] = useState(false)
  
  return (
      <Router>
      {
        userdata!==null?
        <div className="row col-12 p-0" style={{height:'100vh'}}>
        <Nav/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='*' exact={true} component={()=><Redirect to='/' />} />
        </Switch>
      </div>:<Login fun={()=>setState(true)} />
      }
      </Router>
  );
}
export default connect(state=>{return {...state}})(App);


