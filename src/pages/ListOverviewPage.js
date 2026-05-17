import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from "../i18n";

import ListTile from "../components/ListTile";
import AddListModal from "../components/AddListModal";
import { api } from "../services/apiClient";

const CURRENT_USER_ID = "u1";

function ListsOverviewPage() {
  const { dark, toggleTheme } = useContext(ThemeContext);
  const { t, toggleLang } = useTranslation();

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showArchived, setShowArchived] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [items, setItems] = useState([]);

  const getItemCount = (listId) =>
    items.filter(i => i.listId === listId).length;

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const [listsData, itemsData] = await Promise.all([
          api.lists.getAll(),
          api.items.getAll()
        ]);

        setLists(listsData);
        setItems(itemsData);

      } catch (err) {
        setError(t("failedLoadData"));
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [t]);

  async function handleAddList(name) {
    try {
      const newList = {
        name,
        ownerId: CURRENT_USER_ID,
        archived: false
      };

      const createdList = await api.lists.create(newList);

      setLists(prev => [...prev, createdList]);
      setShowModal(false);

    } catch (err) {
      setError(t("failedCreateList"));
    }
  }

  async function handleDeleteList(id) {
    const confirmed = window.confirm(t("confirmDeleteList"));
    if (!confirmed) return;

    try {
      await api.lists.remove(id);

      setLists(prev => prev.filter(list => list.id !== id));

    } catch (err) {
      setError(t("failedDeleteList"));
    }
  }

  const filteredLists = showArchived
    ? lists
    : lists.filter(list => !list.archived);

  if (loading) {
    return <div className="container">{t("loading")}</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <div className="container">

      <h1>{t("title")}</h1>

      <button
        onClick={toggleTheme}
        style={{ position: "fixed", top: 10, right: 10, zIndex: 999 }}
      >
        {dark ? t("lightMode") : t("darkMode")}
      </button>
      <button
        onClick={toggleLang}
        style={{ position: "fixed", top: 10, right: 120, zIndex: 999 }}
      >
        {t("toggleLanguage")}
      </button>

      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setShowModal(true)}>
          + {t("addList")}
        </button>

        <button onClick={() => setShowArchived(prev => !prev)}>
          {t("toggleArchived")}
        </button>
      </div>

      <div className="tiles-grid">
        {filteredLists.map(list => (
          <ListTile
            key={list.id}
            list={list}
            itemCount={getItemCount(list.id)}
            canDelete={list.ownerId === CURRENT_USER_ID}
            onDelete={handleDeleteList}
          />
        ))}
      </div>

      {showModal && (
        <AddListModal
          onAdd={handleAddList}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
}

export default ListsOverviewPage;