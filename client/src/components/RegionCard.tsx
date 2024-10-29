import "../styles/recipes.css";
import grandmaImage from '../assets/grandma.jpg';
import noRecipeGrandma from '../assets/grandma2.jpg';
import { useState } from 'react';
import { PacmanLoader } from 'react-spinners';

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

    const [grandmaMode, setGrandmaMode] = useState(false);
    const [grandmaAns, setGrandmaAns] = useState('');
    const [loadingAnswer, setLoadingAnswer] = useState(true);

    const URL = import.meta.env.VITE_API_URL;

    const handleAskGrandma = async (region : string | null) => {
        const response = await fetch(`${URL}/askgrandma/?region=${region}`);
        const answer = await response.json();
        setGrandmaAns(answer.response);
        setLoadingAnswer(false);
    }

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
                ) : grandmaMode === false ? (
                    <div className="recipeCard">
                        <div className="recipePictureNoRecipe">
                            <img className="noRecipe" src={noRecipeGrandma} alt="Your grandma says no recipes here yet."/>
                        </div>
                        <div className="recipeTitle">No recipes found for this region.
                            <button className="askGrandmaButton viewDetailsButton" onClick={ () => {
                                    setGrandmaMode(true);
                                    handleAskGrandma(activeRegion);
                                }
                            }><strong>Ask grandma?</strong></button></div>
                    </div>
                ) : loadingAnswer ? 
                (
                    <PacmanLoader
                    color="#3e5c7e"
                    cssOverride={{
                      marginLeft: 'auto',
                      marginRight: 'auto'
                    }}
                    margin={2}
                    size={25}
                    speedMultiplier={1}
                  />
                ) :
                <div className="grandma-answer">
                    <p>{grandmaAns}</p>
                    <p>Love, Nonna</p>
                </div>
                }
            </div>
       </>
      );
    };

export default RegionCard;

