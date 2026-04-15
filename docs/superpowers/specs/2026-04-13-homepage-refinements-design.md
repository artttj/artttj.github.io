# Homepage Refinements Design

**Date:** 2026-04-13
**Scope:** Subtle copy and badge changes to artttj.github.io/index.html
**Audience:** Recruiters / hiring managers

## Changes

### 1. Title line

- **Before:** `Engineering Team Lead & Architect`
- **After:** `Engineering Lead, Architect`
- **File:** `index.html` line 524, also `cv/index.html` line 190 for consistency
- **Rationale:** Shorter, punchier, less corporate. Comma instead of ampersand reads more naturally.

### 2. New subtitle line

- **Add:** `Building reliable systems at scale` as a second `<p>` under the title in the `.profile` section
- **Styling:** Same as existing subtitle (`font-size: 13px`, `color: var(--text-secondary)`, `font-weight: 300`)
- **Rationale:** Gives recruiters immediate context about what kind of engineering work. Domain-neutral (not AI-focused), matches CV background of commerce platforms, middleware, distributed systems.

### 3. Sonto badge

- **Before:** `Hot` with class `badge-hot` (orange)
- **After:** `New` with class `badge-new`, reusing the same orange styling
- **Rationale:** "Hot" reads as marketing/vague. "New" is factual and professional.

## What stays the same

- All visual design (glass card, ambient blobs, theme toggle, layout)
- Project list order and content
- All other badges (Live, Beta)
- CV page content (except matching title update)
- All CSS and JS

## Files modified

- `index.html` — 3 edits (title text, add subtitle, badge text/class)
