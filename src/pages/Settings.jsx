// src/pages/Settings.jsx
import React from 'react'
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
					defaultValue='ВашеИмя'
					sx={{ mb: 2 }}
				/>
				<TextField
					fullWidth
					label='Email'
					type='email'
					defaultValue='user@example.com'
				/>

				<Typography variant='h5' sx={{ mt: 4, mb: 2 }}>
					Уведомления
				</Typography>
				<FormControlLabel
					control={<Checkbox defaultChecked />}
					label='Получать email-уведомления'
				/>

				<Button variant='contained' size='large' sx={{ mt: 4 }}>
					Сохранить Изменения
				</Button>
			</Paper>
		</Container>
	)
}
