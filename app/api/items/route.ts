export async function GET() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`);

  const data = await response.json(); // <- esto faltaba

  return Response.json(data);
}
