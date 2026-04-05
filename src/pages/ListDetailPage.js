import { useState } from "react";
import ListHeader from "../components/ListHeader";
import MembersPreview from "../components/MembersPreview";
import AddItemForm from "../components/AddItemForm";
import ItemsList from "../components/ItemsList";

const INITIAL_LIST = {
  id: "1",
  name: "Víkend",
  ownerId: "u1",
  members: [
    { id: "u1", name: "Martin" },
    { id: "u2", name: "Tereza" }
  ],
  items: [
    { id: "1", name: "Mléko", resolved: false },
    { id: "2", name: "Chleba", resolved: true }
  ]
};

// simulace přihlášeného uživatele
const CURRENT_USER_ID = "u1"; // Martin – vlastník

export default function ListDetailPage() {
  const [list, setList] = useState(INITIAL_LIST);
  const [showResolved, setShowResolved] = useState(true);

  const isOwner = list.ownerId === CURRENT_USER_ID;

  // Přidání položky
  function addItem(name) {
    if (!name) return;
    const newItem = { id: Date.now().toString(), name, resolved: false };
    setList({ ...list, items: [...list.items, newItem] });
  }

  // Přepínání vyřešené položky
  function handleToggleResolved(id) {
    const updatedItems = list.items.map(item =>
      item.id === id ? { ...item, resolved: !item.resolved } : item
    );
    setList({ ...list, items: updatedItems });
  }

  // Smazání položky
  function handleDeleteItem(id) {
    const updatedItems = list.items.filter(item => item.id !== id);
    setList({ ...list, items: updatedItems });
  }

  // Přejmenování seznamu (jen vlastník)
  function handleRename(newName) {
    if (!isOwner || !newName) return; // kontrola vlastníka
    setList({ ...list, name: newName });
  }

  // Přidání / odebrání členů (jen vlastník)
  function handleAddMember(name) {
    if (!isOwner || !name) return;
    const newMember = { id: Date.now().toString(), name };
    setList({ ...list, members: [...list.members, newMember] });
  }

  function handleRemoveMember(id) {
    if (!isOwner) return;
    setList({ ...list, members: list.members.filter(m => m.id !== id) });
  }

  // Člen může odejít
  function handleLeaveList(userId) {
    if (CURRENT_USER_ID !== userId) return; // bezpečnostní kontrola
    setList({ ...list, members: list.members.filter(m => m.id !== userId) });
  }

  return (
    <div className="container">
      <ListHeader
        name={list.name}
        isOwner={isOwner}       // jen vlastník může upravovat
        onRename={handleRename}
      />

      <MembersPreview
        members={list.members}
        ownerId={list.ownerId}
        currentUserId={CURRENT_USER_ID}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
        onLeaveList={handleLeaveList}
      />

      <AddItemForm onAddItem={addItem} />

      <button onClick={() => setShowResolved(!showResolved)}>
        {showResolved ? "Zobrazit jen nevyřešené" : "Zobrazit včetně vyřešených"}
      </button>

      <ItemsList
        items={list.items}
        showResolved={showResolved}
        onToggleResolved={handleToggleResolved}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}