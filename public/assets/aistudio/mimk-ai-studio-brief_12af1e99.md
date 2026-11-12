# Add Mimk to my portfolio: brief for Google AI Studio

Paste this whole document into AI Studio, and upload the 27 images from `mimk-images.zip` at the same time.

---

## 1. What to do

Add a fourth featured project, **Mimk**, to my portfolio:

1. Create a new case study page, `mimk.html`. Copy the layout, components and classes from `kioni.html` exactly: nav, reading progress bar, `cs-header`, "At a glance" table, count-up stats, Summary box, hero image, `cs-section` blocks, `ba-pair` before and after, `flow-screens-grid`, trade-offs table, `phone-swipe-row`, `pull-quote`, next-project bar, footer and lightbox. Do not invent new components.
2. Save the uploaded images to `public/images/mimk/`, using the file names listed in section 4.
3. Add a project card to the Selected Work section of `index.html` (section 3), and reorder the cards so the grid reads:
   1. **Project 1 · Mimk** (new card, first)
   2. **Project 2 · EcoSmart AI** (was Project 1)
   3. **Project 3 · Kioni**
   4. **Project 4 · Ajo Book** (was Project 2, now last)

   Move each whole `<article class="project-card">` block, change only the "Project N ·" number in each title, and update the HTML comments to match (for example `<!-- Project 1: Mimk -->`).
4. Change the Selected Work heading from "Three products. One question: would you trust it?" to **"Four products. One question: would you trust it?"**
5. Add `mimk: path.resolve(__dirname, 'mimk.html'),` to `build.rollupOptions.input` in `vite.config.ts`. Without it, the page won't be built.
6. Make "Next project" follow the new order, so people can read all four in a loop. Change both the button and the next-project bar on each page:
   - `mimk.html` → `ecosmart.html` (**EcoSmart AI**)
   - `ecosmart.html` → `kioni.html` (**Kioni**), was Ajo Book
   - `kioni.html` → `ajobook.html` (**Ajo Book**)
   - `ajobook.html` → `mimk.html` (**Mimk**), was Kioni
7. Apart from the card order and "Next project" links above, don't change any other page or any existing content.

## 2. Theme

Add this to `css/style.css`, next to the other page themes, and use `<body class="theme-mimk">` on `mimk.html`:

```css
body.theme-mimk {
  --accent-color: #3349C4;
  --accent-hover: #2A3BA0;
  --cream-box: #F1F3FE;
  --font-heading: 'Nunito', -apple-system, sans-serif;
}
```

Load these Google Fonts on `mimk.html`: Nunito (600, 700, 800), Inter (400, 500, 600) and Fraunces (italic, for the quote). The "After" labels on before-and-after pairs use `var(--accent-color)`, not Kioni green.

## 3. Project card (index.html)

- **Image:** `/images/mimk/40-mockup-hero.png` (laptop and phone mockup, made for this 16:9 card)
- **Alt text:** Mimk booking platform landing page with search over a photo of Lagos
- **Tags:** Product Designer · Two-sided marketplace · Design system
- **Position:** first card in the grid
- **Title:** Project 1 · Mimk
- **Description:** A Nigerian booking platform redesigned around trust: verified stays, one honest price, and money held until the guest checks in.
- **Proof line:** 122 prototype screens · Guest, host and admin · Desktop and phone
- **Link:** `mimk.html` ("View case study →" on hover, like the others)

## 4. Images (upload all 27)

| File | Use |
|---|---|
| 01-landing-desktop.png | "After" landing |
| 02-home-phone.png | Mobile swipe row |
| 03-property-desktop.png | Decision 01 |
| 04-explore-desktop.png | "After" explore |
| 05-bookings-desktop.png | "After" my bookings |
| 06-checkout-desktop.png | Decision 02 |
| 07-checkin-desktop.png | Decision 03 |
| 08-refund-desktop.png | Decision 04 |
| 09-past-stays-desktop.png | Hierarchy section (desktop) |
| 10-host-today-desktop.png | Host image |
| 11-admin-dispute-desktop.png | Admin image |
| 12-property-phone.png | Mobile row |
| 13-checkin-phone.png | Mobile row |
| 14-past-phone.png | Hierarchy section (phone), mobile row |
| 20-flow-book.png | Flow 1, full width, no cropping |
| 21-flow-refund.png | Flow 2, full width, no cropping |
| 30-ds-foundations.png | Design system, left |
| 31-ds-components.png | Design system, right, no cropping |
| 15-preferences-desktop.png | Account section, first image |
| 18-help-desktop.png | Account section, last image |
| 40-mockup-hero.png | Card image and page hero (mockup) |
| 41-mockup-phones.png | Mobile section, lead image (mockup) |
| 42-mockup-account.png | Account section, lead image (mockup) |
| 22-flow-leave.png | Account section, flow, full width, no cropping |
| old-landing.png | "Before" landing |
| old-explore.png | "Before" explore |
| old-bookings.png | "Before" my bookings |

