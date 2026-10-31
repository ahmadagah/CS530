# Square Opens Its Payments, Locks Everything Else

Square's US platform in late 2026 is one software stack sold as three per-location plans: **Square Free ($0), Square Plus ($49 a month) and Square Premium ($149 a month)**. These replaced 18 à la carte subscriptions in October 2025. Square's public developer platform opens the money-and-records core and keeps almost every operational and communication tool inside Square's own apps. Square's official OpenAPI spec (release 2026-09-16) lists **40 REST APIs, 332 operations and 149 webhook event types**. They cover payments, refunds, cards on file, disputes, payouts, invoices, orders, catalog, inventory, customers, bookings, subscriptions, loyalty, gift cards, team members and timecards. The spec has **no endpoints at all** for these:

| Area | Product or feature with no endpoint |
|---|---|
| Quotes and documents | Estimates and contracts |
| Customer communication | Marketing email and SMS; Square Messages and the business phone number |
| Website | Square Online's site builder |
| Staff | Payroll |
| Money and banking | Checking and Savings, Loans, Bill Pay, bitcoin |
| Risk and tax | Risk Manager, tax filing |

**Core US rates**

| Payment type | Free | Plus | Premium |
|---|---|---|---|
| In person (tap, dip, swipe) | 2.6% + 15¢ | 2.5% + 15¢ | 2.4% + 15¢ |
| Online and invoices | 3.3% + 30¢ | 2.9% + 30¢ | 2.9% + 30¢ |
| Keyed or card on file | 3.5% + 15¢ | 3.5% + 15¢ | 3.5% + 15¢ |
| ACH bank transfer | 1% | 1% | 1% |
| Afterpay | 6% + 30¢ | 6% + 30¢ | 6% + 30¢ |
| Instant transfer | 1.95% | 1.95% | 1.95% |
| API access | Free | Free | Free |

Some API features are tied to a plan:

| API feature | What it requires |
|---|---|
| Seller-level booking writes | A paid Appointments tier |
| Invoice installments and custom fields | A paid invoicing tier |
| Loyalty API | A program set up in the Dashboard, which needs Plus or Premium |

**What this means for Sheen Mobile Auto Detailing.** The split between open and closed features is the build plan.

| Approach | What it covers |
|---|---|
| **Integrate Square only as a payments-and-records layer** | The Mobile Payments SDK for Tap to Pay in the driveway; the Web Payments SDK; the Payments, Cards, Customers, Catalog, Subscriptions, Refunds, Disputes and Payouts APIs |
| **Build the dispatch layer Square has never offered** | Drive-time scheduling, service-area limits, crew assignment, job photos, estimates, every customer message and call, payroll, bookkeeping and tax preparation |

**One caveat applies to every number below.** squareup.com and developer.squareup.com were blocked during research. Prices therefore come from search-engine extracts of Square's official pages; several were stale or contradictory, and those are flagged inline. The API inventory was checked against Square's official OpenAPI spec on GitHub.

## Two blocked domains mean every price needs a live recheck

**The session could not open any official Square page.** The network refused connections to **squareup.com and developer.squareup.com** through DNS and proxy blocks. Some researchers also lost access to block.xyz and businesswire.com.

**Every price comes from search-engine extracts of official pages.** These include Square's pricing page, help-center articles, press releases and developer docs. Third-party reviews were used where Square's own page could not be found.

**Some extracts were a year or more old.** Where two official pages disagree, this report shows both figures rather than picking one.

**Re-check rates before hard-coding them.** Square's own fee article warns that rates "may vary based on plan type" ([Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees)). Before hard-coding any rate, the coding agent should check squareup.com/us/en/pricing and the Dashboard's "Pricing & subscriptions" page.

