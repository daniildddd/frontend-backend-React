// src/components/Notifications.jsx
import React from 'react'
import {
	Snackbar,
	Alert,
	IconButton,
	Slide,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

function SlideTransition(props) {
	return <Slide {...props} direction='up' />
}

export default function Notifications({
	open,
	onClose,
	message = 'Действие выполнено успешно',
	severity = 'success', // success | error | warning | info
	autoHideDuration = 5000,
}) {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={onClose}
			TransitionComponent={SlideTransition}
			anchorOrigin={{
				vertical: isMobile ? 'top' : 'bottom',
				horizontal: 'center',
			}}
			sx={{
				width: { xs: '90%', sm: 'auto' },
				maxWidth: 600,
			}}
		>
			<Alert
				severity={severity}
				variant='filled'
				onClose={onClose}
				action={
					<IconButton
						size='small'
						aria-label='закрыть'
						color='inherit'
						onClick={onClose}
					>
						<CloseIcon fontSize='small' />
					</IconButton>
				}
				sx={{
					width: '100%',
					fontWeight: 500,
					alignItems: 'center',
					boxShadow: 6,
				}}
			>
				{message}
			</Alert>
		</Snackbar>
	)
}
