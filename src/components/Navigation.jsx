import { Link, useLocation } from 'react-router-dom'

function Navigation() {
	const location = useLocation()

	const isLinkActive = path => location.pathname === path

	return (
		<nav className='main-navigation'>
			<div className='nav-brand'>
				<Link to='/'>
					<h2>🚀 Трекер технологий</h2>
				</Link>
			</div>
			<ul className='nav-menu'>
				<li>
					<Link to='/' className={isLinkActive('/') ? 'active' : ''}>
						Главная
					</Link>
				</li>
				<li>
					<Link
						to='/technologies'
						className={isLinkActive('/technologies') ? 'active' : ''}
					>
						Все технологии
					</Link>
				</li>
				<li>
					<Link
						to='/add-technology'
						className={isLinkActive('/add-technology') ? 'active' : ''}
					>
						Добавить технологию
					</Link>
				</li>
				{/* Дополнительные ссылки для самостоятельной работы */}
				<li>
					<Link
						to='/statistics'
						className={isLinkActive('/statistics') ? 'active' : ''}
					>
						Статистика
					</Link>
				</li>
				<li>
					<Link
						to='/settings'
						className={isLinkActive('/settings') ? 'active' : ''}
					>
						Настройки
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navigation
