import React from 'react'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'
import './App.css'

function App() {
	// Шаг 5: Создание тестовых данных
	const technologies = [
		{
			id: 1,
			title: 'React Components',
			description: 'Изучение базовых компонентов и их использования',
			status: 'completed',
		},
		{
			id: 2,
			title: 'JSX Syntax',
			description: 'Освоение синтаксиса JSX и его особенностей',
			status: 'in-progress',
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
			status: 'completed',
		},
		{
			id: 5,
			title: 'React Hooks',
			description: 'Использование useState, useEffect и других hooks',
			status: 'in-progress',
		},
		{
			id: 6,
			title: 'Routing с React Router',
			description: 'Создание многостраничного приложения',
			status: 'not-started',
		},
	]

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

				<section className='app__section'>
					<h2 className='app__section-title'>Дорожная карта</h2>

					{/* Шаг 6: Отображение списка технологий с помощью .map() */}
					<div className='app__cards-grid'>
						{technologies.map(tech => (
							<TechnologyCard
								key={tech.id}
								id={tech.id}
								title={tech.title}
								description={tech.description}
								status={tech.status}
							/>
						))}
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
