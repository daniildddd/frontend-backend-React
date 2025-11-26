import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'
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

	// Проверяем авторизацию при загрузке приложения
	useEffect(() => {
		const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
		const user = localStorage.getItem('username') || ''
		setIsLoggedIn(loggedIn)
		setUsername(user)
	}, [])

	// Обработчик входа
	const handleLogin = user => {
		localStorage.setItem('isLoggedIn', 'true')
		localStorage.setItem('username', user)
		setIsLoggedIn(true)
		setUsername(user)
	}

	// Обработчик выхода
	const handleLogout = () => {
		localStorage.removeItem('isLoggedIn')
		localStorage.removeItem('username')
		setIsLoggedIn(false)
		setUsername('')
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
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/technologies'
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<TechnologyList />
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
									<AddTechnology />
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
					</Routes>
				</main>
			</div>
		</Router>
	)
}

export default App
