import { useState } from 'react'

function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key)
			if (item) {
				const parsed = JSON.parse(item)
				// Проверяем, есть ли все необходимые поля
				if (Array.isArray(parsed) && parsed.length > 0) {
					// Если это массив с объектами, проверяем наличие поля status
					if (parsed[0].status === undefined) {
						// Если status отсутствует, используем initialValue
						return initialValue
					}
				}
				return parsed
			}
			return initialValue
		} catch (error) {
			console.error(`Ошибка чтения из localStorage ключа "${key}":`, error)
			return initialValue
		}
	})

	const setValue = value => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value
			setStoredValue(valueToStore)
			window.localStorage.setItem(key, JSON.stringify(valueToStore))
		} catch (error) {
			console.error(`Ошибка записи в localStorage ключа "${key}":`, error)
		}
	}

	return [storedValue, setValue]
}

export default useLocalStorage
