// src/pages/Contact.jsx
import React from 'react'
import { Container, Typography } from '@mui/material'

export default function Contact() {
	return (
		<Container maxWidth='md' sx={{ py: 4, textAlign: 'center' }}>
			<Typography variant='h3' gutterBottom>
				Наши контакты
			</Typography>
			<Typography variant='body1'>
				Свяжитесь с нами по email: support@tracker.com
			</Typography>
		</Container>
	)
}
