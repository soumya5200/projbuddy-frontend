import React, { useState } from "react";

const ProjectChat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text) return;
    setMessages([...messages, text]);
    setText("");
  };

  return (
    <div className="card mt-3">
      <div className="card-header">Project Chat</div>

      <div className="card-body" style={{ height: "200px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            {msg}
          </div>
        ))}
      </div>

      <div className="card-footer d-flex">
        <input
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button className="btn btn-primary ms-2" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ProjectChat;