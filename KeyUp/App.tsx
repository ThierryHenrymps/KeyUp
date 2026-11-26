import KeyUpLanding from "./KeyUpLanding";
import Dashboard from "./dash/Dashboard";

// Sem biblioteca de rotas: /app abre o dashboard; qualquer outro caminho abre a landing page.
export default function App() {
  return (window.location.pathname.startsWith("/app") || window.location.pathname.startsWith("/dashboard")) ? <DashboardLayout /> : <KeyUpLanding />;
}
