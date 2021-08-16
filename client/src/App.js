import axios from "axios";
import "./App.css";
import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-chaos";

function App() {
  const [code, setCode] = useState("");
  const [language, SetLanguage] = useState("cpp");
  const [output, setOutput] = useState("$ Output");
  const [input, SetInput] = useState("");
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

  function onChange(newValue) {
    console.log("change", newValue);
    setCode(newValue);
  }

  return (
    <div className="App">
      <header
        style={{
          height: "50px",
          backgroundColor: "#2D2F34",
          display: "flex",
          justifyContent: "space-between",
          width: "100vw",
          alignItems: "center",
        }}
      >
        <div>
          <select
            style={{
              width: "100px",
              marginLeft: "20px",
              height: "30px",
              border: "node",
            }}
            onChange={(e) => {
              SetLanguage(e.target.value);
            }}
            value={language}
          >
            <option value="cpp">C++</option>
            <option value="py">Python</option>
          </select>
        </div>
        <div>
          <button
            style={{
              backgroundColor: "#0356F3",
              width: "100px",
              border: "#0356F3",
              height: "30px",
              borderRadius: "20px",
              marginRight: "20px",
              color: "#fff",
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </header>
      <div style={{ display: "flex" }}>
        <AceEditor
          mode="c_cpp"
          theme="chaos"
          onChange={onChange}
          value={code}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          style={{ width: "50vw", height: "70vh", fontSize: "15px" }}
          showPrintMargin="false"
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true
          }}
        />

        {/* <textarea
          rows="20"
          cols="75"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        ></textarea> */}

        <div style={{ backgroundColor: "#1C2130", width: "50vw", color:"#fff" }}>
         <p>{`${output}`}</p>
        </div>
      </div>
      <textarea
        style={{
          backgroundColor: "#1C2130",
          width: "100vw",
          height: "25vh",
          fontSize: "15px",
        }}
        rows="10"
        cols="35"
        placeholder="Write custom Insput Here"
        value={input}
        onChange={(e) => {
          SetInput(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
export default App;
