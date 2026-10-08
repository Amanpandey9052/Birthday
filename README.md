# Birthday Surprise 🎉

A password-protected birthday website built with plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies.

## Features

- Password-protected login screen with animated welcome and loading screens
- Birthday countdown
- Light and dark theme toggle (remembered between visits)
- Built-in "Happy Birthday" melody, or your own audio file
- **Our Memories**: photo gallery with a click-to-zoom lightbox
- **Love Quiz**: multiple-choice quiz with a score screen
- **Birthday Messages**: text messages with optional video (YouTube or local MP4)
- **Our Playlist**: audio player with a seek bar
- **Mini Games**: Quick Hearts, Memory Match, Hearts Across Distance, Rock Paper Scissors, Racing Hearts, Tic Tac Toe
- **Journey to You**: animated map of cities and distances
- Star burst on every click and a few hidden easter eggs

## Project Structure

```
.
├── index.html   # page structure and screens
├── style.css    # all styling, animations, light/dark themes
└── script.js    # logic, content and settings
```

## Getting Started

1. Put the three files in the same folder.
2. Open `index.html` in a browser.
3. Enter the password: **`demo123`**

No server is needed. If you add local media files (photos, MP3s, MP4s), keep them in the same folder as `index.html`.

## Configuration

All settings and content are constants at the top of `script.js`.

| Constant | Purpose |
|---|---|
| `SECRET_PASSWORD` | Login password (default `demo123`) |
| `BIRTHDAY_MONTH` | Countdown month, **0-indexed** (0 = Jan, 11 = Dec) |
| `BIRTHDAY_DAY` | Countdown day of the month |
| `MUSIC_URL` | Audio file played after login. Leave `''` for the built-in tune |
| `PLAY_ON_LOGIN` | `true` starts music after login, `false` plays only via the 🎵 button |
| `GALLERY_PHOTOS` | Photos for Our Memories |
| `LOVE_MESSAGES` | Messages for Birthday Messages |
| `SONGS` | Tracks for Our Playlist |
| `QUIZ` | Questions for the Love Quiz |
| `JOURNEY` | Cities, map positions and distances |

### Gallery photos

Each entry is `[image or emoji, title, caption]`. To use a real photo, put an `<img>` tag as the first item:

```js
['<img src="photo1.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:16px;">', 'First Date', 'A great day']
```

Use a plain emoji instead of the `<img>` tag for a coloured placeholder card.

### Messages and video

Each entry is `[title, text, video]`. The text supports `**bold**` and preserves line breaks. The video is optional:

```js
['Title', 'Your message...', 'surprise.mp4']                          // local file
['Title', 'Your message...', 'https://youtu.be/xxxxxxxxxxx']          // YouTube
['Title', 'Your message...', '']                                      // placeholder box
```

### Playlist

Each entry is `[song name, artist, duration, audio link]`:

```js
['Perfect', 'Ed Sheeran', '4:23', 'perfect.mp3']
```

The audio link can be a local file name, a direct `.mp3` URL, a Google Drive share link or a Dropbox share link. Drive and Dropbox links are converted automatically. If the link is empty, the track shows a "No music link yet" notice.

### Quiz

```js
{ q: 'Question text?', opts: ['A', 'B', 'C', 'D'], a: 2 }
```

`a` is the index of the correct option, starting from `0`.

### Journey map

`JOURNEY` holds four cities. Each has a `name` and an `x`/`y` position on the 760×260 map. The three destination cities also have a `dist` label.

## Deployment

The site is fully static, so it works on any static host: Netlify, GitHub Pages, Vercel, Cloudflare Pages or a plain web server. Upload the three files plus any media you added.

## Notes

- **The password is not real security.** It sits in plain text in `script.js`, so anyone who views the source can read it. It is meant for a fun surprise, not for protecting sensitive content.
- Game scores, theme and login state are stored in the browser (`localStorage` and `sessionStorage`) and stay on that device.
- Browsers block autoplay audio until the user interacts with the page. Music starts after login because the login click counts as an interaction.
- Works in current versions of Chrome, Edge, Firefox and Safari.
