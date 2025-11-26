import React from 'react'

function Settings() {
	return (
		<div className='settings-container'>
			<h1> Настройки Приложения</h1>
			<p>Управляйте своими предпочтениями и учетной записью.</p>

			<section>
				<h2>Профиль</h2>
				<label>
					Имя пользователя: <input type='text' defaultValue='ВашеИмя' />
				</label>
				<br />
				<label>
					Email: <input type='email' defaultValue='user@example.com' />
				</label>
			</section>

			<section style={{ marginTop: '20px' }}>
				<h2>Уведомления</h2>
				<label>
					<input type='checkbox' defaultChecked /> Получать email-уведомления
				</label>
			</section>

			<button style={{ marginTop: '30px', padding: '10px 20px' }}>
				Сохранить Изменения
			</button>
		</div>
	)
}

export default Settings
