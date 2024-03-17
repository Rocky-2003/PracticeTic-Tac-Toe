import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

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
  const [playerName, setPlayerName] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const gameboard = driveGameBoard(gameTurns);
  const activePlayer = driveActivePlayer(gameTurns);

  function handleSelectSquare(row, col, valueOfPlayer) {
    if (valueOfPlayer !== null) return;

    setGameTurns((prevState) => {
      const currentPlayer = driveActivePlayer(gameTurns);

      return [
        {
          square: { row: row, col: col },
          playerName: currentPlayer,
        },
        ...prevState,
      ];
    });
  }

  function handlePlayerName(symbol, newName) {
    setPlayerName((prevPlayerName) => {
      return {
        ...prevPlayerName,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChange={handlePlayerName}
          />
          <Player
            symbol="O"
            initialName={PLAYERS.O}
            isActive={activePlayer === "O"}
            onChange={handlePlayerName}
          />
        </ol>
        <GameBoard onSelect={handleSelectSquare} board={gameboard} />
      </div>
      <Log turns={gameTurns} playerN={playerName} />
    </main>
  );
}

export default App;
