// src/pages/Technologies.jsx
import React, { useState, useEffect } from 'react'
import { Container, Typography, Button, Grid, Box, Chip } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import SimpleTechCard from '../components/SimpleTechCard'

export default function Technologies() {
	const [technologies, setTechnologies] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		const saved = localStorage.getItem('technologies')
		if (saved) setTechnologies(JSON.parse(saved))
	}, [])

	const handleCardClick = techId => {
		const statusCycle = ['not-started', 'in-progress', 'completed']
		setTechnologies(prev => {
			const updated = prev.map(tech => {
				if (tech.id === techId) {
					const currentIndex = statusCycle.indexOf(tech.status)
					const nextStatus =
						statusCycle[(currentIndex + 1) % statusCycle.length]
					return { ...tech, status: nextStatus }
				}
				return tech
			})
			localStorage.setItem('technologies', JSON.stringify(updated))
			return updated
		})
	}

	const handleDetailsClick = (e, techId) => {
		e.stopPropagation()
		navigate(`/technology/${techId}`)
	}

	const getStatusLabel = status => {
		const labels = {
			'not-started': 'Не начато',
			'in-progress': 'В процессе',
			completed: 'Завершено',
		}
		return labels[status] || status
	}

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 4,
				}}
			>
				<Typography variant='h4'>Все технологии</Typography>
				<Button
					component={Link}
					to='/add-technology'
					variant='contained'
					size='large'
				>
					+ Добавить технологию
				</Button>
			</Box>

			<Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
				Кликните на карточку для изменения статуса
			</Typography>

			{technologies.length === 0 ? (
				<Box sx={{ textAlign: 'center', py: 8 }}>
					<Typography variant='h6' color='text.secondary'>
						Технологий пока нет.
					</Typography>
					<Button
						component={Link}
						to='/add-technology'
						variant='contained'
						sx={{ mt: 2 }}
					>
						Добавить первую технологию
					</Button>
				</Box>
			) : (
				<Grid container spacing={3}>
					{technologies.map(tech => (
						<Grid item xs={12} sm={6} md={4} key={tech.id}>
							<Box
								onClick={() => handleCardClick(tech.id)}
								sx={{
									cursor: 'pointer',
									transition: 'all 0.2s',
									'&:hover': { transform: 'translateY(-4px)' },
								}}
							>
								<SimpleTechCard {...tech} onStatusChange={handleCardClick} />
								<Box
									sx={{
										mt: 1,
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Chip
										label={getStatusLabel(tech.status)}
										size='small'
										color={
											tech.status === 'completed'
												? 'success'
												: tech.status === 'in-progress'
												? 'warning'
												: 'default'
										}
									/>
									<Button
										size='small'
										onClick={e => handleDetailsClick(e, tech.id)}
									>
										Подробнее →
									</Button>
								</Box>
							</Box>
						</Grid>
					))}
				</Grid>
			)}
		</Container>
	)
}
