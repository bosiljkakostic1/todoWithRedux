import React, { Component } from 'react';
import { connect } from "react-redux";
import { changeShowCompleted } from "./Actions";

function mapSateToProps (state) {
    return {isChecked: state.showCompleted,
            description: "Completed Tasks",
    };
}
function mapDispatchToProps (dispatch) {
    return {
        changeShowCompleted: (checked) => {dispatch(changeShowCompleted(checked));},
    }
}
class VisibilityControlConnected extends Component {

    render = () => 
        <div className="form-check">
            <input className="form-check-input" type="checkbox"  
                checked={ this.props.isChecked }
                onChange={ (e) => this.props.changeShowCompleted(e.target.checked) } />
            <label className="form-check-label">
                Show { this.props.description }
            </label>
        </div>                
}

export const VisibilityControl = connect(mapSateToProps, mapDispatchToProps)(VisibilityControlConnected);
