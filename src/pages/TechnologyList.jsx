import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function TechnologyList() {
	const [technologies, setTechnologies] = useState([])
	const navigate = useNavigate()

	// Загружаем технологии из localStorage
	useEffect(() => {
		const saved = localStorage.getItem('technologies')
		if (saved) {
			setTechnologies(JSON.parse(saved))
		}
	}, [])

	// Функция для циклического изменения статуса при клике на карточку
	const handleCardClick = techId => {
		const statusCycle = ['not-started', 'in-progress', 'completed']

		setTechnologies(prevTechnologies => {
			const updatedTechnologies = prevTechnologies.map(tech => {
				if (tech.id === techId) {
					const currentIndex = statusCycle.indexOf(tech.status)
					const nextStatus =
						statusCycle[(currentIndex + 1) % statusCycle.length]
					return { ...tech, status: nextStatus }
				}
				return tech
			})

			// Сохраняем в localStorage
			localStorage.setItem('technologies', JSON.stringify(updatedTechnologies))
			return updatedTechnologies
		})
	}

	// Переход к деталям при клике на ссылку
	const handleDetailsClick = (e, techId) => {
		e.stopPropagation() // Останавливаем всплытие, чтобы не изменять статус
		navigate(`/technology/${techId}`)
	}

	// Получаем читаемое название статуса
	const getStatusLabel = status => {
		const labels = {
			'not-started': 'Не начато',
			'in-progress': 'В процессе',
			completed: 'Завершено',
		}
		return labels[status] || status
	}

	return (
		<div className='page'>
			<div className='page-header'>
				<h1>Все технологии</h1>
				<Link to='/add-technology' className='btn btn-primary'>
					+ Добавить технологию
				</Link>
			</div>

			<p style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
				Совет: Кликните на карточку для изменения статуса
			</p>

			<div className='technologies-grid'>
				{technologies.map(tech => (
					<div
						key={tech.id}
						className='technology-item technology-item-clickable'
						onClick={() => handleCardClick(tech.id)}
						title='Кликните для изменения статуса'
					>
						<h3>{tech.title}</h3>
						<p>{tech.description}</p>
						<div className='technology-meta'>
							<span className={`status status-${tech.status}`}>
								{getStatusLabel(tech.status)}
							</span>
							<span
								className='btn-link'
								onClick={e => handleDetailsClick(e, tech.id)}
							>
								Подробнее →
							</span>
						</div>
					</div>
				))}
			</div>

			{technologies.length === 0 && (
				<div className='empty-state'>
					<p>Технологий пока нет.</p>
					<Link to='/add-technology' className='btn btn-primary'>
						Добавить первую технологию
					</Link>
				</div>
			)}
		</div>
	)
}

export default TechnologyList
