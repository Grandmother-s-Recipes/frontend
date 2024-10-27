import React, {useState, useEffect } from 'react';
import "../styles/recipes.css";
import grandmaImage from '../assets/grandma.jpg';
import noRecipeGrandma from '../assets/grandma2.jpg';

interface Recipe {
    title: string;
    ingredients: string;
    servings: string;
    instructions: string;
    recipe_id: string | null;
    id: string | null;
}

type FavoritesProps = {
    onRecipeClick: (recipe: Recipe) => void;
  };

const Favorites: React.FC<FavoritesProps> = ({ onRecipeClick }) => {

    // const [hasError, setHasError] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<Recipe[]>([]);

    useEffect(() => {
        handleFetchFavorites();
    },[]);

    const URL: string = import.meta.env.VITE_API_URL;

    const handleFetchFavorites = async () => {
        const response = await fetch(`${URL}/favorites?user_id=${sessionStorage.user_id}`, {method: "GET",}).then((res) => res.json());
        let apiRecipes = [];
        for (let favorite of response) {
            apiRecipes.push(
                fetch(`${URL}/recipes?region=${favorite.recipe_id}`)
                .then((res) => res.json())
                .then((res) => res[0])
                .then((res) => Object.assign(res, {id: favorite.id}))
            )
        }
        Promise.all(apiRecipes)
            .then((res) => setFavorites(res));
	}

    const handleRemoveFromFavorites = async(recipe_id: string): Promise<void> => {
        try {
            // Remove from the database
            const response = await fetch(`${URL}/favorites/${recipe_id}`, {
                method: "DELETE",
                //credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(!response.ok) {
                throw new Error("Error removing this item from the favorites");
            }
            handleFetchFavorites();
            // Updates the view to remove the item
            // setFavorites((prevFavorites: Favorite[]) => 
            //     prevFavorites.filter(favorite => favorite.title !== recipe_id)
            // );

        } catch (error) {
            console.error("Error removing this item from the favorites: ", error);
        }
    }

    return (
        <>
            <h2 className="title">Favorite recipes</h2>
            <div className="recipeContainer">
                {favorites.length > 0 ? (
                    favorites.map((favorite, index) => (
                        <div className="recipeCard" key={index}>
                            <div className="recipePicture">
                                <img src={grandmaImage} alt="Your grandma."/>
                            </div>
                            <div className="recipeTitle">{favorite.title}</div>
                            <div className="viewDetails">
                                <button className="viewDetailsButton" onClick={() => onRecipeClick(favorite)}><strong>Grandmama says</strong></button>
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
            {/* {
                !favorites[0] ? (
                    <div>
                        <p>You have not saved any favorites. Go add some!</p>
                    </div>
                ) : (
                    <div>
                        {favorites.map((favorite, index) => (
                            <div key={index}>
                                <h3 key={index}> {favorite.title} </h3>
                                <p> Ingredients: {favorite.ingredients} </p>
                                <span> Servings: {favorite.servings} </span>
                                <p> Instructions: {favorite.instructions} </p>
                                <button onClick = {() => handleRemoveFromFavorites(favorite.id)}>Remove from Favorites</button>
                            </div>
                        ))}
                    </div>
                )
            } */}

        </>
    );
};

export default Favorites;