# 🪔 A Little Diwali Surprise ✨ — From Nikhil
### Premium Personalized Interactive Diwali Digital Gift Experience & Private Admin Wish Dashboard

A cinematic, interactive digital greeting website designed to feel like opening a luxury Diwali digital gift box, lovingly sent from **Nikhil**, with a secure **Supabase-powered wish collection system** and a **private admin dashboard**.

---

## 🌟 The Complete Experience Flow (14 Interactive Stages)

1. **Experience 01 — The Opening Gift**
   - 3D golden gift box floating in a midnight navy environment with golden particles and subtle idle rotation.
   - Tapping the gift box triggers shaking, ribbon untying, lid opening, warm golden light emergence, and particle bursts!

2. **Experience 02 — Enter Your Name**
   - Elegant name entry screen: *"What should I call you?"*
   - Validates input (trims whitespace, 32-character maximum, validates non-empty).
   - Dynamic document title and session persistence via `sessionStorage`.
   - Footer: *"A special wish from Nikhil ♡"*.

3. **Experience 03 — Personalized Welcome**
   - Displays *"Happy Diwali, [Recipient Name]! ♡"* in flowing handwritten calligraphy with a golden glow.
   - Grand royal palace courtyard setting with an intricate floral rangoli and glowing brass diya.
   - Emotional greeting: *"May your life be filled with light, love, peace and endless happiness. ✨"*.

4. **Experience 04 — Every Little Light Makes a Difference**
   - Interactive 7-diya lighting experience (*Peace, Joy, Health, Success, Prosperity, Love, Wisdom*).
   - Tapping unlit diyas sparks realistic flame flickering, expanding ambient glow, and singing-bowl bell chimes.
   - Progress counter + *"Light All at Once ✨"* shortcut.
   - Golden confetti shower and celebration fanfare when all 7 are lit!

5. **Experience 05 — Decorate Your Diwali Corner**
   - Traditional Indian veranda entrance with carved wooden door and stone steps.
   - Interactive docked toolbar to layer festive decorations in real-time:
     - 🪔 *Diyas* (stone steps illuminated)
     - ✨ *Fairy Lights* (golden strings draped along arch)
     - 🏮 *Hanging Lanterns* (brass kandils swaying softly)
     - 🌸 *Floral Rangoli* (vibrant mandala on courtyard floor)
     - 🏵️ *Marigold Toran* (auspicious yellow/orange garland)
   - Live visual layers toggle with sound chimes + *"Decorate Everything ✨"* option.

6. **Experience 06 — Interactive Rangoli Creator**
   - Dedicated digital rangoli studio with radial symmetry (8-fold symmetry).
   - 4 sacred patterns: *Sacred Mandala, Divine Lotus, Royal Peacock, Diwali Star*.
   - Vibrant color palette (*Saffron Gold, Turmeric Yellow, Sindoor Red, Lotus Pink, Peacock Teal, Emerald Green, Royal Purple, Pure Pearl*).
   - Decorative tool stamps: *Colored Powder, Flower Petals, Glowing Diyas*.
   - Features *Undo*, *Clear Canvas*, and instant high-res *PNG Image Download*.

7. **Experience 07 — Something Sweet for You! 🍬**
   - Lavish brass platter (thali) with classic Indian festive mithai:
     - **Motichoor Ladoo** (Golden saffron pearls & pistachios)
     - **Kaju Katli** (Royal cashew diamond fudge with silver vark)
     - **Crispy Jalebi** (Saffron & cardamom syrup spirals)
     - **Pista Barfi** (Rich pistachio milk delicacy)
   - Tapping any sweet pops up a dedicated personalized wish card dedicated to the recipient.

8. **Experience 08 — Make a Wish (Backend Connected)**
   - Cosmic twilight sky setting with twinkling stars and constellations.
   - Public wish submission with server-side Zod validation (`POST /api/wishes`).
   - Clear privacy disclosure: *"Your wish will be securely shared with Nikhil, the creator of this Diwali experience. It will only be visible in his private dashboard."*
   - Mandatory unchecked consent checkbox.
   - Clicking *"Send My Wish Into The Universe ✨"* saves the wish to Supabase, collapses the text into a radiant golden star that ascends into space, followed by a sparkling constellation and shooting star across the screen.

