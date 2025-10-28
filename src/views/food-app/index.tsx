import { useEffect, useRef, useState } from "react";
import "./styles.css";
import {
  initialRecipeDetail,
  type RecipeDetail,
  type Recipes as RecipesType,
} from "./types";
import SearchSection from "./search-section";
import Recipes from "./recipes";
import { constants } from "../../constants/constants";
import { spoonacularApi } from "../../services/spoonacular/endpoint";

export type SearchTypeProps = "recipes" | "nutriens";

function FoodApp() {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchType, setSearchType] = useState<SearchTypeProps>("recipes");
  const [searchQuery, setSearchQuery] = useState<string>("");
  /**
   * typescript içerisinde yardımcı fonksiyonlardan içine eklenen herşeyi null yapan yardımcı fonksiyon nedir
   */
  const [customError, setCustomError] = useState<{
    isError?: boolean;
    errorMessage?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<RecipesType>({
    results: [],
    number: 0,
    offset: 0,
    totalResults: 0,
  });
  const [offset, setOffset] = useState(0);
  const [selectedRecipe, setSelectedRecipe] =
    useState<RecipeDetail>(initialRecipeDetail);

  // trigger more than
  useEffect(() => {
    if (offset > 0) {
      searchRecipes(searchQuery);
    }
  }, [offset]);



  const searchRecipes = async (query: string) => {
    if (query.trim() == "") return;

    setLoading(true);

    try {
      const response = await fetch(
        `${spoonacularApi.BASE_URL}/${
          spoonacularApi.GET_RECIPES
        }/complexSearch?apiKey=${constants.API_KEY}&query=${encodeURIComponent(
          query
        )}&offset=${offset}&number=${
          constants.resultNumber
        }&addRecipeInformation=${constants.addRecipeInformation}`
      );

      const data = (await response.json()) as RecipesType;

      if (!response.ok) {
        setCustomError({
          isError: true,
          errorMessage: data.message,
        });

        return;
      }

      // setRecipes(data);

      // önceki verileri tut, yeni geleni üzerine ekle
      // daha fazla butonunu tıklanıldımı
      // aynı verileri tekrar eklememesi gerekiyor

      setRecipes((prev) => {
        // defensive checks
        const prevResults = prev.results ?? [];

        if (offset === 0 || prevResults.length === 0) {
          return data;
        }

        const existingIds = new Set(prevResults.map((r) => r.id));
        const newUnique = data.results.filter((r) => !existingIds.has(r.id));

        return {
          ...data,
          results: [...prevResults, ...newUnique],
        };
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const inputVal = searchInputRef.current?.value

    /**
     * Kullanıcı more than yaptıktan sonra yeni bir arama yaparsa 
     * offset ve daha önce tuttuğu veriler sıfırlanmalı aynı zamanda kullanıcı 
     * aynı arama queryle search butonuna tıklarsa hiç bir aksiyon alınmamalı çünkü kullanıcı
     * aynı şeyi tekrara aramaya çalışıyordur
     */
 
    

    if (searchType === "recipes") {
    searchRecipes(searchQuery);
    }
  };

  if (customError.isError) {
    return (
      <div className="food-app">
        <div className="app-header">
          <div
            className="search-section"
            style={{
              color: "red",
            }}
          >
            <div>{customError.errorMessage}</div>

            <div
              style={{
                marginTop: "10px",
              }}
            >
              <button
                className="btn"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="food-app">
      <header className="app-header">
        <h1>Food Explorer</h1>
        <p>Discover amazing recipes and find food by nutrition</p>
      </header>

      <SearchSection
        searchInputRef={searchInputRef}
        searchType={searchType}
        setSearchType={setSearchType}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* TODO: Component olacak */}
      <Recipes
        recipes={recipes}
        setSelectedRecipe={setSelectedRecipe}
        setOffset={setOffset}
        offset={offset}
      />

      {/**TODO: Component olacak */}
      {!!selectedRecipe.id && (
        <div
          className="modal-overlay"
          onClick={() => {
            setSelectedRecipe(initialRecipeDetail);
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              className="close-btn"
              onClick={() => {
                setSelectedRecipe(initialRecipeDetail);
              }}
            >
              x
            </button>
            <div className="recipe-detail">
              <div className="detail-header">
                <img src={selectedRecipe.image} alt={selectedRecipe.title} />
                <h2>{selectedRecipe.title}</h2>
              </div>

              <div className="detail-info">
                <div className="detail-meta">
                  <span>{selectedRecipe.readyInMinutes}</span>
                  <span>{selectedRecipe.servings} servings | N/A</span>
                  <span>{selectedRecipe.spoonacularScore.toFixed(2)}/100</span>
                </div>

                <div className="detail-content">
                  <div
                    className="ingredients-section"
                    style={{
                      marginTop: "10px",
                      gridColumn: "span 2",
                    }}
                  >
                    <h3>Ingredients</h3>
                    <ul>
                      {selectedRecipe.extendedIngredients?.map(
                        (ingredient, index) => (
                          <li key={index}>
                            {ingredient.amount} {ingredient.unit}{" "}
                            {ingredient.name}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="instructions-section">
                    <h3>Instructions</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          selectedRecipe.instructions ||
                          "No instructions available.",
                      }}
                    />
                  </div>
                </div>

                {selectedRecipe.nutrition && (
                  <div className="nutrition-section">
                    <h3>Nutrition Facts</h3>
                    <div
                      className="nutrition-grid"
                      style={{
                        gridColumn: "span 2",
                      }}
                    >
                      {selectedRecipe.nutrition.nutrients
                        .slice(0, 8)
                        .map((nutrient, index) => (
                          <div key={index} className="nutrition-item">
                            <span className="nutrient-name">
                              {nutrient.name}
                            </span>
                            <span className="nutrient-amount">
                              {Math.round(nutrient.amount)} {nutrient.unit}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodApp;
