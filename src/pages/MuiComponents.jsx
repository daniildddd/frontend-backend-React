import { useState, useEffect } from 'react'
import { Container, Grid, Typography, Box, Button } from '@mui/material'
import SimpleTechCard from '../components/SimpleTechCard'
import NotificationSnackbar from '../components/NotificationSnackbar'

function MuiComponents() {
	const [technologies, setTechnologies] = useState([])
	const [notification, setNotification] = useState({
		open: false,
		message: '',
		severity: 'info',
	})

	// Загрузка технологий из localStorage
	useEffect(() => {
		const saved = localStorage.getItem('technologies')
		if (saved) {
			setTechnologies(JSON.parse(saved))
		}
	}, [])

	// Обработчик изменения статуса
	const handleStatusChange = (id, newStatus) => {
		const updatedTechnologies = technologies.map(tech =>
			tech.id === id ? { ...tech, status: newStatus } : tech
		)

		setTechnologies(updatedTechnologies)
		localStorage.setItem('technologies', JSON.stringify(updatedTechnologies))

		// Показываем уведомление
		const statusText = {
			completed: 'завершена',
			'in-progress': 'в процессе',
			'not-started': 'не начата',
		}

		setNotification({
			open: true,
			message: `Технология переведена в статус: ${statusText[newStatus]}`,
			severity: 'success',
		})
	}

	// Закрытие уведомления
	const handleCloseNotification = () => {
		setNotification({ ...notification, open: false })
	}

	// Демонстрация разных типов уведомлений
	const showDemoNotification = type => {
		const messages = {
			success: 'Операция выполнена успешно!',
			error: 'Произошла ошибка при выполнении операции',
			warning: 'Предупреждение: проверьте введенные данные',
			info: 'Информация: обновление доступно',
		}

		setNotification({
			open: true,
			message: messages[type],
			severity: type,
		})
	}

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			<Typography variant='h3' component='h1' gutterBottom>
				Material-UI Компоненты
			</Typography>
			<Typography variant='subtitle1' color='text.secondary' gutterBottom>
				Карточки технологий с использованием Material-UI
			</Typography>

			{/* Демо кнопки для уведомлений */}
			<Box sx={{ my: 4 }}>
				<Typography variant='h5' gutterBottom>
					Демонстрация уведомлений
				</Typography>
				<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
					<Button
						variant='contained'
						color='success'
						onClick={() => showDemoNotification('success')}
					>
						Success
					</Button>
					<Button
						variant='contained'
						color='error'
						onClick={() => showDemoNotification('error')}
					>
						Error
					</Button>
					<Button
						variant='contained'
						color='warning'
						onClick={() => showDemoNotification('warning')}
					>
						Warning
					</Button>
					<Button
						variant='contained'
						color='info'
						onClick={() => showDemoNotification('info')}
					>
						Info
					</Button>
				</Box>
			</Box>

			{/* Сетка карточек */}
			{technologies.length > 0 ? (
				<Grid container spacing={3}>
					{technologies.map(tech => (
						<Grid item xs={12} sm={6} md={4} key={tech.id}>
							<SimpleTechCard
								technology={tech}
								onStatusChange={handleStatusChange}
							/>
						</Grid>
					))}
				</Grid>
			) : (
				<Box
					sx={{
						textAlign: 'center',
						py: 8,
						bgcolor: 'background.paper',
						borderRadius: 2,
					}}
				>
					<Typography variant='h6' color='text.secondary'>
						Нет технологий для отображения
					</Typography>
					<Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
						Добавьте технологии через форму добавления
					</Typography>
				</Box>
			)}

			{/* Компонент уведомлений */}
			<NotificationSnackbar
				notification={notification}
				onClose={handleCloseNotification}
			/>
		</Container>
	)
}

export default MuiComponents
