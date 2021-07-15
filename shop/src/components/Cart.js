// lib-Grp
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { CSSTransition } from 'react-transition-group';
import {connect} from 'react-redux';

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
                <th>상품정보</th>
                <th>옵션</th>
                <th>상품금액</th>
                <th>배송비</th>
              </tr>
              <tr>
                <td>1</td>
                <td>{props.state[0].name}</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
          </Table>
        </div>
      </div>
    </div>
  );
}

function state를props(state) {
  return { state : state }
}

export default connect(state를props)(Cart);