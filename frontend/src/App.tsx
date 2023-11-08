import React from 'react'
import ItemList from './ItemList';
import Search from './Search';
import Settings from './Settings';
import NavigationBar from './NavigationBar';
import '@picocss/pico';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<main className='main-container'>
			<Router>
				<NavigationBar />
				<Routes>
					<Route path="/" element={<ItemList />} />
					<Route path="search" element={<Search />} />
					<Route path="settings" element={<Settings />} />
				</Routes>
			</Router>
		</main>
	)
}

export default App
