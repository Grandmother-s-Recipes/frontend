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

	function pathFetcher () {
		const paths = document.querySelectorAll('path');
		for (let i = 0; i < paths.length; i++) {
			let region = paths[i].getAttribute('region-name')
			paths[i].addEventListener('click', () => {viewRegion(region)});
		}
	}

	function viewRegion (region: string | null) {
		setActiveRegion(region);
		setView("region");
	}

	function returnHome () {
		setActiveRegion(null);
		setView("map");
	}

	function loginButtonFunction () {
		if (loggedIn === "no") {
			setView("loginForm");
		}
	}

	function loginFunction () {
		if (loggedIn === "no") {
			setLoggedIn("yes");
			setView("map");		
		}
	}

	function logoutFunction () {
		if (view !== "map") {
			setView("map");
		}
		if (loggedIn === "yes") {
			setLoggedIn("no");
		}
	}

	function viewFavorites () {
		setView("favorites");
	}

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
