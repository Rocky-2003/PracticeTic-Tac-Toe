import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function driveGameBoard(gameTurns) {
  let initialGameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];
  for (let turn of gameTurns) {
    let { square, playerName } = turn;
    let { row, col } = square;

    initialGameBoard[row][col] = playerName;
  }

  return initialGameBoard;
}

function driveActivePlayer(gameTurns) {
  let symbol = "X";
  if (gameTurns.length > 0 && gameTurns[0].playerName === "X") {
    symbol = "O";
  }

  return symbol;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const gameboard = driveGameBoard(gameTurns);
  const activePlayer = driveActivePlayer(gameTurns);

  function handleSelectSquare(row, col, valueOfPlayer) {
    console.log(activePlayer);
    if (valueOfPlayer !== null) return;

    setGameTurns((prevState) => {
      const currentPlayer = driveActivePlayer(gameTurns);

      return [
        { square: { row: row, col: col }, playerName: currentPlayer },
        ...prevState,
      ];
    });

    console.log(row, col, valueOfPlayer);
  }
  return (
    <div id="game-container">
      <div id="players">
        <Player playerName={PLAYERS.X} />
        <Player playerName={PLAYERS.O} />
      </div>
      <GameBoard onSelect={handleSelectSquare} board={gameboard} />
    </div>
  );
}

export default App;
