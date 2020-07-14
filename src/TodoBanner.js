import React, { Component } from 'react';
import { connect } from "react-redux";

function mapStateToProps (state) {
    return {tasks: state.todoItems,
            name: state.userName
    };
}
class TodoBannerConnectd extends Component {

    render = () =>
        <h4 className="bg-primary text-white text-center p-2">
            { this.props.name }'s To Do List {" "}
            { this.props.tasks.length } items
        </h4>            
}
export const TodoBanner = connect(mapStateToProps)(TodoBannerConnectd);
