export default function Search({ submit }) {
	const handleChange = e => {
		submit(e.target.value)
	}

	return <input type='text' onChange={handleChange} />
}
