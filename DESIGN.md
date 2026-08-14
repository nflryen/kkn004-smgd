# DESIGN.md — Visual Identity & UI Design System

**Project:** KKN 004 Somagede (UIN Prof. K.H. Saifuddin Zuhri Purwokerto)  
**Target Platform:** Mobile-First Responsive Web Application & Interactive Digital Storybook  
**Design Paradigm:** Glassmorphism / Frosted Glass UI, Organic Emerald Palette, Motion-Rich Editorial Layout  

---

## 1. Visual Identity & Brand Essence

The visual identity for **KKN 004 Somagede** bridges the university’s signature emerald green identity, the lush agricultural landscape of Somagede Village (Banyumas), and modern digital aesthetics. It borrows directly from the group's official graphic branding: floating glass ornaments, subtle background landscapes, glowing typography, and atmospheric depth.

### Brand Values
- **Integrity & Serenity:** Reflected in deep emerald, pine, and teal tones.
- **Modernity & Transparency:** Captured through frosted glassmorphism overlays (`backdrop-blur`).
- **Community & Groundedness:** Represented by natural landscape backdrops and organic leaf/agricultural motifs from the official logo.

---

## 2. Color System & Design Tokens

### Primary & Accent Colors (Extracted from Brand Logo & Feeds)
- **Deep Forest / Dark Slate (`#0B1917` / `#0A1312`):** Primary dark background for high contrast glass overlays.
- **Somagede Emerald (`#1B4D44`):** Primary brand accent color, representing university jacket identity & rural nature.
- **Teal Glaze (`#2D7A6E` / `#3B9B8D`):** Active states, interactive highlights, and glowing badges.
- **Frosted Sage (`#72A99A`):** Secondary accents, borders, and subtext highlights.
- **Crisp Silver / Glass Border (`#D1E3DF` at 15%-30% opacity):** Border outlines for glass cards.
- **Pure White / Cream White (`#FFFFFF` / `#F4F8F7`):** Primary text and high-contrast titles.

### CSS Variables Setup (`globals.css`)
```css
:root {
  --bg-primary: #0b1917;
  --bg-surface: rgba(27, 77, 68, 0.25);
  --glass-bg: rgba(255, 255, 255, 0.07);
  --glass-bg-hover: rgba(255, 255, 255, 0.12);
  --glass-border: rgba(209, 227, 223, 0.2);
  --glass-border-glow: rgba(59, 155, 141, 0.5);
  --text-primary: #f4f8f7;
  --text-secondary: #a3c2bc;
  --accent-emerald: #1b4d44;
  --accent-teal: #3b9b8d;
  --accent-mint: #72a99a;
}
```

---

## 3. Typography Strategy

To capture the "Waktunya Berkarya" and "Pilar Sinergi" poster aesthetics, the system uses a dual typography combination: bold display serif/sans for striking headers and clean, ultra-readable sans-serif for body content.

- **Display Header Font:** `Plus Jakarta Sans` or `Outfit` (Bold / Black, 800-900 weight with tight letter spacing for poster-like impact).
- **Secondary Display / Script Accent:** `Playfair Display` (Italic) or `Syne` (for sub-quotes, e.g., *"Nahkoda Sinergi"*, *"Semanis Gula Jawa"*).
- **Body Text:** `Inter` or `Plus Jakarta Sans` (Regular / Medium, 400-500 weight for optimal reading on mobile screens).

---

## 4. Glassmorphism & UI Element System

### Glass Card Utility (`Tailwind CSS`)
Every card, navigation bar, and interactive drawer must utilize frosted glass effects overlaying blurred landscape backgrounds.

```html
<!-- Standard Glassmorphism Card -->
<div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:border-teal-400/50 transition-all duration-300">
  <!-- Content -->
</div>
```

### Floating Glass Elements
3D-like floating glass icons, stars, and rings (as seen in the Instagram feed design) should be placed as decorative background elements with floating Framer Motion animations.

```tsx
// Floating Decorative Glass Ring / Star Element
<motion.div
  animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-teal-500/10 backdrop-blur-lg border border-white/30 shadow-2xl pointer-events-none"
/>
```

---

## 5. Header Branding & Logo Alignment

The header bar and mobile drawer navigation must feature a triple-logo badge container:
1. **Logo KKN 004 Somagede** (Primary Group Identity — featuring the dome, moon/star, and cassava/paddy motifs).
2. **Logo UIN Prof. K.H. Saifuddin Zuhri Purwokerto** (University Emblem).
3. **Logo Program KKN / Kab. Banyumas** (Regional / Program Symbol).

### Header Layout Spec:
- Positioned on a sticky blurred header: `bg-[#0B1917]/70 backdrop-blur-xl border-b border-white/10`.
- Logos grouped together on the left in a subtle rounded glass pill container.

---

## 6. Mobile-First Component Guidelines

### A. Navigation & Mobile Drawer
- **Thumb-Zone Optimization:** Bottom navigation bar or easy-to-reach floating hamburger button (`bottom-6 right-6` floating glass button).
- **Mobile Menu Drawer:** Full-height slide-over sheet with high-blur background (`backdrop-blur-2xl bg-[#0B1917]/90`).

### B. Interactive Village Map
- **Mobile Bottom Sheet:** Tapping a pin on the Somagede potential map opens a smooth sliding bottom sheet (`Framer Motion`) showing UMKM/Tourism details, images, and direct WhatsApp / Google Maps action buttons.

### C. Team & Work Program Tracker Cards
- **Team Cards:** Vertical cards styled after the Instagram feed layout — featuring portrait photos with glass badges for member titles (e.g., *"Kordes"*, *"DPL"*, *"Humas"*).
- **Proker Badges:** Status tags in glass pills (`Completed`, `In Progress`, `Planned`).

---

## 7. Motion & Animation Standards (Biak Elok Style)

1. **Page Transitions:** Smooth opacity fade and 10px Y-axis slide (`motion.div` entering view).
2. **Scroll-Triggered Reveal:** Staggered reveal for grid items (`staggerChildren: 0.1`).
3. **Hover & Touch Feedback:** Micro-scaling on cards (`scale: 1.02` on desktop, subtle active press effect `scale: 0.98` on mobile).
4. **Parallax Background:** Slow background shift for rural mountain/landscape photos behind glass containers.

---

## 8. Asset File Naming Conventions
- Logos: `/public/assets/logos/logo-kkn-004.png`, `/public/assets/logos/logo-uin-saizu.png`, `/public/assets/logos/logo-banyumas.png`
- Backgrounds: `/public/assets/images/somagede-landscape-blur.webp`
- Icons: Lucide React Icons (`MapPin`, `Compass`, `Users`, `BookOpen`, `Sparkles`)
