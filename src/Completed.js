import React, { Component } from 'react';
import { TodoBanner } from "./TodoBanner";
import TodoCreator from "./TodoCreator";
import { TodoRow } from "./TodoRow";
//import { VisibilityControl } from "./VisibilityControl";
import { connect } from "react-redux";
import { toggleToDo, getData, deleteToDo } from "./Actions";
import Navigation from "./Navigation";

function mapSateToProps (state) {
    return {todoItems: state.todoItems,
            userName: state.userName,
            showCompleted: state.showCompleted,
            perPageCnt: state.perPageCnt,
            sortType: state.sortType,
            total: state.total,
            currentPage: state.currentPage,
            pageCount: state.pageCount
    };
}
function mapDispatchToProps (dispatch) {
    return {
        toggleToDo: (toDoItem) => {dispatch(toggleToDo(toDoItem));},
        getData: (opt) => {dispatch(getData(opt));},
        deleteToDo: (id) => {dispatch(deleteToDo(id));}
    }
}
// function addRecord() {
//     var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({"action":"proba unosa xx"});

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };
// console.log('requestOptions', requestOptions);
// fetch("http://resb.local/todoitem", requestOptions)
//   .then(response => { console.log(response); return response.text();})
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// }

class CompletedConnected extends Component {

    // constructor(props) {
    //     super(props);
    //     console.log(props);
    //     console.log(this.sate);
    //     // this.state = {
    //     //     todoItems: this.props.todoItems,
    //     //     userName: this.props.userName,
    //     //     showCompleted: this.props.showCompleted
    //     // }
    // }

    // updateNewTextValue = (event) => {
    //     this.setState({ newItemText: event.target.value });
    // }

    // createNewTodo = (task) => {
    //     if (!this.props.todoItems.find(item => item.action === task)) {
    //         this.setState({ 
    //             todoItems: [...this.props.todoItems, { action: task, done: false }]
    //         }, () => localStorage.setItem("todos", JSON.stringify(this.state)));        
    //     }
    // }

    toggleTodo = (todo) => this.props.toggleToDo(todo);
    
    todoTableRows = () => this.props.todoItems.map(item => 
            <TodoRow key={ item.id } item={ item } />)
         
// callback={ this.toggleTodo }
    componentDidMount = () => {
//        let data = this.props.getData(this.props.perPageCnt);
        let data;
        if (this.props.completed === "true") {
            data = this.props.getData({done: true});
        } else {
            data = this.props.getData({done: false});
        }
        this.setState(data != null 
            ? JSON.parse(data) 
            :  { 
                todoItems: [],
                userName: "Bosa",
                showCompleted: true,
                perPageCnt: 20,
                sortType: '-start_date',
                total: 0,
                currentPage: 1

            });
    }

    render = () => 
        <div>
        {/* <button onClick={addRecord}>Add record</button> */}
            {/* <TodoBanner name={ this.state.userName } 
                tasks={this.state.todoItems } /> */}
            <TodoBanner />
            <div className="container-fluid">
{/*                 <TodoCreator callback={ this.createNewTodo } /> */}
                    <TodoCreator />
                    {/* <Navigation /> */}
                    <Navigation 
                        perPageCnt= {this.props.perPageCnt}
                        sortType  = {this.propssortType}
                        total = {this.props.total}
                        currentPage = {this.props.currentPage}
                        pageCount = {this.props.pageCount}
                    />                 
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr><th>Id</th><th>Description</th><th>Start Date</th><th>End Date</th>
                        <th>Done</th><th>Update</th><th>Delete</th></tr>
                    </thead>
                    <tbody>{ this.todoTableRows() }</tbody>
                </table>
            </div>
        </div>
}
const Completed = connect(mapSateToProps, mapDispatchToProps)(CompletedConnected);
export default Completed;