import { type Dispatch, type FormEvent, type SetStateAction } from "react";
import type { SearchTypeProps } from ".";

interface SearchSectionProps {
  searchType: SearchTypeProps;
  setSearchType: Dispatch<SetStateAction<SearchTypeProps>>;
  handleSearch: (e: FormEvent) => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

function SearchSection({
  searchType,
  setSearchType,
  handleSearch,
  searchQuery,
  setSearchQuery,
}: SearchSectionProps) {
  return (
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
  );
}

export default SearchSection;
