import { useState, useEffect } from 'react'
import Map from './Map.tsx'
import Header from './Header.tsx'
import RegionCard from './RegionCard.tsx'

export default function App() {

	const [view, setView] = useState("map")
	const [activeRegion, setActiveRegion] = useState<string | null>(null)

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

	return (
		<>
		<Header returnHome = { returnHome }/>
		{view === "map" ? (
			<Map/>
		) : (
			<RegionCard activeRegion = { activeRegion }/>
		)}
		</>
	)
}