Flow diagrams and the components image are wide, so show them at full width with `height: auto`, not inside a fixed-height `desktop-frame`.

**Mockups vs flat screens:** the three `4x-mockup` images are for first impressions only (card, hero, and the lead image of two sections). Every other image stays a flat screenshot so the details can be read. Don’t add device frames to them.

## 5. Page content (mimk.html), in this order

Use this text exactly. Keep curly quotes and the ₦ sign.

### Page title and meta
- `<title>`: Mimk Case Study — Maryam Abdulkarim
- Meta description: Redesigning a Nigerian booking platform around trust: verified stays, one honest price and money held until check-in, for guests, hosts and admins on desktop and mobile.

### Header
- **Title:** Mimk
- **Subtitle:** Redesigning a Nigerian booking platform around trust, so guests can book a stay they believe in, at a price they know up front

**At a glance** (table, Focus / Details):
| Focus | Details |
|---|---|
| My role | Product and UI/UX Designer (solo) |
| Worked with | Mimk’s project owner |
| What I did | Product brief and user stories, business rules, research plan, design system, guest, host and admin screens, user flows, clickable prototype |
| Tools | Figma (design system, UI and prototype) · Claude (desk research, synthetic survey data, writing support) |
| Timeline | November 2026 |
| Status | Concept project · handed over to the project owner |

**Stats (count up):** 122 Connected prototype screens · 3 Roles: guest, host, admin · 9 End-to-end user flows · 37 User stories with acceptance criteria

### Summary (cream box)
Booking a short stay in Nigeria often means trusting a stranger with a bank transfer, then discovering a caution fee, a diesel charge or a flat that doesn’t match its photos. Mimk lists verified hotels, apartments and shortlets. I redesigned it around three promises: every listing is inspected in person, every price includes all fees, and the host is only paid after the guest checks in. I designed the guest, host and admin sides, and although the brief asked for desktop, I designed every flow on mobile too.

**Hero image:** `40-mockup-hero.png`, one full-width image in the hero slot, with rounded corners and no extra frame or shadow (the laptop and phone are already in the image). Don’t overlay a separate phone.
- Caption: Verified stays, one honest price, and money held until check-in.
- Small note: All names, prices and bookings shown are sample data.

### Section: Problem
- **Tag:** Problem
- **Heading:** A trust problem before it’s a search problem
- **Text:** I started with desk research, about 20 sources on fraud, fees, payments and power. Four facts shaped everything that followed.
- **Four fact cards** (big number, text, source):
  1. **₦1.3m:** lost by a diaspora family to a shortlet agent who vanished after payment. *News Express, Oct 2025*
  2. **2%:** of Lagos rental listings say the caution fee is refundable. *The Nigeria Lawyer*
  3. **6.6 hours:** of grid power a day for connected households, so power is a real booking decision. *NBS 2024, via Nairametrics*
  4. **51%+:** of online payments are web bank transfers, which is also the main scam route. *CBN data, via TechCabal*
- **Cream highlight box:** Airbnb listings in Nigeria grew 47% in 2025 while revenue per listing fell. Guests have too many unverified choices, and 75% of Nigerian web traffic is on phones.
- **Accent line:** Problem statement: travellers in Nigeria need a way to book stays they can trust, at a price they know up front.

