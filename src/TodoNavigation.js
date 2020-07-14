import React, { Component } from "react";
import { Link } from "react-router-dom";
export class TodoNavigation extends Component {
    render() {
        return <React.Fragment>
            <Link className="btn btn-secondary btn-block"
                to="/todo">All</Link>
            <Link className="btn btn-secondary btn-block"
                to="/completed">Comleted</Link>
            <Link className="btn btn-secondary btn-block"
                to="/uncompleted">Uncomleted</Link>
        </React.Fragment>
    }
}