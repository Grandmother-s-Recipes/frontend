import React, {useState, useEffect } from 'react';

interface Favorite {
    title: string;
    ingredients: string;
    servings: number;
    instructions: string
}

const Favorites: React.FC = () => {

    const [hasError, setHasError] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    useEffect(() => {
        handleFetchFavorites();
    }, []);

    const handleFetchFavorites = async(): Promise<void> => {
        try {
            const response = await fetch('/favorites', {
                method: "GET",
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Could get the favorites from the database');
            }
            const favs: Favorite[] = await response.json();
            setFavorites(favs);
            
        } catch (error) {
            setHasError(true);
        }
    }

    const handleRemoveFromFavorites = async(recipe_id: string): Promise<void> => {
        try {
            // Remove from the database
            const response = await fetch(`favorites/${recipe_id}`, {
                method: "DELETE",
                credentials: 'include',
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
                hasError ? (
                    <div>
                        <p>There was an error finding your favorites.</p>
                    </div>
                ) : (
                    <div>
                        {favorites.map((favorite, index) => (
                            <div key={index}>
                                <h3 key={index}> {favorite.title} </h3>
                                <p> Ingredients: {favorite.ingredients} </p>
                                <span> Servings: {favorite.servings} </span>
                                <p> Instructions: {favorite.instructions} </p>
                                <button onClick = {() => handleRemoveFromFavorites(favorite.title)}>Remove</button>
                            </div>
                        ))}
                    </div>
                )
            }

        </>
    );
};

export default Favorites;