import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0) // current number of turns
    const [currGuess, setCurrGuess] = useState('')
    const [guesses, setGuesses] = useState([]) // formatted guesses
    const [history, setHistory] = useState([]) // string
    const [isCorrect, setIsCorrect] = useState(false)



    // returns a formatted array of letters from the guess
    // [{key: 'F', color: 'green'}, ...]
    const formatGuess = () =>{

    }

    const addNewGuess = () => {

    }

    const handleKeyup = ({ key }) => {
        if (key == "Backspace") {
            setCurrGuess((prev) => {
                return prev.slice(0,-1)
            })
            
        } else if (/^[A-Za-z]$/.test(key)) {
            if (currGuess.length < 5) {
                setCurrGuess((prev) => {
                    return prev + key
                })
            }
        }
    }



    return {turn, currGuess, guesses, history, isCorrect, handleKeyup}
}

export default useWordle