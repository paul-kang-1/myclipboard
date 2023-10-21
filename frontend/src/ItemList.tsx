import React, { useState, useEffect } from 'react'
import { main } from '../wailsjs/go/models'
import { GetBytes } from '../wailsjs/go/main/App'

const ItemList: React.FC = () => {
	const [data, setData] = useState<Array<main.Entry>>([])

	useEffect(() => {
		GetBytes().
			then((result) => {
				setData(result)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	return (
		<ul>
			{data.map((entry, index) => (
				handleEntry(entry, index)
			))}
		</ul>
	)
}

const handleEntry = (data: main.Entry, index: number) => {
	if (data.type == 0) {
		return <li key={index}>{atob(data.content)}</li>
	} else if (data.type == 1) {
		return <li key={index}>Not implemented yet</li>
	} else {
		return <li key={index}>Unidentified type</li>
	}
}

export default ItemList
