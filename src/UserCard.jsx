// src/UserCard.jsx
function UserCard({ name, role, avatarUrl, isOnline }) {
	return (
		<div className='user-card'>
			{/* Секция с аватаром */}
			<div className='avatar-section'>
				{/* Отображаем изображение аватара */}
				<img src={avatarUrl} alt={`Аватар ${name}`} />
				{/* Условный рендеринг: если isOnline === true, показываем 'online', иначе
'offline' */}
			</div>
			<p>Статус: {isOnline ? 'online' : 'offline'}</p>
			{/* Секция с информацией о пользователе */}
			<div className='user-info'>
				<h3>{name}</h3>
				<p>{role}</p>
			</div>
		</div>
	)
}
export default UserCard
