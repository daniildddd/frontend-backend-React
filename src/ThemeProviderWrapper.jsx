import { createContext, useState, useMemo, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

export const ColorModeContext = createContext({ toggleColorMode: () => {} })

function ThemeProviderWrapper({ children }) {
	// Загружаем сохраненную тему или используем светлую по умолчанию
	const [mode, setMode] = useState(() => {
		const savedMode = localStorage.getItem('themeMode')
		return savedMode || 'light'
	})

	// Сохраняем тему при изменении
	useEffect(() => {
		localStorage.setItem('themeMode', mode)
	}, [mode])

	// Контекст для переключения темы
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
			},
			mode,
		}),
		[mode]
	)

	// Создаем тему на основе текущего режима
	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					primary: {
						main: '#667eea',
					},
					secondary: {
						main: '#764ba2',
					},
					...(mode === 'light'
						? {
								// Светлая тема
								background: {
									default: '#f5f5f5',
									paper: '#ffffff',
								},
						  }
						: {
								// Темная тема
								background: {
									default: '#121212',
									paper: '#1e1e1e',
								},
						  }),
				},
				typography: {
					fontFamily: [
						'-apple-system',
						'BlinkMacSystemFont',
						'"Segoe UI"',
						'Roboto',
						'"Helvetica Neue"',
						'Arial',
						'sans-serif',
					].join(','),
				},
				shape: {
					borderRadius: 12,
				},
				components: {
					MuiButton: {
						styleOverrides: {
							root: {
								textTransform: 'none',
								fontWeight: 600,
							},
						},
					},
					MuiCard: {
						styleOverrides: {
							root: {
								boxShadow:
									mode === 'light'
										? '0 2px 8px rgba(0,0,0,0.05)'
										: '0 2px 8px rgba(0,0,0,0.3)',
							},
						},
					},
				},
			}),
		[mode]
	)

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}

export default ThemeProviderWrapper
