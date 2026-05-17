import { useTranslation } from "../i18n";

function ItemRow({ id, name, resolved, onToggleResolved, onDelete }) {
  const { t } = useTranslation();

  return (
    <div className="item">
      <input
        type="checkbox"
        checked={resolved}
        onChange={() => onToggleResolved(id)}
      />
      <span style={{ textDecoration: resolved ? "line-through" : "none" }}>
        {name}
      </span>
      <button onClick={() => onDelete(id)}>{t("delete")}</button>
    </div>
  );
}

export default ItemRow;