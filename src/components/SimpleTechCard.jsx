import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
	Chip,
	Box,
} from '@mui/material'

function SimpleTechCard({ technology, onStatusChange }) {
	// Функция определения цвета чипа в зависимости от статуса
	const getStatusColor = status => {
		switch (status) {
			case 'completed':
				return 'success'
			case 'in-progress':
				return 'warning'
			default:
				return 'default'
		}
	}

	// Функция получения текста статуса на русском языке
	const getStatusText = status => {
		switch (status) {
			case 'completed':
				return 'Завершено'
			case 'in-progress':
				return 'В процессе'
			default:
				return 'Не начато'
		}
	}

	// Функция получения текста категории
	const getCategoryText = category => {
		const categories = {
			frontend: 'Frontend',
			backend: 'Backend',
			database: 'База данных',
			devops: 'DevOps',
			other: 'Другое',
		}
		return categories[category] || category
	}

	return (
		<Card
			sx={{
				maxWidth: 345,
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<CardContent sx={{ flexGrow: 1 }}>
				{/* Заголовок карточки */}
				<Typography variant='h5' component='h2' gutterBottom>
					{technology.title}
				</Typography>

				{/* Описание технологии */}
				<Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
					{technology.description}
				</Typography>

				{/* Чипы с категорией и статусом */}
				<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
					<Chip
						label={getCategoryText(technology.category)}
						variant='outlined'
						size='small'
					/>
					<Chip
						label={getStatusText(technology.status)}
						color={getStatusColor(technology.status)}
						size='small'
					/>
				</Box>
			</CardContent>

			{/* Кнопки действий */}
			<CardActions>
				{technology.status !== 'completed' && (
					<Button
						size='small'
						variant='contained'
						onClick={() => onStatusChange(technology.id, 'completed')}
					>
						Завершить
					</Button>
				)}
				<Button
					size='small'
					variant='outlined'
					onClick={() =>
						onStatusChange(
							technology.id,
							technology.status === 'in-progress'
								? 'not-started'
								: 'in-progress'
						)
					}
				>
					{technology.status === 'in-progress' ? 'Приостановить' : 'Начать'}
				</Button>
			</CardActions>
		</Card>
	)
}

export default SimpleTechCard
