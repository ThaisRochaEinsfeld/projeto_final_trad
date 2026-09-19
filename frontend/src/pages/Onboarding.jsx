import { useEffect, useMemo, useState } from "react";
import "./Onboarding.css";

function Onboarding() {
  const [contents, setContents] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadData() {
      try {
        const [contentsResponse, categoriesResponse] =
          await Promise.all([
            fetch("http://localhost:3000/contents", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            fetch("http://localhost:3000/categories", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        const contentsData = await contentsResponse.json();
        const categoriesData = await categoriesResponse.json();

        if (contentsResponse.ok) {
          setContents(contentsData);
        }

        if (categoriesResponse.ok) {
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, [token]);

  const filteredContents = useMemo(() => {
    return contents.filter((content) => {
      const text = `${content.title} ${content.description}`
        .toLowerCase();

      const matchesSearch = text.includes(
        search.toLowerCase()
      );

      const matchesCategory =
        !selectedCategory ||
        content.categoryId === Number(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [contents, search, selectedCategory]);

  return (
    <div className="onboarding">
      <div className="onboarding-title">
        <div className="book-icon">📖</div>

        <div>
          <h1>Material de Onboarding</h1>
          <p>
            Bem-vindo! Aqui você encontra todo o conteúdo
            necessário para começar
          </p>
        </div>
      </div>

      <section className="progress-card">
        <div className="progress-header">
          <strong>Seu progresso</strong>
          <strong>0 / {contents.length} concluídos</strong>
        </div>

        <div className="progress-bar">
          <div className="progress-value" />
        </div>

        <p>0% completo — continue assim!</p>
      </section>

      <div className="content-filters">
        <input
          type="search"
          placeholder="🔍 Buscar por título ou descrição..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(event) =>
            setSelectedCategory(event.target.value)
          }
        >
          <option value="">Todas Categorias</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        {filteredContents.map((content, index) => (
          <article
            className="onboarding-item"
            key={content.id}
          >
            <div className="onboarding-item-top">
              <div>
                <span className="number-badge">
                  {index + 1}
                </span>

                {content.category && (
                  <span className="onboarding-category">
                    {content.category.name}
                  </span>
                )}
              </div>

              <button type="button" className="complete-button">
                ◯ Concluir
              </button>
            </div>

            <h2>{content.title}</h2>

            <p className="onboarding-description">
              {content.description}
            </p>
          </article>
        ))}
      </div>

      <p className="results-count">
        Mostrando {filteredContents.length} de{" "}
        {contents.length} conteúdos
      </p>
    </div>
  );
}

export default Onboarding;