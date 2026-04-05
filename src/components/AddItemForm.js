import { useState } from "react";

function AddItemForm({ onAddItem }) {

  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!value) return;

    onAddItem(value);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Nová položka"
      />

      <button>Přidat</button>
    </form>
  );
}

export default AddItemForm;