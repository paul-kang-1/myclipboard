import {useState} from 'react';
import {Greet} from "../wailsjs/go/main/App";
import '@picocss/pico';

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e) => setName(e.target.value);
    const updateResultText = (result) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    return (
		<main className='container'>
			<div id="App">
				<div id="result" className="result">{resultText}</div>
				<div id="input" className="input-box">
					<input id="name" onChange={updateName} autoComplete="off" type="text"/>
					<div>
						<button onClick={greet}>Greet!</button>
					</div>
				</div>
			</div>
			<div id="App" class="grid">
			  <a href="#" role="button" class="outline">Link 1</a>
			  <a href="#" role="button" class="outline">Link 2</a>
			  <a href="#" role="button" class="outline">Link 3</a>
			</div>
		</main>
    )
}

export default App
