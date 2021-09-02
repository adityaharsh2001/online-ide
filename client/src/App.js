import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/snippets/c_cpp";
import template from "./utils/templates";
import uuid from "uuid";
const App = () => {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("c_cpp");
  const [ext, SetExt] = useState("cpp");
  const [output, setOutput] = useState("$ Output");
  const [input, SetInput] = useState("");
  const [status, SetStatus] = useState("");
  const [jobId, SetJobId] = useState("");

  useEffect(() => {
    SetJobId(uuid());
    setCode(template[ext]);
  }, [ext]);
  const handleSubmit = async () => {
    const payload = {
      jobId,
      ext,
      code,
      input,
    };
    try {
      // SetJobId("");
      SetStatus("");
      setOutput("");
      const { data } = await axios.post(
        "http://192.168.29.68:5000/run",
        payload
      );
      // console.log(data);
      if (data.job) setOutput(data.jobOutput);

      let intervalId;

      intervalId = setInterval(async () => {
        const { data: dataRes } = await axios.get(
          "http://192.168.29.68:5000/status",
          { params: { id: data.jobid } }
        );

        const { success, job, error } = dataRes;
        // console.log(dataRes);
        if (success) {
          const { status: jobStatus, output: jobOutput } = job;
          SetStatus(jobStatus);
          if (jobStatus === "pending") return;
          setOutput(jobOutput);
          clearInterval();
          clearInterval(intervalId);
        } else {
          // console.error(error);
          setOutput(error);
        }
      }, 1000);
    } catch ({ response }) {
      if (response) {
        console.log(response);
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
    }
    if (lang === "cpp") {
      setMode("c_cpp");
    }
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
              let response = window.confirm(
                "Warning Switching The Language will remove your chnages"
              );
              if (response) SetExt(e.target.value);
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
          theme="monokai"
          onChange={onChange}
          value={code}
          name="UNIQUE_ID_OF_DIV"
          style={{ width: "100%", height: "100vh", fontSize: "15px" }}
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

        <div>
          <AceEditor
            theme="monokai"
            value={output + "\n" + status}
            readOnly={true}
            style={{ height: "50vh" }}
            setOptions={{
              showGutter: false,
              highlightActiveLine: false,
              showLineNumbers: false,
              showPrintMargin: false,
            }}
          />
          <AceEditor
            theme="monokai"
            placeholder="STDIN"
            value={input}
            style={{ height: "50vh" }}
            setOptions={{
              showGutter: false,
              highlightActiveLine: false,
              showLineNumbers: false,
              showPrintMargin: false,
            }}
            onChange={(e) => {
              SetInput(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default App;
