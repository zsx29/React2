// lib-Grp
import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { CSSTransition } from 'react-transition-group';

// redux
import { connect } from 'react-redux';

// css
import "./Detail.scss";

// bootstarp-Grp
import { Table } from "react-bootstrap";

function Cart(props) {
  
  
  return(
    <div className="container">
      <h1>Cart</h1>
      <hr/>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Table striped bordered hover>
              <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경</th>
              </tr>
              {
                props.state.map((a, i) => {
                  return(
                    <tr key={ i }>
                      <td>{a.id}</td>
                      <td>{a.name}</td>
                      <td>{a.quan}</td>
                      <td>
                        <button onClick={() => {props.dispatch({type : "수량증가"})}}> + </button>
                        <button onClick={() => {props.dispatch({type : "수량감소"})}}> - </button>
                      </td>
                    </tr>
                  );
                })
              }
          </Table>
          {
            props.alertOpen == true
            ? (<div className="my-alert-error">
                <p>지금 구매하시면 20% 할인</p>
                <button onClick={() => {props.dispatch({type : "alertClose"})}}>닫기</button>
              </div>)
            : null
          }
          </div>
        </div>
      </div>
  );
}

function state를props화(state) {
  console.log(state)
  return { 
    state : state.reducer,
    alertOpen : state.reducer2
  }
}

export default connect(state를props화)(Cart);