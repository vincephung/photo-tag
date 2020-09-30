import React, { useState, useEffect } from 'react';
import database from './database';
import '../index.css';

const Leaderboard = () => {
  const [scores, setScore] = useState([]);
  let arr = [];
  const db = database.firestore();

  useEffect(() => {
    db.collection('winners')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((snap) => {
          arr.push(snap);
        });
      })
      .then(() => {
        setScore(arr);
      });
  }, []);

  return (
    <React.Fragment>
      <h1 className="leaderBoard">Leaderboard</h1>
      <div className="scoresContainer">
        <div className="score">
          {scores.map((score) => {
            return (
              <div className="card" key={score.id}>
                <h1>{score.data().name}</h1>
                <div>{`Completed in ${score.data().time} minutes`} </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Leaderboard;
