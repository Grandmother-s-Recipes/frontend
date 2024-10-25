import React, {useState, useEffect } from 'react';

interface Favorite {
    title: string;
    ingredients: string;
    servings: number;
    instructions: string;
    recipe_id: string;
    id: string;
}

const Favorites: React.FC = () => {

    // const [hasError, setHasError] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    useEffect(() => {
        handleFetchFavorites();
    },[favorites]);

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

            // Updates the view to remove the item
            setFavorites((prevFavorites: Favorite[]) => 
                prevFavorites.filter(favorite => favorite.title !== recipe_id)
            );

        } catch (error) {
            console.error("Error removing this item from the favorites: ", error);
        }
    }

    return (
        <>
            <h2 className="title">Favorite recipes</h2>
            {
                !favorites ? (
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
                                <button onClick = {() => handleRemoveFromFavorites(favorite.id)}>Remove</button>
                            </div>
                        ))}
                    </div>
                )
            }

        </>
    );
};

export default Favorites;