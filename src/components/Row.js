import React from 'react'

export default function Row({ guess }) {

    if (guess) {
        return (
            <div className='row past'>
                {guess.map((ch, i) => (
                    <div key={i} className= {ch.color}>{ch.key}</div>
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
