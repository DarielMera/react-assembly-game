import { useState } from "react"
import Language from "./components/Language"
import AlphabetLetter from "./components/AlphabetLetter"
import { languages } from "./languages"

function AssemblyEndgame() {
	const [currentWord, setCurrentWord] = useState("react")

	const alphabet = "abcdefghijklmnopqrstuvwxyz"
	const alphabetLetters = alphabet.toUpperCase().split("").map((letter, index)=>{
		return <AlphabetLetter letter={letter}/>
	})

	const letterElements = currentWord
		.toLocaleUpperCase()
		.split("")
		.map((letter, index) => {
			return <span key={index}>{letter}</span>
		})


	const languageElements = languages.map((language, index) => {
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
			<section>
				<AlphabetLetter />
				<span>* 26 Repeat</span>
			</section>
			<button className="newgame-btn">!New Game</button>
		</main>
	)
}

export default AssemblyEndgame
