import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { initialItems } from "./data";
import type { Filter, VaultItem } from "./types";
import "./dashboard.css";

/* ---------- ícones ---------- */
const paths: Record<string, ReactNode> = {
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M16 7l3 3M14 9l2 2" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
    </>
  ),
  note: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  star: (
    <>
      <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.3 8-8 9-4.7-1-8-4.5-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
};

type IconName = keyof typeof paths;

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

/* ---------- utilidades ---------- */
const NAV: { key: Filter; label: string; icon: IconName }[] = [
  { key: "todos", label: "Todos os itens", icon: "grid" },
  { key: "senhas", label: "Senhas", icon: "key" },
  { key: "arquivos", label: "Arquivos", icon: "file" },
  { key: "notas", label: "Notas", icon: "note" },
  { key: "favoritos", label: "Favoritos", icon: "star" },
];

const matches = (i: VaultItem, f: Filter) =>
  f === "todos" ? true : f === "favoritos" ? i.favorite : i.category === f;

const level = (s: number) =>
  s >= 80 ? { label: "Forte", color: "#3ddc97" } : s >= 55 ? { label: "Média", color: "#ffb84d" } : { label: "Fraca", color: "#ff6b7a" };

function useToast() {
  const [msg, setMsg] = useState("");
  const timer = useRef<number | null>(null);
  const show = useCallback((m: string) => {
    setMsg(m);
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(() => setMsg(""), 1600);
  }, []);
  useEffect(() => {
    return () => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current);
      }
    };
  }, []);
  return { msg, show };
}

/* ---------- partes ---------- */

function ItemIcon({ item, size = 36 }: { item: VaultItem; size?: number }) {
  return (
    <div
      className={`ico ${item.tone}`}
      style={{
        width: size,
        height: size,
        fontSize: size > 40 ? 22 : 14,
        display: "grid",
        placeItems: "center",
        borderRadius: "var(--radius)",
        fontWeight: 700,
      }}
    >
      {item.title[0]}
    </div>
  );
}

function Sidebar({ items, filter, onFilter }: { items: VaultItem[]; filter: Filter; onFilter: (f: Filter) => void }) {
  const score = useMemo(() => {
    const pw = items.filter((i) => i.password);
    return pw.length ? Math.round(pw.reduce((a, i) => a + i.strength, 0) / pw.length) : 0;
  }, [items]);

  return (
    <aside className="panel side">
      <div className="brand">
        <div className="logo">
          <Icon name="key" size={16} />
        </div>
        KeyUp
      </div>
      <nav aria-label="Categorias">
        {NAV.map((n) => (
          <button
            key={n.key}
            className="nav"
            aria-current={filter === n.key ? "true" : "false"}
            onClick={() => onFilter(n.key)}
          >
            <Icon name={n.icon} size={16} />
            {n.label}
            <span className="n">{items.filter((i) => matches(i, n.key)).length}</span>
          </button>
        ))}
      </nav>
      <div className="side-foot">
        <div className="health">
          <small>Saúde do cofre</small>
          <div>
            <b>{score}</b>
            <span className="mut" style={{ color: "var(--mut)" }}> / 100</span>
          </div>
          <div className="bar">
            <i style={{ width: `${score}%` }} />
          </div>
          <div className="sync">
            <span className="dot" />
            Sincronizado agora
          </div>
        </div>
      </div>
    </aside>
  );
}

