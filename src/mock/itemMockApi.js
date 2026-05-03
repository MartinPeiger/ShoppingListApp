import { items } from "./data";

let db = [...items];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const itemMockApi = {
  async getByListId(listId) {
    await delay(300);

    return db.filter(item => item.listId === listId);
  },

  async create(item) {
    await delay(300);

    const newItem = {
      ...item,
      id: Date.now().toString()
    };

    db.push(newItem);

    return newItem;
  },

  async toggle(id) {
    await delay(300);

    db = db.map(item =>
        item.id === id
        ? { ...item, resolved: !item.resolved }
        : item
    );
  },

  async remove(id) {
    await delay(300);

    db = db.filter(item => item.id !== id);
  }
};