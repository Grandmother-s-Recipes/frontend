
import "../styles/recipeDisplay.css";

interface Recipe {
    title: string;
    ingredients: string;
    servings: string;
    instructions: string;
  }

type RecipeModalProps = {
    selectedRecipe: Recipe,
    closeModal: Function,
    addToFavorite: Function,
}

const RecipeModal: React.FC<RecipeModalProps> = ({ selectedRecipe, closeModal, addToFavorite }) => {

    return (
        <div className="modal-content">
            <div className="titleSection">
                <h2>{selectedRecipe.title}</h2>
            </div>
            <div className="servingsSection">
                <p><strong>Servings:</strong> {selectedRecipe.servings}</p>
            </div>
            <div className="recipeSection">
                <div className="ingredientsSection">
                    <p><strong>Ingredients:</strong></p>
                    {
                        selectedRecipe.ingredients.split('|').map((ingredient:string) => (
                            <p>{ingredient}</p>
                        ))
                    }
                </div>
                
                <div className="instructionsSection">
                    <p><strong>Instructions:</strong></p> 
                    {
                        selectedRecipe.instructions.split(". ").map((step:string) => (
                            <p>{step}.</p>
                        ))
                    }
                </div>
            </div>
            <div className="buttonSection">
                <button className="modalButton" onClick={addToFavorite}>Add to Favorites</button>
                <button className="modalButton" onClick={closeModal}>Close</button>
            </div>  
        </div>
    );
};

export default RecipeModal;