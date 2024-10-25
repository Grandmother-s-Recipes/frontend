
import "../styles/recipeDisplay.css";

interface Recipe {
    title: string;
    ingredients: string;
    servings: string;
    instructions: string;
  }

type RecipeModalProps = {
    selectedRecipe: Recipe,
    closeModal: Function
}

const RecipeModal: React.FC<RecipeModalProps> = ({ selectedRecipe, closeModal }) => {

    return (
        <div className="modal-content">
                <h2>{selectedRecipe.title}</h2>
                <p><strong>Ingredients:</strong> {selectedRecipe.ingredients}</p>
                <p><strong>Servings:</strong> {selectedRecipe.servings}</p>
                <p><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
                <button onClick={closeModal}>Close</button>
        </div>
    )
};

export default RecipeModal;