/**
 * POST /api/lobby/join
 * Body: { code: string, name?: string }
 * Joins a lobby; stubbed response.
 */
export async function onRequestPost({ request }) {
  const body = await request.json().catch(() => ({}));
  const code = (body.code || "").toUpperCase();
  if (!code) {
    return new Response(JSON.stringify({ error: "Code required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ ok: true, code }), {
    headers: { "content-type": "application/json" },
  });
}

