import React, { useState } from 'react'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'
import QuickActions from './components/QuickActions'
import './App.css'

function App() {
	// Шаг 2: Создание состояния для технологий
	const initialTechnologies = [
		{
			id: 1,
			title: 'React Components',
			description: 'Изучение базовых компонентов и их использования',
			status: 'not-started',
		},
		{
			id: 2,
			title: 'JSX Syntax',
			description: 'Освоение синтаксиса JSX и его особенностей',
			status: 'not-started',
		},
		{
			id: 3,
			title: 'State Management',
			description: 'Работа с состоянием компонентов и hooks',
			status: 'not-started',
		},
		{
			id: 4,
			title: 'Props и Drilling',
			description: 'Передача данных между компонентами',
			status: 'not-started',
		},
		{
			id: 5,
			title: 'React Hooks',
			description: 'Использование useState, useEffect и других hooks',
			status: 'not-started',
		},
		{
			id: 6,
			title: 'Routing с React Router',
			description: 'Создание многостраничного приложения',
			status: 'not-started',
		},
	]

	const [technologies, setTechnologies] = useState(initialTechnologies)
	const [filter, setFilter] = useState('all')

	// Шаг 3: Функция для изменения статуса технологии
	const updateTechnologyStatus = id => {
		setTechnologies(prevTechnologies =>
			prevTechnologies.map(tech => {
				if (tech.id === id) {
					const statusCycle = {
						'not-started': 'in-progress',
						'in-progress': 'completed',
						completed: 'not-started',
					}
					return { ...tech, status: statusCycle[tech.status] }
				}
				return tech
			})
		)
	}

	// Функция для фильтрации технологий
	const getFilteredTechnologies = () => {
		if (filter === 'all') return technologies
		return technologies.filter(tech => tech.status === filter)
	}

	const filteredTechnologies = getFilteredTechnologies()

	// Функции для QuickActions
	const markAllComplete = () => {
		setTechnologies(prevTechnologies =>
			prevTechnologies.map(tech => ({ ...tech, status: 'completed' }))
		)
	}

	const resetAll = () => {
		setTechnologies(prevTechnologies =>
			prevTechnologies.map(tech => ({ ...tech, status: 'not-started' }))
		)
	}

	const randomNext = () => {
		setTechnologies(prevTechnologies =>
			prevTechnologies.map(tech => {
				const statuses = ['not-started', 'in-progress', 'completed']
				const randomStatus =
					statuses[Math.floor(Math.random() * statuses.length)]
				return { ...tech, status: randomStatus }
			})
		)
	}

	return (
		<div className='app'>
			<header className='app__header'>
				<h1 className='app__title'>Трекер Изучения Технологий</h1>
				<p className='app__subtitle'>
					Отслеживайте ваш прогресс в изучении React
				</p>
			</header>

			<main className='app__main'>
				<ProgressHeader technologies={technologies} />

				<QuickActions
					technologies={technologies}
					onMarkAllComplete={markAllComplete}
					onResetAll={resetAll}
					onRandomNext={randomNext}
				/>

				{/* Шаг 5: Кнопки фильтрации */}
				<section className='app__filters'>
					<button
						className={`filter-btn ${
							filter === 'all' ? 'filter-btn--active' : ''
						}`}
						onClick={() => setFilter('all')}
					>
						Все ({technologies.length})
					</button>
					<button
						className={`filter-btn ${
							filter === 'not-started' ? 'filter-btn--active' : ''
						}`}
						onClick={() => setFilter('not-started')}
					>
						Не начато (
						{technologies.filter(t => t.status === 'not-started').length})
					</button>
					<button
						className={`filter-btn ${
							filter === 'in-progress' ? 'filter-btn--active' : ''
						}`}
						onClick={() => setFilter('in-progress')}
					>
						В процессе (
						{technologies.filter(t => t.status === 'in-progress').length})
					</button>
					<button
						className={`filter-btn ${
							filter === 'completed' ? 'filter-btn--active' : ''
						}`}
						onClick={() => setFilter('completed')}
					>
						Завершено (
						{technologies.filter(t => t.status === 'completed').length})
					</button>
				</section>

				<section className='app__section'>
					<h2 className='app__section-title'>Дорожная карта</h2>

					{/* Шаг 6: Отображение отфильтрованного списка технологий */}
					<div className='app__cards-grid'>
						{filteredTechnologies.length > 0 ? (
							filteredTechnologies.map(tech => (
								<TechnologyCard
									key={tech.id}
									id={tech.id}
									title={tech.title}
									description={tech.description}
									status={tech.status}
									onStatusChange={updateTechnologyStatus}
								/>
							))
						) : (
							<p className='app__no-results'>
								Нет технологий с выбранным фильтром
							</p>
						)}
					</div>
				</section>
			</main>

			<footer className='app__footer'>
				<p>&copy; 2025 Трекер технологий. Все права защищены.</p>
			</footer>
		</div>
	)
}

export default App