**The API inventory comes from Square's machine-readable spec.** Researchers cloned Square's official **OpenAPI spec from GitHub at the "Release 2026-09-16" commit** (dated 2026-09-15; default `Square-Version` 2026-09-16) ([Square OpenAPI spec](https://github.com/square/connect-api-specification/blob/master/api.json)). A script extracted every operation, release status (GA, BETA or DEPRECATED), OAuth scope and webhook event. They then compared the spec's release history back to January 2024 to date when things were added or removed ([spec history](https://github.com/square/connect-api-specification/commits/master/api.json)).

**"None" in an API column means the spec has no endpoint.** That is strong evidence that no public REST API exists.

**Client-SDK facts have a different basis.** Facts about the Web Payments, In-App Payments and Mobile Payments SDKs come from Square's GitHub repositories, package registries and search extracts of the developer docs.

**Oregon payroll-tax rates come from the Oregon Department of Revenue,** which was reachable.

| Tag used in tables | Meaning |
|---|---|
| (no tag) or [O] | Official Square page, read through a search-engine extract |
| [O-old] | Official page whose extract looked stale, or that conflicts with a newer official page |
| [C] | Square Community or Square Developer Forums post (hosted by Square, but not policy) |
| [3P] | Third-party source only; not confirmed on any Square page |
| [Spec] | Verified in the OpenAPI spec, release 2026-09-16 |
| CONFLICT | Sources disagree; the competing values are shown side by side |
| UNCONFIRMED | Single weak source, an inference, or a fact the blocked pages would have settled |

## Money in: three plans set every rate, and nearly every payment path has an SDK

Everything Square charges a US seller now depends on one choice of plan. Almost every way of taking a card can be reached through a public API or SDK.

A few payment functions are exceptions. They are Dashboard switches, not features a custom app can drive:

- starting an instant transfer
- Risk Manager rules
- surcharge enrollment
- offline settings
- bitcoin

### The October 2025 plans replaced 18 subscriptions with three tiers

**Three plans replaced 18 à la carte subscriptions** in October 2025, when Square announced "New Unified Plans & Pricing" ([Square press release](https://squareup.com/us/en/press/unified-pricing-and-packaging); [Help 8569](https://squareup.com/help/us/en/article/8569-switch-to-the-new-square-subscription-plans)):

- Every plan includes all seven POS modes and Square Banking.
- There are no per-device POS fees.
- Sellers cannot mix and match features across plans.

**Billing and switching rules** ([Help 8569](https://squareup.com/help/us/en/article/8569-switch-to-the-new-square-subscription-plans)):

- Paid plans bill **per active location**, so deactivating unused locations lowers the bill.
- **Switching from a legacy subscription is one-way.** A seller cannot go back.

**The start date is reported three ways (CONFLICT).** This minor disagreement does not change anything substantive:

- The release page shows October 6, 2025.
- The press archive lists October 1 ([press archive](https://squareup.com/us/en/press/archive)).
- A reseller repost says October 8 ([TSG Payments repost](https://tsgpayments.com/square-simplifies-commerce-software-with-new-unified-plans-pricing/)).

**Some sellers report problems switching.** Posters in the Square Community say they were told they were ineligible to switch, or were charged more than advertised ([Square Community](https://community.squareup.com/t5/Customer-Engagement/New-Square-Paid-Plans-Square-Plus-and-Square-Premium-Help-me/m-p/823190)).

| Plan | US price | What it adds (as reported) | In-person / online card rate | Sources |
|---|---|---|---|---|
| **Square Free** | $0 per location; extra locations free | <ul><li>**Selling and payments:** all seven POS modes; a Square Online site on square.site with online ordering; Square Banking</li><li>**Invoicing:** unlimited invoices, estimates, contracts and recurring invoices</li><li>**Appointments:** booking site and reminders</li><li>**Customers and stock:** Customer Directory; basic stock tracking</li><li>**Team:** basic team management</li></ul> | 2.6% + 15¢ / 3.3% + 30¢ | [Press release](https://squareup.com/us/en/press/unified-pricing-and-packaging); [Bottom Line](https://squareup.com/us/en/the-bottom-line/inside-square/pricing-plans) |
| **Square Plus** | $49 per active location per month; 30-day trial | <ul><li>**Point of sale:** advanced POS</li><li>**Inventory:** counts, purchase orders, forecasting, cost of goods sold (COGS), vendors, barcode labels</li><li>**Marketing and loyalty:** Loyalty; Marketing with unlimited email and 500 texts a month</li><li>**Staff:** staff management, including Advanced Access</li><li>**Invoicing:** milestones, custom fields, templates, batch send, multi-package estimates, estimate auto-convert</li><li>**Appointments:** no-show fees, waitlist, multi-staff booking</li><li>**Phone:** dedicated toll-free business number</li><li>**Website:** custom domain and no ads on Square Online [3P]</li><li>**Hardware:** eligibility for the Kiosk</li></ul> | 2.5% + 15¢ / 2.9% + 30¢ | [Press release](https://squareup.com/us/en/press/unified-pricing-and-packaging); [Help 8387](https://api.squareup.com/help/us/en/article/8387-create-and-send-invoices); [Square Marketing](https://squareup.com/us/en/marketing) |
| **Square Premium** | $149 per active location per month; 30-day trial | <ul><li>**Software and support:** "nearly all" Square software; 24/7 phone support; advanced reporting</li><li>**Marketing:** 2,500 texts a month</li><li>**Gift cards:** 0% load fee</li><li>**Appointments and staff:** resource booking, rostering, custom commissions, custom contract fields</li><li>**Inventory:** transfer orders and cross-location returns [3P]</li><li>**Square Online:** real-time shipping and product reviews [3P]</li></ul> | 2.4% + 15¢ / 2.9% + 30¢ | [Press release](https://squareup.com/us/en/press/unified-pricing-and-packaging); [Appointments pricing](https://squareup.com/us/en/appointments/pricing); [The Retail Exec](https://theretailexec.com/tools/square-pricing/) |
| **Custom pricing** | For sellers processing more than $250,000 a year | Negotiated rates; third parties call the top tier "Square Pro" | Negotiated | [Square pricing](https://squareup.com/us/en/pricing); [Costbench](https://costbench.com/software/payment-processing/square/) |

**The seven POS modes:**

- Standard
- Bars
- Quick-Service Restaurant
- Full-Service Restaurant
- Retail
- Health & Beauty (bookings)
- Professional Services

Sources: [Square POS page](https://squareup.com/us/en/point-of-sale); [Business News Daily](https://www.businessnewsdaily.com/square-review).

**Which mode fits a mobile detailer.** Either of these fits, and both come with every plan:

- **Professional Services:** invoices, estimates and appointments.
- **Health & Beauty / Bookings:** built around booking.

A third-party guide says the old Plus price of **$29 a month for some business types became $49** under the unified plans ([Markate](https://www.markate.com/product-updates/announcement-square-pricing-update-36)).

### Processing rates run from 2.4% in person to 6% for Afterpay

| Payment type | Free | Plus | Premium | Notes and confidence | Sources |
|---|---|---|---|---|---|
| In-person card (tap, dip, swipe; Tap to Pay; Reader; Terminal) | 2.6% + 15¢ | 2.5% + 15¢ | 2.4% + 15¢ | <ul><li>Older 3P sources list 2.6% + 10¢; the per-transaction fee is reported to have risen from 10¢ to 15¢, date unconfirmed</li><li>One 3P lists Plus at 2.6% (CONFLICT)</li></ul> | [Square pricing](https://squareup.com/us/en/pricing); [KORONA POS](https://koronapos.com/blog/square-pos-fees/); [posusa](https://www.posusa.com/square-fees-pricing/) |
| Online card: Square Online, Payment Links, invoices | 3.3% + 30¢ | 2.9% + 30¢ | 2.9% + 30¢ | <ul><li>Free rose from 2.9% on 2026-01-13 [3P date]</li><li>The Payment Links page says 3.3% "applies for new Square customers", so legacy sellers may keep 2.9% (UNCONFIRMED)</li><li>3P outlier: Premium at 2.6% + 30¢</li></ul> | [Square pricing](https://squareup.com/us/en/pricing); [beancount.io](https://beancount.io/blog/2026/09/02/square-free-plan-card-rate-increase-annual-cost-small-business-guide); [Payment Links](https://squareup.com/us/en/payment-links) |
| "Online API" card (Web Payments SDK + Payments API) | 2.9% + 30¢ (UNCONFIRMED) | 2.9% + 30¢ | 2.9% + 30¢ | <ul><li>Square's fee article shows a separate Free-plan "Online API" line at 2.9% + 30¢, and the developer pricing page agrees</li><li>Verify before relying on it</li></ul> | [Fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees); [Dev payments pricing](https://developer.squareup.com/docs/payments-pricing) |
| Keyed entry, card on file, Virtual Terminal keyed | 3.5% + 15¢ | 3.5% + 15¢ | 3.5% + 15¢ | <ul><li>Free plan rate: [O]</li><li>Same rate on paid plans: per 3P</li></ul> | [Fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees); [net-proceeds.com](https://www.net-proceeds.com/square-fee-calculator/) |
| Card on file charged from an invoice | 3.5% + 15¢ | n/a | n/a | <ul><li>The invoice-specific article still says a flat 2.9% + 30¢ for invoices [O-old]</li></ul> | [Invoice fees](https://squareup.com/help/us/en/article/7201-square-invoices-fees) |
| Text-message payment links | 3.3% + 30¢ | n/a | n/a | — | [Fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees) |
| ACH on invoices | 1%, $1 minimum, no cap | 1%, $1 minimum, $10 cap | 1%, $1 minimum, $10 cap | <ul><li>The $10 cap also came with legacy Invoices Plus</li></ul> | [Fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees); [Community](https://community.squareup.com/t5/Square-Invoices/Invoice-Fees-ACH-Maximum-Fee/td-p/728475) |
| ACH via Web Payments SDK + Payments API | 1%, $1 minimum, $5 maximum | same | same | <ul><li>No chargeback fees</li><li>Cached page looked old [O-old]</li></ul> | [Dev payments pricing](https://developer.squareup.com/docs/payments-pricing) |
| Cash App Pay | 2.6% + 15¢ in person; 3.3% + 30¢ online | Online likely 2.9% (UNCONFIRMED) | Online likely 2.9% (UNCONFIRMED) | <ul><li>Developer docs say "same rate as card payments"</li><li>A 2023 invoices note said 2.9% + 30¢</li><li>Third-party sources conflict</li></ul> | [Fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees); [Dev payments pricing](https://developer.squareup.com/docs/payments-pricing) |
| Afterpay (buy now, pay later) | 6% + 30¢ | 6% + 30¢ | 6% + 30¢ | <ul><li>All channels</li><li>Free to enable</li></ul> | [Fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees) |
| Apple Pay / Google Pay | Card rate for the channel | same | same | <ul><li>No separate wallet fee was found (inference)</li></ul> | [Web Payments wallets](https://developer.squareup.com/docs/web-payments/digital-wallets) |
| Cards issued outside the US | +1.5% | +1.5% | +1.5% | <ul><li>Not charged on Afterpay, ACH, Cash App Pay, bitcoin or EBT</li></ul> | [Square pricing](https://squareup.com/us/en/pricing) |
| Gift card load (physical or eGift) | 2.5% + processing | 2.5% + processing | 0% + processing | <ul><li>Load fee came with the January 2024 repricing</li></ul> | [Gift card pricing](https://squareup.com/us/en/gift-cards/pricing) |
| Bitcoin payments (Lightning) | 0% through 2026-12-31, then 1% | same | same | <ul><li>Conversion to dollars: 1%; 0.5% on "some plans"</li></ul> | [Help 8622](https://squareup.com/help/us/en/article/8622-accept-and-manage-bitcoin-payments) |
| EBT / SNAP | Fee not found | — | — | <ul><li>Open beta since 2026-07-30</li></ul> | [Release notes, July 30](https://squareup.com/us/en/release-notes/release-notes-july-30th) |
| Orders from Cash App users via Neighborhoods | 1% reported [3P] | — | — | — | [Payments Dive](https://www.paymentsdive.com/news/building-blocks-square-base/828712/) |
| Subscription charges | Standard rate; no monthly fee | same | same | <ul><li>Quoted at 2.9% + 30¢ in 2021–22 [C, old]</li></ul> | [Help 7627](https://squareup.com/help/us/en/article/7627-get-started-with-subscriptions-in-dashboard) |
| Square APIs, SDKs, Sandbox, MCP server | $0 | $0 | $0 | <ul><li>The seller pays processing only</li><li>Using the Orders API with a non-Square processor triggers an unspecified "transaction fee" [Spec]</li></ul> | [Dev payments pricing](https://developer.squareup.com/docs/payments-pricing); [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| PCI compliance | $0 | $0 | $0 | <ul><li>Square software is PCI compliant</li></ul> | [Processing fees explained](https://squareup.com/us/en/the-bottom-line/managing-your-finances/credit-card-processing-fees-and-rates) |

**When Plus pays for itself.** The figures in this paragraph are this report's arithmetic, not Square's.

- Plus's online rate is 0.4 percentage points lower than Free's. That saving covers the $49 fee at about **$12,250 a month** of online or invoice card volume.
- The 0.1-point in-person saving alone needs about **$49,000 a month** to cover the fee.
- Premium's extra $100 a month buys only another 0.1 point in person. That breaks even at about $100,000 a month.

**The "Online API" line could change the math.** If that 2.9% line is current on Free, payments that Sheen's own app creates through the Web Payments SDK already pay 2.9%. In that case Plus saves nothing on that volume. This is the single most consequential figure to verify on the live page.

### Every way to accept payment, and the SDK that reaches it

**No hardware is needed to take payments.** The Square POS app is free on the Free plan ([Square pricing](https://squareup.com/us/en/pricing)).

**What a custom app can reach, by channel:**

- **In the field:** the Mobile Payments SDK, for Tap to Pay and Square readers.
- **On a paired Square Terminal:** the Terminal API.
- **Online:** the Web Payments SDK plus the Payments API. This covers cards, Apple Pay, Google Pay, ACH, Afterpay, Cash App Pay and Square gift cards.
- **Payment links:** the Checkout API.
- **Invoices:** the Invoices API.

**What no source shows any API for:** bitcoin, EBT/SNAP, and in-person Afterpay or Cash App Pay.

| Method or channel | Price or requirement | Public API / SDK | Notes | Sources |
|---|---|---|---|---|
| Square POS app (Free plan) | $0; no hardware needed | Point of Sale API: switches into the Square POS app and back (current lifecycle UNCONFIRMED) | <ul><li>Seven modes</li><li>Switching apps defeats a "never open Square" goal</li></ul> | [Square pricing](https://squareup.com/us/en/pricing); [POS API](https://connect.squareup.com/docs/pos-api/what-it-does) |
| Tap to Pay on iPhone | In-person rate | Mobile Payments SDK (iOS) | <ul><li>iPhone XS or newer</li><li>iOS 16.7+ per developer docs, but 16.4 per a seller page (CONFLICT)</li><li>Not on iPad; not offline</li><li>The seller must link Square to an Apple ID</li></ul> | [MP SDK iOS Tap to Pay](https://developer.squareup.com/docs/mobile-payments-sdk/ios/tap-to-pay); [Square AU Tap to Pay](https://squareup.com/au/en/the-bottom-line/inside-square/tap-to-pay-iphone) |
| Tap to Pay on Android | 2.6% + 15¢ (Free) | Mobile Payments SDK (Android) | <ul><li>Android 9+, phones only</li><li>From SDK 2.1.0, the developer must give Square the app signature before production</li><li>No other reader may be paired during the payment</li><li>Once labeled Beta</li></ul> | [Square Tap to Pay Android](https://squareup.com/us/en/the-bottom-line/selling-anywhere/tap-to-pay-android); [MP SDK Android](https://developer.squareup.com/docs/mobile-payments-sdk/android/tap-to-pay) |
| Square Reader (contactless and chip) | $59 | Mobile Payments SDK | <ul><li>24-hour offline window</li></ul> | [Square hardware](https://squareup.com/us/en/hardware) |
| Magstripe reader | First free, $10 each additional [3P] | Mobile Payments SDK (works offline) | — | [NerdWallet](https://www.nerdwallet.com/business/software/reviews/square-pos) |
| Square Stand / Stand Mount | $149 each; Stand also $14/mo × 12 | Mobile Payments SDK supports the Stand | <ul><li>Turns an iPad into a POS</li><li>Stand Mount price [3P]</li></ul> | [Square hardware](https://squareup.com/us/en/hardware) |
| Square Terminal | $299 or $27/mo × 12 | Terminal API + Devices API pairing [Spec] | <ul><li>72-hour offline upload window</li><li>Signature, tips, surcharge (beta)</li></ul> | [Terminal API features](https://developer.squareup.com/docs/terminal-api/additional-payment-checkout-features) |
| Square Handheld | $399 or $37/mo × 12 | Not confirmed as a Mobile Payments SDK host (UNCONFIRMED) | <ul><li>Launched May 2025</li><li>6.2-inch screen; IP54</li><li>Reportedly Wi-Fi only at launch [3P]</li></ul> | [Square hardware](https://squareup.com/us/en/hardware) |
| Square Register (2nd gen) | $899; Kit from $1,189 | None (Square POS only) | <ul><li>Launched 2026-02-04</li><li>Dual screen [3P]</li></ul> | [Business Wire](https://www.businesswire.com/news/home/20260204804070/en/Second-Generation-Square-Register-Delivers-More-Speed-Power-and-Reliability-to-the-Neighborhood) |
| Square Kiosk (AI) | $1,999 + $99/mo per device; requires Plus or Premium | None | <ul><li>Launched 2026-10-14</li><li>AI voice ordering, aimed at quick-service restaurants</li></ul> | [FinancialContent / Business Wire](https://www.financialcontent.com/article/bizwire-2026-10-14-introducing-the-new-square-kiosk-reimagining-self-service-with-intelligence) |
| Virtual Terminal (key in a card in the browser) | <ul><li>No monthly fee</li><li>3.5% + 15¢ keyed or by link</li><li>2.6% + 15¢ in person</li></ul> | None. A custom app uses the Web Payments SDK + Payments API instead | <ul><li>Surcharging not supported</li></ul> | [Virtual Terminal](https://squareup.com/us/en/payments/virtual-terminal) |
| Card on file | Free to store; 3.5% + 15¢ per charge | Cards API + Payments API (`ccof:` source) [Spec] | <ul><li>Seller-initiated charges skip 3D Secure (3DS)</li><li>The seller keeps chargeback liability</li><li>Not on invoices that use goods-and-services confirmation</li></ul> | [SCA overview](https://developer.squareup.com/docs/sca-overview); [Help 5797](https://squareup.com/help/us/en/article/5797-use-card-on-file-with-square-invoices) |
| Payment Links / Square-hosted checkout | 3.3% + 30¢ on Free; 2.9% + 30¢ on paid plans | Checkout API: CreatePaymentLink, ListPaymentLinks, RetrievePaymentLink, UpdatePaymentLink, DeletePaymentLink [Spec] | <ul><li>Supports tipping, up to 2 custom fields, shipping address, prefilled buyer data</li><li>Options: `enable_coupon`, `enable_loyalty`, `subscription_plan_id`</li><li>`CreateCheckout` is deprecated</li></ul> | [Checkout API](https://developer.squareup.com/docs/checkout-api) |
| Square Online checkout | 3.3% / 2.9% + 30¢ | Indirect, through the Catalog and Orders APIs; checkout settings endpoints are beta | — | [Square pricing](https://squareup.com/us/en/pricing) |
| Invoices | See the invoices section | Invoices API [Spec] | <ul><li>Accepts card, ACH, Cash App Pay and Afterpay</li></ul> | [Invoices API](https://developer.squareup.com/docs/invoices-api/overview) |
| Web card form, Apple Pay, Google Pay, ACH, Afterpay, Cash App Pay, Square gift cards | Channel rates above | Web Payments SDK produces a token; the Payments API accepts it as `source_id` | <ul><li>HTTPS and a Content Security Policy required since 2025-10-01</li><li>ACH uses Plaid and is US only</li><li>Afterpay may fail to load for ineligible buyers</li><li>"Charge and Store" in one step was Beta</li></ul> | [Web Payments SDK](https://developer.squareup.com/docs/web-payments/overview); [Charge and Store](https://developer.squareup.com/forums/t/web-payments-sdk-charge-and-store-beta/17934) |
| Native card entry in your own app | Card rates | In-App Payments SDK | <ul><li>Risk Manager rules reportedly do not apply [C]</li></ul> | [Dev forum](https://developer.squareup.com/forums/t/cvv-not-checked-and-avs-rejected-causing-fraud-alerts-on-our-customers-we-check-out/13786) |
| Apple Pay on the Web, domain registration | Free | Apple Pay API `RegisterDomain` [Spec] | <ul><li>For platforms activating many seller domains at once</li></ul> | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Cash | No fee | Payments API, source `CASH` | <ul><li>Records the payment only</li></ul> | [Cash payments](https://developer.squareup.com/docs/payments-api/take-payments/cash-payments) |
| Checks, bank transfers and other money received outside Square | No fee | Payments API, source `EXTERNAL`, with a type such as `CHECK` or `BANK_TRANSFER` | <ul><li>Mobile Payments SDK Android 2.6.0 removed its own way to record these</li></ul> | [External payments](https://developer.squareup.com/docs/payments-api/take-payments/external-payments); [Android releases](https://github.com/square/mobile-payments-sdk-android/releases) |
| Bitcoin (Lightning) | 0% through 2026-12-31, then 1% | None found | <ul><li>See the bitcoin section</li></ul> | [Help 8622](https://squareup.com/help/us/en/article/8622-accept-and-manage-bitcoin-payments) |
| EBT / SNAP | Fee not found; requires an active USDA FNS number | None found | <ul><li>Open beta since 2026-07-30</li><li>Not available offline</li></ul> | [Release notes, July 30](https://squareup.com/us/en/release-notes/release-notes-july-30th) |
| HSA / FSA cards | Licensed health-care providers only [3P] | — | <ul><li>Not relevant to detailing</li></ul> | [Synder](https://synder.com/blog/what-credit-cards-can-square-accept/) |
| Klarna, PayPal, Venmo | Not supported | — | <ul><li>Square's buy-now-pay-later product is Afterpay</li></ul> | [Square Community](https://community.squareup.com/t5/Payments-Troubleshooting/PayPal-Venmo/td-p/789631) |
| QR "scan to pay" inside POS | Not found (gap) | — | <ul><li>Needs checking</li></ul> | — |

### Checkout features: card holds, tips, refunds and surcharges

**Most checkout behaviors exist both in Square's apps and in the public APIs.** The newest items, all dated 2026, are:

- US credit-card surcharging
- automatic service charges
- tip-splitting rules
- refunds without an original sale
- 3D Secure on large invoice payments

**Two exceptions:** surcharging and offline mode are mostly closed to custom apps.

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| Tips (on device, preset amounts, on payment links) | Free | <ul><li>Terminal API `allow_tipping` / `tip_money`</li><li>Payments API `tip_money`: `amount_money` excludes the tip and `total_money` includes it</li><li>Checkout API `TipSettings`</li></ul> | <ul><li>The Terminal API has no "tip before payment" screen (open request, Oct 2026) [C]</li></ul> | [Terminal API features](https://developer.squareup.com/docs/terminal-api/additional-payment-checkout-features); [Dev forum](https://developer.squareup.com/forums/t/feature-request-tip-screen-before-payment-for-terminal-api-checkouts/28139) |
| Changing the amount or tip after authorization | Free | UpdatePayment, before capture | — | [Terminal API features](https://developer.squareup.com/docs/terminal-api/additional-payment-checkout-features) |
| Gratuity rules (2026-07-16) | Not stated | None found | <ul><li>Only the release title was seen</li></ul> | [Release notes, July 16](https://squareup.com/us/en/release-notes/release-notes-july-16th) |
| Tips not assigned to anyone split equally across staff clocked in that day (2026-10-20) | Not stated | None | — | [Feature Log](https://squareup.com/us/en/feature-log) |
| Signature capture | Free | Terminal API `collect_signature` | <ul><li>US and Canada only</li><li>API version 2022-04-20 or later</li></ul> | [Terminal API features](https://developer.squareup.com/docs/terminal-api/additional-payment-checkout-features) |
| Card holds / delayed capture | Free | <ul><li>Payments API: set `autocomplete=false`, then CompletePayment or CancelPayment</li><li>`delay_duration` (minimum 1 minute)</li><li>`delay_action`: CANCEL or COMPLETE</li><li>`version_token`</li></ul> | <ul><li>Default hold window: 36 hours card-present; 7 days card-not-present, including cards on file</li></ul> | [Delayed capture](https://developer.squareup.com/docs/payments-api/take-payments/card-payments/delayed-capture) |
| Voids | Free | CancelPayment; CancelPaymentByIdempotencyKey for create calls that timed out | <ul><li>The legacy Transactions void was removed 2026-09-16</li></ul> | [Spec history](https://github.com/square/connect-api-specification/commits/master/api.json) |
| Full and partial refunds | Whether Square returns its fee on a refund: not found | Refunds API: RefundPayment, ListPaymentRefunds, GetPaymentRefund | <ul><li>Only COMPLETED payments can be refunded, and never more than was collected</li><li>The refund stays PENDING until funds are secured, then becomes FAILED if they can't be; FAILED blocks further refunds</li><li>Square debits the bank if the balance is short</li></ul> | [Refund payments](https://developer.squareup.com/docs/payments-api/refund-payments) |
| Refunds without an original sale | In Square POS since 2026-09-21 | Refunds API "unlinked refunds" (destination `EXTERNAL`) | <ul><li>The seller must be authorized for unlinked refunds</li></ul> | [Unlinked refunds](https://developer.squareup.com/docs/refunds-api/unlinked-refunds); [Feature Log](https://squareup.com/us/en/feature-log) |
| Split tender (gift card plus card) | Free | Payments API; `accept_partial_authorization` for gift cards | <ul><li>Minimum for US ACH: $0.01</li></ul> | [Take payments](https://developer.squareup.com/docs/payments-api/take-payments) |
| Credit-card surcharging | Free feature; US only | <ul><li>Terminal API surcharge field and Payments API surcharge reporting (2026-01-22)</li><li>The Terminal "auto card surcharge (Beta)" flag is reported never to apply [C]</li></ul> | <ul><li>**Where it works:** Square POS in-person sales and Square Invoices on the web</li><li>**Where it doesn't:** Connected Terminal, Virtual Terminal, Square Online, Kiosk</li><li>**Cards:** credit only, not debit, ACH, tips or split tender</li><li>**Banned in:** Connecticut, Maine and Puerto Rico</li><li>**Notice:** Visa and Mastercard require 30 days</li><li>**Bar tabs:** added April 2026</li><li>**Invoices:** automatic surcharge on full-balance payments dated 2026-11-02</li></ul> | [Surcharge help](https://square.site/help/us/en/article/8596-set-up-and-manage-card-surcharges); [Changelog 2026-01-22](https://developer.squareup.com/docs/changelog/connect-logs/2026-01-22); [Dev forum](https://developer.squareup.com/forums/t/terminal-api-auto-card-surcharge-beta-never-applies-enrollment-path-for-connected-terminal/26787) |
| Service charges (percentage or amount); automatic service charges in the POS cart (2026-10-05, US and Canada) | Free | Orders API service charges | <ul><li>Square has no cash-discount program [C]</li></ul> | [Feature Log](https://squareup.com/us/en/feature-log); [Community](https://community.squareup.com/t5/Payments-Troubleshooting/Is-it-possible-to-pass-on-Square-s-fees-to-customers/m-p/75540) |
| Application (platform) fees | — | Payments API `app_fee_money` (up to 90%), `app_fee_allocations` | <ul><li>See the developer platform section</li></ul> | [Collect application fees](https://developer.squareup.com/docs/payments-api/take-payments-and-collect-fees) |
| 3D Secure / Strong Customer Authentication (SCA) | Free | Web Payments SDK `verifyBuyer()` returns a `verification_token`; verification is moving into `Card.tokenize()` | <ul><li>Triggered by regulation or a Risk Manager rule</li><li>New 3DS step on larger invoice payments with a new card (2026-10-20)</li></ul> | [SCA overview](https://developer.squareup.com/docs/sca-overview); [Take a card payment](https://developer.squareup.com/docs/web-payments/take-card-payment) |
| Offline mode | Free; on by default since 2026-04-12; seller sets a per-payment cap of $1–$50,000 | <ul><li>Mobile Payments SDK offline mode: seller opt-in; 1,000 payments per device per 24 hours</li><li>`offline_payment_details` on CreatePayment is for Square's own apps only [Spec]</li></ul> | <ul><li>Reader and Stand must reconnect within 24 hours</li><li>Register, Terminal and Handheld must upload within 72 hours or the payments expire</li><li>Not available for Tap to Pay, keyed cards, Afterpay, Cash App Pay, gift cards or EBT</li></ul> | [Offline help](https://squareup.com/help/us/en/article/7777-process-card-payments-with-offline-mode); [MP SDK offline](https://developer.squareup.com/docs/mobile-payments-sdk/android/offline-payments) |
| Digital and printed receipts | Free | Whether the Payment object carries `receipt_url` / `receipt_number`: UNCONFIRMED | <ul><li>Receipt content not researched</li></ul> | — |
| Payment requests by text or email | 3.3% + 30¢ | Checkout API links, sent through your own SMS or email | — | [Fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees) |
| Customer-facing display | Register has a dual screen [3P] | None | <ul><li>Display modes on Terminal and Handheld unconfirmed</li></ul> | [Business News Daily](https://www.businessnewsdaily.com/square-review) |

### Payouts: free next day, 1.95% instant, read-only by API

**Standard next-business-day transfers are free**, and every seller starts on that schedule ([Transfer options, help 3807](https://squareup.com/help/us/en/article/3807-deposit-options-with-square)).

**Same-day and instant transfers cost a percentage of each transfer**, on top of processing fees:

- **1.95%** on Square's newer official pages ([Instant transfers](https://squareup.com/us/en/payments/instant-transfers)).
- **1.75%** on other official pages. The fee history runs 1.5%, then 1.75%, then 1.95% ([Policy and pricing updates](https://squareup.com/us/en/press/policy-and-pricing-updates); [Help 5405](https://square.com/help/us/en/article/5405-set-up-and-manage-instant-deposits)).
- **1.5% with a $0.25 minimum and a $15 cap**, according to one May 2026 review (UNCONFIRMED) ([Merchant Maverick](https://www.merchantmaverick.com/square-instant-deposit-work/)).

**No public API can start a transfer** ([Spec](https://github.com/square/connect-api-specification/blob/master/api.json)). The 2026-05-20 spec added a `PAYOUTS_WRITE` scope described as "schedule a payout", but no endpoint uses it.

| Feature | Price | Public API | Notes | Sources |
|---|---|---|---|---|
| Standard transfer (next business day) | Free | Payouts API, read-only: ListPayouts, GetPayout, ListPayoutEntries | Every seller starts here | [Help 3807](https://squareup.com/help/us/en/article/3807-deposit-options-with-square) |
| Instant and same-day (close-of-day) transfers | 1.95% per transfer; CONFLICT with 1.75% and 1.5% (above) | None to start one | <ul><li>**Instant:** available 24/7; $25 minimum balance; $10,000 maximum per transfer</li><li>**Same-day:** $1 minimum; can be set per weekday</li><li>New sellers may face a $2,000 daily limit (UNCONFIRMED)</li></ul> | [Help 5405](https://square.com/help/us/en/article/5405-set-up-and-manage-instant-deposits); [Help 3807](https://squareup.com/help/us/en/article/3807-deposit-options-with-square) |
| Transfer to Square Checking | Free and instant | Payouts shows the transfers | Opening Checking may stop automatic transfers to the external bank for that location [C] | [Checking transfers, help 7604](https://squareup.com/help/us/en/article/7604-square-checking-transfers); [Community](https://community.squareup.com/t5/Banking-With-Square/Keep-transfers-to-linked-bank-account-not-square-checking/td-p/357548) |
| Linked debit card as the destination | Instant and same-day fees apply; adding money from the card is free | None | — | [Help 7604](https://squareup.com/help/us/en/article/7604-square-checking-transfers) |
| Several bank accounts, one per location | Free | <ul><li>**Bank Accounts API (GA):** List, Get, GetByV1Id</li><li>**Beta since 2026-05-20:** CreateBankAccount, DisableBankAccount [Spec]</li></ul> | One linked account per location at a time | [Help 3896](https://squareup.com/help/us/en/article/3896-link-and-edit-your-bank-account); [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Line items in each payout (charges, refunds, fees, deposit fees; gross, fee and net) | Free | ListPayoutEntries; `fee_amount_money` on each entry | <ul><li>No summary totals; you add them up yourself [C]</li><li>Instant-transfer fees reported missing from the API (old post) [C]</li></ul> | [Payouts API](https://developer.squareup.com/docs/payouts-api/overview); [Dev forum](https://developer.squareup.com/forums/t/square-payout-unclear-and-missing-instant-transfer-fees-in-api/13716) |
| Payout notifications | — | Webhooks `payout.sent`, `payout.paid`, `payout.failed` [Spec] | Require `PAYOUTS_READ` or `SETTLEMENTS_READ` | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |

### Risk and disputes: no chargeback fee, and no API for Risk Manager

**Square charges no dispute fee**, where other processors charge $10 to $25. When a dispute opens, Square holds the disputed amount right away. If the seller loses, Square keeps its processing fee ([Payment disputes](https://squareup.com/help/us/en/article/3882-payment-disputes-walkthrough)).

**Chargeback Protection is gone in the US.** It once covered losses of up to $250 a month. Australia still sells it ([Community announcement](https://community.squareup.com/t5/Your-Square-Account-Information/Important-update-about-Chargeback-Protection/td-p/124986); [AU Chargeback Protection](https://squareup.com/au/en/payments/chargeback-protection)).

| Feature | Price | Public API | Notes | Sources |
|---|---|---|---|---|
| Disputes and chargebacks | No dispute fee | Disputes API: List, Retrieve, Accept, evidence List/Create file/Create text/Retrieve/Delete, SubmitEvidence (9 operations) | <ul><li>**Text evidence:** up to 500 characters</li><li>**File evidence:** PDF, JPEG, PNG, TIFF or HEIF, up to 5 MB</li><li>Evidence cannot be changed after submitting</li><li>Accepting a dispute pays it out of the Square balance</li></ul> | [Disputes process](https://developer.squareup.com/docs/disputes-api/process-disputes) |
| Chargeback Protection | Retired in the US | None | — | (above) |
| Risk Manager | Free; a paid premium tier is "being explored" | None (Dashboard only) | <ul><li>**Actions:** alert, force 3DS, decline. Precedence: 3DS, then decline, then alert</li><li>**Conditions:** address verification (AVS), card security code (CVV), Square's risk level, buyer IP country, amount</li><li>An older Australian article described a fee after a 90-day trial [O-old]</li></ul> | [Risk Manager (UK page)](https://squareup.com/gb/en/payments/risk-manager); [Risk Manager 3DS help](https://squareup.com/help/gb/en/article/7623-risk-manager-3d-secure-3ds) |
| Rolling reserves | — | None | <ul><li>Reviewed after at least 6 months</li><li>Triggers include prepayment for goods or services and high chargeback rates</li></ul> | [Reserves FAQ](https://squareup.com/help/us/en/article/6832-reserves-faq) |
| Card-network dispute and fraud monitoring programs | — | None | Square documents the networks' programs | [Monitoring programs](https://api.squareup.com/help/us/en/article/7580-high-dispute-chargeback-and-fraud-monitoring-programs) |
| PCI compliance | Free | — | — | [Processing fees explained](https://squareup.com/us/en/the-bottom-line/managing-your-finances/credit-card-processing-fees-and-rates) |

**Reserve risk for a prepaid service business.** Taking deposits far ahead of service is one of Square's listed reserve triggers. A detailing business that collects deposits weeks ahead should keep that in mind.

**Keep evidence for card-on-file charges.** When the app charges a card on file without the customer present, the seller carries the full chargeback risk. Signed authorizations and job photos are the evidence to upload through the Disputes API.

### Hardware: from a free phone tap to a $1,999 AI kiosk

| Item | US price | Launch / status | Reachable from a custom app | Sources |
|---|---|---|---|---|
| Square Reader (contactless and chip) | $59 | Current | Mobile Payments SDK | [Square hardware](https://squareup.com/us/en/hardware) |
| Magstripe reader | First free, $10 each additional [3P] | Current | Mobile Payments SDK | [NerdWallet](https://www.nerdwallet.com/business/software/reviews/square-pos) |
| Square Stand (USB-C) | $149, or $14/mo × 12 | Current | Mobile Payments SDK | [Square Stand](https://squareup.com/us/en/hardware/stand) |
| Square Stand Mount | $149 [3P] | Current | — | [NerdWallet](https://www.nerdwallet.com/business/software/reviews/square-pos) |
| Square Terminal | $299, or $27/mo × 12 | Current | Terminal API | [Square hardware](https://squareup.com/us/en/hardware) |
| Square Handheld | $399, or $37/mo × 12 | 2025-05-13; Belkin cases from $39 | UNCONFIRMED | [Square press](https://squareup.com/us/en/press/square-handheld); [TechRadar](https://www.techradar.com/pro/square-launches-new-portable-point-of-sale-handheld-device-thats-barely-bigger-than-a-smartphone-and-theres-even-a-16-megapixel-camera) |
| Square Register (2nd gen) | $899 | 2026-02-04; up to 40% faster than before; IP54; angled, reinforced card slot | None | [Register](https://squareup.com/us/en/hardware/register); [Business Wire](https://www.businesswire.com/news/home/20260204804070/en/Second-Generation-Square-Register-Delivers-More-Speed-Power-and-Reliability-to-the-Neighborhood) |
| Square Register (1st gen) | $799 [O-old] | Replaced by 2nd gen | None | [POS cost guide 2025](https://squareup.com/us/en/the-bottom-line/operating-your-business/pos-system-cost) |
| Register Kit (with cash drawer and printer) | From $1,189 | Current | — | [POS kits](https://squareup.com/shop/hardware/us/en/pos-kits) |
| Square Kiosk (AI) | $1,999 with counter stand, plus $99/mo per device; requires Plus or Premium | 2026-10-14 | None | [Investing.com](https://www.investing.com/news/company-news/square-launches-aipowered-kiosk-with-voice-ordering-for-1999-93CH-4949752) |
| Older iPad kiosk, now "Kiosk Lite" on a Square Stand | $149 plus an app fee of "$50 or $30 a month" [3P, pre-launch] | Announced 2024-04-23 | None | [Maple blog](https://maple.inc/blog/square-kiosk); [Press archive](https://squareup.com/us/en/press/archive) |
| iPad restaurant setup (iPad not included) | About $689 [3P] | — | — | [NerdWallet restaurants](https://www.nerdwallet.com/business/software/reviews/square-for-restaurants) |
| Receipt printers | $200–$350 [3P] | — | — | [UpMenu](https://www.upmenu.com/blog/square-pricing/) |
| Cash drawers, kitchen printers, barcode scanners, kitchen display system, Terminal hub, Handheld dock | Not found | — | — | — |
| Hardware financing | See below | — | — | [Lone Star Payment](https://lonestarpayment.com/square-hardware.html); [Community](https://community.squareup.com/t5/Questions-How-To/How-to-apply-for-hardware-financing/m-p/129964/highlight/true) |
| Leasing | No Square leasing found | — | — | — |

**Hardware financing terms:**

- **Implied rate:** the 12-month prices work out to about 15% APR. For example, $299 at 15% over 12 months is about $26.99 a month (this report's arithmetic).
- **Third-party terms:** carts of $49–$10,000, 3–24 months, 15% APR (UNCONFIRMED).
- **States excluded:** an old [C] post says financing wasn't offered in AL, DE, MS, MO, NH or TN.
- **Australia:** financing there is interest-free.

**What a mobile detailer needs.** The practical in-field hardware is Tap to Pay (free), the $59 Reader, or the $399 Handheld. Of these, only Tap to Pay and the Reader are confirmed to work inside a custom app through the Mobile Payments SDK.

## Running jobs: invoices and bookings have APIs, estimates and travel time do not

**Square markets itself to service businesses.** It runs US pages for Home & Repair, Contractors and Automotive. The contractor page promises sellers can "create estimates, schedule workers, track jobs in real time, and send invoices" ([Square: Contractors](https://squareup.com/us/en/services/contractors); [Square: Automotive](https://squareup.com/us/en/services/automotive)). Its Australian and Canadian automotive pages name car washes and detailing directly ([Square AU: Automotive](https://squareup.com/au/en/solutions/automotive)).

**No source shows a field-dispatch layer behind that pitch.** Square has none of the following ([Community: travel time](https://community.squareup.com/t5/Payments-Troubleshooting/Appointment-apply-a-quot-travel-time-quot-buffer-between/td-p/207920); [Community: service area](https://community.squareup.com/t5/Appointments-Bookings/Mobile-business-How-to-add-or-edit-service-area/m-p/737208); [GoodCall](https://www.goodcall.com/appointment-scheduling-software/auto-detailing)):

- travel-time calculation
- service-area limits
- routing
- GPS tracking
- technician job status
- vehicle records
- inspection photos per stage

**The API boundary in this area:**

| Area | Public API? |
|---|---|
| Invoices | Yes, the Invoices API |
| Bookings | Yes, the Bookings API |
| Estimates | None |
| Contracts | None |
| Projects | None |
| Everything that makes a mobile schedule work | None |

### Invoices, estimates, contracts and projects

**Basic invoicing is free on every plan.** That covers unlimited invoices, estimates and contracts.

**The old Invoices Plus features now come with Square Plus or Premium.** Invoices Plus was once a $20/month standalone add-on ([Invoices Plus press](https://squareup.com/us/en/press/invoices-plus)). Its feature set:

- multi-option estimates
- automatic conversion of an accepted estimate into an invoice
- milestone payments
- custom fields
- templates
- batch sending

**The Invoices API covers invoices only.** It does not cover estimates, contracts or projects ([Invoices API overview](https://developer.squareup.com/docs/invoices-api/overview)).

**Premium features are checked by plan when the invoice is created.** If the seller lacks a qualifying plan, the request fails with BAD_REQUEST, and the app must strip the premium features and retry ([Invoices API overview](https://developer.squareup.com/docs/invoices-api/overview); [Dev forum](https://developer.squareup.com/forums/t/issue-with-square-invoices-api-bad-request-error-when-adding-custom-fields/21446)).

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| Create and send invoices (Dashboard, Square Invoices app, POS) | Free, unlimited | Invoices API: CreateInvoice, UpdateInvoice, PublishInvoice, GetInvoice, ListInvoices, SearchInvoices, CancelInvoice, DeleteInvoice [Spec] | <ul><li>Works only with orders created through the Orders API</li><li>Square hosts the payment page and emails it</li></ul> | [Help 8387](https://squareup.com/help/us/en/article/8387-create-and-send-invoices); [Invoices API](https://developer.squareup.com/docs/invoices-api/overview) |
| Collecting payment on an invoice | — | **No API to pay an invoice or mark it paid** | Payment happens on Square's hosted page or by autopay | [Pay/refund invoices](https://developer.squareup.com/docs/invoices-api/pay-refund-invoices) |
| Deposit plus balance | Free; a deposit alone needs no paid tier [C] | `payment_requests` of type DEPOSIT and BALANCE | Each deposit is charged at the card rate | [Community](https://community.squareup.com/t5/Questions-How-To/Collect-partial-payment-on-an-invoice/m-p/166441); [Create and publish](https://developer.squareup.com/docs/invoices-api/create-publish-invoices) |
| Milestones / installments | Plus, Premium or legacy Invoices Plus | INSTALLMENT requests | <ul><li>A DEPOSIT followed by 2–12 installments; at most 13 payment requests; percentages must add to 100</li><li>The spec names only "Invoices Plus". Whether Square Plus passes the API check is UNCONFIRMED; Square's help pages treat them as equivalent</li><li>ACH had to be off for milestones [C, old]</li></ul> | [InvoicePaymentRequest](https://developer.squareup.com/reference/square/objects/InvoicePaymentRequest); [Help 6581](https://squareup.com/help/us/en/article/6581-request-deposits-with-square-invoices) |
| Custom fields | Plus, Premium or legacy Invoices Plus | Up to 2 per invoice; BAD_REQUEST without a plan | Once created, an invoice keeps its premium features for life | [Invoice object](https://developer.squareup.com/reference/square/objects/Invoice) |
| Batch sending | Plus, Premium or legacy Invoices Plus | None | — | [Help 8387](https://api.squareup.com/help/us/en/article/8387-create-and-send-invoices) |
| Reusable custom templates | Paid tier | None | — | [Invoices Plus press](https://squareup.com/us/en/press/invoices-plus) |
| Recurring invoices | Free [3P] | No endpoint for a recurring series | Use the Subscriptions API instead; each bill creates an invoice | [FitSmallBusiness](https://fitsmallbusiness.com/square-invoice-review/) |
| Scheduled sending | — | `scheduled_at` | — | [Create and publish](https://developer.squareup.com/docs/invoices-api/create-publish-invoices) |
| Autopay from a card on file | — | `automatic_payment_source = CARD_ON_FILE` plus a `card_id` from the Cards API | If the charge fails, every payment request on the invoice reverts to NONE | [Create and publish](https://developer.squareup.com/docs/invoices-api/create-publish-invoices) |
| Accepted payment methods: card, ACH, Cash App Pay, Afterpay | Rates in the money-in section | `accepted_payment_methods` | Afterpay (`buy_now_pay_later`) is allowed only with a single BALANCE request | [InvoiceAcceptedPaymentMethods](https://developer.squareup.com/reference/square/objects/InvoiceAcceptedPaymentMethods) |
| Attachments | — | CreateInvoiceAttachment and DeleteInvoiceAttachment (file uploads) | Attachment details on the invoice are read-only | [Invoice object](https://developer.squareup.com/reference/square/objects/Invoice) |
| Sending invoices by SMS | — | The SMS delivery values exist in the spec but **cannot be set through the Invoices API** | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Card surcharges on invoices | Free (US) | None | Automatic surcharge on full-balance payments dated 2026-11-02 | [Feature Log](https://squareup.com/us/en/feature-log) |
| 3D Secure on larger payments with a new card | — | Automatic | Added 2026-10-20 | [Feature Log](https://squareup.com/us/en/feature-log) |
| Reminders, tips on invoices, branding, read tracking | Tiers UNCONFIRMED | Not confirmed | Research gap | — |
| Estimates | Free | **None** | Created in the Square Invoices app or POS Services mode | [Help 7215](https://squareup.com/help/us/en/article/7215-create-an-estimate-online); [Square: Estimates](https://squareup.com/us/en/invoices/features/estimates) |
| Multi-option ("package") estimates, 2–9 packages | Paid tier | None | The customer picks one | [Invoices Plus press](https://squareup.com/us/en/press/invoices-plus) |
| Auto-convert an accepted estimate into an invoice | Paid tier | None | — | [Square: Estimates](https://squareup.com/us/en/invoices/features/estimates) |
| Contracts attached to invoices or estimates (checkboxes, text, questions) | Free; "custom contract fields" listed under Premium on the Appointments pricing page | None | — | [Help 7202](https://squareup.com/help/gb/en/article/7202-attach-a-contract-to-your-invoices-or-estimates-online); [Appointments pricing](https://squareup.com/us/en/appointments/pricing) |
| Projects (contracts, estimates, invoices and timelines in one place) | CONFLICT: free per [3P], but the help-article URL reads "create-projects-with-square-invoices-plus" | None | — | [Project management](https://squareup.com/us/en/invoices/features/project-management); [Help 7677](https://my.squareup.com/help/us/en/article/7677-create-projects-with-square-invoices-plus) |
| Invoices Plus (legacy standalone) | $20/mo with 30-day trial (2021) [O-old] | — | Replaced by Plus/Premium | [TechCrunch 2021](https://techcrunch.com/2021/08/30/square-to-launch-a-new-paid-subscription-invoices-plus) |
| Invoice events | — | Webhooks `invoice.created`, `.updated`, `.published`, `.canceled`, `.deleted`, `.payment_made`, `.refunded`, `.scheduled_charge_failed` [Spec] | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |

### Appointments

**Free includes a booking calendar, an online booking site and reminders.** Square's pricing page is reported to list unlimited staff calendars, but one review says Free is limited to one user (CONFLICT) ([Koalendar](https://koalendar.com/blog/square-appointments-pricing)).

**What the paid tiers add** ([Appointments pricing](https://squareup.com/us/en/appointments/pricing); [FitSmallBusiness](https://fitsmallbusiness.com/square-appointments-review/)):

- **Plus ($49 per location):** no-show fees, waitlist and multi-staff booking.
- **Premium ($149 per location):** resource booking, Advanced Access, rostering, custom commissions and custom contract fields.

**Customer-location appointments exist, but Square adds no travel logic.** A seller can book appointments at the customer's address and store that address. Square does not add:

- drive time
- a service-area or ZIP-code gate
- a buffer before the first job

**Square's own moderator suggests a workaround.** It is "Block Extra Time", which only adds time *after* a service ([Help 5351](https://squareup.com/help/us/en/article/5351-manage-your-square-appointments-account-settings); [Community: travel time](https://community.squareup.com/t5/Payments-Troubleshooting/Appointment-apply-a-quot-travel-time-quot-buffer-between/td-p/207920)).

**The API gate for business-side bookings.** The Bookings API lets the business create, update or cancel any booking ("seller-level" writes) only if the seller pays for **Appointments Plus or Premium**. Otherwise those calls return 403. Customer-side ("buyer-level") access works on every plan ([Bookings API](https://developer.squareup.com/docs/bookings-api/what-it-is); [Spec](https://github.com/square/connect-api-specification/blob/master/api.json)).

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| Booking calendar, staff calendars, online booking site, reminders | Free | Bookings API: Create/Retrieve/Update/Cancel/List/BulkRetrieve bookings, SearchAvailability, booking profiles (13 operations, GA) [Spec] | Free limited to 1 user per one review (CONFLICT) | [Koalendar](https://koalendar.com/blog/square-appointments-pricing) |
| Plus / Premium prices | $49 / $149 per location | — | Legacy $29 / $69 [3P]; one regional page showed $40 / $90 | [Appointments pricing](https://squareup.com/us/en/appointments/pricing); [Koalendar](https://koalendar.com/blog/square-appointments-pricing) |
| Booking through Google Search, Google Maps and Instagram | Dashboard setting | None | — | [Help 5355](https://squareup.com/help/us/en/article/5355-set-up-online-booking-with-square-appointments) |
| Appointments at the customer's location | Free | `location_type = CUSTOMER_LOCATION` stores the `address` | <ul><li>Customers type their address at checkout</li><li>The business address still shows [C]</li><li>API bug: creates an empty location [C]</li></ul> | [Booking object](https://developer.squareup.com/reference/square/objects/Booking); [Community](https://community.squareup.com/t5/Appointments-Bookings/I-have-a-Mobile-Service-How-do-I-remove-my-business-address-from/m-p/673237) |
| Limiting bookings to a service area or ZIP codes | **Not offered** | — | Workaround: approve every request by hand and add a custom address field [C] | [Community](https://community.squareup.com/t5/Payments-Troubleshooting/Appointments-service-based-on-location-and-user-provided-info/m-p/726205) |
| Travel-time buffer | **Not offered.** "Block Extra Time" adds time only after an appointment and is reported to need Plus/Premium [3P competitor] | None | Does not cover the drive to the first job | [CalMov](https://www.calmov.com/resources/add-travel-time-in-square-appointments) |
| No-show protection, cancellation fees, prepayment | Plus [3P] | None for setup | <ul><li>Card held for up to 14 days, not saved on file</li><li>Fee can be flat, per service or a percentage</li><li>No pre-authorization or security deposit [C, old]</li></ul> | [Help 5493](https://squareup.com/help/us/en/article/5493-set-a-custom-cancellation-policy-with-square-appointments) |
| Waitlist | Plus | None | Fills cancellations automatically | [Square GB waitlist](https://squareup.com/gb/en/appointments/features/waitlist-software) |
| Booking several staff at once | Plus | Each appointment segment carries a `team_member_id` | — | [FitSmallBusiness](https://fitsmallbusiness.com/square-appointments-review/) |
| Resource booking, Advanced Access, rostering, custom commissions, custom contract fields | Premium | None | — | [Appointments pricing](https://squareup.com/us/en/appointments/pricing) |
| Classes / group booking (capacity per time slot) | Tier UNCONFIRMED | None | API bug with `absent_at_location_ids` [C] | [Square GB Appointments](https://squareup.com/gb/en/appointments); [Dev forum](https://developer.squareup.com/forums/t/creating-a-new-class-adds-only-location-to-absent-at-location-ids-array/23909) |
| Intake forms and contracts at booking | Tier UNCONFIRMED | None | — | [Square GB Appointments](https://squareup.com/gb/en/appointments) |
| Two-way Google Calendar sync (1 month back to 2 years ahead) | Tier disputed | None | No native Outlook sync [C] | [AU sync page](https://squareup.com/au/en/appointments/features/google-calendar-sync); [Community](https://community.squareup.com/t5/Appointments-Bookings/I-need-my-Square-Appointment-to-integrate-an-Outlo-and-a/td-p/777398) |
| Square Assistant (automated text replies: confirm, cancel, reschedule) | Free; on by default | None | Text only; does not answer calls | [Square Assistant](https://squareup.com/us/en/appointments/scheduling-features/square-assistant) |
| Packages (prepaid service bundles) | Plus/Premium [C] | None | See the subscriptions section | [Help 8268](https://squareup.com/help/us/en/article/8268-create-and-manage-packages-with-square-appointments) |
| Custom fields on bookings (vehicle, gate code and so on) | — | Booking Custom Attributes API (11 operations, GA) [Spec] | Some accounts report access errors [C] | [Dev forum](https://developer.squareup.com/forums/t/unable-to-access-bookingcustomattributes-endpoints/22733) |
| Business-side booking writes ("seller-level") | **Appointments Plus or Premium required (403 otherwise)**; whether new Square Plus qualifies is UNCONFIRMED | Scopes `APPOINTMENTS_ALL_WRITE` + `APPOINTMENTS_WRITE` | `APPOINTMENTS_ALL_WRITE` allows double-booking | [Onboard to Appointments](https://developer.squareup.com/docs/bookings-api/onboard-to-the-api) |
| Customer-side booking writes ("buyer-level") | Every plan, including Free | Same endpoints, customer scope | — | [Bookings API](https://developer.squareup.com/docs/bookings-api/what-it-is) |
| Availability search | — | SearchAvailability: window of 24 hours to 31 days; filters by location, service variation and team member | — | [SearchAvailability](https://developer.squareup.com/reference/square/bookings-api/search-availability) |
| Business, location and team booking profiles | — | Read-only (`APPOINTMENTS_BUSINESS_SETTINGS_READ`) | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Square Go consumer booking app | Free; launched August 2023 for beauty and personal care; 2026 status unknown | None (bookings land in the Bookings API) | — | [Square Go press](https://squareup.com/us/en/press/square-go) |
| AI phone receptionist for bookings | Not offered by Square | — | See the Messages section | [Voka](https://vokaai.com/compare/best-ai-receptionist-for-square-appointments) |
| Booking events | — | Webhooks `booking.created`, `booking.updated`, plus booking custom-attribute events [Spec] | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |

### Square Online websites

**A Free-plan site is real but limited.** It runs on a square.site subdomain with a small Square ad in the footer ([All About Cookies](https://allaboutcookies.org/square-online-review)).

**Custom domains and the other site upgrades were paid.** Before the unified plans they needed Online Plus (legacy $29/mo) or Online Premium. Legacy subscribers can move to the new plans with a pro-rated refund ([Help 8657](https://squareup.com/help/us/en/article/8657-migrate-from-square-online-to-the-new-square-plans)).

**The only public website APIs are both in an early access program** ([Square Online APIs](https://developer.squareup.com/docs/online-api); [Snippets API](https://developer.squareup.com/docs/snippets-api/overview)):

- **Sites API:** a read-only list of sites.
- **Snippets API:** injects code into site pages.

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| Website / online store on square.site, with a footer ad | Free | Sites API `ListSites`: ID, title, domain, published status only; early access | — | [Sites API](https://developer.squareup.com/docs/sites-api/overview) |
| Online ordering (items and orders) | Free | Catalog API, Orders API | — | [Press release](https://squareup.com/us/en/press/unified-pricing-and-packaging) |
| Custom domain, no ads, advanced site stats, abandoned-cart emails, gift card support | Plus (was Online Plus, $29/mo) [3P] | None | — | [The Retail Exec](https://theretailexec.com/tools/square-pricing/) |
| Free domain for one year with a paid plan | UNCONFIRMED [3P] | — | — | [litextension](https://litextension.com/blog/square-online-store-review/) |
| Real-time shipping rates, product reviews | Premium (was Online Premium) [3P] | None | — | [The Retail Exec](https://theretailexec.com/tools/square-pricing/) |
| Custom code (pop-ups, tracking tags) | — | Snippets API: Upsert, Retrieve, Delete | Goes in the head of every page except checkout; early access; not in Sandbox | [Snippets API](https://developer.squareup.com/docs/snippets-api/overview) |
| Online checkout settings | — | Checkout API location and merchant settings (beta); `online_checkout.*` webhooks (beta) | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Customer accounts (order history, reorder, saved details) | Included | None | Customers sync into the Directory | [Help 7802](https://squareup.com/help/us/en/article/7802-customer-accounts-for-square-online) |
| AI website copy and item-description generators (Sept/Oct 2023) | Included | None | — | [Square AI tools press](https://squareup.com/us/en/press/square-ai-tools) |
| Photo Studio, AI photo backgrounds (2023; 50+ styles) | Status UNCONFIRMED | None | — | [WebsiteBuilderExpert](https://www.websitebuilderexpert.com/news/square-online-new-ai-features/) |
| Facebook/Instagram connection, Meta catalog sync, Facebook ads | Included | None | — | [Help 7887](https://squareup.com/help/us/en/article/7887-connect-square-online-with-meta-for-business) |
| Ordering through ChatGPT and Claude (2026-07-01) | No added fees; sellers enrolled automatically; US food and beverage sellers using Online Ordering only | None | Google/Gemini and Amazon Alexa+ described as in progress | [ChatGPT/Claude press](https://squareup.com/us/en/press/claude-chatgpt-integrations); [Business Wire](https://www.businesswire.com/news/home/20260701594157/en/Square-Introduces-New-ChatGPT-and-Claude-Integrations-Helping-Sellers-Reach-Customers-Through-AI-Powered-Discovery) |
| Blog, forms, SEO tools, pickup/delivery radius, "Book" page section, Instagram shop | Tiers UNCONFIRMED | None | Research gap | — |
| Weebly | Square announced its shutdown in 67 countries; the US is not affected | None | Publishing stopped about 2026-06-29; sites offline 2026-09-27; accounts close 2026-12-26 | [site.pro](https://site.pro/Blog/Why-Weebly-Shuts-Down-in-67-Countries/) |

### Reports, analytics and Square's AI

**Every plan gets the Dashboard, standard reports, custom reports and CSV export.** "Advanced reporting" is marketed with Premium ([Help 6104](https://squareup.com/help/us/en/article/6104-creating-custom-reports-in-the-online-dashboard); [Help 5530](https://squareup.com/help/us/en/article/5530-advanced-reporting)).

**A new cube-based Reporting API is in open beta.** It sits outside the REST spec, and its status is disputed (see the developer section). This contradicts older notes that say Square has no reporting API, and it is the one exception to that rule ([Reporting API overview](https://developer.squareup.com/docs/reporting-api/overview)).

**Square's AI products have no public API.** They run in this order:

- **Square AI (2025):** a Dashboard question-and-answer assistant.
- **Managerbot (open beta from 2026-04-28):** an agent that proposes actions and waits for the seller's approval ([Managerbot press](https://squareup.com/us/en/press/managerbot-open-beta)).
- **Neither has a public API.**

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| Dashboard and standard reports: Sales Summary, Sales Trends, Payment Methods, Item Sales, Taxes, Fees, Service Charges, Balance/Transfers | Free | Reporting API (open beta), or compute from the Orders, Payments, Refunds and Payouts APIs | — | [Help 5072](https://squareup.com/help/us/en/article/5072-summaries-and-reports-from-the-online-dashboard); [Help 8360](https://squareup.com/help/us/en/article/8360-view-tax-fee-and-service-charge-reports) |
| Custom reports built from blocks | Free | — | Can be exported but not printed; not viewable in the POS app | [Help 6104](https://squareup.com/help/us/en/article/6104-creating-custom-reports-in-the-online-dashboard) |
| Summary or Detail CSV export; print; email | Free | — | — | [Help 8362](https://squareup.com/help/us/en/article/8362-print-export-or-email-your-reports) |
| Monthly and yearly emailed Sales Summary | Free | — | — | [Community](https://community.squareup.com/t5/New-to-Square/Reporting-Options-with-Square-FAQs/m-p/261192) |
| Advanced reporting | Premium; some sources say Plus (CONFLICT) | — | "Some advanced reports require paid subscriptions" | [Press release](https://squareup.com/us/en/press/unified-pricing-and-packaging); [Help 5530](https://squareup.com/help/us/en/article/5530-advanced-reporting) |
| Sales by team member; labor vs. sales | Advanced Access; Shifts Plus | None | — | [Team management](https://squareup.com/us/en/point-of-sale/team-management) |
| Square AI (natural-language questions about your own data) | Free beta for US sellers from 2025 (June per one source); owners and admins only; voice in the Dashboard mobile app since October 2025 | None | <ul><li>60% of questions are about business operations</li><li>Built partly on Square's purchase of Zenlytic [3P]</li></ul> | [Square AI open beta](https://squareup.com/us/en/press/square-ai-open-beta); [Yahoo Finance](https://finance.yahoo.com/news/blocks-square-adds-features-square-170900472.html); [Small Business Trends](https://smallbiztrends.com/square-integrates-zenlytics-ai-to-simplify-business-data-for-sellers/) |
| Managerbot (business agent; proposes actions for approval) | Free open beta from 2026-04-28; the press archive says 04-22 | None | <ul><li>Open to non-franchise US food and beverage, retail, and health and beauty sellers</li><li>Price after the beta not disclosed</li><li>Drafts staff schedules and flags catalog issues</li><li>A later beta orders from food distributors</li></ul> | [PYMNTS](https://www.pymnts.com/news/artificial-intelligence/2026/new-square-ai-agent-automates-daily-tasks-for-main-street-sellers/); [Shopifreaks](https://www.shopifreaks.com/square-opens-managerbot-ai-business-agent-to-broader-group-of-sellers-in-open-beta-inside-square-dashboard/) |
| "Moneybot" (Block AI finance and support feature) | Announced; scope unverified | None | — | [eMarketer](https://www.emarketer.com/content/block-announces-moneybot--wraparound-ai-support-feature-smb-owners) |
| AI voice ordering | Beta; no published price | None | See the Messages section | [Help 8568](https://squareup.com/help/us/en/article/8568-take-orders-with-ai-powered-voice-ordering) |
| Square MCP server (lets AI tools call Square's APIs) | Free | Wraps the public REST APIs | This is Square's only AI-facing developer product | [square-mcp-server](https://github.com/square/square-mcp-server) |

### Catalog and inventory

**The catalog and inventory are the most open part of Square.** Everything a detailer would store about services can be read and written through the Catalog API:

- services with variations (for example sedan, SUV, truck)
- add-on modifiers
- taxes and discounts
- appointment service items
- subscription plans

Sources: [Spec](https://github.com/square/connect-api-specification/blob/master/api.json); [CatalogTax](https://developer.squareup.com/reference/square/objects/CatalogTax).

**The paid inventory tools have only partial API coverage.** Purchase orders, forecasting and cost-of-goods reports have no API.

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| Items and services, variations, modifiers, categories, taxes, discounts, pricing rules, images, bookable service items, subscription plans | Free | Catalog API: 13 GA operations plus UpdateCatalogImage (beta); scopes `ITEMS_READ/WRITE`; webhook `catalog.version.updated` | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| AI-written item descriptions | Free | None | — | [Help 8335](https://squareup.com/help/us/en/article/8335-create-and-edit-items) |
| Nested modifiers (2026-07-16) | Not stated | API support UNCONFIRMED | — | [Release notes, July 16](https://squareup.com/us/en/release-notes/release-notes-july-16th) |
| Stock that updates with each sale; daily low-stock email; stock export | Free | Inventory API: 6 GA operations (BatchChangeInventory, BatchRetrieveInventoryCounts/Changes, RetrieveInventoryCount/Adjustment/PhysicalCount); webhook `inventory.count.updated` | — | [Inventory page](https://squareup.com/us/en/point-of-sale/features/inventory-management) |
| Inventory counts, purchase orders, auto-suggested purchase orders, smart stock forecasting, cost of goods sold, barcode labels, cycle counts | Plus | **None** for purchase orders, forecasting or cost of goods sold | Downgrading to Free loses these features | [Square vs Clover](https://squareup.com/us/en/compare/square-vs-clover); [CA retail pricing](https://squareup.com/ca/en/point-of-sale/retail/pricing) |
| Vendor (supplier) management | Plus | Vendors API (7 beta operations); `vendor.*` webhooks (beta) | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Transfer orders between locations; returns across locations | Premium [3P] | Transfer Orders API (8 beta operations, added 2025-10-16); `transfer_order.*` webhooks | — | [Spec history](https://github.com/square/connect-api-specification/commits/master/api.json) |
| Reasons for inventory adjustments | — | 6 beta operations plus UpdateInventoryAdjustment (2026-07-15) | — | [Spec history](https://github.com/square/connect-api-specification/commits/master/api.json) |
| Which sales channels each item is assigned to | — | Channels API (3 beta operations, read-only) | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Discount codes | — | Discount Codes API, by special request only | — | [Dev forum](https://developer.squareup.com/forums/t/request-for-discount-codes-api-access-square-vouchers/27905) |
| Square Restaurant Inventory, built with MarketMan (2026-04-02) | Not stated | None | — | [PYMNTS](https://www.pymnts.com/news/artificial-intelligence/2026/new-square-ai-agent-automates-daily-tasks-for-main-street-sellers/) |
| Barcode scanning with an Android phone camera (August 2026) | — | — | — | [Square Roadmap](https://squareup.com/us/en/roadmap) |
| Pairing a Square Terminal with another app (device codes) | — | Devices API | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Multi-location catalog, customer-facing display settings | Tiers UNCONFIRMED | None | — | — |

## Customers: the data is open, every conversation is closed

**Square's customer data has full APIs**, with read-write access (CRUD) and webhooks for:

- customer profiles
- custom fields
- groups
- cards on file
- loyalty accounts
- gift cards
- subscriptions

**Every way Square talks to customers is closed to custom apps.** None of these has an API:

- Marketing email and SMS
- the Messages inbox
- the business phone number
- voicemail
- Square Assistant
- AI voice ordering
- receipt feedback
- Google review requests
- Square Go
- Cash App Neighborhoods

Sources: [Spec](https://github.com/square/connect-api-specification/blob/master/api.json); [Dev forum: Messages API](https://developer.squareup.com/forums/t/square-messages-api/3411); [Dev forum: Marketing API](https://developer.squareup.com/forums/t/square-marketing-api-campaigns/8255).

### Customer Directory

**The Customer Directory is free on every plan** and is marketed as "free customer relationship management (CRM) software". A profile is created automatically after a sale ([Customer Directory](https://squareup.com/us/en/point-of-sale/features/customer-directory)).

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| Profiles: name, email, phone, address, birthday, company, nickname, `reference_id` | Free | Customers API: Create, Retrieve, Update, Delete, List, Search, plus 4 bulk endpoints (added 2024-02-22) [Spec] | <ul><li>Birthday year optional</li><li>`version` field prevents overwriting someone else's edit</li></ul> | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Note on the customer | Free | A single `note` string | Whether the Dashboard keeps several dated notes is UNCONFIRMED | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Custom fields (text, toggle, address, date) | Free | Customer Custom Attributes API: field definitions plus values, bulk upsert; up to 10 custom-field filters in SearchCustomers | Visibility levels and webhooks: owned, visible | [Help 5860](https://squareup.com/help/us/en/article/5860-creating-custom-fields-in-your-customer-directory) |
| Manual groups | Free | Customer Groups API (full CRUD); Customers API AddGroupToCustomer / RemoveGroupFromCustomer | — | [Help 6245](https://squareup.com/help/us/en/article/6245-manage-customer-groups-and-filters) |
| Smart groups / segments (Regulars, Lapsed, custom filters) | Free | **Customer Segments API, read-only** | Defined only in the Dashboard or POS | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Cards on file | Free to store; 3.5% + 15¢ to charge | Cards API: CreateCard, ListCards, RetrieveCard, DisableCard | The old Customers card endpoints are deprecated | [Gift card pricing table](https://squareup.com/us/en/gift-cards/pricing) |
| Purchase history, visit count, total spend | Free in the Dashboard | Not fields on the customer record | Compute from the Orders and Payments APIs by `customer_id` | [Customer Directory](https://squareup.com/us/en/point-of-sale/features/customer-directory) |
| CSV import and export | Free | Dashboard only (.CSV files only) | BulkCreateCustomers is the API alternative | [Help 5498](https://squareup.com/help/us/en/article/5498-manage-your-customer-directory-online) |
| Merging duplicates; duplicate suggestions | Free | **None** | <ul><li>Merges show up only as `creation_source = MERGE` plus webhooks</li><li>A merge cannot be undone</li></ul> | [Help 8401](https://squareup.com/help/us/en/article/8401-edit-merge-or-delete-customer-profiles) |
| Email marketing opt-out | Free | `preferences.email_unsubscribed` is the only preference field | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| SMS marketing consent | Part of Marketing | **None** | The app must keep its own texting-consent records (required by the TCPA, the US telemarketing law) | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| How a customer record was created (`creation_source`) | — | Values include APPOINTMENTS, FEEDBACK, INVOICES, LOYALTY, MARKETING, MERGE, ONLINE_STORE, TERMINAL, THIRD_PARTY | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Change notifications | — | Webhooks `customer.created/updated/deleted`; `customer.custom_attribute(_definition).owned/visible.*`; `card.created/updated/disabled/forgotten/automatically_updated` | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |

### Marketing (email and SMS)

**Square Marketing now comes only with Plus or Premium.** It is not included in Free. The bundled allowances are ([Square Marketing](https://squareup.com/us/en/marketing); [Square pricing](https://squareup.com/us/en/pricing)):

- **Plus:** unlimited email campaigns and **500 texts a month, then 3¢ each**.
- **Premium:** unlimited email campaigns and **2,500 texts a month, then 1.5¢ each**.
- The text allowance is per account, not per location.

**Square still shows an older standalone price list** ([Marketing pricing](https://squareup.com/us/en/software/marketing/pricing)):

- **Email:** priced by number of contacts, starting at $15 a month.
- **Texting:** $10 a month plus usage.

**There is no API for campaigns, automations, coupons or SMS sends.** The only marketing-related API field is the customer's email opt-out ([Spec](https://github.com/square/connect-api-specification/blob/master/api.json)).

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| Email campaigns (one-off, drag-and-drop builder) | <ul><li>Plus/Premium: unlimited sends</li><li>Legacy standalone: $15/mo up to 500 contacts, $30 for 501–1,000 … $90 for 4,001–9,000</li></ul> | **None** | Third-party price tiers disagree with Square's page | [Marketing pricing](https://squareup.com/us/en/software/marketing/pricing) |
| Text (SMS and picture-message MMS) campaigns | <ul><li>**Plus:** 500 texts/mo, then 3¢</li><li>**Premium:** 2,500/mo, then 1.5¢</li><li>An MMS counts as 3 texts; not available on Free</li><li>**Legacy:** $10/mo plus usage ($20 for 1–250, $25 for 251–500, $35 for 501–1,000, older)</li></ul> | **None** | One seller reported about 3× the expected text bill after moving to Premium [C] | [Square Marketing](https://squareup.com/us/en/marketing); [Community](https://community.squareup.com/t5/Customer-Engagement/Need-clarification-on-pricing-for-text-message-mar/td-p/369708) |
| Automated campaigns: welcome, birthday coupon, lapsed-customer win-back, abandoned cart | Plus/Premium | **None** | Square says 14% of lapsed customers return after a win-back email | [Square Marketing](https://squareup.com/us/en/marketing); [Bottom Line](https://squareup.com/us/en/the-bottom-line/reaching-customers/5-marketing-automation-examples-for-small-businesses-2) |
| AI "Generate content" button in the email builder (built on OpenAI) | Plus/Premium | **None** | — | [Help 8412](https://squareup.com/help/us/en/article/8412-create-marketing-campaigns); [Email marketing](https://squareup.com/us/en/software/marketing/email) |
| Coupons sent by email or text, with redemption tracking | Plus/Premium | **None**; payment links accept `enable_coupon` | A Square Online coupon placed in a campaign works online only | [Help 6922](https://squareup.com/help/us/en/article/6922-add-an-online-store-coupon-to-a-marketing-campaign) |
| Automated Google review requests | Plus/Premium; needs a Google Business Profile | **None** | See the feedback section | [Help 8418](https://squareup.com/help/us/en/article/8418-collect-google-reviews) |
| Facebook page posts, Facebook/Instagram ads, Meta catalog sync | Through Marketing and Square Online | **None** | No organic Instagram posting [C, old] | [Square pricing](https://squareup.com/us/en/pricing); [Live Q&A](https://community.squareup.com/t5/Archived-Discussions-Read-Only/Live-Q-amp-A-Ask-us-anything-about-Square-Marketing/m-p/137997) |
| Texts announcing loyalty promotions (4 AI templates) | Plus/Premium | **None** | — | [Community product update](https://community.squareup.com/t5/Product-Updates/-Square-Loyalty-promotions-AI/ba-p/720312) |
| Marketing reports beyond coupon redemptions (opens, clicks, attributed sales) | UNCONFIRMED | **None** | — | — |
| Campaigns to Cash App followers (Neighborhoods) | Free | **None** | A separate channel from Square Marketing | [Neighborhoods press](https://squareup.com/us/en/press/neighborhoods-by-cash-app) |

### Loyalty and Cash App Neighborhoods

**Square Loyalty comes with Plus and Premium.** It is not in Free ([Bottom Line: pricing plans](https://squareup.com/us/en/the-bottom-line/inside-square/pricing-plans); [tryloyaltycards](https://tryloyaltycards.com/blog/square-loyalty-program-cost)).

**The loyalty program must be set up in the Dashboard.** A seller can have only **one** program, "created and managed from the Seller Dashboard" ([Spec](https://github.com/square/connect-api-specification/blob/master/api.json)).

**Everything after setup works through the Loyalty API.** That includes accounts, points, rewards and promotions.

**Neighborhoods (October 2025) is a Cash App rewards network.** Customers earn "Local Cash" back. It is free to the seller while Cash App pays for it, and it has no API ([Neighborhoods press](https://squareup.com/us/en/press/neighborhoods-by-cash-app)).

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| Loyalty program setup: earn by visit, spend, item or category; reward tiers; points expiry; custom name for points | <ul><li>Plus/Premium; not Free</li><li>Legacy standalone priced per location by monthly "loyalty visits": US "from $45/mo" [3P]; Canada C$60/100/140; Ireland €39/65/90</li></ul> | RetrieveLoyaltyProgram only; the program is created in the Dashboard; ListLoyaltyPrograms is deprecated | After moving to Plus, a separately billed legacy Loyalty plan can be cancelled [C] | [Square CA Loyalty](https://squareup.com/ca/en/software/loyalty); [loop.fans](https://loop.fans/blog/square-loyalty-program-review); [Community](https://community.squareup.com/t5/Hardware-Setup-Troubleshooting/Can-I-cancel-my-legacy-Loyalty-plan-without-losing-features/td-p/823836) |
| Loyalty accounts (keyed by phone number), earning, adjusting and calculating points, activity history | Plus/Premium | Loyalty API (17 GA operations): Create/Search/Retrieve account, Accumulate/Adjust/Calculate points, SearchLoyaltyEvents; `loyalty.*` webhooks | The API requires the seller's Loyalty subscription | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Rewards | Plus/Premium | Create, Search, Retrieve, Redeem, Delete | Each reward's discount is defined by a catalog pricing rule | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Promotions (points multiplier or bonus points; up to 10 active) | Plus/Premium | Create, List, Retrieve, Cancel | The AI promotion templates are Dashboard-only | [Community product update](https://community.squareup.com/t5/Product-Updates/-Square-Loyalty-promotions-AI/ba-p/720312) |
| Loyalty at a checkout created through the API | — | Payment links `enable_loyalty` | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Automatic points-balance texts to members | [3P] | None | — | [tryloyaltycards](https://tryloyaltycards.com/blog/square-loyalty-program-cost) |
| Customer referral rewards | Not offered [3P] | — | — | [loop.fans](https://loop.fans/blog/square-loyalty-program-review) |
| Neighborhoods: follow on Cash App's map; Local Cash of 10% back, up to $10 per order; $5 bonus on a new customer's first purchase | <ul><li>Free to join; Cash App funds Local Cash for about 12 months</li><li>Reported 1% processing fee on orders from Cash App users [3P]</li></ul> | **None** | <ul><li>Added to Square Terminal in June 2026</li><li>30,000 sellers added in August 2026</li><li>Whether service businesses qualify is UNCONFIRMED</li></ul> | [Nasdaq / Business Wire](https://www.nasdaq.com/press-release/blocks-neighborhoods-adds-30000-more-sellers-square-and-cash-app-help-build-local); [Payments Dive](https://www.paymentsdive.com/news/building-blocks-square-base/828712/) |

### Gift cards

**eGift cards are free to set up, and the APIs cover the whole card lifecycle** ([Gift card pricing](https://squareup.com/us/en/gift-cards/pricing); [Spec](https://github.com/square/connect-api-specification/blob/master/api.json)):

- Each load or reload carries a fee of **up to 2.5%**, which **Premium waives**.
- Redemption is free, and cards do not expire.
- The Gift Cards API and Gift Card Activities API cover issuing, loading, redeeming, adjusting, blocking and linking cards to customers.

**Three parts are hosted by Square with no API:**

- the eGift storefront design
- ordering physical cards
- the balance-check page

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| eGift cards and Square's hosted order and reload page | <ul><li>Free setup</li><li>Load fee: 2.5% (0% on Premium)</li><li>Online purchase: 2.9% + 30¢ (an older help page says 3.3%)</li></ul> | Gift Cards API + Gift Card Activities API; the hosted page itself has no API | — | [Gift card pricing](https://squareup.com/us/en/gift-cards/pricing); [Help 6355](https://squareup.com/help/us/en/article/6355-send-an-egift-card) |
| Physical cards | CONFLICT between two extracts of the same page: starter packs $1.50, quick cards 65¢, custom 50¢; or quick $1.50, custom 65¢. Plus the 2.5% load fee | Gift Cards API (type PHYSICAL); use your own card numbers via `gan_source = OTHER` | — | [Gift card pricing](https://squareup.com/us/en/gift-cards/pricing) |
| Balance-check page (scan the QR code, or enter the 16-digit number and 4-digit PIN) | Free | The hosted page has no API; look up a balance with RetrieveGiftCardFromGAN | — | [Help 8405](https://squareup.com/help/us/en/article/8405-check-gift-card-balances) |
| Reloads; promo codes on purchase or reload | Free | Card activity through the API; promo codes have no API | — | [Help 8403](https://squareup.com/help/us/en/article/8403-reload-egift-cards) |
| Card activity types | — | ACTIVATE, LOAD, REDEEM, CLEAR_BALANCE, DEACTIVATE, ADJUST_INCREMENT, ADJUST_DECREMENT, REFUND, UNLINKED_ACTIVITY_REFUND, IMPORT, IMPORT_REVERSAL, BLOCK, UNBLOCK, TRANSFER_BALANCE_FROM, TRANSFER_BALANCE_TO | Webhooks: `gift_card.created`, `.updated`, `.customer_linked`, `.customer_unlinked`, `.activity.created`, `.activity.updated` | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Printable gift certificate templates | Free | — | — | [Templates](https://squareup.com/us/en/gift-cards/gift-certificate-templates) |
| Load fee on cards activated through the API | UNCONFIRMED; budget for 2.5% on Free and Plus | — | — | — |

### Subscriptions and packages (monthly maintenance plans)

**Square Subscriptions has no monthly fee**, and standard processing applies to each charge. In the Dashboard, a plan's price cannot be changed after creation, billing dates cannot be customized, and pickup cannot be added ([Help 7627](https://squareup.com/help/us/en/article/7627-get-started-with-subscriptions-in-dashboard)).

**Square says Subscriptions are meant for items, not booked services.** Moderators steer service businesses to **Packages** instead. Packages are prepaid and do not recur ([Community](https://community.squareup.com/t5/Appointments-Bookings/Subscriptions-In-Appointments/m-p/772924)).

**The Subscriptions API is Square's best building block for a detailing maintenance plan.** It can create, pause, swap and cancel subscriptions, run phased pricing, and create checkout links.

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| Square Subscriptions (item subscription plans) | No monthly fee; processing applies | <ul><li>**Subscriptions API (7 GA):** Create, Search, Retrieve, Update, Cancel, Resume, ListSubscriptionEvents</li><li>**Beta:** Pause, SwapPlan, BulkSwapPlan, ChangeBillingAnchorDate, DeleteSubscriptionAction</li><li>**Plans live in the Catalog** as `SUBSCRIPTION_PLAN` and `SUBSCRIPTION_PLAN_VARIATION`</li></ul> | Through the API, `price_override_money` or swapping plans works around the Dashboard's fixed-price rule (not tested) | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Billing cadences | — | DAILY, WEEKLY, EVERY_TWO_WEEKS, THIRTY_DAYS, SIXTY_DAYS, NINETY_DAYS, MONTHLY, EVERY_TWO_MONTHS, QUARTERLY, EVERY_FOUR_MONTHS, EVERY_SIX_MONTHS, ANNUAL, EVERY_TWO_YEARS | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Phased pricing (an intro price, then the regular price) | — | Phases with fixed (STATIC) or relative (RELATIVE) pricing | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Each bill creates an invoice; card on file | — | `invoice_ids`, `card_id`; webhooks `subscription.created/updated` and `invoice.scheduled_charge_failed` | Status values: PENDING, ACTIVE, CANCELED, DEACTIVATED, PAUSED, COMPLETED | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Hosted "subscribe" checkout | — | Payment links accept `subscription_plan_id` | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Packages (prepaid service bundles, applied automatically at checkout) | Plus/Premium [C] | **None** | <ul><li>Not recurring</li><li>Package contents and expiry can't be edited</li><li>No commission paid on package sales</li></ul> | [Help 8268](https://squareup.com/help/us/en/article/8268-create-and-manage-packages-with-square-appointments); [Help 8440](https://squareup.com/help/us/en/article/8440-sell-and-redeem-packages) |
| Memberships for service businesses | Not offered | — | No dedicated product found for 2025–2026 | — |

### Messages, the business phone number and voice AI

**Square Messages is a two-way text and email inbox.** Its tiers have changed:

- **Free:** reply only.
- **Messages Plus ($10 a month per location):** let sellers start conversations and get a dedicated number. That price predates October 2025.
- **Today:** each Plus or Premium location gets a **dedicated toll-free business number** ([Messages pricing](https://squareup.com/us/en/messages/pricing); [Help 8494](https://squareup.com/help/us/en/article/8494-set-up-and-manage-your-dedicated-business-number)).

**What the number can and cannot do:**

- **Can:** take inbound texts, take inbound calls to voicemail, and send missed-call notifications.
- **Cannot:** make outbound calls ([Online plans page](https://squareup.com/us/en/online-store/plans)).
- **Cannot (per users):** forward calls to another line ([Community](https://community.squareup.com/t5/Appointments-Bookings/Can-i-forward-the-Square-number-to-my-business-phone-number/td-p/798108)).

**No Square communication tool has an API.** That covers Messages, the phone number, voicemail, Square Assistant and voice ordering ([Spec](https://github.com/square/connect-api-specification/blob/master/api.json); [Dev forum](https://developer.squareup.com/forums/t/square-messages-api/3411)).

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| Messages inbox (two-way text and email) | <ul><li>Free: reply only</li><li>Messages Plus: $10/mo per location (page snapshot about August 2025)</li><li>Now included in paid plans; whether it is still sold separately is UNCONFIRMED</li></ul> | **None** | — | [Messages pricing](https://squareup.com/us/en/messages/pricing); [Community](https://community.squareup.com/t5/Payments-Troubleshooting/Anyone-else-annoyed-by-the-quot-Messages-Plus-quot-loss-of/m-p/681914) |
| Dedicated toll-free business number | Each paid-plan location; toll-free verification required | **None** | Claimed from the Messages inbox; needs an active subscription | [Help 8494](https://squareup.com/help/us/en/article/8494-set-up-and-manage-your-dedicated-business-number) |
| Inbound calls to voicemail; voicemail greeting; missed-call notifications | Comes with the number | **None** | Voicemail transcription UNCONFIRMED | [Help 8494](https://squareup.com/help/us/en/article/8494-set-up-and-manage-your-dedicated-business-number) |
| Outbound calling | **Not supported** | — | — | [Online plans page](https://squareup.com/us/en/online-store/plans) |
| Forwarding calls to another number | Not supported [C] | — | — | [Community](https://community.squareup.com/t5/Appointments-Bookings/Square-Messaging-mobile-numbers-for-voice-calls-is-not-ideal/td-p/763168) |
| Local (non-toll-free) number | UNCONFIRMED | — | — | — |
| Do Not Disturb auto-reply | Included | **None** | Fixed wording; can't be customized | [Messages pricing](https://squareup.com/us/en/messages/pricing) |
| Custom after-hours reply; AI replies to messages | **Not offered**; open feature requests | — | "Conversational AI" is listed on the Messages Plus tier but never explained | [Feature request](https://community.squareup.com/t5/Feature-Requests/Automated-custom-out-of-office-messages/idi-p/722635); [Feature request](https://community.squareup.com/t5/Feature-Requests/Respond-to-Square-messages-with-AI/idi-p/840457) |
| Square Assistant (texts that let customers confirm, cancel or reschedule) | Free; on by default; for Appointments and Messages users | **None** | Turning it off stops only its automatic replies; reminders continue | [Help 6731](https://squareup.com/help/us/en/article/6731-get-started-with-square-assistant-on-appointments); [Community](https://community.squareup.com/t5/Appointments-Bookings/If-I-turn-Square-Assistant-off/m-p/774754) |
| AI voice ordering (AI answers calls to the Square number) | Beta; no published price | **None** | <ul><li>Built for food and beverage pickup orders</li><li>Square says it is "not set up for … reservations and booking"</li><li>Works only with Square-provided numbers</li></ul> | [Help 8568](https://squareup.com/help/us/en/article/8568-take-orders-with-ai-powered-voice-ordering); [Community](https://community.squareup.com/t5/Feedback-Discussions/Voice-AI-Ordering-Initial-Setup-and-Feedback/m-p/830041) |
| AI receptionist for service bookings; automatic text-back after a missed call | **Not offered by Square** | n/a | Third-party add-ons cost $19–$138/mo (vendor claims) | [Voka](https://vokaai.com/compare/best-ai-receptionist-for-square-appointments); [App Marketplace: AI Receptionist](https://squareup.com/us/en/app-marketplace/app/ai-receptionist) |
| Sending invoices by SMS | — | Delivery values exist but can't be set through the API | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |

### Feedback, reviews, referrals and consumer apps

**Square collects private feedback through digital receipts and can ask customers for Google reviews.** The review requests are automatic and need Marketing. Square cannot publish reviews to Google or reply to them. Its referral program is for sellers recruiting other sellers, not for customers ([Help 5241](https://squareup.com/help/us/en/article/5241-get-started-with-square-feedback); [Help 8418](https://squareup.com/help/us/en/article/8418-collect-google-reviews); [Help 5209](https://squareup.com/help/us/en/article/5209-square-s-referral-program)).

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| Receipt feedback (smiley or sad face, a reason, a note; private; CSV export) | Free | **None**; only a `creation_source` value of FEEDBACK | Requests to make feedback public go unanswered | [Help 5241](https://squareup.com/help/us/en/article/5241-get-started-with-square-feedback) |
| Automatic Google review requests | Marketing (Plus/Premium); needs a Google Business Profile | **None** | <ul><li>Sent when a customer becomes a "regular" (3 purchases in a year) or leaves positive feedback</li><li>A stats page covers the last 4 weeks</li><li>Greyed out without Marketing [C]</li></ul> | [Help 8418](https://squareup.com/help/us/en/article/8418-collect-google-reviews); [Community](https://community.squareup.com/t5/Payments-Troubleshooting/Google-review-automation-grey-ed-out-on-Square/m-p/777833) |
| Publishing to Google, or managing and replying to reviews | **Not offered** | — | Workaround: put a Google review QR code in the receipt image | [Community](https://community.squareup.com/t5/Customer-Engagement/Can-Square-reviews-be-published-to-our-Google-profile/m-p/825905) |
| Reviews of individual staff after an appointment | Not offered | — | Sellers use Zapier | [Community](https://community.squareup.com/t5/Beauty-Wellness/Post-Appointment-Reviews-of-Service-Providers/m-p/833140) |
| Square Go consumer booking app | Free; August 2023; US iOS; beauty and personal care | **None** | <ul><li>Square claims 23% higher rebooking and 55% fewer no-shows</li><li>2026 status unknown</li></ul> | [Square Go press](https://squareup.com/us/en/press/square-go) |
| Square Online customer accounts | Included | **None** | — | [Help 7802](https://squareup.com/help/us/en/article/7802-customer-accounts-for-square-online) |
| Seller-to-seller referral program | Reward: free processing on up to $1,000 for 180 days, or $20 off a Reader | n/a | — | [Help 5209](https://squareup.com/help/us/en/article/5209-square-s-referral-program) |
| Customer referral program | **Not offered** | — | Sellers use third-party tools | [Community](https://community.squareup.com/t5/Online-Store/How-do-you-offer-referral-incentive-to-customers/m-p/787779) |
| Square restaurant ordering network inside Cash App | Food and beverage | **None** | — | [Payments Dive](https://www.paymentsdive.com/news/why-cash-app-wants-food-orders-square-merchants-dining/825040/) |

**Square's review trigger fits detailing poorly.** It waits for three purchases in a year, and a detailer's customers book infrequently. A post-job text that sends happy customers to Google is both buildable and a better fit.

## Back office: team data syncs out; payroll, banking and tax never do

**Square's back office splits into three groups:**

| Group | Products | API access |
|---|---|---|
| Staff records | Team members, wages, timecards, scheduled shifts | Public APIs exist, so a custom app can sync this data out |
| Money products | Payroll, Checking, Savings, Debit Card, Credit Card, Loans, Bill Pay, bitcoin, Form 1099-K | No public API; Dashboard only |
| Tax obligations | Filing sales tax, income tax and Oregon business taxes | Not offered at all |

**Square's Team and Labor APIs say they exist to feed outside payroll systems.** That is not the same as a payroll API, which does not exist ([Spec](https://github.com/square/connect-api-specification/blob/master/api.json); [Square Community](https://community.squareup.com/t5/Staff-Payroll/Do-you-have-payroll-api/m-p/663145)).

### Team, permissions, scheduling and time tracking

**Basic team management is free at any team size.** It includes:

- team member profiles
- one permission set for the whole team
- one wage per person
- clock in and out, and breaks
- basic scheduling
- the Square Team app

Source: [Team management](https://squareup.com/us/en/point-of-sale/team-management).

**There are two paid layers.** Neither layer can be confirmed as still sold on its own in late 2026.

| Paid layer | Price | Features |
|---|---|---|
| **Advanced Access** (the former Team Plus, renamed 2024-03-27) | $35 per location on an older page; the current page says "included with Square Plus or Premium" (CONFLICT) | Custom permission sets, multiple wages per person, sales reporting by team member |
| **Square Shifts Plus** | From $4 per team member per month; Shifts Free covers up to 5 people | Shift swaps, availability, geofenced clock-in, auto clock-out, labor-vs-sales report |

Sources: [Community: rename](https://community.squareup.com/t5/Product-Updates/Team-Plus-renamed-to-Advanced-Access/ba-p/718589); [Advanced Access](https://squareup.com/us/en/staff/advanced-access); [Shifts pricing](https://squareup.com/us/en/staff/shifts/pricing).

**Correction to a common belief:** Team Plus was never "formerly Square Shifts". The two products existed side by side ([Introducing Square Shifts](https://community.squareup.com/t5/Product-Updates/Introducing-Square-Shifts/ba-p/613383)).

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| Team member profiles; assignment to locations | Free, unlimited | Team API: Create, BulkCreate, BulkUpdate, Search, Retrieve, Update (GA) | <ul><li>No delete; set the member to INACTIVE instead</li><li>Location assignment: `ALL_CURRENT_AND_FUTURE_LOCATIONS` or `EXPLICIT_LOCATIONS`</li></ul> | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Jobs (job titles, whether the job earns tips) | Free | Jobs endpoints (beta since 2024-12-18) | A "job" here is a title, not a work order | [Spec history](https://github.com/square/connect-api-specification/commits/master/api.json) |
| One wage; hourly or salary; overtime-exempt flag | Free | WageSetting and JobAssignment: `pay_type`, `hourly_rate`, `annual_rate`, `weekly_hours`, `is_overtime_exempt` | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Several wages per person (a different rate per job) | Advanced Access | `WageSetting.job_assignments[]` | — | [Community](https://community.squareup.com/t5/Archived-Articles-Read-Only/Learn-How-to-Set-Up-Team-Permissions-with-Square/ba-p/350999) |
| Permission sets | <ul><li>One team-wide set (Free)</li><li>Two sets (Shifts or Retail Plus)</li><li>Unlimited custom sets (Advanced Access)</li></ul> | **None.** `PERMISSION_SETS` scopes exist but have no public endpoints | — | [Community](https://community.squareup.com/t5/Square-Staff-and-Payroll/Square-Staff-Advanced-Access/td-p/739712) |
| Passcodes; team member badges | Free (passcodes, assumed); badges with Advanced Access | **None** ("must be done through the Square Dashboard") | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Timecards: clock in and out from POS or the Team app | Free | Labor API timecards: Create, Search, Retrieve, Update, Delete (GA since 2025-05-21); `labor.timecard.*` webhooks | — | [Help 8389](https://squareup.com/help/us/en/article/8389-set-up-time-tracking) |
| Paid and unpaid breaks | Free | BreakTypes CRUD; `breaks[]` on each timecard | Paid breaks count toward overtime | [Help 8391](https://squareup.com/help/us/en/article/8391-set-up-breaks) |
| Cash tips declared at clock-out | Free | `Timecard.declared_cash_tip_money` | — | [Help 6480](https://squareup.com/help/us/en/article/6480-square-payroll-tip-importing) |
| Workweek settings (week start, day start) | — | WorkweekConfig | Overtime rules themselves are set in the Dashboard only | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Overtime rules (state lookup; 1.5× and 2×) | Tier UNCONFIRMED | None | — | [Shifts features](https://squareup.com/us/en/staff/shifts/features) |
| Clock-in "allow within" window | Free | None | — | [Help 8389](https://squareup.com/help/us/en/article/8389-set-up-time-tracking) |
| Block early or unscheduled clock-ins; auto clock-out | Shifts Plus or Premium plans | None | — | [Help 8389](https://squareup.com/help/us/en/article/8389-set-up-time-tracking) |
| Clock-in only within a set area (geofencing, in the Team app) | Shifts Plus; off by default | **None** | — | [Community](https://community.squareup.com/t5/Product-Updates/Clock-in-geofencing/ba-p/700220) |
| Building and publishing shift schedules | Free (basic) | ScheduledShifts (beta): Create, Search, Retrieve, Update, Publish, BulkPublish (1–100 shifts) | Whether an API publish notifies staff is UNCONFIRMED | [Manage scheduled shifts](https://developer.squareup.com/docs/labor-api/manage-scheduled-shifts) |
| Shift swaps; staff setting their own availability | Shifts Plus | **None** | — | [Community](https://community.squareup.com/t5/Product-Updates/Introducing-Square-Shifts/bc-p/623183) |
| Shift-cover and time-off requests | Tier UNCONFIRMED | **None** | — | [Help 8388](https://squareup.com/help/us/en/article/8388-manage-schedule-requests) |
| Team messaging and announcements (Square Team app) | Tier UNCONFIRMED | **None** | — | [Square Staff](https://squareup.com/us/en/staff) |
| Labor cost CSV export; Workday report | Free | None (calculate from timecards) | — | [Help 6140](https://squareup.com/help/us/en/article/6140-employee-timecard-reporting) |
| Labor vs. sales report | Shifts Plus | None | — | [Help 6140](https://squareup.com/help/us/en/article/6140-employee-timecard-reporting) |
| Sales report by team member (including revenue per labor hour) | Advanced Access | None | — | [Team management](https://squareup.com/us/en/point-of-sale/team-management) |
| Commissions: flat or tiered by sales or item count; can deduct costs first; flow into Payroll | Paid; which plans qualify is disputed (CONFLICT) | **None** | No commission on Package sales | [Help 7145](https://squareup.com/help/us/en/article/7145-set-up-commission-tracking) |
| Tip pooling (labeled beta on the US page) | Tier UNCONFIRMED | **None** | <ul><li>Whether pooled tips sync to Payroll automatically conflicts between sources</li><li>One pool per location [C]</li></ul> | [Help 7599](https://squareup.com/help/us/en/article/7599-beta-feature-tip-pooling) |
| Debit cards for team members (up to 5 on Square Checking) | Free | **None** | The owner controls them | [Help 8471](https://squareup.com/help/us/en/article/8471-order-multiple-debit-cards) |
| Bookable staff profiles in Appointments | Plan-dependent | Read-only `TeamMemberBookingProfile` | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Dispatching a work order to a technician | **Not a Square feature** | Closest: a booking's `team_member_id`, or a scheduled shift's `job_id` | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Cash drawer shifts (POS cash management) | POS | Cash Drawers API, read-only | — | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |

### Payroll and Oregon payroll taxes

**Square Payroll has two plans** ([Payroll pricing](https://squareup.com/us/en/payroll/pricing); [Gusto guide](https://gusto.com/resources/guides/switch-payroll-providers/square-pricing)):

- **Full-service: $35 a month plus $6 per person paid.** Federal and state tax filing is included.
- **Contractor-only: $6 per person paid.** No base fee and no tax filing.
- **Paper W-2 or 1099 copies:** $3 per person per year.

**Square handles most Oregon payroll taxes.** Its Oregon help article confirms ([Square Oregon employer tax info](https://squareup.com/help/us/en/article/6216-oregon-employer-tax-information)):

- It withholds, pays and files Oregon income tax and unemployment insurance.
- It **fully supports Paid Leave Oregon**, but the employer cannot choose to pay the employee's share.

**Two Portland-area transit taxes are unconfirmed.** Square's support for the Statewide Transit Tax and the TriMet tax could not be confirmed. **Square Payroll has no public API.**

| Feature | Plan | Extra cost | Public API | Sources |
|---|---|---|---|---|
| W-2 employee payroll (hourly and salary) | Full-service | Included in $35 + $6/person | **None** | [Payroll pricing](https://squareup.com/us/en/payroll/pricing) |
| 1099 contractor payments | Both plans | $6 per person paid | **None** | [Payroll pricing](https://squareup.com/us/en/payroll/pricing) |
| Federal and state payroll tax calculation, payment and filing | Full-service | Included (one source disputes this) | None | [Payroll for small business](https://squareup.com/us/en/payroll/small-business); [CostBench](https://costbench.com/verify/square-payroll/) |
| W-2 and federal 1099-NEC e-filing; new-hire reporting | Full-service | Included; paper copies $3/person/year | None | [Business.org](https://www.business.org/finance/accounting/square-payroll-review/); [FreshBooks](https://www.freshbooks.com/hub/taxes/square-1099) |
| Direct deposit: standard about 4 days, 2-day, next-day (next-day may need Square Checking) [3P] | Full-service | No fee cited | None | [TechRepublic](https://www.techrepublic.com/article/square-payroll-review/) |
| Instant pay to staff through Cash App, funded from the Square balance | Payroll | Not stated | None | [Help 6917](https://squareup.com/help/us/en/article/6917-square-payroll-pay-your-team-faster-using-your-square-balance) |
| Unlimited pay runs and off-cycle payments | Full-service (off-cycle reportedly not on contractor-only) | Included | None | [Business.org](https://www.business.org/finance/accounting/square-payroll-review/) |
| Importing tips, timecards, wages and commissions | Payroll + POS/Team | Included | None | [Help 6480](https://squareup.com/help/us/en/article/6480-square-payroll-tip-importing) |
| Paid time off and sick-leave policies (accrual by hours worked or fixed amount; optional cap) | Payroll | Included | None | [Help 5664](https://squareup.com/help/us/en/article/5664-paid-time-off-and-sick-leave) |
| Post-tax deductions and wage garnishments | Payroll | Included; **Square withholds but the employer must pay the agency** | None | [Help 6063](https://squareup.com/help/us/en/article/6063-square-payroll-post-tax-deductions-and-garnishments) |
| Multi-state payroll (all 50 states plus DC) | Full-service | No per-state fee; one employee can't span several jurisdictions; one EIN per account | None | [Business.org](https://www.business.org/finance/accounting/square-payroll-review/) |
| Employee self-onboarding and self-service (pay stubs, forms) | Payroll | Included | None | [Business.org](https://www.business.org/finance/accounting/square-payroll-review/) |
| Benefits through partners | Add-on | Partner pricing: <ul><li>**Health insurance:** SimplyInsured, from $190/mo [3P]</li><li>**Retirement:** Guideline 401(k), possibly now Vestwell (UNCONFIRMED)</li><li>**Workers' comp:** AP Intego in 2018, NEXT Insurance per current reviews</li><li>**Commuter benefits:** Alice (status unknown)</li></ul> | None | [Square press 2018](https://squareup.com/us/en/press/payroll-benefits); [Forbes Advisor](https://www.forbes.com/advisor/business/square-payroll-review/) |
| Life, disability and accident insurance; benefits for contractors | **Not offered** | — | — | [Wise](https://wise.com/us/blog/batchtransfer-square-payroll-review) |
| HR suite: document storage, compliance alerts, hiring, background checks | **Not offered** | — | — | [Business.org](https://www.business.org/finance/accounting/square-payroll-review/) |
| Sync to QuickBooks Online | Payroll | Included | None | [Help 6299](https://squareup.com/help/us/en/article/6299-sync-square-payroll-with-quickbooks-online) |
| Where Payroll shows up in API data | — | — | Balance-activity types `SQUARE_PAYROLL_TRANSFER` and `_REVERSED` only | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Availability | US only | — | — | [Community](https://community.squareup.com/t5/Hardware-Setup-Troubleshooting/I-can-t-seem-to-find-quot-payroll-quot-in-my-square-point-of/td-p/643054) |

| Oregon / Portland payroll item | Does Square Payroll handle it? | Official rate or rule | Sources |
|---|---|---|---|
| Oregon income tax withholding, payment and filing | **Yes**, once the business registers with the Oregon Department of Revenue (DOR) | — | [Square OR article](https://squareup.com/help/us/en/article/6216-oregon-employer-tax-information) |
| Oregon unemployment insurance | **Yes**; the business supplies its own rate | — | [Square OR article](https://squareup.com/help/us/en/article/6216-oregon-employer-tax-information) |
| Paid Leave Oregon | **Yes**; the employer cannot pay the employee's share | 1% total, split 60% employee / 40% employer; employer share applies only at 25+ employees [3P] | [QuickBooks OR guide](https://quickbooks.intuit.com/r/oregon/a-guide-to-payroll-taxes-in-oregon/) |
| Statewide Transit Tax (withheld from employees) | **UNCONFIRMED** | 0.1% | [OR DOR 2026 instructions](https://www.oregon.gov/dor/forms/FormsPubs/combined-payroll_211-155-2_2026.pdf) |
| TriMet transit payroll tax (paid by the employer) | **UNCONFIRMED**; Square's article mentions a City of Sandy transit tax | 0.8237% of wages for work done inside the TriMet district (from 2025-01-01) | [OR DOR TriMet](https://www.oregon.gov/dor/programs/businesses/pages/trimet-transit.aspx) |
| Lane Transit District tax | UNCONFIRMED | 0.0080 | [OR DOR 2026 instructions](https://www.oregon.gov/dor/forms/FormsPubs/combined-payroll_211-155-2_2026.pdf) |
| Oregon sick time | Partly; generic PTO policies only | Not researched | [Help 5664](https://squareup.com/help/us/en/article/5664-paid-time-off-and-sick-leave) |

### Checking, debit cards and savings

**Square Checking is free and now comes with every Square account.** There are no monthly, minimum-balance or overdraft fees. Card sales land in it instantly. It is held at **Sutton Bank** with up to $250,000 of pass-through FDIC coverage ([Square Banking](https://squareup.com/us/en/banking); [Every account includes Checking](https://squareup.com/us/en/the-bottom-line/inside-square/square-checking-account)).

**Square Savings is held at Square Financial Services, Block's own bank.** Its rates ([Business Wire 2026-06-11](https://www.businesswire.com/news/home/20260611611379/en/Square-Financial-Services-Introduces-3.50-APY-High-Yield-Savings-for-Square-Sellers-More-Than-8-Times-the-National-Average)):

- **1.00% APY** as the base rate.
- **3.50% APY on balances of $10,000 or more**, since June 2026.

**No public API reaches any banking product.**

| Feature | Price | Public API | Notes | Sources |
|---|---|---|---|---|
| Square Checking | Free | **None** | <ul><li>No wire transfers</li><li>Cash and check deposits: sources conflict (CONFLICT)</li><li>One review places Checking at Square Financial Services, which contradicts Square's own pages</li></ul> | [Square Checking](https://squareup.com/us/en/banking/checking); [Relay](https://relayfi.com/blog/square-checking-review/); [Aspire](https://aspireapp.com/en-us/blog/square-checking-account-review) |
| Instant access to Square sales | Free | Payouts API shows the transfers | Does not apply to money added by ACH | [Help 7604](https://squareup.com/help/us/en/article/7604-square-checking-transfers) |
| Square Debit Card (Mastercard; physical and virtual; up to 5 cards) | Free; Square charges no ATM fee | **None** | <ul><li>**ATM limits:** $500–$3,000 per transaction; up to $10,000 a month</li><li>**Spending limits:** $10,000 per transaction, $25,000/day, $50,000/week, $150,000/month</li><li>New accounts can start as low as $500 per transaction</li></ul> | [Debit card page](https://squareup.com/us/en/banking/business-debit-card); [Help 6589](https://square.com/help/us/en/article/6589-get-started-with-square-card) |
| Receipt capture by text, notes, CSV and ZIP export (366 days or 500 receipts) | Free | **None** | — | [Help 8658](https://squareup.com/help/us/en/article/8658-capture-receipts-and-add-notes-to-square-debit-card-transactions) |
| Square Savings | <ul><li>Free</li><li>1.00% APY; 3.50% at $10,000 or more (APY as of 2026-06-08)</li><li>Older pages show **4.25%** (CONFLICT; treat 3.50% as current)</li></ul> | **None** | FDIC coverage up to $2.5M by spreading deposits across partner banks | [Savings page](https://squareup.com/us/en/banking/savings); [Help 7418](https://squareup.com/help/us/en/article/7418-square-savings-faq) |
| Savings folders that automatically set aside up to 75% of card sales | Free | **None** | Personalized savings suggestions added April 2025 | [Help 7605](https://squareup.com/help/us/en/article/7605-get-started-with-square-savings); [Press Apr 2025](https://squareup.com/us/en/press/square-expands-banking-services) |
| Automatic sales tax folder (sets aside the tax collected on each sale) | Free; whether it is fully released is unclear | **None** | Uses the seller's Square tax settings | [Release notes, June 18](https://squareup.com/us/en/release-notes/release-notes-june-18th) |
| Instant transfer from Checking to an outside bank | 1.95% | **None** | — | [Square Banking](https://squareup.com/us/en/banking) |
| Interest on Checking; cash back on the debit card | None found | — | — | — |

### Credit card, loans and Bill Pay

**None of these three products has a public API.**

**Square Credit Card**

- An **American Express card issued by Celtic Bank**, by invitation only.
- No annual, late or foreign-transaction fees.
- Since the 2026-08-11 refresh, it pays **3% cash back on Square Bill Pay** and **1.5% on everything else**.

Sources: [Credit Card press](https://squareup.com/us/en/press/square-credit-card-bill-pay-refresh); [Help 7471](https://squareup.com/help/us/en/article/7471-square-credit-card-faqs).

**Square Loans (formerly Square Capital)**

- Invitation-only loans of $100 to $500K.
- One fixed fee with no interest.
- Repaid as a **share of daily card sales**, with at least 1/18 of the loan due every 60 days and full repayment within 18 months.

Sources: [SMB Compass](https://www.smbcompass.com/square-loans-review/); [Merchant Maverick](https://www.merchantmaverick.com/understanding-square-capital-loan-offer/).

| Feature | Price / terms | Public API | Notes | Sources |
|---|---|---|---|---|
| Square Credit Card | <ul><li>No annual, late or foreign fees</li><li>APR set per seller (13.9%–26.9% in 2023)</li><li>3% cash back on Bill Pay, 1.5% on everything else</li><li>Rewards paid into Savings, as a statement credit, or as free processing</li></ul> | **None** | <ul><li>$25,000 cap per transaction</li><li>Limit increases by invitation only</li><li>In 2023 the reward was $1 of free processing for every $3 spent</li></ul> | [Credit Card page](https://squareup.com/us/en/banking/credit-card); [Banking Dive](https://www.bankingdive.com/news/square-beta-testing-credit-card-block-amex-payments-pos-smb-capital/654208/) |
| Square Loans | <ul><li>Invitation only; $100 to $500K (one review says $250K, CONFLICT)</li><li>Fixed fee of about 10–16% [3P]</li><li>Repayment of about 9–13% of daily sales [3P]</li><li>No credit check</li></ul> | **None** | <ul><li>Offered in all 50 states (March–April 2026)</li><li>CBD sellers excluded (August 2026)</li><li>Eligibility reviewed daily</li></ul> | [NerdWallet](https://www.nerdwallet.com/business/loans/reviews/square-capital); [Finder](https://www.finder.com/business-loans/square-loans-review); [Feature Log](https://www.squareup.com/us/en/feature-log) |
| Collateral and personal guarantee | <ul><li>No collateral up to $100K</li><li>A UCC lien filing is possible above that</li><li>Personal guarantee above $250K</li><li>Another review puts the lien threshold at $75K (CONFLICT)</li></ul> | — | — | [SMB Compass](https://www.smbcompass.com/square-loans-review/) |
| "Cash Flow Boost" (up to $10K over 120 days) | Anecdotal [C] | **None** | — | [Community](https://community.squareup.com/t5/Banking-With-Square/Square-loans-2026/m-p/837933) |
| Square Bill Pay (pay vendors by ACH, digital check or paper check) | <ul><li>**Free** when paid from Checking, the debit card or an outside bank by ACH</li><li>**2.9%** when paid with an outside credit card</li><li>**Square Credit Card:** 1.5% or 2.9% (CONFLICT)</li></ul> | **None** (the Vendors API is for inventory suppliers only) | <ul><li>ACH arrives in 1–2 business days; cancel before 5pm PT</li><li>Opened to sellers without Checking in August 2026</li><li>Now handles rent, insurance and marketing bills, with OCR bill capture</li><li>The press release said funding from an outside bank was "coming soon", yet help pages already list it as free</li></ul> | [Help 7727](https://squareup.com/help/us/en/article/7727-square-bill-pay); [Help 8189](https://squareup.com/help/us/en/article/8189-bill-pay-faq); [Credit Card press](https://squareup.com/us/en/press/square-credit-card-bill-pay-refresh) |
| Expense management | Debit cards, receipts and exports only | **None** | No expense categories, approval flows or per-employee budgets found | [Square Banking](https://squareup.com/us/en/banking) |

### Bitcoin

**Square lets US sellers accept bitcoin and hold it.** No public API reaches any of these features ([Help 8622](https://squareup.com/help/us/en/article/8622-accept-and-manage-bitcoin-payments); [Bitcoin Magazine](https://bitcoinmagazine.com/business/square-bitcoin-payments-go-live-today)):

- **Accepting bitcoin:** payments over the Lightning Network have been live since 2025-11-10. The fee is **0% through 2026-12-31, then 1%**.
- **Bitcoin Conversions:** automatically converts part of each day's sales into bitcoin.
- **Bitcoin wallet:** buy, sell, hold and withdraw.

| Feature | Price | Public API | Notes | Sources |
|---|---|---|---|---|
| Bitcoin payments (Lightning) | 0% through 2026-12-31, then 1% | None found | <ul><li>Not available in New York</li><li>No disputes or chargebacks</li><li>About 800K sellers turned on automatically [3P]</li><li>Limits of about $600 per payment and $20K a day [3P, UNCONFIRMED]</li><li>The product page says both "through 2026" and "until 2027"</li></ul> | [Help 8622](https://squareup.com/help/us/en/article/8622-accept-and-manage-bitcoin-payments); [AurPay](https://www.aurpay.net/aurspace/square-bitcoin-lightning-payments-merchant-integration-2025/) |
| Bitcoin Conversions (live October 2025; up to 50% of daily sales) | 1% of the amount converted (0.50% on some plans) | None | — | [Square Bitcoin](https://squareup.com/us/en/bitcoin); [Finextra](https://www.finextra.com/newsarticle/46891/square-rolls-out-bitcoin-payments-to-4-million-merchants) |
| Bitcoin wallet (buy, sell, hold, withdraw) | Fees not found | None | — | [Square press May 2025](https://squareup.com/us/en/press/block-to-roll-out-bitcoin-payments-on-square) |
| Bitkey, Block's hardware bitcoin wallet (new model 2026-04-27) | Separate Block product | None | Block also announced tap-to-pay bitcoin for Square sellers | [Block newsroom](https://block.xyz/inside/block-launches-bitkey-wallet-with-screen-automatic-bitcoin-earning-on-cash-app-and-proof-of-reserves) |

### Sales tax, Form 1099-K and income tax

**What Square does with sales tax:** it calculates and collects it according to the seller's settings.

**What Square does not do:** it **does not register, file or remit sales tax** ([Webgility](https://www.webgility.com/blog/square-sales-tax); [Help 8360](https://squareup.com/help/us/en/article/8360-view-tax-fee-and-service-charge-reports)).

**What Square does for income tax:**

- Issues **Form 1099-K**. For tax years 2025 and 2026 the federal threshold is **more than $20,000 and more than 200 transactions**.
- Provides reports.
- Files payroll taxes, only for Square Payroll customers.

**What Square does not do for income tax:** prepare Schedule C, file income-tax returns, or calculate estimated taxes.

Sources: [Help 5048](https://squareup.com/help/us/en/article/5048-1099-k-overview); [1099 Express](https://1099express.com/2026/10/03/form-1099-k-in-2026-the-20000-and-200-transaction-threshold-is-back/).

**Oregon sales tax.** Per Sheen's brief, Oregon has no general sales tax. That was not independently verified here. If true, Sheen's sales-tax rate should be zero, but the app should still store tax rates in the same shape Square's `CatalogTax` uses.

| Feature | Plan / price | Public API | Notes | Sources |
|---|---|---|---|---|
| Tax rates (added on top or included in price; per item or per order) | Included | **Yes:** Catalog API `CatalogTax` (`inclusion_type`, `calculation_phase`, `percentage`); Orders API `OrderLineItemTax`, `applied_taxes`, `total_tax_money` | — | [CatalogTax](https://developer.squareup.com/reference/square/objects/CatalogTax); [OrderLineItemTax](https://developer.squareup.com/reference/square/objects/OrderLineItemTax) |
| Calculating and collecting tax at checkout | Included | Orders API | <ul><li>Rates preset by location; the seller must keep them current</li><li>Invoices don't use the customer's address for local rates [C]</li></ul> | [Community](https://community.squareup.com/t5/Orders-Menu-Items-Catalog/Local-Taxes-in-Square-Invoices/m-p/851730) |
| Tax rates based on the customer's address (Square Online) | Included, through TaxJar | — | — | [Community](https://community.squareup.com/t5/Online-Store/Sales-Tax-on-Out-of-State-shipments/m-p/772899) |
| Taxes, Fees and Service Charge reports | Included | Reporting API (beta), or calculate from Orders and Payments | — | [Help 8360](https://squareup.com/help/us/en/article/8360-view-tax-fee-and-service-charge-reports) |
| Filing and paying sales tax | **Not offered** | n/a | <ul><li>TaxJar AutoFile is paid; its $9.95 price from 2014 is outdated</li><li>No Avalara integration found</li></ul> | [TaxJar](https://www.taxjar.com/product/integration/square) |
| Form 1099-K | Included if the threshold is met | **None** (download from the Dashboard) | <ul><li>Available by January 31; download under Account & Settings → Business information → Tax forms</li><li>Oregon's own 1099-K threshold: sources conflict (CONFLICT)</li></ul> | [Help 5048](https://squareup.com/help/us/en/article/5048-1099-k-overview); [Community 2025 overview](https://community.squareup.com/t5/Community-News/1099-K-tax-forms-and-tax-season-overview-for-US-sellers/ba-p/828532); [1099pro](https://wiki.1099pro.com/x/cwAWBg) |
| Payroll tax filings, W-2, 1099-NEC | Square Payroll only | **None** | — | [Payroll pricing](https://squareup.com/us/en/payroll/pricing) |
| Income tax: Schedule C, Form 1040, estimated quarterly taxes, Oregon and Portland/Multnomah returns, Oregon Corporate Activity Tax | **Not offered** | — | Oregon and Portland tax rules were not researched against official sources | [Tax season article](https://squareup.com/us/en/the-bottom-line/inside-square/prepare-for-tax-season-with-square) |
| Setting money aside for taxes | Savings folders | **None** | — | [Tax season article](https://squareup.com/us/en/the-bottom-line/inside-square/prepare-for-tax-season-with-square) |
| Cash App Taxes (Block) | Free; reportedly supports Schedule C | **None**; no import from Square found | Sources are weak | [Wealthvieu](https://wealthvieu.com/taxes/tax-filing/cash-app-taxes-review/) |
| Using the Sales Summary to report income when no 1099-K arrives | Free | — | — | [Community](https://community.squareup.com/t5/Questions-How-To/Download-your-Sales-Summary-if-you-didn-t-receive-a-1099-K/m-p/32096) |

### Accounting integrations and exports

**Square has no general ledger of its own.** It relies on outside accounting software instead ([Intuit help](https://quickbooks.intuit.com/learn-support/en-us/help-article/manage-integrations/connect-manage-square-transactions-quickbooks/L0mBsyBTP_US_en_US); [Xero: Square partnership](https://www.xero.com/us/partnerships/square/)):

- **QuickBooks Online:** Intuit's free "Sync with Square" imports sales, fees, taxes and deposits once a day.
- **Xero:** a free integration built by Amaka.

**Both are built on Square's public APIs.** That means Sheen's app can pull the same data.

| Integration or export | Price | How it works | Sources |
|---|---|---|---|
| QuickBooks Online, "Sync with Square" (built by Intuit) | Free; QuickBooks subscription extra | <ul><li>One-way, once a day</li><li>Lands in QuickBooks' "For Review" tab, usually within 2 hours</li><li>Built on Square's APIs</li></ul> | [Intuit help](https://quickbooks.intuit.com/learn-support/en-us/help-article/manage-integrations/connect-manage-square-transactions-quickbooks/L0mBsyBTP_US_en_US) |
| Xero (built by Amaka) | Free; Xero subscription extra | <ul><li>A daily summary invoice, or one invoice per order</li><li>Captures fees, tips, refunds, gift cards, surcharges and taxes</li><li>Available in the US</li></ul> | [Xero](https://www.xero.com/us/partnerships/square/) |
| Synder; Commerce Sync; Amaka Pro | <ul><li>Synder: $52/mo billed yearly, or $65 monthly, for up to 500 transactions</li><li>Commerce Sync: $20/mo</li><li>Amaka Pro: $29/mo</li><li>All [3P]</li></ul> | Paid sync tools | [QuickSync comparison](https://quicksync.pro/blog/best-square-quickbooks-integration-apps/); [Amaka](https://amaka.com/integrations/square/quickbooks/) |
| Square Payroll to QuickBooks Online | Included with Payroll | Payroll sync | [Help 6299](https://squareup.com/help/us/en/article/6299-sync-square-payroll-with-quickbooks-online) |
| Report exports (CSV or PDF): Sales Summary, Taxes, Fees, Balance/Transfers, Payment Methods | Free | Transfer export sometimes leaves out fees and taxes [C] | [Help 8360](https://squareup.com/help/us/en/article/8360-view-tax-fee-and-service-charge-reports); [Community](https://community.squareup.com/t5/Questions-How-To/Is-there-a-way-to-print-the-transfer-summary-report-like-the-old/m-p/285583) |
| Square's own general ledger, chart of accounts or expense categories | **Not offered** | — | [Feature Log](https://www.squareup.com/us/en/feature-log) |
| Wave, FreshBooks, Zoho Books and others in the App Marketplace | Not checked | — | — |

## Developer platform: 40 APIs, 332 operations, 149 webhook events

**Square's spec groups the API into six categories:** Dev Essentials, Payments, Commerce, Customers, Staff and Merchants. The figures below come from Square's OpenAPI spec at version **2026-09-16**:

| Item | Count |
|---|---|
| Current APIs | **40** |
| Legacy tags still listed | 3 (Transactions, Employees, V1 Orders) |
| Operations | **332** (211 GA, 97 beta, 24 deprecated) |
| Webhook event types | **149**, in 26 families |

Source: [Spec](https://github.com/square/connect-api-specification/blob/master/api.json).

**Basics that apply to every call:**

- **Base URL:** `https://connect.squareup.com`.
- **Version header:** every request carries `Square-Version`.
- **Cost:** API access is free; sellers pay processing fees ([Dev payments pricing](https://developer.squareup.com/docs/payments-pricing)).

**Large parts of the platform are still beta.** A dispatch app that depends on any of these is building on beta endpoints:

- Orders: UpdateOrder, PayOrder, CalculateOrder and CloneOrder
- all order, location and merchant custom attributes
- Events
- Vendors
- Channels
- Transfer Orders
- Scheduled Shifts
- Jobs
- Subscriptions pause and plan swap
- Terminal actions

### The 40 REST APIs in Square's six categories

| Category | API | Operations (GA / beta / deprecated) | Main operations | Plan gates, limits and notes |
|---|---|---|---|---|
| Dev Essentials | OAuth | 3 / 0 / 0 | ObtainToken, RevokeToken, RetrieveTokenStatus; authorize at `connect.squareup.com/oauth2/authorize` | <ul><li>RenewToken removed 2024-04-17</li><li>`migration_token` grant is legacy</li></ul> |
| Dev Essentials | Webhook Subscriptions | 8 / 0 / 0 | List event types; List/Create/Retrieve/Update/Delete subscriptions; rotate signature key; send a test | <ul><li>Belongs to the app, not the seller</li><li>**Personal access token only**</li></ul> |
| Dev Essentials | Events | 0 / 4 / 0 | SearchEvents, ListEventTypes, EnableEvents, DisableEvents | <ul><li>Searches the last 28 days, to catch missed webhooks</li><li>Personal access token only</li><li>Added 2024-06</li></ul> |
| Payments | Payments | 7 / 0 / 0 | List, Create, Get, Update, Cancel, CancelByIdempotencyKey, Complete | <ul><li>Source types: CARD, BANK_ACCOUNT, WALLET, BUY_NOW_PAY_LATER, SQUARE_ACCOUNT, CASH, EXTERNAL</li><li>`app_fee_money` up to 90%; up to 100 results per page</li></ul> |
| Payments | Refunds | 3 / 0 / 0 | RefundPayment, ListPaymentRefunds, GetPaymentRefund | Only COMPLETED payments can be refunded |
| Payments | Checkout (Payment Links) | 5 / 4 / 1 | <ul><li>**GA:** payment link CRUD</li><li>**Beta:** location and merchant checkout settings</li><li>**Deprecated:** CreateCheckout</li></ul> | Square-hosted checkout page |
| Payments | Terminal | 8 / 7 / 0 | Checkouts and refunds: Create/Search/Get/Cancel. **Beta:** Terminal actions and dismiss calls | Terminal refunds work **only for Interac debit in Canada** |
| Payments | Disputes | 9 / 0 / 0 | List, Retrieve, Accept, evidence CRUD, SubmitEvidence | Accepting pays from the Square balance |
| Payments | Invoices | 10 / 0 / 0 | Create, List, Search, Get, Update, Delete, Cancel, Publish, Create/Delete attachment | <ul><li>Installments and custom fields need a paid invoicing tier</li><li>Works only with orders from the Orders API</li></ul> |
| Payments | Cards | 4 / 0 / 0 | CreateCard, ListCards, RetrieveCard, DisableCard | Replaces the deprecated Customers card endpoints |
| Payments | Subscriptions | 7 / 5 / 0 | <ul><li>**GA:** Create, Search, Retrieve, Update, Cancel, Resume, ListEvents</li><li>**Beta:** Pause, SwapPlan, BulkSwapPlan, ChangeBillingAnchorDate, DeleteAction</li></ul> | Plans are created in the Catalog API |
| Payments | Bank Accounts | 3 / 2 / 0 | <ul><li>**GA:** List, Get, GetByV1Id</li><li>**Beta (2026-05-20):** CreateBankAccount, DisableBankAccount</li></ul> | Pairs with the Payouts API |
| Payments | Payouts | 3 / 0 / 0 | ListPayouts, GetPayout, ListPayoutEntries | Read-only; the `PAYOUTS_WRITE` scope has no endpoint |
| Payments | Devices | 3 / 2 / 0 | <ul><li>**GA:** Create/List/Get device codes</li><li>**Beta:** ListDevices, GetDevice</li></ul> | Pairs a Square Terminal with another POS |
| Payments | Apple Pay | 1 / 0 / 0 | RegisterDomain | Apple Pay on the Web for many seller domains |
| Commerce | Orders | 4 / 4 / 0 | <ul><li>**GA:** Create, Retrieve, BatchRetrieve, Search</li><li>**Beta:** UpdateOrder, PayOrder, CalculateOrder, CloneOrder</li></ul> | **Square charges a transaction fee if Orders is used with a non-Square payment provider** |
| Commerce | Order Custom Attributes | 0 / 11 / 0 | Definitions and values CRUD; bulk upsert and delete | — |
| Commerce | Catalog | 13 / 1 / 0 | Batch upsert/retrieve/delete, upsert, retrieve, delete, list, search objects and items, info, create image, update item modifier lists and taxes. **Beta:** UpdateCatalogImage | Also holds subscription plans and bookable services |
| Commerce | Inventory | 6 / 7 / 6 | Batch change, batch retrieve counts and changes, retrieve count, adjustment and physical count. **Beta (2026-07-15):** adjustment reasons, UpdateInventoryAdjustment | RetrieveInventoryTransfer removed 2026-07-15 |
| Commerce | Transfer Orders | 0 / 8 / 0 | Create, Search, Retrieve, Update, Delete, Start, Receive, Cancel | Added 2025-10-16 |
| Commerce | Bookings | 13 / 0 / 0 | Booking CRUD, list, bulk retrieve, SearchAvailability, business, location and team booking profiles | **Business-side writes need Appointments Plus or Premium** |
| Commerce | Booking Custom Attributes | 11 / 0 / 0 | Definitions and values CRUD; bulk upsert and delete | — |
| Commerce | Vendors | 0 / 7 / 0 | Create, BulkCreate, Retrieve, BulkRetrieve, Update, BulkUpdate, Search | Inventory suppliers |
| Commerce | Channels | 0 / 3 / 0 | ListChannels, RetrieveChannel, BulkRetrieveChannels | <ul><li>Read-only</li><li>Create and update scopes exist without endpoints</li></ul> |
| Commerce | Sites | 1 / 0 / 0 | ListSites | Early access program |
| Commerce | Snippets | 3 / 0 / 0 | Upsert, Retrieve, Delete | <ul><li>Early access program</li><li>Not on checkout pages</li></ul> |
| Commerce | Cash Drawers | 3 / 0 / 0 | ListCashDrawerShifts, RetrieveCashDrawerShift, ListCashDrawerShiftEvents | Read-only |
| Customers | Customers | 12 / 0 / 2 | CRUD, list, search, 4 bulk endpoints, add and remove group | Card endpoints deprecated |
| Customers | Customer Custom Attributes | 10 / 0 / 0 | Definitions and values CRUD; bulk upsert | — |
| Customers | Customer Groups | 5 / 0 / 0 | List, Create, Retrieve, Update, Delete | Unchanged from 2024 to 2026 |
| Customers | Customer Segments | 2 / 0 / 0 | ListCustomerSegments, RetrieveCustomerSegment | **Read-only** |
| Customers | Loyalty | 17 / 0 / 1 | Accounts, points, events, program (retrieve only), promotions, rewards | <ul><li>One program per seller, created in the Dashboard</li><li>Needs a Loyalty subscription</li></ul> |
| Customers | Gift Cards | 7 / 0 / 0 | Create, List, Retrieve, look up by card number (GAN) or by payment token, link and unlink a customer | — |
| Customers | Gift Card Activities | 2 / 0 / 0 | CreateGiftCardActivity, ListGiftCardActivities | — |
| Staff | Team | 8 / 4 / 0 | Team member CRUD and bulk; wage settings. **Beta:** Jobs | **Permissions and passcodes are Dashboard-only** |
| Staff | Labor | 14 / 6 / 7 | Timecards CRUD; break types; team member wages; workweek configs. **Beta:** scheduled shifts | Shifts and EmployeeWages deprecated |
| Merchants | Merchants | 2 / 0 / 0 | ListMerchants, RetrieveMerchant | — |
| Merchants | Merchant Custom Attributes | 0 / 11 / 0 | Definitions and values CRUD; bulk | — |
| Merchants | Locations | 4 / 0 / 0 | List, Create, Retrieve, Update | — |
| Merchants | Location Custom Attributes | 0 / 11 / 0 | Definitions and values CRUD; bulk | — |
| Legacy | Transactions | 0 / 0 / 2 | ListTransactions, RetrieveTransaction | <ul><li>Capture and Void removed 2026-09-16</li><li>Use Payments and Orders</li></ul> |
| Legacy | Employees (v2) | 0 / 0 / 2 | ListEmployees, RetrieveEmployee | <ul><li>Deprecated 2020-08-26</li><li>Docs say retired 2021-08-26, yet the spec still lists both operations</li></ul> |
| Legacy | V1 Orders (online store) | 0 / 0 / 3 | V1ListOrders, V1RetrieveOrder, V1UpdateOrder | The only v1 endpoints left |

Sources for the table: [Spec](https://github.com/square/connect-api-specification/blob/master/api.json); [Spec history](https://github.com/square/connect-api-specification/commits/master/api.json).

### APIs outside the spec, special access and scopes without endpoints

| Item | Status | What it is | Sources |
|---|---|---|---|
| Reporting API | Open beta. CONFLICT: the forum calls it "stable and production-ready", while the developer homepage labels it beta | <ul><li>A cube-based REST API for sales, payment, customer and catalog metrics (data is grouped into ready-made "cubes")</li><li>Queries go to `/v1/load` under `connect.squareup.com/reporting`</li><li>43 cubes and 8 views (for example Sales and ItemSales)</li><li>Works with a personal access token or OAuth</li><li>The orders cube is about 15 minutes behind</li><li>The spec says "The legacy Reporting API has been retired"</li></ul> | [Reporting API](https://developer.squareup.com/docs/reporting-api/overview); [Forum](https://developer.squareup.com/forums/t/reporting-api-open-beta/25897) |
| Discount Codes API | Special request only; access granted case by case | <ul><li>`/v2/discount-codes`, tied to a catalog pricing rule</li><li>Scopes added 2025-02-20</li><li>One developer got NOT_FOUND despite having the scopes</li></ul> | [Forum: access](https://developer.squareup.com/forums/t/request-for-discount-codes-api-access-square-vouchers/27905); [Forum: permissions](https://developer.squareup.com/forums/t/discount-api-permissions/28048) |
| Scopes with no public endpoint | Point to private or partner APIs | `ADDON_CONFIGURATIONS_READ/WRITE`, `PERMISSION_SETS_READ/WRITE`, `RESERVATIONS_READ/WRITE`, `RESTAURANT_CHECKS_READ`, `PAYMENTS_WRITE_SHARED_ONFILE`, `CHANNELS_CREATE/UPDATE`, `PAYOUTS_WRITE` | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Mobile Authorization API | **Removed** from the spec 2026-05-20 (deprecated 2025-02-20) | Used to authorize the retired Reader SDK | [Spec history](https://github.com/square/connect-api-specification/commits/master/api.json) |
| An "AI API" | Does not exist | Square's AI offering for developers is the MCP server | [square-mcp-server](https://github.com/square/square-mcp-server) |

### SDKs, client libraries and developer tools

**There are seven official server libraries**, all generated from the spec with the Fern toolchain. Every one targets API version 2026-09-16.

| Language | Package | Latest version found | Source |
|---|---|---|---|
| Node.js / TypeScript | `square` (npm) | 46.0.0 (2026-09-15) | [npm](https://www.npmjs.com/package/square) |
| Python | `squareup` (PyPI) | 46.0.0.20260916 | [PyPI](https://pypi.org/project/squareup/) |
| Java | `com.squareup:square` | 48.0.0.20260916 (git tag) | [GitHub tags](https://github.com/square/square-java-sdk/tags) |
| .NET | `Square` (NuGet) | 47.0.0 | [NuGet](https://www.nuget.org/packages/Square) |
| PHP | `square/square` (Packagist) | 47.0.0.20260916 | [Packagist](https://packagist.org/packages/square/square) |
| Ruby | `square.rb` (RubyGems) | 48.0.0.20260916 | [RubyGems](https://rubygems.org/gems/square.rb) |
| Go | `github.com/square/square-go-sdk/v5` | v5.0.0 (2026-09-15) | [pkg.go.dev](https://pkg.go.dev/github.com/square/square-go-sdk/v5) |

| Client SDK or tool | Status | What it does / limits | Sources |
|---|---|---|---|
| Web Payments SDK | Current | <ul><li>Turns browser payment details into tokens: cards, gift cards, Apple Pay, Google Pay, ACH (via Plaid, US only), Afterpay, Cash App Pay</li><li>Packages: `@square/web-sdk` 2.3.0 (2026-08-18); types package 1.87.2 (2026-10-27)</li><li>HTTPS and a Content Security Policy required since 2025-10-01</li><li>Replaced the old SqPaymentForm</li></ul> | [Web Payments SDK](https://developer.squareup.com/docs/web-payments/overview); [npm](https://www.npmjs.com/package/@square/web-sdk); [Migrate](https://developer.squareup.com/docs/web-payments/migrate) |
| In-App Payments SDK | Current | <ul><li>Card entry inside your own native app</li><li>iOS 1.6.7; React Native 2.1.2 (2026-09-25); Flutter 2.1.0 (2026-10-08)</li><li>Android version not verified</li></ul> | [iOS repo](https://github.com/square/in-app-payments-ios); [npm RN](https://www.npmjs.com/package/react-native-square-in-app-payments); [pub.dev](https://pub.dev/packages/square_in_app_payments) |
| Mobile Payments SDK | Generally available; US, Canada, Australia | <ul><li>Square readers, Stand, and Tap to Pay inside your own app</li><li>iOS 2.7.0, Android 2.7.0, React Native v2026.10.1, Flutter v2026.10.2</li><li>Offline mode: 1,000 payments per 24 hours</li><li>Replaces the Reader SDK</li></ul> | [GA blog](https://developer.squareup.com/blog/announcing-mobile-payments-sdk-ga-and-new-terminal-api-features/); [iOS](https://github.com/square/mobile-payments-sdk-ios); [Android](https://github.com/square/mobile-payments-sdk-android); [In-person options](https://developer.squareup.com/docs/in-person-payment-options) |
| Terminal API | Current | Drives a paired Square Terminal over REST | [Terminal API](https://developer.squareup.com/docs/terminal-api/overview) |
| Point of Sale API | Lifecycle UNCONFIRMED | Switches into the Square POS app to take a payment, then returns to your app | [POS API](https://connect.squareup.com/docs/pos-api/what-it-does) |
| Reader SDK | **Retired** | Replaced by the Mobile Payments SDK | [Forum](https://developer.squareup.com/forums/t/action-required-reader-sdk-deprecation-and-retirement/20750) |
| Square MCP server (lets AI assistants call Square) | <ul><li>Hosted remote server recommended</li><li>Local server labeled beta</li></ul> | <ul><li>**Hosted:** `https://mcp.squareup.com/mcp` with OAuth sign-in; the legacy `/sse` endpoint still runs</li><li>**Local:** `npx square-mcp-server start` (0.1.2); settings `ACCESS_TOKEN`, `SANDBOX`, `PRODUCTION`, `DISALLOW_WRITES`, `SQUARE_VERSION`</li><li>**Tools:** only 3 — `get_service_info`, `get_type_info`, `make_api_request`</li><li>**Gaps:** its service list lacks Channels, Transfer Orders and Reporting</li><li>**Clients:** Claude, Goose, Cursor, Windsurf, ChatGPT</li></ul> | [square-mcp-server](https://github.com/square/square-mcp-server); [MCP docs](https://developer.squareup.com/docs/mcp.md) |
| API Explorer | Current | Sends REST requests to Sandbox or production and generates code; public REST APIs only | [API Explorer](https://developer.squareup.com/docs/devtools/api-explorer) |
| Developer Console, Sandbox, API Logs, Postman collections | Current | Credentials, test environment, request logs, ready-made request collections | [Developer tools](https://developer.squareup.com/docs/devtools/overview) |
| Sandbox test values | Current | <ul><li>Test tokens: `cnon:card-nonce-ok`, `cnon:card-nonce-declined` and similar</li><li>Test card: Visa 4111 1111 1111 1111</li><li>**In-person (card-present) testing is not supported in Sandbox**; older docs disagree</li></ul> | [Test values](https://developer.squareup.com/docs/testing/test-values); [Sandbox payments](https://developer.squareup.com/docs/devtools/sandbox/payments) |
| Square CLI | None found | — | — |

### Auth, versioning, limits and webhooks

| Topic | Rule | Sources |
|---|---|---|
| Personal access token (PAT) | <ul><li>For a single seller; never expires</li><li>**Required** for the Webhook Subscriptions and Events APIs</li></ul> | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| OAuth, authorization-code flow | <ul><li>Access tokens last **30 days**</li><li>Refresh tokens last until revoked and can mint several access tokens</li><li>`short_lived: true` gives a 24-hour token</li></ul> | [OAuth overview](https://developer.squareup.com/docs/oauth-api/overview) |
| OAuth with PKCE (for mobile, single-page and desktop apps) | Each refresh token is **single-use and expires in 90 days**; store the new one every time | [How OAuth works](https://developer.squareup.com/docs/oauth-api/how-it-works) |
| Token status and revocation | <ul><li>RetrieveTokenStatus returns scopes and `expires_at`</li><li>Revoking fires the `oauth.authorization.revoked` webhook</li></ul> | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| App fees (for platforms) | <ul><li>`app_fee_money` up to **90%** of the payment</li><li>`app_fee_allocations` split it among up to 3 parties</li><li>Needs the `PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS` scope (no separate approval)</li><li>Developer account must be in the seller's country</li><li>Not allowed on CASH or EXTERNAL payments</li><li>Taken back on refunds</li></ul> | [Collect application fees](https://developer.squareup.com/docs/payments-api/take-payments-and-collect-fees); [Considerations](https://developer.squareup.com/docs/payments-api/collect-fees/additional-considerations); [Forum](https://developer.squareup.com/forums/t/payments-write-additional-recipients/27139) |
| Versioning and lifecycle | <ul><li>A dated `Square-Version` header; current version 2026-09-16</li><li>At least **12 months** from deprecation to retirement</li><li>Retired endpoints return **410 GONE** whatever the version</li></ul> | [API lifecycle](https://developer.squareup.com/docs/build-basics/api-lifecycle) |
| Rate limits | <ul><li>Not published; expect HTTP 429 `RATE_LIMITED`</li><li>Limits are per app</li><li>Use backoff with jitter, batch endpoints and caching</li></ul> | [Handling errors](https://developer.squareup.com/docs/build-basics/general-considerations/handling-errors) |
| Idempotency and pagination | <ul><li>`idempotency_key` on create calls</li><li>Cursor-based pages; ListPayments returns at most 100</li></ul> | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Webhook signatures | <ul><li>Header `x-square-hmacsha256-signature` (HMAC-SHA256) over the notification URL plus the raw body</li><li>Each subscription has its own key, which can be rotated</li><li>The older HMAC-SHA1 `x-square-signature` is being retired</li></ul> | [Subscribe](https://developer.squareup.com/docs/webhooks/step2subscribe); [Webhook Relay](https://webhookrelay.com/verify-square-webhook-signature/) |
| Webhook retries | <ul><li>Exponential backoff (about 1 minute, then 2)</li><li>Headers `square-retry-number` and `square-retry-reason`; times out after 10 seconds</li><li>**Window: 24 hours vs 72 hours (CONFLICT);** a third party reports 11 retries over 24 hours</li></ul> | [Webhooks overview](https://developer.squareup.com/docs/webhooks/overview); [How it works](https://developer.squareup.com/docs/webhooks/how-it-works); [Hookdeck](https://hookdeck.com/webhooks/platforms/guide-to-square-webhooks-features-and-best-practices) |
| App Marketplace | <ul><li>Requires partner approval and meeting technical requirements; Square runs QA</li><li>Big partners may get profit sharing</li><li>Revenue share and listing fees not found</li></ul> | [Publish to App Marketplace](https://developer.squareup.com/docs/app-marketplace); [App partner program](https://squareup.com/us/en/partnerships/app-partner) |

**Full OAuth scope list in the 2026-09-16 spec**, grouped for readability ([Spec](https://github.com/square/connect-api-specification/blob/master/api.json)):

| Area | Scopes |
|---|---|
| Add-ons | ADDON_CONFIGURATIONS_READ/WRITE |
| Appointments | APPOINTMENTS_READ/WRITE, APPOINTMENTS_ALL_READ/WRITE, APPOINTMENTS_BUSINESS_SETTINGS_READ |
| Bank accounts | BANK_ACCOUNTS_READ |
| Cash drawers | CASH_DRAWER_READ |
| Channels | CHANNELS_CREATE/READ/UPDATE |
| Customers | CUSTOMERS_READ/WRITE |
| Devices | DEVICES_READ, DEVICE_CREDENTIAL_MANAGEMENT |
| Discount codes | DISCOUNT_CODES_READ/WRITE |
| Disputes | DISPUTES_READ/WRITE |
| Team (named "employees") | EMPLOYEES_READ/WRITE |
| Gift cards | GIFTCARDS_READ/WRITE |
| Inventory | INVENTORY_READ/WRITE |
| Invoices | INVOICES_READ/WRITE |
| Catalog (named "items") | ITEMS_READ/WRITE |
| Loyalty | LOYALTY_READ/WRITE |
| Merchant profile | MERCHANT_PROFILE_READ/WRITE |
| Square Online | ONLINE_STORE_SITE_READ, ONLINE_STORE_SNIPPETS_READ/WRITE |
| Orders | ORDERS_READ/WRITE |
| Payments | PAYMENTS_READ/WRITE, PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS, PAYMENTS_WRITE_IN_PERSON, PAYMENTS_WRITE_SHARED_ONFILE |
| Payouts and settlements | PAYOUTS_READ/WRITE, SETTLEMENTS_READ |
| Permission sets | PERMISSION_SETS_READ/WRITE |
| Reservations | RESERVATIONS_READ/WRITE |
| Restaurant checks | RESTAURANT_CHECKS_READ |
| Subscriptions | SUBSCRIPTIONS_READ/WRITE |
| Timecards | TIMECARDS_READ/WRITE, TIMECARDS_SETTINGS_READ/WRITE |
| Vendors | VENDOR_READ/WRITE |

| Webhook family | Events (beta or deprecated marked) |
|---|---|
| bank_account | created, disabled, verified |
| booking | created, updated; custom_attribute and custom_attribute_definition owned/visible created/updated/deleted |
| card | created, updated, disabled, forgotten, automatically_updated |
| catalog | version.updated |
| customer | created, updated, deleted; custom_attribute(_definition).owned/visible.* (the unprefixed and `.public.*` forms are deprecated) |
| device | code.paired; created (beta) |
| dispute | created, state.updated, evidence.created, evidence.deleted (state.changed, evidence.added and evidence.removed deprecated) |
| gift_card | created, updated, customer_linked, customer_unlinked, activity.created, activity.updated |
| inventory | count.updated |
| invoice | created, updated, published, canceled, deleted, payment_made, refunded, scheduled_charge_failed |
| job | created, updated (beta) |
| labor | timecard.created/updated/deleted; scheduled_shift.created/updated/deleted/published (beta); shift.* (deprecated) |
| location | created, updated, custom-attribute events (all beta) |
| loyalty | account.created/updated/deleted; event.created; program.created/updated; promotion.created/updated |
| merchant | custom-attribute events (beta) |
| oauth | authorization.revoked |
| online_checkout | location_settings.updated, merchant_settings.updated (beta) |
| order | created, updated, fulfillment.updated, custom-attribute events (all beta) |
| payment | created, updated |
| payout | sent, paid, failed |
| refund | created, updated |
| subscription | created, updated |
| team_member | created, updated, wage_setting.updated |
| terminal | checkout.created/updated; refund.created/updated; action.created/updated (beta) |
| transfer_order | created, updated, deleted (beta) |
| vendor | created, updated (beta) |

## Retired and renamed: what older docs will get wrong

**Square consolidates more than it kills.** The pattern:

- Separate apps became one POS app.
- 18 subscriptions became three plans.
- Developer surfaces get at least a year's notice before they break.

**Most dangerous for the coding agent are tutorials built on retired surfaces:**

- the Reader SDK
- Mobile Authorization codes
- v1 endpoints
- Transactions capture and void
- Labor `/shifts`

These surfaces now fail or return 410 ([API lifecycle](https://developer.squareup.com/docs/build-basics/api-lifecycle)).

| Item | What happened | When | Replacement | Sources |
|---|---|---|---|---|
| Square Wallet, then Square Order | Square Order shut down after 10 months | 2015-03-20 | Square Online ordering | [Digital Transactions](https://www.digitaltransactions.net/after-just-10-months-square-shuts-down-order-the-successor-to-square-wallet/) |
| Caviar (food delivery) | Sold to DoorDash for $410M | Announced August 2019 | Restaurant delivery options from 2020 | [CNBC](https://www.cnbc.com/2020/06/24/square-gets-back-into-food-delivery-less-than-a-year-after-selling-caviar.html) |
| Square Capital | Renamed **Square Loans** | Date unconfirmed | Square Loans | [NerdWallet](https://www.nerdwallet.com/business/loans/reviews/square-capital) |
| "Square Card"; "Instant Deposit"; "Deposit options" | Renamed Square Debit Card, Instant Transfer and Transfer options | Not dated | — | [Help 6589](https://square.com/help/us/en/article/6589-get-started-with-square-card); [Help 5405](https://square.com/help/us/en/article/5405-set-up-and-manage-instant-deposits) |
| Chargeback Protection (US) | Discontinued (had covered up to $250 a month); still sold in Australia | Date not found | Risk Manager | [Community](https://community.squareup.com/t5/Your-Square-Account-Information/Important-update-about-Chargeback-Protection/td-p/124986) |
| Original POS interface | Sellers can no longer switch back | 2023 | Redesigned POS | [Community](https://community.squareup.com/t5/Orders-Menu-Items-Catalog/New-Interface-POS-update/m-p/666563/highlight/true) |
| Separate Square for Retail, Restaurants and Appointments apps | Merged into one **Square POS app with seven modes** | April–May 2025 (sources differ) | Unified POS app; the Square Invoices app is still in app stores | [Block](https://block.xyz/inside/introducing-the-next-generation-square-point-of-sale-app); [Digital Transactions](https://www.digitaltransactions.net/square-releases-revised-point-of-sale-app-with-custom-modes/) |
| Team Plus | Renamed **Advanced Access** | 2024-03-27 | Now included in Plus and Premium | [Community](https://community.squareup.com/t5/Product-Updates/Team-Plus-renamed-to-Advanced-Access/ba-p/718589) |
| Square Shifts / Shifts Plus | Not renamed. Shifts Plus features were bundled into Team Plus, Retail Plus, Restaurants Plus and Appointments Premium | About 2021 onward | Shifts Plus page still says "from $4 per member" | [Community](https://community.squareup.com/t5/Product-Updates/Introducing-Square-Shifts/bc-p/616328) |
| 18 à la carte subscriptions | Replaced; full list not retrieved (UNCONFIRMED). Includes Appointments Plus ($29) and Premium ($69), Invoices Plus ($20), Online Plus ($29) and Premium, Marketing, Loyalty, Messages Plus ($10), Retail Plus, Restaurants Plus and Premium, Team Plus / Advanced Access ($35) | 2025-10 | **Square Free / Plus / Premium**; legacy holders keep theirs until they switch, and switching is one-way | [Press release](https://squareup.com/us/en/press/unified-pricing-and-packaging); [Help 8569](https://squareup.com/help/us/en/article/8569-switch-to-the-new-square-subscription-plans) |
| Appointment scheduling sold as an add-on | "No longer offered as a separate add-on" | 2025-10 | Included in all three plans | [NerdWallet](https://www.nerdwallet.com/business/software/learn/square-fees) |
| Square AI (US) | Succeeded by **Managerbot** | 2026-04 | Managerbot (open beta) | [Managerbot press](https://squareup.com/us/en/press/managerbot-open-beta) |
| 2024 Square Kiosk on an iPad | Relaunched as the AI Kiosk; the older setup is now called "Kiosk Lite" [3P] | 2024-04-23, then 2026-10-14 | New Square Kiosk; how the two relate is UNCONFIRMED | [Square Kiosk press](https://squareup.com/us/en/press/square-kiosk-self-service-reimagined) |
| Square Register, 1st generation ($799) | Replaced | 2026-02-04 | 2nd generation ($899) | [Business Wire](https://www.businesswire.com/news/home/20260204804070/en/Second-Generation-Square-Register-Delivers-More-Speed-Power-and-Reliability-to-the-Neighborhood) |
| Weebly (outside the US, Canada, UK and Australia) | Shutting down in 67 countries | 2026 (accounts close 2026-12-26) | Rebuild on Square Online; there is no import | [site.pro](https://site.pro/Blog/Why-Weebly-Shuts-Down-in-67-Countries/) |
| Credit Card rewards | Changed from $1 of free processing per $3 spent to 3%/1.5% cash back | 2023, then 2026-08-11 | — | [Credit Card press](https://squareup.com/us/en/press/square-credit-card-bill-pay-refresh) |
| Savings top rate | Cut from 4.25% to 3.50% APY | By 2026-06 | — | [Business Wire](https://www.businesswire.com/news/home/20260611611379/en/Square-Financial-Services-Introduces-3.50-APY-High-Yield-Savings-for-Square-Sellers-More-Than-8-Times-the-National-Average) |
| Instant transfer fee | Raised from 1.5% to 1.75% to 1.95% | Dates not confirmed | — | [Policy and pricing updates](https://squareup.com/us/en/press/policy-and-pricing-updates) |
| Free-plan online card rate | Raised from 2.9% to 3.3% + 30¢ | 2026-01-13 [3P] | — | [beancount.io](https://beancount.io/blog/2026/09/02/square-free-plan-card-rate-increase-annual-cost-small-business-guide) |
| In-person per-transaction fee | Raised from 10¢ to 15¢ | Date unconfirmed [3P] | — | [KORONA POS](https://koronapos.com/blog/square-pos-fees/) |
| Gift card load fee | Introduced at 2.5% | Repricing announced 2024-01-31; fee from 2024-03-01 [C] | — | [Community](https://community.squareup.com/t5/Payments-Troubleshooting/Questions-about-Square-Gift-Cards-Repricing-1-31-24/m-p/714093) |
| Square Go; Photo Studio; Square Installments | 2026 status unknown; no source found on Installments | — | UNCONFIRMED | [Square Go press](https://squareup.com/us/en/press/square-go) |
| Connect v1 APIs | Retired 2021. V1 Payments, Refunds and Settlements removed from the spec 2024-02-22. V1 online Orders and V1 webhooks still listed as deprecated | 2021–2024 | v2 APIs; Payouts replaces Settlements | [Migrate from v1](https://developer.squareup.com/docs/migrate-from-v1); [Spec history](https://github.com/square/connect-api-specification/commits/master/api.json) |
| Transactions API | Superseded 2019-08-15; Capture and Void removed; List and Retrieve deprecated | 2026-09-16 | Payments, Refunds, Orders | [Spec history](https://github.com/square/connect-api-specification/commits/master/api.json) |
| Employees API (v2); EmployeeWages | Deprecated 2020-08-26; docs say retired 2021-08-26, yet the spec still lists them | 2020–2021 | Team API; TeamMemberWages | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Labor Shift endpoints and `labor.shift.*` webhooks | Deprecated 2025-05-21; docs say "retired in version 2026-05-21", yet the spec still lists them as deprecated | 2025–2026 | Timecards (GA) and Scheduled Shifts (beta) | [Labor docs](https://developer.squareup.com/docs/labor-api/what-it-does?preview=true); [Changelog 2025-05-21](https://developer.squareup.com/docs/changelog/connect-logs/2025-05-21) |
| OAuth RenewToken | Removed | 2024-04-17 | Refresh tokens through ObtainToken | [Spec history](https://github.com/square/connect-api-specification/commits/master/api.json) |
| Mobile Authorization API | Deprecated 2025-02-20; removed from the spec 2026-05-20 | 2025–2026 | Mobile Payments SDK with OAuth | [Changelog 2025-02-20](https://developer.squareup.com/docs/changelog/connect-logs/2025-02-20) |
| Reader SDK (iOS, Android, React Native, Flutter) | <ul><li>Deprecated early 2025; retirement set for 2025-12-31</li><li>The 2026-01-22 and 2026-04-16 changelogs say it is retired and can no longer take payments</li><li>Sources disagree on the exact cutoff date</li></ul> | 2025–2026 | **Mobile Payments SDK** | [Forum](https://developer.squareup.com/forums/t/action-required-reader-sdk-deprecation-and-retirement/20750); [Changelog 2026-01-22](https://developer.squareup.com/docs/changelog/connect-logs/2026-01-22); [Mobile changelog 2026-04-16](https://developer.squareup.com/docs/changelog-mobile-logs-2026-04-16) |
| SqPaymentForm; CreateCheckout; Customers card endpoints; ListLoyaltyPrograms | Replaced or deprecated | Various | Web Payments SDK; payment links; Cards API; RetrieveLoyaltyProgram | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Old Inventory URLs; RetrieveInventoryChanges; RetrieveInventoryTransfer | Old forms deprecated; RetrieveInventoryTransfer removed | 2026-07-15 | New URLs; Transfer Orders (beta) | [Spec history](https://github.com/square/connect-api-specification/commits/master/api.json) |
| Old webhook names | `dispute.state.changed`, `.evidence.added` and `.evidence.removed` became `.state.updated`, `.evidence.created` and `.evidence.deleted`; customer custom-attribute events moved to `.owned` / `.visible` | — | New names | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Legacy Reporting API; `x-square-signature` (HMAC-SHA1) | Reporting API retired; the old signature header is being retired | — | Reporting API (beta); `x-square-hmacsha256-signature` | [Spec](https://github.com/square/connect-api-specification/blob/master/api.json); [Webhook Relay](https://webhookrelay.com/verify-square-webhook-signature/) |
| Recording outside payments in the Mobile Payments SDK | Removed in Android 2.6.0 | 2026 | Payments API `EXTERNAL` source | [Android releases](https://github.com/square/mobile-payments-sdk-android/releases) |

**What changed in 2025–2026, in order.** Use this to date older material.

| Date | Change |
|---|---|
| 2025-02-20 | Reader SDK and Mobile Authorization API deprecated ([Changelog](https://developer.squareup.com/docs/changelog/connect-logs/2025-02-20)) |
| 2025-05-13 | Square Handheld ($399), unified POS app, twice-yearly "Square Releases" events begin ([Square press](https://squareup.com/us/en/press/square-handheld)) |
| 2025-05-21 | Labor Timecards GA, Scheduled Shifts beta, Shifts deprecated ([Changelog](https://developer.squareup.com/docs/changelog/connect-logs/2025-05-21)) |
| 2025 (June per one source) | Square AI open beta in the US ([Square AI press](https://squareup.com/us/en/press/square-ai-open-beta)) |
| 2025-10-06 | Free / Plus / Premium plans replace 18 subscriptions ([Press release](https://squareup.com/us/en/press/unified-pricing-and-packaging)) |
| 2025-10 | Square Releases: AI voice ordering, Square AI upgrades, Bitcoin Conversions; Cash App Neighborhoods launches ([Restaurant Dive](https://www.restaurantdive.com/news/square-product-update-voice-ordering-ai-assistant/802331/); [Neighborhoods press](https://squareup.com/us/en/press/neighborhoods-by-cash-app)) |
| 2025-10-16 | Channels and Transfer Orders APIs (beta) ([Spec history](https://github.com/square/connect-api-specification/commits/master/api.json)) |
| 2025-11-10 | Bitcoin payments live for US sellers except New York ([Bitcoin Magazine](https://bitcoinmagazine.com/business/square-bitcoin-payments-go-live-today)) |
| 2026-01-13 | Free-plan online rate rises to 3.3% + 30¢ [3P] ([beancount.io](https://beancount.io/blog/2026/09/02/square-free-plan-card-rate-increase-annual-cost-small-business-guide)) |
| 2026-01-22 | API version adds US credit-card surcharging to the Terminal and Payments APIs ([Changelog](https://developer.squareup.com/docs/changelog/connect-logs/2026-01-22)) |
| 2026-02-04 | Square Register 2nd generation ($899) ([Business Wire](https://www.businesswire.com/news/home/20260204804070/en/Second-Generation-Square-Register-Delivers-More-Speed-Power-and-Reliability-to-the-Neighborhood)) |
| 2026-04-12 | Offline payments switched on by default ([Feature Log](https://squareup.com/us/en/feature-log)) |
| 2026-04-28 | Managerbot open beta ([Managerbot press](https://squareup.com/us/en/press/managerbot-open-beta)) |
| 2026-05-20 | Bank Accounts create/disable (beta); `PAYOUTS_WRITE` scope; Mobile Authorization removed ([Spec history](https://github.com/square/connect-api-specification/commits/master/api.json)) |
| 2026-06-11 | Savings pays 3.50% APY at $10K or more ([Business Wire](https://www.businesswire.com/news/home/20260611611379/en/Square-Financial-Services-Introduces-3.50-APY-High-Yield-Savings-for-Square-Sellers-More-Than-8-Times-the-National-Average)) |
| 2026-07-01 | ChatGPT app and Claude plugin for food and beverage ordering ([Business Wire](https://www.businesswire.com/news/home/20260701594157/en/Square-Introduces-New-ChatGPT-and-Claude-Integrations-Helping-Sellers-Reach-Customers-Through-AI-Powered-Discovery)) |
| 2026-07-15 / 07-16 | Inventory adjustment reasons API; gratuity rules, nested modifiers, vendor payments ([Release notes, July 16](https://squareup.com/us/en/release-notes/release-notes-july-16th)) |
| 2026-07-30 | EBT/SNAP open beta ([Release notes, July 30](https://squareup.com/us/en/release-notes/release-notes-july-30th)) |
| 2026-08-11 | Credit Card refresh and Bill Pay expansion ([Credit Card press](https://squareup.com/us/en/press/square-credit-card-bill-pay-refresh)) |
| 2026-09-16 | Current API version; Transactions Capture and Void removed ([Spec](https://github.com/square/connect-api-specification/blob/master/api.json)) |
| 2026-09-21 / 10-05 / 10-20 | Refunds without a matching sale; automatic service charges; 3D Secure on large invoice payments; tips split across clocked-in staff ([Feature Log](https://squareup.com/us/en/feature-log)) |
| 2026-10-14 | AI Square Kiosk, $1,999 plus $99/mo ([FinancialContent](https://www.financialcontent.com/article/bizwire-2026-10-14-introducing-the-new-square-kiosk-reimagining-self-service-with-intelligence)) |
| 2026-11-02 (scheduled) | Automatic card surcharges on invoices paid in full ([Feature Log](https://squareup.com/us/en/feature-log)) |
| 2027-01-01 | Bitcoin payment fee goes from 0% to 1% ([Help 8622](https://squareup.com/help/us/en/article/8622-accept-and-manage-bitcoin-payments)) |

## Sheen should integrate Square's ledger and build its dispatch brain

**"Replace Square entirely" can mean two different things.** Sheen could:

- **replace Square's apps** while keeping Square as the card processor, or
- **replace Square as the processor** too.

**The catalog supports a staged path:**

1. **Keep Square as the payments layer behind Sheen's own screens.** Every item in the first table below has a supported API.
2. **Build everything in the second table.** Square either lacks those features or keeps them inside its own apps.
3. **Later, switching processors becomes a matter of swapping one payments module.** Leaving Square has costs:

| What changes | Effect |
|---|---|
| Square Loans | Future loan offers stop |
| Square Checking | Instant access to sales stops |
| Form 1099-K | It would come from the new processor |
| Neighborhoods | Visibility there ends |
| Orders API | Square charges a fee if the Orders API is used with a non-Square processor ([Spec](https://github.com/square/connect-api-specification/blob/master/api.json)) |

**The plan Sheen needs.** For the payments-layer role, **Square Free is enough**. A paid plan becomes worth it only in these cases:

- Sheen wants Square-hosted Loyalty.
- Sheen wants business-side Square bookings.
- Sheen wants Square invoice installments.
- Online card volume passes about $12,250 a month, and the "Online API" rate turns out to be 3.3% on Free.

**Integrate through Square's API (if Square remains the processor):**

| Need in Sheen's app | Square API / SDK | Plan needed | Cost | Caveats |
|---|---|---|---|---|
| Card payments in the customer's driveway | Mobile Payments SDK (iOS, Android, React Native, Flutter) + Payments API | Free | 2.6% + 15¢; hardware $0 with Tap to Pay or $59 Reader | <ul><li>Tap to Pay doesn't work offline</li><li>Sandbox can't test in-person payments</li><li>Android needs the app signature registered</li></ul> |
| Booking deposits, pay-later links, Apple Pay / Google Pay / ACH / Cash App Pay / Afterpay | Web Payments SDK + Payments API; Checkout API payment links | Free | <ul><li>3.3% + 30¢ hosted on Free (or 2.9% via the "Online API", UNCONFIRMED)</li><li>ACH: 1%, $1 minimum, $5 maximum</li><li>Afterpay: 6% + 30¢</li></ul> | HTTPS and a Content Security Policy required |
| Save card at booking, hold it, charge after the job, add the tip | Cards + Customers APIs; Payments with `autocomplete=false`, UpdatePayment, CompletePayment | Free | 3.5% + 15¢ on card-on-file charges | <ul><li>Card-not-present holds last at most 7 days</li><li>Sheen carries the chargeback risk on card-on-file charges</li></ul> |
| Refunds, and disputes with job photos as evidence | Refunds API, Disputes API | Free | No dispute fee | Evidence files up to 5 MB |
| Matching deposits to the ledger | Payouts API (ListPayoutEntries) + Bank Accounts API | Free | — | <ul><li>Add up totals yourself</li><li>Instant-transfer fees may be missing</li><li>Starting a transfer is Dashboard-only</li></ul> |
| Customer and vehicle records | Customers, Customer Custom Attributes and Customer Groups APIs; read Segments | Free | — | <ul><li>No SMS consent field</li><li>No merge endpoint</li><li>Calculate visit and spend totals yourself</li></ul> |
| Service menu with vehicle-size variations and add-ons; itemized tickets and tax | Catalog API + Orders API | Free | — | <ul><li>UpdateOrder and PayOrder are beta</li><li>Orders with a non-Square processor incur a fee</li></ul> |
| Monthly maintenance plans | Subscriptions API + Catalog subscription plans; payment links `subscription_plan_id` | Free | Processing only | <ul><li>Pause and plan swap are beta</li><li>Sheen's app tracks visits used and books them</li></ul> |
| Gift cards | Gift Cards + Gift Card Activities APIs | Free | 2.5% load fee (0% on Premium) | Whether API activations pay the load fee is UNCONFIRMED |
| Loyalty points | Loyalty API | Plus ($49) | — | Program defined once in the Dashboard |
| Square-hosted invoice pages (optional) | Invoices API | Free; installments and custom fields need a paid tier | Card 3.3% / 2.9% + 30¢; ACH 1% | <ul><li>No API to mark an invoice paid</li><li>No estimates</li></ul> |
| Staff timecards and shifts kept in Square (optional) | Team API, Labor Timecards, Scheduled Shifts (beta) | Free | — | Permissions and passcodes stay in the Dashboard |
| Keeping data in sync and recovering missed events | Webhook Subscriptions (personal access token) + Events API (beta, 28 days) | Free | — | Retry window is 24 or 72 hours (CONFLICT); add regular reconciliation jobs |
| Analytics backfill (optional) | Reporting API (open beta) | Free | — | Beta |
| One-time migration out of Square | Customers, Catalog, Bookings, Invoices, Orders, Payments, Gift Cards, Loyalty, Team, Timecards | Free | — | No API export for Marketing, Messages, Payroll, estimates or feedback; use CSV or re-enter by hand |

**Build in Sheen's own app:**

| Capability | Why Square can't supply it | Notes |
|---|---|---|
| Scheduling that accounts for drive time; buffers before jobs; daily routing; service-area or ZIP-code limits | <ul><li>Not offered</li><li>Square's only buffer comes after a service and needs a paid plan</li><li>Business-side Bookings API writes need Appointments Plus</li></ul> | Competing detailing apps market directly against this gap ([CalMov](https://www.calmov.com/resources/square-appointments-alternative-for-mobile-detailers)) |
| Crew dispatch, job status (en route, arrived, done), GPS, before/after photos per stage, vehicle profiles, pricing by vehicle size | Not Square features; Square "jobs" are job titles, not work orders | Store vehicle data in your own database, or in Customer/Booking custom attributes if mirroring to Square |
| Estimates, multi-option packages, approvals, contracts and e-signatures, projects | No API | Copy Square's estimate-to-invoice auto-conversion pattern |
| Two-way SMS and email inbox, business number, voicemail, text-back after missed calls, AI receptionist, reminders and confirmations | Messages, the phone number, Square Assistant and voice ordering have no API; Square has no outbound calling | Use a telephony provider; tell customers about the new number, since Square's number reportedly can't forward calls |
| Marketing campaigns, automations, SMS/email coupons, texting-consent records | No Marketing API; no SMS consent field | Write the opt-out back to Square's `email_unsubscribed` if mirroring |
| Feedback, Google review requests, referral program, customer portal | No API; Square's review trigger (3 visits a year) suits infrequent detailing poorly; no customer referrals | The portal can read Square loyalty and gift-card balances through the API |
| Customer segments and smart groups | Segments API is read-only | — |
| Reports, dashboards and an AI assistant | Reporting API is beta only; Square AI and Managerbot have no API | Copy Managerbot's approve-before-acting design |
| Website and booking page | Square Online is closed; Sites and Snippets are early access only | — |
| Payroll, including Oregon taxes (Paid Leave Oregon; Statewide Transit 0.1%; TriMet 0.8237%), commissions, tip pooling, geofenced clock-in, permissions | No Payroll API; Square's transit-tax support is UNCONFIRMED | Embedding a payroll provider beats building payroll tax filing from scratch |
| Bookkeeping ledger, expenses, mileage, tax set-asides, paying vendors | Banking, Savings and Bill Pay have no API | Build from Sheen's own payment records plus a bank-data feed |
| Income-tax preparation exports (Schedule C, estimated taxes), Oregon and Portland business taxes, contractor 1099-NEC | Square does none of these outside Payroll | Oregon and Portland rules were not verified here; confirm with Oregon DOR and the Portland Revenue Division |
| Sales tax engine | Square calculates tax but doesn't file it | Configure 0% for Oregon work; keep it configurable for out-of-state jobs |
| Fraud rules | Risk Manager is Dashboard-only | Implement the app's own screening rules |

**Some settings stay manual in the Dashboard while Sheen remains on Square.** None of them can be changed through the API:

- plan changes
- transfer schedules and instant transfers
- linking bank accounts (the create endpoint is still beta)
- Risk Manager rules
- surcharge enrollment and its 30-day card-network notice
- offline payment limits
- turning bitcoin on
- defining the loyalty program
- smart groups
- permission sets and passcodes
- Appointments policies, if Square bookings are still used
- downloading the yearly Form 1099-K

## Conclusion

**Square's API boundary follows its business model.** It opens what earns money for Square and closes what competes with its subscriptions:

- **Open:** anything that generates card volume, meaning payments, cards, invoices, bookings, catalog and customers. Third-party apps that move more money through Square make Square more fees.
- **Closed:** anything Square sells as a subscription or a bank product, meaning Marketing, Messages, Payroll, Checking, Loans and AI.

**What this means for Sheen:**

- Sheen gives up nothing by building the closed pieces itself. They were never available to integrate.
- The Plus plan bundles marketing, loyalty, the business number and staff tools. That is almost exactly the set Sheen plans to rebuild, so Plus would mostly pay for features Sheen will replace.
- The natural steady state is **Square Free plus the public APIs, used as a payments-and-records layer**. A paid plan would only unlock API features Sheen avoids by owning bookings, invoices and loyalty itself.
- The dispatch layer Sheen needs has never existed in Square: drive-time scheduling, service-area limits, crew status, vehicle profiles and job photos. That gap is Sheen's main reason to build its own app.

**Four figures could change the build plan.** Verify them before writing production code:

| Item to verify | Why it matters |
|---|---|
| The Free-plan "Online API" rate (2.9% or 3.3%) | It decides whether Plus ever pays for itself |
| Whether Square Plus satisfies the API checks that still name "Appointments Plus" and "Invoices Plus" | It decides whether Square bookings and installment invoices are usable on Plus |
| The beta status of PayOrder, UpdateOrder, Scheduled Shifts and the Events API | Core dispatch flows should not depend on them |
| Square Payroll's handling of TriMet and the Oregon Statewide Transit Tax | It decides which payroll provider Sheen embeds |

**One dated deadline:** the 0% bitcoin fee ends on 2026-12-31.
