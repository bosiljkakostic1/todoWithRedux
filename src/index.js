import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
// import App from './App';
import All from "./All";
import Completed from "./Completed";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import store from "./DataStore";
import { NavLink, Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";


render(
    <div>
    <div className="row">.</div>
    <div className="row">
    <Router>
    <div className="col-md-1"></div>
        <div className="col-md-1">
            <div className = "text-left">
                    <NavLink exact activeClassName="active" to="/">All</NavLink>
            </div>
            <div className = "text-left">
                    <NavLink activeClassName="active" to="/completed">Completed</NavLink>
            </div>
            <div className = "text-left">
                    <NavLink activeClassName="active" to="/uncompleted">Uncompleted</NavLink>
            </div>
        </div>
        <div className="col-md-9">                
                    <Route path="/" render={() => (<Provider store={store}><All /></Provider>)} exact={true}/>
                    <Route path="/completed"  render={() => (
                        <Provider store={store}><Completed completed="true" /></Provider>)} exact={true} />
                    <Route path="/uncompleted" render={() => (
                        <Provider store={store}><Completed completed="false" /></Provider> )} exact={true} />                
        </div>
    </Router>
    </div>
    </div>
    ,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
