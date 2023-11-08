import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const NavigationBar: React.FC = () => {
	return (
		<div className='navBar'>
			<nav>
				<ul>
					<li>
						<Link to="/">Clipboard</Link>
					</li>
					<li>
						<Link to="search">Search</Link>
					</li>
					<li>
						<Link to="settings">Settings</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default NavigationBar
