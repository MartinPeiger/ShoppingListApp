import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ListHeader from "../components/ListHeader";
import MembersPreview from "../components/MembersPreview";
import AddItemForm from "../components/AddItemForm";
import ItemsList from "../components/ItemsList";
import { useTranslation } from "../i18n";
import { ThemeContext } from "../context/ThemeContext";

import { api } from "../services/apiClient";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  
} from "recharts";

const CURRENT_USER_ID = "u1";

export default function ListDetailPage() {

  const { id } = useParams();

  const [list, setList] = useState(null);

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [showResolved, setShowResolved] = useState(true);

  const { t, toggleLang } = useTranslation();
  const { dark, toggleTheme } = useContext(ThemeContext);
  const isOwner = list?.ownerId === CURRENT_USER_ID;

  const resolvedCount = items.filter(i => i.resolved).length;

  const unresolvedCount = items.filter(i => !i.resolved).length;
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

      setError(t("failedLoadData"));

    } finally {

      setLoading(false);
    }
  }

  loadItems(); 

}, [id, t]);

const chartData = showResolved
  ? [
      { name: t("resolved"), value: resolvedCount },
      { name: t("unresolved"), value: unresolvedCount }
    ]
  : [
      { name: t("unresolved"), value: unresolvedCount }
    ];

const colors = chartData.map(d =>
  d.name === t("resolved") ? "#4caf50" : "#f44336"
);

function BackButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button onClick={() => navigate(-1)}>
      {t("back")}
    </button>
  );
}
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

      setError(t("failedAddItem"));
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

      setError(t("failedToggleResolved"));
    }
  }

  async function handleDeleteItem(itemId) {

    try {

      await api.items.remove(itemId);

      setItems(prev =>
        prev.filter(item => item.id !== itemId)
      );

    } catch (err) {

      setError(t("failedDeleteItem"));
    }
  }

  if (loading) {
    return (
      <div className="container">
        <p>{t("loadingItems")}</p>
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
        <p>{t("listNotFound")}</p>
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
      <div style={{ position: "fixed", top: 10, right: 10, zIndex: 999 }}>
        <button onClick={toggleLang} style={{ marginRight: 8 }}>{t("toggleLanguage")}</button>
        <button onClick={toggleTheme}>{dark ? t("lightMode") : t("darkMode")}</button>
      </div>

      {/* Back button (top-left) */}
      <div style={{ position: "fixed", top: 10, left: 10, zIndex: 999 }}>
        <BackButton />
      </div>

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
          ? t("showOnlyUnresolved")
          : t("showWithResolved")}
      </button>

      <div className="chart-wrapper">
        <PieChart
          width={360}
          height={260}
          margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
        >
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label={false}
            labelLine={false}
          >
            {chartData.map((_, idx) => (
              <Cell key={`cell-${idx}`} fill={colors[idx]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <ItemsList
        items={items}
        showResolved={showResolved}
        onToggleResolved={handleToggleResolved}
        onDeleteItem={handleDeleteItem}
      />

      {items.length === 0 && (
        <p>{t("noItemsInList")}</p>
      )}

    </div>
  );
}