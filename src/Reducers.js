import {ADD_TODO, TOGGLE_TODO, SHOW_COMPLETED, DELETE_TODO, UPDATE_TODO} from "./Constants";
const initialState = {
    todoItems: [],
    userName: "Bosa",
    showCompleted: true,
    total: 0,
    perPageCnt: 20
}
var newTotal;
function todoReducer (state = initialState, action) {
    let foo;
    if (state.todoItems === undefined) {
        foo = [];
    } else {
        foo = state.todoItems;
    }
    newTotal = state.total ? state.total + 1 : 1;
    if (action.type === ADD_TODO){
        foo = foo.slice(0,state.perPageCnt-1);
        let newState = Object.assign({}, state, {todoItems: ([{id: action.data.id,
            action:action.data.action, start_date:action.data.start_date, done:false}]).concat(foo),
            total: newTotal,
            pageCount: Math.ceil(newTotal/(state.perPageCnt?state.perPageCnt:20))
        });
        return newState;
    }
    if (action.type === TOGGLE_TODO){
        let newToggleState = Object.assign({}, state,
            {todoItems: state.todoItems.map(item => item.id === action.payload.id 
            ? { ...item, end_date:action.payload.end_date, done: !item.done } : item)});
        return newToggleState;
    }
    if (action.type === DELETE_TODO){
        newTotal = state.total ? state.total - 1 : 1;
        let newState = state.todoItems.filter(item => item.id !== action.payload);
        return { 
            todoItems: newState,
            userName: state.userName,
            showCompleted: state.showCompleted,
            total: newTotal,
            pageCount: Math.ceil(newTotal/(state.perPageCnt?state.perPageCnt:20))  
        };
    }
    if (action.type === SHOW_COMPLETED){
        let newComplState = Object.assign({}, state,
            {showCompleted: action.payload});
        return newComplState;
    }
    if (action.type === "DATA_LOADED"){ 
        let newStartState = Object.assign({}, state, 
            {todoItems: action.payload,
             total: action.total,
             perPageCnt: action.perPageCnt ? action.perPageCnt : (state.perPageCnt ? state.perPageCnt : 20),
             sortType: action.sortType ? action.sortType : (state.sortType ? state.sortType : '-start_date'),
             currentPage: action.currentPage ? action.currentPage : (state.currentPage  ? state.currentPage : 1),
             pageCount: action.pageCount ? action.pageCount : (state.pageCount ? state.pageCount : 0)
            });
        return newStartState;
    }
    if (action.type === UPDATE_TODO){
        let newToggleState = Object.assign({}, state,
            {todoItems: state.todoItems.map(item => item.id === action.payload.id 
            ? { ...item, action: action.payload.action, start_date:action.payload.start_date} : item)});
            alert("Sucessfuly updated !!");
        return newToggleState;
    }
    return state;
}
export default todoReducer;