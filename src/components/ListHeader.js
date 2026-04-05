import { useState } from "react";

function ListHeader({ name, isOwner, onRename }) {

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);

  function handleSubmit() {
    onRename(value);
    setEditing(false);
  }

  return (
    <div>
      {editing ? (
        <>
          <input value={value} onChange={e => setValue(e.target.value)} />
          <button onClick={handleSubmit}>Uložit</button>
        </>
      ) : (
        <>
          <h1>{name}</h1>
          {isOwner && (
            <button onClick={() => setEditing(true)}>
              Přejmenovat
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ListHeader;