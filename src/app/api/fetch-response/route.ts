export async function GET(req: Request) {
    try {
      // ✅ Extract `command_id` from query parameters
      const url = new URL(req.url);
      const command_id = url.searchParams.get("command_id");
  
      if (!command_id) {
        return Response.json({ error: "Missing command_id" }, { status: 400 });
      }
  
      const apiUrl = `http://80.78.26.129/v2/fetch-response?command_id=${command_id}`;
  
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer MgsxOULRKBvhGxd9U2KbAqUVUKsp3ZoHaUQ1dDI6CvtVlvRFWqVFFjHvvY8IF6fG`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        return Response.json({ error: errorText }, { status: response.status });
      }
  
      const data = await response.json();
      return Response.json(data);
  
    } catch (error) {
      console.error("Error in fetch-response:", error);
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  