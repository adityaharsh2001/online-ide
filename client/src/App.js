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
import template from "./lib/templates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/fontawesome-free-solid";
import "ace-builds/src-noconflict/theme-dracula"
import uuid from "uuid";
const App = () => {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("c_cpp");
  const [ext, SetExt] = useState("cpp");
  const [output, setOutput] = useState("$ Output");
  const [input, SetInput] = useState("");
  const [status, SetStatus] = useState("");
  const [jobId, SetJobId] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

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
          if (jobStatus === "running") return;
          setOutput(jobOutput);
          setLoading(false);
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
    <div>
      <div className="App">
        <header
          style={{
            height: "7vh",
            backgroundColor: "#2D2F34",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            position: "static",
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
                padding: "10px",
                borderRadius: "20px",
                marginRight: "20px",
                color: "#fff",
                cursor: "pointer",
              }}  
              onClick={handleSubmit}  
            >
              {" "}
              {loading ? (
                <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </header> 
        <div style={{ display: "flex", height: "93vh" }}>
          <AceEditor
            className="editor"
            mode={mode}
            theme="dracula"
            height="100%"
            onChange={onChange}
            value={code}
            cols
            style={{ width: "100%" }}
            editorProps={{ $blockScrolling: true }}
            showPrintMargin={false}
            highlightActiveLine={true}
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
        > */}
          {/* </textarea> */}

          <div>
            <AceEditor
              theme="dracula"
              value={output + "\n" + status}
              readOnly={true}
              style={{ height: "50%" }}
              wrapEnabled={false}
              setOptions={{
                showGutter: false,
                highlightActiveLine: false,
                showLineNumbers: false,
                showPrintMargin: false,
              }}
            />
            <AceEditor
              theme="dracula"
              placeholder="STDIN"
              value={input}
              style={{ height: "50%" }}
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
    </div>
  );
};
export default App;
