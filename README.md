# Minimalist New Tab Page

A clean and minimalist new tab page for Chrome that shows the time and a list of links of your choosing. No tracking, no network requests — your links are stored with Chrome's sync storage so they follow you across devices.

## Features

- **Clock** — a simple 12-hour clock, front and center
- **Custom links** — add your favorite sites as plain text, one per line
- **Columns and headers** — organize links into columns with headers
- **Themes** — light, dark, black, red, blue, purple, and yellow
- **Fonts** — system, monospace, sans-serif, or serif
- **Synced** — settings sync across your Chrome profiles

## Usage

Click **edit** in the bottom-left corner and type your links, one per line:

```
work
github.com github
mail.google.com gmail
---
fun
news.ycombinator.com hacker news
youtube.com youtube
```

- `URL title` — a URL, a space, then the link title
- A line without a URL becomes a **header**
- `---` on its own line starts a new **column**

## Install from source

1. Clone this repository
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select this folder
5. Open a new tab

## License

[MIT](LICENSE)
