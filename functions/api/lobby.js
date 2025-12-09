/**
 * POST /api/lobby
 * Body: { name?: string }
 * Creates a lobby and returns { code }
 */
export async function onRequestPost() {
  // TODO: persist in Durable Object; this is a stub
  const code = Math.random().toString(36).slice(2, 7).toUpperCase();
  return new Response(JSON.stringify({ code }), {
    headers: { "content-type": "application/json" },
  });
}

