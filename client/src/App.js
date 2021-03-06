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
import {v1 as uuid} from "uuid";
const App = () => {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("c_cpp");
  const [ext, SetExt] = useState("cpp");
  const [output, setOutput] = useState("$ Output");
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
      // SetJobId("");
      
      SetStatus("");
      setOutput("");
      const { data } = await axios.post(
        `/api/run`,
        payload
      );
      // console.log(data);
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
            theme="dracula"
            height="100%"
            onChange={onChange}
            value={code}
            minLines="50"
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

          {/* <textarea
          rows="20"
          cols="75"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
    
          }}
        > */}
          {/* </textarea> */}

          <div style={{
            maxWidth:"50vw"
          }}>
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
      )}
    </div>
  );
};
export default App;
