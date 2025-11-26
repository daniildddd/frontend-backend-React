// src/pages/About.jsx
import React from 'react'
import {
	Container,
	Typography,
	List,
	ListItem,
	ListItemText,
	Paper,
} from '@mui/material'

export default function About() {
	return (
		<Container maxWidth='md' sx={{ py: 4 }}>
			<Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
				<Typography variant='h3' component='h1' gutterBottom>
					О нашем приложении
				</Typography>
				<Typography variant='body1' paragraph>
					Это учебное приложение создано для изучения React Router.
				</Typography>
				<Typography variant='h5' sx={{ mt: 4, mb: 2 }}>
					Наша миссия
				</Typography>
				<Typography variant='body1' paragraph>
					Помогать разработчикам изучать современные технологии веб-разработки.
				</Typography>
				<Typography variant='h5' sx={{ mt: 4, mb: 2 }}>
					Технологии
				</Typography>
				<List>
					<ListItem>
						<ListItemText primary='React' />
					</ListItem>
					<ListItem>
						<ListItemText primary='React Router' />
					</ListItem>
					<ListItem>
						<ListItemText primary='JavaScript ES6+' />
					</ListItem>
				</List>
			</Paper>
		</Container>
	)
}
