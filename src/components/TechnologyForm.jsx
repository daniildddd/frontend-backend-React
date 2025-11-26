// src/components/TechnologyForm.jsx
import React, { useState, useEffect } from 'react'
import {
	TextField,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Box,
	Typography,
	IconButton,
	Alert,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

export default function TechnologyForm({ onSave, onCancel, initialData = {} }) {
	const [formData, setFormData] = useState({
		title: initialData.title || '',
		description: initialData.description || '',
		category: initialData.category || 'frontend',
		difficulty: initialData.difficulty || 'beginner',
		deadline: initialData.deadline || '',
		resources: initialData.resources || [''],
	})

	const [errors, setErrors] = useState({})

	const validate = () => {
		const newErrors = {}
		if (!formData.title.trim()) newErrors.title = 'Обязательное поле'
		if (!formData.description.trim())
			newErrors.description = 'Обязательное поле'
		return newErrors
	}

	const handleSubmit = e => {
		e.preventDefault()
		const validationErrors = validate()
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}
		onSave({ ...formData, id: initialData.id || Date.now() })
	}

	const handleResourceChange = (index, value) => {
		const newResources = [...formData.resources]
		newResources[index] = value
		setFormData({ ...formData, resources: newResources })
	}

	const addResource = () =>
		setFormData({ ...formData, resources: [...formData.resources, ''] })
	const removeResource = index => {
		setFormData({
			...formData,
			resources: formData.resources.filter((_, i) => i !== index),
		})
	}

	return (
		<Box
			component='form'
			onSubmit={handleSubmit}
			sx={{ maxWidth: 700, mx: 'auto', p: 3 }}
		>
			<Typography variant='h5' gutterBottom>
				{initialData.id ? 'Редактировать' : 'Добавить'} технологию
			</Typography>

			<TextField
				fullWidth
				margin='normal'
				label='Название'
				value={formData.title}
				onChange={e => setFormData({ ...formData, title: e.target.value })}
				error={!!errors.title}
				helperText={errors.title}
			/>

			<TextField
				fullWidth
				margin='normal'
				label='Описание'
				multiline
				rows={4}
				value={formData.description}
				onChange={e =>
					setFormData({ ...formData, description: e.target.value })
				}
				error={!!errors.description}
				helperText={errors.description || 'Минимум 10 символов'}
			/>

			<FormControl fullWidth margin='normal'>
				<InputLabel>Категория</InputLabel>
				<Select
					value={formData.category}
					onChange={e => setFormData({ ...formData, category: e.target.value })}
				>
					<MenuItem value='frontend'>Frontend</MenuItem>
					<MenuItem value='backend'>Backend</MenuItem>
					<MenuItem value='mobile'>Mobile</MenuItem>
					<MenuItem value='devops'>DevOps</MenuItem>
				</Select>
			</FormControl>

			<TextField
				fullWidth
				margin='normal'
				label='Дедлайн'
				type='date'
				InputLabelProps={{ shrink: true }}
				value={formData.deadline}
				onChange={e => setFormData({ ...formData, deadline: e.target.value })}
			/>

			<Typography variant='subtitle1' sx={{ mt: 3, mb: 1 }}>
				Ресурсы
			</Typography>
			{formData.resources.map((res, i) => (
				<Box key={i} sx={{ display: 'flex', gap: 1, mb: 1 }}>
					<TextField
						fullWidth
						size='small'
						placeholder='https://example.com'
						value={res}
						onChange={e => handleResourceChange(i, e.target.value)}
					/>
					{formData.resources.length > 1 && (
						<IconButton onClick={() => removeResource(i)} color='error'>
							<DeleteIcon />
						</IconButton>
					)}
				</Box>
			))}
			<Button startIcon={<AddIcon />} onClick={addResource} sx={{ mt: 1 }}>
				Добавить ресурс
			</Button>

			<Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
				<Button type='submit' variant='contained' size='large'>
					Сохранить
				</Button>
				<Button variant='outlined' onClick={onCancel}>
					Отмена
				</Button>
			</Box>
		</Box>
	)
}
