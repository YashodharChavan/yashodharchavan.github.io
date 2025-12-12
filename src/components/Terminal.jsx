import React, { useState, useRef, useEffect, memo } from 'react';
import SimpleFrame from './SimpleFrame';
import '../index.css';
import { createCommandProcessor } from './Utils/commandProcessor';
import { useFileSystem } from '../context/FileSystemContext';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'text', content: 'Last login: Thu Jun 5 on ttys000 (type man command for more details)' }
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const [exitFlag, setExitFlag] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const { fileSystem, updateFileSystem, currentPath, updateCurrentPath } = useFileSystem();
  const { runCommand, getPromptPath, getSuggestions } = createCommandProcessor(fileSystem, updateFileSystem, currentPath, updateCurrentPath);

  const handleCommand = async (command) => {
    const trimmed = command.trim();

    if (trimmed.length > 0) {
      setCommandHistory(prev => [...prev, trimmed]);
    }

    setHistoryIndex(-1);

    const newHistory = [...history];
    newHistory.push({
      type: 'command',
      content: `${getPromptPath()}# ${command}`
    });

    const output = await runCommand(command);

    // Handle special flags
    if (output === "__CLEAR__") {
      setHistory([]);
      setInput('');
      return;
    }
    if (output === "__EXIT__") {
      setExitFlag(true);
      return;
    }

    // IMPORTANT FIX:
    // Always print a new line, even if output is empty.
    if (output !== null) {
      newHistory.push({
        type: "output",
        content: output === "" ? " " : output  // <-- key fix
      });
    }

    setHistory(newHistory);
    setInput('');
  };



  const handleKeyDown = (e) => {

    // ENTER → Run command
    if (e.key === "Enter") {
      handleCommand(input);
      return;
    }

    // CTRL + C → Cancel current input, do NOT store in history
    if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();

      setHistory(prev => [
        ...prev,
        { type: "command", content: `${getPromptPath()}# ${input}` },
        { type: "output", content: "^C" }
      ]);

      setInput("");
      setHistoryIndex(-1);
      return;
    }

    // UP ARROW → Previous command
    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (commandHistory.length === 0) return;

      let newIndex = historyIndex;
      if (newIndex === -1) {
        // first time pressing up, start at last command
        newIndex = commandHistory.length - 1;
      } else if (newIndex > 0) {
        newIndex--;
      }

      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
      return;
    }

    // DOWN ARROW → Next command OR blank
    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (commandHistory.length === 0) return;

      if (historyIndex === -1) return; // nothing to scroll

      let newIndex = historyIndex + 1;

      if (newIndex >= commandHistory.length) {
        // reached the end → blank input
        setHistoryIndex(-1);
        setInput('');
        return;
      }

      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
      return;
    }

    // TAB → Autocomplete (your existing logic)
    if (e.key === "Tab") {
      e.preventDefault();

      const [cmd, ...args] = input.trim().split(/\s+/);
      const currentArg = args.length > 0 ? args[args.length - 1] : '';

      const suggestions = getSuggestions(cmd, currentArg);

      if (suggestions.length === 0) return;

      if (suggestions.length === 1) {
        const { name, isDir, prefix } = suggestions[0];

        const completed =
          (prefix ? prefix + "/" : "") +
          name +
          (isDir ? "/" : "");

        const newArgs = [...args.slice(0, -1), completed];
        const newInput = [cmd, ...newArgs].join(" ");

        setInput(newInput);
        return;
      }

      // Multiple matches → show in terminal
      setHistory(prev => [
        ...prev,
        { type: "output", content: suggestions.map(s => s.name).join("  ") }
      ]);
    }


  };




  useEffect(() => {
    const scrollToBottom = () => {
      if (terminalRef.current) {
        terminalRef.current.scrollTo({
          top: terminalRef.current.scrollHeight,
          behavior: 'smooth', // or 'auto' for instant
        });
      }
    };

    // Use a slight delay to ensure layout is committed
    const raf = requestAnimationFrame(scrollToBottom);

    return () => cancelAnimationFrame(raf);
  }, [history]);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <SimpleFrame
      title="Terminal — Bash — "
      id="terminal"
      icon="Terminal"
      minimized={window.minimized}
      height="300"
      width="500"
      minHeight="300"
      minWidth="400"
      showDimensions={true}
      isResizable={true}
      exitFlag={exitFlag}
    >
      <div
        ref={terminalRef}
        className="terminal p-2 h-full overflow-y-auto text-[13px] font-mono bg-white text-black break-words"
        onClick={() => inputRef.current.focus()}
        style={{ fontFamily: 'Monaco' }}
      >
        {history.map((entry, idx) => (
          <div key={idx} className="mb-[2px] whitespace-pre-wrap break-words">
            {entry.content}
          </div>
        ))}
        <div className="flex flex-wrap break-words">
          <span className="mr-1">{`${getPromptPath()}#`}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            spellCheck={false}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow outline-none bg-transparent"
            style={{ padding: "0px 8px" }}
          />
        </div>
      </div>
    </SimpleFrame>
  );
};

export default memo(Terminal);