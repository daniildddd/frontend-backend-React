import { useState, useEffect } from 'react'
import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Badge,
	Tabs,
	Tab,
	Card,
	CardContent,
	Grid,
	List,
	ListItem,
	ListItemText,
	LinearProgress,
} from '@mui/material'
import {
	Notifications as NotificationsIcon,
	CheckCircle as CheckCircleIcon,
	Schedule as ScheduleIcon,
	TrendingUp as TrendingUpIcon,
	Brightness4 as Brightness4Icon,
	Brightness7 as Brightness7Icon,
} from '@mui/icons-material'
import { useContext } from 'react'
import { ColorModeContext } from '../ThemeProviderWrapper'

// Компонент для содержимого вкладки
function TabPanel({ children, value, index }) {
	return (
		<div role='tabpanel' hidden={value !== index}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	)
}

function MuiDashboard() {
	const [technologies, setTechnologies] = useState([])
	const [tabValue, setTabValue] = useState(0)
	const [notificationCount] = useState(3)
	const colorMode = useContext(ColorModeContext)

	// Загрузка технологий из localStorage
	useEffect(() => {
		const saved = localStorage.getItem('technologies')
		if (saved) {
			setTechnologies(JSON.parse(saved))
		}
	}, [])

	// Расчет статистики на основе массива technologies
	const stats = {
		total: technologies.length,
		completed: technologies.filter(t => t.status === 'completed').length,
		inProgress: technologies.filter(t => t.status === 'in-progress').length,
		notStarted: technologies.filter(t => t.status === 'not-started').length,
	}

	// Расчет процента выполнения
	const completionPercentage =
		stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

	// Обработчик переключения вкладок
	const handleTabChange = (event, newValue) => {
		setTabValue(newValue)
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			{/* Шапка приложения */}
			<AppBar position='static' color='default' elevation={1}>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Панель управления технологиями
					</Typography>

					{/* Переключатель темы */}
					<IconButton
						sx={{ mr: 1 }}
						onClick={colorMode.toggleColorMode}
						color='inherit'
					>
						{colorMode.mode === 'dark' ? (
							<Brightness7Icon />
						) : (
							<Brightness4Icon />
						)}
					</IconButton>

					{/* Иконка уведомлений с бейджем */}
					<IconButton color='inherit'>
						<Badge badgeContent={notificationCount} color='error'>
							<NotificationsIcon />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>

			{/* Вкладки */}
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={tabValue} onChange={handleTabChange}>
					<Tab label='Обзор' />
					<Tab label='Статистика' />
				</Tabs>
			</Box>

			{/* Вкладка обзора */}
			<TabPanel value={tabValue} index={0}>
				<Grid container spacing={3}>
					{/* Статистические карточки */}
					<Grid item xs={12} sm={6} md={3}>
						<Card>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<CheckCircleIcon color='success' sx={{ mr: 1 }} />
									<Typography color='text.secondary' variant='body2'>
										Завершено
									</Typography>
								</Box>
								<Typography variant='h4'>{stats.completed}</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Card>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<ScheduleIcon color='warning' sx={{ mr: 1 }} />
									<Typography color='text.secondary' variant='body2'>
										В процессе
									</Typography>
								</Box>
								<Typography variant='h4'>{stats.inProgress}</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Card>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<TrendingUpIcon color='info' sx={{ mr: 1 }} />
									<Typography color='text.secondary' variant='body2'>
										Не начато
									</Typography>
								</Box>
								<Typography variant='h4'>{stats.notStarted}</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Card>
							<CardContent>
								<Typography color='text.secondary' variant='body2' gutterBottom>
									Общий прогресс
								</Typography>
								<Typography variant='h4' gutterBottom>
									{completionPercentage}%
								</Typography>
								<LinearProgress
									variant='determinate'
									value={completionPercentage}
									sx={{ height: 8, borderRadius: 4 }}
								/>
							</CardContent>
						</Card>
					</Grid>

					{/* Недавно добавленные технологии */}
					<Grid item xs={12} md={6}>
						<Card>
							<CardContent>
								<Typography variant='h6' gutterBottom>
									Недавно добавленные
								</Typography>
								{technologies.length > 0 ? (
									<List>
										{technologies
											.slice(-5)
											.reverse()
											.map(tech => (
												<ListItem key={tech.id}>
													<ListItemText
														primary={tech.title}
														secondary={tech.category}
													/>
												</ListItem>
											))}
									</List>
								) : (
									<Typography color='text.secondary'>
										Нет технологий для отображения
									</Typography>
								)}
							</CardContent>
						</Card>
					</Grid>

					{/* Распределение по категориям */}
					<Grid item xs={12} md={6}>
						<Card>
							<CardContent>
								<Typography variant='h6' gutterBottom>
									По категориям
								</Typography>
								<List>
									{['frontend', 'backend', 'database', 'devops', 'other'].map(
										category => {
											const count = technologies.filter(
												t => t.category === category
											).length
											return count > 0 ? (
												<ListItem key={category}>
													<ListItemText
														primary={category}
														secondary={`${count} технологий`}
													/>
												</ListItem>
											) : null
										}
									)}
								</List>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</TabPanel>

			{/* Вкладка статистики */}
			<TabPanel value={tabValue} index={1}>
				<Typography variant='h4' gutterBottom>
					Детальная статистика
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Card>
							<CardContent>
								<Typography variant='h6' gutterBottom>
									Общая информация
								</Typography>
								<Typography>Всего технологий: {stats.total}</Typography>
								<Typography>Завершено: {stats.completed}</Typography>
								<Typography>В процессе: {stats.inProgress}</Typography>
								<Typography>Не начато: {stats.notStarted}</Typography>
								<Typography sx={{ mt: 2 }}>
									Процент выполнения: {completionPercentage}%
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</TabPanel>
		</Box>
	)
}

export default MuiDashboard
