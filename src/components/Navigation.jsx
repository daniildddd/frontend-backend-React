import { Link, useLocation } from 'react-router-dom'
import { Switch, FormControlLabel, Box } from '@mui/material'

function Navigation({ isLoggedIn, username, onLogout, toggleTheme, darkMode }) {
	const location = useLocation()
	const isActive = path => location.pathname === path

	return (
		<Box sx={{ bgcolor: 'background.paper', boxShadow: 1, mb: 4 }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					p: 2,
				}}
			>
				{/* Лого */}
				<Box>
					<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
						<h2>Трекер технологий</h2>
					</Link>
				</Box>

				{/* Навигация */}
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
					{isLoggedIn && (
						<>
							<Link
								to='/dashboard'
								className={isActive('/dashboard') ? 'active' : ''}
							>
								Панель
							</Link>

							<Link
								to='/technologies'
								className={isActive('/technologies') ? 'active' : ''}
							>
								Технологии
							</Link>

							<Link
								to='/add-technology'
								className={isActive('/add-technology') ? 'active' : ''}
							>
								Добавить
							</Link>

							<Link
								to='/statistics'
								className={isActive('/statistics') ? 'active' : ''}
							>
								Статистика
							</Link>

							<Link
								to='/bulk-edit'
								className={isActive('/bulk-edit') ? 'active' : ''}
							>
								Массовое редактирование
							</Link>

							<Link
								to='/import-export'
								className={isActive('/import-export') ? 'active' : ''}
							>
								Импорт/Экспорт
							</Link>

							<Link
								to='/settings'
								className={isActive('/settings') ? 'active' : ''}
							>
								Настройки
							</Link>
						</>
					)}

					{/* Тёмная тема */}
					<FormControlLabel
						control={<Switch checked={darkMode} onChange={toggleTheme} />}
						label='Тёмная тема'
					/>

					{/* Логин/Логаут */}
					{isLoggedIn ? (
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<span>{username}</span>
							<button onClick={onLogout}>Выйти</button>
						</Box>
					) : (
						<Link to='/login'>Войти</Link>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default Navigation
