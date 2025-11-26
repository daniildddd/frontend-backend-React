import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Container,
	Paper,
	TextField,
	Button,
	Typography,
	Box,
	Alert,
	InputAdornment,
	IconButton,
} from '@mui/material'
import {
	Visibility,
	VisibilityOff,
	Login as LoginIcon,
} from '@mui/icons-material'

export default function Login({ onLogin }) {
	const navigate = useNavigate()

	const [formData, setFormData] = useState({ email: '', password: '' })
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState('')

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
		setError('')
	}

	const handleSubmit = () => {
		const validEmail = 'admin@example.com'
		const validPassword = '12345'

		if (formData.email === validEmail && formData.password === validPassword) {
			onLogin(formData.email) // ← ключевая строка!
			navigate('/dashboard')
		} else {
			setError('Неверный email или пароль')
		}
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Paper
					elevation={10}
					sx={{ padding: 4, width: '100%', borderRadius: 3 }}
				>
					<Typography component='h1' variant='h4' align='center' gutterBottom>
						Вход в систему
					</Typography>

					{error && (
						<Alert severity='error' sx={{ mt: 2 }}>
							{error}
						</Alert>
					)}

					<Box sx={{ mt: 3 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							label='Email'
							name='email'
							autoComplete='email'
							autoFocus
							value={formData.email}
							onChange={handleChange}
							placeholder='admin@example.com'
						/>

						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Пароль'
							type={showPassword ? 'text' : 'password'}
							value={formData.password}
							onChange={handleChange}
							placeholder='12345'
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											onClick={() => setShowPassword(!showPassword)}
											edge='end'
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						<Button
							fullWidth
							variant='contained'
							size='large'
							startIcon={<LoginIcon />}
							sx={{ mt: 3, mb: 2, py: 1.8, fontSize: '1.1rem' }}
							onClick={handleSubmit}
						>
							Войти
						</Button>
					</Box>

					{/* Тестовые данные */}
					<Box
						sx={{
							mt: 4,
							p: 3,
							backgroundColor: 'primary.light',
							color: 'white',
							borderRadius: 2,
							textAlign: 'center',
						}}
					>
						<Typography variant='body2'>Введите данные:</Typography>
						<Typography variant='h6' fontWeight='bold'>
							admin@example.com
						</Typography>
						<Typography variant='h6' fontWeight='bold'>
							12345
						</Typography>
					</Box>
				</Paper>
			</Box>
		</Container>
	)
}
