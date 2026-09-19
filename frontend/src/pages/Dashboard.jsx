import { useNavigate } from "react-router-dom";
import Onboarding from "./Onboarding";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <>
      <header className="user-header">
        <div>
          <h1>Painel do Usuário</h1>
          <p>Bem-vindo, {user.name}</p>
        </div>

        <button onClick={handleLogout}>
          ↪ Sair
        </button>
      </header>

      <main className="user-main">
        <Onboarding />
      </main>
    </>
  );
}

export default Dashboard;