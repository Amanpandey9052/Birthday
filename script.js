const SECRET_PASSWORD = 'demo123';
const BIRTHDAY_MONTH = 11;
const BIRTHDAY_DAY = 25;
const MUSIC_URL = '';
const PLAY_ON_LOGIN = true;

const GALLERY_PHOTOS = [
  ['🎂', 'Memory One', 'A happy moment'],
  ['🎈', 'Memory Two', 'Another great day'],
  ['🌹', 'Memory Three', 'Something special'],
  ['✨', 'Memory Four', 'A moment to remember'],
  ['🎁', 'Memory Five', 'Pure joy'],
  ['💖', 'Memory Six', 'Together']
];

const LOVE_MESSAGES = [
  ['Message One 💌', 'Write your first message here.', ''],
  ['Message Two 🎉', 'Write your second message here.', ''],
  ['Message Three 💖', 'Write your third message here.', '']
];

const SONGS = [
  ['Song One', 'Artist One', '3:30', ''],
  ['Song Two', 'Artist Two', '4:00', ''],
  ['Song Three', 'Artist Three', '3:45', '']
];

const QUIZ = [
  { q: 'Where did we first meet? 💫', opts: ['Option A', 'Option B', 'Option C', 'Option D'], a: 0 },
  { q: "What's my favorite thing about you? 💖", opts: ['Option A', 'Option B', 'Option C', 'Option D'], a: 2 },
  { q: 'What is our favorite song? 🎵', opts: ['Option A', 'Option B', 'Option C', 'Option D'], a: 1 },
  { q: 'What is my favorite food? 🍟', opts: ['Option A', 'Option B', 'Option C', 'Option D'], a: 3 }
];

const JOURNEY = {
  me: { name: 'City A', x: 300, y: 150 },
  her1: { name: 'City B', x: 420, y: 210, dist: '~50 km' },
  her2: { name: 'City C', x: 490, y: 150, dist: '~60 km' },
  her3: { name: 'City D', x: 600, y: 110, dist: '~900 km' }
};

const themeBtn = document.getElementById('themeToggle');
function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeBtn.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('bs_theme', dark ? 'dark' : 'light');
}
applyTheme(localStorage.getItem('bs_theme') === 'dark');
themeBtn.onclick = () => applyTheme(!document.body.classList.contains('dark'));

const screens = ['screen-login', 'screen-success', 'screen-hubload', 'screen-hub'];
function show(id) {
  screens.forEach(s => document.getElementById(s).classList.toggle('active', s === id));
  document.getElementById('logoutBtn').style.display = (id === 'screen-hub') ? 'block' : 'none';
  window.scrollTo(0, 0);
}

const loginForm = document.getElementById('loginForm'),
  pwdInput = document.getElementById('pwdInput'),
  pwdError = document.getElementById('pwdError'),
  unlockBtn = document.getElementById('unlockBtn');

document.getElementById('hintBtn').onclick = () => {
  const t = document.getElementById('hintText');
  t.style.display = t.style.display === 'none' ? 'block' : 'none';
};

if (sessionStorage.getItem('birthday_authenticated') === 'true') enterHub(false);

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  pwdError.style.display = 'none';
  if (pwdInput.value === SECRET_PASSWORD) {
    sessionStorage.setItem('birthday_authenticated', 'true');
    unlockBtn.textContent = 'Unlocking magic...';
    unlockBtn.disabled = true;
    if (PLAY_ON_LOGIN) startMusic();
    show('screen-success');
    setTimeout(enterHub, 1500);
  } else {
    pwdError.textContent = 'Wrong password! Try again 💕';
    pwdError.style.display = 'block';
    pwdError.classList.remove('shake');
    void pwdError.offsetWidth;
    pwdError.classList.add('shake');
  }
});

function enterHub(withLoad = true) {
  pwdInput.value = '';
  unlockBtn.textContent = 'Unlock Birthday Surprise 🎂';
  unlockBtn.disabled = false;
  if (withLoad) {
    show('screen-hubload');
    setTimeout(() => show('screen-hub'), 1500);
  } else {
    show('screen-hub');
  }
}

document.getElementById('logoutBtn').onclick = () => {
  sessionStorage.removeItem('birthday_authenticated');
  stopAllMedia();
  show('screen-login');
};

function tickCountdown() {
  const now = new Date();
  let b = new Date(now.getFullYear(), BIRTHDAY_MONTH, BIRTHDAY_DAY);
  if (b < now) b = new Date(now.getFullYear() + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY);
  const diff = b - now,
    d = Math.floor(diff / 864e5),
    h = Math.floor(diff % 864e5 / 36e5),
    m = Math.floor(diff % 36e5 / 6e4);
  const el = document.getElementById('countdown');
  if (d > 0) el.textContent = `${d} ${d === 1 ? 'day' : 'days'} and ${h} ${h === 1 ? 'hour' : 'hours'} until your special day!`;
  else if (h > 0) el.textContent = `${h} ${h === 1 ? 'hour' : 'hours'} and ${m} ${m === 1 ? 'minute' : 'minutes'} until your birthday! 🎉`;
  else el.textContent = "IT'S YOUR BIRTHDAY TODAY! 🎉🎂🎈";
}
tickCountdown();
setInterval(tickCountdown, 60000);

const icons = {
  camera: '<svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  brain: '<svg viewBox="0 0 24 24"><path d="M9.5 2a2.5 2.5 0 0 0-2.5 2.5v.5A3.5 3.5 0 0 0 4 8.5c0 .9.34 1.73.9 2.36A3.5 3.5 0 0 0 6 15.5a3.5 3.5 0 0 0 2 3.16V20a2 2 0 0 0 4 0v-1.5"/><path d="M14.5 2A2.5 2.5 0 0 1 17 4.5V5a3.5 3.5 0 0 1 3 3.5c0 .9-.34 1.73-.9 2.36A3.5 3.5 0 0 1 19 15.5a3.5 3.5 0 0 1-2 3.16V20a2 2 0 0 1-4 0v-5"/></svg>',
  message: '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  music: '<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  gamepad: '<svg viewBox="0 0 24 24"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.59C2.6 9.42 2 14.46 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.41-1.41A2 2 0 0 1 9.83 16h4.34a2 2 0 0 1 1.41.59L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.54-.6-6.58-.68-7.26A4 4 0 0 0 17.32 5z"/></svg>',
  globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
};

