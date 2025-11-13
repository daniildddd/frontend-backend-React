import React from 'react'
import './TechnologyCard.css'

function TechnologyCard({ id, title, description, status, onStatusChange }) {
	// Обработчик клика для изменения статуса
	const handleClick = () => {
		if (onStatusChange) {
			onStatusChange(id)
		}
	}

	// Условное отображение иконок и статусов
	const getStatusIcon = () => {
		switch (status) {
			case 'completed':
				return '✓'
			case 'in-progress':
				return '⟳'
			case 'not-started':
				return '○'
			default:
				return '?'
		}
	}

	const getStatusLabel = () => {
		switch (status) {
			case 'completed':
				return 'Изучено'
			case 'in-progress':
				return 'В процессе'
			case 'not-started':
				return 'Не начато'
			default:
				return 'Неизвестно'
		}
	}

	return (
		<div
			className={`technology-card technology-card--${status}`}
			onClick={handleClick}
		>
			<div className='technology-card__header'>
				<span
					className={`technology-card__status-icon technology-card__icon--${status}`}
				>
					{getStatusIcon()}
				</span>
				<h3 className='technology-card__title'>{title}</h3>
			</div>

			<p className='technology-card__description'>{description}</p>

			<div className='technology-card__footer'>
				<span
					className={`technology-card__status-badge technology-card__badge--${status}`}
				>
					{getStatusLabel()}
				</span>
			</div>
		</div>
	)
}

export default TechnologyCard
