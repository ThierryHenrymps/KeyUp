import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon, { type IconName } from "../ui/Icon";
import Avatar from "../ui/Avatar";
import { personalCategories, type PersonalItem, type Selection, type Site } from "../../data/mockData";

interface Props {
  sites: Site[]; personal: PersonalItem[]; selection: Selection;
  open: boolean; onClose: () => void;
  onSelect: (s: Selection) => void; onAdd: () => void;
}

const catIcon: Record<string, IconName> = { "Cartões": "card", "Documentos": "doc", "Senhas pessoais": "key", "Outros": "file" };

function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div style={{ overflow: "hidden" }} initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Sidebar({ sites, personal, selection, open, onClose, onSelect, onAdd }: Props) {
  const [query, setQuery] = useState("");
  const [sections, setSections] = useState({ personal: true, sites: true });
  const [closedCats, setClosedCats] = useState<Record<string, boolean>>({});
  const term = query.trim().toLowerCase();

  // Ordem A–Z recalculada a cada mudança: novos sites entram na posição correta.
  const sortedSites = useMemo(
    () => sites
      .filter((s) => !term || s.name.toLowerCase().includes(term))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" })),
    [sites, term],
  );
  const groups = useMemo(
    () => personalCategories
      .map((c) => ({ c, items: personal.filter((p) => p.category === c && (!term || p.name.toLowerCase().includes(term))) }))
      .filter((g) => !term || g.items.length > 0),
    [personal, term],
  );

  const isActive = (kind: string, id?: string) => selection.kind === kind && (!id || ("id" in selection && selection.id === id));
  const pick = (s: Selection) => { onSelect(s); onClose(); };
  const secOpen = (k: "personal" | "sites") => !!term || sections[k];
  const noResults = !!term && sortedSites.length === 0 && groups.every((g) => g.items.length === 0);

  return (
    <>
      <div className="sb-overlay" data-open={open} onClick={onClose} />
      <aside className="sb" data-open={open} aria-label="Biblioteca">
        <div className="sb-head">
          <span className="brand"><span className="brand-mark"><Icon name="key" size={16} /></span>KeyUp</span>
          <button className="icon-btn sb-close" onClick={onClose} aria-label="Fechar menu"><Icon name="x" /></button>
        </div>

        <div className="sb-search">
          <Icon name="search" size={16} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar na biblioteca" aria-label="Buscar na biblioteca" />
          {query && <button className="icon-btn" onClick={() => setQuery("")} aria-label="Limpar busca"><Icon name="x" size={14} /></button>}
        </div>

        <div className="sb-scroll">
          <button className={"sb-item" + (isActive("home") ? " on" : "")} aria-current={isActive("home") ? "page" : undefined}
            onClick={() => pick({ kind: "home" })}>
            <Icon name="home" /> Visão geral
          </button>

          <button className="sb-sec" aria-expanded={secOpen("personal")} onClick={() => setSections((s) => ({ ...s, personal: !s.personal }))}>
            <span className={"chev" + (secOpen("personal") ? " open" : "")}><Icon name="chevron" size={14} /></span>Pessoais
          </button>
          <Collapse open={secOpen("personal")}>
            {groups.map(({ c, items }) => (
              <div key={c} className="sb-group">
                <button className="sb-cat" aria-expanded={!closedCats[c]} onClick={() => setClosedCats((o) => ({ ...o, [c]: !o[c] }))}>
                  <Icon name={catIcon[c]} size={15} />{c}<em>{items.length}</em>
                </button>
                <Collapse open={!closedCats[c] || !!term}>
                  {items.map((p) => (
                    <button key={p.id} className={"sb-item sub" + (isActive("personal", p.id) ? " on" : "")}
                      aria-current={isActive("personal", p.id) ? "page" : undefined} onClick={() => pick({ kind: "personal", id: p.id })}>
                      {p.name}
                    </button>
                  ))}
                  {items.length === 0 && <p className="sb-empty">Nenhum item</p>}
                </Collapse>
              </div>
            ))}
          </Collapse>

          <button className="sb-sec" aria-expanded={secOpen("sites")} onClick={() => setSections((s) => ({ ...s, sites: !s.sites }))}>
            <span className={"chev" + (secOpen("sites") ? " open" : "")}><Icon name="chevron" size={14} /></span>Sites<em>{sortedSites.length}</em>
          </button>
          <Collapse open={secOpen("sites")}>
            {sortedSites.map((s) => (
              <motion.button layout="position" key={s.id} className={"sb-item" + (isActive("site", s.id) ? " on" : "")}
                aria-current={isActive("site", s.id) ? "page" : undefined} onClick={() => pick({ kind: "site", id: s.id })}>
                <Avatar name={s.name} icon={s.icon} size={22} />{s.name}
              </motion.button>
            ))}
            {sortedSites.length === 0 && !term && <p className="sb-empty">Nenhum site cadastrado</p>}
          </Collapse>
          {noResults && <p className="sb-empty">Nada encontrado para “{query}”.</p>}
        </div>

        <div className="sb-foot">
          <button className="btn btn-primary sb-add" onClick={onAdd}><Icon name="plus" size={16} /> Novo item</button>
        </div>
      </aside>
    </>
  );
}
