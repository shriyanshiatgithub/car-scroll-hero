# Scroll Car Animation

A scroll-driven hero section I built for an internship assignment. As you scroll, a car drives along a road, the road turns green behind it, the headline appears letter by letter, and four stat cards pop in one by one. Scroll back up and everything plays in reverse.

**Live demo:** https://shriyanshiatgithub.github.io/car-scroll-hero/

## What it does

- The hero fills the first screen and stays pinned while you scroll
- The car's position depends on scroll progress, not on time
- A green trail grows behind the car as it moves
- The headline is revealed at the same speed as the car, so letters show up right where it passes
- The stat cards (58%, 23%, 27%, 40%) appear one by one in the second half of the scroll
- On page load, the road fades in smoothly

## Tech used

- Next.js and React
- Tailwind CSS
- GSAP with the ScrollTrigger plugin

## How it works

The whole animation is one GSAP timeline connected to the scrollbar:

```js
scrollTrigger: {
  trigger: root.current,
  start: "top top",
  end: "+=3000",
  scrub: 1,
  pin: true,
}
```

- `pin` keeps the hero fixed on screen while the animation plays.
- `scrub` links the animation to the scroll position, so scrolling back reverses it. The value `1` adds a small delay so the motion feels smooth.
- The car, the green trail and the headline reveal all start at the same point in the timeline and run for the same duration, so they stay in sync.
  - The car moves with `x`.
  - The trail grows with `scaleX`.
  - The headline is hidden with `clip-path` and uncovered as the car moves.
- The stat cards are placed on the timeline one after the other, starting at the halfway point.
- I only animate `transform`, `opacity` and `clip-path`, and never `left` or `width`, so scrolling stays smooth.

## Project structure

```
app/
  layout.tsx     page title and layout
  page.tsx       renders the Hero component
components/
  Hero.jsx       layout and all the animation code
public/
  car.png        top-view car image
.github/workflows/
  deploy.yaml    deploys to GitHub Pages
```

## Run locally

```
git clone https://github.com/shriyanshiatgithub/car-scroll-hero.git
cd car-scroll-hero
npm install
npm run dev
```

Then open http://localhost:3000

## Deployment

The site is a static export of the Next.js app, hosted on GitHub Pages. A GitHub Actions workflow builds it and publishes it every time I push to `main`.
