/* eslint-disable */
import "./App.css";
import React, { Component, useState } from "react";

function App() {
  // 글제목
  let [title, titleCh] = useState(["가나다라", "마바사아", "자차카타"]);
  // 추천
  let [tumb, tumbCh] = useState(0);
  // 모달 on/off
  let [modal, modalCh] = useState(false);
  // input 저장소
  let [input, inputCh] = useState([]);
  // 제목클릭 => 모달제목 변경
  let [clickTitle, clickTitleCh] = useState(0);
  // 글작성
  function send(params) {
    var inputArray = [...title];
    inputArray.unshift(input);
    if (confirm("작성하시겠습니까?")) {
      titleCh(inputArray);
    }
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>
      <Profile></Profile>
      {
        title.map((titles, i) => {
          return(
            <div className="list" key={i}>
              <h3 onClick={() => {clickTitleCh(i); modalCh(!modal)}}>{titles}{" "}
                <span onClick={() => {tumbCh(tumb + 1);}}>👍</span>{tumb}
              </h3>
              <p>7월 7일 발행</p>
              <hr />
            </div>
          );
        })
      }
      {
        modal === true 
        ? <Modal title={title} clickTitle={clickTitle}></Modal>
        : null
      }
      <hr/>
      <div>
        <h2>글작성</h2>
        <input onChange={(e) => { inputCh(e.target.value) }}/><br/>
        <br/>
        <button onClick={() => { send() }}>작성</button>
      </div>
    </div>
  );
}

function Modal(props) {
  return(
    <div className="modal">
      <h3>{props.title[props.clickTitle]}</h3>
      <p>상세내용</p>
      <p>날짜</p>
    </div>
  );
}

class Profile extends Component{
  constructor(){
    super();
    this.state = {name : "개똥산", age : 3};
  }

  changeName = () => {
    this.setState({name : "3살입니다"})
  }

  render(){
    return(
      <div>
        <h3>프로필</h3>
        <p onClick={ this.changeName }>{this.state.name}</p>
      </div>
    );
  }
}

export default App;
