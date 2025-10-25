import { useState } from "react";
import "./styles.css";
import { initialRecipeDetail, type RecipeDetail, type Recipes } from "./types";

/**
 * TODO: Constants dosyasından okunacak
 */
const API_KEY = "a9a2db254bcb4527beabf7eb0b5a795b";
const resultNumber = 50;
const addRecipeInformation = true;

function FoodApp() {
  const [searchType, setSearchType] = useState<"recipes" | "nutriens">(
    "recipes"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipes>({
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
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${encodeURIComponent(
          query
        )}&number=${resultNumber}&addRecipeInformation=${addRecipeInformation}`
      );

      const data = (await response.json()) as Recipes;

      setRecipes(data);
    } finally {
      setLoading(false);
    }
  };

  const getRecipeDetails = async (recipeId: number) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`
      );
      const data = await response.json();

      setSelectedRecipe(data);
    } catch (error) {
      console.log("getRecipeDetails: ", error);
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

      {/* TODO: Component olacak */}
      <div className="search-section">
        <div className="search-tabs">
          <button
            className={`tab ${searchType === "recipes" ? "active" : ""}`}
            onClick={() => {
              setSearchType("recipes");
            }}
          >
            Search Recipes
          </button>
          <button
            onClick={() => {
              setSearchType("nutriens");
            }}
            className={`tab ${searchType === "nutriens" ? "active" : ""}`}
          >
            Search by Nutrients
          </button>
        </div>

        {/* TODO: Component olacak  */}
        {searchType === "recipes" ? (
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                type="text"
                placeholder="Search for recipes (e.g., pasta, chicken, vegetarian)..."
                className="search-input"
              />

              <button className="search-btn" type="submit">
                Search
              </button>
            </div>
          </form>
        ) : (
          <div>Search by Nutrients</div>
        )}
      </div>

      {/* TODO: Component olacak */}
      {recipes.results.length > 0 && (
        <div className="recipes-grid">
          {recipes.results.map((recipe) => (
            <div
              key={recipe.id}
              className="recipe-card"
              onClick={() => {
                getRecipeDetails(recipe.id);
              }}
            >
              <div className="recipe-image">
                <img src={recipe.image} alt={recipe.title} />

                <div className="recipe-overlay">
                  <span className="recipe-time">{recipe.readyInMinutes}</span>
                  {recipe.healthScore && (
                    <span className="health-score">
                      Health: {recipe.healthScore}
                    </span>
                  )}
                </div>
              </div>

              <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <div className="recipe-meta">
                  <span className="servings">
                    {recipe.servings || "N/A"} servings
                  </span>
                </div>
                <div>
                  {recipe.diets && recipe.diets.length > 0 && (
                    <div className="diet-tags">
                      {recipe.diets.slice(0, 3).map((diet, index) => (
                        <span key={index} className="diet-tag">
                          {diet}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/**TODO: Component olacak */}
      {selectedRecipe.id && (
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
                    <span>
                      {selectedRecipe.spoonacularScore.toFixed(2)}/100
                    </span>
                  </div>

                  <div className="detail-content">
                    <div className="ingredients-section" style={{
                        marginTop:"10px",
                        gridColumn: 'span 2'
                    }}>
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
                        <div className="nutrition-grid" style={{
                            gridColumn: 'span 2'
                        }}>
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
