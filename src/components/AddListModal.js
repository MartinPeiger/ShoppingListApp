import { useState } from "react";

function AddListModal({ onAdd, onClose }) {

  const [value, setValue] = useState("");

  function handleSubmit(e) {

    e.preventDefault();

    if (!value) return;

    onAdd(value);
  }

  return (
    <div className="modal-backdrop">

      <div className="modal">

        <h2>Nový seznam</h2>

        <form onSubmit={handleSubmit}>

          <input
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
            placeholder="Název seznamu"
          />

          <div style={{ marginTop: "10px" }}>

            <button type="submit">
              Přidat
            </button>

            <button
              type="button"
              onClick={onClose}
            >
              Zavřít
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddListModal;