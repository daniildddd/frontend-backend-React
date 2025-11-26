import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ isLoggedIn, children }) {
	if (isLoggedIn) {
		return children
	}
	return <Navigate to='/login' replace />
}

export default ProtectedRoute
