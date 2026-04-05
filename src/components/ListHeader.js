import { useState, useEffect } from "react";

export default function ListHeader({ name, isOwner, onRename }) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  useEffect(() => {
    setNewName(name);
  }, [name]);

  function saveName() {
    if (newName.trim() === "") return;
    onRename(newName);
    setEditing(false);
  }

  return (
    <div className="list-header">
      {editing ? (
        <div className="list-header-editing">
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <button onClick={saveName}>Uložit</button>
          <button onClick={() => setEditing(false)}>Zrušit</button>
        </div>
      ) : (
        <div className="list-header-view">
          <h1>{name}</h1>
          {isOwner && <button onClick={() => setEditing(true)}>Upravit</button>}
        </div>
      )}
    </div>
  );
}