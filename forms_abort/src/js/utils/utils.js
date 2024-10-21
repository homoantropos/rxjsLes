export function getNoZeroId(id) {
  id = Number(id);

  typeof id !== "number" && (id = Number(id));

  return id === 0 ? id + 1 : Math.abs(id);
}
