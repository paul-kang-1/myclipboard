import React, { useState, useEffect, useRef } from 'react'
import { ReadAll } from '../wailsjs/go/backend/App'
import { backend } from '../wailsjs/go/models'
import { EventsOn, EventsEmit } from '../wailsjs/runtime/runtime'
import { ClipboardSetText } from '../wailsjs/runtime/runtime'
import './styles.css'

const ItemList: React.FC = () => {
	const [data, setData] = useState<Array<backend.Entry>>([])
	const lastItemRef = useRef<HTMLDivElement>(null)
	const scrollToBottom = () => {
		if (lastItemRef.current) {
			lastItemRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}
	const updateEntry = (entry: backend.Entry, index: number) => {
		ClipboardSetText(entry.content)
		setData([...data.slice(0, index), ...data.slice(index + 1)])
		EventsEmit("deleteData", entry.id.toString())
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
					return <div className='entry' key={index}>
						<p className='content'>{entry.content}</p>
						<button className='copyButton' onClick={() => updateEntry(entry, index)}>
							<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 438 511.52"><path fill-rule="nonzero" d="M141.44 0h172.68c4.71 0 8.91 2.27 11.54 5.77L434.11 123.1a14.37 14.37 0 0 1 3.81 9.75l.08 251.18c0 17.62-7.25 33.69-18.9 45.36l-.07.07c-11.67 11.64-27.73 18.87-45.33 18.87h-20.06c-.3 17.24-7.48 32.9-18.88 44.29-11.66 11.66-27.75 18.9-45.42 18.9H64.3c-17.67 0-33.76-7.24-45.41-18.9C7.24 480.98 0 464.9 0 447.22V135.87c0-17.68 7.23-33.78 18.88-45.42C30.52 78.8 46.62 71.57 64.3 71.57h12.84V64.3c0-17.68 7.23-33.78 18.88-45.42C107.66 7.23 123.76 0 141.44 0zm30.53 250.96c-7.97 0-14.43-6.47-14.43-14.44 0-7.96 6.46-14.43 14.43-14.43h171.2c7.97 0 14.44 6.47 14.44 14.43 0 7.97-6.47 14.44-14.44 14.44h-171.2zm0 76.86c-7.97 0-14.43-6.46-14.43-14.43 0-7.96 6.46-14.43 14.43-14.43h136.42c7.97 0 14.43 6.47 14.43 14.43 0 7.97-6.46 14.43-14.43 14.43H171.97zM322.31 44.44v49.03c.96 12.3 5.21 21.9 12.65 28.26 7.8 6.66 19.58 10.41 35.23 10.69l33.39-.04-81.27-87.94zm86.83 116.78-39.17-.06c-22.79-.35-40.77-6.5-53.72-17.57-13.48-11.54-21.1-27.86-22.66-48.03l-.14-2v-64.7H141.44c-9.73 0-18.61 4-25.03 10.41C110 45.69 106 54.57 106 64.3v319.73c0 9.74 4.01 18.61 10.42 25.02 6.42 6.42 15.29 10.42 25.02 10.42H373.7c9.75 0 18.62-3.98 25.01-10.38 6.45-6.44 10.43-15.3 10.43-25.06V161.22zm-84.38 287.11H141.44c-17.68 0-33.77-7.24-45.41-18.88-11.65-11.65-18.89-27.73-18.89-45.42v-283.6H64.3c-9.74 0-18.61 4-25.03 10.41-6.41 6.42-10.41 15.29-10.41 25.03v311.35c0 9.73 4.01 18.59 10.42 25.01 6.43 6.43 15.3 10.43 25.02 10.43h225.04c9.72 0 18.59-4 25.02-10.43 6.17-6.17 10.12-14.61 10.4-23.9z" /></svg>
						</button>
					</div>
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
