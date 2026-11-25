import { Icon } from "../components/ui/Icon";

export default function Dashboard() {
  return (
    <main className="dash-content">
      <div style={{ minHeight: "200px", padding: "2rem" }}>
        <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.5rem", color: "var(--text-pure)" }}>Visão geral</h2>

        <div style={{ margin: "1rem 0" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <strong style={{ fontSize: "1.5rem", color: "var(--text-pure)" }}>5</strong>
            <small style={{ color: "var(--text-soft-white)" }}>itens</small>
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <strong style={{ fontSize: "1.5rem", color: "var(--text-pure)" }}>12</strong>
            <small style={{ color: "var(--text-soft-white)" }}>sites</small>
          </div>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <button style={{ padding: "0.5rem 0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--divider)", color: "var(--text-soft-white)", fontSize: "0.8125rem", marginRight: "0.5rem", marginBottom: "0.5rem", cursor: "pointer" }}>
            <Icon name="home" size={14} /> Visão geral
          </button>
          <button style={{ padding: "0.5rem 0.75rem", borderRadius: "8px", background: "none", border: "none", color: "var(--text-soft-white)", fontSize: "0.8125rem", cursor: "pointer" }}>
            <Icon name="lock" size={14} /> Senhas
          </button>
        </div>
      </div>
    </main>
  );
}