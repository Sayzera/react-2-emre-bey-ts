import { useState } from "react";
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
  const _name = 'sezer'

function FoodApp() {
  const [searchType, setSearchType] = useState<SearchTypeProps>("recipes");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<RecipesType>({
    results: [],
    number: 0,
    offset: 0,
    totalResults: 0,
  });
  const [selectedRecipe, setSelectedRecipe] =
    useState<RecipeDetail>(initialRecipeDetail);


  const searchRecipes = async (query: string) => {
    if (query.trim() == "") return;

    setLoading(true);

    try {
      const response = await fetch(
        `${spoonacularApi.BASE_URL}/${
          spoonacularApi.GET_RECIPES
        }/complexSearch?apiKey=${constants.API_KEY}&query=${encodeURIComponent(
          query
        )}&number=${constants.resultNumber}&addRecipeInformation=${constants.addRecipeInformation}`
      );

      const data = (await response.json()) as RecipesType;

      setRecipes(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchType === "recipes") {
      searchRecipes(searchQuery);
    }
  };
  return (
    <div className="food-app">
      <header className="app-header">
        <h1>Food Explorer</h1>
        <p>Discover amazing recipes and find food by nutrition</p>
      </header>

      <SearchSection
        searchType={searchType}
        setSearchType={setSearchType}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* TODO: Component olacak */}
      <Recipes recipes={recipes} setSelectedRecipe={setSelectedRecipe} />

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
