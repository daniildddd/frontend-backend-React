// src/pages/DataImportExport.jsx
import React, { useState, useEffect } from 'react'
import {
	Container,
	Typography,
	Button,
	Box,
	Paper,
	Alert,
	List,
	ListItem,
	ListItemText,
	Chip,
} from '@mui/material'

export default function DataImportExport() {
	const [technologies, setTechnologies] = useState([])
	const [status, setStatus] = useState('')
	const [isDragging, setIsDragging] = useState(false)

	useEffect(() => {
		loadFromLocalStorage()
	}, [])

	const loadFromLocalStorage = () => {
		try {
			const saved = localStorage.getItem('technologies')
			if (saved) {
				const parsed = JSON.parse(saved)
				setTechnologies(parsed)
				setStatus('Данные загружены из localStorage')
				setTimeout(() => setStatus(''), 3000)
			}
		} catch (error) {
			setStatus('Ошибка загрузки данных из localStorage')
			console.error('Ошибка загрузки:', error)
		}
	}

	const saveToLocalStorage = () => {
		try {
			localStorage.setItem('technologies', JSON.stringify(technologies))
			setStatus('Данные сохранены в localStorage')
			setTimeout(() => setStatus(''), 3000)
		} catch (error) {
			setStatus('Ошибка сохранения данных')
			console.error('Ошибка сохранения:', error)
		}
	}

	const exportToJSON = () => {
		try {
			const dataStr = JSON.stringify(technologies, null, 2)
			const dataBlob = new Blob([dataStr], { type: 'application/json' })
			const url = URL.createObjectURL(dataBlob)
			const link = document.createElement('a')
			link.download = 'technologies.json'
			link.href = url
			link.click()
			setStatus('Данные экспортированы в JSON файл')
			setTimeout(() => setStatus(''), 3000)
		} catch (error) {
			setStatus('Ошибка экспорта данных')
			console.error('Ошибка экспорта:', error)
		}
	}

	const handleFileUpload = file => {
		const reader = new FileReader()
		reader.onload = e => {
			try {
				const importedData = JSON.parse(e.target.result)
				if (Array.isArray(importedData)) {
					setTechnologies(importedData)
					localStorage.setItem('technologies', JSON.stringify(importedData))
					setStatus('Данные успешно импортированы')
					setTimeout(() => setStatus(''), 3000)
				} else {
					setStatus('Неверный формат файла')
				}
			} catch (error) {
				setStatus('Ошибка импорта данных')
				console.error('Ошибка импорта:', error)
			}
		}
		reader.readAsText(file)
	}

	const handleDragOver = e => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = () => setIsDragging(false)

	const handleDrop = e => {
		e.preventDefault()
		setIsDragging(false)
		const file = e.dataTransfer.files[0]
		if (file && file.type === 'application/json') {
			handleFileUpload(file)
		} else {
			setStatus('Пожалуйста, перетащите JSON файл')
		}
	}

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			<Typography variant='h4' gutterBottom>
				Импорт и Экспорт Данных
			</Typography>
			<Typography variant='body1' sx={{ mb: 3 }}>
				Управляйте данными о технологиях: экспортируйте в JSON или импортируйте.
			</Typography>

			{status && (
				<Alert severity='info' sx={{ mb: 3 }}>
					{status}
				</Alert>
			)}

			<Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
				<Button
					variant='contained'
					onClick={exportToJSON}
					disabled={technologies.length === 0}
				>
					Экспорт в JSON
				</Button>
				<Button variant='outlined' component='label'>
					Импорт из JSON
					<input
						type='file'
						accept='.json'
						hidden
						onChange={e =>
							e.target.files[0] && handleFileUpload(e.target.files[0])
						}
					/>
				</Button>
				<Button
					variant='outlined'
					onClick={saveToLocalStorage}
					disabled={technologies.length === 0}
				>
					Сохранить локально
				</Button>
				<Button variant='outlined' onClick={loadFromLocalStorage}>
					Загрузить локально
				</Button>
			</Box>

			<Paper
				sx={{
					p: 4,
					textAlign: 'center',
					bgcolor: isDragging ? 'action.hover' : 'background.paper',
					border: '2px dashed',
					borderColor: 'divider',
					cursor: 'pointer',
					mb: 4,
				}}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<Typography variant='body1'>Перетащите JSON-файл сюда</Typography>
				<Typography variant='body2' color='text.secondary'>
					или используйте кнопку импорта выше
				</Typography>
			</Paper>

			{technologies.length > 0 ? (
				<>
					<Typography variant='h5' gutterBottom>
						Загруженные технологии ({technologies.length})
					</Typography>
					<List>
						{technologies.map(tech => (
							<ListItem key={tech.id}>
								<ListItemText
									primary={tech.title}
									secondary={tech.description}
								/>
								<Chip label={tech.category} sx={{ mr: 1 }} />
								<Chip label={tech.status} color='primary' />
							</ListItem>
						))}
					</List>
				</>
			) : (
				<Typography variant='body1' sx={{ textAlign: 'center' }}>
					Нет данных для отображения. Импортируйте JSON файл или загрузите из
					localStorage.
				</Typography>
			)}
		</Container>
	)
}
