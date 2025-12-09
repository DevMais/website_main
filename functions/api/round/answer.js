/**
 * POST /api/round/answer
 * Body: { lobbyCode, trackId, answer, mode }
 * Stubbed validator.
 */
export async function onRequestPost({ request }) {
  const body = await request.json().catch(() => ({}));
  const { lobbyCode, trackId, answer } = body;
  if (!lobbyCode || !trackId) {
    return new Response(JSON.stringify({ error: "lobbyCode and trackId required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const correct = true; // Stub: replace with real validation.
  const score = correct ? 100 : 0;
  return new Response(JSON.stringify({ ok: true, correct, score }), {
    headers: { "content-type": "application/json" },
  });
}

