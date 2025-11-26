// src/App.jsx — ФИНАЛЬНАЯ РАБОЧАЯ ВЕРСИЯ
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'

// Страницы
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Technologies from './pages/TechnologyList'
import TechnologyDetail from './pages/TechnologyDetail'
import AddTechnology from './pages/AddTechnology'
import Statistics from './pages/Statistics'
import BulkEdit from './pages/BulkEdit'
import DataImportExport from './pages/DataImportExport'
import Settings from './pages/Settings'
import UserProfile from './pages/UserProfile'

import Notifications from './components/Notifications'

function App() {
	// ТЕМА
	const [darkMode, setDarkMode] = useState(() => {
		const saved = localStorage.getItem('darkMode')
		return saved ? JSON.parse(saved) : false
	})

	useEffect(() => {
		localStorage.setItem('darkMode', JSON.stringify(darkMode))
	}, [darkMode])

	const theme = createTheme({
		palette: {
			mode: darkMode ? 'dark' : 'light',
			primary: { main: '#667eea' },
			secondary: { main: '#764ba2' },
		},
	})

	// УВЕДОМЛЕНИЯ
	const [notification, setNotification] = useState({
		open: false,
		message: '',
		severity: 'info',
	})

	const showNotification = (message, severity = 'success') => {
		setNotification({ open: true, message, severity })
	}

	// АВТОРИЗАЦИЯ
	const [isLoggedIn, setIsLoggedIn] = useState(
		() => localStorage.getItem('isLoggedIn') === 'true'
	)
	const [username, setUsername] = useState(
		() => localStorage.getItem('username') || ''
	)

	const handleLogin = user => {
		localStorage.setItem('isLoggedIn', 'true')
		localStorage.setItem('username', user)
		setIsLoggedIn(true)
		setUsername(user)
		showNotification('Добро пожаловать!', 'success')
	}

	const handleLogout = () => {
		localStorage.removeItem('isLoggedIn')
		localStorage.removeItem('username')
		setIsLoggedIn(false)
		setUsername('')
		showNotification('Вы вышли из системы', 'info')
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<div className='app'>
					<Navigation
						isLoggedIn={isLoggedIn}
						username={username}
						onLogout={handleLogout}
						toggleTheme={() => setDarkMode(prev => !prev)}
						darkMode={darkMode}
					/>

					<main className='main-content'>
						<Routes>
							{/* ПУБЛИЧНЫЕ СТРАНИЦЫ */}
							<Route path='/' element={<Home />} />
							<Route path='/about' element={<About />} />
							<Route path='/contact' element={<Contact />} />
							<Route path='/login' element={<Login onLogin={handleLogin} />} />

							{/* ЗАЩИЩЁННЫЕ СТРАНИЦЫ */}
							<Route
								path='/dashboard'
								element={
									<ProtectedRoute isLoggedIn={isLoggedIn}>
										<Dashboard />
									</ProtectedRoute>
								}
							/>

							<Route
								path='/technologies'
								element={
									<ProtectedRoute isLoggedIn={isLoggedIn}>
										<Technologies />
									</ProtectedRoute>
								}
							/>

							<Route
								path='/technology/:techId'
								element={
									<ProtectedRoute isLoggedIn={isLoggedIn}>
										<TechnologyDetail />
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
										<BulkEdit />
									</ProtectedRoute>
								}
							/>

							<Route
								path='/import-export'
								element={
									<ProtectedRoute isLoggedIn={isLoggedIn}>
										<DataImportExport />
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

							<Route
								path='/user/:userId'
								element={
									<ProtectedRoute isLoggedIn={isLoggedIn}>
										<UserProfile />
									</ProtectedRoute>
								}
							/>
						</Routes>
					</main>

					<Notifications
						open={notification.open}
						onClose={() => setNotification({ ...notification, open: false })}
						message={notification.message}
						severity={notification.severity}
					/>
				</div>
			</Router>
		</ThemeProvider>
	)
}

export default App
