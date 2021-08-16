import React, { useState } from "react";
function Editor() {
  const [code, setCode] = useState("");
  const [language, SetLanguage] = useState("cpp");
  return (
    <div>
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
    </div>
  );
}
export default Editor;
