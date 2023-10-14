import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Country from './country'
import Search from './search'

function App() {
	const [countries, setCountries] = useState([])
	const [currName, setCurrName] = useState('')
	useEffect(() => {
		getCountries()
	}, [])

	const getCountries = async () => {
		fetch(
			'https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population'
		)
			.then(response => response.json())
			.then(data => {
				setCountries(data)
			})
	}
	const bigCountries = countries.filter(x => {
		return x.population >= 50000000
	})

	const search = value => {
		console.log(value)
		setCurrName(value)
	}
	return (
		<div className='home'>
			<div className='header'></div>
			<div className='nav-bar'>
				<Search submit={search} />
			</div>
			<div className='countries-grid'>
				{!currName
					? bigCountries.map(country => {
							return <Country country={country} />
					  })
					: countries
							.filter(country =>
								country.name.common
									.toLowerCase()
									.includes(currName.toLowerCase())
							)
							.map(country => <Country country={country} />)}
			</div>
		</div>
	)
}

export default App
