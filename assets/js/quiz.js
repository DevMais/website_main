const quizState = {
  lobbyCode: "",
  answerMode: "multiple",
  guessScope: "title",
  songCount: 10,
  genre: "top-hits",
  playlistId: "",
};

const el = {
  lobbyCode: document.getElementById("lobby-code"),
  createLobby: document.getElementById("create-lobby"),
  joinLobby: document.getElementById("join-lobby"),
  answerMode: document.getElementById("answer-mode"),
  guessScope: document.getElementById("guess-scope"),
  songCount: document.getElementById("song-count"),
  genre: document.getElementById("genre"),
  customPlaylistWrapper: document.getElementById("custom-playlist-wrapper"),
  customPlaylist: document.getElementById("custom-playlist"),
  startQuiz: document.getElementById("start-quiz"),
  summary: document.getElementById("quiz-summary"),
};

function updateSummary(message) {
  const base = `Mode: ${quizState.answerMode} | Guess: ${quizState.guessScope} | Songs: ${quizState.songCount} | Pool: ${quizState.genre === "custom" ? quizState.playlistId || "custom playlist" : quizState.genre}`;
  el.summary.innerHTML = `
    <div class="section-title" style="margin-bottom:4px;">Round summary</div>
    <div class="hint">${message || "Totals and standings will appear here after each round."}</div>
    <div class="hint" style="margin-top:4px;">${base}</div>
  `;
}

function toggleCustomPlaylist() {
  const show = quizState.genre === "custom";
  el.customPlaylistWrapper.style.display = show ? "block" : "none";
}

async function api(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed (${res.status})`);
  }
  return res.json();
}

function wireEvents() {
  el.lobbyCode.addEventListener("input", (e) => {
    quizState.lobbyCode = e.target.value.trim();
  });

  el.answerMode.addEventListener("change", (e) => {
    quizState.answerMode = e.target.value;
    updateSummary();
  });

  el.guessScope.addEventListener("change", (e) => {
    quizState.guessScope = e.target.value;
    updateSummary();
  });

  el.songCount.addEventListener("change", (e) => {
    quizState.songCount = Number(e.target.value);
    updateSummary();
  });

  el.genre.addEventListener("change", (e) => {
    quizState.genre = e.target.value;
    toggleCustomPlaylist();
    updateSummary();
  });

  el.customPlaylist.addEventListener("input", (e) => {
    quizState.playlistId = e.target.value.trim();
    updateSummary();
  });

  el.createLobby.addEventListener("click", async () => {
    try {
      const data = await api("/api/lobby", {});
      quizState.lobbyCode = data.code;
      el.lobbyCode.value = data.code;
      updateSummary(`Lobby created: ${data.code}`);
    } catch (err) {
      updateSummary(err.message || "Failed to create lobby");
    }
  });

  el.joinLobby.addEventListener("click", async () => {
    try {
      const data = await api("/api/lobby/join", { code: quizState.lobbyCode });
      updateSummary(`Joined lobby ${data.code}`);
    } catch (err) {
      updateSummary(err.message || "Failed to join lobby");
    }
  });

  el.startQuiz.addEventListener("click", async () => {
    try {
      const settings = {
        answerMode: quizState.answerMode,
        guessScope: quizState.guessScope,
        songCount: quizState.songCount,
        genre: quizState.genre,
        playlistId: quizState.playlistId,
      };
      const data = await api("/api/round/start", {
        lobbyCode: quizState.lobbyCode,
        settings,
      });
      const trackCount = data.tracks?.length || 0;
      updateSummary(`Starting round with ${trackCount} tracks (stub data).`);
      // TODO: render first question, set up playback with Spotify preview URLs
    } catch (err) {
      updateSummary(err.message || "Failed to start round");
    }
  });
}

if (Object.values(el).every(Boolean)) {
  toggleCustomPlaylist();
  updateSummary();
  wireEvents();
}

