import { useState } from "react";
import { useTranslation } from "../i18n";

function AddItemForm({ onAddItem }) {
  const { t } = useTranslation();

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
        placeholder={t("newItemPlaceholder")}
      />

      <button>{t("add")}</button>
    </form>
  );
}

export default AddItemForm;