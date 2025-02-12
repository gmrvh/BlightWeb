export async function POST(req: Request) {
  try {
    // ✅ Parse the incoming JSON request
    const { slaveName, command_text } = await req.json();

    if (!slaveName || !command_text) {
      return Response.json({ error: "Missing slaveName or command_text" }, { status: 400 });
    }

    const apiUrl = "http://80.78.26.129/v2/send-command";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer MgsxOULRKBvhGxd9U2KbAqUVUKsp3ZoHaUQ1dDI6CvtVlvRFWqVFFjHvvY8IF6fG`,
      },
      body: JSON.stringify({ slaveName, command_text }), // ✅ Ensure correct JSON format
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
