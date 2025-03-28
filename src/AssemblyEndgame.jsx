import { useState } from "react"
import Language from "./components/Language"
import AlphabetLetter from "./components/AlphabetLetter"
import { languages } from "./languages"

function AssemblyEndgame() {
	const [currentWord, setCurrentWord] = useState("react")
	const [guessedLetters, setGuessedLetters] = useState([])

	function addGuessedLetter(pressedLetter){
		setGuessedLetters((prevGuessLetter) => 
		prevGuessLetter.includes(pressedLetter) ? prevGuessLetter :	[...prevGuessLetter, pressedLetter]
	)
	}

console.log(guessedLetters);

	const alphabet = "abcdefghijklmnopqrstuvwxyz"
	const keyboardElements = alphabet.toUpperCase().split("").map((letter, index)=>{
		return <AlphabetLetter key={letter} letter={letter} addGuessedLetter={addGuessedLetter}/>
	})

	const letterElements = currentWord
		.toLocaleUpperCase()
		.split("")
		.map((letter, index) => {
			return <span key={index}>{letter}</span>
		})


	const languageElements = languages.map((language) => {
		return (
			<Language
				key={language.name}
				name={language.name}
				backgroundColor={language.backgroundColor}
				color={language.color}
			/>
		)
	})

	return (
		<main className="main-container">
			<header>
				<h1 className="title">Assembly: Endgame</h1>
				<p className="description">
					Guess the word withing 8 attempts to keep the programming world safe from Assembly!
				</p>
			</header>
			<section className="game-status">
				<h2>You win!</h2>
				<p>Well done</p>
			</section>
			<section className="languages-container">{languageElements} </section>
			<section className="letters-container">{letterElements}</section>
			<section className="keyboard">
				{keyboardElements}
			</section>
			<button className="new-game-btn">New Game</button>
		</main>
	)
}

export default AssemblyEndgame
