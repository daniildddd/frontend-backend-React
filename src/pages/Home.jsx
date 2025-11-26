// src/pages/Home.jsx
import React from 'react'
import { Container, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Home() {
	return (
		<Container maxWidth='md' sx={{ py: 8, textAlign: 'center' }}>
			<Typography variant='h2' gutterBottom>
				Добро пожаловать в Трекер Технологий!
			</Typography>
			<Typography variant='body1' paragraph>
				Ваш личный инструмент для отслеживания прогресса в изучении новых
				фреймворков и библиотек.
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
				<Button
					component={Link}
					to='/technologies'
					variant='contained'
					size='large'
				>
					Посмотреть мои технологии
				</Button>
				<Button
					component={Link}
					to='/add-technology'
					variant='outlined'
					size='large'
				>
					Начать отслеживание
				</Button>
			</Box>
			<Typography variant='body2' sx={{ mt: 4 }}>
				Это приложение использует React Router для быстрой навигации без
				перезагрузки страницы.
			</Typography>
		</Container>
	)
}
