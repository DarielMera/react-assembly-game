function AlphabetLetter(props) {
    return ( 
        <button onClick={()=>{props.addGuessedLetter(props.letter)}}>{props.letter}</button>
     )
}

export default AlphabetLetter;