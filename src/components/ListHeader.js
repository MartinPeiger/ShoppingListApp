import { useState, useEffect } from "react";
import { useTranslation } from "../i18n";

export default function ListHeader({ name, isOwner, onRename }) {

  const { t } = useTranslation();

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

          <button onClick={saveName}>{t("save")}</button>
          <button onClick={() => setEditing(false)}>{t("cancel")}</button>

        </div>

      ) : (
        <div className="list-header-view">

          <h1>{name}</h1>

          {isOwner && (
            <button onClick={() => setEditing(true)}>
              {t("edit")}
            </button>
          )}

          {/* Theme and language controls moved to page-level header */}

        </div>
      )}

    </div>
  );
}