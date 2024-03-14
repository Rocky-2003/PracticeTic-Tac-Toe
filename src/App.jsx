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

function App() {
  return (
    <div id="game-container">
      <div id="players">
        <Player playerName={PLAYERS.X} />
        <Player playerName={PLAYERS.O} />
      </div>
      <GameBoard board={INITIAL_GAME_BOARD} />
    </div>
  );
}

export default App;
