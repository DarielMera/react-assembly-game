import { useState, useRef } from "react"
import { languages } from "./languages"
import clsx from "clsx"
import { getFarewellText, getRandomWord } from "./utils"
import Confetti from "react-confetti"

/**
 * Backlog:
 *
 * ✅ Farewell messages in status section - checked
 * ✅ Disable the keyboard when the game is over
 * ✅ Fix a11y issues
 * ✅ Choose a random word from a list of words
 * ✅ Make the new game button work
 * ✅ Reveal what the word was if the user loses the game
 * ✅ Confetti drop when the user wins
 */

function AssemblyEndgame() {
	const [currentWord, setCurrentWord] = useState(() => getRandomWord())
	const [guessedLetters, setGuessedLetters] = useState([])

	const numGuessesLeft = languages.length - 1
	const wrongGuessesCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
	const isWinner = currentWord.split("").every(letter => guessedLetters.includes(letter))
	const isLooser = wrongGuessesCount >= numGuessesLeft
	const isGameOver = isLooser || isWinner
	const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
	const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

	const alphabet = "abcdefghijklmnopqrstuvwxyz"

	const addGuessedLetter = letter => {
		setGuessedLetters(prevLetters =>
			prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
		)
	}

	const languageElements = languages.map((language, index) => {
		const isLanguageLost = index < wrongGuessesCount
		const styles = {
			backgroundColor: language.backgroundColor,
			color: language.color,
		}

		const className = clsx("chip", isLanguageLost && "lost")

		return (
			<span className={className} key={language.name} style={styles}>
				{language.name}
			</span>
		)
	})

	const letterElements = currentWord.split("").map((letter, index) => {
		return (
			<span key={index}>{guessedLetters.includes(letter) ? letter.toLocaleUpperCase() : ""}</span>
		)
	})

	const keyboardElements = alphabet.split("").map(letter => {
		const isGuessed = guessedLetters.includes(letter)
		const isCorrect = isGuessed && currentWord.includes(letter)
		const isWrong = isGuessed && !currentWord.includes(letter)
		const className = clsx({
			correct: isCorrect,
			wrong: isWrong,
		})

		return (
			<button
				className={className}
				key={letter}
				disabled={isGameOver}
				aria-disabled={guessedLetters.includes(letter)}
				aria-label={`Letter ${letter}`}
				onClick={() => addGuessedLetter(letter)}>
				{letter.toUpperCase()}
			</button>
		)
	})

	const gameStatusElementCssStyle = clsx("game-status", {
		won: isWinner,
		lost: isLooser,
		farewell: !isGameOver && wrongGuessesCount > 0,
	})

	const gameStatusElement = isWinner ? (
		<div>
			<h2>You Won!</h2> <p>Well done</p>
		</div>
	) : isLooser ? (
		<div>
			<h2>Game Over!</h2>
			<p>You better start learning Assembly!</p>
		</div>
	) : wrongGuessesCount > 0 ? (
		<div>
			<h1>{getFarewellText(languages[wrongGuessesCount - 1].name)}</h1>
		</div>
	) : (
		<div>
			<h2>Game</h2> <p>Status</p>
		</div>
	)


	function startNewGame() {
		setCurrentWord(getRandomWord())
		setGuessedLetters([])
	}

	const revealMissingLetters = isLooser && currentWord.split("").map((letter, index) => {
		return guessedLetters.includes(letter) ? (
			<span key={index}>{letter.toLocaleUpperCase()}</span>
		) : (
			<span key={index} style={{color: "#ba2a2a"}}>{letter.toLocaleUpperCase()}</span>
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
			<section aria-live="polite" role="status" className={gameStatusElementCssStyle}>
				{gameStatusElement}
			</section>
			<section className="language-chips">{languageElements} </section>
			<section className="letters-container">{isLooser ? revealMissingLetters : letterElements}</section>
			{/* Combined visually-hidden aria-live region for status updates */}

			<section className="sr-only" aria-live="polite" role="status">
				<p>
					{currentWord.includes(lastGuessedLetter)
						? `Correct! The letter ${lastGuessedLetter} is in the word.`
						: `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
					You have {numGuessesLeft} attempts left.
				</p>
				<p>
					{" "}
					Current word:{" "}
					{currentWord
						.split("")
						.map(letter => (guessedLetters.includes(letter) ? letter + "." : "blank."))
						.join(" ")}
				</p>
			</section>

			<section className="keyboard">{keyboardElements}</section>
			{isGameOver && (
				<button className="new-game-btn" onClick={startNewGame}>
					New Game!
				</button>
			)}

			{isWinner && <Confetti recycle={false} numberOfPieces={1000}/>}
		</main>
	)
}

export default AssemblyEndgame
