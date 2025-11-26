// src/pages/BulkEdit.jsx
import React, { useState, useEffect } from 'react'
import {
	Container,
	Typography,
	Button,
	Checkbox,
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Chip,
} from '@mui/material'

export default function BulkEdit() {
	const [technologies, setTechnologies] = useState([])
	const [selectedIds, setSelectedIds] = useState([])
	const [bulkStatus, setBulkStatus] = useState('')
	const [showConfirm, setShowConfirm] = useState(false)

	useEffect(() => {
		const saved = localStorage.getItem('technologies')
		if (saved) setTechnologies(JSON.parse(saved))
	}, [])

	const saveTechnologies = updatedTech => {
		setTechnologies(updatedTech)
		localStorage.setItem('technologies', JSON.stringify(updatedTech))
	}

	const handleToggleSelect = id => {
		setSelectedIds(prev =>
			prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
		)
	}

	const handleSelectAll = () => {
		if (selectedIds.length === technologies.length) {
			setSelectedIds([])
		} else {
			setSelectedIds(technologies.map(tech => tech.id))
		}
	}

	const handleApplyBulkStatus = () => {
		const updatedTechnologies = technologies.map(tech =>
			selectedIds.includes(tech.id) ? { ...tech, status: bulkStatus } : tech
		)
		saveTechnologies(updatedTechnologies)
		setSelectedIds([])
		setBulkStatus('')
		setShowConfirm(false)
	}

	const handleDeleteSelected = () => {
		const updatedTechnologies = technologies.filter(
			tech => !selectedIds.includes(tech.id)
		)
		saveTechnologies(updatedTechnologies)
		setSelectedIds([])
		setShowConfirm(false)
	}

	const selectedCount = selectedIds.length

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			<Typography variant='h4' gutterBottom>
				Массовое редактирование
			</Typography>
			<Typography variant='body1' sx={{ mb: 3 }}>
				Выберите технологии для редактирования ({selectedCount} выбрано)
			</Typography>

			<Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
				<Button variant='outlined' onClick={handleSelectAll}>
					{selectedIds.length === technologies.length
						? 'Снять выбор со всех'
						: 'Выбрать все'}
				</Button>
				{selectedCount > 0 && (
					<>
						<Button
							variant='contained'
							color='primary'
							onClick={() => setShowConfirm(true)}
						>
							Изменить статус
						</Button>
						<Button
							variant='contained'
							color='error'
							onClick={() => setShowConfirm(true)}
						>
							Удалить выбранные
						</Button>
					</>
				)}
			</Box>

			<List>
				{technologies.map(tech => (
					<ListItem key={tech.id} disablePadding>
						<ListItemButton
							role={undefined}
							onClick={() => handleToggleSelect(tech.id)}
							dense
						>
							<ListItemIcon>
								<Checkbox
									edge='start'
									checked={selectedIds.includes(tech.id)}
									tabIndex={-1}
									disableRipple
								/>
							</ListItemIcon>
							<ListItemText primary={tech.title} secondary={tech.description} />
							<Chip label={tech.status} size='small' sx={{ ml: 2 }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>

			<Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
				<DialogTitle>Подтверждение действия</DialogTitle>
				<DialogContent>
					<Typography>
						Вы уверены, что хотите {bulkStatus ? 'изменить статус' : 'удалить'}{' '}
						{selectedCount} технологий?
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setShowConfirm(false)}>Отмена</Button>
					<Button
						onClick={bulkStatus ? handleApplyBulkStatus : handleDeleteSelected}
						color='primary'
					>
						Подтвердить
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}
