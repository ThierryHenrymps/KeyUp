import KeyUpLanding from "./KeyUpLanding";
import DashboardLayout from "./components/layout/DashboardLayout";

// Sem biblioteca de rotas: /app abre o dashboard; qualquer outro caminho abre a landing page.
export default function App() {
  return window.location.pathname.startsWith("/app") ? <DashboardLayout /> : <KeyUpLanding />;
}
