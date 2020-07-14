import React, { Component } from 'react';
import { connect } from "react-redux";
import { toggleToDo, deleteToDo, updateToDo } from "./Actions";
import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";


function mapDispatchToProps (dispatch) {
    return {
        toggleToDo: (toDoItem) => {dispatch(toggleToDo(toDoItem));},
        deleteToDo: (id) => {dispatch(deleteToDo(id));},
        updateToDo: (toDoItem) => {dispatch(updateToDo(toDoItem));},
    }
}


class TodoRowConnected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.item.start_date ? new Date(this.props.item.start_date) : "",
            action: this.props.item.action ? this.props.item.action : "",
        }
    }
     
    onChangeDate = date => {
        this.setState({ date: date })
    };

    onChangeAction = event => {
        this.setState({ action:event.target.value });
    }
    upd = () => {
        let firstDate = (new Date(this.props.item.start_date)).toString();
        let secondDate = (new Date(this.state.date)).toString();
        if (this.state.action !== this.props.item.action ||
                firstDate !== secondDate){
            this.props.updateToDo({id:this.props.item.id, action:this.state.action, start_date: this.state.date});
        } else {
            alert("Description or Start Date was not changed. Nothing to chhange !!");
        } 
    }

    render = () =>
        <tr>
            <td>{ this.props.item.id}</td>        
            <td><input type="text" className="form-control" value={ this.state.action} onChange={this.onChangeAction} />
            </td>
            <td> 
            <DatePicker
              selected={ this.state.date }
              onChange={ this.onChangeDate }
              name="start_date"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              timeCaption="time"
              dateFormat="yyyy-MM-dd HH:mm"
          />            
            </td>
            <td>{ this.props.item.end_date}</td>
            <td>
                <input type="checkbox" checked={ this.props.item.done } 
                    onChange={ () => this.props.toggleToDo(this.props.item) } 
                />
            </td>
            <td><button className="btn btn-primary"
            onClick=
            {() => {this.upd();}}>
            Update</button></td>
            <td>
                <button className="btn btn-primary"
                    onClick={ () => {
                        if(window.confirm("Are you sure that you want to delete this item ?")) {
                            this.props.deleteToDo(this.props.item.id)
                        }
                    }}>Delete</button>
            </td>
        </tr>
}
export const TodoRow = connect(null, mapDispatchToProps)(TodoRowConnected);
