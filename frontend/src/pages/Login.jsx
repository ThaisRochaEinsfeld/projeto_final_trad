import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Não foi possível realizar o login.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-hero">
        <div className="hero-content">
          <div className="logo">O</div>

          <h1>Onboarding Platform</h1>

          <p>
            Tudo o que você precisa para começar sua jornada em um só lugar.
          </p>

          <div className="hero-card">
            <span>✓</span>
            <div>
              <strong>Aprenda no seu ritmo</strong>
              <p>Acesse os conteúdos e acompanhe seu progresso.</p>
            </div>
          </div>

          <div className="hero-card">
            <span>✓</span>
            <div>
              <strong>Acompanhe seu progresso</strong>
              <p>Veja tudo que já concluiu e o que ainda falta.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="login-form-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-heading">
            <h2>Bem-vindo de volta</h2>
            <p>Entre com seus dados para acessar a plataforma.</p>
          </div>

          <div className="form-field">
            <label htmlFor="email">E-mail</label>

            <input
              id="email"
              type="email"
              placeholder="seuemail@empresa.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Senha</label>

            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;