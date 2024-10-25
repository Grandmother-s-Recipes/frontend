import "../styles/recipes.css";

type Recipe = {
    title: string;
    ingredients: string;
    servings: string;
    instructions: string;
}

type RegionCardProps = {
    activeRegion: string | null;
    recipes: Recipe[]; 
};

const RegionCard: React.FC<RegionCardProps> = ({ activeRegion, recipes }) => {
    // Helper function to format ingredients from pipe-separated to list
    /*const formatIngredients = (ingredients: string) => {
        return ingredients.split('|').map((ingredient, index) => <li key={index}>{ingredient}</li>);
    };*/

    const API_URL: string = import.meta.env.VITE_API_URL;

    async function saveFavorite (recipe: Recipe) {
        await fetch(`${API_URL}/favorites`, {
                method: "POST",
                body: JSON.stringify({
                    user_id: sessionStorage.user_id,
                    recipe_id: recipe.title,
                    region: activeRegion,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        }


    return (
        <>
            <h2 className="title">{activeRegion}</h2>
            <div className="recipeContainer">
                {recipes.length > 0 ? (
                    recipes.map((recipe, index) => (
                        <div key={index}>
                            <div className="recipeTitle">{recipe.title}</div>
                            <br />
                            <div className="recipeText">
                                <strong>Ingredients:</strong> {recipe.ingredients}
                            </div>
                            <br />
                            <div className="recipeText">
                                <strong>Servings:</strong> {recipe.servings}
                            </div>
                            <br />
                            <div className="recipeText">
                                <strong>Instructions:</strong> {recipe.instructions}
                            </div>
                            <button onClick = {() => saveFavorite(recipe)}>Save Favorite</button>
                        </div>
                    ))
                ) : (
                    <p>No recipes found for this region. Or maybe there is no grandmother here</p>
                )}
            </div>
        </>
    );
};

export default RegionCard;
