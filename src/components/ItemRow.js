function ItemRow({ id, name, resolved, onToggleResolved, onDelete }) {
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
      <button onClick={() => onDelete(id)}>❌</button>
    </div>
  );
}

export default ItemRow;