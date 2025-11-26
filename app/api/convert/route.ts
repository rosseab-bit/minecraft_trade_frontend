export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch("http://127.0.0.1:8000/convert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return Response.json(await response.json());
}
