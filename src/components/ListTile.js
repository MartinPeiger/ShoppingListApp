import { Link } from "react-router-dom";

function ListTile({ list, canDelete, onDelete }) {

  return (
    <div className="tile">

      <Link to={`/lists/${list.id}`}>
        <h3>{list.name}</h3>
      </Link>

      {list.archived && (
        <p>Archivováno</p>
      )}

      {canDelete && (
        <button
          onClick={() => onDelete(list.id)}
        >
          Smazat
        </button>
      )}

    </div>
  );
}

export default ListTile;