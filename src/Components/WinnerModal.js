import React from 'react';

const WinnerModal = (props) => {
  return (
    <div id="winnerModal" className="modal">
      <div className="modal-content">
        <h3>Congratulations! You found everyone.</h3>
        <label>
          <input
            type="text"
            name="name"
            value={props.userName}
            placeholder="Enter your name"
            onChange={props.getUserName}
          ></input>
        </label>
        <p>Your time was {props.getTime()} minutes.</p>
        <button onClick={props.saveWinner}>
          Place yourself on the scoreboard
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;
