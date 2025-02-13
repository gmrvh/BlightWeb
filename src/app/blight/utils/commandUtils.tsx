export const sendCommand = async (
    slaveName: string,
    commandText: string,
    setOutput: (output: string) => void
  ) => {
    try {
      const response = await fetch("/api/send-command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slaveName, command_text: commandText }),
      });
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (data.command_id) {
        pollForResponse(data.command_id, setOutput); //  Start polling
      } else {
        console.error("No command_id received");
        setOutput("Error: No command_id received.");
      }
  
      return data;
    } catch (error) {
      console.error("Error sending command:", error);
      setOutput("Error sending command.");
    }
  };
  
  //  Polling function to check for the response
  const pollForResponse = async (
    commandId: string,
    setOutput: (output: string) => void
  ) => {
    const maxAttempts = 10; //  Max polling duration: 30 seconds (10 attempts * 3 sec)
    let attempts = 0;
  
    const checkResponse = async () => {
      try {
        const response = await fetch(`/api/fetch-response?command_id=${commandId}`);
  
        if (response.ok) {
          const data = await response.json();
          console.log("Response Received:", data);
  
          const responseText = data.response_text || "No response received."; //  Extract only `response_text`
          setOutput(responseText);
          return;
        } else {
          console.log(`Polling attempt ${attempts + 1}: Waiting for response...`);
        }
      } catch (error) {
        console.error("Error fetching response:", error);
        setOutput("Error fetching response.");
      }
  
      if (++attempts < maxAttempts) {
        setTimeout(checkResponse, 3000); //  Retry after 3 seconds
      } else {
        console.log("Timeout: No response received.");
        setOutput("Timeout: No response received.");
      }
    };
  
    checkResponse(); //  Start polling
  };
  