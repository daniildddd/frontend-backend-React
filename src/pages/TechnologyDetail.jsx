// src/pages/TechnologyDetail.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
	Container,
	Typography,
	Button,
	Box,
	Paper,
	Divider,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function TechnologyDetail() {
	const { techId } = useParams()
	const navigate = useNavigate()
	const [technology, setTechnology] = useState(null)

	useEffect(() => {
		const saved = localStorage.getItem('technologies')
		if (saved) {
			const tech = JSON.parse(saved).find(t => t.id === parseInt(techId))
			setTechnology(tech)
		}
	}, [techId])

	const updateStatus = newStatus => {
		const saved = localStorage.getItem('technologies')
		if (saved) {
			const updated = JSON.parse(saved).map(tech =>
				tech.id === parseInt(techId) ? { ...tech, status: newStatus } : tech
			)
			localStorage.setItem('technologies', JSON.stringify(updated))
			setTechnology(prev => ({ ...prev, status: newStatus }))
		}
	}

	if (!technology) {
		return (
			<Container sx={{ py: 8, textAlign: 'center' }}>
				<Typography variant='h5'>Технология не найдена</Typography>
				<Button
					component={Link}
					to='/technologies'
					startIcon={<ArrowBackIcon />}
				>
					Назад к списку
				</Button>
			</Container>
		)
	}

	return (
		<Container maxWidth='md' sx={{ py: 4 }}>
			<Button
				component={Link}
				to='/technologies'
				startIcon={<ArrowBackIcon />}
				sx={{ mb: 3 }}
			>
				Назад к списку
			</Button>

			<Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
				<Typography variant='h3' gutterBottom>
					{technology.title}
				</Typography>
				<Typography variant='body1' color='text.secondary' paragraph>
					{technology.description}
				</Typography>

				<Divider sx={{ my: 3 }} />

				<Typography variant='h6' gutterBottom>
					Статус изучения
				</Typography>
				<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
					{['not-started', 'in-progress', 'completed'].map(status => (
						<Button
							key={status}
							variant={technology.status === status ? 'contained' : 'outlined'}
							color={
								status === 'completed'
									? 'success'
									: status === 'in-progress'
									? 'warning'
									: 'primary'
							}
							onClick={() => updateStatus(status)}
						>
							{status === 'not-started'
								? 'Не начато'
								: status === 'in-progress'
								? 'В процессе'
								: 'Завершено'}
						</Button>
					))}
				</Box>

				{technology.notes && (
					<>
						<Typography variant='h6' sx={{ mt: 4 }}>
							Мои заметки
						</Typography>
						<Paper
							variant='outlined'
							sx={{ p: 2, bgcolor: 'background.default' }}
						>
							<Typography>{technology.notes}</Typography>
						</Paper>
					</>
				)}
			</Paper>
		</Container>
	)
}
