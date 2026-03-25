# TS Web developer notes 1

# TINY STEPS LEARNING CENTER

## WEBSITE STRUCTURE, BEHAVIOR, CTAs, AND DEVELOPER NOTES

---

## **Website of reference: https://applemontessorischools.com/**

1. MAIN NAVIGATION STRUCTURE

### Top Navigation (Desktop)

Order must be exactly: 

- Home
- About Us
- Programs
- Locations
- Careers
- Blog
- Contact

### Behavior

- Desktop: Hover → dropdown appears
- Click:
    - If parent has a main page → navigate to that page
    - Dropdown items act as shortcuts

### Mobile Behavior

- Tap = expand dropdown
- Second tap (or arrow) = navigate
- Prevent accidental navigation

---

## 2. ABOUT SECTION

### Structure

Single page with anchor sections:

- About Us
- Mission
- Vision
- History
- Philosophy
- Core Values
- Quick Stats
- Partners & Associations

### Behavior

- Dropdown links scroll to sections
- Smooth scroll required

### CTAs

- Learn More About Our Programs → /programs
- Discover What Makes Us Different → /about#why-tiny-steps
- Explore Our Locations → /locations
- See Our Approach in Practice → /programs

---

## 3. PROGRAMS PAGE

### Structure

Single page (no separate pages)

Sections:

- Infants
- Toddlers
- Preschool
- Afterschool
- Drop-In Care
- Summer Camp

### Behavior

- Dropdown scroll to section
- Smooth scroll

### CTA

Each program:

- Button: Enroll Now
- Links to form (Paperform later)

---

## 4. LOCATIONS PAGE

### Order (ALWAYS)

1. McBride Ave Center
2. Union Ave Center
3. Paterson Ave Center (Temporarily Closed)

### Layout

- 3 location blocks
- Include “View All Locations”

### Each Location Block

1. Image
- Google Street View or real photo
- AI enhanced / clean style
1. Info
- Name
- Address
- Phone
- Hours
1. Special Case

Paterson must show:

Paterson Ave Center (Temporarily Closed)

Reopening Spring 2026

New Hours: 6:30 AM – 6:30 PM

1. Description
- Custom paragraph

---

### Map Requirement (IMPORTANT)

Use ONE map showing ALL locations with 3 pins.

Options:
- Google Maps embed
- Google My Maps

Behavior:
- Pins clickable
- Opens directions

---

### Click Behavior

DO NOT redirect to Google Maps.

Instead show:
- Full content
- Map
- Description
- CTA
- Shared section

---

### Shared Section

What All Our Locations Offer

Always visible.

CTA:
- Schedule a Tour
- Chat With Us

---

## 5. CONTACT PAGE

### Structure

### Section 1 — Intro

Text block

---

### Section 2 — Quick Actions (2x2 Grid)

1. Schedule a Tour or Enroll
2. Chat With Us
3. Careers
4. General Inquiries

---

### Quick Actions Design

- Card layout
- Icon + title + text
- Entire card clickable

Example:

[ Schedule a Tour or Enroll ]

Visit and start enrollment

[ Chat With Us ]

WhatsApp support

[ Careers ]

Join our team

[ General Inquiries ]

Contact form

---

### Section 3 — Locations Overview

Order:

- McBride
- Union
- Paterson

---

### Section 4 — Map

- One map with all locations
- Pins clickable

---

### Section 5 — Social Icons

Display only:

- Facebook
- WhatsApp
- Instagram
- TikTok
- LinkedIn

---

### Section 6 — Final CTA

- Schedule a Tour or Enroll
- Chat With Us

---

## 6. BLOG SECTION

### Sections

- Calendar
- News & Announcements
- Social Media Feed
- Community
- From Our Classrooms
- Educator’s Corner

---

### Calendar

- Use The Events Calendar plugin
- Monthly view
- Filters

---

### News

- Card or list
- Editable
- Taggable
- Newest first

---

### Social Media

- Grid layout
- Instagram + Facebook
- Auto-sync

---

### From Our Classrooms

Filter by hashtags:

- #classroom
- #activity
- #learning

---

### Educator’s Corner

- Blog posts
- Restricted access
- Review before publish

---

## 7. CAREERS PAGE

### CTA

Apply Here

Behavior:

Show message:

Application Portal Coming Soon

Email: hiring@tinysteps.io

---

## 8. STORE SECTION

### Trigger

- Store nav
- Cart icon
- Shop CTA

### Behavior

Display:

Tiny Steps Store – Coming Soon

---

## 9. REFERRAL PAGE

CTA:

Refer Now

Behavior:

- Paperform or embed

---

## 10. FAQS

- Accordion layout

Add:

“What is 4CS” inside question #7

---

## 11. RESOURCES

- Section blocks
- External links open new tab

---

## 12. GLOBAL CTAs

Use:

- Schedule a Tour
- Enroll
- Chat With Us

Avoid overload

---

## 13. WHATSAPP

- Mobile → App
- Desktop → Web

Use wa.me links

---

## 14. DESIGN

Keep:

- Layout
- Cards
- Typography

Remove:

- Cartoon backgrounds

Replace:

- Clean branding
- Minimal style

---

## 15. PERFORMANCE

- Mobile-first
- Smooth scroll
- Lazy load images
- Fast load

---

## 16. FINAL NOTES

- Centralized content
- No duplicate pages
- Avoid redirects
- Prioritize clarity