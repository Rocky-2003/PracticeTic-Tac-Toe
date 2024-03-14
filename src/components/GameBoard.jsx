export default function GameBoar({ board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button>{board[rowIndex].colIndex}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
