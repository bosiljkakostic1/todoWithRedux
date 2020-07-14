import React, { Component } from 'react';
import { connect } from "react-redux";
import { addToDo } from "./Actions";

function mapDispatchToProps (dispatch) {
    return {
        addToDo: (toDoItem) => {dispatch(addToDo(toDoItem));},
    }
}
class TodoCreatorConnect extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            newItemText: "" 
        }
    }

    updateNewTextValue = (event) => {
        this.setState({ newItemText: event.target.value});
    }

    createNewTodo = () => {
        //this.props.callback(this.state.newItemText);
        let newTotal = this.state.total ? this.state.total + 1 : 1;
        this.props.addToDo(this.state.newItemText);
        this.setState({
            total: newTotal,
            pageCount: Math.ceil(newTotal/(this.state.perPageCnt? this.state.perPageCnt:20))            
        })
        this.setState({ newItemText: ""});
    }

    render = () =>
        <div className="p-2 row">
            <input className="form-control mx-2 col-10" value={ this.state.newItemText } 
                onChange={ this.updateNewTextValue } />
            <button className="btn btn-primary col-1 mx-2"
                onClick={ this.createNewTodo }>Add</button>
        </div>            
}
const TodoCreator = connect(null, mapDispatchToProps)(TodoCreatorConnect);
export default TodoCreator;
