import { useState } from "react"
import Language from "./components/Language"
import AlphabetLetter from "./components/AlphabetLetter"
import {languages} from "./languages"

function AssemblyEndgame() {
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
			<section className="letters-container">
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
				<div>5</div>
			</section>
			<section>
				<AlphabetLetter />
				<span>* 26 Repeat</span>
			</section>
			<button className="newgame-btn">!New Game</button>
		</main>
	)
}

export default AssemblyEndgame
