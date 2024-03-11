import "./style.css";
import Die from "./Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [diceArray, setDiceArray] = React.useState(generateNewDice());
  const [isWon, setIsWon] = React.useState(false);

  React.useEffect(() => {
    if (
      diceArray.filter((die) => die.isHeld === true).length === 10 &&
      diceArray.filter((die) => die.value === diceArray[0].value).length === 10
    ) {
      setIsWon(true);
    }
  }, [diceArray]);

  function generateNewDice() {
    const diceArray = [];

    for (let i = 0; i < 10; i++) {
      diceArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return diceArray;
  }

  function rollDice() {
    if (isWon) {
      setIsWon(false);
      setDiceArray(generateNewDice());
    } else {
      setDiceArray((prevDiceArray) => {
        return prevDiceArray.map((die) => {
          return die.isHeld
            ? die
            : {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
              };
        });
      });
    }
  }

  function holdDice(id) {
    setDiceArray((prevDiceArray) => {
      return prevDiceArray.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const dieElements = diceArray.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {isWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{dieElements}</div>
      <button className="btn-roll-dice" onClick={rollDice}>
        {isWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
