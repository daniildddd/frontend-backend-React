import { Link, useLocation } from 'react-router-dom'

function Navigation({ isLoggedIn, username, onLogout }) {
	const location = useLocation()

	const isLinkActive = path => location.pathname === path

	return (
		<nav className='main-navigation'>
			<div className='nav-brand'>
				<Link to='/'>
					<h2>Трекер технологий</h2>
				</Link>
			</div>
			<ul className='nav-menu'>
				<li>
					<Link to='/' className={isLinkActive('/') ? 'active' : ''}>
						Главная
					</Link>
				</li>
				<li>
					<Link to='/about' className={isLinkActive('/about') ? 'active' : ''}>
						О проекте
					</Link>
				</li>

				{/* Показываем эти ссылки только авторизованным пользователям */}
				{isLoggedIn && (
					<>
						<li>
							<Link
								to='/dashboard'
								className={isLinkActive('/dashboard') ? 'active' : ''}
							>
								Панель
							</Link>
						</li>
						<li>
							<Link
								to='/technologies'
								className={isLinkActive('/technologies') ? 'active' : ''}
							>
								Технологии
							</Link>
						</li>
						<li>
							<Link
								to='/add-technology'
								className={isLinkActive('/add-technology') ? 'active' : ''}
							>
								Добавить
							</Link>
						</li>
						<li>
							<Link
								to='/bulk-edit'
								className={isLinkActive('/bulk-edit') ? 'active' : ''}
							>
								Массовое ред.
							</Link>
						</li>
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
								to='/import-export'
								className={isLinkActive('/import-export') ? 'active' : ''}
							>
								Импорт/Экспорт
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
					</>
				)}

				{/* Кнопка входа/выхода */}
				{isLoggedIn ? (
					<li className='user-menu'>
						<span className='username'>{username}</span>
						<button onClick={onLogout} className='logout-btn'>
							Выйти
						</button>
					</li>
				) : (
					<li>
						<Link
							to='/login'
							className={`login-link ${isLinkActive('/login') ? 'active' : ''}`}
						>
							Войти
						</Link>
					</li>
				)}
			</ul>
		</nav>
	)
}

export default Navigation
