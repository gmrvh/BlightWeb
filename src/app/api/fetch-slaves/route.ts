export async function GET() {
  const apiUrl = "http://localhost/v2/fetch-slaves";

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer AUTHKEY`, // Ensure "Bearer " is included
    },
  });

  if (!response.ok) {
    const errorText = await response.text(); // Log API error response
    return Response.json({ error: errorText }, { status: response.status });
  }

  const data = await response.json();
  return Response.json(data);
}
