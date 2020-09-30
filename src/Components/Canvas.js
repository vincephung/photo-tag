import React, { useState, useEffect } from 'react';
import backgroundImg from '../images/img.jpg';
import './canvas.css';
import WinnerModal from './WinnerModal';
import database from './database';
const db = database.firestore();

const Canvas = () => {
  const [selectionBox, setSelectionBox] = useState(false);
  const [xClick, setXClick] = useState(0);
  const [yClick, setYClick] = useState(0);
  const [xBox, setXBox] = useState(0);
  const [yBox, setYBox] = useState(0);
  const [alice, foundAlice] = useState(false);
  const [billy, foundBilly] = useState(false);
  const [joe, foundJoe] = useState(false);
  const [modal, showModal] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timer, setTimer] = useState(true);
  const [userName, setuserName] = useState('');

  let boxStyles = React.useRef();

  const handleClick = (e) => {
    var rect = e.target.getBoundingClientRect();
    var x = Math.round(e.clientX - rect.left); //x position within the element.
    var y = Math.round(e.clientY - rect.top); //y position within the element.

    //3000 is width of original image, 1899 is height
    let realXValue = Math.round((x * 3000) / e.target.clientWidth);
    let realYValue = Math.round((y * 1899) / e.target.clientHeight);

    setXClick(realXValue);
    setYClick(realYValue);

    setXBox(e.pageX - 50);
    setYBox(e.pageY - 50);

    displaySelectionBox(xClick, yClick);
  };

  const displaySelectionBox = () => {
    setSelectionBox(!selectionBox);
  };

  useEffect(() => {
    if (selectionBox) {
      boxStyles.current.style.color = 'red';
      boxStyles.current.style.left = `${xBox}px`;
      boxStyles.current.style.top = `${yBox}px`;
    }
  }, [selectionBox]);

  const checkWinner = () => {
    if (alice === true && billy === true && joe === true) {
      setTimer(false);
      return true;
    }
    return false;
  };

  const checkAnswer = (e) => {
    let personClicked = e.target.id;

    db.collection('people')
      .doc(personClicked)
      .get()
      .then((snapshot) => {
        let chosenPerson = snapshot.data();
        let answerXLocation = chosenPerson.x;
        let answerYLocation = chosenPerson.y;

        let acceptedXStart = answerXLocation - 70;
        let acceptedYStart = answerYLocation - 50;
        let acceptedXEnd = answerXLocation + 70;
        let acceptedYEnd = answerYLocation + 50;

        let checkX = xClick >= acceptedXStart && xClick <= acceptedXEnd;
        let checkY = yClick >= acceptedYStart && yClick <= acceptedYEnd;

        //if user click is within range of actual target
        if (checkX && checkY) {
          if (personClicked === 'Alice') {
            foundAlice(true);
          } else if (personClicked === 'Billy') {
            foundBilly(true);
          } else {
            foundJoe(true);
          }
          setSelectionBox(false);
        }
      });
  };

  useEffect(() => {
    if (checkWinner()) {
      showModal(true);
    }
  }, [alice, billy, joe]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
      if (seconds === 60) {
        setMinutes((minutes) => minutes + 1);
        setSeconds(0);
      }
    }, 1000);
    if (timer === false) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds, timer]);

  const getUserName = (e) => {
    setuserName(e.target.value);
  };

  const saveWinner = (e) => {
    e.preventDefault();

    db.collection('winners').add({
      name: userName,
      time: getTime(),
    });
    showModal(false);
    alert('Successfully added you to the leaderboard!');
  };

  const getTime = () => {
    let totalSeconds =
      String(seconds).length === 2 ? String(seconds) : `0${seconds}`;
    let totalMinutes =
      String(minutes).length === 2 ? String(minutes) : `0${minutes}`;
    let totalTime = `${totalMinutes}:${totalSeconds}`;
    return totalTime;
  };

  return (
    <React.Fragment>
      <div className="timer">{getTime()}</div>
      <div className="imgContainer">
        <img
          src={backgroundImg}
          alt="waldoBackground"
          onClick={handleClick}
        ></img>
        {selectionBox ? (
          <div ref={boxStyles} className="selectionBox">
            <div className="selectArea"></div>
            {!alice ? (
              <button className="answerBtn" id="Alice" onClick={checkAnswer}>
                Alice
              </button>
            ) : null}
            {!billy ? (
              <button className="answerBtn" id="Billy" onClick={checkAnswer}>
                Billy
              </button>
            ) : null}
            {!joe ? (
              <button className="answerBtn" id="Joe" onClick={checkAnswer}>
                Joe
              </button>
            ) : null}
          </div>
        ) : null}
        {modal ? (
          <WinnerModal
            saveWinner={saveWinner}
            userName={userName}
            getUserName={getUserName}
            getTime={getTime}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default Canvas;
