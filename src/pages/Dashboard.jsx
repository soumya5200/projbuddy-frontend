import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import io from "socket.io-client";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";

const Dashboard = () => {

  // 🔥 DETECT TYPE
  const detectType = (code) => {
    if (
      code.includes(" React.useState") ||
      code.includes("const  App") ||
      code.includes("function App(")
    ) {
      return "react";
    }
    return "html";
  };

  // 🔥 REACT WRAPPER
  const wrapReact = (reactCode) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

      <style>
        body { margin: 0; font-family: Arial; }
      </style>
    </head>
    <body>
      <div id="root"></div>

      <script type="text/babel">
        ${reactCode}

        ReactDOM.createRoot(document.getElementById('root')).render(<App />);
      </script>
    </body>
    </html>
    `;
  };

  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState("");
  const [runCode, setRunCode] = useState("");

  const [collaborators, setCollaborators] = useState([]);
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [userName, setUserName] = useState("");
  const [collabName, setCollabName] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("roomId") || "room1";
  // 🔥 LOAD CODE FROM DB
useEffect(() => {
  const loadCode = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/code/${roomId}`)
      if (Array.isArray(res.data) && res.data.length > 0) {
  const file = res.data.find(f => f.fileName === "main.html");

  if (file) {
    setCode(file.code.replace(/^\s*\n/,""));
  }
}
    } catch (err) {
      console.log("Load error ❌");
    }
  };

  loadCode();
}, []);

  useEffect(() => {
    const nameFromUrl = urlParams.get("userName");
    if (nameFromUrl) setUserName(nameFromUrl);
  }, []);

  useEffect(() => {
    if (!userName) return;

   const newSocket = io(import.meta.env.VITE_APP_BASE_URL);
    setSocket(newSocket);

    newSocket.emit("join-room", { roomId, userName });

    newSocket.on("collaborators", setCollaborators);
    
    newSocket.on("chat-message", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    newSocket.on("new-files", (newFiles) =>
      setFiles((prev) => [...prev, ...newFiles])
    );

    return () => newSocket.disconnect();
  }, [userName]);

  // 🔥 SAVE CODE FUNCTION
const saveCode = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/code/save`, {
      roomId,
      fileName: "main.html",
      code : code.trimStart()
    });
    console.log("Saved ✅");
  } catch (err) {
    console.log("Save error ❌");
  }
};
// 🔥 AUTO SAVE AFTER 2 SEC
useEffect(() => {
  const timer = setTimeout(() => {
    saveCode();
  }, 2000);

  return () => clearTimeout(timer);
}, [code]);

  const handleCodeChange = (editor, data, value) => {
    const clean = value.replace(/^\s*\n/, "");
    setCode(clean);
    socket?.emit("code-change", { roomId, code: clean });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message) return;

    socket.emit("chat-message", { roomId, userName, message });
    setMessage("");
  };

  const generateAI = async () => {
    if (!aiPrompt) return alert("Enter prompt!");

    const res = await axios.post(
      `${import.meta.env.VITE_APP_BASE_URL}/api/ai/generate`,
      { prompt: aiPrompt }
    );

    let cleanCode = res.data.code;

    // 🔥 FULL CLEAN
    cleanCode = cleanCode.replace(/```html|```javascript|```/g, "");
    cleanCode = cleanCode.replace(/^javascript\s*/i, "");
    cleanCode = cleanCode.replace(/import.*?;/g, "");
    cleanCode = cleanCode.replace(/export default.*?;/g, "");
    cleanCode = cleanCode.replace(/<link.*?>/g, "");
    cleanCode = cleanCode.trim();

    setCode(cleanCode);
    socket.emit("code-change", { roomId, code: cleanCode });
    setAiPrompt("");
  };
  const handleFileUpload = async (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/files/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setFiles(prev => [...prev, ...res.data]);
      socket.emit("new-files", res.data);

    } catch {
      alert("Upload failed!");
    }
  };

  const openFile = async (file) => {
    const res = await axios.get(
      `http://192.168.1.36:5000/api/files/content/${file.fileName}`
    );

    const cleanCode = res.data.replace(/^\s*\n/, "");
    setCode(cleanCode);
    socket.emit("code-change", {
      roomId,
      code: cleanCode
    });
  };

  const addCollaborator = () => {
    if (!collabName) return;

    const link =
      `http://192.168.1.36:5173/dashboard?roomId=${roomId}&userName=${encodeURIComponent(collabName)}`;

    setInviteLink(link);
    navigator.clipboard.writeText(link);
    setCollabName("");
  };

  const type = detectType(code);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0f172a", color: "white" }}>

      <div style={{
        height: "55px",
        background: "#1e293b",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 15px",
        margin: "10px",
        borderRadius: "8px",
        border: "1px solid #334155"
      }}>
        <b>ProjBuddy | Room: {roomId}</b>

        <button onClick={() => {
          if (!inviteLink) return alert("Generate link first");
          navigator.clipboard.writeText(inviteLink);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
          style={{
            background: "#2563eb",
            border: "none",
            padding: "8px 16px",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer"
          }}>
          {copied ? "Copied!" : "Copy Invite"}
        </button>
      </div>

      <div style={{ display: "flex", flex: 1 }}>

        <div style={{
          width: "280px",
          background: "#1e293b",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>

          <h3>Your Name</h3>
          <input value={userName} onChange={(e) => setUserName(e.target.value)} style={{ padding: "8px", color: "black" }} />

          <h3>Add Collaborator</h3>
          <input placeholder="Name" value={collabName} onChange={(e) => setCollabName(e.target.value)} style={{ padding: "8px", color: "black" }} />
          <button onClick={addCollaborator} style={{ background: "#22c55e", borderRadius: "8px", padding: "8px", color: "white", cursor: "pointer" }}>Invite</button>

          <h3>Files</h3>
          <input type="file" multiple onChange={handleFileUpload} />

          <div style={{
            maxHeight: "120px",
            overflowY: "auto",
            background: "#334155",
            padding: "8px",
            borderRadius: "6px"
          }}>
            {files.map((f, i) => (
              <div key={i} onClick={() => openFile(f)} style={{ cursor: "pointer", color: "#facc15", marginBottom: "5px" }}>
                📄 {f.fileName}
              </div>
            ))}
          </div>

          <h3>Collaborators</h3>
          {collaborators.map((c, i) => <div key={i} style={{ color: "#4ade80" }}>👤 {c}</div>)}

          <h3>Chat</h3>
          <div style={{ background: "#334155", height: "150px", overflowY: "auto", padding: "10px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ textAlign: msg.userName === userName ? "right" : "left" }}>
                <span style={{
                  background: msg.userName === userName ? "#2563eb" : "#475569",
                  padding: "5px 10px",
                  borderRadius: "10px",
                  display: "inline-block",
                  marginBottom: "5px"
                }}>
                  <b>{msg.userName}</b>: {msg.message}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} style={{ display: "flex" }}>
            <input value={message} onChange={(e) => setMessage(e.target.value)} style={{ flex: 1, color: "black" }} />
            <button style={{ background: "#2563eb", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginLeft: "8px" }}>Send</button>
          </form>

          <h3>AI Code</h3>
          <input value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} style={{ color: "black" }} />
          <button onClick={generateAI} style={{ background: "#7c3aed", color: "white", padding: "8px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Generate</button>

        </div>

        <div style={{ flex: 1, display: "flex", gap: "10px", padding: "10px" }}>

          <div style={{ flex: 1, border: "1px solid #334155", borderRadius: "8px",height: "100%" }}>
            <CodeMirror
              value={code}
              options={{ mode: "htmlmixed", theme: "material", lineNumbers: true ,lineNumbers:true}}
              onBeforeChange={handleCodeChange}
            />
          </div>

          <div style={{
            width: "40%",
            background: "#020617",
            borderRadius: "8px",
            padding: "10px",
            border: "1px solid #334155",
            display: "flex",
            flexDirection: "column"
          }}>
            <h3>Output</h3>

            <iframe
              id="output"
              title="preview"
              style={{
                width: "100%",
                flex: 1,
                border: "none",
                background: "white"
              }}
              srcDoc={type === "react" ? wrapReact(runCode) : runCode}
            />

            <button
              onClick={() => {
                const iframe = document.getElementById("output");
                setRunCode(code);
                localStorage.setItem("codeData", JSON.stringify({
                  code,
                  lastUpdated: new Date().toLocaleString(),
                  length: code.length,
                  changeCount: JSON.parse(localStorage.getItem("codeData"))?.changeCount ? JSON.parse(localStorage.getItem("codeData")).changeCount + 1 : 1,
                  lastEdit: new Date(),
                  collaborators: collaborators
                }));
              }}
              style={{
                marginTop: "10px",
                background: "#22c55e",
                padding: "10px",
                border: "none",
                color: "white",
                width: "100%",
                fontWeight: "bold",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Run Code ▶
            </button>
            <button
              onClick={() => window.location.href = "/analytics"}
              style={{
                background: "#f59e0b",
                padding: "8px",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              Open Analytics 📊
            </button>
          </div>
          

        </div>

      </div>

    </div>
  );
};

export default Dashboard;