export async function GET() {
  const response = await fetch("http://trademinecraftapi.bitsar.com.ar/items");

  const data = await response.json(); // <- esto faltaba

  return Response.json(data);
}
