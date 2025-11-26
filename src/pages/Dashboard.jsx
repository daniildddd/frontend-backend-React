import React from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom'

const getUserData = () => ({
	username: localStorage.getItem('username') || 'Пользователь',
	progress: 75,
	technologiesCompleted: 15,
	technologiesTotal: 20,
	newNotifications: 3,
})

function Dashboard() {
	const userData = getUserData()

	return (
		<div className='dashboard-container'>
			<h1>👋 Привет, {userData.username}!</h1>
			<p className='dashboard-subtitle'>
				Ваш центр управления и прогресса в изучении технологий.
			</p>

			<div className='dashboard-grid'>
				<div className='widget progress-widget'>
					<h3>Общий Прогресс</h3>
					<div className='progress-bar-wrapper'>
						<div
							className='progress-fill'
							style={{ width: `${userData.progress}%` }}
						>
							{userData.progress}%
						</div>
					</div>
					<p>
						Изучено {userData.technologiesCompleted} из{' '}
						{userData.technologiesTotal} технологий.
					</p>
					<Link to='/statistics' className='widget-link'>
						Подробная статистика →
					</Link>
				</div>

				<div className='widget recent-technologies-widget'>
					<h3>Новые в трекере</h3>
					<ul>
						<li>
							<Link to='/technologies/1'>Vite 7.0</Link>
						</li>
						<li>
							<Link to='/technologies/2'>React 19 Hooks</Link>
						</li>
						<li>
							<Link to='/technologies/3'>PostgreSQL 16</Link>
						</li>
					</ul>
					<Link to='/technologies' className='widget-link'>
						Все технологии →
					</Link>
				</div>

				<div className='widget notifications-widget'>
					<h3>Уведомления</h3>
					{userData.newNotifications > 0 ? (
						<p className='notification-alert'>
							📬 У вас {userData.newNotifications} новых уведомлений!
						</p>
					) : (
						<p>✅ Уведомлений нет.</p>
					)}
					<Link to='/settings' className='widget-link'>
						Настройки уведомлений →
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
