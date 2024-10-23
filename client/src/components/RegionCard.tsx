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
                <br/>
                <div>here is a video</div>
                <iframe width="420" height="315" src="https://youtube.com/embed/ydsgAYGUhYs?si=6OtuikzqmarTaXPC"></iframe>
            </div>
        </>
    )

}

export default RegionCard;