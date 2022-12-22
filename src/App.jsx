import React from "react";
import Die from "./Die";
import "./App.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzie] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstvalue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstvalue);
    if (allHeld && allSameValue) {
      setTenzie(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(6 * Math.random()),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = Array(10)
      .fill()
      .map(() => generateNewDie());
    return newDice;
  }

  function clickHandler() {
    if(!tenzies){
      setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    )
    } else{
      setTenzie(false)
      setDice(allNewDice)
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={clickHandler}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
