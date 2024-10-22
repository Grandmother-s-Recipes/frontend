import { useState } from 'react'
import Map from './Map.tsx'

export default function App() {

	const [region, selectRegion] = useState()

	function regionSelector () {
		
	}

	return (
		<>
		<div>Hello World!</div>
		<Map/>
		</>
	)
	}
