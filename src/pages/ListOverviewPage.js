import { useState } from "react";

import ListTile from "../components/ListTile";
import AddListModal from "../components/AddListModal";

const CURRENT_USER_ID = "u1";

const INITIAL_LISTS = [
  {
    id: "1",
    name: "Nákup na víkend",
    ownerId: "u1",
    archived: false
  },
  {
    id: "2",
    name: "Vánoční nákup",
    ownerId: "u1",
    archived: true
  },
  {
    id: "3",
    name: "Práce",
    ownerId: "u2",
    archived: false
  }
];

function ListsOverviewPage() {

  const [lists, setLists] = useState(INITIAL_LISTS);

  const [showArchived, setShowArchived] = useState(true);

  const [showModal, setShowModal] = useState(false);

  function handleAddList(name) {

    const newList = {
      id: Date.now().toString(),
      name,
      ownerId: CURRENT_USER_ID,
      archived: false
    };

    setLists([...lists, newList]);

    setShowModal(false);
  }

  function handleDeleteList(id) {

    const confirmed = window.confirm(
      "Opravdu chcete smazat seznam?"
    );

    if (!confirmed) return;

    const updatedLists = lists.filter(
      list => list.id !== id
    );

    setLists(updatedLists);
  }

  const filteredLists = showArchived
    ? lists
    : lists.filter(list => !list.archived);

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