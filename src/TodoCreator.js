import React, { Component } from 'react';
import { connect } from "react-redux";
import { addToDo } from "./Actions";

function mapDispatchToProps (dispatch) {
    return {
        addToDo: (toDoItem) => {dispatch(addToDo(toDoItem));},
    }
}
function mapStateToProps(state) {
    console.log(state);
    return {todoItems: state.todoItems};
}
class TodoCreatorConnect extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = Object.assign({}, {todoItems: props.todoItems}, {             
            newItemText: "" 
        });
    }

    updateNewTextValue = (event) => {
        this.setState({ newItemText: event.target.value});
    }

    createNewTodo = () => {
        //this.props.callback(this.state.newItemText);
        // check if exists this.state.newItemText in this.props.todoitems
        if (this.props.todoItems.find(item => item.action === this.state.newItemText) === undefined){
            let newTotal = this.state.total ? this.state.total + 1 : 1;
            this.props.addToDo(this.state.newItemText);
            this.setState({
                total: newTotal,
                pageCount: Math.ceil(newTotal/(this.state.perPageCnt? this.state.perPageCnt:20))            
            })
            this.setState({ newItemText: ""});
        } else {
            alert (`This ( ${this.state.newItemText} )action already exsist !!`);
        }
    }

    render = () =>
        <div className="p-2 row">
            <input className="form-control mx-2 col-10" value={ this.state.newItemText } 
                onChange={ this.updateNewTextValue } />
            <button className="btn btn-primary col-1 mx-2"
                onClick={ this.createNewTodo }>Add</button>
        </div>            
}
const TodoCreator = connect(mapStateToProps, mapDispatchToProps)(TodoCreatorConnect);
export default TodoCreator;
