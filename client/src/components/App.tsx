import { useState, useEffect } from 'react'
import Map from './Map.tsx'
import Header from './Header.tsx'
import RegionCard from './RegionCard.tsx'
import Favorites from './Favorites.tsx'
import LoginForm from './LoginForm.tsx'
import "../styles/app.css";

export default function App() {

	const [view, setView] = useState("map")
	const [activeRegion, setActiveRegion] = useState<string | null>(null)
	const [loggedIn, setLoggedIn] = useState("no");

	useEffect(() => {
		pathFetcher();
	})

	//adds click events to each region on the map. Calls the below function viewRegion to change the view to the selected region
	function pathFetcher () {
		const paths = document.querySelectorAll('path');
		for (let i = 0; i < paths.length; i++) {
			let region = paths[i].getAttribute('region-name')
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
		setView("map");
	}

	//header bar login button functionality. This does not log in, it switches the view to the login form. Users will finish logging in from the login form
	function loginButtonFunction () {
		if (loggedIn === "no") {
			setView("loginForm");
		}
	}

	//this function is called on the login form. Authentication to come later
	function loginFunction () {
		if (loggedIn === "no") {
			setLoggedIn("yes");
			setView("map");		
		}
	}

	//logs the user out and resets the view to the default Map view
	function logoutFunction () {
		if (view !== "map") {
			setView("map");
		}
		if (loggedIn === "yes") {
			setLoggedIn("no");
		}
	}

	//switches the view to the Favorited Recipes view
	function viewFavorites () {
		setView("favorites");
	}

	//this function is called in the return of App.tsx. The result of this function determines what components are rendered
	function determineView () {
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
			return (<RegionCard activeRegion = { activeRegion }/>)
		}
		if (view === "favorites") {
			return (<Favorites/>)
		}
		if (view === "loginForm") {
			return (<LoginForm loginFunction = { loginFunction }/>)
		}
	}

	return (
		<>
			<Header loggedIn = { loggedIn } loginButtonFunction = { loginButtonFunction } logoutFunction = { logoutFunction } returnHome = { returnHome } viewFavorites = { viewFavorites }/>
			<br/>
			{determineView()}
		</>
	)
}
