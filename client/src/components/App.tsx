import { useState, useEffect } from 'react'
import Map from './Map.tsx'

export default function App() {

	const [region, setRegion] = useState<string | null>()

	useEffect(() => {
		pathFetcher();
	})

	function pathFetcher () {
		const paths = document.querySelectorAll('path');
		for (let i = 0; i < paths.length; i++) {
			paths[i].addEventListener('click', () => {console.log(paths[i].getAttribute('region-name'))})
		}
	}

	return (
		<>
		<div>Hello World!</div>
		<Map/>
		</>
	)
	}
