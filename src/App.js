import "./style.css";
import Die from "./Die";
export default function App() {
  function generateNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(Math.ceil(Math.random() * 6));
    }
  }
  generateNewDice();
  return (
    <main>
      <div className="die-container">
        <Die value="1" />
        <Die value="2" />
        <Die value="3" />
        <Die value="4" />
        <Die value="5" />
        <Die value="6" />
        <Die value="7" />
        <Die value="8" />
        <Die value="9" />
        <Die value="10" />
      </div>
    </main>
  );
}