9. **Experience 09 — Let's Light Up the Sky! 🎆**
   - Midnight Indian city skyline silhouette with illuminated palaces and domes.
   - Customizable fireworks with theme filters: *Gold, Purple, Pink, Blue, Multi-colour*.
   - Interactive Canvas particle physics: tap anywhere to launch rockets, or trigger multi-rocket barrages and hands-free *Auto Celebration mode*.
   - Synthesized launch whooshes & resonant explosion crackles.

10. **Experience 10 — My Favourite People ♡**
    - Hanging Polaroid gallery pinned to rustic twine with miniature wooden pegs.
    - Soft swaying motion, hover tilt, and lightbox view.
    - **Upload Feature**: Add personal photos from your device with custom captions.
    - Automated **Slideshow Mode** with play/pause and photo delete options.

11. **Experience 11 — Hidden Surprises & Mini Challenges**
    - Interactive treasure hunt with 4 hidden Diwali secrets:
      - ⭐ *The Golden Star of Luck*
      - 🏮 *The Royal Lantern*
      - 🪔 *The Sacred Eternal Flame*
      - 🍬 *The Secret Golden Ladoo*
    - Unlocks special bonus wishes and festive achievements.

12. **Experience 12 — Surprise Countdown**
    - Cinematic 3... 2... 1... countdown before the final reveal.
    - Pulsing golden numerals, device vibration feedback (where supported), audio crescendo, and golden confetti burst.

13. **Experience 13 — The Secret Handwritten Letter**
    - Sealed royal envelope with a crimson wax seal stamped with Nikhil's monogram.
    - Tapping the wax seal breaks the seal with realistic sound and unfolds a handwritten letter on deckled parchment paper, signed by **Nikhil ♡**.

14. **Experience 14 — Final Celebration & Downloadable Greeting Card**
    - Grand celebration with twin confetti cannons and personalized greeting.
    - **Downloadable Personalized Greeting Card**: Generates a high-res printable 2x PNG card with recipient's name, diya artwork, and sender signature via `html-to-image`.
    - One-click share link generator (copies URL with `?name=[Recipient]` query parameter) and replay control.

---

## 🔒 Private Nikhil Admin Dashboard (`/admin`)

- **Secure Login Route**: `/admin/login` (Supabase email/password authentication).
- **Server-Side Authorization**: Restricts dashboard access strictly to `ADMIN_EMAIL`. Public visitors cannot view, list, edit, or delete any wishes.
- **Summary Cards**:
  1. Total Wishes Received
  2. Wishes Received Today
  3. Unique People / Recipients
  4. Latest Submission Timestamp
- **Search & Filters**: Search by recipient or message, filter by date (All, Today, Past 7 Days) and status (New, Read), sort Newest / Oldest.
- **Wish Details Drawer**: Inspect full messages with exact submission timestamps, toggle Read/New status, and delete records with confirmation.
- **Row Level Security (RLS)**: Enforced via `supabase/migrations/create_diwali_wishes.sql` preventing anonymous reads.

---

## ⚙️ Environment Variables Setup

Create a `.env.local` file in your project root (see `.env.example`):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key
ADMIN_EMAIL=your-email@example.com
```

### 1. Database Setup (Supabase SQL Editor)
Run the SQL migration in `supabase/migrations/create_diwali_wishes.sql` in your Supabase SQL Editor. This creates the `diwali_wishes` table and configures Row Level Security (RLS) policies.

### 2. Admin User Creation
In your Supabase Dashboard -> **Authentication** -> **Users**, click **"Add User"** and create an account matching your `ADMIN_EMAIL`. You will use these credentials to log in at `/admin/login`.

---

## 🚀 Running Locally

```bash
# Start development server
npm run dev
```

- Public gift experience: [http://localhost:3000](http://localhost:3000)
- Nikhil's admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

To verify the production build:
```bash
npm run build
npm start
```

---

## ☁️ Deploying to Vercel (1-Click)

1. Push your repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: complete diwali surprise with admin dashboard"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository. Vercel will automatically detect **Next.js**.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAIL`
5. Click **Deploy**.
