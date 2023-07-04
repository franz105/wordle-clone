import React from 'react'

export default function Row({ guess , currGuess}) {

    if (guess) {
        return (
            <div className='row past'>
                {guess.map((ch, i) => (
                    <div key={i} className= {ch.color}>{ch.key}</div>
                ))}
            </div>
        )
    }

    if (currGuess) {
        let letters = currGuess.split('')

        return (
            <div className='row current'>
                {letters.map((ch, i) => (
                    <div key={i} className="filled">{ch}</div>
                ))}
                {[...Array(5 - letters.length)].map((ch, i) => (
                    <div key={i}></div>
                ))}
            </div>
        )
    }

    return (
        <div className = "row">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
