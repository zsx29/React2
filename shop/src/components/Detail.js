// lib-Grp
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";

// css
import "./Detail.scss";


// bootstarp-Grp
import { Button } from "react-bootstrap";


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
    }, [ alert ]) // [ alert ] alert라는 이름의 state가 변경이 될 때만 업데이트로 치고 실행    

    let { id } = useParams();
    let history = useHistory();
    let findItem = props.shoes.find(function (item) {
        return item.id == id
      });
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2>Detail</h2>
                    <img src={"https://codingapple1.github.io/shop/shoes"+ (findItem.id + 1) +".jpg"} width="100%"></img>
                    <hr/>
                        {
                            props.amount <= 0
                            ? <Alert></Alert>
                            : <Info amount={props.amount}></Info>
                        }
                    <hr/>
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{ findItem.title }</h4>
                    <p>{ findItem.content }</p>
                    <p>{ findItem.price }</p>
                    <Button variant="outline-danger" onClick={ () => { history.goBack() }}>
                        뒤로가기
                    </Button>&nbsp;
                    <Button variant="outline-success" onClick={() => { props.setAmount(props.amount - 1) }} >
                        주문하기
                    </Button>
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

export default Detail;