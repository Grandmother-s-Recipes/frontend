import "../styles/recipes.css";

type regionCardProps = {
    activeRegion: string | null;
}

const RegionCard: React.FC<regionCardProps> = ({ activeRegion }) => {

    return (
        <>
            <h2 className="title">{activeRegion}</h2>
            <div className="recipeContainer">
                <br/>
                <div className="recipeTitle">filler recipe title</div>
                <br/>
                <div className="recipeText">filler recipe text</div>
            </div>
        </>
    )

}

export default RegionCard;