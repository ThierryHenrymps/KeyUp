import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AddItemModal from "./AddItemModal";
import Dashboard from "../../pages/Dashboard";
import ItemView from "../../pages/ItemView";
import { initialPersonal, initialSites, type Selection, type Site, type PersonalItem } from "../../data/mockData";
import "../../styles/keyup.css";
import "../../styles/dashboard.css";

export default function DashboardLayout() {
  const [sites] = useState<Site[]>(initialSites);
  const [personal] = useState<PersonalItem[]>(initialPersonal);
  const [selection, setSelection] = useState<Selection>({ kind: "home" });
  const [drawer, setDrawer] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const openModal = () => setDrawer(true);

  const site = selection.kind === "site" ? sites.find((s) => s.id === selection.id) : undefined;
  const item = selection.kind === "personal" ? personal.find((p) => p.id === selection.id) : undefined;
  const title = selection.kind === "home" ? "Visão geral" : site?.name ?? item?.name ?? "Item";
  const key = selection.kind === "home" ? "home" : `${selection.kind}-${selection.id}`;

  return (
    <MotionConfig reducedMotion="user">
      <div className="dash">
        <Sidebar
          sites={sites}
          personal={personal}
          selection={selection}
          open={drawer}
          onClose={() => setDrawer(false)}
          onSelect={setSelection}
          onAdd={() => { console.log('Adicionar item'); }}
        />
        <div className="dash-main">
          <Header title={title} onMenu={() => setDrawer(true)} onAdd={() => openModal()} />
          <main className="dash-content">
            <AnimatePresence mode="wait">
              <motion.div key={key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                {selection.kind === "home"
                  ? <Dashboard />
                  : <ItemView site={site} item={item} />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
      <AddItemModal />
      <AnimatePresence>
        {toast && (
          <motion.div className="toast glass" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}