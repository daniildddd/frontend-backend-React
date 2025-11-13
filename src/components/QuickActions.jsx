import React from 'react'
import './QuickActions.css'

function QuickActions({
	technologies,
	onMarkAllComplete,
	onResetAll,
	onRandomNext,
}) {
	return (
		<section className='quick-actions'>
			<h3 className='quick-actions__title'>Быстрые действия</h3>
			<div className='quick-actions__buttons'>
				<button
					className='quick-action-btn quick-action-btn--complete'
					onClick={onMarkAllComplete}
				>
					✓ Отметить все как завершённые
				</button>
				<button
					className='quick-action-btn quick-action-btn--reset'
					onClick={onResetAll}
				>
					↺ Сбросить все
				</button>
				<button
					className='quick-action-btn quick-action-btn--random'
					onClick={onRandomNext}
				>
					⚡ Случайный прогресс
				</button>
			</div>
		</section>
	)
}

export default QuickActions
