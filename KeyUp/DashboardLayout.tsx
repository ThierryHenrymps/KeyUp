import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AddItemModal from "../dashboard/AddItemModal";
import Dashboard from "../../pages/Dashboard";
import ItemView from "../../pages/ItemView";
import { initialPersonal, initialSites, type NewItem, type PersonalItem, type Selection, type Site } from "../../data/mockData";
import "../../keyup.css";
import "../../styles/dashboard.css";

export default function DashboardLayout() {
  const [sites, setSites] = useState<Site[]>(initialSites);
  const [personal, setPersonal] = useState<PersonalItem[]>(initialPersonal);
  const [selection, setSelection] = useState<Selection>({ kind: "home" });
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; kind: "site" | "personal" }>({ open: false, kind: "site" });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const closeModal = useCallback(() => setModal((m) => ({ ...m, open: false })), []);
  const openModal = (kind: "site" | "personal") => setModal({ open: true, kind });

  const save = (n: NewItem) => {
    const id = Date.now().toString(36);
    if (n.kind === "site") {
      setSites((s) => [...s, { id, name: n.name, url: n.url, user: n.user, lastAccess: "Agora" }]);
      setSelection({ kind: "site", id });
    } else {
      setPersonal((p) => [...p, { id, name: n.name, category: n.category, detail: "Item demonstrativo" }]);
      setSelection({ kind: "personal", id });
    }
    closeModal();
    setToast(`“${n.name}” foi adicionado.`);
  };

  const site = selection.kind === "site" ? sites.find((s) => s.id === selection.id) : undefined;
  const item = selection.kind === "personal" ? personal.find((p) => p.id === selection.id) : undefined;
  const title = selection.kind === "home" ? "Visão geral" : site?.name ?? item?.name ?? "Item";
  const key = selection.kind === "home" ? "home" : `${selection.kind}-${selection.id}`;

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg" aria-hidden="true"><i className="b1" /><i className="b2" /><i className="b3" /></div>
      <div className="dash">
        <Sidebar sites={sites} personal={personal} selection={selection} open={drawer}
          onClose={() => setDrawer(false)} onSelect={setSelection} onAdd={() => openModal("site")} />
        <div className="dash-main">
          <Header title={title} onMenu={() => setDrawer(true)} onAdd={() => openModal("site")} />
          <main className="dash-content">
            <AnimatePresence mode="wait">
              <motion.div key={key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                {selection.kind === "home"
                  ? <Dashboard sites={sites} personal={personal} onAdd={openModal} onOpenSite={(id) => setSelection({ kind: "site", id })} />
                  : <ItemView site={site} item={item} />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
      <AddItemModal open={modal.open} initialKind={modal.kind} onClose={closeModal} onSave={save} />
      <AnimatePresence>
        {toast && (
          <motion.div className="toast glass" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
