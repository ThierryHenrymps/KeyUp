import { useState } from "react";

interface ItemViewProps {
  site?: any;
  item: any;
}

export default function ItemView({ site, item }: ItemViewProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item?.name ?? "");

  return (
    <div className="item-view">
      <h3>{item?.name ?? "Item"}</h3>
      <p>{item?.detail ?? ""}</p>
      {site && <p>Site: {site.name}</p>}
      {editing ? (
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do item"
          />
          <button onClick={() => setEditing(false)}>Cancelar</button>
          <button onClick={() => setEditing(false)}>Salvar</button>
        </div>
      ) : (
        <button onClick={() => setEditing(true)}>Editar</button>
      )}
    </div>
  );
}