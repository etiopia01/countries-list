import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Country from './Country'
import Search from './Search'
import Filter from './Filter'

function App() {
	const [countries, setCountries] = useState([])
	const [currName, setCurrName] = useState('')
	const [currRegion, setCurrRegion] = useState('')
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
		setCurrRegion('')
	}

	const getRegion = region => {
		setCurrRegion(region)
		setCurrName('')
	}
	return (
		<div className='home'>
			<div className='header'>
				<h1>Where in the world?</h1>
			</div>
			<div className='nav-bar'>
				<Search submit={search} />
				<Filter filter={getRegion} />
			</div>
			<div className='countries-grid'>
				{!currName && !currRegion
					? bigCountries.map(country => {
							return <Country country={country} />
					  })
					: !currRegion
					? countries
							.filter(country =>
								country.name.common
									.toLowerCase()
									.includes(currName.toLowerCase())
							)
							.map(country => <Country country={country} />)
					: countries
							.filter(country => country.region === currRegion)
							.map(country => <Country country={country} />)}
			</div>
		</div>
	)
}

export default App
