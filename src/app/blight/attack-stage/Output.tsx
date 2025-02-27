import { useEffect, useState } from "react";
import Link from "next/link";

export default function Output({ output } : { output: string }) {
    return (
    <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Output</h1>
        <div className="bg-neautral-900 p-2 rounded-lg">
            <pre className="text-[#19FF00]">{output}</pre>
        </div>
    </div>
    );
  
  }