import React, { Component } from "react";
import { TodoNavigation } from "./TodoNavigation";
import { TodoRouter } from "./TodoRouter";
export class Main extends Component {
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col bg-dark text-white">
                </div>
            </div>
            <div className="row">
                <div className="col-3 p-2">
                    <TodoNavigation />
                </div>
                <div className="col-9 p-2">
                    <TodoRouter />
                </div>
            </div>
        </div>
    }
}