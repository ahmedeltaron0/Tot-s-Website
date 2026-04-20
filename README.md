# 💕 Do You Love Me? — A Romantic Interactive Web Experience

A cinematic, romantic interactive web app built with React, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How It Works

1. **Landing Page** — "Do you only just love me?" with a dodging "No" button and a beautiful slideshow background
2. **6 Journey Pages** — Each with a romantic message and space for a personal response
3. **Final Recap** — A cinematic summary of all messages, styled as floating glass cards

## Customization Guide

All content is controlled from a single configuration file:

### 📝 Edit Content → [`src/data/pagesData.js`](src/data/pagesData.js)

| What to Edit | Where |
|---|---|
| Landing headline & subtext | `landingConfig.headline` / `landingConfig.subheading` |
| Landing button text | `landingConfig.yesButtonText` / `landingConfig.noButtonText` |
| Landing background images | `landingConfig.backgroundImages` array |
| Journey page titles | `pagesData[n].title` |
| Journey page messages | `pagesData[n].message` |
| Journey page media | `pagesData[n].mediaSrc` + `pagesData[n].mediaType` |
| Journey page placeholders | `pagesData[n].placeholder` |
| Accent colors per page | `pagesData[n].accentColor` |
| Final page title | `finalPageConfig.title` |
| Final closing message | `finalPageConfig.closingMessage` |
| Final video/image | `finalPageConfig.mediaSrc` + `finalPageConfig.mediaType` |

### 🖼️ Add Media → `public/assets/`

Place your images and videos in `public/assets/`:

```
public/assets/
├── landing1.jpg   (Landing slideshow image 1)
├── landing2.jpg   (Landing slideshow image 2)
├── landing3.jpg   (Landing slideshow image 3)
├── landing4.jpg   (Landing slideshow image 4)
├── page1.jpg      (Journey page 1 image)
├── page2.jpg      (Journey page 2 image)
├── page3.jpg      (Journey page 3 image)
├── page4.jpg      (Journey page 4 image)
├── page5.jpg      (Journey page 5 image)
├── page6.jpg      (Journey page 6 image)
└── final.mp4      (Final page video)
```

The app handles missing media gracefully with beautiful fallback UI.

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS v4**
- **Framer Motion**
- **Lucide React** (icons)
- **No backend** — all state stored in localStorage

## Project Structure

```
src/
├── components/
│   ├── LandingPage.jsx          # Hero with slideshow + dodging button
│   ├── DodgingNoButton.jsx      # Playful evasive button
│   ├── BackgroundSlideshow.jsx  # Rotating background images
│   ├── FloatingHearts.jsx       # Floating heart particles
│   ├── JourneyPage.jsx          # Template for pages 1-6
│   ├── FinalRecapPage.jsx       # Cinematic summary page
│   ├── ProgressIndicator.jsx    # Step X of 7
│   ├── MediaRenderer.jsx        # Image/video with fallback
│   └── NavigationControls.jsx   # Back/Submit/Next buttons
├── data/
│   └── pagesData.js             # ⭐ All editable content here
├── hooks/
│   └── useJourneyState.js       # State management + localStorage
├── App.jsx                      # Main app orchestrator
├── main.jsx                     # Entry point
└── index.css                    # Tailwind + custom styles
```
