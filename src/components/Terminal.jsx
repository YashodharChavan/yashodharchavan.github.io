import React, { useState, useRef, useEffect } from 'react';
import SimpleFrame from './SimpleFrame';
import '../index.css';
import { runCommand, getPromptPath, getSuggestions } from './Utils/commandProcessor'; // Extract your logic into a separate module

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'text', content: 'Last login: Thu Jun 5 on ttys000' }
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  

  const handleCommand = (command) => {
    const newHistory = [...history];
    newHistory.push({
      type: 'command',
      content: `${getPromptPath()}$ ${command}`
    });

    const output = runCommand(command);
    if (output) {
      newHistory.push({ type: 'output', content: output });
    }
    if (output === '__CLEAR__') {
      setHistory([]);
    }
    else {
      setHistory(newHistory);
    }
    setInput('');
  };

  const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleCommand(input);
  } else if (e.key === 'Tab') {
    e.preventDefault(); // prevent focus shift
    const [cmd, ...args] = input.trim().split(/\s+/);
    const currentArg = args.length > 0 ? args[args.length - 1] : '';
    const suggestions = getSuggestions(cmd, currentArg);

    if (suggestions.length === 1) {
      // One match — autocomplete
      const newInput = [cmd, ...args.slice(0, -1), suggestions[0]].join(' ');
      setInput(newInput + ' ');
    } else if (suggestions.length > 1) {
      // Multiple matches — show them
      setHistory(prev => [
        ...prev,
        { prompt: getPromptPath(), command: input, output: suggestions.join('  ') }
      ]);
    }
  }
};


  useEffect(() => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [history]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <SimpleFrame title="Terminal — Bash — " id="terminal" icon="Terminal" minimized={window.minimized} height="300" width="500" minHeight="300" minWidth="400" showDimensions={true} isResizable={true}>
      <div
        ref={terminalRef}
        className="terminal p-2 max-h-[186%] overflow-y-hidden text-[13px] font-mono bg-white text-black"
        onClick={() => inputRef.current.focus()}
      >
        {history.map((entry, idx) => (
          <div key={idx} className="mb-[2px] whitespace-pre-wrap">
            {entry.content}
          </div>
        ))}
        <div className="flex">
          <span className="mr-1"z>{`${getPromptPath()}$`}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow outline-none bg-transparent "
          />
        </div>
      </div>
    </SimpleFrame>
  );
};

export default Terminal;
