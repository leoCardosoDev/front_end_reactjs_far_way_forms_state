import { useState } from "react";
import { Item } from "./Item";

export function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  if (items.length === 0) {
    return <div className="list"></div>;
  }
  let sortedItems;
  if (sortBy === "input") sortedItems = items.slice().sort();
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Ordenar de Entrada</option>
          <option value="description">Ordenar por nome</option>
          <option value="packed">Ordenar por Status</option>
        </select>
        <button onClick={onClearList}>Limpar Lista</button>
      </div>
    </div>
  );
}
