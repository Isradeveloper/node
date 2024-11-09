interface Hero {
  id: number;
  name: string;
  owner: "DC" | "Marvel";
}

export const heroes:Hero[] = [
  { id: 1, name: "Batman", owner: "DC" },
  { id: 2, name: "Ironman", owner: "Marvel" },
  { id: 3, name: "Thor", owner: "Marvel" },
  { id: 4, name: "Superman", owner: "DC" },
];
