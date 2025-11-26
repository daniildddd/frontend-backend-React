// src/pages/AddTechnology.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import TechnologyForm from '../components/TechnologyForm'
import { Container } from '@mui/material'

export default function AddTechnology() {
	const navigate = useNavigate()

	const handleSave = formData => {
		const newId = Date.now()
		const newTechnology = {
			id: newId,
			...formData,
			status: 'not-started',
		}

		const saved = localStorage.getItem('technologies')
		const technologies = saved ? JSON.parse(saved) : []
		technologies.push(newTechnology)
		localStorage.setItem('technologies', JSON.stringify(technologies))

		navigate('/technologies')
	}

	const handleCancel = () => {
		navigate('/technologies')
	}

	return (
		<Container maxWidth='md' sx={{ py: 4 }}>
			<TechnologyForm onSave={handleSave} onCancel={handleCancel} />
		</Container>
	)
}
