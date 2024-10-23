import "../styles/regionCard.css";

type regionCardProps = {
    activeRegion: string | null;
}

const RegionCard: React.FC<regionCardProps> = ({ activeRegion }) => {

    return (
        <h1>{activeRegion}</h1>
    )

}

export default RegionCard;