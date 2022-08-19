import './App.css';
import React, { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

function App() {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setchoiceOne] = useState(null);
	const [choiceTwo, setchoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	const [cardImg, setCardImg] = useState([]);
	//api

	useEffect(() => {
		const url = 'https://dog.ceo/api/breed/hound/images';

		fetch(url)
			.then((responseJson) => responseJson.json())
			.then((data) => setCardImg(data.message));
	}, []);

	function randomImg() {
		let random__idx = Math.floor(Math.random() * cardImg.length);
		console.log(random__idx);

		let selected__img = cardImg[random__idx];
		return selected__img;
	}

	let cardImages = [];
	while (cardImages.length < 6) {
		let r = Math.floor(Math.random() * cardImg.length);
		if (cardImages.indexOf(r) === -1)
			cardImages.push({ src: randomImg(), matched: false });
	}
	console.log(cardImages);

	const shuffleCards = () => {
		const shuffleCards = [...cardImages, ...cardImages]
			.sort(() => Math.random())
			.map((card) => ({ ...card, id: Math.random() }));
		setchoiceOne(null);
		setchoiceTwo(null);
		setCards(shuffleCards);
		setTurns(0);
	};

	const handleChoice = (card) => {
		choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
	};

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				resetTurn();
			} else {
				setTimeout(() => resetTurn(), 1000);
			}
		}
	}, [choiceOne, choiceTwo]);

	console.log(cards);

	const resetTurn = () => {
		setchoiceOne(null);
		setchoiceTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
		setDisabled(false);
	};

	useEffect(() => {
		shuffleCards();
	}, []);

	return (
		<div className='App'>
			<h1>Magic Dogs</h1>
			<button onClick={shuffleCards}>New Game</button>
			<div className='card-grid'>
				{cards.map((card) => (
					<SingleCard
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns: {turns}</p>
		</div>
	);
}

export default App;
