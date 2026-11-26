import KeyUpLanding from "./pages/KeyUpLanding";
import Dashboard from "./dash/Dashboard";

export default function App() {
  return (window.location.pathname.startsWith("/app") || window.location.pathname.startsWith("/dashboard")) ? <Dashboard /> : <KeyUpLanding />;
}