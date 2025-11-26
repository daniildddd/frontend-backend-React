// src/pages/Dashboard.jsx
import React from 'react'
import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Badge,
	Tabs,
	Tab,
	Grid,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
	LinearProgress,
} from '@mui/material'
import {
	Notifications as NotificationsIcon,
	CheckCircle as CheckCircleIcon,
	Schedule as ScheduleIcon,
	Pending as PendingIcon,
	TrendingUp as TrendingUpIcon,
} from '@mui/icons-material'
import useTechnologies from '../hooks/useTechnologies'
import SimpleTechCard from '../components/SimpleTechCard'

function TabPanel({ children, value, index }) {
	return (
		<div role='tabpanel' hidden={value !== index}>
			{value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
		</div>
	)
}

export default function Dashboard() {
	const { technologies, updateStatus } = useTechnologies()
	const [tabValue, setTabValue] = React.useState(0)

	const stats = {
		total: technologies.length,
		completed: technologies.filter(t => t.status === 'completed').length,
		inProgress: technologies.filter(t => t.status === 'in-progress').length,
		notStarted: technologies.filter(t => t.status === 'not-started').length,
	}

	const completionPercentage =
		stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

	return (
		<Box sx={{ flexGrow: 1, maxWidth: 1200, mx: 'auto', p: { xs: 2, sm: 3 } }}>
			<AppBar position='static' color='default' elevation={2}>
				<Toolbar>
					<Typography variant='h6' sx={{ flexGrow: 1 }}>
						Панель управления технологиями
					</Typography>
					<IconButton color='inherit'>
						<Badge badgeContent={3} color='error'>
							<NotificationsIcon />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>

			<Tabs
				value={tabValue}
				onChange={(_, v) => setTabValue(v)}
				centered
				sx={{ mt: 3 }}
			>
				<Tab label='Обзор' />
				<Tab label='Технологии' />
			</Tabs>

			<TabPanel value={tabValue} index={0}>
				<Grid container spacing={3}>
					{[
						{
							label: 'Завершено',
							value: stats.completed,
							icon: <CheckCircleIcon color='success' />,
						},
						{
							label: 'В процессе',
							value: stats.inProgress,
							icon: <ScheduleIcon color='warning' />,
						},
						{
							label: 'Не начато',
							value: stats.notStarted,
							icon: <PendingIcon color='error' />,
						},
						{
							label: 'Всего',
							value: stats.total,
							icon: <TrendingUpIcon color='info' />,
						},
					].map((item, i) => (
						<Grid item xs={12} sm={6} md={3} key={i}>
							<Card>
								<CardContent>
									<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
										{item.icon}
										<Typography sx={{ ml: 1 }} color='text.secondary'>
											{item.label}
										</Typography>
									</Box>
									<Typography variant='h4'>{item.value}</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}

					<Grid item xs={12}>
						<Card>
							<CardContent>
								<Typography variant='h6' gutterBottom>
									Общий прогресс
								</Typography>
								<Typography variant='h4' gutterBottom>
									{completionPercentage}%
								</Typography>
								<LinearProgress
									variant='determinate'
									value={completionPercentage}
									sx={{ height: 12, borderRadius: 6 }}
								/>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</TabPanel>

			<TabPanel value={tabValue} index={1}>
				<Grid container spacing={3}>
					{technologies.map(tech => (
						<Grid item xs={12} sm={6} md={4} key={tech.id}>
							<SimpleTechCard
								{...tech}
								category={tech.category || 'frontend'}
								onStatusChange={updateStatus}
							/>
						</Grid>
					))}
				</Grid>
			</TabPanel>
		</Box>
	)
}
