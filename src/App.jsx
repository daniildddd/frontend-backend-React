import React from 'react'
import useTechnologies from './hooks/useTechnologies'
import ProgressBar from './components/ProgressBar'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'
import QuickActions from './components/QuickActions'
import TechnologyNotes from './components/TechnologyNotes'
import './App.css'

function App() {
	const { technologies, setTechnologies, updateStatus, updateNotes, progress } =
		useTechnologies()

	const [filter, setFilter] = React.useState('all')
	const [searchQuery, setSearchQuery] = React.useState('')
	const [selectedTech, setSelectedTech] = React.useState(null)

	// Функция для изменения статуса технологии
	const updateTechnologyStatus = id => {
		updateStatus(id)
	}

	// Функция для обновления заметок технологии
	const updateTechnologyNotes = (techId, newNotes) => {
		updateNotes(techId, newNotes)
	}

	// Функция для фильтрации технологий
	const getFilteredTechnologies = () => {
		if (filter === 'all') return technologies
		return technologies.filter(tech => tech.status === filter)
	}

	const filteredTechnologies = getFilteredTechnologies()

	// Фильтрация по поисковому запросу
	const searchFilteredTechnologies = filteredTechnologies.filter(
		tech =>
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
				<ProgressBar
					progress={progress}
					label='Общий прогресс'
					color='#4CAF50'
					animated={true}
					height={20}
				/>
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
						onChange={e => setSearchQuery(e.target.value)}
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
										onClick={() =>
											setSelectedTech(selectedTech === tech.id ? null : tech.id)
										}
									>
										{selectedTech === tech.id
											? 'Скрыть заметки'
											: 'Добавить заметку'}
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
