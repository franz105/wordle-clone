import { useEffect, useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0) // current number of turns
    const [currGuess, setCurrGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // formatted guesses
    const [history, setHistory] = useState(["brave"]) // string
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({}) // {'a':'green', 'b':'gray'...}



    // returns a formatted array of letters from the guess
    // [{key: 'F', color: 'green'}, ...]
    const formatGuess = () =>{
        let solutionArray = [...solution]
        let formatedGuess = [...currGuess].map((ch) => {
            return {key: ch, color: 'gray'}
        })

        // chenge correct guess position to green
        formatedGuess.forEach((ch, i) => {
            if (solutionArray[i] === ch.key) {
                ch.color = 'green'
                solutionArray[i] = null
            }
        })

        // change wrong placed letter to yellow
        formatedGuess.forEach((ch, i) => {
            if (solutionArray.includes(ch.key) && ch.color != 'green') {
                ch.color = 'yellow'
                solutionArray[solutionArray.indexOf(ch.key)] = null
            }
        })
        
        return formatedGuess
    }

    const addNewGuess = (formatedGuess) => {
        if (currGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formatedGuess
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currGuess]
        })
        setTurn((prevTurn) =>{
            return prevTurn + 1
        })
        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys}
            
            formatedGuess.forEach((ch) => {
                const currentColor = newKeys[ch.key]

                if (ch.color === "green") {
                    newKeys[ch.key] = "green"
                    return
                }
                if (ch.color === "yellow" && currentColor !== "green") {
                    newKeys[ch.key] = "yellow"
                    return
                }
                if (ch.color === "gray" && currentColor !== "yellow" && currentColor !== "green") {
                    newKeys[ch.key] = "gray"
                    return
                }
            })

            return newKeys
        })

        setCurrGuess("")
    }

    const handleKeyup = ({ key }) => {
        if (key === "Backspace") {
            setCurrGuess((prev) => {
                return prev.slice(0,-1)
            })
            
        } else if (/^[A-Za-z]$/.test(key)) {
            if (currGuess.length < 5) {
                setCurrGuess((prev) => {
                    return prev + key.toLowerCase()
                })
            }
        } else if (key === "Enter") { // This handles the submission of words
            // 1. Turn has to be < 5
            if (turn > 5) {
                console.log("You only get 6 guesses")
                return
            }
            // 2. Do not allow duplicate words
            if (history.includes(currGuess)) {
                console.log(currGuess, " already used")
                return
            }
            // 3. length of the current guess is  < 5
            if (currGuess.length !== 5) {
                console.log("word must be 5 letters")
                return
            }

            //4. Maybe add a check if the current guess is a word
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currGuess}`)
                .then(response => response.json())
                .then(data => {
                    if ("title" in data) {
                        console.log(currGuess, " is not in our dictionary. Try a different word")
                        return 
                    }
                    const formattedGuess = formatGuess()
                    addNewGuess(formattedGuess)
                })
            
        }
    }



    return {turn, currGuess, guesses, history, isCorrect, handleKeyup, usedKeys}
}

export default useWordle