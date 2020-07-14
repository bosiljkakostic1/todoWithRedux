import React, { Component } from "react";
import  {getData} from "./Actions";
import { connect } from "react-redux";

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

export class PaginationButtonsConnected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            perPageCnt: props.perPageCnt ? props.perPageCnt : 20,
            sortType: props.sortType ? props.sortType :'-start_date',
            currentPage: props.currentPage ? props.currentPage : 1
        }
    }
    changeCurrentPageTo (page) {
        console.log('previous page: ', this.state.currentPage);
        console.log('page changed to: ', page);
        this.setState( {currentPage: page})
        this.props.getData({
            perPageCnt: this.props.perPageCnt,
            sortType: this.props.sortType,
            page: page
        });
    }
    getPageNumbers =  () => {
        let pn = [];
        if (this.props.pageCount !== undefined){
        if (this.props.pageCount < 4) {
            pn = [...Array(this.props.pageCount + 1).keys()].slice(1);
        } else if (this.state.currentPage <= 4) {
            pn = [1, 2, 3, 4, 5];
        } else if (this.state.currentPage > this.props.pageCount - 4) {
            pn = [...Array(5).keys()].reverse()
                .map(v => this.props.pageCount - v);
        } else {
            pn =  [this.state.currentPage - 1, this.state.currentPage,
            this.state.currentPage + 1];
        }
        }
        return pn;
    }

    render() {
        const current = this.state.currentPage ? this.state.currentPage : 1;       
        const pageCount = this.props.pageCount;
        return <React.Fragment>
            <button onClick={() => this.changeCurrentPageTo(current - 1)}
                disabled={current === 1} className="btn btn-secondary btm-sm mx-1">
                Previous
            </button>
                {(this.getPageNumbers()[0] !== 1) &&
                    <React.Fragment>
                        <button className="btn btn-secondary btm-sm mx-1"
                            onClick={() => this.changeCurrentPageTo(1)}>1</button>
                        <span className="h4">...</span>
                    </React.Fragment>
                }
            {this.getPageNumbers().map(num => {
               return (<button className={`btn mx-1 btm-sm ${num === current
                    ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => this.changeCurrentPageTo(num)} key={num}>
                    {num}
                </button>);})}
               {
//                   current <= (pageCount - 4) &&
                (this.getPageNumbers()[this.getPageNumbers().length-1] !== pageCount) &&
                <React.Fragment>
                    <span className="h4">...</span>
                    <button className="btn btn-secondary btm-sm mx-1"
                        onClick={() => this.changeCurrentPageTo(pageCount)}>
                        {pageCount}
                    </button>
                </React.Fragment>
            }
            <button onClick={() => this.changeCurrentPageTo(current + 1)}
                disabled={current === pageCount}
                className="btn btn-secondary btm-sm mx-1">
                Next
</button>
        </React.Fragment>
} 
}
export const PaginationButtons = connect(mapStateToProps, mapDispatchToProps)(PaginationButtonsConnected);
