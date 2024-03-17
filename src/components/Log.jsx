export default function ({ turns, playerN }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col} `}>{`${
          playerN[turn.playerName]
        } selected ${turn.square.row}, ${turn.square.col}`}</li>
      ))}
    </ol>
  );
}
