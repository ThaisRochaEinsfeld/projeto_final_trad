import { NavLink, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <>
      <header className="admin-header">
        <div>
          <h1>Painel do Administrador</h1>
          <p>Bem-vindo, Administrador</p>
        </div>

        <button onClick={handleLogout}>↪ Sair</button>
      </header>

      <main className="admin-main">
        <nav className="admin-tabs">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Conteúdos
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Usuários
          </NavLink>

          <NavLink
            to="/admin/onboarding"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Ver Onboarding
          </NavLink>
        </nav>

        {children}
      </main>
    </>
  );
}

export default AdminLayout;