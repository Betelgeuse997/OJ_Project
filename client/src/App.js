
import axios from "axios";
import "./App.css";
import React, {useState} from "react";

function App() {

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    const payload = {
      language: "cpp",
      code
    };
    try {
    const {data} = await axios.post("http://localhost:5000/run", payload)
    setOutput(data.output);
    }
    catch (err)
    {
      console.log(err.response);
    }
  }

  return (
    <div className="App">
      <h1> Coders Arena</h1>
      <textarea 
      rows = "30" 
      cols = "90" 
      value={code} 
      onChange={(e) => {
        setCode(e.target.value)
        }}>

        </textarea>
      <br />
      
      <button onClick={handleSubmit}>SUBMIT</button>
      <p>{output}</p>
    </div>
  );
}

export default App;
