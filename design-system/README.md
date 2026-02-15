# KodNest Premium Build System

A calm, intentional design system for serious B2C SaaS products.

## Design Philosophy

- Calm, Intentional, Coherent, Confident
- No gradients, glassmorphism, neon colors, or animation noise
- Everything feels like one mind designed it

## Color System

```css
Background: #F7F6F3 (off-white)
Primary Text: #111111
Accent: #8B0000 (deep red)
Success: #4A6741 (muted green)
Warning: #B8860B (muted amber)
Border: #D4D2CC
Surface: #FFFFFF
```

## Typography

- **Headings**: Crimson Pro (serif) - 48px, 32px, 24px
- **Body**: Inter (sans-serif) - 16-18px, line-height 1.7
- **Max width for text blocks**: 720px

## Spacing Scale

Use only these values:
- 8px (xs)
- 16px (sm)
- 24px (md)
- 40px (lg)
- 64px (xl)

## Layout Structure

Every page follows:
1. **Top Bar** - Project name, progress, status
2. **Context Header** - Large headline, subtext
3. **Main Content** - 70% workspace + 30% panel
4. **Proof Footer** - Persistent checklist

## Components

### Buttons
- `.btn-primary` - Solid deep red
- `.btn-secondary` - Outlined

### Inputs
- `.input` - Clean borders, clear focus state

### Cards
- `.card` - Subtle border, balanced padding

### Badges
- `.badge` - Status indicators

### Checkboxes
- `.checkbox` - Proof checklist items

## Interaction Rules

- Transitions: 175ms ease-in-out
- No bounce, no parallax
- Border radius: 4px

## Usage

```html
<link rel="stylesheet" href="design-system/index.css">
```

Open `demo.html` to see the complete system in action.
