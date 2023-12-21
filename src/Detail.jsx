import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import GoBack from './GoBack'

export default function Detail() {
	const { countryName } = useParams()
	const [country, setCountry] = useState()
	const [isLoading, setIsLoading] = useState()

	const getCountry = async () => {
		setIsLoading(true)
		const response = await fetch(
			`https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,capital,flags,population,region,subregion,tld`
		)
		const data = await response.json()
		const countryData = data[0]

		setCountry({
			Name: countryData.name.common,
			Population: countryData.population.toLocaleString('en-US'),
			Region: countryData.region,
			Subregion: countryData.subregion,
			Capital: countryData.capital[0],
			'Top Level Domain': countryData.tld[0],
			Flag: countryData.flags.png,
		})

		setIsLoading(false)
	}

	useEffect(() => {
		getCountry()
	}, [])
	
	return !isLoading && country ? (
		<div className='home-detail'>
			<div className='header'>
				<h1>Where in the world?</h1>
			</div>
			<div className='back-home'>
				<GoBack />
			</div>
			<div className='detail-content'>
				<div className='detail-flag'>
					<img src={country.Flag} alt='' />
				</div>
				<div className='detail-info'>
					<h1>{country.Name}</h1>
					<dl>
						{Object.keys(country)
							.filter(key => key !== 'Flag')
							.map(key => (
								<div className='pair'>
									<dt>{key}:</dt>
									<dd>{country[key]}</dd>
								</div>
							))}
					</dl>
				</div>
			</div>
		</div>
	) : (
		<h1>Loading</h1>
	)
}
