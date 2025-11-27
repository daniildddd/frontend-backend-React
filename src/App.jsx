import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'
import NotificationSnackbar from './components/NotificationSnackbar'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import TechnologyList from './pages/TechnologyList'
import TechnologyDetail from './pages/TechnologyDetail'
import AddTechnology from './pages/AddTechnology'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'
import BulkEdit from './pages/BulkEdit'
import DataImportExport from './pages/DataImportExport'
import './App.css'

function App() {
	// Состояние для отслеживания авторизации
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [username, setUsername] = useState('')

	// Состояние для уведомлений
	const [notification, setNotification] = useState({
		open: false,
		message: '',
		severity: 'info',
	})

	// Проверяем авторизацию при загрузке приложения
	useEffect(() => {
		const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
		const user = localStorage.getItem('username') || ''
		console.log('Checking auth:', { loggedIn, user }) // Отладка
		setIsLoggedIn(loggedIn)
		setUsername(user)
	}, [])

	// Обработчик входа
	const handleLogin = user => {
		localStorage.setItem('isLoggedIn', 'true')
		localStorage.setItem('username', user)
		setIsLoggedIn(true)
		setUsername(user)
		showNotification('Вход выполнен успешно', 'success')
	}

	// Обработчик выхода
	const handleLogout = () => {
		localStorage.removeItem('isLoggedIn')
		localStorage.removeItem('username')
		setIsLoggedIn(false)
		setUsername('')
		showNotification('Вы вышли из системы', 'info')
	}

	// Показать уведомление
	const showNotification = (message, severity = 'info') => {
		setNotification({
			open: true,
			message,
			severity,
		})

		// Автоматически закрываем через 6 секунд
		setTimeout(() => {
			setNotification(prev => ({ ...prev, open: false }))
		}, 6000)
	}

	// Закрыть уведомление
	const handleCloseNotification = () => {
		setNotification({ ...notification, open: false })
	}

	return (
		<Router>
			<div className='app'>
				<Navigation
					isLoggedIn={isLoggedIn}
					username={username}
					onLogout={handleLogout}
				/>
				<main className='main-content'>
					<Routes>
						{/* Публичные маршруты */}
						<Route path='/' element={<Home />} />
						<Route path='/about' element={<About />} />
						<Route path='/login' element={<Login onLogin={handleLogin} />} />

						{/* Защищенные маршруты - требуют авторизации */}
						<Route
							path='/dashboard'
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<Dashboard showNotification={showNotification} />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/technologies'
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<TechnologyList showNotification={showNotification} />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/technology/:techId'
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<TechnologyDetail showNotification={showNotification} />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/add-technology'
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<AddTechnology showNotification={showNotification} />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/statistics'
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<Statistics />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/bulk-edit'
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<BulkEdit showNotification={showNotification} />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/import-export'
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<DataImportExport showNotification={showNotification} />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/settings'
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<Settings />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</main>

				{/* Глобальный компонент уведомлений */}
				<NotificationSnackbar
					notification={notification}
					onClose={handleCloseNotification}
				/>
			</div>
		</Router>
	)
}

export default App