### Section: Research
- **Tag:** Research
- **Heading:** Testing six assumptions
- **Text:** I turned the desk research into six guest hypotheses, then wrote a 22-question guest survey and a 10-question host survey, each question tied to a hypothesis or a business rule. The project owner asked for synthetic data for this concept, so I generated **8 simulated guests and 2 simulated hosts** from the personas and desk research. They show what the personas suggest, not what the market measures.
- **Table** (Hypothesis / Result (synthetic, 8 guests) / Verdict):
  | Hypothesis | Result | Verdict |
  |---|---|---|
  | Listings are often misleading | 4 of 8 had a mismatch or a scam attempt | Supported |
  | Hidden fees appear late | 4 of 8 had unexpected costs | Supported |
  | Power drives the choice | 5 of 8 put 24-hour power in their top 3 | Supported |
  | Paying a stranger feels risky | Only 3 of 8 would pay more for protection | Partly: build protection into the price |
  | Verification builds trust | Inspection tied with real reviews, 4 each | Partly: show both together |
  | Finding the place is hard | 2 of 8 rated arrival 1–2 out of 5 | Not supported: lower priority |
- **Quote** (left accent border, Fraunces italic): “The photos showed a big living room; it was half the size, and they added ₦15,000 a day for diesel when we arrived.”
  - Under it, small: Synthetic respondent G-03 · family planner, Abuja
- **Subheading:** The finding that changed who Mimk is for
- **Text:** The counter-voices mattered most. A happy Airbnb user and a traveller whose company books their hotels didn’t need Mimk at all. Mimk’s strongest audience is people booking through Instagram or WhatsApp agents, and diaspora travellers booking from abroad. With real users, this is the first finding I’d check.

### Section: Before and after
- **Tag:** Before & After
- **Heading:** Good photos and a strong idea, hidden behind the wrong details
- **Text:** The first version already had clean visuals and the right promise, “verified stays”. But prices changed at checkout, nothing explained what “Verified” meant, and the main search button failed contrast at 2.3:1.
- **Three `ba-pair` blocks:**
  1. `old-landing.png` → `01-landing-desktop.png`. Caption: Search, dates and guests in one bar, with a strip that says what “Verified” promises.
  2. `old-explore.png` → `04-explore-desktop.png`. Caption: Filters became chips, results sit next to a map, and every card shows the total with fees.
  3. `old-bookings.png` → `05-bookings-desktop.png`. Caption: Status you can act on, “Paid · held until check-in”, in place of vanity stats like average rating.

### Section: Key decisions
- **Tag:** Key Decisions
- **Heading:** Key decisions
- **Subheading:** Six principles decided every screen
- **Numbered list:**
  1. **Show the full price.** Fees are included from the first search, never added at checkout.
  2. **Explain the trust.** Say what “Verified” checked, when, and when the host gets paid.
  3. **Hold the money.** Mimk pays the host 24 hours after check-in, not before.
  4. **WhatsApp first.** Codes, receipts and door codes arrive where guests already are.
  5. **Design every state.** Pending, failed, empty, cancelled and disputed, not just the happy path.
  6. **One consistent story.** The same people, prices and dates across guest, host and admin.
- **Four decision cards in a 2 × 2 grid** (label, image, caption):
  - **DECISION 01 · PROOF, NOT A BADGE** (`03-property-desktop.png`). **Verified, explained:** a dated inspection report with power measured at 22 hours a day.
  - **DECISION 02 · PAY THE NIGERIAN WAY** (`06-checkout-desktop.png`). **Transfer first:** how most people pay, made safe because Mimk holds the money.
  - **DECISION 03 · ARRIVAL ON ONE SCREEN** (`07-checkin-desktop.png`). **Check-in day:** code, directions and Wi-Fi together, with Call as the one main action.
  - **DECISION 04 · THE REFUND, BEFORE YOU CANCEL** (`08-refund-desktop.png`). **Refunds you can track:** a reference, a date and a WhatsApp alert.
- **Trade-offs I made** (table, I chose / Over / Because):
  | I chose | Over | Because |
  |---|---|---|
  | Bank transfer as the default | Card first | Transfer is how most Nigerians pay online. The risk was paying a stranger, so Mimk sits in the middle |
  | Phone number and a WhatsApp code | Email and password | Five fields became three short steps, on the app guests already use |
  | Protection built into the 5% fee | Selling it as an extra | Most respondents wouldn’t pay more for protection, but all of them wanted it |
  | Refunds only for broken listed promises | Refunding any complaint | Hosts need rules they can trust too, and guests still get a clear answer |

### Section: One clear action per screen
- **Tag:** Design Execution
- **Heading:** One clear action per screen
- **Text:** In review, some screens had four buttons competing for attention. I wrote button rules into the product brief, then rebuilt every page around them:
  - **Solid blue** for the one thing the person came to do. At most one per screen.
  - **Outlined** for a real alternative beside it, like Message next to Call.
  - **Text links** for actions repeated on every row, like “Book again”.
  - **Red outline** for anything that cancels, never solid.

  On Past stays, the one review with a deadline moved out of the list into its own card, with the page’s only solid button.
