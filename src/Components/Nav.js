import React from 'react';
import { Link } from 'react-router-dom';
import alice from '../images/alice.png';
import billy from '../images/billy.png';
import joe from '../images/joe.png';

const Nav = () => {
  return (
    <div className="topNav">
      <div className="links">
        <button>
          <Link className="link" to="/photo-tag">
            Home
          </Link>
        </button>
        <button>
          <Link className="link" to="/leaderboards">
            Leaderboard
          </Link>
        </button>
      </div>
      <h1>Find these people!</h1>
      <div className="images">
        <img src={alice} class="img" alt="Alice"></img>Alice
        <img src={billy} class="img" alt="Billy"></img>Billy
        <img src={joe} class="img" alt="Joe"></img>Joe
      </div>
    </div>
  );
};

export default Nav;
