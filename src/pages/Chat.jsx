
import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const socket=io("import.meta.env.VITE_APP_BASE_URL") // --- IGNORE --- io("http://localhost:5000")

export default function Chat(){
  const [msg,setMsg]=useState("")
  const [messages,setMessages]=useState([])

  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setMessages(prev=>[...prev,data])
    })
  },[])

  const send=()=>{
    socket.emit("send_message",msg)
    setMsg("")
  }

  return(
    <div className="p-10">
      <h1 className="text-2xl mb-4">Team Chat</h1>
      <div className="border h-60 overflow-auto mb-4 p-2">
        {messages.map((m,i)=>(<p key={i}>{m}</p>))}
      </div>
      <input className="border p-2 mr-2" value={msg} onChange={e=>setMsg(e.target.value)} />
      <button onClick={send} className="bg-blue-600 text-white px-4 py-2">Send</button>
    </div>
  )
}
