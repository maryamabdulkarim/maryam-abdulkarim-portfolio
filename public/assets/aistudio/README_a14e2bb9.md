# Ajo Book case study update pack

## What's inside
| File | Where it goes on ajobook.html |
|---|---|
| PROMPT-ajobook.md | Paste into Google AI Studio (the whole file) |
| images/ajo-cover.png | Cover at the top of the case study (replaces the coded ledger card) |
| images/cover-options/ | Other covers (white, grey, indigo tint, fade). To use one, rename it to ajo-cover.png / ajo-cover-small.png |
| images/ajo-cover-small.png | Optional: homepage Ajo Book card (separate prompt at the end of the prompt file) |
| images/ajo-screens-1.png | Key screens: Welcome · Home · Add a person |
| images/ajo-screens-2.png | Key screens: Share the list · Swap turns · Pay out |
| images/userflow-1.png | From paper to flows: Onboarding (first open) |
| images/userflow-2.png | From paper to flows: Payment round (collection day) |

## Steps
1. Upload the images to the same folder as your other case-study images (wherever the paper wireframes image lives).
2. Paste PROMPT-ajobook.md into AI Studio.
3. Check the page on your phone, then sync to GitHub → Vercel.

## What changed from your original prompt
- **User flow 1 caption fixed.** Your FigJam onboarding flow ends at Home, not at "a ready group page", so the caption now says "first open, from Welcome to Home".
- **Flow 2 vs the built app.** The FigJam flow only allows Pay out after "All paid? → Yes", but the app lets the holder pay out early with a warning. I added a one-line note under the flow so a reviewer doesn't spot the mismatch first. (Better long-term: add a "Pay out anyway?" branch in FigJam.)
- **Key screen captions now match the screenshots.** None of the screenshots show the "Marking payments" step, so the captions now describe what's actually there.
- Added alt text to every image, and told AI Studio to reuse the lightbox markup from the wireframes image.

## Mockup clean-up
- Removed the browser bar (bolt.host URL), status bar and Android nav bar, and put each screen in a phone frame on warm paper.
- On the sheet screens, cropped off the half-cut "Not paid yet / Call / SMS" card at the top.
- Cropped the empty space and the title blocks from both FigJam flows.

## Spotted in the app (optional fixes for Bolt)
- **Swap turns numbering:** the sheet shows Brother Femi as "1", but he's turn 3 in the Turns list. Show the real turn number (3, 4, 5), or the month only.
- **Home greeting says "Maryam".** For portfolio screenshots, enter "Mama Bisi" so the screens match the persona.
- Big amounts (₦120,000) use Fraunces, but the principle is that "0 and O never look alike" (Atkinson). It's worth deciding whether that's intentional.

## Cover photo
The linen, notebook and adire background was generated with Figma AI and is saved in your Figma file "Ajo Book – cover background". The phone screens are your real app screenshots.
