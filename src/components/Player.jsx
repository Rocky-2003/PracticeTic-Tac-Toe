export default function Player({ playerName, ...props }) {
  return (
    <li>
      <span className="player">
        <span className="player-name">{playerName}</span>
        <span className="player-symbol">X</span>
      </span>
      <button>Edit</button>
    </li>
  );
}
