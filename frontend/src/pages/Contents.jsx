import { useEffect, useState } from "react";
import "./Contents.css";

function Contents() {
  const [contents, setContents] = useState([]);
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  async function loadContents() {
    try {
      const response = await fetch("http://localhost:3000/contents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro ao carregar conteúdos.");
        return;
      }

      setContents(data);
    } catch (error) {
      console.error(error);
      setError("Não foi possível conectar ao servidor.");
    }
  }

  async function loadCategories() {
    try {
      const response = await fetch("http://localhost:3000/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCategories(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadContents();
    loadCategories();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    const body = {
      title,
      description,
      categoryId: categoryId ? Number(categoryId) : null,
    };

    const url = editingId
      ? `http://localhost:3000/contents/${editingId}`
      : "http://localhost:3000/contents";

    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = response.status === 204 ? null : await response.json();

      if (!response.ok) {
        setError(data?.message || "Erro ao salvar conteúdo.");
        return;
      }

      setMessage(
        editingId
          ? "Conteúdo atualizado com sucesso!"
          : "Conteúdo criado com sucesso!"
      );

      clearForm();
      await loadContents();
    } catch (error) {
      console.error(error);
      setError("Não foi possível conectar ao servidor.");
    }
  }

  function handleEdit(content) {
    setEditingId(content.id);
    setTitle(content.title);
    setDescription(content.description);
    setCategoryId(content.categoryId ?? "");
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este conteúdo?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/contents/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Erro ao excluir conteúdo.");
        return;
      }

      setMessage("Conteúdo excluído com sucesso!");
      await loadContents();
    } catch (error) {
      console.error(error);
      setError("Não foi possível conectar ao servidor.");
    }
  }

  function clearForm() {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setCategoryId("");
  }

  return (
    <div className="contents-grid">
      <section className="content-card">
        <h2>{editingId ? "Editar Conteúdo" : "Criar Novo Conteúdo"}</h2>

        <p>Adicione conteúdos para o onboarding de novos funcionários</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Título / Pergunta</label>
          <input
            id="title"
            type="text"
            placeholder="Qual a diferença entre x e y?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label htmlFor="description">Descrição / Resposta</label>

          <textarea
            id="description"
            placeholder="Descreva detalhadamente a resposta..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />

          <label htmlFor="category">Categoria</label>

          <select
            id="category"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
          >
            <option value="">Sem categoria</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label>Criador</label>

          <input type="text" value="Administrador" disabled />

          {error && <p className="form-error">{error}</p>}
          {message && <p className="form-success">{message}</p>}

          <button className="primary-button" type="submit">
            {editingId ? "Salvar Alterações" : "+ Criar Conteúdo"}
          </button>

          {editingId && (
            <button
              className="secondary-button"
              type="button"
              onClick={clearForm}
            >
              Cancelar edição
            </button>
          )}
        </form>
      </section>

      <section className="content-card">
        <h2>Conteúdos Cadastrados</h2>

        <p>Total: {contents.length} conteúdos</p>

        <div className="content-list">
          {contents.length === 0 ? (
            <p>Nenhum conteúdo cadastrado.</p>
          ) : (
            contents.map((content) => (
              <article className="content-item" key={content.id}>
                <div className="content-item-header">
                  <h3>{content.title}</h3>

                  <div className="content-actions">
                    <button
                      className="button-edit"
                      onClick={() => handleEdit(content)}
                      type="button"
                    >
                      Editar
                    </button>

                    <button
                      className="button-delete"
                      onClick={() => handleDelete(content.id)}
                      type="button"
                    >
                      Excluir
                    </button>
                  </div>
                </div>

                <p>{content.description}</p>

                {content.category && (
                  <span className="category-badge">
                    {content.category.name}
                  </span>
                )}
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Contents;