function ItemList({
  items,
  selectedId,
  query,
  onQuery,
  onSelect,
  onAdd,
}: {
  items: VaultItem[];
  selectedId: number | null;
  query: string;
  onQuery: (q: string) => void;
  onSelect: (id: number) => void;
  onAdd: () => void;
}) {
  return (
    <section className="panel list-panel">
      <div className="top">
        <label className="search">
          <Icon name="search" size={15} />
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Buscar no cofre"
            aria-label="Buscar no cofre"
          />
        </label>
        <button className="add" onClick={onAdd}>
          Adicionar
        </button>
      </div>
      <div className="list" role="listbox" aria-label="Itens">
        {items.length === 0 ? (
          <div className="empty">
            <h3>Nenhum item encontrado</h3>
            <p>Tente outro termo de busca.</p>
            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-soft)",
                  borderRadius: 12,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(59,123,255,.18)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.5rem",
                    color: "#6aa3ff",
                  }}
                >
                  <Icon name="shield" size={18} />
                </div>
                <h4 style={{ margin: "0 0 0.25rem 0", fontSize: "0.875rem", fontWeight: "500", color: "#fff" }}>
                  Cofre seguro
                </h4>
                <p style={{ margin: "0", fontSize: "0.65rem", color: "var(--mut)" }}>50 itens protegidos</p>
              </div>
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-soft)",
                  borderRadius: 12,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(59,123,255,.18)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.5rem",
                    color: "#6aa3ff",
                  }}
                >
                  <Icon name="plus" size={18} />
                </div>
                <h4 style={{ margin: "0 0 0.25rem 0", fontSize: "0.875rem", fontWeight: "500", color: "#fff" }}>
                  Ações rápidas
                </h4>
                <p style={{ margin: "0", fontSize: "0.65rem", color: "var(--mut)" }}>Criar nova senha ou documento</p>
              </div>
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-soft)",
                  borderRadius: 12,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(59,123,255,.18)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.5rem",
                    color: "#6aa3ff",
                  }}
                >
                  <Icon name="clock" size={18} />
                </div>
                <h4 style={{ margin: "0 0 0.25rem 0", fontSize: "0.875rem", fontWeight: "500", color: "#fff" }}>
                  Acessado recentemente
                </h4>
                <p style={{ margin: "0", fontSize: "0.65rem", color: "var(--mut)" }}>12 itens nas últimas 24h</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h3>
              {items.length} {items.length === 1 ? "item" : "itens"}
            </h3>
            {items.map((i) => (
              <button
                key={i.id}
                className="row"
                role="option"
                aria-selected={i.id === selectedId ? "true" : "false"}
                onClick={() => onSelect(i.id)}
              >
                <ItemIcon item={i} />
                <div>
                  <b>{i.title}</b>
                  <span>{i.subtitle}</span>
                </div>
              </button>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

function Field({ label, children, actions }: { label: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <div className="f">
      <div className="grow">
        <label>{label}</label>
        {children}
      </div>
      {actions}
    </div>
  );
}

function ItemDetail({
  item,
  onFavorite,
  onCopy,
  onToast,
}: {
  item: VaultItem;
  onFavorite: () => void;
  onCopy: (text: string, label: string) => void;
  onToast: (m: string) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => setRevealed(false), [item.id]);

  const secret = item.secret ?? item.password ?? "";
  const lv = level(item.strength);
  const kind = item.category === "senhas" ? "Senha" : item.category === "arquivos" ? "Arquivo" : "Nota segura";
  const toggle = (
    <button className="mini" onClick={() => setRevealed((r) => !r)}>
      {revealed ? "Ocultar" : "Revelar"}
    </button>
  );
  const copyBtn = (text: string, label: string) => (
    <button className="mini" onClick={() => onCopy(text, label)}>
      Copiar
    </button>
  );

  return (
    <div>
      <div className="dh">
        <ItemIcon item={item} size={56} />
        <div>
          <h1>{item.title}</h1>
          <p>{kind}</p>
        </div>
        <div className="acts">
          <button className="ghost" onClick={onFavorite}>
            {item.favorite ? "Remover dos favoritos" : "Favoritar"}
          </button>
          <button className="ghost" onClick={() => onToast("Edição em breve")}>
            Editar
          </button>
        </div>
      </div>
      <div className="fields">
        {item.category === "arquivos" && (
          <>
            <Field label="Tamanho">
              <div className="v">{item.subtitle}</div>
            </Field>
            <Field
              label="Pasta"
              actions={
                <button className="mini" onClick={() => onToast("Download iniciado")}>
                  Baixar
                </button>
              }
            >
              <div className="v">{item.folder}</div>
            </Field>
          </>
        )}
        {item.category === "notas" && (
          <Field label="Conteúdo" actions={<>{toggle}{copyBtn(secret, "Conteúdo")}</>}>
            <div className={`v ${revealed ? "" : "pw"}`}>{revealed ? item.secret : "••••••••••••"}</div>
          </Field>
        )}
        {item.category === "senhas" && (
          <>
            <Field label="Usuário" actions={copyBtn(item.subtitle, "Usuário")}>
              <div className="v">{item.subtitle}</div>
            </Field>
            <Field label="Senha" actions={<>{toggle}{copyBtn(secret, "Senha")}</>}>
              <div className={`v ${revealed ? "" : "pw"}`}>{revealed ? item.password : "••••••••••"}</div>
              <div className="bar strength">
                <i style={{ width: `${item.strength}%`, background: lv.color }} />
              </div>
              <small style={{ color: lv.color }}>{lv.label}</small>
            </Field>
            <Field label="Site" actions={copyBtn(item.site ?? "", "Site")}>
              <div className="v link">{item.site}</div>
            </Field>
          </>
        )}
        {item.note && (
          <Field label="Observações">
            <div className="v note">{item.note}</div>
          </Field>
        )}
      </div>
      <div className="meta">
        <span className="chip">
          <Icon name="shield" size={14} />
          Criptografia de ponta a ponta
        </span>
        <span className="chip">
          <Icon name="clock" size={14} />
          Atualizado {item.updatedAt}
        </span>
      </div>
    </div>
  );
}

/* ---------- página ---------- */
export default function Dashboard() {
  const [items, setItems] = useState<VaultItem[]>(initialItems);
  const [filter, setFilter] = useState<Filter>("todos");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const { msg, show } = useToast();
  const reduce = useReducedMotion();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => matches(i, filter) && `${i.title} ${i.subtitle} ${i.site ?? ""}`.toLowerCase().includes(q));
  }, [items, filter, query]);

  // mantém a seleção sempre dentro da lista visível
  useEffect(() => {
    if (!visible.some((i) => i.id === selectedId)) {
      setSelectedId(visible[0]?.id ?? null);
    }
  }, [visible, selectedId]);

  const selected = visible.find((i) => i.id === selectedId) ?? null;

  const toggleFavorite = () => {
    if (!selected) return;
    setItems((prev) => prev.map((i) => (i.id === selected.id ? { ...i, favorite: !i.favorite } : i)));
    show(selected.favorite ? "Removido dos favoritos" : "Adicionado aos favoritos");
  };

  const copy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text).catch(() => undefined);
    show(`${label} copiado`);
  };

  return (
    <div className="app">
      <Sidebar items={items} filter={filter} onFilter={setFilter} />
      <ItemList
        items={visible}
        selectedId={selectedId}
        query={query}
        onQuery={setQuery}
        onSelect={setSelectedId}
        onAdd={() => show("Novo item em breve")}
      />
      <main className="panel detail">
        <AnimatePresence mode="wait" initial={false}>
          {selected ? (
            <motion.div
              key={selected.id}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <ItemDetail item={selected} onFavorite={toggleFavorite} onCopy={copy} onToast={show} />
            </motion.div>
          ) : (
            <div className="empty">Selecione um item para ver os detalhes.</div>
          )}
        </AnimatePresence>
      </main>
      <div className={`toast ${msg ? "on" : ""}`} role="status">
        {msg}
      </div>
    </div>
  );
}