const features = [
  { title: 'Our Memories', desc: 'A collection of favorite moments together', icon: 'camera', grad: 'linear-gradient(90deg,#f472b6,#e11d48)', view: 'memories', delay: '0ms' },
  { title: 'Love Quiz', desc: 'How well do you know me? Test time!', icon: 'brain', grad: 'linear-gradient(90deg,#fb923c,#dc2626)', view: 'quiz', delay: '100ms' },
  { title: 'Birthday Messages', desc: 'Heartfelt messages from the ones who love you', icon: 'message', grad: 'linear-gradient(90deg,#60a5fa,#0891b2)', view: 'messages', delay: '200ms' },
  { title: 'Our Playlist', desc: 'Songs that remind me of you', icon: 'music', grad: 'linear-gradient(90deg,#4ade80,#059669)', view: 'playlist', delay: '300ms' },
  { title: 'Mini Games', desc: 'Fun little games just for you', icon: 'gamepad', grad: 'linear-gradient(90deg,#a78bfa,#9333ea)', view: 'games', delay: '400ms' },
  { title: 'Journey to You', desc: 'Our cities, our distance, our path to reunion', icon: 'globe', grad: 'linear-gradient(90deg,#818cf8,#2563eb)', view: 'journey', delay: '500ms' }
];

const grid = document.getElementById('featuresGrid');
features.forEach(f => {
  const a = document.createElement('a');
  a.className = 'feature-card card';
  a.style.animationDelay = f.delay;
  a.innerHTML = `<div class="feature-top" style="background:${f.grad};border-radius:24px 24px 0 0;"></div>
    <div class="feature-body">
      <div class="feature-icon" style="background:${f.grad};">${icons[f.icon]}</div>
      <div><h3>${f.title}</h3><p>${f.desc}</p></div>
    </div>`;
  a.onclick = e => { e.preventDefault(); openView(f.view, f); };
  grid.appendChild(a);
});

const subView = document.getElementById('subView'),
  subInner = document.getElementById('subInner'),
  backBtn = document.getElementById('backBtn');
let viewCleanup = null;

function openView(name, f) {
  subInner.innerHTML = '';
  if (viewCleanup) { viewCleanup(); viewCleanup = null; }
  subView.classList.add('active');
  backBtn.style.display = 'block';
  const head = `<div class="card sub-card"><div class="sub-head">
    <div class="sub-icon" style="background:${f.grad};">${icons[f.icon]}</div>
    <div><h2>${f.title}</h2><p>${f.desc}</p></div></div>`;
  const tail = `</div>`;
  if (name === 'memories') subInner.innerHTML = head + memoriesHTML() + tail;
  if (name === 'messages') subInner.innerHTML = head + messagesHTML() + tail;
  if (name === 'playlist') { subInner.innerHTML = head + playlistHTML() + tail; initPlaylist(); }
  if (name === 'quiz') { subInner.innerHTML = head + `<div id="quizBody"></div>` + tail; initQuiz(); }
  if (name === 'games') { subInner.innerHTML = head + gamesHTML() + tail; initGames(); }
  if (name === 'journey') subInner.innerHTML = head + journeyHTML() + tail;
  subView.scrollTop = 0;
}

backBtn.onclick = () => {
  subView.classList.remove('active');
  backBtn.style.display = 'none';
  if (viewCleanup) { viewCleanup(); viewCleanup = null; }
};

function memoriesHTML() {
  const grads = [['#f472b6', '#db2777'], ['#a78bfa', '#7c3aed'], ['#60a5fa', '#2563eb'], ['#4ade80', '#059669'], ['#fb923c', '#ea580c'], ['#facc15', '#ca8a04'], ['#2dd4bf', '#0d9488'], ['#f472b6', '#9333ea']];
  return `<div class="gallery-grid">${GALLERY_PHOTOS.map((p, i) => {
    const c1 = grads[i % 8][0], c2 = grads[i % 8][1];
    const isReal = p[0].includes('<img');
    if (isReal) {
      return `<div class="photo real" style="background:linear-gradient(135deg,${c1},${c2});" onclick="openLightbox(${i},'${c1}','${c2}')" title="Click to zoom 🔍">
        ${p[0]}
        <div class="photo-cap">${p[1]}<small>${p[2]}</small></div>
      </div>`;
    }
    return `<div class="photo" style="background:linear-gradient(135deg,${c1},${c2});" onclick="openLightbox(${i},'${c1}','${c2}')" title="Click to zoom 🔍">
      <div><div style="font-size:22px;margin-bottom:4px;">${p[0]}</div>${p[1]}<small>${p[2]} · tap to zoom 🔍</small></div>
    </div>`;
  }).join('')}</div>
  <p style="text-align:center;margin-top:18px;font-size:12px;color:var(--text-faint);">Every picture is a reminder of how much you mean to me. 💌</p>`;
}

function videoEmbedHTML(url) {
  if (!url) return '<div class="video-box">▶️</div>';
  url = url.trim();
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let id = '';
    const m1 = url.match(/[?&]v=([\w-]{6,})/);
    const m2 = url.match(/youtu\.be\/([\w-]{6,})/);
    if (m1) id = m1[1]; else if (m2) id = m2[1];
    if (id) return `<div class="video-box" style="padding:0;background:#000;"><iframe src="https://www.youtube.com/embed/${id}" style="width:100%;height:100%;border:none;border-radius:12px;" allowfullscreen></iframe></div>`;
  }
  if (/\.(mp4|webm|ogg|m4v)(\?|$)/i.test(url))
    return `<div class="video-box" style="padding:0;background:#000;"><video controls preload="metadata" style="width:100%;height:100%;border-radius:12px;" src="${encodeURI(url)}"></video></div>`;
  return '<div class="video-box">▶️</div>';
}

function msgText(t) {
  return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
}

function messagesHTML() {
  return LOVE_MESSAGES.map(m => `<div class="card msg-card fade-in"><h4>${m[0]}</h4><p style="white-space:pre-line">${msgText(m[1])}</p>${videoEmbedHTML(m[2] || '')}</div>`).join('') +
    `<p style="text-align:center;font-size:12px;color:var(--text-faint);">Made for you 🎬</p>`;
}

