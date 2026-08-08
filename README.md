# 🪐 Project Helios — 3D Solar System Universe Explorer & Interactive Portfolio

[![React](https://img.shields.io/badge/React-19.2.7-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r185-000000?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-9.6.1-000000?style=flat-square&logo=react&logoColor=white)](https://docs.pmnd.rs/react-three-fiber)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel Serverless](https://img.shields.io/badge/Vercel-Serverless-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
[![Oxlint](https://img.shields.io/badge/Linter-Oxlint_v1.71-orange?style=flat-square)](https://oxc.rs/)

> **Project Helios** is an immersive, high-performance 3D WebGL solar system environment and developer portfolio created by **Pradyun Sushena**. Replaces traditional flat web pages with a real-time, interactive 3D universe where portfolio sections (Projects, Experience, Skills, About/Contact) are represented as celestial bodies orbiting a central glowing star.

---

## 📑 Table of Contents

- [Executive Summary](#-executive-summary)
- [Key Features](#-key-features)
- [Technical Architecture](#-technical-architecture)
- [System Architecture Diagram](#-system-architecture-diagram)
- [3D Graphics & Physics Pipeline](#-3d-graphics--physics-pipeline)
- [Serverless API & Data Integration](#-serverless-api--data-integration)
- [State Management & UI Control](#-state-management--ui-control)
- [Project Directory Structure](#-project-directory-structure)
- [Resume & Presentation Highlights](#-resume--presentation-highlights)
- [Tech Stack Matrix](#-tech-stack-matrix)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [Build & Performance Optimization](#-build--performance-optimization)

---

## 🌟 Executive Summary

Traditional developer portfolios rely on static scrolling layouts. **Project Helios** reinterprets personal branding into an interactive 3D space simulation. Users navigate through an orbital solar system using real-time camera controls, vector-interpolated camera transitions, and dynamic glassmorphic HUD overlays.

### Why Helios?
- **Immersive Spatial Navigation**: Celestial bodies (planets) represent major portfolio domains (`Projects`, `Experience`, `Skills`, `About`).
- **Cinematic Focal Transitions**: Double-clicking any planet smoothly interpolates the 3D perspective using GSAP vector tweening while freezing orbital trajectory for detailed viewing.
- **Live Serverless Integration**: Displays live book reading data from Goodreads via an edge proxy serverless function, Spotify playlist streams, and a dynamic 3D satellite launching resume downloads.

---

## ✨ Key Features

1. **Real-Time 3D WebGL Solar System**
   - Central Sun with emissive scalar bloom shaders and an interactive typewriter header.
   - 4 distinct planetary bodies featuring custom PBR metallic/roughness material properties, planetary rings, and Additive Blending hover glows.
   - Procedural **Instanced Starfield** rendering 3,000 star particles efficiently in a single draw call.
   - Parametric **Ambient Satellite** orbiting on an off-axis elliptical trajectory acting as an interactive resume downloader.

2. **Cinematic Camera Physics & Interactions**
   - **Double-Click Focus Target**: Raycasts planetary meshes, calculates world coordinates (`getWorldPosition`), and animates camera vectors via GSAP `power2.inOut` easing.
   - **Escape Key Reset**: Smoothly resets camera elevation to 25° above the orbital plane `(0, 25, 50)`.
   - **Damped Orbit Controls**: Damped camera rotation and zooming with boundary constraints (`minDistance: 5`, `maxDistance: 150`).

3. **Mission Control HUD & Navigation**
   - Glassmorphic Mission Control panel tracking user exploration progress (`missionLog`).
   - Visual indicators marking visited vs. unvisited celestial bodies.
   - Direct jump buttons syncing state with the 3D camera system.

4. **Serverless Edge Goodreads RSS Parser (`/api/goodreads`)**
   - Custom Node.js edge endpoint fetching Goodreads RSS XML feed using `fast-xml-parser`.
   - Configured with CORS headers and Vercel CDN cache control (`s-maxage=3600, stale-while-revalidate=86400`).
   - Integrated via custom React hook (`useGoodreads`) with loading states and fallback placeholders.

5. **Glassmorphic UI & Responsive Drawer System**
   - Side drawer panels constructed with Framer Motion slide-in transitions (`AnimatePresence`).
   - Responsive layouts built with Tailwind CSS v4 `@theme` design tokens.
   - Accordion cards with smooth height layout animations for educational and work experience timelines.

---

## 📐 Technical Architecture

```
                               ┌─────────────────────────────────────────────────────────┐
                               │                    React 19 Frontend                    │
                               │                                                         │
                               │  ┌───────────────────────┐   ┌───────────────────────┐  │
                               │  │  Three.js Canvas      │   │  2D Glassmorphic HUD  │  │
                               │  │  (React Three Fiber)  │   │  (Framer Motion)      │  │
                               │  └───────────┬───────────┘   └───────────┬───────────┘  │
                               └──────────────┼───────────────────────────┼──────────────┘
                                              │                           │
                                              ▼                           ▼
                               ┌─────────────────────────────────────────────────────────┐
                               │                 Zustand Global Store                    │
                               │            (selectedPlanet, missionLog)                 │
                               └──────────────────────────┬──────────────────────────────┘
                                                          │
                                                          ▼
                               ┌─────────────────────────────────────────────────────────┐
                               │               Vercel Edge Serverless Function           │
                               │                    (/api/goodreads.js)                   │
                               └──────────────────────────┬──────────────────────────────┘
                                                          │
                                                          ▼
                               ┌─────────────────────────────────────────────────────────┐
                               │                 Goodreads RSS XML Feed                  │
                               └─────────────────────────────────────────────────────────┘
```

---

## 🎨 3D Graphics & Physics Pipeline

### 1. Instanced Starfield (`Starfield.tsx`)
To maintain high frame rates (60 FPS) without rendering thousands of separate object nodes, stars are rendered using `THREE.InstancedMesh`.
- **Procedural Coordinate Distribution**: 3,000 star particles are mapped using spherical coordinates:
  $$x = r \sin(\phi) \cos(\theta), \quad y = r \sin(\phi) \sin(\theta), \quad z = r \cos(\phi)$$
- **Color Palette Sampling**: Instance colors are procedurally assigned from a stellar spectrum (`#F5F7FF` blue-white, `#BFD8FF` blue, `#FFD8A8` warm yellow) and boosted with tone mapping bypass (`toneMapped={false}`).

### 2. Post-Processing Pipeline (`Scene.tsx`)
Utilizes `@react-three/postprocessing` to elevate visual fidelity:
- **Bloom Filter**: `luminanceThreshold={0.5}`, `luminanceSmoothing={0.9}`, `intensity={1.0}`. High emissive materials (e.g., Sun mesh multiplied by scalar values) produce a celestial glow without over-saturating dark space.

### 3. Planetary Motion & Camera Camera Interpolation (`Planet.tsx`)
```typescript
// Frame-rate independent planetary revolution & rotation
useFrame((_, delta) => {
  if (!groupRef.current || !planetRef.current) return;
  if (!isSelected) {
    groupRef.current.rotation.y += data.orbitalSpeed * delta;
  }
  planetRef.current.rotation.y += data.rotationSpeed * delta;
});

// Camera GSAP Vector Interpolation on Double-Click Focus
const worldPos = new THREE.Vector3();
planetRef.current.getWorldPosition(worldPos);
const camOffset = new THREE.Vector3(data.radius * 3, data.radius * 2, data.radius * 4);
const targetCamPos = worldPos.clone().add(camOffset);

gsap.to(camera.position, {
  x: targetCamPos.x, y: targetCamPos.y, z: targetCamPos.z,
  duration: 1.5, ease: 'power2.inOut',
});
```

---

## ⚡ Serverless API & Data Integration

The platform includes a dedicated serverless function (`api/goodreads.js`) deployed on Vercel Edge.

### Endpoint Details
- **Path**: `GET /api/goodreads`
- **Purpose**: Solves CORS limitations and parses Goodreads XML RSS feed into sanitized JSON for the UI bookshelf widget.
- **Dependencies**: `fast-xml-parser`

```javascript
// Edge caching header configuration
res.setHeader(
  "Cache-Control",
  "public, s-maxage=3600, stale-while-revalidate=86400"
);
```

### Output JSON Schema
```json
{
  "updated": "2026-08-08T18:26:30.000Z",
  "count": 5,
  "books": [
    {
      "id": "12345",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "cover": "https://images.gr-assets.com/books/...",
      "link": "https://www.goodreads.com/book/show/...",
      "published": 2008
    }
  ]
}
```

---

## 🗂️ Project Directory Structure

```
portfolio-website/
├── api/
│   └── goodreads.js           # Vercel Serverless Function (Goodreads RSS Parser)
├── public/
│   └── resume.pdf             # Downloadable PDF Resume asset
├── src/
│   ├── components/
│   │   ├── canvas/            # 3D WebGL Canvas Components (Three.js / R3F)
│   │   │   ├── AmbientLife.tsx   # Parametric orbiting satellite (Resume launcher)
│   │   │   ├── Planet.tsx        # Planetary meshes, orbital physics, GSAP camera focus
│   │   │   ├── Scene.tsx         # R3F Canvas root, lighting, postprocessing bloom
│   │   │   ├── Starfield.tsx     # Instanced Mesh procedural star system (3,000 instances)
│   │   │   └── Sun.tsx           # Sun mesh, emissive bloom, typewriter HTML header
│   │   ├── experience/
│   │   │   └── ExperienceCard.tsx# Accordion card component with Framer Motion
│   │   ├── planets/           # Section drawer views for active planets
│   │   │   ├── AboutPlanet.tsx   # About bio, Goodreads bookshelf, Spotify embed, contact links
│   │   │   ├── ExperiencePlanet.tsx # Work & education timeline
│   │   │   ├── ProjectsPlanet.tsx   # Software engineering project showcase
│   │   │   └── SkillsPlanet.tsx     # Technical skill categorization
│   │   ├── projects/
│   │   │   └── ProjectCard.tsx   # Project cards with technology tags & GitHub links
│   │   ├── ui/                # 2D Glassmorphic HUD Components
│   │   │   ├── MissionControl.tsx# Exploration tracker HUD & planet switcher
│   │   │   ├── Overlay.tsx       # UI container overlaying 3D Canvas
│   │   │   ├── PlanetPanel.tsx   # Glassmorphic side panel drawer
│   │   │   └── SectionTitle.tsx  # Styled section titles
│   │   └── widgets/
│   │       ├── goodreads.css     # Goodreads widget styling
│   │       └── goodreadsWidget.tsx# Live book shelf widget
│   ├── data/                  # Strongly typed application data
│   │   ├── experienceData.ts  # Education, Work, and Research datasets
│   │   ├── projectsData.ts    # Software engineering projects dataset
│   │   ├── skillsData.ts      # Technical skill groups
│   │   └── universeData.ts    # Planetary physical & orbital metadata parameters
│   ├── hooks/
│   │   └── useGoodreads.ts    # Custom React hook for fetching serverless RSS API
│   ├── store/
│   │   └── useUniverseStore.ts# Zustand global state (planet focus & mission log)
│   ├── types/                 # TypeScript interfaces and contracts
│   │   ├── experience.ts
│   │   ├── goodreads.ts
│   │   └── projects.ts
│   ├── App.tsx                # Main Application entry component
│   ├── index.css              # Tailwind CSS v4 config & glassmorphism utilities
│   └── main.tsx               # DOM root mounting
├── .oxlintrc.json             # Oxlint rule configuration
├── package.json               # Dependencies, scripts, and package metadata
├── tsconfig.json              # TypeScript compilation setup
└── vite.config.ts             # Vite bundler & Tailwind v4 plugin setup
```

---

## 💼 Resume & Presentation Highlights

*You can use the following concise bullet points in your resume, portfolio descriptions, or slides when presenting this project:*

### Resume Bullet Points
- **Built an interactive 3D portfolio web application** using **React 19**, **TypeScript**, and **Three.js / React Three Fiber**, replacing static scrolling pages with a solar-system-themed spatial universe model.
- **Engineered high-performance WebGL graphics pipeline** incorporating instanced rendering (`InstancedMesh` for 3,000 star particles), frame-rate independent orbital physics (`useFrame`), custom PBR materials, and real-time bloom post-processing (`@react-three/postprocessing`).
- **Implemented camera mechanics & spatial interpolation** leveraging **GSAP** vector animations to calculate world-space coordinates and smoothly move camera perspectives upon planetary double-click events.
- **Developed a Vercel Serverless Function Edge API** (`/api/goodreads`) using Node.js and `fast-xml-parser` to stream live RSS data from Goodreads with CORS header control and CDN edge caching (`s-maxage=3600`).
- **Architected reactive UI state control** using **Zustand** to track active focal states and user exploration logs (`missionLog`), paired with **Framer Motion** for glassmorphic drawer panel animations.

---

## 🛠️ Tech Stack Matrix

| Category | Technology | Usage & Purpose |
| :--- | :--- | :--- |
| **Core Framework** | React 19, Vite 8, TypeScript 6 | Modern component architecture, type safety, HMR development |
| **3D Rendering** | Three.js, React Three Fiber (R3F) | Declarative 3D scene management, WebGL canvas, custom meshes |
| **3D Ecosystem** | `@react-three/drei` | `OrbitControls`, `Stars`, `Html` 3D-to-DOM projection |
| **Post-Processing** | `@react-three/postprocessing` | Real-time GLSL `Bloom` glow effects |
| **Animations** | GSAP, Framer Motion | Camera vector interpolation, glassmorphic UI drawer transitions |
| **State Management**| Zustand | Reactive store for selected planet focus & exploration mission log |
| **Styling & Design** | Tailwind CSS v4, Lucide Icons | Utility-first styling with `@theme` variables, glassmorphic HUD |
| **Serverless Backend**| Node.js, Vercel Edge, `fast-xml-parser` | RSS XML feed conversion to JSON, CORS handling, edge CDN caching |
| **Linting & QA** | Oxlint, Vercel Analytics | Rust-powered linting, real-time user analytics tracking |

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/psushenadev/portfolio-website.git
   cd portfolio-website
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Run Code Linter**:
   ```bash
   npm run lint
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

6. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## ⚡ Build & Performance Optimization

- **Instanced Mesh Particle Systems**: 3,000 star particles are drawn in a single draw call via `InstancedMesh`, avoiding scene graph overhead.
- **Edge CDN Caching**: The serverless RSS parser caches feed results for 1 hour (`s-maxage=3600`) with stale-while-revalidate fallback (`86400s`), eliminating API rate limits.
- **Selective Raycasting**: Non-interactive meshes bypass pointer calculations (`raycast={() => null}`).
- **Oxlint Speed**: Uses Rust-based `oxlint` for sub-millisecond static code analysis.

---

<p center align="center">
  Designed & Engineered with ❤️ by <strong>Pradyun Sushena</strong>
</p>
