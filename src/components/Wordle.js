import React, {useEffect, useState} from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import KeyPad from './KeyPad'
import Modal from './Modal'

export default function Wordle({solution}) {

    const { currGuess, handleKeyup, guesses, isCorrect, turn, usedKeys} = useWordle(solution)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        if (isCorrect) {
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        }

        if (turn > 5) {
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        }


        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn])

    return (
        <div>
            <div>current word: {solution}</div>
            <div>current guess: {currGuess}</div>
            <Grid currGuess = {currGuess} guesses={guesses} turn = {turn}/>
            <KeyPad usedKeys = {usedKeys}/>
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
        </div>
        
        )
}
