import React, { useState, useEffect, useRef } from "react";
import { useFileSystem } from "../context/FileSystemContext";

export default function NanoEditor({ filename, initialContent, onExit }) {
  const [content, setContent] = useState(initialContent || "");
  const [cursorPos, setCursorPos] = useState((initialContent || "").length);

  const [modified, setModified] = useState(false);

  const [exitPrompt, setExitPrompt] = useState(false); // asking "Save modified buffer?"
  const [writePrompt, setWritePrompt] = useState(false); // "File Name to Write"

  const [status, setStatus] = useState("");
  const [ignoreFirstKey, setIgnoreFirstKey] = useState(true);

  const editorRef = useRef(null);

  const { fileSystem, updateFileSystem, currentPath } = useFileSystem();

  /* ---------------------------- Focus on mount ---------------------------- */
  useEffect(() => {
    if (editorRef.current) editorRef.current.focus();
  }, []);

  /* ---------------------------- Save File Logic --------------------------- */
  const saveFile = () => {
    let dir = fileSystem["/"];
    for (let i = 1; i < currentPath.length; i++) {
      dir = dir.children[currentPath[i]];
    }

    dir.children[filename] = {
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
        setWritePrompt(true);
        setStatus(`File Name to Write: ${filename}`);
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
      if (e.key === "Enter") {
        saveFile();
        setWritePrompt(false);
        setStatus("");    // Remove the write prompt
        return;           // ✔ Stay inside nano
      }

      // editing filename (optional)
      if (e.key.length === 1) {
        filename += e.key;
        setStatus(`File Name to Write: ${filename}`);
      }

      if (e.key === "Backspace") {
        filename = filename.slice(0, -1);
        setStatus(`File Name to Write: ${filename}`);
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
      setStatus(`File Name to Write: ${filename}`);
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

    const currentLine = content.slice(0, cursorPos).split("\n").length - 1;
    const currentCol =
      cursorPos - content.lastIndexOf("\n", cursorPos - 1) - 1;

    if (e.key === "ArrowLeft" && cursorPos > 0) {
      setCursorPos(cursorPos - 1);
      return;
    }

    if (e.key === "ArrowRight" && cursorPos < content.length) {
      setCursorPos(cursorPos + 1);
      return;
    }

    if (e.key === "ArrowUp" && currentLine > 0) {
      const prevLen = lines[currentLine - 1].length;
      const offset =
        lines.slice(0, currentLine - 1).join("\n").length +
        (currentLine > 1 ? currentLine - 1 : 0);

      setCursorPos(offset + Math.min(currentCol, prevLen));
      return;
    }

    if (e.key === "ArrowDown" && currentLine < lines.length - 1) {
      const nextLen = lines[currentLine + 1].length;
      const offset =
        lines.slice(0, currentLine + 1).join("\n").length +
        (currentLine >= 0 ? currentLine + 1 : 0);

      setCursorPos(offset + Math.min(currentCol, nextLen));
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
        <span className="bg-black text-white animate-pulse">█</span>
        {after}
      </>
    );
  };

  /* ---------------------------- UI ---------------------------- */
  return (
    <div
      className="h-full flex flex-col bg-white text-black font-mono text-[13px]"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={editorRef}
    >
      {/* Header */}
      <div className="px-2 py-1 bg-gray-200 border-b">
        GNU nano — {filename}
      </div>

      {/* Main editor area */}
      <div className="flex-1 overflow-auto p-2 whitespace-pre-wrap border-b">
        {renderCursorText()}
      </div>

      {/* Status / prompt */}
      {status && (
        <div className="px-2 py-1 bg-yellow-100 border-y text-sm">
          {status}
        </div>
      )}

      {/* Footer */}
      <div className="px-2 py-1 bg-gray-200 text-xs border-t">
        ^G Help   ^O Write Out   ^X Exit
      </div>
    </div>
  );
}
