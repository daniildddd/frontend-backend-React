import { useNavigate } from 'react-router-dom'
import TechnologyForm from '../components/TechnologyForm'

function AddTechnology() {
	const navigate = useNavigate()

	const handleSave = formData => {
		// Генерируем уникальный ID
		const newId = Date.now()

		const newTechnology = {
			id: newId,
			...formData,
			status: 'not-started', // Начальный статус
		}

		// Загружаем существующие данные
		const saved = localStorage.getItem('technologies')
		const technologies = saved ? JSON.parse(saved) : []

		// Добавляем новую технологию
		technologies.push(newTechnology)
		localStorage.setItem('technologies', JSON.stringify(technologies))

		// Перенаправляем на страницу со списком
		navigate('/technologies')
	}

	const handleCancel = () => {
		navigate('/technologies')
	}

	return (
		<div className='page'>
			<TechnologyForm onSave={handleSave} onCancel={handleCancel} />
		</div>
	)
}

export default AddTechnology
