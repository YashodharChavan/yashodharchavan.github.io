import React, { useState, useEffect, useRef } from "react";
import { useFileSystem } from "../context/FileSystemContext";

export default function NanoEditor({ filename, initialContent, onExit }) {
  const [content, setContent] = useState(initialContent || "");
  const [cursorPos, setCursorPos] = useState(0);

  const [modified, setModified] = useState(false);

  const [exitPrompt, setExitPrompt] = useState(false); // asking "Save modified buffer?"
  const [writePrompt, setWritePrompt] = useState(false); // "File Name to Write"

  const [status, setStatus] = useState("");
  const [ignoreFirstKey, setIgnoreFirstKey] = useState(true);
  const [writeFilename, setWriteFilename] = useState(filename || "");
  const [exitAfterSave, setExitAfterSave] = useState(false);
  const [activeFilename, setActiveFilename] = useState(filename || "");



  const editorRef = useRef(null);
  const caretRef = useRef(null);


  const { fileSystem, updateFileSystem, currentPath } = useFileSystem();

  /* ---------------------------- Focus on mount ---------------------------- */
  useEffect(() => {
    if (editorRef.current) editorRef.current.focus();
  }, []);


  /* ---------------------------- Scroll on move ---------------------------- */
  useEffect(() => {
    if (caretRef.current) {
      caretRef.current.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [cursorPos]);


  /* ---------------------------- Save File Logic --------------------------- */
  const saveFile = (name) => {
    if (!name) return;

    let dir = fileSystem["/"];
    for (let i = 1; i < currentPath.length; i++) {
      dir = dir.children[currentPath[i]];
    }

    dir.children[name] = {
      type: "file",
      content,
    };

    updateFileSystem({ ...fileSystem });

    const lineCount = content.split("\n").length;
    setStatus(`[ Wrote ${lineCount} lines ]`);
    setModified(false);

    setTimeout(() => setStatus(""), 1500);
  };


  /* ------------------------------- KEY HANDLER ------------------------------- */
  const handleKeyDown = (e) => {
    e.preventDefault();

    /* Fix ENTER that triggered nano */
    if (ignoreFirstKey) {
      setIgnoreFirstKey(false);
      return;
    }

    /* -------------------- EXIT PROMPT HANDLING -------------------- */
    if (exitPrompt) {
      if (e.key.toLowerCase() === "y") {
        // user wants to save → go to filename prompt
        setExitPrompt(false);
        setExitAfterSave(true);
        setWritePrompt(true);
        setStatus(`File Name to Write: ${activeFilename}\n`);
        return;
      }

      if (e.key.toLowerCase() === "n") {
        // exit without saving
        onExit();
        return;
      }

      if (e.ctrlKey && e.key.toLowerCase() === "c") {
        // cancel exit → return to editing
        setExitPrompt(false);
        setStatus("");
        return;
      }

      return; // ignore all other keys during exit prompt
    }

    /* -------------------- WRITE PROMPT HANDLING -------------------- */
    if (writePrompt) {
      /* ENTER → save */
      if (e.key === "Enter") {
        
        setActiveFilename(writeFilename);
        saveFile(writeFilename);
        setWritePrompt(false);
        setStatus("");
        
        if (exitAfterSave) {
          setExitAfterSave(false);
          onExit();          // ✅ EXIT nano
        } else {
          editorRef.current?.focus(); // Ctrl+O case
        }

        return;
      }


      /* CTRL+C → cancel save */
      if (e.ctrlKey && e.key.toLowerCase() === "c") {
        setWritePrompt(false);
        setExitAfterSave(false);
        setStatus("");
        editorRef.current?.focus();
        return;
      }

      /* BACKSPACE */
      if (e.key === "Backspace") {
        setWriteFilename(prev => {
          const next = prev.slice(0, -1);
          setStatus(`File Name to Write: ${next}`);
          return next;
        });
        return;
      }

      /* NORMAL CHAR */
      if (e.key.length === 1) {
        setWriteFilename(prev => {
          const next = prev + e.key;
          setStatus(`File Name to Write: ${next}`);
          return next;
        });
        return;
      }

      return;
    }


    /* -------------------- CTRL + X (EXIT) -------------------- */
    if (e.ctrlKey && e.key.toLowerCase() === "x") {
      if (!modified) {
        // no modifications → exit immediately
        onExit();
        return;
      }

      // modifications exist → show save prompt
      setExitPrompt(true);
      setStatus(
        `Save modified buffer (ANSWERING “No” WILL DESTROY CHANGES)?  Y Yes   N No   ^C Cancel`
      );
      return;
    }

    /* -------------------- CTRL + O (WRITE OUT) -------------------- */
    if (e.ctrlKey && e.key.toLowerCase() === "o") {
      setWritePrompt(true);
      
      setWriteFilename(activeFilename);
      setStatus(`File Name to Write: ${writeFilename || ""}`);
      return;
    }


    /* -------------------- TEXT INPUT -------------------- */
    if (e.key.length === 1) {
      const before = content.slice(0, cursorPos);
      const after = content.slice(cursorPos);

      setContent(before + e.key + after);
      setCursorPos(cursorPos + 1);
      setModified(true);
      return;
    }

    /* -------------------- BACKSPACE -------------------- */
    if (e.key === "Backspace") {
      if (cursorPos === 0) return;

      const before = content.slice(0, cursorPos - 1);
      const after = content.slice(cursorPos);

      setContent(before + after);
      setCursorPos(cursorPos - 1);
      setModified(true);
      return;
    }

    /* -------------------- ENTER -------------------- */
    if (e.key === "Enter") {
      const before = content.slice(0, cursorPos);
      const after = content.slice(cursorPos);

      setContent(before + "\n" + after);
      setCursorPos(cursorPos + 1);
      setModified(true);
      return;
    }

    /* -------------------- ARROWS -------------------- */
    const lines = content.split("\n");

    // Line index (0-based)
    const currentLine = content.slice(0, cursorPos).split("\n").length - 1;

    // Column index (0-based)
    const lastNewlineIndex = content.lastIndexOf("\n", cursorPos - 1);
    const currentCol =
      lastNewlineIndex === -1
        ? cursorPos
        : cursorPos - lastNewlineIndex - 1;

    /* ← Left */
    if (e.key === "ArrowLeft") {
      if (cursorPos > 0) setCursorPos(cursorPos - 1);
      return;
    }

    /* → Right */
    if (e.key === "ArrowRight") {
      if (cursorPos < content.length) setCursorPos(cursorPos + 1);
      return;
    }

    /* ↑ Up */
    if (e.key === "ArrowUp") {
      if (currentLine === 0) return;

      const prevLineLength = lines[currentLine - 1].length;

      // Absolute index of start of previous line
      let offset = 0;
      for (let i = 0; i < currentLine - 1; i++) {
        offset += lines[i].length + 1; // +1 for '\n'
      }

      setCursorPos(offset + Math.min(currentCol, prevLineLength));
      return;
    }

    /* ↓ Down */
    if (e.key === "ArrowDown") {
      if (currentLine >= lines.length - 1) return;

      const nextLineLength = lines[currentLine + 1].length;

      // Absolute index of start of next line
      let offset = 0;
      for (let i = 0; i <= currentLine; i++) {
        offset += lines[i].length + 1;
      }

      setCursorPos(offset + Math.min(currentCol, nextLineLength));
      return;
    }
  };

  /* ---------------------------- CURSOR RENDER ---------------------------- */
  const renderCursorText = () => {
    const before = content.slice(0, cursorPos);
    const after = content.slice(cursorPos);

    return (
      <>
        {before}
        <span
          ref={caretRef}
          className="nano-caret"
        >
          █
        </span>
        {after}
      </>
    );
  };


  /* ---------------------------- UI ---------------------------- */
  return (
    <div
      className="h-full flex flex-col bg-white text-black font-mono text-[13px] rounded-sm outline-black outline-2"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={editorRef}
    >
      {/* Header */}
      <div className="bg-gray-200 outline outline-2 rounded-tl-sm rounded-tr-sm" style={{ padding: "0px 4px" }}>
        GNU nano — {activeFilename}
      </div>

      {/* Main editor area */}
      <div className="flex-1 overflow-auto whitespace-pre-wrap border-b nano-editor"
        style={{ padding: "0px 4px" }}
      >

        {renderCursorText()}
      </div>

      {/* Status / prompt */}
      {status && (
        <div className="px-2 py-1 bg-yellow-100 border-y text-sm">
          {/* {status} */}
          {/* Status / prompt */}
          {(status || writePrompt) && (
            <div className="px-2 py-1 bg-yellow-100 border-y text-sm whitespace-pre-wrap">
              {writePrompt ? (
                <>
                  File Name to Write: {writeFilename}
                  {"\n"}^C Cancel
                </>
              ) : (
                status
              )}
            </div>
          )}

        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-200 text-xs border-t flex gap-3" style={{ padding: "0px 4px" }}>
        <span>
          ^O Write Out
        </span>
        <span>
          ^X Exit
        </span>
      </div>
    </div>
  );
}
