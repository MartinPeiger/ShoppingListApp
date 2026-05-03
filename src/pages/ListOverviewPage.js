import { useEffect, useState } from "react";

import ListTile from "../components/ListTile";
import AddListModal from "../components/AddListModal";

import { api } from "../services/apiClient";

const CURRENT_USER_ID = "u1";

function ListsOverviewPage() {

  const [lists, setLists] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [showArchived, setShowArchived] = useState(true);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    async function loadLists() {

      try {

        setLoading(true);

        const data = await api.lists.getAll();

        setLists(data);

      } catch (err) {

        setError("Nepodařilo se načíst seznamy.");

      } finally {

        setLoading(false);

      }
    }

    loadLists();

  }, []);

  async function handleAddList(name) {

    try {

      const newList = {
        name,
        ownerId: CURRENT_USER_ID,
        archived: false
      };

      const createdList =
        await api.lists.create(newList);

      setLists([...lists, createdList]);

      setShowModal(false);

    } catch (err) {

      setError("Nepodařilo se vytvořit seznam.");
    }
  }

  async function handleDeleteList(id) {

    const confirmed = window.confirm(
      "Opravdu chcete smazat seznam?"
    );

    if (!confirmed) return;

    try {

      await api.lists.remove(id);

      const updatedLists = lists.filter(
        list => list.id !== id
      );

      setLists(updatedLists);

    } catch (err) {

      setError("Nepodařilo se smazat seznam.");
    }
  }

  const filteredLists = showArchived
    ? lists
    : lists.filter(list => !list.archived);

  if (loading) {
    return <div>Načítání...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">

      <h1>Nákupní seznamy</h1>

      <div style={{ marginBottom: "15px" }}>

        <button onClick={() => setShowModal(true)}>
          + Nový seznam
        </button>

        <button
          onClick={() =>
            setShowArchived(!showArchived)
          }
        >
          Přepnout archivované
        </button>

      </div>

      <div className="tiles-grid">

        {filteredLists.map(list => (

          <ListTile
            key={list.id}
            list={list}
            canDelete={
              list.ownerId === CURRENT_USER_ID
            }
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