import { Link } from 'react-router-dom'

export default function Country({ country }) {
	return (
		<Link to={country.name.common}>
			<div className='country'>
				<div className='flag'>
					<img src={country.flags.png} />
				</div>

				<div className='info'>
					<h1>{country.name.common}</h1>
					<p>
						<span>population:</span>
						{country.population.toLocaleString('en-US')}
					</p>
					<p>
						<span>region:</span>
						{country.region}
					</p>
					<p>
						<span>capital:</span>
						{country.capital[0]}
					</p>
				</div>
			</div>
		</Link>
	)
}
