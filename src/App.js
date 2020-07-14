import React, { Component } from "react";
import store from "./DataStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect }
    from "react-router-dom";
import { ShopConnector } from "./shop/ShopConnector";
export default class App extends Component {
    render() {
        return <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/todo" component={TodoRouter} />
                    <Redirect to="/todo" />
                </Switch>
            </Router>
        </Provider>
    }
}