function playlistHTML() {
  return `<div id="trackList">` + SONGS.map((t, i) => `
    <div class="track" data-i="${i}">
      <div class="track-num">${i + 1}</div>
      <div class="track-info"><b>${t[0]}</b><span>${t[1]}</span></div>
      <div class="eq" style="display:none;"><i></i><i></i><i></i></div>
      <button class="track-play" data-play="${i}" title="Play / pause">▶</button>
      <span class="track-dur">${t[2]}</span>
    </div>`).join('') + `</div>
    <div id="plSeek" style="margin-top:16px;">
      <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-faint);margin-bottom:6px;"><span id="plCur">0:00</span><span id="plDur">0:00</span></div>
      <input type="range" id="plRange" min="0" max="1000" value="0" disabled>
    </div>
    <p style="text-align:center;font-size:12px;color:var(--text-faint);margin-top:14px;">Press play and enjoy 🎧</p>`;
}

let playlistAudio = null, currentTrack = -1;

function toDirectAudioLink(url) {
  if (!url) return '';
  url = url.trim();
  const g = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (g) return 'https://drive.google.com/uc?export=download&id=' + g[1];
  if (url.includes('dropbox.com')) return url.replace(/[?&]dl=0/, '?dl=1');
  return url;
}

function setTrackState(i, state) {
  const tr = document.querySelector('.track[data-i="' + i + '"]');
  if (!tr) return;
  const btn = tr.querySelector('.track-play');
  if (state === 'play') {
    tr.classList.add('playing'); tr.classList.remove('paused-play');
    tr.querySelector('.eq').style.display = 'flex'; btn.textContent = '⏸';
  } else if (state === 'pause') {
    tr.classList.remove('playing'); tr.classList.add('paused-play');
    tr.querySelector('.eq').style.display = 'none'; btn.textContent = '▶';
  } else {
    tr.classList.remove('playing'); tr.classList.remove('paused-play');
    tr.querySelector('.eq').style.display = 'none'; btn.textContent = '▶';
  }
}

function stopAllTracks() {
  document.querySelectorAll('.track').forEach(t => setTrackState(+t.dataset.i, 'stop'));
}

function initPlaylist() {
  if (!playlistAudio) playlistAudio = new Audio();
  stopAllTracks();
  if (!playlistAudio.paused && currentTrack >= 0) setTrackState(currentTrack, 'play');
  playlistAudio.onended = () => { if (currentTrack >= 0) setTrackState(currentTrack, 'stop'); currentTrack = -1; };

  const plRange = document.getElementById('plRange'),
    plCur = document.getElementById('plCur'),
    plDur = document.getElementById('plDur');
  const fmtT = s => { if (!isFinite(s)) return '0:00'; s = Math.floor(s); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

  playlistAudio.ontimeupdate = () => {
    if (playlistAudio.duration) plRange.value = Math.round(playlistAudio.currentTime / playlistAudio.duration * 1000);
    plCur.textContent = fmtT(playlistAudio.currentTime);
  };
  playlistAudio.onloadedmetadata = () => { plDur.textContent = fmtT(playlistAudio.duration); plRange.disabled = false; };
  plRange.oninput = () => { if (playlistAudio.duration) playlistAudio.currentTime = plRange.value / 1000 * playlistAudio.duration; };
  if (!playlistAudio.paused && currentTrack >= 0) { plRange.disabled = false; plDur.textContent = fmtT(playlistAudio.duration); }

  playlistAudio.onerror = () => {
    if (currentTrack >= 0) {
      setTrackState(currentTrack, 'stop');
      showEgg('🎵 Song could not play', 'The link is not a direct audio file.');
    }
  };

  document.querySelectorAll('.track').forEach(tr => {
    const i = +tr.dataset.i;
    const btn = tr.querySelector('.track-play');
    function toggle() {
      if (currentTrack === i && !playlistAudio.paused) {
        playlistAudio.pause(); setTrackState(i, 'pause'); return;
      }
      stopAllTracks();
      const url = toDirectAudioLink(SONGS[i][3]);
      if (!url) { showEgg('🎵 No music link yet', 'Add an audio file link for this song.'); return; }
      currentTrack = i;
      playlistAudio.src = url;
      playlistAudio.currentTime = 0;
      let tries = 0;
      function tryPlay() {
        playlistAudio.play().then(() => { setTrackState(i, 'play'); tries = 99; }).catch(() => {
          tries++;
          if (tries < 3) setTimeout(() => { if (currentTrack === i) tryPlay(); }, 700);
          else {
            setTrackState(i, 'stop'); currentTrack = -1;
            showEgg('🎵 Song could not play', 'The link was blocked or is not a direct audio file.');
          }
        });
      }
      tryPlay();
    }
    btn.onclick = e => { e.stopPropagation(); toggle(); };
    tr.onclick = toggle;
  });
}

function initQuiz() {
  const body = document.getElementById('quizBody');
  let idx = 0, score = 0;
  function render() {
    if (idx >= QUIZ.length) {
      const pct = Math.round(score / QUIZ.length * 100);
      const msg = pct === 100 ? 'A perfect score! 💍' : pct >= 70 ? 'You know me so well! 💕' : pct >= 40 ? 'Not bad... but we need more date nights 😄' : 'Just kidding — I love you anyway 💛';
      body.innerHTML = `<div style="text-align:center;padding:16px 6px;">
        <div style="font-size:44px;margin-bottom:10px;">🏆</div>
        <div class="grad-text" style="font-size:36px;font-weight:800;">${score}/${QUIZ.length}</div>
        <p style="margin:12px 0 20px;color:var(--text-soft);">${msg}</p>
        <button class="btn-small" id="quizRetry">Try Again 💫</button></div>`;
      document.getElementById('quizRetry').onclick = () => { idx = 0; score = 0; render(); };
      return;
    }
    const q = QUIZ[idx];
    body.innerHTML = `<div class="quiz-bar"><i style="width:${idx / QUIZ.length * 100}%"></i></div>
      <p style="font-size:12px;color:var(--text-faint);margin-bottom:10px;">Question ${idx + 1} of ${QUIZ.length}</p>
      <div class="quiz-q">${q.q}</div>` +
      q.opts.map((o, i) => `<button class="quiz-opt" data-i="${i}">${o}</button>`).join('');
    body.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.onclick = () => {
        const i = +btn.dataset.i;
        body.querySelectorAll('.quiz-opt').forEach(b => b.style.pointerEvents = 'none');
        if (i === q.a) { btn.classList.add('correct'); score++; }
        else { btn.classList.add('wrong'); body.querySelector(`[data-i="${q.a}"]`).classList.add('correct'); }
        setTimeout(() => { idx++; render(); }, 1100);
      };
    });
  }
  render();
}

