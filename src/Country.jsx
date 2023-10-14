export default function Country({ country }) {
	return (
		<div className='country'>
			<div className='flag'>
				<img src={country.flags.png} />
			</div>

			<div className='info'>
				<h1>{country.name.common}</h1>
				<p>
					<span>population:</span>
					{country.population}
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
	)
}
