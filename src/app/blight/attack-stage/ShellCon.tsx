import { useEffect, useState } from "react";
import { sendCommand } from "../utils/commandUtils";

interface SlaveData {
    freq: number;
    slaveIP: string;
    slaveLastCheckin: string;
    slaveName: string;
    slavePing: string;
    slaveStatus: string;
  }

  
export default function ShellCon({ slave }: { slave: SlaveData }) {
    const [output, setOutput] = useState<string>("");
    const [input, setInput] = useState<string>("");
    const [isFetching, setIsFetching] = useState<boolean>(false);
    
    const fetchShellOutput = ({command} : {command: String}) => {
        setIsFetching(true);
        sendCommand(slave.slaveName, "shell_exec,"+command, (response) => {
            setOutput(response);
            setIsFetching(false);
        });
    };
    
   
    
    return (
        <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Shell</h1>
        <div className="bg-neutral-900 p-2 rounded-lg outline outline-1 h-96 overflow-y-auto">
            { isFetching && <pre className="text-[#19FF00]">Executing...</pre>} 
            { !isFetching && <pre className="text-white">{output}</pre>}
        </div>
        <div className="mt-2">
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    fetchShellOutput({ command: input });
                    setInput("");
                }
            }}
            className="bg-neutral-800 p-2 rounded-lg w-full"
            />
        </div>
        </div>
    );
    }