/*eslint-disable*/

// lib
import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";

// Components-Grp
import Data from "./components/Data";
import Card from "./components/Card";
import Detail from "./components/Detail";
import Login from "./components/Login";

// Bootstrap-import
import {
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Jumbotron,
  Badge,
  ProgressBar,
} from "react-bootstrap";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


/* 

  * export / import
    - 내보내기 : export default 변수명
    - 내보내기 : export{ 변수1, 변수2, ...}
    - 가져오기 : import 변수명(자유롭게 작명) from 경로
    - 한번만 사용할 수 있다.

  * map
    1. 자료.map((a, i) => {]})
      - 자료.length만큼 반복문을 돌려라!
      - map함수를 쓸 때 a, i 파라미터를 사용할 수 있다
      - a : 데이터 안에있는 하나하나의 데이터
      - i : 반복문을 돌릴 때 마다 0, 1, 2, 3 ...이 되는 정수이다.
    2. return (반복시킬 HTML);
    3. 반복하며 변해야하는 숫자체크
  
  * props 전송법
    1. <자식컴포넌트 보낼이름 = { 전송할state }/>
    2. function 자식컴포넌트(props){}
    3. props.보낼이름 사용

  * Router 의 훅 {

    1. Router (페이지 나누기)
      - react-router-dom 라이브러리 사용
      - 터미널 -> npm install react-router-dom
      - index.js -> import { BrowserRouter } from 'react-router-dom';
      - HashRouter    : 라우팅 안전하게 할 수 있게 도와줌, 사이트 주소 뒤에 #이 붙는데 #뒤에 적는 것은 서버로 전달 X
                        리액트가 알아서 해줄 수 있음
      - BrowserRouter : 라우팅을 리액트가 아니라 서버에게 요청할 수도 있어서 위험하다.  서버 : "어 그런페이지 없는데요?" 할 수 있음
                        서버에서 서버 라우팅 방지하는 API를 작성해둬야함
      - exact 라는 속성을 추가하면 경로가 정확히 일치할 때만 보여줌
      - React Router 특징 : 페이지마다 다른 HTML 파일이 아님(index.html 하나만 있음), 페이지 이동하기 흉내만 냄
      - <Route path="/:id"></Route>    /:id 모든문자라는 경로를 의미한다.
      - 콜론 뒤에 마음대로 작명가능, 여러개 사용가능
    
    2. Link (페이지 이동)
      - <Link to="경로"></Link>

    3. Switch (페이지 나누기)  
      - Router을 감싸주며 말그대로 스위치 역할을 한다. 하나가 켜지면 하나는 꺼지고

    4. useHistory (페이지 뒤로가기)
      - import { usehistory } from 'react-router-dom';
      - usehistory   : 방문기록 등을 저장해놓은 object
      - .goBack()    : 이전페이지 이동
      - .push('경로') : 해당 경로 페이지로 이동

    5. useParams (url 파라미터로 상세페이지 100개 만들기)
      - let { id } = useParams();  id : /:id 자리에 사용자가 입력한 값  
      - 파라미터는 2개 3개 몇개든 추가할 수 있습니다. /detail/:id/:name 이런 식도 가능합니다.
    }

  * styled-components
    - import styled from 'styled-components';
    - 사용법 : let 작명 = styled.div``;
    - 미리 스타일을 만들어 놓은 컴포넌트를 사용한다.
    ? 선택사항이니 참고만 하자.
    ! 가장 큰 장점은 컴포넌트가 많아지면 class 겹칠 일이 줄어든다.

  * Lifecycle & Hook
    ! HOOK
    - component 등장 전에 해줘
    - component 사라지기 전에 해줘
    - component 업데이트 되고나서 전에 해줘
  
  * Ajax 통신
    - 서버에 요청을 하는데 새로고침 없이 할 수 있게 도와주는 일종의 자바스크립트 코드이다.
    - 서버 = 누군가 요청을 하면 데이터를 가져다 주는 프로그램
    ! GET  = 데이터, 웹페이지 같은걸 읽고싶을 때 하는 요청
    ! POST = 데이터를 서버로 보내고 싶을 때 하는 요청
    - 그럼 Ajax는 뭐냐면 GET,POST 이런걸 새로고침 없이 할 수 있게 도와주는 코드입니다.
      원래 GET, POST 요청을 하시면 새로고침이 됩니다. 근데 새로고침 없이 할 수 있게 도와주는게 바로 Ajax입니다.
        
    1. Terminal -> npm install axios
    2. axios.get("GET요청할 URL").then((result) => { result.data }).catch(() => { 실패했을시 실행할 코드 })
    2. axios.post("GET요청할 URL").then((result) => { result.data }).catch(() => { 실패했을시 실행할 코드 })
    3. ajax 통신에 성공하면 shoes라는 state에 추가하기
    4. ajax 통신에 실패하면 .catch() 에러메세지 작성
   
  * Ajax 통신 (접속하자마자 실행)
    - useEffect(() => { axios.get().then().catch() }, []);
    - 위처럼 useEffect()안에 추가해주면 등장시에만 한번 실행되고 끝난다.

  Todo> Component가 많을 때 props쓰기 싫으면 Context API 사용
    - props 전송 없이도 하위 컴포넌트들 끼리 state 값을 똑같이 공유할 수 있다.
    1. Context 세팅 = createContext() 함수를 이용해서 변수생성  
      - let 이름Context = React.createContext();
    2. 컴포넌트로 state 값 공유를 원하는 컴포넌트들을 <범위></범위>로 전부 감쌉니다.
      - value={ 공유할state }
*/

