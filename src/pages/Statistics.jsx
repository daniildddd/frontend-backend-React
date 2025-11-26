import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Statistics() {
	const [stats, setStats] = useState({
		total: 0,
		completed: 0,
		inProgress: 0,
		notStarted: 0,
	})

	useEffect(() => {
		const saved = localStorage.getItem('technologies')
		const technologies = saved ? JSON.parse(saved) : []

		const total = technologies.length
		const completed = technologies.filter(t => t.status === 'completed').length
		const inProgress = technologies.filter(
			t => t.status === 'in-progress'
		).length
		const notStarted = technologies.filter(
			t => t.status === 'not-started'
		).length

		const completionPercentage =
			total > 0 ? ((completed / total) * 100).toFixed(1) : 0

		setStats({
			total,
			completed,
			inProgress,
			notStarted,
			completionPercentage,
		})
	}, [])

	return (
		<div className='page statistics-page'>
			<h1>Статистика прогресса</h1>
			<div className='stats-grid'>
				<div className='stat-card'>
					<h3>Всего технологий</h3>
					<p className='stat-value'>{stats.total}</p>
				</div>
				<div className='stat-card completed'>
					<h3>Завершено</h3>
					<p className='stat-value'>{stats.completed}</p>
				</div>
				<div className='stat-card progress'>
					<h3>В процессе</h3>
					<p className='stat-value'>{stats.inProgress}</p>
				</div>
				<div className='stat-card not-started'>
					<h3>Не начато</h3>
					<p className='stat-value'>{stats.notStarted}</p>
				</div>
			</div>

			<div className='progress-bar-container'>
				<h2>Общий прогресс: {stats.completionPercentage}%</h2>
				<div className='progress-bar'>
					<div
						className='progress-fill'
						style={{ width: `${stats.completionPercentage}%` }}
					></div>
				</div>
			</div>

			{stats.total === 0 && (
				<div className='empty-state'>
					<p>Добавьте технологии, чтобы увидеть статистику.</p>
					<Link to='/add-technology' className='btn btn-primary'>
						Добавить
					</Link>
				</div>
			)}
		</div>
	)
}

export default Statistics
