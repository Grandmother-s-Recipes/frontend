import { useState } from 'react'
import Map from './Map.tsx'

export default function App() {

	const [region, selectRegion] = useState()

	return (
		<>
		<div>Hello World!</div>
		<Map/>
		</>
	)
	}
