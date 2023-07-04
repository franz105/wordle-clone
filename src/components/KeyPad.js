import React, { useEffect, useState } from 'react'

export default function KeyPad({usedKeys}) {
  const [letters, setLetters] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3001/letters")
    .then((response) => response.json())
    .then(json => {
        setLetters(json)
    })
  }

  , [])
  return (
    <div className='keypad'>
        {letters && letters.map((ch) => {
            const color = usedKeys[ch.key]
            return ( 
                <div key={ch.key} className={color}>{ch.key}</div>
            )
        })}
    </div>
  )
}
