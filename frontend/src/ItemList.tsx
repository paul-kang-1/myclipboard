import React, { useState, useEffect } from 'react'
import { ReadAll } from '../wailsjs/go/backend/App'
import { backend } from '../wailsjs/go/models'
import { EventsOn } from '../wailsjs/runtime/runtime'
import { ClipboardSetText } from '../wailsjs/runtime/runtime'

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
		// const newEntry: backend.Entry = {type: 0, content: atob(newData)}
		// LogInfo("Num entries: " + data.length)
		// setData([...data, newEntry])
	}
	)

	return (
		<div>
			{data.map((entry, index) => (
				handleEntry(entry, index)
			))}
		</div>
	)
}

const handleEntry = (data: backend.Entry, index: number) => {
	if (data.type == 0) {
		return <article key={index} className='card'>
			<p>{data.content}</p>
			<button onClick={()=>ClipboardSetText(data.content)}>Copy</button>
			</article>
	} else if (data.type == 1) {
		return <article key={index}>Not implemented yet</article>
	} else {
		return <article key={index}>Unidentified type</article>
	}
}

export default ItemList
