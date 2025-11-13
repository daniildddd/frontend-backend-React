import React, { useState, useEffect } from 'react'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'
import QuickActions from './components/QuickActions'
import TechnologyNotes from './components/TechnologyNotes'
import './App.css'

function App() {
	// Шаг 2: Создание состояния для технологий
	const initialTechnologies = [
		{
			id: 1,
			title: 'React Components',
			description: 'Изучение базовых компонентов и их использования',
			status: 'not-started',
			notes: '',
		},
		{
			id: 2,
			title: 'JSX Syntax',
			description: 'Освоение синтаксиса JSX и его особенностей',
			status: 'not-started',
			notes: '',
		},
		{
			id: 3,
			title: 'State Management',
			description: 'Работа с состоянием компонентов и hooks',
			status: 'not-started',
			notes: '',
		},
		{
			id: 4,
			title: 'Props и Drilling',
			description: 'Передача данных между компонентами',
			status: 'not-started',
			notes: '',
		},
		{
			id: 5,
			title: 'React Hooks',
			description: 'Использование useState, useEffect и других hooks',
			status: 'not-started',
			notes: '',
		},
		{
			id: 6,
			title: 'Routing с React Router',
			description: 'Создание многостраничного приложения',
			status: 'not-started',
			notes: '',
		},
	]

	const [technologies, setTechnologies] = useState(initialTechnologies)
	const [filter, setFilter] = useState('all')
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedTech, setSelectedTech] = useState(null)

	// Загружаем данные из localStorage при первом рендере
	useEffect(() => {
		const saved = localStorage.getItem('techTrackerData')
		if (saved) {
			try {
				setTechnologies(JSON.parse(saved))
			} catch (error) {
				console.error('Ошибка при загрузке данных из localStorage:', error)
			}
		}
	}, [])

	// Сохраняем технологии в localStorage при любом изменении
	useEffect(() => {
		localStorage.setItem('techTrackerData', JSON.stringify(technologies))
	}, [technologies])

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

	// Функция для обновления заметок технологии
	const updateTechnologyNotes = (techId, newNotes) => {
		setTechnologies(prevTech =>
			prevTech.map(tech =>
				tech.id === techId ? { ...tech, notes: newNotes } : tech
			)
		)
	}

	// Фильтрация по поисковому запросу
	const searchFilteredTechnologies = filteredTechnologies.filter(tech =>
		tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		tech.description.toLowerCase().includes(searchQuery.toLowerCase())
	)

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

				<div className='app__search-box'>
					<input
						type='text'
						placeholder='Поиск технологий по названию или описанию...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='search-input'
					/>
					<span className='search-result-count'>
						Найдено: {searchFilteredTechnologies.length}
					</span>
				</div>

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

					{/* Отображение отфильтрованного и отсортированного списка технологий */}
					<div className='app__cards-grid'>
						{searchFilteredTechnologies.length > 0 ? (
							searchFilteredTechnologies.map(tech => (
								<div key={tech.id} className='app__card-wrapper'>
									<TechnologyCard
										id={tech.id}
										title={tech.title}
										description={tech.description}
										status={tech.status}
										onStatusChange={updateTechnologyStatus}
									/>
									{selectedTech === tech.id && (
										<TechnologyNotes
											notes={tech.notes}
											onNotesChange={updateTechnologyNotes}
											techId={tech.id}
										/>
									)}
									<button
										className='app__toggle-notes-btn'
										onClick={() => setSelectedTech(selectedTech === tech.id ? null : tech.id)}
									>
										{selectedTech === tech.id ? 'Скрыть заметки' : 'Добавить заметку'}
									</button>
								</div>
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
