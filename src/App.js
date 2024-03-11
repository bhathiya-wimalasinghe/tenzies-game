import "./style.css";
import Die from "./Die";
import React from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [diceArray, setDiceArray] = React.useState(generateNewDice());

  function generateNewDice() {
    const diceArray = [];

    for (let i = 0; i < 10; i++) {
      diceArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: true,
        id: nanoid(),
      });
    }
    return diceArray;
  }

  function rollDice() {
    setDiceArray(generateNewDice());
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
      <div className="die-container">{dieElements}</div>
      <button className="btn-roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
