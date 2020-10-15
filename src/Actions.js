import {ADD_TODO, TOGGLE_TODO, SHOW_COMPLETED, DELETE_TODO, UPDATE_TODO} from "./Constants";
var total = 0;
var pageCount = 0;
const func = (num) => `${Math.trunc(num / 10)}${Math.trunc(num % 10)}`;
export function addToDo(payload){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("mode", "no-cors");
    let today = new Date();
    let date = today.getFullYear()+'-'+func((today.getMonth()+1))+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    let raw = JSON.stringify({'action':payload, 'start_date': dateTime, 'done':'0'});
    
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    return function(dispatch) {
        return fetch("http://resb.local/todoitem", requestOptions)
        .then(response => {
            return response.json();
        })
        .then(data => {
            dispatch({type:ADD_TODO, data});
            })
        .catch(error => {
            console.log('error', error);
            alert('ERROR: The data was not added: ' + error);
        });
        // return {type:ADD_TODO, payload};
    }
}
export function toggleToDo(payload){
    console.log(payload);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime;
    if (payload.done) {
        dateTime="";
    } else {
        dateTime = date + ' ' + time;
    }
    let raw = JSON.stringify({"end_date":dateTime,"done":payload.done ? "0" : "1"});

    
    let requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    return function(dispatch) {
    return fetch("http://resb.local/todoitem/" + payload.id, requestOptions)
      .then(response => response.text())
      .then(result => {
          dispatch({type:TOGGLE_TODO, payload: {id: payload.id, end_date:dateTime, done: payload.done}});
      })
      .catch(error => {
          console.log('error', error);
          alert("The data was not changed due: ERROR :" + error);
    });
    }
}

export function changeShowCompleted(payload){
    return {type:SHOW_COMPLETED, payload};
}

export function getData(opt) {
    return function(dispatch) {
      let fetchUrl = "http://resb.local/todoitem";
      if ((opt !== undefined  && opt.perPageCnt !== undefined) && opt.perPageCnt !== 20) {
        fetchUrl = fetchUrl + "?per-page=" + opt.perPageCnt;
      }
      if (opt !== undefined && opt.sortType !== undefined) {
          if (fetchUrl.includes("?")) {
                fetchUrl = fetchUrl + "&sort=" + opt.sortType;
          } else {
            fetchUrl = fetchUrl + "?sort=" + opt.sortType;
          } 
      }
      if (opt !== undefined && opt.page !== undefined) {
        if (fetchUrl.includes("?")) {
              fetchUrl = fetchUrl + "&page=" + opt.page;
        } else {
          fetchUrl = fetchUrl + "?page=" + opt.page;
        } 
    }
    if (opt !== undefined && opt.done !== undefined) {
        if (fetchUrl.includes("?")) {
              fetchUrl = fetchUrl + "&filter[done]=" + (opt.done ? "true" : "false");
        } else {
          fetchUrl = fetchUrl + "?filter[done]=" + (opt.done ? "true" : "false");
        } 
    }
    console.log(opt);
    console.log(fetchUrl);
      return fetch(fetchUrl)
        .then(
            response => 
            {
                const headers = response.headers.entries();
                let header = headers.next();
                total = 0;
                pageCount = 0;
                while (!header.done){
                if (header.value[0] === "x-pagination-total-count") {
                    total = Number(header.value[1]);
                }
                if (header.value[0] === "x-pagination-page-count") {
                    pageCount = Number(header.value[1]);
                }                
                header = headers.next();
                }        
                return response.json();
            }
        )
        .then(json => {
            dispatch({ 
              type: "DATA_LOADED",
              payload: json,
              total: total,
              perPageCnt: opt && opt.perPageCnt ? opt.perPageCnt : 20,
              sortType: opt && opt.sortType ? opt.sortType : '-start_date',
              currentPage: opt && opt.currentPage ? opt.currentPage : 1,
              pageCount: pageCount
          });
        }).catch(error => {
            console.log('error', error);
            alert("The data was not loaded due: ERROR :" + error);
      });
    };
  }

  export function deleteToDo(payload){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
   
    let requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    return function(dispatch) {
    return fetch("http://resb.local/todoitem/" + payload, requestOptions)
      .then(response => response.text())
      .then(result => {
          dispatch({type:DELETE_TODO, payload: payload});
      })
      .catch(error => {
          console.log('error', error);
          alert("The data was not deleted due: ERROR :" + error);
    });
    }
}

export function updateToDo(payload){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let today = new Date(payload.start_date);
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;

    let raw = JSON.stringify({"action":payload.action ? payload.action : "Empty action", "start_date":dateTime});

    
    let requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    return function(dispatch) {
    return fetch("http://resb.local/todoitem/" + payload.id, requestOptions)
      .then(response => response.text())
      .then(result => {
          dispatch({type:UPDATE_TODO, payload: {id: payload.id,
            action: payload.action ? payload.action : "Empty action",start_date: dateTime}});
      })
      .catch(error => {
          console.log('error', error);
          alert("The data was not changed due: ERROR :" + error);
    });
    }
}