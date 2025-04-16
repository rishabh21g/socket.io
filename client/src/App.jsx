/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const App = () => {
  
  const socket = useMemo(()=>{
   return io("http://localhost:8000")
  }, []);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on("welcome", (msg) => {
      console.log(msg);
    });
    socket.on("announcement" , (msg)=>{
      console.log(msg)
    })
    socket.on("received-message" , (data)=>{
      console.log(data)
    })
    return ()=>{
      socket.disconnect()
    }

  }, []);
  const sendMessage = () => {
    setMessage(message)
    socket.emit("message" , message)
    setMessage("")
  };
  return (
    <div className="max-w-lg w-full h-3/6 mx-auto mt-10 flex flex-col p-8 gap-6">
      <h1 className="text-4xl text-purple-950">Real time chat App 💬</h1>
      <div className="h-80 mx-2 px-3 py-2 overscroll-y-auto rounded-md border border-black w-full shadow-lg">
        {chat.map((msg, i) => {
          <div key={i} className="text-sm text-purple-700 bg-purple-400">
            {msg}
          </div>;
        })}

        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-400"
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
