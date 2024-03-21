import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import Log from "./components/Log.jsx";

import { WINNING_COMBINATIONS } from "../winning_combination.js";

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

function driveWinner(gameboard, playerName) {
  let winnerName;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameboard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winnerName = playerName[firstSquareSymbol];
    }
  }

  return winnerName;
}

function App() {
  const [playerName, setPlayerName] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const gameboard = driveGameBoard(gameTurns);
  const activePlayer = driveActivePlayer(gameTurns);

  const winner = driveWinner(gameboard, playerName);
  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleRestartMatch() {
    setGameTurns([]);
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
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestartMatch} />
        )}
        <GameBoard onSelect={handleSelectSquare} board={gameboard} />
      </div>
      <Log turns={gameTurns} playerN={playerName} />
    </main>
  );
}

export default App;
