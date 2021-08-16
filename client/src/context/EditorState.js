import React, {useState, createContext} from 'react'
const EditorContext = createContext();
const EditorState = ( {children}) =>{
    const [code, setCode] = useState("");
    const [language, SetLanguage] = useState("cpp");
    const [output, setOutput] = useState("");
    const [input, SetInput] = useState("");

    return (
        <EditorContext.Provider
        value = {{
            code,
            setCode,
            language,
            SetLanguage,
            output,
            setOutput,
            input,
            SetInput
        }}
        >
            {children}
        </EditorContext.Provider>
    )
}

export default EditorState;