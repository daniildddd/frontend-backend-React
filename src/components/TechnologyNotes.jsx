import React from 'react'
import './TechnologyNotes.css'

function TechnologyNotes({ notes, onNotesChange, techId }) {
	return (
		<div className='notes-section'>
			<h4 className='notes-section__title'>Мои заметки:</h4>
			<textarea
				value={notes}
				onChange={(e) => onNotesChange(techId, e.target.value)}
				placeholder='Записывайте сюда важные моменты...'
				rows='3'
				className='notes-section__textarea'
			/>
			<div className='notes-hint'>
				{notes.length > 0
					? `Заметка сохранена (${notes.length} символов)`
					: 'Добавьте заметку'}
			</div>
		</div>
	)
}

export default TechnologyNotes
