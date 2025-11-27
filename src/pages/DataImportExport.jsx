import { useState, useEffect } from 'react'
import './DataImportExport.css'

function DataImportExport({ showNotification }) {
	// состояние для списка технологий
	const [technologies, setTechnologies] = useState([])
	// состояние для перетаскивания файла
	const [isDragging, setIsDragging] = useState(false)

	// загрузка данных из localStorage при монтировании компонента
	useEffect(() => {
		loadFromLocalStorage()
	}, [])

	// функция загрузки данных из localStorage
	const loadFromLocalStorage = () => {
		try {
			const saved = localStorage.getItem('technologies')
			if (saved) {
				const parsed = JSON.parse(saved)
				setTechnologies(parsed)
				if (showNotification) {
					showNotification('Данные загружены из браузера', 'success')
				}
			}
		} catch (error) {
			if (showNotification) {
				showNotification('Ошибка загрузки данных', 'error')
			}
			console.error('Ошибка загрузки:', error)
		}
	}

	// функция сохранения данных в localStorage
	const saveToLocalStorage = () => {
		try {
			localStorage.setItem('technologies', JSON.stringify(technologies))
			if (showNotification) {
				showNotification('Данные сохранены в браузере', 'success')
			}
		} catch (error) {
			if (showNotification) {
				showNotification('Ошибка сохранения данных', 'error')
			}
			console.error('Ошибка сохранения:', error)
		}
	}

	// экспорт данных в JSON-файл
	const exportToJSON = () => {
		try {
			const dataStr = JSON.stringify(technologies, null, 2)
			const dataBlob = new Blob([dataStr], { type: 'application/json' })
			const url = URL.createObjectURL(dataBlob)
			const link = document.createElement('a')
			link.href = url
			link.download = `technologies_${
				new Date().toISOString().split('T')[0]
			}.json`

			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)

			URL.revokeObjectURL(url)

			if (showNotification) {
				showNotification('Данные экспортированы в JSON', 'success')
			}
		} catch (error) {
			if (showNotification) {
				showNotification('Ошибка экспорта данных', 'error')
			}
			console.error('Ошибка экспорта:', error)
		}
	}

	// импорт данных из JSON-файла
	const importFromJSON = event => {
		const file = event.target.files[0]
		if (!file) return

		const reader = new FileReader()

		reader.onload = e => {
			try {
				const imported = JSON.parse(e.target.result)

				if (!Array.isArray(imported)) {
					throw new Error('Неверный формат данных')
				}

				setTechnologies(imported)
				if (showNotification) {
					showNotification(
						`Импортировано ${imported.length} технологий`,
						'success'
					)
				}
			} catch (error) {
				if (showNotification) {
					showNotification('Ошибка импорта: неверный формат файла', 'error')
				}
				console.error('Ошибка импорта:', error)
			}
		}

		reader.readAsText(file)
		event.target.value = ''
	}

	// обработчики drag-and-drop
	const handleDragOver = e => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = () => {
		setIsDragging(false)
	}

	const handleDrop = e => {
		e.preventDefault()
		setIsDragging(false)

		const file = e.dataTransfer.files[0]
		if (file && file.type === 'application/json') {
			const reader = new FileReader()
			reader.onload = event => {
				try {
					const imported = JSON.parse(event.target.result)
					if (Array.isArray(imported)) {
						setTechnologies(imported)
						if (showNotification) {
							showNotification(
								`Импортировано ${imported.length} технологий`,
								'success'
							)
						}
					}
				} catch (error) {
					if (showNotification) {
						showNotification('Ошибка импорта: неверный формат файла', 'error')
					}
				}
			}
			reader.readAsText(file)
		} else {
			if (showNotification) {
				showNotification('Пожалуйста, выберите JSON файл', 'warning')
			}
		}
	}

	return (
		<div className='page data-import-export'>
			<h1>Импорт и экспорт данных</h1>
			<p className='subtitle'>
				Экспортируйте свои данные в JSON или импортируйте из файла
			</p>

			{/* кнопки управления */}
			<div className='controls'>
				<button
					onClick={exportToJSON}
					disabled={technologies.length === 0}
					className='btn-export'
					aria-label='Экспортировать данные в JSON файл'
				>
					Экспорт в JSON
				</button>

				<label className='file-input-label'>
					Импорт из JSON
					<input
						type='file'
						accept='.json'
						onChange={importFromJSON}
						style={{ display: 'none' }}
						aria-label='Выберите JSON файл для импорта'
					/>
				</label>

				<button
					onClick={saveToLocalStorage}
					disabled={technologies.length === 0}
					className='btn-save'
					aria-label='Сохранить данные в браузер'
				>
					Сохранить локально
				</button>

				<button
					onClick={loadFromLocalStorage}
					className='btn-load'
					aria-label='Загрузить данные из браузера'
				>
					Загрузить локально
				</button>
			</div>

			{/* область drag-and-drop */}
			<div
				className={`drop-zone ${isDragging ? 'dragging' : ''}`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				role='region'
				aria-label='Область для перетаскивания файлов'
			>
				<p>Перетащите JSON-файл сюда</p>
				<p className='drop-zone-hint'>или используйте кнопку импорта выше</p>
			</div>

			{/* список импортированных технологий */}
			{technologies.length > 0 ? (
				<div className='technologies-list'>
					<h2>Загруженные технологии ({technologies.length})</h2>
					<div className='technologies-grid'>
						{technologies.map((tech, index) => (
							<div key={index} className='tech-card'>
								<h3>{tech.title}</h3>
								<p className='tech-description'>{tech.description}</p>
								<div className='tech-meta'>
									<span className='tech-category'>{tech.category}</span>
									<span className={`status status-${tech.status}`}>
										{tech.status}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className='empty-state'>
					<p>Нет данных для отображения</p>
					<p className='hint'>
						Импортируйте JSON файл или загрузите из localStorage
					</p>
				</div>
			)}
		</div>
	)
}

export default DataImportExport
