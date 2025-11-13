import React, { useState } from 'react'
import Modal from './Modal'
import './QuickActions.css'

function QuickActions({
	technologies,
	onMarkAllComplete,
	onResetAll,
	onRandomNext,
}) {
	const [showExportModal, setShowExportModal] = useState(false)

	const handleExport = () => {
		const data = {
			exportedAt: new Date().toISOString(),
			technologies: technologies,
		}
		const dataStr = JSON.stringify(data, null, 2)
		console.log('Данные для экспорта:', dataStr)
		setShowExportModal(true)
	}

	return (
		<section className='quick-actions'>
			<h3 className='quick-actions__title'>Быстрые действия</h3>
			<div className='quick-actions__buttons'>
				<button
					className='quick-action-btn quick-action-btn--complete'
					onClick={onMarkAllComplete}
				>
					Отметить все как завершённые
				</button>
				<button
					className='quick-action-btn quick-action-btn--reset'
					onClick={onResetAll}
				>
					Сбросить все
				</button>
				<button
					className='quick-action-btn quick-action-btn--random'
					onClick={onRandomNext}
				>
					Случайный прогресс
				</button>
				<button
					className='quick-action-btn quick-action-btn--export'
					onClick={handleExport}
				>
					Экспорт данных
				</button>
			</div>
			<Modal
				isOpen={showExportModal}
				onClose={() => setShowExportModal(false)}
				title='Экспорт данных'
			>
				<p>Данные успешно подготовлены для экспорта!</p>
				<p>Проверьте консоль разработчика для просмотра данных.</p>
				<button
					className='modal-close-btn'
					onClick={() => setShowExportModal(false)}
				>
					Закрыть
				</button>
			</Modal>
		</section>
	)
}

export default QuickActions
