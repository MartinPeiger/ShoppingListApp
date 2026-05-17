import { useTranslation } from "../i18n";

export default function ItemsList({
  items,
  showResolved,
  onToggleResolved,
  onDeleteItem
}) {
  const { t } = useTranslation();

  const filteredItems = showResolved
    ? items
    : items.filter(item => !item.resolved);

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <ul>

      {filteredItems.map(item => (

        <li
          key={item.id}
          className="item"
          tabIndex={0}
          onKeyDown={(e) => {

            if (e.key === "Enter") {
              onToggleResolved(item.id);
            }

            if (e.key === "Delete") {
              onDeleteItem(item.id);
            }
          }}
        >

          <span>
            {item.resolved ? "✔ " : ""}
            {item.name}
          </span>

          <button
            onClick={() =>
              onToggleResolved(item.id)
            }
          >
            {item.resolved
              ? t("markUnresolved")
              : t("resolve")}
          </button>

          <button
            onClick={() =>
              onDeleteItem(item.id)
            }
          >
            {t("delete")}
          </button>

        </li>

      ))}

    </ul>
  );
}