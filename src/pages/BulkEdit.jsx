import { useState, useEffect } from 'react'
import './BulkEdit.css'

function BulkEdit() {
	const [technologies, setTechnologies] = useState([])
	const [selectedIds, setSelectedIds] = useState([])
	const [bulkStatus, setBulkStatus] = useState('')
	const [showConfirm, setShowConfirm] = useState(false)

	// Загружаем технологии из localStorage
	useEffect(() => {
		const saved = localStorage.getItem('technologies')
		if (saved) {
			setTechnologies(JSON.parse(saved))
		}
	}, [])

	// Сохраняем изменения в localStorage
	const saveTechnologies = updatedTech => {
		setTechnologies(updatedTech)
		localStorage.setItem('technologies', JSON.stringify(updatedTech))
	}

	// Обработчик выбора одной технологии
	const handleToggleSelect = id => {
		setSelectedIds(prev =>
			prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
		)
	}

	// Выбрать все / Снять выбор со всех
	const handleSelectAll = () => {
		if (selectedIds.length === technologies.length) {
			setSelectedIds([])
		} else {
			setSelectedIds(technologies.map(tech => tech.id))
		}
	}

	// Применить новый статус к выбранным технологиям
	const handleApplyBulkStatus = () => {
		if (!bulkStatus || selectedIds.length === 0) return

		const updatedTechnologies = technologies.map(tech =>
			selectedIds.includes(tech.id) ? { ...tech, status: bulkStatus } : tech
		)

		saveTechnologies(updatedTechnologies)
		setSelectedIds([])
		setBulkStatus('')
		setShowConfirm(false)
	}

	// Удалить выбранные технологии
	const handleDeleteSelected = () => {
		const updatedTechnologies = technologies.filter(
			tech => !selectedIds.includes(tech.id)
		)
		saveTechnologies(updatedTechnologies)
		setSelectedIds([])
		setShowConfirm(false)
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

	const selectedCount = selectedIds.length

	return (
		<div className='page bulk-edit-page'>
			<h1>Массовое редактирование технологий</h1>
			<p className='subtitle'>
				Выберите несколько технологий для одновременного изменения статуса
			</p>

			{technologies.length === 0 ? (
				<div className='empty-state'>
					<p>Нет технологий для редактирования</p>
				</div>
			) : (
				<>
					{/* Панель управления */}
					<div
						className='bulk-controls'
						role='region'
						aria-label='Управление выбором'
					>
						<div className='selection-info'>
							<label className='select-all-checkbox'>
								<input
									type='checkbox'
									checked={selectedIds.length === technologies.length}
									onChange={handleSelectAll}
									aria-label='Выбрать все технологии'
								/>
								<span>
									Выбрано: {selectedCount} из {technologies.length}
								</span>
							</label>
						</div>

						{selectedCount > 0 && (
							<div className='bulk-actions'>
								<label htmlFor='bulk-status-select' className='sr-only'>
									Выберите новый статус
								</label>
								<select
									id='bulk-status-select'
									value={bulkStatus}
									onChange={e => setBulkStatus(e.target.value)}
									aria-label='Выбор статуса для выбранных технологий'
								>
									<option value=''>Выберите статус...</option>
									<option value='not-started'>Не начато</option>
									<option value='in-progress'>В процессе</option>
									<option value='completed'>Завершено</option>
								</select>

								<button
									onClick={() => setShowConfirm(true)}
									disabled={!bulkStatus}
									className='btn-apply'
									aria-label={`Применить статус к ${selectedCount} технологиям`}
								>
									Применить статус
								</button>

								<button
									onClick={() => setShowConfirm(true)}
									className='btn-delete'
									aria-label={`Удалить ${selectedCount} выбранных технологий`}
								>
									Удалить выбранные
								</button>
							</div>
						)}
					</div>

					{/* Список технологий с чекбоксами */}
					<div className='technologies-list' role='list'>
						{technologies.map(tech => (
							<div
								key={tech.id}
								className={`technology-item ${
									selectedIds.includes(tech.id) ? 'selected' : ''
								}`}
								role='listitem'
							>
								<label className='technology-checkbox'>
									<input
										type='checkbox'
										checked={selectedIds.includes(tech.id)}
										onChange={() => handleToggleSelect(tech.id)}
										aria-label={`Выбрать ${tech.title}`}
									/>
									<div className='technology-info'>
										<h3>{tech.title}</h3>
										<p>{tech.description}</p>
										<span className={`status status-${tech.status}`}>
											{getStatusLabel(tech.status)}
										</span>
									</div>
								</label>
							</div>
						))}
					</div>

					{/* Модальное окно подтверждения */}
					{showConfirm && (
						<div
							className='modal-overlay'
							onClick={() => setShowConfirm(false)}
							role='dialog'
							aria-modal='true'
							aria-labelledby='confirm-title'
						>
							<div className='modal-content' onClick={e => e.stopPropagation()}>
								<h2 id='confirm-title'>Подтверждение действия</h2>
								<p>
									Вы уверены, что хотите{' '}
									{bulkStatus ? 'изменить статус' : 'удалить'} {selectedCount}{' '}
									технологий?
								</p>
								<div className='modal-actions'>
									<button
										onClick={
											bulkStatus ? handleApplyBulkStatus : handleDeleteSelected
										}
										className='btn-confirm'
									>
										Подтвердить
									</button>
									<button
										onClick={() => setShowConfirm(false)}
										className='btn-cancel'
									>
										Отмена
									</button>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default BulkEdit
