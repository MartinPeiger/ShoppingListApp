import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ListHeader from "../components/ListHeader";
import MembersPreview from "../components/MembersPreview";
import AddItemForm from "../components/AddItemForm";
import ItemsList from "../components/ItemsList";

import { api } from "../services/apiClient";

const CURRENT_USER_ID = "u1";

export default function ListDetailPage() {

  const { id } = useParams();

  const [list, setList] = useState(null);

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [showResolved, setShowResolved] = useState(true);

  const isOwner = list?.ownerId === CURRENT_USER_ID;

useEffect(() => {

  async function loadItems() {

    try {

      setLoading(true);
      setError(null);

      const [listData, itemsData] = await Promise.all([
        api.lists.getById(id),
        api.items.getByListId(id)
      ]);

      setList(listData);
      setItems(itemsData);

    } catch (err) {

      setError("Nepodařilo se načíst data.");

    } finally {

      setLoading(false);
    }
  }

  loadItems(); 

}, [id]);

  async function addItem(name) {

    if (!name) return;

    try {

      const newItem = {
        listId: id,
        name,
        resolved: false
      };

      const createdItem =
        await api.items.create(newItem);

      setItems(prev => [...prev, createdItem]);

    } catch (err) {

      setError("Nepodařilo se přidat položku.");
    }
  }

  async function handleToggleResolved(itemId) {

    try {

      await api.items.toggle(itemId);

      setItems(prev =>
        prev.map(item =>
          item.id === itemId
            ? { ...item, resolved: !item.resolved }
            : item
        )
      );

    } catch (err) {

      setError("Nepodařilo se změnit stav položky.");
    }
  }

  async function handleDeleteItem(itemId) {

    try {

      await api.items.remove(itemId);

      setItems(prev =>
        prev.filter(item => item.id !== itemId)
      );

    } catch (err) {

      setError("Nepodařilo se smazat položku.");
    }
  }

  if (loading) {
    return (
      <div className="container">
        <p>Načítání položek...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!list) {
    return (
      <div className="container">
        <p>Seznam nenalezen.</p>
      </div>
    );
  }

  return (
    <div className="container">

      <ListHeader
        name={list.name}
        isOwner={isOwner}
        onRename={(newName) =>
          setList(prev => ({
            ...prev,
            name: newName
          }))
        }
      />

      <MembersPreview
        members={list?.members || []}
        ownerId={list.ownerId}
        currentUserId={CURRENT_USER_ID}
        onAddMember={(name) =>
          setList(prev => ({
            ...prev,
            members: [
              ...prev.members,
              { id: Date.now().toString(), name }
            ]
          }))
        }
        onRemoveMember={(memberId) =>
          setList(prev => ({
            ...prev,
            members: (prev.members || []).filter(
              m => m.id !== memberId
            )
          }))
        }
        onLeaveList={(userId) =>
          setList(prev => ({
            ...prev,
            members: (prev.members || []).filter(
              m => m.id !== userId
            )
          }))
        }
      />

      <AddItemForm onAddItem={addItem} />

      <button
        onClick={() =>
          setShowResolved(prev => !prev)
        }
      >
        {showResolved
          ? "Zobrazit jen nevyřešené"
          : "Zobrazit včetně vyřešených"}
      </button>

      <ItemsList
        items={items}
        showResolved={showResolved}
        onToggleResolved={handleToggleResolved}
        onDeleteItem={handleDeleteItem}
      />

      {items.length === 0 && (
        <p>Žádné položky v seznamu.</p>
      )}

    </div>
  );
}