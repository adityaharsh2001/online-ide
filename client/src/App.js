import axios from "axios";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [code, setCode] = useState("");
  const [language, SetLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [input,SetInput] = useState("");
  const handleSubmit = async () => {
    const payload = {
      language,
      code,
      input,
    };
    try {
      const { data } = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <div>
        <select
          onChange={(e) => {
            SetLanguage(e.target.value);
          }}
          value={language}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <textarea
        rows="20"
        cols="75"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <textarea
        rows="10"
        cols="35"
        value={input}
        onChange={(e) => {
          SetInput(e.target.value);
        }}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
    </div>
  );
}

export default App;
