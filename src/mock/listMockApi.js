import { lists } from "./data";

let db = [...lists];

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const listMockApi = {
  async getAll() {
    await delay(300);
    return [...db];
  },

  async getById(id) {
    await delay(300);

    const list = db.find(
      (l) => String(l.id) === String(id)
    );

    if (!list) {
      throw new Error("List not found");
    }

    return list;
  },

  async create(list) {
    await delay(300);

    const newList = {
      id: Date.now().toString(),
      name: list.name,
      ownerId: list.ownerId || "u1",
      archived: list.archived || false,
      members: list.members || []
    };

    db.push(newList);

    return newList;
  },

  async remove(id) {
    await delay(300);

    db = db.filter(
      (list) => String(list.id) !== String(id)
    );
  }
};