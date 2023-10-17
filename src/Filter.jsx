import { Popover } from '@headlessui/react'

export default function Filter({ filter }) {
	return (
		<Popover className='relative'>
			<Popover.Button className='open'>Filter by region</Popover.Button>
			<Popover.Panel className='absolute'>
				<div className='region-links'>
					<button onClick={() => filter('Africa')}>Africa</button>
					<button onClick={() => filter('Americas')}>Americas</button>
					<button onClick={() => filter('Asia')}>Asia</button>
					<button onClick={() => filter('Europe')}>Europe</button>
					<button onClick={() => filter('Oceania')}>Oceania</button>
					<button onClick={() => filter('Antarctic')}>Antartica</button>
				</div>
			</Popover.Panel>
		</Popover>
	)
}
