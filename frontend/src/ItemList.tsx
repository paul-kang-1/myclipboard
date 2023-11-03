import React, { useState, useEffect } from 'react'
import { ReadAll } from '../wailsjs/go/backend/App'
import { backend } from '../wailsjs/go/models'
import { EventsOn } from '../wailsjs/runtime/runtime'

const ItemList: React.FC = () => {
	const [data, setData] = useState<Array<backend.Entry>>([])

	useEffect(() => {
		ReadAll().
			then((result) => {
				setData(result)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	EventsOn("newData", () => {
		ReadAll().
			then((result) => {
				setData(result)
			})
			.catch((error) => {
				console.error(error)
			})
	}
	)

	return (
		<ul>
			{data.map((entry, index) => (
				handleEntry(entry, index)
			))}
		</ul>
	)
}

const handleEntry = (data: backend.Entry, index: number) => {
	if (data.type == 0) {
		return <li key={index}>{data.content}</li>
	} else if (data.type == 1) {
		return <li key={index}>Not implemented yet</li>
	} else {
		return <li key={index}>Unidentified type</li>
	}
}

export default ItemList
