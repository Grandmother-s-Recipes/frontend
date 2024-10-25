import { useState, useEffect } from 'react'
import Map from './Map.tsx'
import Header from './Header.tsx'
import RegionCard from './RegionCard.tsx'
import Favorites from './Favorites.tsx'
import LoginForm from './LoginForm.tsx'
import "../styles/app.css";
import { PacmanLoader } from 'react-spinners'

export default function App() {


	const URL = import.meta.env.VITE_API_URL;

	const [view, setView] = useState("map")
	const [activeRegion, setActiveRegion] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [recipes, setRecipes] = useState([]); //I added this state for memorizing the recipes called from the API
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		pathFetcher();
	})
      
  // Sets the state for logging in and sets the view to map on logging in and logging out.
	function handleLoggedInState(loggedIn: boolean) {
		setIsLoggedIn(loggedIn);
		setView("map");
	}
    
    //I added this useEffect and i also added activeRegion in line 24 
	useEffect(() => {
		if(activeRegion) {
			fetchRecipesForRegion(activeRegion);
		}
	}, [activeRegion])  //the effect will active only when activeRegion change

	const fetchRecipesForRegion = async (region: string) => {
		setLoading(true);
		try {
			const response = await fetch(`${URL}/recipes?region=${region}`);
			const data = await response.json();
			setRecipes(data);  // Save the recipe in the state 'recipes'
		} catch (error) {
			console.error(error);
		}
		setLoading(false);

	}

	//adds click events to each region on the map. Calls the below function viewRegion to change the view to the selected region
	function pathFetcher () {
		const paths = document.querySelectorAll('path');
		for (let i = 0; i < paths.length; i++) {
			let region = paths[i].getAttribute('region-name');
			paths[i].addEventListener('click', () => {viewRegion(region)});
		}
	}

	//changes the view to the selected region. This function is called by the above pathFetcher function
	function viewRegion (region: string | null) {
		setActiveRegion(region);
		setView("region");
	}

	//returns to the default Map view
	function returnHome () {
		setActiveRegion(null);
		setRecipes([]);
		setView("map");
	}

	//header bar login button functionality. This does not log in, it switches the view to the login form. Users will finish logging in from the login form
	function loginButtonFunction () {
		if (!isLoggedIn) {
			setView("loginForm");
		}
	}

	//switches the view to the Favorited Recipes view
	function viewFavorites () {
		setView("favorites");
	}

	//this function is called in the return of App.tsx. The result of this function determines what components are rendered
	function determineView () {
		if(loading) {
			return <div><PacmanLoader
			color="#3e5c7e"
			cssOverride={{
			  'marginLeft': 'auto',
			  'marginRight': 'auto'
			}}
			margin={2}
			size={25}
			speedMultiplier={1}
		  /></div>;
		}

		if (view === "map") {
			return (
				<>
					<div>Select a region of Italy to get started!</div>
					<br/>
					<Map/>
				</>
			)
		}
		if (view === "region") {
			return (<RegionCard activeRegion = { activeRegion } recipes= {recipes}/>);
		}
		if (view === "favorites") {
			return (<Favorites/>)
		}
		if (view === "loginForm") {
			return (<LoginForm handleLoggedInState = { handleLoggedInState }/>)
		}
	}

	return (
		<>
			<Header isLoggedIn = { isLoggedIn } loginButtonFunction = { loginButtonFunction } handleLoggedInState = { handleLoggedInState } returnHome = { returnHome } viewFavorites = { viewFavorites }/>
			<br/>
			{determineView()}
		</>
	)
}
