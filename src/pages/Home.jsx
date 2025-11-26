import { Link } from 'react-router-dom'

function Home() {
	return (
		<div className='page home-page'>
			<h1> Добро пожаловать в Трекер Технологий!</h1>
			<p>
				Ваш личный инструмент для отслеживания прогресса в изучении новых
				фреймворков и библиотек.
			</p>
			<div className='home-actions'>
				<Link to='/technologies' className='btn btn-primary btn-large'>
					Посмотреть мои технологии
				</Link>
				<Link to='/add-technology' className='btn btn-secondary btn-large'>
					Начать отслеживание
				</Link>
			</div>
			<p style={{ marginTop: '20px' }}>
				Это приложение использует **React Router** для быстрой навигации без
				перезагрузки страницы.
			</p>
		</div>
	)
}

export default Home
