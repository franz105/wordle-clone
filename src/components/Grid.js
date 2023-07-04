import React from 'react'
import Row from './Row'

export default function Grid({currGuess, guesses, turn}) {
  return (
    <div>{
        guesses.map((guess, i) => { 
            if (turn === i) {
                return <Row key={i} currGuess={currGuess}/>
            }
            return <Row key={i} guess={guess}/>
        })  
    }</div>
  )
}
