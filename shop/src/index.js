import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import { combineReducers, compose, createStore } from 'redux';

// reducer 초기값
let defaultState = [{ id : 0, name : "Red Knit", quan : 2 }];
let defaultAlert = true;

// reducer 생성
function reducer(state = defaultState, action) {
  // 데이터가 수정되는 방법을 정의.
  
  
  if(action.type === "항목추가"){

    let copy = [...state];
    copy.push();
    return copy;

  }else if (action.type === "수량증가") {
    
    let copy = [...state];
    copy[0].quan++;
    return copy

  }else if(action.type === "수량감소"){

    let copy = [...state];
    if (copy[0].quan < 1) {
      alert("수량 1개이상");
    }else{
      copy[0].quan--;
    }
    return copy

  }else{
    return state
  }
}

function reducer2(state = defaultAlert, action) {
  if (action.type === "alertClose") {
    return false;
  }else{
    return state
  }
}

// redux store 생성
let store = createStore(combineReducers({reducer, reducer2}));


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
