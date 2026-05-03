export default function ItemsList({
  items,
  showResolved,
  onToggleResolved,
  onDeleteItem
}) {

  const filteredItems = showResolved
    ? items
    : items.filter(item => !item.resolved);

  if (filteredItems.length === 0) {
    return
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
              ? "Označit jako nevyřešené"
              : "Vyřešit"}
          </button>

          <button
            onClick={() =>
              onDeleteItem(item.id)
            }
          >
            Smazat
          </button>

        </li>

      ))}

    </ul>
  );
}