let amountContext = React.createContext();

function App() {

  // shoes Data
  let [shoes, setShoes] = useState(Data);

  // shoes Amount
  const [amount, setAmount] = useState(5);

  // ajax GET Success...
  let [more, setMore] = useState(true);
  function More() {
    return(
      <Button variant="primary" onClick={() => {
        setMore(!more)
        setRoding(true)
        axios
        .get("https://codingapple1.github.io/shop/data2.json")
        .then((result) => { setShoes([...shoes,...result.datas]), setRoding(false) }) // 요청성공시 실행할 코드, result : 실제 데이터, 성공한 이유, 다양한 정보
        .catch(() => { SetError(true), setRoding(true) })                            // 요청실패시 실행할 코드 
        }}>
        More <Badge variant="light">9+</Badge>
        <span className="sr-only">unread messages</span>
      </Button>
    );
  }

  // ajax GET Error...
  let [error, SetError] = useState(false);
  function Error(params) {
    return(
      <div className="my-alert-error">
        <p>😢데이터 요청실패😢</p>
      </div>
    )
  }

  // ajax GET Roding...
  const [roding, setRoding] = useState(false);
  function Roding(params) {
    return(
      <div className="my-roding">
        <ProgressBar variant="danger" animated now={100} label="Loding..."/>
      </div>
    );
  }


  return (
    <div className="App">
      <div className="App-header">
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="nav">
          <Navbar.Brand href="/">PogbaShoes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/Login">Login</Link>
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="App-container">
        <Switch>

          <Route exact path="/">
            <Jumbotron>
              <h1>Hello, world!</h1>
              <p>
                This is a simple hero unit, a simple jumbotron-style component for calling
                extra attention to featured content or information.
              </p>
              <p>
                <Button variant="primary">Learn more</Button>
              </p>
            </Jumbotron>
            <div className="container">
              <div className="row">
                {
                  shoes.map((a, i) => {
                    return <Card shoes={a} i={i} key={i}></Card>
                  })
                }
              </div>
              <div>
                <br/><br/>
                {
                  more === true
                  ? <More></More>
                  : null
                }
                {
                  error === true
                  ? <Error></Error>
                  : null
                }
                {
                  roding === true
                  ? <Roding></Roding>
                  : null                                    //! 더보기창 삭제다시
                }
                <br/><br/>
              </div>
            </div>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <Route path="/detail/:id">
            <Detail shoes={ shoes } amount={amount} setAmount={setAmount}></Detail>
          </Route>

          <Route path="/:id"></Route>

        </Switch>
      </div>
    </div>
  );
} // App-end...




export default App;
