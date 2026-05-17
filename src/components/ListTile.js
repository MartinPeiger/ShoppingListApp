import { Link } from "react-router-dom";
import { useTranslation } from "../i18n";

function ListTile({ list, canDelete, onDelete }) {
  const { t } = useTranslation();

  return (
    <div className="tile">
      <Link to={`/lists/${list.id}`}>
        <h3>{list.name}</h3>
      </Link>

      {list.archived && (
        <p>{t("archived")}</p>
      )}

      {canDelete && (
        <button
          onClick={() => onDelete(list.id)}
        >
          {t("delete")}
        </button>
      )}
    </div>
  );
}

export default ListTile;