import { useEffect, useState } from "react";
import Wordle from "./components/Wordle"

function App() {
  const [solution, setSolution] = useState(null)
  useEffect(() => {
    fetch('http://localhost:3001/words')
      .then(response => response.json())
      .then(jsonFile => {
        const randomWord = jsonFile[Math.floor(Math.random() * jsonFile.length)]
        setSolution(randomWord.word.toLowerCase())
      })
  }, [setSolution]);
  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution}/>}
    </div>
  );
}

export default App;
