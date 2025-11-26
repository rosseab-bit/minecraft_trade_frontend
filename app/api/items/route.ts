export async function GET() {
  const response = await fetch("http://127.0.0.1:8000/items");

  const data = await response.json(); // <- esto faltaba

  return Response.json(data);
}
