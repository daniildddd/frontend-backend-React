// src/pages/Settings.jsx
import React, { useState, useEffect } from 'react'
import {
	Container,
	Typography,
	TextField,
	FormControlLabel,
	Checkbox,
	Button,
	Paper,
} from '@mui/material'

export default function Settings() {
	// Загружаем сохранённые данные при открытии страницы
	const [username, setUsername] = useState(
		localStorage.getItem('settings_username') || 'ВашеИмя'
	)
	const [email, setEmail] = useState(
		localStorage.getItem('settings_email') || 'user@example.com'
	)
	const [emailNotifications, setEmailNotifications] = useState(
		localStorage.getItem('settings_notifications') === 'true'
	)

	// Сохраняем всё при нажатии на кнопку
	const handleSave = () => {
		localStorage.setItem('settings_username', username)
		localStorage.setItem('settings_email', email)
		localStorage.setItem('settings_notifications', emailNotifications)

		alert('Настройки успешно сохранены!') // маленькое приятное уведомление
	}

	return (
		<Container maxWidth='md' sx={{ py: 4 }}>
			<Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
				<Typography variant='h3' gutterBottom>
					Настройки Приложения
				</Typography>
				<Typography variant='body1' paragraph>
					Управляйте своими предпочтениями и учетной записью.
				</Typography>

				<Typography variant='h5' sx={{ mt: 4, mb: 2 }}>
					Профиль
				</Typography>
				<TextField
					fullWidth
					label='Имя пользователя'
					value={username}
					onChange={e => setUsername(e.target.value)}
					sx={{ mb: 2 }}
				/>
				<TextField
					fullWidth
					label='Email'
					type='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					sx={{ mb: 3 }}
				/>

				<Typography variant='h5' sx={{ mt: 4, mb: 2 }}>
					Уведомления
				</Typography>
				<FormControlLabel
					control={
						<Checkbox
							checked={emailNotifications}
							onChange={e => setEmailNotifications(e.target.checked)}
						/>
					}
					label='Получать email-уведомления'
				/>

				<Button
					variant='contained'
					size='large'
					sx={{ mt: 4 }}
					onClick={handleSave}
				>
					Сохранить Изменения
				</Button>
			</Paper>
		</Container>
	)
}
