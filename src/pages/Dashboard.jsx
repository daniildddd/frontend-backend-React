import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
	const [technologies, setTechnologies] = useState([])
	const [username, setUsername] = useState('')

	useEffect(() => {
		// Загружаем данные пользователя
		const user = localStorage.getItem('username') || 'Пользователь'
		setUsername(user)

		// Загружаем технологии
		const saved = localStorage.getItem('technologies')
		if (saved) {
			setTechnologies(JSON.parse(saved))
		}
	}, [])

	// Статистика
	const stats = {
		total: technologies.length,
		completed: technologies.filter(t => t.status === 'completed').length,
		inProgress: technologies.filter(t => t.status === 'in-progress').length,
		notStarted: technologies.filter(t => t.status === 'not-started').length,
	}

	const progress =
		stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

	// Последние добавленные технологии
	const recentTechnologies = technologies.slice(-3).reverse()

	return (
		<div className='page dashboard-page'>
			<h1>Привет, {username}!</h1>

			{/* Прогресс */}
			<div className='progress-widget'>
				<h2>Общий прогресс</h2>
				<div className='progress-bar-large'>
					<div
						className='progress-fill-large'
						style={{ width: `${progress}%` }}
					>
						<span>{progress}%</span>
					</div>
				</div>
				<p className='progress-text'>
					Изучено {stats.completed} из {stats.total} технологий
				</p>
			</div>

			{/* Статистика */}
			<div className='stats-grid-dashboard'>
				<div className='stat-card-dashboard total'>
					<div className='stat-icon'></div>
					<div className='stat-value'>{stats.total}</div>
					<div className='stat-label'>Всего технологий</div>
				</div>
				<div className='stat-card-dashboard completed'>
					<div className='stat-icon'></div>
					<div className='stat-value'>{stats.completed}</div>
					<div className='stat-label'>Завершено</div>
				</div>
				<div className='stat-card-dashboard progress'>
					<div className='stat-icon'></div>
					<div className='stat-value'>{stats.inProgress}</div>
					<div className='stat-label'>В процессе</div>
				</div>
				<div className='stat-card-dashboard not-started'>
					<div className='stat-icon'></div>
					<div className='stat-value'>{stats.notStarted}</div>
					<div className='stat-label'>Не начато</div>
				</div>
			</div>

			{/* Быстрые действия */}
			<div className='quick-actions'>
				<h2>Быстрые действия</h2>
				<div className='action-buttons'>
					<Link to='/add-technology' className='action-button add'>
						Добавить технологию
					</Link>
					<Link to='/technologies' className='action-button view'>
						Посмотреть все
					</Link>
					<Link to='/bulk-edit' className='action-button edit'>
						Массовое редактирование
					</Link>
					<Link to='/import-export' className='action-button import'>
						Импорт/Экспорт
					</Link>
				</div>
			</div>

			{/* Последние технологии */}
			{recentTechnologies.length > 0 && (
				<div className='recent-technologies'>
					<h2>Недавно добавленные</h2>
					<div className='recent-list'>
						{recentTechnologies.map(tech => (
							<Link
								key={tech.id}
								to={`/technology/${tech.id}`}
								className='recent-item'
							>
								<h3>{tech.title}</h3>
								<p>{tech.description}</p>
								<span className={`status status-${tech.status}`}>
									{tech.status}
								</span>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Dashboard
