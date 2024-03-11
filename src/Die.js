export default function Die(props) {
  return (
    <div
      onClick={props.holdDice}
      className={props.isHeld ? "die isHeld" : "die"}
    >
      <h2>{props.value}</h2>
    </div>
  );
}
