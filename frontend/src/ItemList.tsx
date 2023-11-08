import React, { useState, useEffect, useRef } from 'react'
import { ReadAll } from '../wailsjs/go/backend/App'
import { backend } from '../wailsjs/go/models'
import { EventsOn, EventsEmit } from '../wailsjs/runtime/runtime'
import { ClipboardSetText } from '../wailsjs/runtime/runtime'

const ItemList: React.FC = () => {
	const [data, setData] = useState<Array<backend.Entry>>([])
	const lastItemRef = useRef<HTMLDivElement>(null)
	const scrollToBottom = () => {
		if (lastItemRef.current) {
			lastItemRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}

	useEffect(() => {
		ReadAll().
			then((result) => {
				setData(result)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	useEffect(scrollToBottom, [data])

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
		<div>
			{data.map((entry, index) => {
				if (entry.type == 0) {
					return <article key={index} className='card'>
						<p>{entry.content}</p>
						<button onClick={() => {
							ClipboardSetText(entry.content)
							setData([...data.slice(0, index), ...data.slice(index + 1)])
							EventsEmit("deleteData", entry.id.toString())
						}}>Copy</button>
					</article>
				} else if (entry.type == 1) {
					return <article key={index}>Not implemented yet</article>
				} else {
					return <article key={index}>Unidentified type</article>
				}
			})}
			<div ref={lastItemRef} />
		</div>
	)
}

export default ItemList
