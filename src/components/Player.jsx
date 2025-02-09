import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  console.log("isEditing", isEditing);

  function handleEditClick() {
    setIsEditing((editing) => !editing);

    //setIsEditing(!isEditing); => 사용 하지 말 것
    // => !isEditing == isEditing ? false : true 여러 개의 상태 업데이트가 연속해서 발생할 때, 예상치 못한 동작이 일어날 가능성이 있음.

    //setIsEditing((editing) => !editing);
    //상태 업데이트가 비동기적으로 이루어지므로, 이전 상태를 직접 참조하는 방식이 더 안전함.
    //만약 여러 번 상태 업데이트가 이루어질 경우, 최신 상태를 보장함.

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handlePlayerName(event) {
    setPlayerName(event.target.value);
  }

  let playerNameEl = <span className="player-name">{playerName}</span>;
  let btnCaption = "Edit";

  if (isEditing) {
    playerNameEl = (
      <input
        type="text"
        className="player-name"
        onChange={handlePlayerName}
        value={playerName}
        required
      />
    );
    btnCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameEl}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
