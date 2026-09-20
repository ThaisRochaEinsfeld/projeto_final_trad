import { useEffect, useMemo, useState } from "react";
import "./Onboarding.css";

function Onboarding() {
  const [contents, setContents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [progress, setProgress] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadData() {
      try {
        const [
          contentsResponse,
          categoriesResponse,
          progressResponse,
        ] = await Promise.all([
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

          fetch("http://localhost:3000/progress", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const contentsData = await contentsResponse.json();
        const categoriesData = await categoriesResponse.json();
        const progressData = await progressResponse.json();

        if (contentsResponse.ok) {
          setContents(contentsData);
        }

        if (categoriesResponse.ok) {
          setCategories(categoriesData);
        }

        if (progressResponse.ok) {
          setProgress(progressData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, [token]);

  function isCompleted(contentId) {
    return progress.some(
      (item) =>
        item.contentId === contentId &&
        item.completed === true
    );
  }

  async function handleToggleComplete(contentId) {
    const completed = !isCompleted(contentId);

    try {
      const response = await fetch(
        `http://localhost:3000/progress/${contentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setProgress((currentProgress) => {
        const existingProgress = currentProgress.find(
          (item) => item.contentId === contentId
        );

        if (existingProgress) {
          return currentProgress.map((item) =>
            item.contentId === contentId
              ? data
              : item
          );
        }

        return [...currentProgress, data];
      });
    } catch (error) {
      console.error(error);
    }
  }

  const filteredContents = useMemo(() => {
    return contents.filter((content) => {
      const text =
        `${content.title} ${content.description}`.toLowerCase();

      const matchesSearch = text.includes(
        search.toLowerCase()
      );

      const matchesCategory =
        !selectedCategory ||
        content.categoryId === Number(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [contents, search, selectedCategory]);

  const completedCount = contents.filter((content) =>
    isCompleted(content.id)
  ).length;

  const progressPercentage =
    contents.length === 0
      ? 0
      : Math.round(
          (completedCount / contents.length) * 100
        );

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

          <strong>
            {completedCount} / {contents.length} concluídos
          </strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-value"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>

        <p>
          {progressPercentage}% completo — continue assim!
        </p>
      </section>

      <div className="content-filters">
        <input
          type="search"
          placeholder="🔍 Buscar por título ou descrição..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
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

              <button
                type="button"
                className="complete-button"
                onClick={() =>
                  handleToggleComplete(content.id)
                }
              >
                {isCompleted(content.id)
                  ? "✓ Concluído"
                  : "◯ Concluir"}
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