/**
 * POST /api/round/start
 * Body: { lobbyCode, settings }
 * Stubbed: returns mock tracks. Wire to Spotify API later.
 */
export async function onRequestPost({ request }) {
  const body = await request.json().catch(() => ({}));
  const { lobbyCode, settings } = body;
  if (!lobbyCode) {
    return new Response(JSON.stringify({ error: "lobbyCode required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // Stub tracks; replace with Spotify playlist/genre fetch.
  const tracks = Array.from({ length: settings?.songCount || 10 }).map((_, i) => ({
    id: `track-${i + 1}`,
    title: `Sample Track ${i + 1}`,
    artist: `Sample Artist ${i + 1}`,
    previewUrl: "https://p.scdn.co/mp3-preview/placeholder",
    choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
    correctChoice: 1,
  }));

  return new Response(JSON.stringify({ ok: true, tracks }), {
    headers: { "content-type": "application/json" },
  });
}

