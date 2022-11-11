import React, { useEffect, useState } from "react";
import "./Dice.css";
import { nanoid } from "nanoid";
const Dice = () => {
  const [val, setVal] = useState(diceRoll());
  const [gameOver, setGameOver] = useState(false);
  const [rotate, setRotate] = useState({
    translate: "rotate(0deg)",
  });
  function diceRoll() {
    let die = [];

    for (let i = 0; i < 10; i++) {
      die.push({
        value: Math.ceil(Math.random() * 6),
        isHold: false,
        id: nanoid(),
      });
    }

    return die;
  }

  useEffect(() => {
    const allHold = val.every((die) => die.isHold);
    const firstValue = val[0].value;
    const sameValue = val.every((die) => die.value === firstValue);
    if (allHold && sameValue) {
     setGameOver(true)
   
    }
  }, [val]);

  const generateNewNumber = () => {
    setVal(
      val.map((oldDice) => {
        return oldDice.isHold
          ? oldDice
          : {
              value: Math.ceil(Math.random() * 6),
              isHold: false,
              id: nanoid(),
            };
      })
    );
    setRotate({
      translate: "rotate(360deg)",
    });
  };

  const holdNumber = (id) => {
    setVal(
      val.map((oldDice) => {
        return oldDice.id === id
          ? { ...oldDice, isHold: !oldDice.isHold }
          : oldDice;
      })
    );
  };

  return (
    <>
      <div className="container">
        {gameOver ? (
          <div className="gameOver">
            <p>You Won!</p>
          </div>
        ) : (
          <div className="Container">
            <div className="dice-grid">
              {val.map((number) => {
                return (
                  <div className="h3">
                    <h3
                      className={number.isHold ? "highlighted" : "normal"}
                      style={{ transform: `${rotate.translate}` }}
                      onClick={() => holdNumber(number.id)}
                      key={number.id}
                    >
                      {number.value}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        )}{" "}
        <div>
          <button
            type="button"
            onClick={generateNewNumber}
            className="btn btn-primary"
          >
            Roll
          </button>{" "}
        </div>
      </div>
    </>
  );
};

export default Dice;
