import './NotificationSnackbar.css'

function NotificationSnackbar({ notification, onClose }) {
	if (!notification.open) return null

	const severityColors = {
		success: '#4caf50',
		error: '#f44336',
		warning: '#ff9800',
		info: '#2196f3',
	}

	const backgroundColor = severityColors[notification.severity] || '#2196f3'

	return (
		<div
			className='notification-snackbar'
			style={{ backgroundColor }}
			role='alert'
			aria-live='polite'
		>
			<span className='notification-message'>{notification.message}</span>
			<button
				className='notification-close'
				onClick={onClose}
				aria-label='Закрыть уведомление'
			>
				×
			</button>
		</div>
	)
}

export default NotificationSnackbar
