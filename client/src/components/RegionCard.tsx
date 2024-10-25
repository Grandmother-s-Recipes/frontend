import "../styles/recipes.css";

interface Recipe {
  title: string;
  ingredients: string;
  servings: string;
  instructions: string;
}

type RegionCardProps = {
  activeRegion: string | null;
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
};

const RegionCard: React.FC<RegionCardProps> = ({ activeRegion, recipes, onRecipeClick }) => {
  return (
    <>
      <h2 className="title">{activeRegion}</h2>
      <div className="recipeContainer">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div
              key={index}
              className="recipeTitle"
              onClick={() => onRecipeClick(recipe)}
            >
              {recipe.title}
            </div>
          ))
        ) : (
          <p>No recipes found for this region. Or maybe there is no grandmother here.</p>
        )}
      </div>
    </>
  );
};

export default RegionCard;

