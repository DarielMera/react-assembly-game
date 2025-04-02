import { useState, useEffect } from "react"
import { languages } from "./languages"
import clsx from "clsx"

function AssemblyEndgame() {
	const [currentWord, setCurrentWord] = useState("react")
	const [guessedLetters, setGuessedLetters] = useState([])
	console.log(guessedLetters);

	const alphabet = "abcdefghijklmnopqrstuvwxyz"

	const addGuessedLetter = letter => {
		setGuessedLetters(prevLetters =>
			prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
		)
	}


	const languageElements = languages.map(language => {
		const styles = {
			backgroundColor: language.backgroundColor,
			color: language.color
		}
		return (
			<span
				className="chip"
				key={language.name}
				style={styles}
			>
				{language.name}
			</span>
		)
	})

	const letterElements = currentWord.split("").map((letter, index) => {
		return <span key={index}>{letter.toLocaleUpperCase()}</span>
	})


	const keyboardElements = alphabet.split("").map(letter => {
		return (
			<button
				key={letter}
				onClick={()=>addGuessedLetter(letter)}
			>
				{letter.toUpperCase()}
			</button>
		)
	})

	return (
		<main className="main-container">
			<header>
				<h1 className="title">Assembly: Endgame</h1>
				<p className="description">
					Guess the word within 8 attempts to keep the programming world safe from Assembly!
				</p>
			</header>
			<section className="game-status">
				<h2>You win!</h2>
				<p>Well done</p>
			</section>
			<section className="language-chips">{languageElements} </section>
			<section className="letters-container">{letterElements}</section>
			<section className="keyboard">{keyboardElements}</section>
			<button className="new-game-btn">New Game</button>
		</main>
	)
}

export default AssemblyEndgame
