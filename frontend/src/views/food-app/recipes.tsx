import React, { type Dispatch, type SetStateAction } from "react";
import { type RecipeDetail, type Recipes as RecipesType } from "./types";
import { constants } from "../../constants/constants";

interface RecipesProps {
  recipes: RecipesType;
  setSelectedRecipe: Dispatch<SetStateAction<RecipeDetail>>;
  setOffset: Dispatch<SetStateAction<number>>;
  offset: number;
}

function Recipes({
  recipes,
  setSelectedRecipe,
  setOffset,
  offset,
}: RecipesProps) {
  const totalPageNumber = recipes.totalResults;
  const isClickableMoreThanBtn =
    totalPageNumber < offset + constants.resultNumber;
  const getRecipeDetails = async (recipeId: number) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${constants.API_KEY}&includeNutrition=true`
      );
      const data = await response.json();

      setSelectedRecipe(data);
    } catch (error) {
      console.log("getRecipeDetails: ", error);
    }
  };

  const handleClickMoreThan = () => {
    setOffset(offset + constants.resultNumber);
  };
  return (
    <div>
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

      {recipes.results.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            className="btn"
            disabled={isClickableMoreThanBtn}
            onClick={handleClickMoreThan}
          >
            {isClickableMoreThanBtn ? "No Data" : "More than"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Recipes;
