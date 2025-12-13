import React, { useState, useRef, useEffect, memo } from "react";
import SimpleFrame from "./SimpleFrame";
import "../index.css";
import { createCommandProcessor } from "./Utils/commandProcessor";
import { useFileSystem } from "../context/FileSystemContext";
import NanoEditor from "./NanoEditor";
import './component.css';
import { useWindowManager } from "../context/WindowManagerContext";

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: "text", content: "Last login: Thu Jun 5 on ttys000 (type man command for more details)" }
  ]);
  const { closeWindow } = useWindowManager();



  const [input, setInput] = useState("");

  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const [nano, setNano] = useState(null); // { filename, content }

  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const { fileSystem, updateFileSystem, currentPath, updateCurrentPath } =
    useFileSystem();

  const { runCommand, getPromptPath, getSuggestions } =
    createCommandProcessor(fileSystem, updateFileSystem, currentPath, updateCurrentPath);

  /* ------------------- RUN COMMAND ------------------- */
  const handleCommand = async (command) => {
    const trimmed = command.trim();
    if (trimmed.length) setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newHistory = [
      ...history,
      { type: "command", content: `${getPromptPath()} % ${command}` }
    ];

    const output = await runCommand(command);

    // 🧹 CLEAR
    if (output === "__CLEAR__") {
      setHistory([]);
      setInput("");
      return;
    }

    if (output === "__EXIT__") {
      closeWindow("terminal");
      return;
    }

    // NANO MODE
    if (output?.__NANO__) {
      inputRef.current?.blur();
      setNano({
        filename: output.__NANO__.filename,
        content: output.__NANO__.content
      });
      setInput("");
      return;
    }

    if (output !== null) {
      newHistory.push({
        type: "output",
        content: output === "" ? " " : output
      });
    }

    setHistory(newHistory);
    setInput("");
  };


  /* ------------------- TERMINAL KEYS ------------------- */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") return handleCommand(input);

    if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      setHistory((prev) => [
        ...prev,
        { type: "command", content: `${getPromptPath()} % ${input}` },
        { type: "output", content: "^C" }
      ]);
      setInput("");
      setHistoryIndex(-1);
      return;
    }

    // History navigation
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      let idx = historyIndex === -1 ? commandHistory.length - 1 : historyIndex - 1;
      if (idx < 0) idx = 0;

      setHistoryIndex(idx);
      setInput(commandHistory[idx]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;

      const idx = historyIndex + 1;
      if (idx >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }

      setHistoryIndex(idx);
      setInput(commandHistory[idx]);
      return;
    }

    // TAB → autocomplete OR space
    if (e.key === "Tab") {
      e.preventDefault();
      if (!input.trim()) {
        setInput(" ");
        return;
      }

      const [cmd, ...args] = input.trim().split(/\s+/);
      const currentArg = args[args.length - 1] || "";
      const suggestions = getSuggestions(cmd, currentArg);

      if (suggestions.length === 1) {
        const { name, isDir, prefix } = suggestions[0];
        const completed = (prefix ? prefix + "/" : "") + name + (isDir ? "/" : "");
        const newArgs = [...args.slice(0, -1), completed];
        setInput([cmd, ...newArgs].join(" "));
        return;
      }

      if (suggestions.length > 1) {
        setHistory((prev) => [
          ...prev,
          { type: "output", content: suggestions.map((s) => s.name).join("  ") }
        ]);
      }

      return;
    }
  };

  /* ------------------- AUTO SCROLL ------------------- */
  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight });
  }, [history]);

  /* Focus input */
  useEffect(() => inputRef.current?.focus(), []);

  /* ------------------- RENDER ------------------- */
  return (
    <SimpleFrame
      title="Terminal — Bash —"
      id="terminal"
      icon="Terminal"
      height="300"
      width="500"
      minHeight="300"
      minWidth="400"
      isResizable={true}
      showDimensions={true}
    >
      {nano ? (
        <NanoEditor
          filename={nano.filename}
          onExit={() => {
            setNano(null);
            requestAnimationFrame(() => {
              inputRef.current?.focus(); // restore terminal focus
            });
          }}
          initialContent={nano.content}
          onSave={(newText) => {
            let dir = fileSystem["/"];
            for (let i = 1; i < currentPath.length; i++) {
              dir = dir.children[currentPath[i]];
            }
            dir.children[nano.filename] = { type: "file", content: newText };
            updateFileSystem({ ...fileSystem });

            setHistory((prev) => [
              ...prev,
              { type: "output", content: `[ Wrote ${newText.split("\n").length} lines ]` }
            ]);
          }}
        />
      ) : (
        <div
          ref={terminalRef}
          className="terminal p-2 h-full overflow-y-auto font-mono text-black bg-white text-[13px]"
          onClick={() => inputRef.current.focus()}
        >
          {history.map((entry, idx) => (
            <div key={idx} className="mb-[2px] whitespace-pre-wrap">
              {entry.content}
            </div>
          ))}

          <div className="flex">
            <span style={{ marginRight: "8px" }}>{`${getPromptPath()} %`}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className="bg-transparent flex-grow outline-none cursor-text"
            />
          </div>
        </div>
      )}
    </SimpleFrame>
  );
};

export default memo(Terminal);
