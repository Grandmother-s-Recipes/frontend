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
    const [selectedFavorite, setSelectedFavorite] = useState<Favorite | null>(null);

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
            {
                !favorites[0] ? (
                    <div>
                        <p>You have not saved any favorites. Go add some!</p>
                    </div>
                ) : (
                    <>
                        <div className="favorite-list">
                            {favorites.map((favorite, index) => (
                                <div className="favorite-card" key={index} onClick={() => {setSelectedFavorite(favorite)}}>
                                    <h3 className="favorite-title" key={index}> {favorite.title} </h3>
                                </div>
                            ))}
                        </div>
                        {selectedFavorite && (
                                <div className='favorite-modal'>
                                    <div className='favorite-modal-title'>{selectedFavorite.title}</div>
                                    <div className='favorite-modal-servings'><span className='bold'>Servings:</span> {selectedFavorite.servings}</div>
                                    <div className="favorite-modal-main-body">
                                        <div className="favorite-modal-ingredients">
                                            <span className='bold'>Ingredients:</span>
                                            {
                                                selectedFavorite.ingredients.split('|').map((ingredient:string, index) => (
                                                    <p key={index}>{ingredient}</p>
                                                ))
                                            }
                                        </div>
                                        <div className="favorite-modal-instructions">
                                        <span className='bold'>Instructions:</span>
                                            {
                                                selectedFavorite.instructions.split(". ").map((step:string, index) => (
                                                    <p key={index}>{step}.</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="buttons">
                                        <button className="favorite-modal-remove-button" onClick = {() => {handleRemoveFromFavorites(selectedFavorite.id); setSelectedFavorite(null)}}>Remove from Favorites</button>
                                        <button type="button" className="favorite-modal-close-button" onClick={(event) => {event.stopPropagation(); setSelectedFavorite(null)}}>Close</button>
                                    </div>
                                </div>
                        )}
                    </>
                )
            }

        </>
    );
};

export default Favorites;