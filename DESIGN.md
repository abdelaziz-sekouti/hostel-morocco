# Design System Strategy: The Elevated Nomad

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **"The Digital Concierge."** We are moving away from the cluttered, "budget" aesthetic typically associated with hostels and instead leaning into a high-end editorial experience that feels curated, intentional, and premium. 

To break the "template" look, this system rejects rigid, boxed-in grids. Instead, we use **Intentional Asymmetry** and **Tonal Layering**. On the guest-facing side, elements should overlap—a high-resolution room image might slightly bleed over a `surface-container` card—to create a sense of depth and movement. On the admin side, the same principles apply but are channeled into a "Dashboard as a Service" philosophy: high-density information presented through sophisticated, borderless containers.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
Our palette transitions from the refreshing depth of `primary` (#006565) to the warmth of `secondary` (#735c00). 

- **The "No-Line" Rule:** To ensure a premium feel, **1px solid borders are prohibited for sectioning.** Do not use lines to separate content. Instead, define boundaries through background color shifts. For example, a `surface-container-low` (#f3f4f5) sidebar sitting against a `surface` (#f8f9fa) main content area.
- **Surface Hierarchy & Nesting:** Treat the UI as stacked sheets of fine paper. 
    - Use `surface-container-lowest` (#ffffff) for the most prominent interactive elements (cards, inputs).
    - Use `surface-container-high` (#e7e8e9) for recessed areas like footers or secondary navigation.
- **The "Glass & Gradient" Rule:** For the guest-facing side, use "Glassmorphism" for floating navigation bars or booking modals. Apply a `backdrop-blur` of 12px-20px over a semi-transparent `surface` color. 
- **Signature Textures:** Main CTAs should not be flat. Use a subtle linear gradient from `primary` (#006565) to `primary_container` (#008080) at a 135-degree angle to give buttons a "tactile glow."

---

## 3. Typography: Editorial Authority
We utilize two distinct typefaces to balance hospitality and efficiency. 

- **Display & Headlines (Plus Jakarta Sans):** This is our "Editorial Voice." With its wide apertures and modern geometric feel, use `display-lg` (3.5rem) for hero headers to create an immediate impact of "High-End Hospitality."
- **Title & Body (Manrope):** Our "Functional Voice." Manrope provides exceptional legibility at smaller scales. Use `title-md` (1.125rem) for card headings and `body-md` (0.875rem) for descriptions.
- **Hierarchy Tip:** In the Admin side, use `label-sm` (#3e4949) in all-caps with a 0.05rem letter-spacing for table headers to provide a professional, data-dense look without overwhelming the user.

---

## 4. Elevation & Depth: Tonal Layering
Traditional box-shadows are often a sign of "lazy" design. This system prioritizes **Tonal Layering.**

- **The Layering Principle:** To lift a card, place a `surface-container-lowest` (#ffffff) object on top of a `surface-container-low` (#f3f4f5) background. The subtle 1-2% contrast shift is enough for the human eye to perceive depth without visual noise.
- **Ambient Shadows:** If a floating element (like a mobile "Book Now" bar) requires a shadow, use a 32px blur with 6% opacity, tinted with `on_surface` (#191c1d). This mimics natural light rather than a digital drop-shadow.
- **The "Ghost Border" Fallback:** If accessibility requires a border (e.g., in high-contrast situations), use the `outline_variant` (#bdc9c8) at 20% opacity. It should be felt, not seen.

---

## 5. Components: Fluidity over Rigidity

### Buttons
- **Primary:** Rounded `lg` (1rem), using the signature `primary` to `primary_container` gradient. 
- **Secondary:** Use `secondary_container` (#fdd34d) with `on_secondary_container` (#725b00) text. This provides the "Sunny Yellow" warmth requested for the guest side.
- **Tertiary:** No background, `primary` text, with a `surface-container` hover state.

### Input Fields
- Avoid the "boxed" look. Use a `surface-container-lowest` background with a bottom-only `outline` of 2px that animates to `primary` on focus. This mimics high-end stationery.

### Cards & Lists
- **Prohibited:** Dividers and lines. 
- **Structure:** Use the `24` (6rem) spacing token between major card groups and `4` (1rem) spacing between list items. Use a `surface-variant` (#e1e3e4) background on hover for list items to indicate interactivity.

### Guest-Facing Feature: The "Experience Carousel"
- Use `xl` (1.5rem) rounded corners for images. Overlap the `title-lg` text box onto the corner of the image using a Glassmorphic background for a signature "boutique" look.

### Admin-Facing Feature: The "Status Badge"
- Use `full` (9999px) rounding. Instead of heavy solid colors, use a 10% opacity fill of the status color (e.g., `error` at 10%) with 100% opacity text. This keeps the data table "clean" and readable.

---

## 6. Do's and Don'ts

### Do:
- **Use White Space as a Tool:** Use the `20` (5rem) and `24` (6rem) spacing tokens to let the layout breathe. High-end design is defined by what you leave out.
- **Embrace the Corner Scale:** Use `xl` (1.5rem) for large hero sections and `sm` (0.25rem) for functional admin elements like checkboxes.
- **Prioritize Hierarchy:** Use `on_surface_variant` (#3e4949) for secondary text to ensure the primary headlines pop.

### Don't:
- **Never Use Pure Black:** Always use `on_surface` (#191c1d) for text to maintain a soft, premium feel.
- **No 1px Dividers:** If you feel the need for a divider, increase the vertical padding instead.
- **Avoid Symmetry in Heroes:** On the guest side, try offsetting text to the left and images to the right-bottom to create a modern, editorial rhythm.