import ItemRow from "./ItemRow";

function ItemsList({ items, showResolved, onToggleResolved, onDeleteItem }) {

  const filtered = showResolved
    ? items
    : items.filter(i => !i.resolved);

  return (
    <div>
      {filtered.map(item => (
        <ItemRow
          key={item.id}
          {...item}
          onToggleResolved={onToggleResolved}
          onDelete={onDeleteItem}
        />
      ))}
    </div>
  );
}

export default ItemsList;