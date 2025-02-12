export async function GET() {
  const apiUrl = "http://80.78.26.129/v2/fetch-slaves";

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer MgsxOULRKBvhGxd9U2KbAqUVUKsp3ZoHaUQ1dDI6CvtVlvRFWqVFFjHvvY8IF6fG`, // Ensure "Bearer " is included
    },
  });

  if (!response.ok) {
    const errorText = await response.text(); // Log API error response
    return Response.json({ error: errorText }, { status: response.status });
  }

  const data = await response.json();
  return Response.json(data);
}
