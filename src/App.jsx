import { useState, useEffect, useMemo, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Country from './Country'
import Search from './Search'
import Filter from './Filter'
import Detail from './Detail'
import { Route, Routes, useParams } from 'react-router-dom'

function App() {
	const [countries, setCountries] = useState([])
	const [currName, setCurrName] = useState('')
	const [currRegion, setCurrRegion] = useState('')
	const [isLoading, setIsLoading] = useState(Boolean)

	useEffect(() => {
		getCountries()
	}, [])

	const getCountries = async () => {
		setIsLoading(true)
		fetch(
			'https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population'
		)
			.then(response => response.json())
			.then(data => {
				setCountries(data)
			})
		setIsLoading(false)
	}
	const bigCountries = countries.filter(x => {
		return x.population >= 50000000
	})

	const search = value => {
		console.log(value)
		setCurrName(value)
		setCurrRegion('')
	}

	

	const getRegion = useCallback(region => {
		setCurrRegion(region)
		setCurrName('')
	}, [])

	const filteredCountries = useMemo(() => {
		if (!currName && !currRegion) {
			return bigCountries
		} else if (!currRegion) {
			return countries.filter(country =>
				country.name.common.toLowerCase().includes(currName.toLowerCase())
			)
		} else {
			return countries.filter(country => country.region === currRegion)
		}
	}, [countries, currName, currRegion])

	return !isLoading ? (
		<div className='home'>
			<div className='header'>
				<h1>Where in the world?</h1>
			</div>
			<div className='nav-bar'>
				<Search submit={search} />
				<Filter filter={getRegion} />
			</div>
			<div className='countries-grid'>
				{filteredCountries.map(country => (
					<Country key={crypto.randomUUID()} country={country} />
				))}
			</div>
		</div>
	) : (
		<h1>Loading</h1>
	)
}
function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<App />} />
			<Route path=':countryName' element={<Detail />} />
		</Routes>
	)
}

export default AppRoutes
