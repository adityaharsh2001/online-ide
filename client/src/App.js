import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/fontawesome-free-solid";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/ext-emmet"
import "brace/ext/language_tools";
import template from "./lib/templates";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-sqlserver";
import {v1 as uuid} from "uuid";
const App = () => {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("c_cpp");
  const [ext, SetExt] = useState("cpp");
  const [output, setOutput] = useState("$ Output");
  const [theme, setTheme] = useState("dracula");
  const [input, SetInput] = useState("");
  const [status, SetStatus] = useState("");
  const [jobId, SetJobId] = useState("");
  const [fetching, isFetching] = useState(false);
  const [loading, isLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      isLoading(false)
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    SetJobId(uuid());
    setCode(template[ext]);
  }, [ext]);
  const handleSubmit = async () => {
    isFetching(true)
    const payload = {
      jobId,
      ext,
      code,
      input,
    };
    try {
      SetStatus("");
      setOutput("");
      const { data } = await axios.post(
        `/api/run`,
        payload
      );
      if (data.job) setOutput(data.jobOutput);

      let intervalId;

      intervalId = setInterval(async () => {
        const { data: dataRes } = await axios.get(
          `/api/status`,
          { params: { id: data.jobid } }
        );

        const { success, job, error } = dataRes;
        // console.log(dataRes);
        if (success) {
          const { status: jobStatus, output: jobOutput } = job;
          SetStatus(jobStatus);
          if (jobStatus === "running") return;
          setOutput(jobOutput);
          isFetching(false);
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

  const setThemeHandler = (e) => {
    console.log(e.target.value);
  };


  const setmode = (ext) => {
    if (ext === "py") {
      setMode("python");
    }
    if (ext === "cpp") {
      setMode("c_cpp");
    }
    if (ext === "java"){
      setMode("java")
    }
  };


  return (
    <div>
      <div className="App">
        <header
          style={{
            height: "50px",
            backgroundColor: "#1D1E22",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            position: "static",
          }}
        >
          <div className="select">
            <select
              onChange={(e) => {
                let response = window.confirm(
                  "Warning Switching The Language will remove your chnages"
                );
                if (response){ SetExt(e.target.value);
                setmode(e.target.value);}
              }}
              value={ext}
            >
              <option value="cpp">C++</option>
              <option value="py">Python</option>
              <option value="java">Java</option>
            </select>
          </div>

          <div className="select">
            <select
              onChange={(e) => {
                setTheme(e.target.value);
                console.log(e.target.value);
              }}
            >

              <option value="dracula">dracula</option>
              <option value="monokai">monokai</option>
              <option value="github">Github</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="xcode">Xcode</option>
              <option value="kuroir">Kuroir</option>
              <option value="textmate">Textmate</option>
              <option value="solarized_dark">Solarized Dark</option>
              <option value="solarized_light">Solarized Light</option>
              <option value="terminal">Terminal</option>
            </select>
          </div>
          <div>
            <button onClick={handleSubmit} disabled = {fetching}>
              
              {fetching ? (
                <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </header>
       </div>

      {loading? (<div className="logo">
        <span className="left">&#123;</span>
        <span className="right">&#125;</span>
        <span className="text">
          IDE
          <br />
          <strong>GEEK</strong>
        </span>
      </div>): ( <div
          style={{
            display: "flex",
            position: "absolute",
            top: "50px",
            bottom: "0",
            right: "0",
            left: "0",
          }}
        >
          <AceEditor
            className="editor"
            mode={mode}
            theme={theme}
            height="100%"
            onChange={onChange}
            value={code}
            style={{ width: "100%" }}
            editorProps={{ $blockScrolling: true }}
            showPrintMargin={false}
            highlightActiveLine={true}
            enableBasicAutocompletion = {true}
            enableLiveAutocompletion={true} 
            enableSnippets={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
          />

          <div style={{
            maxWidth:"50vw"
          }}>
            <AceEditor
              theme={theme}
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
              theme={theme}
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
      )}
    </div>
  );
};
export default App;
