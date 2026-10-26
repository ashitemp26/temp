# Shashitha & Ashani — Fairytale Wedding Invitation

A mobile-first Next.js frontend prototype for a traditional Kandyan wedding invitation with an ivory/champagne-gold visual system.

## Included in this prototype
- Animated invitation cover with tappable envelope
- Couple introduction and editable story placeholders
- Countdown to 4 December 2026 (Asia/Colombo event time)
- Poruwa and reception schedule placeholders
- Google Maps search link for Saffron, Wadduwa
- Google Calendar add-event link
- RSVP form interaction (front-end demonstration only)
- Post-wedding gallery placeholders
- Responsive mobile navigation and reduced-motion support
- `noindex` metadata while the invitation is private/in development

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To make a production build:

```bash
npm run build
npm start
```

## Before sending invitations

This is intentionally a frontend prototype. Do not send it to guests as a functioning private RSVP system yet.

1. Replace the gradient photo placeholders with approved pre-wedding photos. Keep optimized responsive versions in `public/images/` or use a storage/CDN provider.
2. Confirm exact venue address/pin, ceremony time, reception timing, RSVP deadline, invitation wording, and the guest count policy.
3. Add Firebase Authentication for the admin dashboard.
4. Create Firestore collections for invitations, RSVPs, site settings, and gallery metadata.
5. Generate cryptographically random invitation tokens on the server; store token hashes, never raw tokens. Validate every RSVP server-side and enforce invitation-specific guest limits.
6. Add rate limiting, input validation, safe error handling, and restrictive Firestore rules. Never put Firebase admin credentials in client code.
7. Build the admin pages for guest creation, invitation status, RSVP exports, and post-wedding gallery publishing.
8. Add a real gallery upload flow with file type/size validation and access controls.
9. Confirm Google Maps pin and update the `MAPS_URL` constant in `app/page.tsx` to the exact venue listing.
10. Test the experience on real iOS and Android devices, check keyboard/accessibility and reduced motion, then deploy to Vercel with a custom domain.

## Important implementation notes
- RSVP submit currently only displays a confirmation message in the browser; it does not save any data.
- Personalized invitation routes and a private admin dashboard are planned but not implemented yet.
- `noindex` does not provide access control. The private token flow must be implemented server-side before launch.
- The countdown uses 5:00 PM Sri Lanka time as a temporary anchor solely to calculate the date countdown; update it once the actual ceremony time is confirmed.
- Google Calendar time range is a placeholder and should be updated to the actual event schedule.
- Google Maps currently opens a search for “Saffron Wadduwa Sri Lanka”; confirm the exact venue listing before distribution.
