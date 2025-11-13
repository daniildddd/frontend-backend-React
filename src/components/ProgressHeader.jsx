import React from 'react'
import './ProgressHeader.css'

function ProgressHeader({ technologies }) {
	// Расчет статистики
	const totalCount = technologies.length
	const completedCount = technologies.filter(
		tech => tech.status === 'completed'
	).length
	const inProgressCount = technologies.filter(
		tech => tech.status === 'in-progress'
	).length
	const notStartedCount = technologies.filter(
		tech => tech.status === 'not-started'
	).length

	// Расчет процента выполнения
	const completionPercentage = Math.round((completedCount / totalCount) * 100)

	return (
		<div className='progress-header'>
			<div className='progress-header__stats'>
				<div className='stat-card stat-card--total'>
					<div className='stat-card__number'>{totalCount}</div>
					<div className='stat-card__label'>Всего технологий</div>
				</div>

				<div className='stat-card stat-card--completed'>
					<div className='stat-card__number'>{completedCount}</div>
					<div className='stat-card__label'>Изучено</div>
				</div>

				<div className='stat-card stat-card--in-progress'>
					<div className='stat-card__number'>{inProgressCount}</div>
					<div className='stat-card__label'>В процессе</div>
				</div>

				<div className='stat-card stat-card--not-started'>
					<div className='stat-card__number'>{notStartedCount}</div>
					<div className='stat-card__label'>Не начато</div>
				</div>
			</div>

			<div className='progress-header__progress-bar-container'>
				<div className='progress-header__header'>
					<span className='progress-header__label'>Общий прогресс</span>
					<span className='progress-header__percentage'>
						{completionPercentage}%
					</span>
				</div>

				<div className='progress-bar'>
					<div
						className='progress-bar__fill'
						style={{ width: `${completionPercentage}%` }}
						role='progressbar'
						aria-valuenow={completionPercentage}
						aria-valuemin='0'
						aria-valuemax='100'
						aria-label={`Прогресс обучения: ${completionPercentage}%`}
					/>
				</div>

				<p className='progress-header__info'>
					Вы уже прошли {completedCount} из {totalCount} технологий
				</p>
			</div>
		</div>
	)
}

export default ProgressHeader
