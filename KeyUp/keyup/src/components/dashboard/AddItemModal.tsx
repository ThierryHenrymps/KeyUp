import { useState } from "react";
import type { NewItem } from "../../data/mockData";

export default function AddItemModal() {
  const [_open, setOpen] = useState(false);
  const [_kind] = useState<"site" | "personal">("site");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");

  const handleSave = (): NewItem => {
    const item: NewItem = { kind: _kind, name, url, category };
    if (_kind === "site") {
      // Would update sites state from parent
    } else {
      // Would update personal state from parent
    }
    setOpen(false);
    return item;
  };

  return (
    <div className="add-item-modal" role="dialog" aria-modal="true">
      <button className="close-btn" onClick={() => setOpen(false)} aria-label="Fechar">
        ✕
      </button>
      <h3>Adicionar item</h3>
      <label>
        Nome
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do item" />
      </label>
      {_kind === "site" ? (
        <label>
          URL
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://exemplo.com" />
        </label>
      ) : (
        <label>
          Categoria
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="senhas">Senhas pessoais</option>
            <option value="documentos">Documentos</option>
            <option value="notas">Notas</option>
          </select>
        </label>
      )}
      <div className="modal-actions">
        <button className="btn-cancel" onClick={() => setOpen(false)}>Cancelar</button>
        <button className="btn-save" onClick={() => { handleSave(); }}>Salvar</button>
      </div>
    </div>
  );
}