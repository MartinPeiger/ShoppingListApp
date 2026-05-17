import { useState } from "react";
import { useTranslation } from "../i18n";

function AddListModal({ onAdd, onClose }) {
  const { t } = useTranslation();

  const [value, setValue] = useState("");

  function handleSubmit(e) {

    e.preventDefault();

    if (!value) return;

    onAdd(value);
  }

  return (
    <div className="modal-backdrop">

      <div className="modal">

        <h2>{t("addListTitle")}</h2>

        <form onSubmit={handleSubmit}>

          <input
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
            placeholder={t("listNamePlaceholder")}
          />

          <div style={{ marginTop: "10px" }}>

            <button type="submit">
              {t("add")}
            </button>

            <button
              type="button"
              onClick={onClose}
            >
              {t("close")}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddListModal;