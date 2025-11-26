export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch("https://trademinecraftapi.bitsar.com.ar/convert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return Response.json(await response.json());
}
