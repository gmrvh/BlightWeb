export async function POST(req: Request) {
  try {
    const { slaveName, command_text } = await req.json();

    if (!slaveName || !command_text) {
      return Response.json({ error: "Missing slaveName or command_text" }, { status: 400 });
    }

    const apiUrl = "http://localhost/v2/send-command";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer AUTHKEY`,
      },
      body: JSON.stringify({ slaveName, command_text }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return Response.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
    
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