- **Desktop and phone side by side** (like Kioni’s report section):
  - `09-past-stays-desktop.png`. Caption: Past stays: one urgent task on top, a calm list underneath
  - `14-past-phone.png`. Caption: On phone

### Section: Host and admin
- **Tag:** Two-sided Marketplace
- **Heading:** Hosts and admins keep the promise real
- **Text:** A booking platform is only as trustworthy as the people behind it. Hosts see the one request that needs them today, their earnings, and exactly when they’ll be paid. They pay 10% commission, less than Airbnb’s 15.5% host fee. Admins approve inspected listings and settle disputes.
- **Subheading:** Refunds follow listed promises
- **Text:** The first dispute I designed was about hot water, which the listing never promised. I changed it. A refund should only follow a broken promise the listing made: power, water, security or accuracy. So the case became “backup power failed”, and the policy suggests refunding one night if the problem is fixed within 24 hours. The admin sees the split before confirming: ₦18,667 back to the guest, and the host still receives ₦33,600.
- **Two images side by side:** HOST · TODAY (`10-host-today-desktop.png`) and ADMIN · DISPUTE (`11-admin-dispute-desktop.png`)

### Section: Account settings
- **Tag:** Edge Cases
- **Heading:** Leaving can’t cost a guest a stay
- **Text:** Settings used to appear in two places, the sidebar and Profile. I removed the duplicate, so Profile is the one home for personal info, payments, preferences and help. Preferences let guests choose a language and see prices in another currency, shown as an estimate, because they always pay in naira.
- **Subheading:** Blocked, not just warned
- **Text:** My first version let a guest delete their account with a warning that their upcoming stay would be cancelled. That put a paid booking, the host’s income and the refund at risk in one tap. Now, if a stay is coming up, deletion waits: the dialog shows the booking and the date they can delete, with “View upcoming booking” as the main action and no red button. Guests with nothing booked get a normal red confirmation.
- **Full-width image:** `42-mockup-account.png`. Caption: With a stay coming up, deletion waits until check-out, on desktop and phone
- **Two images side by side:** PREFERENCES (`15-preferences-desktop.png`) and HELP & SUPPORT (`18-help-desktop.png`). Caption under Help: WhatsApp is the main way to reach a person, 7am to 11pm.
- **Full-width image:** `22-flow-leave.png`. Caption: Guest: leave Mimk safely

### Section: User flows
- **Tag:** User Flows
- **Heading:** Nine flows across three roles
- **Text:** Each flow separates the screens people see from what Mimk does automatically, like holding money or sending a WhatsApp alert. A failed card never costs the guest their room: the stay is held for 15 minutes, and they can switch to transfer.
- **Full-width images:**
  - `20-flow-book.png`. Caption: Guest: find and book a stay
  - `21-flow-refund.png`. Caption: Guest: cancel and get a refund

### Section: Mobile
- **Tag:** Mobile First
- **Heading:** The brief asked for desktop. I designed both.
- **Text:** 75% of Nigerian web traffic is on phones, so I recommended designing every flow on mobile too, and the project owner agreed. Every screen starts at 390px with a tab bar, actions within thumb reach and a sticky booking bar, then scales to 1440px.
- **Full-width image:** `41-mockup-phones.png`. Caption: Home, property, check-in day and past stays
- **Below it, four phones in a `phone-swipe-row`** so phone visitors can see each screen large. Caption: Swipe to see each screen. `02-home-phone.png` (Home) · `12-property-phone.png` (Property) · `13-checkin-phone.png` (Check-in day) · `14-past-phone.png` (Past stays)

### Section: Design system
- **Tag:** Design System
- **Heading:** One library behind every screen
- **Bullets:**
  - Blue for every main action. Orange only for deals and deadlines. Green for money that’s safe.
  - Nunito type scale, 4-point spacing, and 48px controls.
  - Components for property cards, search, price breakdowns, status pills, toasts and navigation, published as a Figma library.
- **Colours:** Brand #4361EE · Ink #111827 · Accent #F7921B · Success #15803D · Surface #F8F9FB
- **Font:** Nunito for everything, from 48px display to 12px captions
- **Two images side by side:** `30-ds-foundations.png` and `31-ds-components.png`

