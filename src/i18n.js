import { useContext, useCallback } from "react";
import { LanguageContext } from "./context/LanguageContext";

export const translations = {
  cs: {
    title: "Nákupní seznamy",
    addList: "Nový seznam",
    addListTitle: "Nový seznam",
    listNamePlaceholder: "Název seznamu",
    newItemPlaceholder: "Nová položka",
    add: "Přidat",
    close: "Zavřít",
    toggleArchived: "Přepnout archivované",
    archived: "Archivováno",
    delete: "Smazat",
    edit: "Upravit",
    save: "Uložit",
    cancel: "Zrušit",
    loading: "Načítání...",
    loadingItems: "Načítání položek...",
    listNotFound: "Seznam nenalezen.",
    noItems: "Žádné položky",
    noItemsInList: "Žádné položky v seznamu.",
    showOnlyUnresolved: "Zobrazit jen nevyřešené",
    showWithResolved: "Zobrazit včetně vyřešených",
    resolve: "Vyřešit",
    markUnresolved: "Označit jako nevyřešené",
    members: "Členové:",
    addMember: "Přidat člena",
    newMemberName: "Jméno nového člena",
    leave: "Odejít",
    remove: "Odstranit",
    darkMode: "Tmavý režim",
    lightMode: "Světlý režim",
    failedLoadData: "Nepodařilo se načíst data.",
    failedCreateList: "Nepodařilo se vytvořit seznam.",
    failedDeleteList: "Nepodařilo se smazat seznam.",
    confirmDeleteList: "Opravdu chcete smazat seznam?",
    failedAddItem: "Nepodařilo se přidat položku.",
    failedToggleResolved: "Nepodařilo se změnit stav položky.",
    failedDeleteItem: "Nepodařilo se smazat položku.",
    resolved: "Vyřešené",
    unresolved: "Nevyřešené",
    toggleLanguage: "EN"
    ,
    back: "Zpět"
  },
  en: {
    title: "Shopping lists",
    addList: "New list",
    addListTitle: "New list",
    listNamePlaceholder: "List name",
    newItemPlaceholder: "New item",
    add: "Add",
    close: "Close",
    toggleArchived: "Toggle archived",
    archived: "Archived",
    delete: "Delete",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    loadingItems: "Loading items...",
    listNotFound: "List not found.",
    noItems: "No items",
    noItemsInList: "No items in the list.",
    showOnlyUnresolved: "Show only unresolved",
    showWithResolved: "Show with resolved",
    resolve: "Resolve",
    markUnresolved: "Mark unresolved",
    members: "Members:",
    addMember: "Add member",
    newMemberName: "New member name",
    leave: "Leave",
    remove: "Remove",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    failedLoadData: "Failed to load data.",
    failedCreateList: "Failed to create list.",
    failedDeleteList: "Failed to delete list.",
    confirmDeleteList: "Are you sure you want to delete this list?",
    failedAddItem: "Failed to add item.",
    failedToggleResolved: "Failed to update item.",
    failedDeleteItem: "Failed to delete item.",
    resolved: "Resolved",
    unresolved: "Unresolved",
    toggleLanguage: "CS"
    ,
    back: "Back"
  }
};

export function getTranslation(lang, key) {
  return (
    translations[lang]?.[key] ??
    translations.en?.[key] ??
    key
  );
}

export function useTranslation() {
  const { lang, toggleLang } = useContext(LanguageContext);

  const t = useCallback((key) => getTranslation(lang, key), [lang]);

  return {
    t,
    lang,
    toggleLang
  };
}
