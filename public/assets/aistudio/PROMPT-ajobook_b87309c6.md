Update ajobook.html only. Keep the same layout, fonts, colours, spacing, animations and lightbox as the rest of the site. Don't change any other page.

New image files (already uploaded to the same folder as the other case-study images):
ajo-cover.png, ajo-screens-1.png, ajo-screens-2.png, userflow-1.png, userflow-2.png
For every new image, reuse the exact markup and class the paper wireframes image uses, so it opens in the same lightbox and gets the same "View full screen" link. Give every image the alt text written below.

PART 1 – REPLACE ALL PLACEHOLDER BOXES
Remove every "cs-placeholder-box" on this page and replace each one as follows:

1. "[Image: Cover illustration]" → replace with the image ajo-cover.png, full width of the content column, 16px rounded corners, opening in the lightbox. Put a small grey caption under it: "Welcome, Home and adding a person. Sample data from the app's example groups."
   Alt: "Three Ajo Book phone screens lying on a linen table between a handwritten ajo notebook and indigo adire fabric: the Welcome screen, Home with the Balogun Ajo group (₦120,000 of ₦200,000, 3 paid, 2 not paid yet), and the Add person form."

2. "[Illustration: Notebook and WhatsApp list]" → replace with a coded WhatsApp-style message bubble (light green #DCF8C6, 12px corners, max 360px wide) showing this exact list, with a small grey caption "The list holders post by hand after payments (example names)":
   Balogun Ajo – November (₦40,000)
   1. Mama Chinedu ✅
   2. Sisi Blessing ✅
   3. Brother Femi ✅
   4. Iya Bose
   5. Baba Segun

3. "[Image: Competitor comparison]" → replace with a clean HTML table (same style as the "What I changed" table):
   Columns: Option | Who uses it | Holds the money? | Members must sign up?
   Rows:
   - Notebook + WhatsApp | Holder | No | No
   - Savings and contribution apps | Members | Often yes | Yes
   - Collector tools | Professional collectors | No | No (monthly fee)
   - Ajo Book | Holder only | No | No
   Make the Ajo Book row bold with a soft #E7EAF3 background.

4. "[Illustration: Mama Bisi · Empathy map]" → replace with a coded persona card in four small boxes in a 2×2 grid (1 column on phones), each with a small uppercase label:
   - SAYS: "I just need to know who has paid."
   - THINKS: "If the record is wrong, they will blame me."
   - DOES: Writes ticks in a notebook, posts the list on WhatsApp, calls late payers.
   - FEELS: Respected, but tired of being called and worried about disputes.

5. "[Image: 3 before-and-after pairs]" → remove the box completely. The table above it already explains the changes.

6. "[Image: Key screens]" → replace with two images, one under the other, full width of the text column, 16px rounded corners, opening in the lightbox:
   - ajo-screens-1.png
     Caption: "Welcome, Home and adding a person, using the app's example groups."
     Alt: "Three phone screens: the Ajo Book welcome screen, Home with two example groups, and the Add person form on the Balogun Ajo group page."
   - ajo-screens-2.png
     Caption: "Sharing the ✅ list, swapping turns with a preview of who moves, and paying out with a clear warning."
     Alt: "Three phone screens: the Share list sheet with ticks and crosses, the Swap turns sheet showing who moves to which month, and the Pay out sheet warning that 2 people have not paid yet."
   Under them, add a text link "Watch the app in action ↓" that smooth-scrolls to the demo video section.

7. "[Image: Design system]" → replace with the coded design system block in PART 3.

PART 2 – USER FLOWS
In the "From paper to flows" section, keep the paper wireframes image. In the sentence about the FigJam flows, change "group setup" to "first open" so it reads as first open and a payment round. Replace the "[Image: Paper sketches · FigJam flows]" placeholder with two images, one under the other, full width of the text column, 16px rounded corners, opening in the lightbox.
Add one line of text above them: "I mapped the two journeys a holder repeats most: getting started once, and collection day every round."
- userflow-1.png
  Caption: "User flow 1: First open, from Welcome to Home, by trying the example groups or entering a name. Sign-in is optional."
  Alt: "Onboarding flowchart: Open app, first time?, Welcome, try examples or enter name, optional sign in, Home."
- userflow-2.png
  Caption: "User flow 2: Collection day, from marking payments to sharing the list, reminding people and paying out."
  Alt: "Payment round flowchart: from the group page, mark paid and share the list, or remind by WhatsApp, SMS or call, then pay out and start a new round."
Under userflow-2, add one small grey line: "In testing, holders sometimes paid out before everyone had paid, so the built app allows it and shows who hasn't paid first."

PART 3 – DESIGN SYSTEM BLOCK (coded, no image)
Load "Atkinson Hyperlegible" from Google Fonts on this page only. Build the block under the Market Ledger paragraph:
- Colour swatches in a grid (3 per row, 2 on phones). Each swatch: a 64px colour square with 12px corners, then the name, hex code and role:
  Warm paper #FAF6EE – Background · Ink #1C1A17 – Main text · Adire indigo #23356B – Actions and trust · Paid green #1F7A4D – Paid · Owes red #B5442B – Not paid yet · Marigold #E8A33D – Whose turn
  Give the paper swatch a 1px #E6DED0 border so it shows on the background.
- Type samples:
  - "Fraunces" label, then "Balogun Ajo" in Fraunces 32px
  - "Atkinson Hyperlegible" label, then "₦40,000 · 0 and O never look alike" in Atkinson Hyperlegible 18px
- Components row:
  - A solid button "Pay out" (#23356B background, white text, 56px tall, 12px corners)
  - An outline button "Mark paid" (#23356B border and text, 56px tall, 12px corners)
  - Status pills with words: "Paid" (#E3F1E8 background, #1F7A4D text), "Not paid yet" (#F7E6E1 background, #B5442B text), "Turn" (#FBEFD9 background, #1C1A17 text)
- A short rules line under it in small grey text: "18px minimum text · 56px buttons · words beside every icon · colour never used alone"
These are showcase elements only; the buttons don't need to do anything.

PART 4 – TESTING SECTION
Remove these three placeholder lines completely:
- "Speed: marking 10 people as paid took [X] in the notebook and [Y] in Ajo Book"
- "Readability: [result of asking holders to read ₦40,000 aloud]"
- "[Holder's quote, with her permission] — Ajo group holder"
Keep the paragraph about the real holder and the 7 prioritised fixes.

PART 5 – MATCH WHAT IS BUILT TODAY
- In "Key features", change the members-only link line to: "Designed for Version 2: a members-only link, so members can check their own status and the holder stops getting calls. This came straight from what members asked for." Give it a small "Version 2" tag.
- In the "What I changed" table, remove the row "Pay-out button always ready → Faded until everyone has paid".
- In "Where it is now → Next", remove "Working offline, for markets with weak signal", and add to "Key features": "Works offline once opened, for markets with weak signal".
- In "At a glance", change the stat label "In-person interviews" to "People interviewed in person".

PART 6 – SMALL FIXES
- Near the top, under the summary, add a small text link "Watch the demo ↓" that smooth-scrolls to the video section. Give the video section an id (e.g. id="demo") if it doesn't have one.
- Stats: if the visitor prefers reduced motion, or JavaScript doesn't run, show the final numbers (12, 7, 1) straight away instead of 0.
- After all changes, check that no text in square brackets like "[Image: ...]" or "[X]" is left anywhere on the page, and that no "cs-placeholder-box" remains.

---
OPTIONAL, SEPARATE PROMPT FOR THE HOMEPAGE (run only if you want the Ajo Book card on index.html to use the new cover):
On index.html, in Selected Work, replace the Ajo Book card image with ajo-cover-small.png. Keep the same card size, crop, corner radius and hover effect as the other cards. Alt: "Ajo Book phone screens: Welcome, Home and Add person." Don't change anything else.
