// lib-Grp
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { CSSTransition } from 'react-transition-group';

// css
import "./Detail.scss";

// bootstarp-Grp
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


function Detail(props) {

    // 재고확인 알림창 띄우기
    let  [ alert, alertSet ]  = useState(false);
    useEffect(() => {
        
        var timer = setTimeout(() => {
            { alertSet(true) }
        }, 1200);

        return () => {
            clearTimeout(timer) //! 타이머 종료 (버그 방지)
        }
    }, [ alert ])  // [ alert ] alert라는 이름의 state가 변경이 될 때만 업데이트로 치고 실행    
    
    // 뒤로가기...
    let history = useHistory();

    // linkTab
    const [linkTab, setLinkTab] = useState(0);

    // find id
    let { id } = useParams();
    let findItem = props.shoes.find(function (item) {
        return item.id == id
      });

    // transition-on/off
    let [onoff, setOnoff] = useState(false);

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">  
                    <h2>Detail</h2>
                    <hr/>
                        {
                            props.amount <= 0
                            ? <Alert></Alert>
                            : <Info amount={props.amount}></Info>
                        }
                    <hr/>
                </div>    
            </div>
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+ (findItem.id + 1) +".jpg"} width="100%"></img>
                </div>
                <div className="col-md-6 align-self-center">
                    <h4 className="pt-5">{ findItem.title }</h4>
                    <p>{ findItem.content }</p>
                    <p>{ findItem.price }</p>
                    <Button variant="outline-danger" onClick={ () => { history.goBack() }}>
                        뒤로가기
                    </Button>&nbsp;
                    <Button variant="outline-primary" onClick={() => { props.setAmount(props.amount - 1), props.dispatch({type : "항목추가"}) }} >
                        주문하기
                    </Button>&nbsp;
                    <Link to="/cart/:id">
                        <Button variant="outline-success" onClick={() => { props.setAmount(props.amount - 1) }} >
                            장바구니
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Nav variant="tabs" defaultActiveKey="link-0">
                        <Nav.Item>
                            <Nav.Link eventKey="link-0" onClick={() => { setOnoff(false); setLinkTab(0) }}>Option0</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1" onClick={() => { setOnoff(false); setLinkTab(1) }}>Option1</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <CSSTransition in={onoff} classNames="transition" timeout={400}>
                        <LinkTab linkTab={linkTab} setOnoff={setOnoff}></LinkTab>
                    </CSSTransition>
                </div>
            </div>
        </div>
    );
}

function Alert(params) {
    return(
        <div className="my-alert-amount">
            <p>😒재고없음😒</p>
        </div>
    );
}

function Info(props) {
    return(
        <div className="my-alert-amount">
            <p>재고 : {props.amount} 개</p>
        </div>
    );
}

function LinkTab(props) {

    useEffect(() => {
        props.setOnoff(true);
    })

    if(props.linkTab == 0){
        return <div>움직여1</div>
    }else if(props.linkTab == 1){
        return <div>움직여2</div>
    }else if(props.linkTab == 2){
        return <div>움직여3</div>
    }
        
}

function state를props화(state) {
    return {
        state : state.reducer,
        
    }
}

export default connect(state를props화)(Detail);