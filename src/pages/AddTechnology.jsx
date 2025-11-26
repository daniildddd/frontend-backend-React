import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddTechnology() {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const navigate = useNavigate() // Используем хук для навигации

	const handleSubmit = e => {
		e.preventDefault()

		// Генерируем уникальный ID (простой способ для примера)
		const newId = Date.now()

		const newTechnology = {
			id: newId,
			title,
			description,
			status: 'not-started', // Начальный статус
			notes: '', // Пустые заметки
		}

		// Загружаем существующие данные
		const saved = localStorage.getItem('technologies')
		const technologies = saved ? JSON.parse(saved) : []

		// Добавляем новую технологию
		technologies.push(newTechnology)
		localStorage.setItem('technologies', JSON.stringify(technologies))

		alert(`Технология "${title}" успешно добавлена!`)

		// Перенаправляем пользователя на страницу со списком
		navigate('/technologies')
	}

	return (
		<div className='page'>
			<h1>Добавить новую технологию</h1>
			<form onSubmit={handleSubmit} className='add-form'>
				<div className='form-group'>
					<label htmlFor='title'>Название технологии:</label>
					<input
						id='title'
						type='text'
						value={title}
						onChange={e => setTitle(e.target.value)}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='description'>Краткое описание:</label>
					<textarea
						id='description'
						value={description}
						onChange={e => setDescription(e.target.value)}
						required
						rows='4'
					/>
				</div>
				<button type='submit' className='btn btn-primary'>
					Сохранить технологию
				</button>
			</form>
		</div>
	)
}

export default AddTechnology
