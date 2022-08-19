import React from 'react';
import './SingleCard.css';

const SingleCard = (props) => {
	const handleClick = () => {
		if (!props.disabled) {
			props.handleChoice(props.card);
		}
	};

	return (
		<div className='card'>
			<div className={props.flipped ? 'flipped' : ''}>
				<img className='front' src={props.card.src} alt='card front' />
				<img
					className='back'
					src='img/dog.png'
					onClick={handleClick}
					alt='card back'
				/>
			</div>
		</div>
	);
};

export default SingleCard;
