# Bazaar Fresh — online supermarket demo

A clickable demo of an online supermarket for stores in Afghanistan. It has a
storefront, cart, checkout, order tracking, a customer account and a simple
admin panel, in **English, Pashto (پښتو) and Dari (دری)**, with full
right-to-left layout for Pashto and Dari.

It is a front-end demo only: there is no backend, no login and no real
payment. Products come from a seed file, and the cart, orders, profile and
admin edits are saved in the browser (localStorage).

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui
(Radix), Zustand and lucide-react.

---

## Run it

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For a production build:

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push the repository to GitHub and click **Add New → Project** in Vercel.
2. This app lives in the `bazaar-fresh/` folder, so set **Root Directory** to
   `bazaar-fresh`. (Skip this step if the app is at the root of its own repository.)
3. Click **Deploy**. No environment variables are needed.

---

## What to show in a demo

| Page | URL | What it shows |
| --- | --- | --- |
| Home | `/` | Promo banner, delivery promises, category tiles, Weekly Deals carousel with countdown, Popular products, Order again |
| Categories | `/categories`, `/category/rice-grains` | Filters (price range, brand, in stock, on sale), sorting, Add buttons and quantity steppers on every card |
| Weekly deals | `/deals` | All discounted products |
| Product | `/product/kandahar-pomegranates` | Large image, price per unit, stock status, description, related products |
| Search | type in the header | Instant suggestions as you type, in any of the three languages (try "tea", "چای" or "انار") |
| Cart | cart button → drawer, or `/cart` | Quantity edit, remove with undo, free-delivery progress bar, totals |
| Checkout | `/checkout` | Store, address, phone (Afghan mobile validation), delivery slot, Cash on Delivery / HesabPay / Bank transfer |
| Order tracking | shown after "Place order" | Confirmation, then Received → Packing → Out for delivery → Delivered, advancing automatically every 20 seconds |
| Account | `/account` | Profile, saved addresses, order history with "Order again" |
| Admin | `/admin` | Inline edit of price, sale price and stock, in/out-of-stock switch, order status dropdown |

Tips:

- **Language:** use the 文A button in the header. Pashto and Dari flip the
  whole layout to right-to-left, use Eastern Arabic digits (۱۲۳) and show dates
  on the Afghan solar calendar.
- **Admin edits go live straight away.** Open `/admin` in one tab and the store
  in another: when you mark a product out of stock or change a price, the other
  tab updates on its own.
- **Reset:** "Reset demo data" on `/account` and "Reset all changes" on
  `/admin` restore the original demo data.

---

## Change the store name, colors and settings

Everything store-wide lives in **`src/config/site.ts`**:

```ts
export const siteConfig = {
  name: "Bazaar Fresh",                          // shown in the header, footer and page titles
  localName: { ps: "بازار تازه", fa: "بازار تازه" }, // name shown in Pashto / Dari
  orderPrefix: "BF",                             // order numbers look like BF-482913

  colors: {
    primary: "#0b6b3a",       // main brand color (buttons, logo, links)
    primaryForeground: "#ffffff",
    deal: "#f26a1b",          // sale tags and promotions
    dealForeground: "#ffffff",
  },

  currency: { display: "symbol", … },  // "symbol" → ؋ 250, "code" → AFN 250
  delivery: { freeThreshold: 1500, fee: 100, promiseHours: 2 },
  contact: { phone: "…", whatsapp: "93799001234", email: "…" },
  stores: [ … ],              // store locations shown in the header, checkout and footer
  deliverySlots: [ … ],       // delivery windows at checkout
  paymentMethods: ["cod", "hesabpay", "bank"],
  demo: { orderStepSeconds: 20 },  // how fast orders move along the tracking timeline
};
```

- The **name** is used everywhere, including browser tab titles.
- The **colors** take any CSS color. Lighter tints, hover states and the favicon
  are worked out from them automatically.
- The **logo** is the leaf icon in `src/components/layout/logo.tsx`; swap it
  for an `<Image>` of the client's logo if they have one.

### Translations

All interface text is in `src/i18n/messages/`:

- `en.json` — English
- `ps.json` — Pashto
- `fa.json` — Dari

Every file has the same keys. Edit the text on the right-hand side, and
`{placeholders}` such as `{amount}` are filled in automatically.

---

## Edit the products

All categories and products are in **`src/data/products.ts`**. Each product
looks like this:

```ts
{
  id: "kandahar-pomegranates",        // used in the URL: /product/kandahar-pomegranates
  name: "Kandahar Pomegranates",
  localName: { ps: "کندهاري انار", fa: "انار قندهاری" }, // optional
  brand: "Kandahar Orchards",
  category: "fruits-vegetables",
  price: 160,          // AFN, whole numbers
  salePrice: 130,      // optional: puts the product in Weekly Deals
  unit: "kg",          // price is "per kg" | "piece" | "pack" | "bag" | "bottle" | "tray" | "can" | "box" | "jar"
  size: "1 kg",        // shown under the name
  stock: 95,           // 0 = out of stock; 5 or fewer shows "Only N left"
  origin: "local",     // "local" shows a Local badge, or "imported"
  image: img("1541344999736-83eca272f6fc"),
  emoji: "🍎",
  description: "Deep red, juicy pomegranates…",
  rating: 4.9,
  reviews: 421,
  popular: true,       // optional: shows on the home page under Popular products
}
```

- **Add a product:** copy an existing entry, give it a new `id` and edit the
  fields. It appears on the home page, in its category, in search and in the
  admin panel.
- **Photos:** `img("…")` takes an Unsplash photo id: the part after `photo-` in
  an `images.unsplash.com/photo-…` link. You can also use any full image URL,
  or put files in `public/products/` and use `image: "/products/rice.jpg"`.
  For the real launch, use the store's own product photos.
- **Missing photos:** if a photo can't be loaded (no internet, or the image was
  removed), the product shows a colored tile with its `emoji` instead, so the
  page never shows a broken image.
- **Demo customer and past orders:** see `src/data/demo.ts`.

---

## Project structure

```
src/
  app/                 Pages (App Router): home, category, product, search, cart,
                       checkout, orders/[id], account, admin
  components/
    ui/                shadcn/ui building blocks (button, sheet, select, …)
    layout/            Header, search bar, language and store pickers, footer, mobile tab bar
    home/ catalog/     Home page sections, category, product and search views
    product/           Product card, grid, carousel, filters
    cart/ checkout/ orders/ account/ admin/
  config/site.ts       Store name, colors, delivery rules, locations
  data/products.ts     Seed categories and products
  data/demo.ts         Demo customer and order history
  i18n/                Languages, translations and the language provider
  store/               Zustand stores (cart, orders, admin edits, profile), saved to localStorage
  lib/                 Price/number/date formatting, search and sorting helpers
```

The selected language is kept in a cookie, so pages are rendered on the server
in the right language and direction with no flash of English.
