export default function ItemsList({ items, showResolved, onToggleResolved, onDeleteItem }) {
  const filteredItems = showResolved ? items : items.filter(item => !item.resolved);

  return (
    <ul>
      {filteredItems.map(item => (
        <li 
          key={item.id} 
          className="item" 
          tabIndex={0} 
          onKeyDown={(e) => {
            if (e.key === "Enter") onToggleResolved(item.id);
            if (e.key === "Delete") onDeleteItem(item.id);
          }}
        >
          <span>{item.name}</span>
          <button onClick={() => onToggleResolved(item.id)}>
            {item.resolved ? "Neřešené" : "Vyřešit"}
          </button>
          <button onClick={() => onDeleteItem(item.id)}>
            Smazat
          </button>
        </li>
      ))}
    </ul>
  );
}