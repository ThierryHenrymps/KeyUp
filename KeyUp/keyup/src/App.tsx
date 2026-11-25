import KeyUpLanding from "./pages/KeyUpLanding";
import DashboardLayout from "./components/dashboard/DashboardLayout";

export default function App() {
  return window.location.pathname.startsWith("/app") ? <DashboardLayout /> : <KeyUpLanding />;
}