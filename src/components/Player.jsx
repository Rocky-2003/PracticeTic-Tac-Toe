import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChange }) {
  const [playerName, setEditPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditingChange() {
    setIsEditing((editing) => {
      return !editing;
    });

    if (isEditing) {
      onChange(symbol, playerName);
    }
  }
  function handleOnChange(e) {
    setEditPlayerName(e.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        // value={playerName}
        onChange={handleOnChange}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player ">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditingChange}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
