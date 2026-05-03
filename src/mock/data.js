export const lists = [
  {
    id: "1",
    name: "Potraviny",
    ownerId: "u1",
    archived: false,
    members: []
  },
  {
    id: "2",
    name: "Drogerie",
    ownerId: "u2",
    archived: true,
    members: []
  }
];

export const items = [
  {
    id: "i1",
    listId: "1",
    name: "Mléko",
    resolved: false
  },
  {
    id: "i2",
    listId: "1",
    name: "Chléb",
    resolved: true
  },
  {
    id: "i3",
    listId: "2",
    name: "Šampon",
    resolved: false
  }
];