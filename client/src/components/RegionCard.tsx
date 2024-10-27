import "../styles/recipes.css";
import grandmaImage from '../assets/grandma.jpg';
import noRecipeGrandma from '../assets/grandma2.jpg';

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
    // Helper function to format ingredients from pipe-separated to list
    /*const formatIngredients = (ingredients: string) => {
        return ingredients.split('|').map((ingredient, index) => <li key={index}>{ingredient}</li>);
    };*/


    return (
        <>
            <h2 className="title">{activeRegion}</h2>
            <div className="recipeContainer">
                {recipes.length > 0 ? (
                    recipes.map((recipe, index) => (
                        <div className="recipeCard" key={index}>
                            <div className="recipePicture">
                                <img src={grandmaImage} alt="Your grandma."/>
                            </div>
                            <div className="recipeTitle">{recipe.title}</div>
                            <div className="viewDetails">
                                <button className="viewDetailsButton" onClick={() => onRecipeClick(recipe)}><strong>Grandmama says</strong></button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="recipeCard">
                        <div className="recipePictureNoRecipe">
                            <img className="noRecipe" src={noRecipeGrandma} alt="Your grandma says no recipes here yet."/>
                        </div>
                        <div className="recipeTitle">No recipes found for this region. Or maybe there is no grandmother here.</div>
                    </div>
                )}
            </div>
       </>
      );
    };

export default RegionCard;