### Section: Prototype
- **Tag:** Prototype
- **Heading:** Try it yourself
- **Text:** Every flow is linked in Figma. Each button opens a different starting point.
- **Six buttons** that open in a new tab. The first is `btn-primary`; the rest are `btn-secondary`.
  - Guest · desktop → https://www.figma.com/proto/SLFJi7Vsrqoo3keolaWGG2/Mimk-%E2%80%94-App-v2?node-id=92-1018&page-id=80%3A1017&starting-point-node-id=92%3A1018&scaling=scale-down-width&content-scaling=fixed&show-proto-sidebar=1
  - Guest · mobile → https://www.figma.com/proto/SLFJi7Vsrqoo3keolaWGG2/Mimk-%E2%80%94-App-v2?node-id=92-4581&page-id=80%3A1017&starting-point-node-id=92%3A4581&scaling=scale-down-width&content-scaling=fixed&show-proto-sidebar=1
  - Host · desktop → https://www.figma.com/proto/SLFJi7Vsrqoo3keolaWGG2/Mimk-%E2%80%94-App-v2?node-id=92-7361&page-id=80%3A1017&starting-point-node-id=92%3A7361&scaling=scale-down-width&content-scaling=fixed&show-proto-sidebar=1
  - Host · mobile → https://www.figma.com/proto/SLFJi7Vsrqoo3keolaWGG2/Mimk-%E2%80%94-App-v2?node-id=92-8002&page-id=80%3A1017&starting-point-node-id=92%3A8002&scaling=min-zoom&content-scaling=fixed&show-proto-sidebar=1
  - Admin · desktop → https://www.figma.com/proto/SLFJi7Vsrqoo3keolaWGG2/Mimk-%E2%80%94-App-v2?node-id=92-8598&page-id=80%3A1017&starting-point-node-id=92%3A8598&scaling=scale-down-width&content-scaling=fixed&show-proto-sidebar=1
  - Admin · mobile → https://www.figma.com/proto/SLFJi7Vsrqoo3keolaWGG2/Mimk-%E2%80%94-App-v2?node-id=92-9668&page-id=80%3A1017&starting-point-node-id=92%3A9668&scaling=min-zoom&content-scaling=fixed&show-proto-sidebar=1

### Section: Where it is now
- **Tag:** Project Status
- **Heading:** Where it is now
- **Bullets:**
  - Handed over to the project owner: the brief, design system library, 122 connected prototype screens and 9 user flows.
  - Every guest, host and admin flow is designed on desktop and on mobile.
- **Pull quote:** “The design is sleek and clear. I only asked for desktop, but she recommended designing every flow for mobile too, and she was right. It made the whole product feel complete.”, cited as Project owner, Mimk
- **Text:** **Next:** run the survey and 6–8 interviews with real guests and hosts, test the booking flow with five users, then design changing dates on a booking, the second instalment of Pay in 2 parts, and loading and offline states.

### Section: What I learned
- **Tag:** Retrospective
- **Heading:** What I learned
- **Paragraphs:**
  - **Trust lives in the details.** A date, an amount and a name do more than a badge or a slogan. “Inspected on 4 Nov by Tobi A.” says more than “Verified”.
  - **Rules before screens.** I wrote down fees, refunds and payouts before drawing them, so the guest, host and admin sides all tell the same story with the same numbers.
  - **Recommend, don’t just deliver.** The brief asked for desktop. Explaining why mobile mattered, with one number, turned a request into a better product.
- **Buttons:** Open the prototype → (primary, the Guest desktop link) · Next project: EcoSmart AI → (secondary, `ecosmart.html`)
- **Next-project bar:** EcoSmart AI → `ecosmart.html`

## 6. Check before publishing

- [ ] `mimk.html` opens from the new card on the home page
- [ ] All 27 images load, with no broken image icons
- [ ] The page works on a phone: tables stack, phones swipe sideways, nothing overflows
- [ ] All six prototype buttons open Figma in a new tab (set the Figma file to “Anyone with the link can view”)
- [ ] The home page heading says “Four products”
- [ ] The home page shows Mimk, EcoSmart AI, Kioni, Ajo Book, numbered 1 to 4
- [ ] "Next project" loops Mimk → EcoSmart AI → Kioni → Ajo Book → Mimk
- [ ] `vite.config.ts` includes `mimk.html`
