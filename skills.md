# Premium Web Design Agent Skill Blueprint

This document defines the agent skill instructions, step-by-step methodologies, and verification workflows required to design and build premium, interactive, and visually stunning web applications. It serves as a master execution checklist.

---

## 1. Core Mandate & Design Vision

Your goal is to build web interfaces that immediately captivate the user. Every layout must look premium, modern, responsive, and alive. 

To achieve this:
1. **Never use generic or flat default layouts.** Implement subtle details like blueprint grid lines, dot textures, borders with soft gradients, and interactive animations.
2. **Prioritize motion and transitions.** Every interactive element (buttons, links, cards, icons) must respond smoothly to cursor activity.
3. **Write structured CSS and component tokens.** Avoid arbitrary inline styles (e.g. `hover:bg-[#1a2b3c]`). Use clean CSS custom variables and utility classes so that theme styles can easily be swapped.
4. **Follow the 60-30-10 rule** for colors, ensuring contrast ratios conform to WCAG accessibility guidelines.

---

## 2. Implementation Workflow (Step-by-Step)

Follow this systematic sequence whenever creating or modifying a website project.

### Step 1: Design System & Token Integration
Before coding layout pieces, set up the base styling system.
1. Add standard font files (e.g., modern variable typography families like *Inter* or *Outfit*).
2. Define base spacing, button dimensions, and card corners within your global styles (e.g. `src/styles/globals.css` or equivalent).
3. Inject structural keyframes (floating, morping blobs, kinetic spins, button shine masks) in the utilities layer.

### Step 2: Build Layout Primitives
Implement structural primitives to ensure visual consistency:
- **`Container`**: Sets standard grid widths and horizontal paddings (`max-w-7xl px-6`).
- **`Section`**: Standardizes vertical breathing space (`py-20 lg:py-32`).
- **`SectionHeading`**: Wraps eyebrow tags, display title headings, and text descriptions.
- **`Button`**: Incorporates standard interactive variants (Primary with translation/shine, Secondary outline, Ghost inline, and Dark background variants).

### Step 3: Architect Interactive Cards
Define standard card structures based on content type:
- **Grid/Product Card**: Aspect-ratio media boxes, badge overlays, header arrows that translate on hover, application tag lists, and direct CTA actions.
- **Intro/Category Card**: Subtle color overlays that fade in, and content text boxes that zoom/shift when focused.
- **Info/Blog Card**: Text-heavy columns with thin top-ruled lines and background color shifts.

### Step 4: Assemble Page Layout Sections
Draft standard, scrollable section components:
- **Hero**: Uses technical blueprint overlays, floating decorative background shapes, high-impact display typography, and dual actions.
- **Trust Strip / Partner Brands**: Infinite horizontal scrollers or neat grid columns displaying partner logo vectors.
- **Interactive Stats**: Metric numerals that count up or highlight when entering the viewport.
- **Why Choose Us**: Multicolumn features showing icons, titles, and item cards.
- **CTA Banner**: A full-width section with high-contrast actions, subtle gradients, and background line backdrops.

### Step 5: Implement Scroll Animations
Wrap sections and lists with reveal animations. Ensure lists (like card grids or feature lists) stagger their child entrances.

---

## 3. Motion & Transition Standards

To ensure smooth visual motion, enforce the following guidelines:

### Standard Expo Easing Curve
- Always use custom cubic-bezier timing functions instead of standard linear transitions.
- CSS Transition: `transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);`
- Framer Motion: `transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }`

### Entrance Revealers
- Wrap headings, paragraphs, and grids in a viewport-triggered wrapper.
- Use `whileInView` with a threshold or offset (e.g. `viewport={{ once: true, margin: "-10%" }}`) so that layouts transition before they fully enter the screen.
- For list layouts, stagger the fade-up animations of the child components:
  ```typescript
  export const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
  };
  ```

### Reduced Motion Guard
To maintain accessibility, check and respect system preference configurations:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 4. Visual Verification Checklist (Quality Gates)

Run these checks on the final interface. Every check must pass before completing work.

- [ ] **WOW Factor Check**: Does the header section feel premium? Are there grid lines, dot textures, or slow floating shapes that elevate the layout beyond a plain colored canvas?
- [ ] **Interactive Responsiveness Check**: Do all links, buttons, and cards change state on hover? Do they translate (e.g., `-translate-y-1`), scale up, or change color smoothly with expo easing?
- [ ] **Micro-Animations Check**: Do CTA buttons have a subtle shine sweep overlay when hovered? Do links have clean underline sweeps? Do header arrows translate (`translate-x-0.5 -translate-y-0.5`) on hover?
- [ ] **Vertical Breathing Space (Padding) Check**: Is there enough margin and padding between layout blocks? (Ensure at least `py-16 md:py-24` is applied to editorial sections).
- [ ] **Dynamic Token Integration Check**: Are color and radius variables defined inside `globals.css`? Ensure no hardcoded hex styles or custom border-radius properties are directly embedded inside component markups.
- [ ] **Keyboard Accessibility Check**: Can you tab through the entire layout? Do all focusable targets display a clear accent ring (`focus-visible:ring-2`) when keyboard navigation is used?
- [ ] **Reduced Motion Check**: When preferences are set to reduce motion, do animations stop instantly without causing layout glitches?
