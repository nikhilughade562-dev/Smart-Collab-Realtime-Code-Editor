import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import toast from "react-hot-toast";
import ACTIONS from "../Actions.js";
import copyIcon from "../assets/CopyIcon.png";
import runIcon from "../assets/RunIcon.png";
import downloadIcon from "../assets/downloadicon.png";
import { useAppContext } from "../Context/AppContext.jsx";
import axios from "axios";

const CodeEditor = ({ socketRef, roomId }) => {
  const { loadCode, setloadCode, output, setOutput } = useAppContext();
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(loadCode);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const isRemoteUpdate = useRef(false);
  const saveTimeout = useRef(null);
  const [consoleHeight, setConsoleHeight] = useState(180);
  const isVerticalResizing = useRef(false);
  const editorWrapperRef = useRef(null);

  const startVerticalResize = () => {
    isVerticalResizing.current = true;
  };

  const stopVerticalResize = () => {
    isVerticalResizing.current = false;
  };

  const verticalResize = (e) => {
    if (!isVerticalResizing.current || !editorWrapperRef.current) return;
    const rect = editorWrapperRef.current.getBoundingClientRect();
    const newHeight = rect.bottom - e.clientY;
    const minConsole = 120;
    const maxConsole = rect.height - 200;
    if (newHeight > minConsole && newHeight < maxConsole) {
      setConsoleHeight(newHeight);
    }
  };

  //-----------------Code Execution---------------------
  const BASE_URL = "http://localhost:4000";

  const handleRun = async () => {
    try {
      setLoading(true);
      setOutput("");
      const response = await axios.post(`${BASE_URL}/api/code/run`, {
        language,
        code,
        input,
      });

      const { stdout, stderr } = response.data.output;
      setOutput(stdout || stderr || "No Output");
    } catch (error) {
      console.error(error);

      setOutput(error.response?.data?.message || "Execution failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LANGUAGE EXTENSION ----------------
  const getLanguageExtension = () => {
    switch (language) {
      case "python":
        return python();
      case "java":
        return java();
      default:
        return cpp();
    }
  };

  // ---------------- COPY ----------------
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Text Copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  const handleLanguageChange=(e)=>{
    const selectedLanguage=e.target.value;
    setLanguage(selectedLanguage);

    //sync across user
    socketRef.current.emit(ACTIONS.LANGUAGE_CHANGE,{
        roomId,
        language:selectedLanguage
    });
  }

   useEffect(() => {
    if(!socketRef.current) return;
    const handleLanguageUpdate = ({language}) => {
        setLanguage(language);
    };
    socketRef.current.on(
        ACTIONS.LANGUAGE_CHANGE,
        handleLanguageUpdate
    );

    return ()=>{
        socketRef.current.off(
            ACTIONS.LANGUAGE_CHANGE,
            handleLanguageUpdate
        );
    };
},[language]);

  // ---------------- DOWNLOAD ----------------
  const handleDownload = () => {
    const extensionMap = {
      python: "py",
      java: "java",
      cpp: "cpp",
    };
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${extensionMap[language] || "txt"}`;
    a.click();

    URL.revokeObjectURL(url);
    toast.success("Downloaded");
  };

  // ---------------- LOCAL CHANGE (EMIT) ----------------
  const handleCodeChange = (value) => {
    setCode(value);
    // Prevent loop + safety check
    if (isRemoteUpdate.current) return;
    if (!socketRef.current) return;

    //instant sync
    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      code: value,
    });

    // debounce save
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }
    // debounce save after 5ms
    saveTimeout.current = setTimeout(() => {
      socketRef.current.emit(ACTIONS.CODE_SAVE, {
        roomId,
        code: value,
      });
    }, 500);
  };

  useEffect(() => {
    setCode(loadCode);
  }, [loadCode]);

  // ---------------- REMOTE CHANGE (LISTEN) ----------------
  useEffect(() => {
    if (!socketRef.current) return;

    const handleRemoteCodeChange = ({ code: incomingCode }) => {
      if (incomingCode === null) return;
      isRemoteUpdate.current = true;
      setCode(incomingCode);
      isRemoteUpdate.current = false;
    };

    socketRef.current.on(ACTIONS.CODE_CHANGE, handleRemoteCodeChange);
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE, handleRemoteCodeChange);
    };
  }, [code]);

  return (
    <div className="min-w-[78.9rem] h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="w-full bg-black px-5 py-2 flex justify-between border-b-2 border-white">
        <div className="flex gap-2">
          <h2>Select Language:</h2>
          <select
            className="bg-black border-[0.1rem] rounded-sm"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <div className=" mr-10 flex items-center gap-10">
          <img onClick={handleRun} src={runIcon} className="w-5 h-5" alt="" />
          <img onClick={handleCopy} src={copyIcon} className="w-5 h-5" alt="" />
          <img
            onClick={handleDownload}
            src={downloadIcon}
            className="w-5 h-5"
            alt=""
          />
        </div>
      </div>

      {/* CODE EDITOR */}
      <div
        ref={editorWrapperRef}
        className="flex flex-col flex-1 overflow-hidden h-160"
        onMouseMove={verticalResize}
        onMouseUp={stopVerticalResize}
      >
        {/* CODE EDITOR */}
        <div className="flex-1 overflow-hidden">
          <CodeMirror
            key={language}
            value={code}
            width="100%"
            height="100%"
            theme={oneDark}
            extensions={[
              getLanguageExtension(),
              EditorView.theme({
                "&": { fontSize: "16px" },
              }),
            ]}
            onChange={handleCodeChange}
          />
        </div>

        {/* VERTICAL RESIZE DIVIDER */}
        <div
          onMouseDown={startVerticalResize}
          className="h-2 cursor-row-resize bg-gray-700 hover:bg-gray-500"
        ></div>

        {/* CONSOLE */}
        <div
          style={{ height: `${consoleHeight}px` }}
          className="bg-black border-t-2 border-white flex flex-col"
        >
          {/* INPUT */}

          <div className="border-b border-gray-700 p-2">
            <h2 className="mb-2 font-semibold">Input</h2>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter program input..."
              className="w-full h-20 bg-[#1e1e1e] text-white p-2 resize-none outline-none border border-gray-600 rounded"
            />
          </div>

          {/* OUTPUT */}

          <div className="flex-1 p-2 w-6xl">
            <h2 className="mb-2 font-semibold">Output</h2>

            {loading ? (
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></div>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap">{output}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
