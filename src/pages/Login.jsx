import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Login.css'

function Login({ onLogin }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const navigate = useNavigate()
	const location = useLocation()

	// Куда перенаправить после логина
	const from = location.state?.from?.pathname || '/'

	const handleSubmit = e => {
		e.preventDefault()
		setError('')

		// Простая заглушка вместо реального бэкенда
		if (username === 'admin' && password === 'password') {
			localStorage.setItem('isLoggedIn', 'true')
			localStorage.setItem('username', username)

			onLogin(username) // передаём имя вверх в App

			// Небольшая задержка, чтобы состояние успело обновиться
			setTimeout(() => {
				navigate(from, { replace: true })
			}, 100)
		} else {
			setError('Неверное имя пользователя или пароль')
		}
	}

	return (
		<div className='page login-page'>
			<div className='login-container'>
				<h1>Вход в систему</h1>

				{error && (
					<div className='error-banner' role='alert'>
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className='login-form' noValidate>
					<div className='form-group'>
						<label htmlFor='username'>Имя пользователя</label>
						<input
							id='username'
							type='text'
							value={username}
							onChange={e => setUsername(e.target.value)}
							placeholder='admin'
							required
							aria-required='true'
							aria-invalid={!!error}
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='password'>Пароль</label>
						<input
							id='password'
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder='password'
							required
							aria-required='true'
							aria-invalid={!!error}
						/>
					</div>

					<button type='submit' className='btn-login'>
						Войти
					</button>
				</form>

				<div className='login-help'>
					<p>
						<strong>Тестовые данные:</strong>
					</p>
					<p>Логин: admin</p>
					<p>Пароль: password</p>
				</div>
			</div>
		</div>
	)
}

export default Login
