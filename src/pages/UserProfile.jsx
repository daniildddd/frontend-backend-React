// src/pages/UserProfile.jsx
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Typography, Button, Paper, Box } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function UserProfile() {
	const { userId } = useParams()
	const users = {
		1: { id: 1, name: 'Анна', role: 'Фронтенд разработчик', progress: 75 },
		2: { id: 2, name: 'Иван', role: 'Бэкенд разработчик', progress: 60 },
		3: { id: 3, name: 'Мария', role: 'Fullstack разработчик', progress: 85 },
	}
	const user = users[userId]

	if (!user) {
		return (
			<Container sx={{ py: 8, textAlign: 'center' }}>
				<Typography variant='h5' gutterBottom>
					Пользователь не найден
				</Typography>
				<Typography variant='body1' paragraph>
					Пользователь с ID {userId} не существует.
				</Typography>
				<Button
					component={Link}
					to='/'
					variant='outlined'
					startIcon={<ArrowBackIcon />}
				>
					Вернуться на главную
				</Button>
			</Container>
		)
	}

	return (
		<Container maxWidth='sm' sx={{ py: 4 }}>
			<Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
				<Typography variant='h4' gutterBottom>
					Профиль пользователя
				</Typography>
				<Typography variant='h5'>{user.name}</Typography>
				<Typography variant='body1' sx={{ mt: 2 }}>
					<strong>Должность:</strong> {user.role}
				</Typography>
				<Typography variant='body1' sx={{ mt: 1 }}>
					<strong>Прогресс:</strong> {user.progress}%
				</Typography>
				<Box sx={{ mt: 4 }}>
					<Button component={Link} to='/' startIcon={<ArrowBackIcon />}>
						Назад к списку
					</Button>
				</Box>
			</Paper>
		</Container>
	)
}