const musicBtn = document.getElementById('musicToggle');
let musicPlaying = false, customAudio = null, audioCtx = null, masterGain = null, melodyTimers = [], activeNodes = [];

const MELODY = [
  [392.00, .75], [392.00, .25], [440.00, 1], [392.00, 1], [523.25, 1], [493.88, 1.75], [0, .25],
  [392.00, .75], [392.00, .25], [440.00, 1], [392.00, 1], [587.33, 1], [523.25, 1.75], [0, .25],
  [392.00, .75], [392.00, .25], [783.99, 1], [659.25, 1], [523.25, 1], [493.88, 1], [440.00, 1.75], [0, .25],
  [698.46, 1], [698.46, 1], [659.25, 1], [523.25, 1], [587.33, 1], [523.25, 2]
];
const BEAT = 0.38;

function ensureCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (!masterGain) {
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(audioCtx.destination);
  }
  audioCtx.resume();
}

function playNote(freq, when, dur) {
  if (!freq) return;
  const o = audioCtx.createOscillator(), g = audioCtx.createGain();
  o.type = 'triangle';
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(0.28, when + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  o.connect(g);
  g.connect(masterGain);
  o.start(when);
  o.stop(when + dur + 0.05);
  activeNodes.push({ o: o, g: g });
}

function startBuiltinTune() {
  ensureCtx();
  masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
  masterGain.gain.setValueAtTime(1, audioCtx.currentTime);
  let t = audioCtx.currentTime + 0.1;
  MELODY.forEach(([f, b]) => { playNote(f, t, b * BEAT * 0.92); t += b * BEAT; });
  melodyTimers.push(setTimeout(() => { if (musicPlaying) stopMusic(); }, (t - audioCtx.currentTime + 0.4) * 1000));
}

function startMusic() {
  stopMusic();
  musicPlaying = true;
  musicBtn.classList.add('playing');
  musicBtn.textContent = '🎶';
  if (MUSIC_URL) {
    if (!customAudio) { customAudio = new Audio(MUSIC_URL); customAudio.loop = true; }
    customAudio.currentTime = 0;
    customAudio.play().catch(() => {});
  } else {
    startBuiltinTune();
  }
}

function stopMusic() {
  musicPlaying = false;
  musicBtn.classList.remove('playing');
  musicBtn.textContent = '🎵';
  melodyTimers.forEach(clearTimeout);
  melodyTimers = [];
  if (audioCtx && masterGain) {
    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
  }
  if (customAudio) customAudio.pause();
  activeNodes.forEach(n => {
    try { n.o.stop(0); } catch (e) {}
    try { n.o.disconnect(); } catch (e) {}
    try { n.g.disconnect(); } catch (e) {}
  });
  activeNodes = [];
  if (masterGain) { try { masterGain.disconnect(); } catch (e) {} masterGain = null; }
}

function stopAllMedia() {
  if (playlistAudio) playlistAudio.pause();
  document.querySelectorAll('.track').forEach(t => setTrackState(+t.dataset.i, 'stop'));
  stopMusic();
  document.querySelectorAll('video').forEach(v => v.pause());
}

musicBtn.onclick = () => musicPlaying ? stopMusic() : startMusic();

function gamesHTML() {
  const hs = k => localStorage.getItem(k) || '0';
  return `
  <div class="card game-tile">
    <h4>💘 Quick Hearts</h4><p>Fast-paced reflex game — catch as many falling hearts as you can in 30 seconds!</p>
    <span class="score-chip">Best score: ${hs('qh_hs')}</span>
    <div><button class="btn-small" id="qhStart">Play Quick Hearts</button></div>
    <div id="qhWrap" style="display:none;margin-top:14px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px;color:var(--text-soft);"><span>Score: <b id="qhScore">0</b></span><span>Time: <b id="qhTime">30</b>s</span></div>
      <div id="qhArea"></div>
    </div>
  </div>
  <div class="card game-tile">
    <h4>🃏 Memory Match</h4><p>Love-themed card matching — find all the pairs in as few moves as possible.</p>
    <span class="score-chip">Best moves: ${hs('mm_hs') === '0' ? '—' : hs('mm_hs')}</span>
    <div><button class="btn-small" id="mmStart">Play Memory Match</button></div>
    <div id="mmWrap" style="display:none;margin-top:14px;">
      <p style="text-align:center;font-size:13px;color:var(--text-soft);margin-bottom:10px;">Moves: <b id="mmMoves">0</b></p>
      <div id="mmGrid"></div>
      <p id="mmWin" style="display:none;text-align:center;margin-top:12px;color:#22c55e;font-weight:600;"></p>
    </div>
  </div>
  <div class="card game-tile">
    <h4>💞 Hearts Across Distance</h4><p>Fly with WASD / arrow keys and collect 10 hearts to unlock a surprise.</p>
    <span class="score-chip">Best time: ${hs('had_best') === '0' ? '—' : hs('had_best') + 's'}</span>
    <div><button class="btn-small" id="hadStart">Play Hearts Across Distance</button></div>
    <div id="hadWrap" style="display:none;margin-top:14px;">
      <p style="text-align:center;font-size:13px;color:var(--text-soft);margin-bottom:8px;">Hearts: <b id="hadScore">0</b>/10 &nbsp;·&nbsp; Time: <b id="hadTime">0</b>s</p>
      <div class="had-area" id="hadArea" tabindex="0"><span style="position:absolute;top:8px;left:10px;font-size:11px;color:#9ca3af;">Click here, then use WASD / arrows ✈️</span></div>
      <p id="hadWin" style="display:none;text-align:center;margin-top:12px;color:#22c55e;font-weight:600;"></p>
    </div>
  </div>
  <div class="card game-tile">
    <h4>✊ Rock · Paper · Scissors</h4><p>First to 5 wins. Loser owes the winner a hug! 🤗</p>
    <span class="score-chip">Wins: ${hs('rps_w') || 0} · Losses: ${hs('rps_l') || 0} · Draws: ${hs('rps_d') || 0}</span>
    <div id="rpsWrap">
      <div class="rps-score"><span>You: <b id="rpsYou">0</b></span><span>Computer: <b id="rpsCpu">0</b></span><span>Draws: <b id="rpsDr">0</b></span></div>
      <div class="rps-vs"><span id="rpsYourPick">❔</span><span style="font-size:20px;color:var(--text-faint);">VS</span><span id="rpsCpuPick">❔</span></div>
      <p id="rpsResult" style="text-align:center;font-size:14px;font-weight:600;color:var(--text-soft);min-height:20px;"></p>
      <div class="rps-row">
        <button class="rps-btn" data-m="rock">✊</button>
        <button class="rps-btn" data-m="paper">✋</button>
        <button class="rps-btn" data-m="scissors">✌️</button>
      </div>
      <p style="text-align:center;font-size:11px;color:var(--text-faint);">First to 5 — score is saved 💾</p>
    </div>
  </div>
  <div class="card game-tile">
    <h4>🏁 Racing Hearts</h4><p>Dodge the traffic and drive as far as you can — the road gets faster the longer you survive!</p>
    <span class="score-chip">Best score: ${hs('rc_best') === '0' ? '—' : Math.floor(hs('rc_best')) + ' m'}</span>
    <div><button class="btn-small" id="rcStart">Start Race 🏎️</button></div>
    <div id="rcWrap" style="display:none;margin-top:14px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px;color:var(--text-soft);"><span>Distance: <b id="rcScore">0</b> m</span><span>Speed: <b id="rcSpeed">0</b> km/h</span></div>
      <div style="position:relative;max-width:420px;margin:0 auto;height:340px;">
        <canvas id="rcCanvas" width="360" height="340" style="width:100%;height:340px;border-radius:16px;display:block;background:#111827;touch-action:none;box-shadow:0 8px 24px rgba(0,0,0,.35);"></canvas>
        <div id="rcOver" style="display:none;position:absolute;inset:0;border-radius:16px;background:rgba(15,10,25,.82);backdrop-filter:blur(4px);flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;padding:20px;">
          <div style="font-size:40px;">💥</div>
          <b style="font-size:20px;margin:8px 0 4px;" id="rcOverTitle">Crash!</b>
          <span style="font-size:13px;opacity:.85;" id="rcOverMsg"></span>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:12px;gap:12px;">
        <button class="btn-small ghost" id="rcLeft" style="flex:1;margin-left:0;user-select:none;-webkit-user-select:none;">◀ Steer</button>
        <button class="btn-small ghost" id="rcRight" style="flex:1;user-select:none;-webkit-user-select:none;">Steer ▶</button>
      </div>
      <p style="text-align:center;font-size:11px;color:var(--text-faint);margin-top:8px;">Steer with ← → keys or hold the buttons 🛣️</p>
    </div>
  </div>
  <div class="card game-tile">
    <h4>⭕ Tic Tac Toe</h4><p>You are ❤️, the computer is 💙. Can you beat the machine of love?</p>
    <span class="score-chip">Your wins: ${hs('ttt_w') || 0} · Draws: ${hs('ttt_d') || 0}</span>
    <div id="tttWrap">
      <p class="ttt-status" id="tttStatus">Your turn! ❤️</p>
      <div class="ttt-grid" id="tttGrid"></div>
      <div style="text-align:center;"><button class="btn-small" id="tttReset">New Game 🔄</button></div>
    </div>
  </div>`;
}

function initGames() {
  const qhArea = document.getElementById('qhArea');
  document.getElementById('qhStart').onclick = () => {
    document.getElementById('qhWrap').style.display = 'block';
    qhArea.innerHTML = '';
    let score = 0, time = 30;
    const sEl = document.getElementById('qhScore'), tEl = document.getElementById('qhTime');
    sEl.textContent = '0';
    tEl.textContent = '30';
    function spawn() {
      const h = document.createElement('span');
      h.className = 'qh-heart';
      h.textContent = '❤';
      h.style.left = Math.random() * 90 + '%';
      h.style.top = '-30px';
      h.style.color = ['#ec4899', '#a855f7', '#f472b6', '#fb7185'][Math.floor(Math.random() * 4)];
      qhArea.appendChild(h);
      let y = -30;
      const speed = 1.5 + Math.random() * 2;
      const fall = setInterval(() => {
        y += speed;
        h.style.top = y + 'px';
        if (y > 380) { clearInterval(fall); h.remove(); }
      }, 16);
      h.onclick = () => {
        clearInterval(fall);
        score++;
        sEl.textContent = score;
        h.textContent = '💥';
        h.style.fontSize = '32px';
        setTimeout(() => h.remove(), 150);
      };
    }
    spawn();
    const qhSpawn = setInterval(spawn, 700);
    const qhTimer = setInterval(() => {
      time--;
      tEl.textContent = time;
      if (time <= 0) {
        clearInterval(qhTimer);
        clearInterval(qhSpawn);
        qhArea.innerHTML = '';
        const best = +(localStorage.getItem('qh_hs') || 0);
        if (score > best) localStorage.setItem('qh_hs', score);
        qhArea.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:var(--text-soft);"><div style="font-size:40px;">🎉</div><b style="font-size:20px;margin:8px 0;">You caught ${score} hearts!</b><span style="font-size:13px;">${score > best ? 'New high score! 💖' : 'Best: ' + Math.max(best, score)}</span></div>`;
      }
    }, 1000);
  };

  document.getElementById('mmStart').onclick = () => {
    document.getElementById('mmWrap').style.display = 'block';
    const gridEl = document.getElementById('mmGrid');
    gridEl.innerHTML = '';
    document.getElementById('mmWin').style.display = 'none';
    const emo = ['❤️', '💖', '💝', '💗', '💓', '💘', '💕', '🌹'];
    const deck = [...emo, ...emo].sort(() => Math.random() - .5);
    let first = null, moves = 0, matched = 0, lock = false;
    document.getElementById('mmMoves').textContent = '0';
    deck.forEach(e => {
      const c = document.createElement('button');
      c.className = 'mm-card';
      c.innerHTML = `<div class="mm-inner"><div class="mm-face mm-back">❤</div><div class="mm-face mm-front">${e}</div></div>`;
      c.onclick = () => {
        if (lock || c.classList.contains('flipped') || c.classList.contains('matched')) return;
        c.classList.add('flipped');
        if (!first) { first = c; return; }
        moves++;
        document.getElementById('mmMoves').textContent = moves;
        const a = first.querySelector('.mm-front').textContent;
        const b = c.querySelector('.mm-front').textContent;
        if (a === b) {
          first.classList.add('matched');
          c.classList.add('matched');
          first = null;
          matched++;
          if (matched === 8) {
            const best = +(localStorage.getItem('mm_hs') || 999);
            if (moves < best) localStorage.setItem('mm_hs', moves);
            const w = document.getElementById('mmWin');
            w.style.display = 'block';
            w.textContent = `🎉 You won in ${moves} moves! ${moves < best ? 'New best!' : ''}`;
          }
        } else {
          lock = true;
          setTimeout(() => { first.classList.remove('flipped'); c.classList.remove('flipped'); first = null; lock = false; }, 800);
        }
      };
      gridEl.appendChild(c);
    });
  };

  const hadArea = document.getElementById('hadArea');
  document.getElementById('hadStart').onclick = () => {
    document.getElementById('hadWrap').style.display = 'block';
    hadArea.innerHTML = '';
    let collected = 0, time = 0, playing = true;
    const sEl = document.getElementById('hadScore'),
      tEl = document.getElementById('hadTime'),
      win = document.getElementById('hadWin');
    win.style.display = 'none';
    sEl.textContent = '0';
    tEl.textContent = '0';
    const p = document.createElement('span');
    p.className = 'had-player';
    p.textContent = '🛩️';
    p.style.left = '20px';
    p.style.top = '150px';
    hadArea.appendChild(p);
    let px = 20, py = 150;
    const keys = {};
    for (let i = 0; i < 10; i++) {
      const h = document.createElement('span');
      h.className = 'had-heart';
      h.textContent = '💗';
      h.style.left = 40 + Math.random() * 280 + 'px';
      h.style.top = 30 + Math.random() * 260 + 'px';
      h.dataset.active = '1';
      hadArea.appendChild(h);
    }
    const start = Date.now();
    hadArea.focus();
    hadArea.onkeydown = e => { keys[e.key.toLowerCase()] = true; e.preventDefault(); };
    hadArea.onkeyup = e => { keys[e.key.toLowerCase()] = false; };
    const loop = setInterval(() => {
      if (!playing) { clearInterval(loop); return; }
      if (keys['w'] || keys['arrowup']) py = Math.max(0, py - 4);
      if (keys['s'] || keys['arrowdown']) py = Math.min(300, py + 4);
      if (keys['a'] || keys['arrowleft']) px = Math.max(0, px - 4);
      if (keys['d'] || keys['arrowright']) px = Math.min(320, px + 4);
      p.style.left = px + 'px';
      p.style.top = py + 'px';
      hadArea.querySelectorAll('.had-heart').forEach(h => {
        if (h.dataset.active !== '1') return;
        const hx = parseFloat(h.style.left), hy = parseFloat(h.style.top);
        if (Math.abs(hx - px) < 30 && Math.abs(hy - py) < 30) {
          h.dataset.active = '0';
          h.remove();
          collected++;
          sEl.textContent = collected;
          if (collected >= 10) {
            playing = false;
            const t = Math.round((Date.now() - start) / 1000);
            tEl.textContent = t;
            const best = +(localStorage.getItem('had_best') || 9999);
            if (t < best) localStorage.setItem('had_best', t);
            win.style.display = 'block';
            win.textContent = `💌 You collected all 10 hearts in ${t}s! ${t < best ? 'New best time!' : ''}`;
          }
        }
      });
    }, 30);
    const tInt = setInterval(() => {
      if (!playing) { clearInterval(tInt); return; }
      time = Math.round((Date.now() - start) / 1000);
      tEl.textContent = time;
    }, 1000);
    viewCleanup = () => { playing = false; clearInterval(loop); clearInterval(tInt); };
  };

  const RPS_EMO = { rock: '✊', paper: '✋', scissors: '✌️' };
  const rpsWin = k => +localStorage.getItem(k) || 0;
  let rpsYou = rpsWin('rps_w'), rpsCpu = rpsWin('rps_l'), rpsDr = rpsWin('rps_d');
  function rpsRender() {
    document.getElementById('rpsYou').textContent = rpsYou;
    document.getElementById('rpsCpu').textContent = rpsCpu;
    document.getElementById('rpsDr').textContent = rpsDr;
  }
  rpsRender();
  document.querySelectorAll('.rps-btn').forEach(btn => {
    btn.onclick = () => {
      const you = btn.dataset.m;
      const cpu = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
      document.querySelectorAll('.rps-btn').forEach(b => b.classList.remove('picked'));
      btn.classList.add('picked');
      document.getElementById('rpsYourPick').textContent = RPS_EMO[you];
      document.getElementById('rpsCpuPick').textContent = RPS_EMO[cpu];
      const res = document.getElementById('rpsResult');
      if (you === cpu) {
        rpsDr++;
        res.textContent = "It's a draw! Great minds think alike 💞";
        res.style.color = '#a855f7';
      } else if ((you === 'rock' && cpu === 'scissors') || (you === 'paper' && cpu === 'rock') || (you === 'scissors' && cpu === 'paper')) {
        rpsYou++;
        res.textContent = 'You win! Collect your hug 🤗';
        res.style.color = '#22c55e';
      } else {
        rpsCpu++;
        res.textContent = 'Computer wins... but I still choose you 💔😄';
        res.style.color = '#ef4444';
      }
      localStorage.setItem('rps_w', rpsYou);
      localStorage.setItem('rps_l', rpsCpu);
      localStorage.setItem('rps_d', rpsDr);
      rpsRender();
      if (rpsYou >= 5 || rpsCpu >= 5) {
        res.textContent = rpsYou >= 5 ? '🏆 MATCH OVER — You win the match! Grand prize: unlimited hugs!' : '🏆 MATCH OVER — Computer wins the match! Rematch?';
        rpsYou = 0; rpsCpu = 0; rpsDr = 0;
        localStorage.setItem('rps_w', 0);
        localStorage.setItem('rps_l', 0);
        localStorage.setItem('rps_d', 0);
      }
    };
  });

  const tttGrid = document.getElementById('tttGrid'), tttStatus = document.getElementById('tttStatus');
  const WINS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  let tttBoard, tttOver;
  function tttWinner(b) {
    for (const [a, c, d] of WINS) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
    return b.every(x => x) ? 'draw' : null;
  }
  function tttRender() {
    tttGrid.innerHTML = '';
    tttBoard.forEach((v, i) => {
      const cell = document.createElement('button');
      cell.className = 'ttt-cell';
      cell.textContent = v === 'X' ? '❤️' : v === 'O' ? '💙' : '';
      cell.disabled = !!v || tttOver;
      cell.onclick = () => tttMove(i);
      tttGrid.appendChild(cell);
    });
  }
  function tttMove(i) {
    if (tttBoard[i] || tttOver) return;
    tttBoard[i] = 'X';
    tttRender();
    let w = tttWinner(tttBoard);
    if (w) return tttEnd(w);
    const empt = tttBoard.map((v, i) => v ? null : i).filter(v => v !== null);
    let move = null;
    for (const idx of empt) { const b = [...tttBoard]; b[idx] = 'O'; if (tttWinner(b) === 'O') { move = idx; break; } }
    if (move === null) for (const idx of empt) { const b = [...tttBoard]; b[idx] = 'X'; if (tttWinner(b) === 'X') { move = idx; break; } }
    if (move === null && tttBoard[4] === null) move = 4;
    if (move === null) {
      const corners = [0, 2, 6, 8].filter(c => tttBoard[c] === null);
      if (corners.length) move = corners[Math.floor(Math.random() * corners.length)];
    }
    if (move === null) move = empt[Math.floor(Math.random() * empt.length)];
    tttBoard[move] = 'O';
    tttRender();
    w = tttWinner(tttBoard);
    if (w) tttEnd(w); else tttStatus.textContent = 'Your turn! ❤️';
  }
  function tttEnd(w) {
    tttOver = true;
    tttRender();
    const wins = +localStorage.getItem('ttt_w') || 0, draws = +localStorage.getItem('ttt_d') || 0;
    if (w === 'X') { localStorage.setItem('ttt_w', wins + 1); tttStatus.textContent = '🎉 You win! Love conquers all ❤️'; tttStatus.style.color = '#22c55e'; }
    else if (w === 'O') { tttStatus.textContent = '💙 Computer wins this one — rematch?'; tttStatus.style.color = '#ef4444'; }
    else { localStorage.setItem('ttt_d', draws + 1); tttStatus.textContent = '🤝 A draw! Perfectly matched, as always'; tttStatus.style.color = '#a855f7'; }
  }
  function tttNew() {
    tttBoard = Array(9).fill(null);
    tttOver = false;
    tttStatus.textContent = 'Your turn! ❤️';
    tttStatus.style.color = '';
    tttRender();
  }
  document.getElementById('tttReset').onclick = tttNew;
  tttNew();

  const rcCanvas = document.getElementById('rcCanvas');
  document.getElementById('rcStart').onclick = () => {
    document.getElementById('rcWrap').style.display = 'block';
    document.getElementById('rcOver').style.display = 'none';
    const c = rcCanvas.getContext('2d');
    const W = rcCanvas.width, H = rcCanvas.height;
    const lanes = [W * 0.26, W * 0.5, W * 0.74];
    const vehicles = ['🚗', '🚙', '🚕', '🚛', '🛻', '🏍️'];
    let playerX = lanes[1], targetX = playerX;
    let distance = 0, speed = 4.2, running = true, frame = 0, roadOff = 0, spawnGap = 55;
    let obstacles = [];
    const keys = { left: false, right: false };
    const sEl = document.getElementById('rcScore'), vEl = document.getElementById('rcSpeed');

    function spawn() {
      const lane = Math.floor(Math.random() * 3);
      const last = obstacles[obstacles.length - 1];
      const useLane = (last && Math.random() < 0.45) ? (last.lane + 1 + Math.floor(Math.random() * 2)) % 3 : lane;
      obstacles.push({ x: lanes[useLane], y: -50, lane: useLane, e: vehicles[Math.floor(Math.random() * vehicles.length)] });
    }

    function draw() {
      c.fillStyle = '#111827'; c.fillRect(0, 0, W, H);
      c.fillStyle = '#374151'; c.fillRect(W * 0.08, 0, W * 0.84, H);
      c.fillStyle = '#f9a8d4';
      c.fillRect(W * 0.08 - 4, 0, 4, H); c.fillRect(W * 0.92, 0, 4, H);
      c.fillStyle = '#e5e7eb';
      for (let y = -40; y < H; y += 44) {
        const yy = y + roadOff;
        c.fillRect(W * 0.42 - 2, yy, 4, 22); c.fillRect(W * 0.62 - 2, yy, 4, 22);
      }
      c.font = '34px serif'; c.textAlign = 'center';
      obstacles.forEach(o => c.fillText(o.e, o.x, o.y));
      c.font = '40px serif'; c.fillText('🏎️', playerX, H - 36);
    }

    function gameOver() {
      running = false;
      const best = +(localStorage.getItem('rc_best') || 0);
      const isBest = distance > best;
      if (isBest) localStorage.setItem('rc_best', Math.floor(distance));
      document.getElementById('rcOverMsg').textContent = `You drove ${Math.floor(distance)} m ${isBest ? '— new best! 🏆' : '· Best: ' + Math.floor(Math.max(best, distance)) + ' m'}`;
      document.getElementById('rcOver').style.display = 'flex';
      cleanup();
    }

    function loop() {
      if (!running) return;
      frame++;
      if (keys.left) targetX -= 6;
      if (keys.right) targetX += 6;
      targetX = Math.max(W * 0.18, Math.min(W * 0.82, targetX));
      playerX += (targetX - playerX) * 0.22;
      speed = Math.min(4.2 + distance * 0.004, 11);
      roadOff = (roadOff + speed) % 44;
      spawnGap = Math.max(26, 58 - Math.floor(speed * 2.4));
      if (frame % spawnGap === 0) spawn();
      obstacles.forEach(o => o.y += speed);
      obstacles = obstacles.filter(o => o.y < H + 60);
      for (const o of obstacles) {
        if (Math.abs(o.x - playerX) < 30 && o.y > H - 96 && o.y < H - 16) { gameOver(); return; }
      }
      distance += speed * 0.09;
      sEl.textContent = Math.floor(distance);
      vEl.textContent = Math.round(speed * 11);
      draw();
      raf = requestAnimationFrame(loop);
    }

    function kd(e) {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { keys.left = true; e.preventDefault(); }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { keys.right = true; e.preventDefault(); }
    }
    function ku(e) {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
    }
    function bindHold(el, dir) {
      const dn = e => { e.preventDefault(); keys[dir] = true; };
      const up = () => { keys[dir] = false; };
      el.addEventListener('mousedown', dn);
      el.addEventListener('mouseup', up);
      el.addEventListener('mouseleave', up);
      el.addEventListener('touchstart', dn, { passive: false });
      el.addEventListener('touchend', up);
      el.addEventListener('touchcancel', up);
    }
    bindHold(document.getElementById('rcLeft'), 'left');
    bindHold(document.getElementById('rcRight'), 'right');
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    let raf = requestAnimationFrame(loop);

    function cleanup() {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
    }
    viewCleanup = () => { running = false; cleanup(); };
  };
}

function journeyHTML() {
  const m = JOURNEY.me, g = JOURNEY.her1, n = JOURNEY.her2, p = JOURNEY.her3;
  return `
  <div class="journey-stage">
    <svg class="journey-map" viewBox="0 0 760 260">
      <defs>
        <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#166534"/>
        </pattern>
      </defs>
      <rect width="760" height="260" fill="url(#dots)" opacity=".6"/>

      <path d="M ${m.x} ${m.y} Q 360 195 ${g.x} ${g.y}" fill="none" stroke="#ec4899" stroke-width="2.5" stroke-dasharray="7 6" style="animation:dashMove 1.2s linear infinite;"/>
      <path d="M ${m.x} ${m.y} Q 400 105 ${n.x} ${n.y}" fill="none" stroke="#f472b6" stroke-width="2.5" stroke-dasharray="7 6" style="animation:dashMove 1.2s linear infinite;"/>
      <path d="M ${m.x} ${m.y} Q 450 60 ${p.x} ${p.y}" fill="none" stroke="#a855f7" stroke-width="2.5" stroke-dasharray="7 6" style="animation:dashMove 1.2s linear infinite;"/>

      <circle cx="${m.x}" cy="${m.y}" r="7" class="map-dot"/>
      <circle cx="${m.x}" cy="${m.y}" r="13" fill="none" stroke="#ec4899" stroke-width="1.5" opacity=".5">
        <animate attributeName="r" values="10;18" dur="1.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".6;0" dur="1.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${g.x}" cy="${g.y}" r="6" fill="#a855f7"/>
      <circle cx="${n.x}" cy="${n.y}" r="6" fill="#a855f7"/>
      <circle cx="${p.x}" cy="${p.y}" r="6" fill="#a855f7"/>
      <circle cx="${p.x}" cy="${p.y}" r="12" fill="none" stroke="#a855f7" stroke-width="1.5" opacity=".5">
        <animate attributeName="r" values="9;16" dur="1.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".6;0" dur="1.6s" repeatCount="indefinite"/>
      </circle>

      <text x="${m.x - 30}" y="${m.y - 18}" class="map-city">${m.name} 🧡</text>
      <text x="${g.x - 34}" y="${g.y + 26}" class="map-city">${g.name} 💜</text>
      <text x="${n.x - 48}" y="${n.y - 16}" class="map-city">${n.name} 💜</text>
      <text x="${p.x - 22}" y="${p.y - 16}" class="map-city">${p.name} 💜</text>

      <text x="342" y="212" class="map-dist">${g.dist}</text>
      <text x="368" y="112" class="map-dist">${n.dist}</text>
      <text x="450" y="80" class="map-dist">${p.dist}</text>

      <text x="20" y="248" fill="#86efac" font-size="11" font-family="inherit" opacity=".8">Two cities, one heartbeat</text>
    </svg>
    <span class="plane-icon" style="offset-path:path('M ${m.x} ${m.y} Q 360 195 ${g.x} ${g.y}');">🚗</span>
  </div>
  <div class="card" style="margin-top:18px;padding:22px 26px;text-align:center;">
    <h3 style="color:var(--text);margin-bottom:8px;">${m.name} → ${g.name} · ${n.name} · ${p.name} 🧡💜</h3>
    <p style="font-size:14px;color:var(--text-faint);line-height:1.7;">
      ${g.dist} to ${g.name}, ${n.dist} to ${n.name}, and ${p.dist} all the way to ${p.name}.
      Near or far, every kilometre feels like a lifetime when you're not beside me. 🛣️💛</p>
  </div>`;
}

const lightbox = document.getElementById('lightbox'),
  lbPhoto = document.getElementById('lbPhoto'),
  lbTitle = document.getElementById('lbTitle'),
  lbCaption = document.getElementById('lbCaption');

function openLightbox(i, c1, c2) {
  const p = GALLERY_PHOTOS[i];
  lbPhoto.style.background = `linear-gradient(135deg,${c1},${c2})`;
  lbPhoto.innerHTML = p[0];
  lbTitle.textContent = p[1];
  lbCaption.textContent = p[2] + ' 💛';
  lightbox.classList.add('open');
}
function closeLightbox() { lightbox.classList.remove('open'); }
document.getElementById('lbClose').onclick = closeLightbox;
lightbox.onclick = e => { if (e.target === lightbox) closeLightbox(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

const STAR_COLORS = ['#ec4899', '#a855f7', '#facc15', '#60a5fa', '#f472b6', '#c084fc'];
const STAR_SHAPES = ['✦', '✧', '★', '⭐'];
document.addEventListener('click', e => {
  const burst = 7 + Math.floor(Math.random() * 3);
  for (let i = 0; i < burst; i++) {
    const s = document.createElement('span');
    s.className = 'click-star';
    s.textContent = STAR_SHAPES[Math.floor(Math.random() * STAR_SHAPES.length)];
    s.style.left = e.clientX + 'px';
    s.style.top = e.clientY + 'px';
    s.style.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    const angle = (Math.PI * 2 * i) / burst + Math.random() * .6;
    const dist = 34 + Math.random() * 38;
    s.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    s.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    s.style.setProperty('--rot', (Math.random() * 220 - 110) + 'deg');
    s.style.animationDuration = (0.55 + Math.random() * 0.4) + 's';
    s.style.fontSize = (11 + Math.random() * 9) + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1000);
  }
});

const eggToast = document.getElementById('eggToast');
function showEgg(title, msg) {
  document.getElementById('eggTitle').textContent = title;
  document.getElementById('eggMsg').textContent = msg;
  eggToast.classList.add('show');
  setTimeout(() => eggToast.classList.remove('show'), 3800);
}
document.getElementById('eggStar').onclick = () => showEgg('The first secret revealed! ⭐', 'This is just the beginning of all the surprises!');
document.getElementById('eggStar2').onclick = () => showEgg('A shining star, just like you! ⭐', "You light up the world in ways you can't even imagine");
document.getElementById('eggGift').onclick = () => showEgg('A special gift waiting to be unwrapped! 🎁', 'The best gift is your love');