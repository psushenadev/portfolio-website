# 3D Solar System Portfolio

[![React](https://img.shields.io/badge/React-19.2.7-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r185-000000?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-9.6.1-000000?style=flat-square&logo=react&logoColor=white)](https://docs.pmnd.rs/react-three-fiber)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel Serverless](https://img.shields.io/badge/Vercel-Serverless-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

This is my interactive 3D solar system portfolio website! I tried to replace traditional boring flat web pages with a real-time, interactive 3D universe where the portfolio sections (**Projects**, **Experience**, **Skills**, and **About Me**) are 3D planets orbiting around a central Sun.

---

## Table of Contents

- [What is Project Helios?](#-what-is-project-helios)
- [Cool Features](#-cool-features)
- [3D Graphics Made Simple](#-3d-graphics-made-simple)
- [Goodreads & Spotify Features](#-goodreads--spotify-features)
- [Tech Stack Summary](#-tech-stack-summary)
- [How to Run It Locally](#-how-to-run-it-locally)

---

## What is Project Helios?

The average dev portfolio shows a flat page with text and links. I wanted to build something memorable that combines 3D graphics, web development, and interactivity:

- **Planets as Sections**: Each major part of my portfolio is its own 3D planet orbiting in space.
- **Double-Click to Zoom**: When you double-click any planet, the camera zooms in close to it, and the planet stops orbiting so you can easily read the content.
- **Press Escape to Reset**: Pressing `Escape` on your keyboard resets the camera back to the main solar system view.
- **Orbiting Resume Satellite**: A small satellite orbits around the Sun. If you click on it, it opens my resume as a PDF

---

## Cool Features

1. **3D Solar System Scene**
   - **Glowing Sun**: Sits in the center with a typing animation displaying cool taglines
   - **4 Interactive Planets**: Projects, Experience, Skills, and About. Each planet has custom colours, textures, and hover effects (the Projects planet even has Saturn-style rings because Saturn is cool)
   - **3,000 Glowing Stars**: A background filled with stars to make it feel realistic.
   - **Floating Resume Satellite**: A 3D satellite floating through space that opens my resume when clicked.

2. **Smooth Camera Navigation**
   - You can drag to rotate the camera around the solar system, scroll to zoom in/out, or double-click a planet to fly right to it.
   - A top-left **Mission Control** menu lists all planets and checks them off as you visit them.

3. **Live Bookshelf & Spotify Player**
   - Loads my live Goodreads "to-read" bookshelf dynamically.
   - Embeds a Spotify music player directly inside the About section (to my alltime fav playlist)

## 3D Graphics Made Simple

Here are the clever tricks used to make 3D graphics look great and run fast in the browser:

### 1. Rendering 3,000 Stars Fast
If you create 3,000 separate star objects in 3D, the website will slow down and lag. Instead, I used **Instanced Rendering** (`InstancedMesh`). This tells the GPU to draw all 3,000 stars in **1 single instruction**, keeping the website running at a smooth 60 fps

### 2. Smooth Zooming with GSAP
When you double-click a planet, the code gets the planet's position in 3D space, calculates where the camera should stand, and uses **GSAP** (an animation library) to glide the camera over smoothly over 1.5 seconds:

```typescript
// 1. Get the planet's location in space
const planetPosition = new THREE.Vector3();
planetRef.current.getWorldPosition(planetPosition);

// 2. Glide camera smoothly to the planet
gsap.to(camera.position, {
  x: planetPosition.x + offset,
  y: planetPosition.y + offset,
  z: planetPosition.z + offset,
  duration: 1.5,
  ease: 'power2.inOut',
});
```

---

## Goodreads & Spotify Features

To show my current reading list from Goodreads on the website, browsers block direct requests due to security rules (called CORS).

To solve this:
- I created a small **backend function** (`/api/goodreads`) hosted on Vercel.
- It fetches my Goodreads reading list XML feed on the server, converts it into clean JSON data, and sends it to the website.
- It caches the result for 1 hour so the bookshelf loads instantly every time.

---

## Tech Stack Summary

| Technology | What it does in this project |
| :--- | :--- |
| **React 19 & TypeScript** | Builds the website layout and keeps code organized & typed |
| **Vite 8** | Fast build tool for local development |
| **Three.js & React Three Fiber** | Renders the 3D space scene, planets, sun, and stars in the browser |
| **GSAP** | Animates the camera zoom when double-clicking planets |
| **Framer Motion** | Animates the popup side menus and experience cards |
| **Zustand** | Remembers which planet you clicked and which ones you've visited |
| **Tailwind CSS v4** | Styles the buttons, text, and glass visual effects |
| **Vercel Serverless Function** | Backend server helper that fetches Goodreads book data |

---

## How to Run It Locally

### What You Need
- **Node.js** (version 18 or newer)
- **npm** (comes with Node.js)

### Steps to Run

1. **Clone the project repository**:
   ```bash
   git clone https://github.com/psushenadev/portfolio-website.git
   cd portfolio-website
   ```

2. **Install all required packages**:
   ```bash
   npm install
   ```

3. **Start the local server**:
   ```bash
   npm run dev
   ```
   Open your browser and go to `http://localhost:5173`.

4. **Build the production version**:
   ```bash
   npm run build
   ```

---

<p align="center">
  Designed & Engineered by <strong>Pradyun Sushena</strong>
</p>
