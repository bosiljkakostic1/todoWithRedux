import React, {Component} from "react";
import { connect } from "react-redux";
import { getData } from "./Actions";
import { PaginationButtons } from "./PaginationButtons";
//import Select from 'react-select';

function mapDispatchToProps (dispatch) {
    return {
        getData: (opt) => {dispatch(getData(opt));},
    }
}
function mapStateToProps (state) {
    return {
      currentPage: state.currentPage,
      pageCount: state.pageCount,
      total: state.total,
      sortType: state.sortType,
      perPageCnt: state.perPageCnt
    }  
}

const perPageValues = [
    { value: 3, label: '3' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
  ];

const sortValues = [
    { value: '-start_date', label: 'start date desc' },
    { value: 'action', label: 'Description' },
    { value: '-id', label: 'Id desc' },
    { value: '-end_date', label: 'end date desc' },
  ];

class NavigationConnected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            perPageCnt: props.perPageCnt ? props.perPageCnt : 20,
            sortType: props.sortType ? props.sortType : '-start_date'
        }
    }
    updatePerPage = (event) => {
        this.setState({ perPageCnt: event.target.value});
        this.setState({ currentPage: 1});
        this.props.getData({perPageCnt: event.target.value,
            sortType: this.state.sortType
        });
    }
    updateSort = (event) => {
        this.setState({ sortType: event.target.value});
        this.props.getData({
            perPageCnt: this.state.perPageCnt,
            sortType: event.target.value});
    }
    render = () =>
        <div className="mt-0 mb-1 mx-1 row">
            <div className="mr-2 mt-2">
                Show:&nbsp;
                <select id="perPageCnt" name="perPageCnt" onChange={this.updatePerPage} value={this.props.perPageCnt}>
                    {perPageValues.map(opt => <option value={opt.value} key={opt.value}>{opt.label}</option>)}
                </select>
            </div>
            <div className="ml-2 mt-2">
                Sort:&nbsp;
                <select id="sort" name="sort" onChange={this.updateSort} value={this.props.sortType}>
                    {sortValues.map(opt => <option value={opt.value} key={opt.value}>{opt.label}</option>)}
                </select>
            </div>
            <div className="text-center">
                <PaginationButtons/>
            </div>         
        </div>  
}
const Navigation = connect(mapStateToProps, mapDispatchToProps)(NavigationConnected);
export default Navigation;