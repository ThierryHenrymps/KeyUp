import { Icon } from "../components/ui/Icon";

export default function Dashboard() {
  return (
    <main className="dash-content">
      <div style={{ minHeight: "200px", padding: "2rem", color: "#ffffff" }}>
        <h2 style={{ margin: "0 0 1.5rem 0", fontSize: "1.5rem", color: "#ffffff" }}>Visão geral</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "1.5rem", color: "#ffffff" }}>
          {/* Safe Status Card */}
          <div style={{ padding: "1.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, transition: "transform 0.15s ease, border-color 0.15s ease" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(59,123,255,0.18)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
              <Icon name="shield" size={20} />
            </div>
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem", fontWeight: "500", color: "#ffffff" }}>Cofre seguro</h3>
            <p style={{ margin: "0", fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}>50 itens protegidos</p>
          </div>

          {/* Quick Actions Card */}
          <div style={{ padding: "1.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, transition: "transform 0.15s ease, border-color 0.15s ease" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(59,123,255,0.18)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
              <Icon name="plus" size={20} />
            </div>
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem", fontWeight: "500", color: "#ffffff" }}>Ações rápidas</h3>
            <p style={{ margin: "0", fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}>Criar nova senha ou documento</p>
          </div>

          {/* Recently Accessed Card */}
          <div style={{ padding: "1.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, transition: "transform 0.15s ease, border-color 0.15s ease" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(59,123,255,0.18)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
              <Icon name="clock" size={20} />
            </div>
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem", fontWeight: "500", color: "#ffffff" }}>Acessado recentemente</h3>
            <p style={{ margin: "0", fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}>12 itens nas últimas 24h</p>
          </div>
        </div>
      </div>
    </main>
  );
}