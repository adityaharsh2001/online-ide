import axios from "axios";
import "./App.css";
import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/snippets/c_cpp";
import "brace/ext/language_tools";

const App = () => {
  const [code, setCode] = useState(`#include<iostream>
  using namespace std;
  
  int main()
  {
    // Code here
    return 0;
  }`);
  const [mode, setMode] = useState("c_cpp");
  const [ext, SetExt] = useState("cpp");
  const [output, setOutput] = useState("$ Output");
  const [input, SetInput] = useState("");
  const [status, SetStatus] = useState("");
  const [jobid, SetJobid] = useState("");
  const handleSubmit = async () => {
    const payload = {
      ext,
      code,
      input,
    };
    try {
      SetJobid("")
      SetStatus("")
      setOutput("")
      const { data } = await axios.post("http://localhost:5000/run", payload);
      console.log(data);
      setOutput(data.jobid);

      let intervalId;

      intervalId = setInterval(async () => {
        const { data: dataRes } = await axios.get(
          "http://localhost:5000/status",
          { params: { id: data.jobid } }
        );

        const { success, job, error } = dataRes;
        console.log(dataRes);
        if (success) {
          const { status: jobStatus, output: jobOutput } = job;
          SetStatus(jobStatus);
          if (jobStatus === "pending") return;
          setOutput(jobOutput);
          clearInterval();
          clearInterval(intervalId);
        } else {
          console.error(error);
          setOutput(error);
        }
      }, 1000);
    } catch ({ response }) {
      if (response) {
        // console.log(response)
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
      } else {
        window.alert("Error Connection To server");
      }
    }
  };

  const onChange = (newValue) => {
    // console.log("change", newValue);
    setCode(newValue);
  };

  const setmode = (lang) => {
    if (lang === "py") {
      setMode("python");
      setCode(`#!/usr/bin/env python3
      """
      Module Docstring
      """
      
      __author__ = "Your Name"
      __version__ = "0.1.0"
      __license__ = "MIT"
      
      
      def main():
          """ Main entry point of the app """
          print("hello world")
      
      
      if __name__ == "__main__":
          """ This is executed when run from the command line """
          main()`);
    }
    if (lang === "cpp") setMode("c_cpp");
  };

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
              SetExt(e.target.value);
              setmode(e.target.value);
            }}
            value={ext}
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
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </header>
      <div style={{ display: "flex" }}>
        <AceEditor
          mode={mode}
          theme="chaos"
          onChange={onChange}
          value={code}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          style={{ width: "50vw", height: "70vh", fontSize: "15px" }}
          showPrintMargin={false}
          highlightActiveLine={false}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
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

        <div
          style={{
            backgroundColor: "#1C2130",
            width: "50vw",
            color: "#fff",
            padding: "10px",
          }}
        >
          <p>{output}</p>
          <p>{status}</p>
          <p>{jobid && `JobID: ${jobid}`}</p>
        </div>
      </div>
      <textarea
        style={{
          backgroundColor: "#1C2130",
          width: "100vw",
          height: "25vh",
          fontSize: "15px",
          color: "#fff",
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
};
export default App;
