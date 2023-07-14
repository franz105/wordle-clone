import { useEffect, useState } from "react";
import Wordle from "./components/Wordle"

function App() {
  const [solution, setSolution] = useState(null)
  useEffect(() => {
    fetch("http://localhost:8000/api/get_word/", {
      headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },})
      .then(response => response.json())
      .then(data => {
        setSolution(data.word.toLowerCase())
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
