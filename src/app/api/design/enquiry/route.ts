export async function POST(request: Request) {
  await request.formData();
  const outcome = new URL(request.url).searchParams.get('outcome');

  if (outcome === 'pending') {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  if (outcome === 'error') {
    return Response.json({ ok: false }, { status: 500 });
  }

  return Response.json({ ok: true });
}
