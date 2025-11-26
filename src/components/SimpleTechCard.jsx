// src/components/SimpleTechCard.jsx
import React from 'react'
import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
	Chip,
	Box,
} from '@mui/material'

function SimpleTechCard({
	id,
	title,
	description,
	status,
	category = 'frontend',
	onStatusChange,
}) {
	const getStatusColor = status => {
		switch (status) {
			case 'completed':
				return 'success'
			case 'in-progress':
				return 'warning'
			default:
				return 'default'
		}
	}

	const getStatusText = status => {
		switch (status) {
			case 'completed':
				return 'Завершено'
			case 'in-progress':
				return 'В процессе'
			default:
				return 'Не начато'
		}
	}

	const handleStatusChange = newStatus => {
		if (onStatusChange) onStatusChange(id, newStatus)
	}

	return (
		<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography variant='h6' component='h3' gutterBottom>
					{title}
				</Typography>
				<Typography variant='body2' color='text.secondary' paragraph>
					{description}
				</Typography>
				<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
					<Chip label={category} variant='outlined' size='small' />
					<Chip
						label={getStatusText(status)}
						color={getStatusColor(status)}
						size='small'
					/>
				</Box>
			</CardContent>
			<CardActions>
				{status !== 'completed' && (
					<Button
						size='small'
						variant='contained'
						onClick={() => handleStatusChange('completed')}
					>
						Завершить
					</Button>
				)}
				<Button
					size='small'
					variant='outlined'
					onClick={() =>
						handleStatusChange(
							status === 'in-progress' ? 'not-started' : 'in-progress'
						)
					}
				>
					{status === 'in-progress' ? 'Приостановить' : 'Начать'}
				</Button>
			</CardActions>
		</Card>
	)
}

export default SimpleTechCard
