# Square (US) payment acceptance, processing fees, payouts, risk tools, hardware and API coverage, as of 2026-10-31

How this was researched, and how far to trust it. The session's network blocked direct fetches of squareup.com and developer.squareup.com (DNS failure: "outside the session's allowed network domains"). All official Square figures below therefore come from search-engine extracts of those official pages, not from reading the full pages. Several of those extracts carried old cache dates. Each item is tagged:
- [OFFICIAL]: the extract came from a squareup.com, square.site or developer.squareup.com page.
- [OFFICIAL-OLD?]: an official page whose extract looked stale, or that conflicts with a newer official page.
- [COMMUNITY]: a Square Community or Square Developer Forums post. These are Square-hosted but not policy pages.
- [3P]: a third-party review, blog or news story only, not confirmed on an official Square page.

Before the coding agent hard-codes any fee, re-check it against squareup.com/us/en/pricing and the Dashboard's "Pricing & subscriptions" page. A Square help extract itself says rates "may vary based on plan type" ([Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees)).

## 1. Every way to accept payment (channels, devices, tenders, offline)

### Takeaway
A US seller can take money through these channels:
- Square POS on a phone, with Tap to Pay on iPhone or Android.
- Square card readers.
- Square devices: Terminal, Register (2nd gen, Feb 2026), Stand and Stand Mount, Handheld (May 2025), and the new AI Square Kiosk (Oct 14, 2026).
- Virtual Terminal and manual key-in, and cards on file.
- Payment Links and Square Online checkout.
- Invoices, which can be paid by card, ACH, Cash App Pay or Afterpay.
- ACH bank transfer, Cash App Pay, Afterpay, Apple Pay and Google Pay.
- Square gift cards.
- Cash and recorded "external" tenders such as checks.
- Bitcoin, live since late 2025 at 0% through 2026-12-31, then 1%.
- EBT/SNAP, in open beta since July 2026.

Klarna, PayPal and Venmo are not supported. Offline Mode covers dipped, tapped and swiped cards on Square hardware only. It does not cover Tap to Pay, keyed entry, Afterpay, Cash App Pay, gift cards or EBT.

### Cited Findings

**Channels and devices (seller-facing)**
- **No hardware needed.** Square says you do not need to purchase hardware to take payments with Square. The Square POS app is the $0 Free plan. [OFFICIAL] — [Square pricing](https://squareup.com/us/en/pricing)
- **Tap to Pay on iPhone**
  - Fee: 2.6% + 15¢ per tap. [OFFICIAL-OLD?: legacy table in the fees article] — [Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees)
  - Device requirement in the seller docs: iPhone XS or newer, iOS 16.4 or later. [OFFICIAL, from an AU-site page] — [Square AU Tap to Pay on iPhone](https://squareup.com/au/en/the-bottom-line/inside-square/tap-to-pay-iphone)
  - Device requirement in the developer docs: iPhone XS or newer, iOS 16.7 or later, and not on iPad. This conflicts with the iOS 16.4 figure above. [OFFICIAL] — [Mobile Payments SDK: Tap to Pay on iPhone](https://developer.squareup.com/docs/mobile-payments-sdk/ios/tap-to-pay)
- **Tap to Pay on Android**
  - Fee: 2.6% + 15¢ per tap. [OFFICIAL] — [Square: Tap to Pay on Android](https://squareup.com/us/en/the-bottom-line/selling-anywhere/tap-to-pay-android)
  - SDK requirement: Android 9 or later, phones only (no tablets). [OFFICIAL] — [MP SDK: Tap to Pay on Android](https://developer.squareup.com/docs/mobile-payments-sdk/android/tap-to-pay)
- **Square Reader for contactless and chip:** $59. Every dip or tap is 2.6% + 15¢. [OFFICIAL] — [Square hardware](https://squareup.com/us/en/hardware); [NFC Reader page](https://squareup.com/us/en/hardware/contactless-chip-reader)
- **Square Reader for magstripe:** the first one is $0 and each additional reader is $10. [3P] — [NerdWallet Square POS review](https://www.nerdwallet.com/business/software/reviews/square-pos)
- **Square Terminal:** $299, or $27/mo over 12 months. [OFFICIAL] — [Square hardware](https://squareup.com/us/en/hardware)
- **Square Register (2nd generation)**
  - Launched 2026-02-04 at $899. It is up to 40% faster than the previous model and is IP54-rated, with an angled, reinforced card-dip slot. [OFFICIAL press via Business Wire] — [Business Wire 2026-02-04](https://www.businesswire.com/news/home/20260204804070/en/Second-Generation-Square-Register-Delivers-More-Speed-Power-and-Reliability-to-the-Neighborhood); [Square Register page](https://squareup.com/us/en/hardware/register)
  - It is described as dual-screen, so it has a customer-facing display. [3P] — [Business News Daily](https://www.businessnewsdaily.com/square-review)
- **Square Stand (USB-C) and Square Stand Mount:** $149 each, or $14/mo over 12 months for the Stand. The Stand turns an iPad into a POS. [OFFICIAL] — [Square hardware](https://squareup.com/us/en/hardware); [Stand page](https://squareup.com/us/en/hardware/stand). The Stand Mount price comes from [3P] — [NerdWallet](https://www.nerdwallet.com/business/software/reviews/square-pos).
- **Square Handheld:** $399, or $37/mo over 12 months. Launched in May 2025 with a 6.2-inch screen and an IP54 rating. [OFFICIAL] — [Square hardware](https://squareup.com/us/en/hardware); launch coverage at [TechRadar](https://www.techradar.com/pro/square-launches-new-portable-point-of-sale-handheld-device-thats-barely-bigger-than-a-smartphone-and-theres-even-a-16-megapixel-camera)
- **Square Kiosk (new, launched 2026-10-14)**
  - $1,999 including the counter stand; the total varies with the stand type. It also costs $99/month per device in software fees and requires a Square Plus ($49) or Premium ($149) plan. It offers agentic-AI voice ordering. [OFFICIAL price on the hardware page and in the Business Wire release; fee details from 3P news] — [Square hardware](https://squareup.com/us/en/hardware); [Business Wire via FinancialContent 2026-10-14](https://www.financialcontent.com/article/bizwire-2026-10-14-introducing-the-new-square-kiosk-reimagining-self-service-with-intelligence); [Investing.com](https://www.investing.com/news/company-news/square-launches-aipowered-kiosk-with-voice-ordering-for-1999-93CH-4949752); [FourWeekMBA](https://fourweekmba.com/ai-squares-ai-kiosk-takes-voice-orders-1999-99-a-month/)
  - The older iPad-based Kiosk is now positioned as "Kiosk Lite" running on Square Stand. [3P] — [Maple blog](https://maple.inc/blog/square-kiosk)
  - A September 2026 blog listed the older Kiosk hardware at $149 plus an app fee of "$50 or $30 a month per device" on top of Plus or Premium. That is pre-launch, older pricing. [3P] — [Maple blog](https://maple.inc/blog/square-kiosk)
- **Virtual Terminal (browser-based key-in)**
  - No monthly fee. Keyed or payment-link transactions are 3.5% + 15¢, and in-person payments through it are 2.6% + 15¢. [OFFICIAL] — [Virtual Terminal page](https://squareup.com/us/en/payments/virtual-terminal)
  - Older fee-table entries read "Manually Entered Virtual Terminal Payments: 3.5% + 15¢" and "Swiped Virtual Terminal Payments: 2.6% + 15¢". [OFFICIAL-OLD?] — [Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees)
- **Card on file and manually entered cards:** 3.5% + 15¢ on the Free plan. [OFFICIAL] — [Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees). Third-party fee guides say paid plans do not discount this rate. [3P] — [net-proceeds.com](https://www.net-proceeds.com/square-fee-calculator/)
- **Payment Links:** no monthly fee, and the standard online rate is 3.3% + 30¢, which "applies for new Square customers." Text-message payment links are also 3.3% + 30¢. [OFFICIAL] — [Square Payment Links](https://squareup.com/us/en/payment-links); [Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees)
- **Square Online (website or online store) checkout:** card payments are 3.3% + 30¢ on Free and 2.9% + 30¢ on Plus and Premium. [OFFICIAL] — [Square pricing](https://squareup.com/us/en/pricing); see also [Online Store plans](https://squareup.com/us/en/online-store/plans)
- **Invoices**
  - Card payments: 3.3% + 30¢ on Free and 2.9% + 30¢ on Plus and Premium. [OFFICIAL] — [Square pricing](https://squareup.com/us/en/pricing)
  - The invoice-specific fee article still says a flat 2.9% + 30¢, and 3.5% + 15¢ when a stored card is charged on an invoice. [OFFICIAL-OLD?] — [Square Invoices fees](https://squareup.com/help/us/en/article/7201-square-invoices-fees)
  - Invoices can also be paid by ACH, Cash App Pay and Afterpay (see below). [OFFICIAL/COMMUNITY] — [Cash App Pay for Invoices](https://community.squareup.com/t5/Product-Updates/Cash-App-Pay-for-Invoices-another-way-to-get-paid/bc-p/668022)
- **Charging a card on file from an invoice:** supported, but not on invoices that have goods-and-services confirmation enabled. [OFFICIAL] — [Use payment methods on file with Invoices](https://squareup.com/help/us/en/article/5797-use-card-on-file-with-square-invoices)

**Payment methods and tenders**
- **ACH bank transfer**
  - Invoice ACH: 1% with a $1 minimum. Square's help says upgrading to Invoices Plus gives a $10 cap per ACH transaction. [OFFICIAL] — [Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees); [Invoice fees](https://squareup.com/help/us/en/article/7201-square-invoices-fees). Community confirms the $1 minimum and $10 cap. [COMMUNITY] — [Invoice Fees ACH thread](https://community.squareup.com/t5/Square-Invoices/Invoice-Fees-ACH-Maximum-Fee/td-p/728475)
  - ACH taken through the Web Payments SDK plus the Payments API: 1% with a $1 minimum and $5 maximum, and no chargeback fees. [OFFICIAL-OLD?: cache looked old] — [Payments Pricing with Square APIs and SDKs](https://developer.squareup.com/docs/payments-pricing)
- **Cash App Pay**
  - In-person: 2.6% + 15¢. Card-not-present: 3.3% + 30¢ (Free). [OFFICIAL] — [Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees)
  - Developer docs: same rate as card payments, US sellers only. [OFFICIAL] — [Payments pricing (dev)](https://developer.squareup.com/docs/payments-pricing)
  - A 2023-era announcement put Cash App Pay on invoices at 2.9% + 30¢. [COMMUNITY, older] — [Cash App Pay for Invoices](https://community.squareup.com/t5/Product-Updates/Cash-App-Pay-for-Invoices-another-way-to-get-paid/bc-p/668022)
- **Afterpay (buy now, pay later):** 6% + 30¢ across in-person, online, invoice and Virtual Terminal payments. Free to enable, with no monthly or startup fees. [OFFICIAL] — [Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees); [Payments pricing (dev)](https://developer.squareup.com/docs/payments-pricing)
- **Apple Pay and Google Pay:** online, they are supported as digital-wallet buttons in the Web Payments SDK. [OFFICIAL] — [Web Payments SDK digital wallets](https://developer.squareup.com/docs/web-payments/digital-wallets)
- **Square gift cards**
  - Custom plastic cards cost from 50¢ per card. Physical and eGift loads carry a 2.5% load fee plus standard processing on Free and Plus. eGift setup is free. Online eGift purchases are 2.9% + 30¢. There is no fee on redemption. [OFFICIAL] — [Gift card pricing](https://squareup.com/us/en/gift-cards/pricing)
  - Premium pays no load fee. [OFFICIAL] — [Square pricing](https://squareup.com/us/en/pricing)
  - The 2.5% load fee started 2024-03-01. [COMMUNITY] — [Gift card repricing thread](https://community.squareup.com/t5/Payments-Troubleshooting/Questions-about-Square-Gift-Cards-Repricing-1-31-24/m-p/714093)
- **Cash, checks and other external tenders:** the Payments API records cash (source `CASH`) and money received outside Square (source `EXTERNAL`, with a required type such as `CHECK` or `BANK_TRANSFER`). [OFFICIAL] — [External payments](https://developer.squareup.com/docs/payments-api/take-payments/external-payments); [Cash payments](https://developer.squareup.com/docs/payments-api/take-payments/cash-payments)
- **Bitcoin**
  - Square made bitcoin payments available to eligible US merchants around November 2025. One account says onboarding started in July (2025) with full availability expected in 2026. [3P] — [The Defiant](https://thedefiant.io/news/tradfi-and-fintech/square-bitcoin-pos-zero-fees-2026-xl0czz); [Cointelegraph](https://cointelegraph.com/news/square-bitcoin-payments-merchants-crypto)
  - Fee: 0% through 2026-12-31, then 1% from 2027. Conversion to dollars is reported as about 1% (0.5% for "premium users"). [3P] — [The Defiant](https://thedefiant.io/news/tradfi-and-fintech/square-bitcoin-pos-zero-fees-2026-xl0czz); [CoinCentral](https://coincentral.com/square-unveils-bitcoin-tools-with-no-fees-for-merchants-until-2026/)
  - Reportedly auto-enabled for about 800K sellers. [3P vendor blog] — [Oshi](https://oshi.tech/blog/square-bitcoin-2026)
  - Reported limits: about $600 per payment and about $20,000 per day per seller. No chargebacks or disputes on bitcoin payments. [3P, unconfirmed] — [AurPay](https://www.aurpay.net/aurspace/square-bitcoin-lightning-payments-merchant-integration-2025/)
  - Bitcoin is exempt from Square's 1.5% international-card fee. [OFFICIAL] — [Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees)
- **EBT/SNAP:** open beta for US sellers that hold an active FNS number issued by the USDA, announced 2026-07-30. [OFFICIAL] — [Release notes July 30](https://squareup.com/us/en/release-notes/release-notes-july-30th)
- **HSA and FSA cards:** licensed health-care providers and pharmacies can process them. [3P] — reported in guides such as [Synder](https://synder.com/blog/what-credit-cards-can-square-accept/) and [WhoAcceptsIt](https://www.whoacceptsit.com/merchant/square/); not confirmed on an official page.
- **Klarna:** not supported. Square's BNPL product is Afterpay, acquired in 2022. [3P, low quality] — [AEANET](https://www.aeanet.org/does-square-accept-klarna/)
- **PayPal and Venmo:** Square does not support them directly. [COMMUNITY] — [Square Community: PayPal / Venmo](https://community.squareup.com/t5/Payments-Troubleshooting/PayPal-Venmo/td-p/789631)

**Offline Mode**
- Sellers set a maximum per offline transaction between $1 and $50,000. [OFFICIAL] — [Process offline payments](https://squareup.com/help/us/en/article/7777-process-card-payments-with-offline-mode)
- Time to sell offline: 24 hours on the 2nd-generation contactless and chip reader, the 1st-generation v3 reader and Square Stand, after which the device must reconnect. [OFFICIAL] — [same](https://squareup.com/help/us/en/article/7777-process-card-payments-with-offline-mode)
- Time to upload: 72 hours on Square Register, Terminal and Handheld, with upload within 24 hours strongly recommended. Payments not uploaded in time expire and cannot be recovered. [OFFICIAL] — [same](https://squareup.com/help/us/en/article/7777-process-card-payments-with-offline-mode)
- Not supported offline: EBT/SNAP, Afterpay, Cash App Pay, gift cards, Tap to Pay and manually entered cards. [OFFICIAL] — [same](https://squareup.com/help/us/en/article/7777-process-card-payments-with-offline-mode)
- Offline payments were turned on by default on all devices from 2026-04-12 unless the seller opted out. [OFFICIAL] — [Square Feature Log](https://squareup.com/us/en/feature-log)
- Offline in the Mobile Payments SDK:
  - Limited to 1,000 payments per device per 24 hours, and requires seller opt-in. [OFFICIAL] — [MP SDK Offline Payments](https://developer.squareup.com/docs/mobile-payments-sdk/android/offline-payments)
  - Supported hardware: the two most recent contactless and chip readers, the magstripe reader and Square Stand. Interac fails offline. [OFFICIAL] — [same](https://developer.squareup.com/docs/mobile-payments-sdk/android/offline-payments)
  - Tap to Pay cannot be used offline. [OFFICIAL] — [MP SDK Tap to Pay (iOS)](https://developer.squareup.com/docs/mobile-payments-sdk/ios/tap-to-pay)

### Inferences
- Apple Pay and Google Pay tapped on a reader or with Tap to Pay are contactless card payments, so they most likely carry the in-person card rate (2.6%/2.5%/2.4% + 15¢). Online, they carry the online card rate. No separate wallet fee appeared in any source.
- For a mobile detailer, the practical in-field channels are Tap to Pay on the technician's phone (no hardware), the $59 Reader, or the Handheld. Office and remote channels are invoices, Payment Links, Virtual Terminal and card on file.
- Recorded tenders (cash, check) carry no Square processing fee, because Square only records them. No source states a fee for them.

### Gaps
- QR-code payments: no source found for a US "scan to pay" QR checkout in Square POS, for example Cash App Pay QR or a Payment Link QR. This needs checking.
- Fee for EBT/SNAP: not found.
- Bitcoin specifics: per-payment and daily limits, and whether bitcoin is exposed in any public API. Only third-party sources were found. No official Square bitcoin page was readable.
- Whether Afterpay and Cash App Pay are available in-person on Tap to Pay, the Reader and Terminal, rather than only on Terminal, Register and Handheld screens: not confirmed.
- The exact current Square Online plan prices (Free, Plus, Premium for websites) were not extracted; only the page title was seen ([Online Store plans](https://squareup.com/us/en/online-store/plans)).

## 2. US processing rates, plans, monthly fees and custom pricing

### Takeaway
Square's unified plans (Free $0, Plus $49/mo per location, Premium $149/mo per location) set the rates:

| Payment type | Free | Plus | Premium |
|---|---|---|---|
| In-person (tap, dip, swipe) | 2.6% + 15¢ | 2.5% + 15¢ | 2.4% + 15¢ |
| Online and invoices (card) | 3.3% + 30¢ | 2.9% + 30¢ | 2.9% + 30¢ |
| Keyed and card on file | 3.5% + 15¢ | 3.5% + 15¢ | 3.5% + 15¢ |

Other rates:
- Afterpay: 6% + 30¢.
- Invoice ACH: 1%, $1 minimum ($10 cap on paid tiers or Invoices Plus).
- API ACH: 1%, $1 minimum, $5 maximum.
- Cards issued outside the US: +1.5%.
- Gift card load fee: 2.5% (0% on Premium).
- Above $250K a year in volume: custom pricing.

The Free plan's online rate rose from 2.9% to 3.3% + 30¢, reportedly in January 2026. The plan restructure is reported as October 2025.

### Cited Findings
- **Plan prices:** Free $0, Plus $49/month per location, Premium $149/month per location. Plus and Premium each have a 30-day free trial. [OFFICIAL] — [Square pricing](https://squareup.com/us/en/pricing)
- **In-person rates:** 2.6% + 15¢ (Free), 2.5% + 15¢ (Plus), 2.4% + 15¢ (Premium). [OFFICIAL] — [Square pricing](https://squareup.com/us/en/pricing)
- **Online and invoice rates:** 3.3% + 30¢ (Free), 2.9% + 30¢ (Plus and Premium). [OFFICIAL] — [Square pricing](https://squareup.com/us/en/pricing); [Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees). One third-party source lists Premium online at 2.6% + 30¢, contradicting the rest. [3P outlier] — noted in [KORONA POS](https://koronapos.com/blog/square-pos-fees/) and related search results.
- **Keyed and card-on-file:** 3.5% + 15¢. [OFFICIAL, Free plan] — [Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees). The same rate on all plans is [3P] — [net-proceeds.com](https://www.net-proceeds.com/square-fee-calculator/)
- **Online API rate:** the Free-plan listing in the fees article shows an "Online API" rate of 2.9% + 30¢, separate from online and invoice payments at 3.3% + 30¢. The developer pricing page also lists online transactions at 2.9% + 30¢. [OFFICIAL, needs re-verification] — [Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees); [Payments pricing (dev)](https://developer.squareup.com/docs/payments-pricing)
- **Developer pricing tables:** the Square Terminal and Mobile Payments SDK tables list 2.6% + 15¢ for card-present and 3.5% + 15¢ for card-not-present. Square APIs and SDKs are free for developers; sellers pay only processing fees. [OFFICIAL-OLD?] — [Payments pricing (dev)](https://developer.squareup.com/docs/payments-pricing)
- **Afterpay:** 6% + 30¢ (US). [OFFICIAL] — [Payments pricing (dev)](https://developer.squareup.com/docs/payments-pricing)
- **International cards:** +1.5% on credit or debit cards issued outside the US. It applies to in-person, online, card-not-present and API transactions on every plan, but not to Afterpay, ACH, Cash App Pay, bitcoin or EBT. [OFFICIAL] — [Square pricing](https://squareup.com/us/en/pricing); [Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees)
- **Custom pricing:** "if you process over $250,000 per year, you can talk to our team about custom pricing." [OFFICIAL] — [Square pricing](https://squareup.com/us/en/pricing). Third-party guides call the top tier "Square Pro", custom-priced and aimed at sellers above $250K a year. [3P] — [Costbench](https://costbench.com/software/payment-processing/square/)
- **Unified plans announcement:** Square published "Square Simplifies Commerce Software with New Unified Plans & Pricing" ([press](https://squareup.com/us/en/press/unified-pricing-and-packaging)) and "A Simpler Way Forward: The Thinking Behind Our New [Plans]" ([Bottom Line](https://squareup.com/us/en/the-bottom-line/inside-square/pricing-plans)). [OFFICIAL, titles only; the date was not visible]
- **Date of the restructure:** third-party guides date it to October 2025 (one says 2025-10-06). It replaced 18 à la carte subscriptions with three plans, and Plus was previously $29/mo for some business types. [3P] — [The Retail Exec](https://theretailexec.com/tools/square-pricing/); [Costbench](https://costbench.com/software/payment-processing/square/)
- **Free-plan online rate increase:** from 2.9% + 30¢ to 3.3% + 30¢ on 2026-01-13. [3P] — [beancount.io](https://beancount.io/blog/2026/09/02/square-free-plan-card-rate-increase-annual-cost-small-business-guide). Square's Payment Links page says the 3.3% + 30¢ rate "applies for new Square customers." [OFFICIAL] — [Payment Links](https://squareup.com/us/en/payment-links)
- **In-person per-transaction fee:** reported to have risen from 10¢ to 15¢ (2.6% + 10¢ to 2.6% + 15¢). [3P; date not confirmed] — [KORONA POS](https://koronapos.com/blog/square-pos-fees/)
- **Gift card load fee by plan:** 2.5% on Free and Plus, 0% on Premium. [OFFICIAL] — [Square pricing](https://squareup.com/us/en/pricing)
- **Invoices Plus:** a separate invoicing subscription, described as $20/mo in 2021 coverage. It gives milestones and the $10 ACH cap. [3P/OFFICIAL mix] — [TechCrunch 2021](https://techcrunch.com/2021/08/30/square-to-launch-a-new-paid-subscription-invoices-plus); Square help still names "Square Invoices Plus" alongside Plus and Premium ([help](https://squareup.com/help/us/en/article/6581-request-deposits-with-square-invoices)).
- **PCI and monthly fees:** Square says it never charges monthly fees, PCI-compliance fees, cancellation fees or POS software fees. [OFFICIAL-OLD?] This predates paid plans; the plans above now carry monthly fees. — [Square: processing fees explained](https://squareup.com/us/en/the-bottom-line/managing-your-finances/credit-card-processing-fees-and-rates)

### Inferences
- If the "Online API 2.9% + 30¢" line is still current, a custom app that charges cards through the Web Payments SDK and Payments API may pay 2.9% + 30¢ even on the Free plan. Square-hosted Payment Links, Square Online and invoices cost 3.3% + 30¢ on Free. This matters for Sheen's build-vs-use decision and must be verified.
- The Kiosk's $99/mo per-device fee and the Plus or Premium requirement mean self-service kiosks are a paid-tier feature. They are probably irrelevant to mobile detailing.

### Gaps
- The exact effective dates of the October 2025 plan restructure and the January 2026 Free online-rate change could not be read on an official Square page.
- Whether sellers on legacy plans (signed up before the change) keep 2.9% + 30¢ online: the Payment Links wording "for new Square customers" hints so, but this was not confirmed.
- The full feature list of Plus and Premium (beyond rates, gift-card fees, invoice milestones and Kiosk eligibility) was not extracted.
- The Cash App Pay online rate on Plus and Premium (likely 2.9% + 30¢, the same as cards) was not confirmed.

## 3. Payment features (tipping, signatures, receipts, split tender, deposits, holds, refunds, voids, surcharges, service charges and more)

### Takeaway
Most checkout behaviors exist both in the Square apps and in public APIs:
- Tips through Terminal, Checkout or Payments.
- Signature prompts through the Terminal API.
- Delayed capture, up to 36 hours card-present or 7 days card-not-present.
- Voids through CancelPayment.
- Full and partial refunds through the Refunds API, including unlinked refunds.
- Gift card split tender.
- Invoice deposits and milestones (milestones need a paid tier).

New in 2026:
- US credit-card surcharging on POS, Invoices and bar tabs (plus a Terminal API flag).
- Automatic service charges.
- Gratuity rules and automatic splitting of unattributed tips.
- Refunds without a matching sale.
- 3D Secure on larger invoice payments.

Square has no true "cash discount" program. Appointments has no pre-authorization; it uses no-show protection instead.

### Cited Findings
**Tipping**
- Terminal API: tips can be prompted on the Terminal, or collected in your own app and sent as `tip_money` with `allow_tipping: false`. [OFFICIAL] — [Terminal API: additional checkout features](https://developer.squareup.com/docs/terminal-api/additional-payment-checkout-features)
- The Terminal API does not offer a tip-before-payment flow; a forum feature request from October 2026 asks for one. [COMMUNITY] — [Dev forum](https://developer.squareup.com/forums/t/feature-request-tip-screen-before-payment-for-terminal-api-checkouts/28139)
- With delayed capture, UpdatePayment can change the payment and tip amounts after authorization and before capture. [OFFICIAL] — [Terminal API: additional checkout features](https://developer.squareup.com/docs/terminal-api/additional-payment-checkout-features); [MP SDK take payments](https://developer.squareup.com/docs/mobile-payments-sdk/ios/take-payments)
- In the Payments API, `amount_money` excludes the tip and `total_money` includes it. [OFFICIAL] — [Migrate from Transactions API](https://developer.squareup.com/docs/payments-api/migrate-from-transactions-api)
- Checkout API payment links have an allow-tipping boolean. [OFFICIAL] — [Checkout API](https://developer.squareup.com/docs/checkout-api); [TipSettings object](https://developer.squareup.com/reference/square/objects/TipSettings)
- Release "Gratuity rules, nested modifiers, and vendor payments" (2026-07-16). [OFFICIAL, title only] — [Release notes July 16](https://squareup.com/us/en/release-notes/release-notes-july-16th)
- Unattributed tips are now split equally across all team members clocked in that workday (2026-10-20). [OFFICIAL] — [Square Feature Log](https://squareup.com/us/en/feature-log)

**Signatures**
- Terminal API `collect_signature` (in `DeviceCheckoutOptions`) defaults to false, requires API version 2022-04-20 or later, and works in the US and Canada only. [OFFICIAL] — [Terminal API: additional checkout features](https://developer.squareup.com/docs/terminal-api/additional-payment-checkout-features)

**Split tender and partial payments**
- A Square gift card can cover part of a payment, with the remainder charged to another card. The Payments API minimum for US ACH is $0.01. [OFFICIAL] — [Take Payments](https://developer.squareup.com/docs/payments-api/take-payments)
- Surcharges are not applied on split-tender payments. [OFFICIAL] — [Card surcharges help](https://square.site/help/us/en/article/8596-set-up-and-manage-card-surcharges)

**Deposits, milestones and payment schedules (Invoices)**
- Plus, Premium and Invoices Plus subscribers can split a balance into milestones by percentage or amount. [OFFICIAL] — [Invoice deposits and payment schedules](https://squareup.com/help/us/en/article/6581-request-deposits-with-square-invoices)
- An invoice can have up to 12 milestones beyond the deposit. [OFFICIAL, Canada page] — [CA help](https://my.squareup.com/help/ca/en/article/6581-request-deposits-with-square-invoices)
- A deposit alone (two payments) does not need Invoices Plus. [COMMUNITY] — [Thread](https://community.squareup.com/t5/Questions-How-To/Collect-partial-payment-on-an-invoice/m-p/166441)
- Each deposit or partial payment is charged 2.9% + 30¢. [OFFICIAL-OLD?] — [Invoice fees](https://squareup.com/help/us/en/article/7201-square-invoices-fees)
- ACH cannot be used for partial or scheduled payments; ACH must be disabled to use milestones. [COMMUNITY, older] — [Thread](https://community.squareup.com/t5/Square-Invoices/Invoice-Fees-ACH-Maximum-Fee/td-p/728475)
- Afterpay on an invoice (`buy_now_pay_later` in `accepted_payment_methods`) is allowed only on invoices with a single BALANCE payment request. [OFFICIAL] — [InvoiceAcceptedPaymentMethods](https://developer.squareup.com/reference/square/objects/InvoiceAcceptedPaymentMethods); [Invoices API](https://developer.squareup.com/docs/invoices-api/overview)
- Paid tiers add batch invoices, multi-package estimates, auto-convert of accepted estimates, custom fields and templates. [OFFICIAL, per search extract] — [Create and send invoices](https://squareup.com/help/us/en/article/7399-accept-ach-invoice-payments)
- 3D Secure verification step on larger invoices paid with a new card (2026-10-20). [OFFICIAL] — [Square Feature Log](https://squareup.com/us/en/feature-log)

**Pre-authorization, card holds and delayed capture**
- Payments API delayed capture:
  - Set `autocomplete=false`, then call CompletePayment to capture or CancelPayment to void. [OFFICIAL] — [Delayed capture](https://developer.squareup.com/docs/payments-api/take-payments/card-payments/delayed-capture); [CompletePayment](https://developer.squareup.com/reference/square/payments-api/complete-payment)
  - Default hold window: 36 hours for card-present and 7 days for card-not-present, including cards on file. [OFFICIAL] — [same](https://developer.squareup.com/docs/payments-api/take-payments/card-payments/delayed-capture)
  - `delay_duration` can shorten the window (minimum 1 minute), and `delay_action` sets CANCEL or COMPLETE at expiry. [OFFICIAL] — [same](https://developer.squareup.com/docs/payments-api/take-payments/card-payments/delayed-capture)
  - `version_token` gives optimistic concurrency. [OFFICIAL] — [same](https://developer.squareup.com/docs/payments-api/take-payments/card-payments/delayed-capture)
- Square Appointments no-show protection:
  - A card is held for a single appointment (not saved on file), and a fee can be charged up to 14 days after the appointment. The fee can be flat per appointment, per service, or a percentage of the service price. [OFFICIAL] — [Cancellation and prepayment policies](https://squareup.com/help/us/en/article/5493-set-a-custom-cancellation-policy-with-square-appointments)
  - Appointments does not pre-authorize cards or collect security deposits. [COMMUNITY, about 3 years old] — [Thread](https://community.squareup.com/t5/Archived-Discussions-Read-Only/Card-on-File-No-show-Protection-Appointments-how-do-they-work/td-p/20966)
- Saving a card triggers a small verification authorization that is voided immediately. [COMMUNITY] — [Thread](https://community.squareup.com/t5/Questions-How-To/Card-on-File-No-show-Protection-Appointments-how-do-they-work/m-p/183350)

**Refunds and voids**
- Refunds go through the Refunds API (RefundPayment and ListPaymentRefunds). [OFFICIAL] — [Refund payments](https://developer.squareup.com/docs/payments-api/refund-payments); [POST /v2/refunds](https://developer.squareup.com/reference/square/refunds-api/refund-payment)
- Unlinked refunds have no Square payment ID; with destination `EXTERNAL` they refund payments made elsewhere. Sellers must be authorized for this. [OFFICIAL] — [Unlinked refunds](https://developer.squareup.com/docs/refunds-api/unlinked-refunds)
- In Square POS, staff can now refund from Transactions even with no record of the original sale (2026-09-21). [OFFICIAL] — [Square Feature Log](https://squareup.com/us/en/feature-log)
- Voids: the legacy Transactions API void maps to the Payments API's CancelPayment. [OFFICIAL] — [Migrate from Transactions API](https://developer.squareup.com/docs/payments-api/migrate-from-transactions-api)

**Surcharging (credit cards, US)**
- Scope in the official help:
  - Supported: in-person sales on Square POS apps and Square Invoices (web).
  - Not supported: Connected Terminal, Virtual Terminal, Square Website or Kiosk.
  - Credit cards only: not debit, ACH, tips or split tender.
  - Not allowed in Connecticut, Maine or Puerto Rico.
  - Visa and Mastercard require 30 days' notice before surcharging starts.
  - [OFFICIAL] — [Set up and manage credit card surcharges](https://square.site/help/us/en/article/8596-set-up-and-manage-card-surcharges)
- Surcharging on bar tabs (US and Australia), announced April 2026. [OFFICIAL] — [Release notes April 9](https://squareup.com/us/en/release-notes/release-notes-april-9th)
- Automatic card surcharges on full-balance invoice payments taken in POS and Services mode, US only. The entry is dated 2026-11-02, so it may be scheduled. [OFFICIAL] — [Square Feature Log](https://squareup.com/us/en/feature-log)
- API support:
  - The 2026-01-22 API release added US credit-card surcharge support to the Terminal API (a `DeviceCheckoutOptions` field) and surcharge reporting to the Payments API. [OFFICIAL] — [Changelog 2026-01-22](https://developer.squareup.com/docs/changelog/connect-logs/2026-01-22); [Terminal API features](https://developer.squareup.com/docs/terminal-api/additional-payment-checkout-features)
  - A developer reports the Terminal API "auto card surcharge (Beta)" flag never applies. [COMMUNITY] — [Dev forum](https://developer.squareup.com/forums/t/terminal-api-auto-card-surcharge-beta-never-applies-enrollment-path-for-connected-terminal/26787)
- Before this feature, Square said it could not support surcharging. [COMMUNITY, old] — [FAQ: Passing Square fees to customers](https://community.squareup.com/t5/Product-Updates/-Passing-Square-fees-to-customers/ba-p/692469)
- Surcharging was a beta phase earlier on. [COMMUNITY] — [Card Surcharges Beta](https://community.squareup.com/t5/Payments-Troubleshooting/Card-Surcharges-Beta/td-p/757370)

**Cash discount and service charges**
- Square has no automatic cash-discount program. Staff suggest Service Charges, set as a percentage or a dollar amount, or grossing up prices. [COMMUNITY] — [Thread](https://community.squareup.com/t5/Payments-Troubleshooting/Is-it-possible-to-pass-on-Square-s-fees-to-customers/m-p/75540)
- Automatic service charges added to the POS cart without staff action, US and Canada (2026-10-05). [OFFICIAL] — [Square Feature Log](https://squareup.com/us/en/feature-log)

**Payment requests by SMS or email:** text-message payment links cost 3.3% + 30¢. [OFFICIAL] — [Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees)

**Platform application fees:** apps can collect an application fee on payments they create for a seller. [OFFICIAL] — [Collect application fees](https://developer.squareup.com/docs/payments-api/take-payments-and-collect-fees)

### Inferences
- For a detailing dispatch app:
  - A "card hold at booking, capture after the job" flow maps to the Payments API with `autocomplete=false`. The 7-day card-not-present window limits how far ahead a hold can be placed. Longer gaps need a card on file charged later.
  - Tip-after-service maps to UpdatePayment before capture, or to `tip_money` on the charge.
- Surcharging is legal in Oregon as far as these sources show: only CT, ME and PR are excluded. Square's surcharge does not apply to Virtual Terminal or to API-created online payments, except the Terminal API beta flag.

### Gaps
- **Receipts:** the content of digital (email/SMS) and printed receipts, and whether the API exposes `receipt_url` and `receipt_number`, was not found in this session.
- **Tax and discounts:** how Square applies tax and discounts to transactions (Orders API taxes and discounts, plus POS settings) was not researched in sources.
- **Refund fee policy:** whether Square returns the processing fee on a full or partial refund was not found. On a dispute lost by the seller, fees are not refunded (see section 5).
- **Customer-facing display:** only the Register's dual screen is confirmed. Terminal and Handheld customer-display modes and the "customer display" app for a second iPad were not confirmed.
- **Bar-tab pre-authorization:** the amount and hold rules for bar tabs in Square for Restaurants were not found.

## 4. Funds and payouts

### Takeaway
- **Standard transfer:** next business day, free.
- **Same-day (close of day) and instant transfers:** 1.95% per transfer. This was 1.5%, then 1.75%; Square Checking pages still show 1.75%.
- **Square Checking:** funds are available instantly after each sale at no fee.
- **Bank accounts:** several can be linked, with one per location.
- **Payout data:** the Payouts API exposes payouts and per-transaction entries.

### Cited Findings
- **Standard schedule:** every seller starts on the standard next-business-day transfer, with no fee. [OFFICIAL] — [Set up and edit transfer options](https://squareup.com/help/us/en/article/3807-deposit-options-with-square)
- **Instant and same-day transfers**
  - Fee: 1.95% per transfer, in addition to standard card processing fees. Instant transfers are on demand, 24/7. Same-day can be set per weekday (Standard, Same-Day, or Custom by day) and sends funds at close of day. [OFFICIAL] — [Transfer options](https://squareup.com/help/us/en/article/3807-deposit-options-with-square); [Instant transfers](https://squareup.com/us/en/payments/instant-transfers)
  - Fee history: earlier, Square announced a change from 1.5% to 1.75%. [OFFICIAL] — [Policy and pricing updates](https://squareup.com/us/en/press/policy-and-pricing-updates)
  - Some Square Checking help text still cites 1.75%. [OFFICIAL, conflicting] — [Checking transfers](https://squareup.com/help/us/en/article/7604-square-checking-transfers)
  - New sellers may face a $2,000 daily limit. [Unverified search extract] — [Transfer options](https://squareup.com/help/us/en/article/3807-deposit-options-with-square)
- **Debit card destination:** a linked debit card supports instant and same-day transfers. Adding money to the Square balance from a linked card is free. [OFFICIAL] — [Checking transfers](https://squareup.com/help/us/en/article/7604-square-checking-transfers)
- **Square Checking**
  - A free business checking account. Sale funds are available instantly after each sale with no transfer needed, and recurring transfers out can be daily, weekly or monthly. [OFFICIAL] — [Business checking](https://squareup.com/us/en/banking/checking); [Checking transfers](https://squareup.com/help/us/en/article/7604-square-checking-transfers)
  - One user reports that opening Checking stops automatic transfers for that location to the external bank. [COMMUNITY] — [Thread](https://community.squareup.com/t5/Banking-With-Square/Keep-transfers-to-linked-bank-account-not-square-checking/td-p/357548)
  - ACH payments received into Square Checking carry $0 processing fees. [Search extract; exact page unverified] — [Square fees article](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees)
- **Multiple bank accounts:** a seller can link several verified external accounts and assign one per location, with only one linked account per location at a time. [OFFICIAL] — [Link and edit transfer methods](https://squareup.com/help/us/en/article/3896-link-and-edit-your-bank-account); [COMMUNITY announcement](https://community.squareup.com/t5/Product-Updates/Add-multiple-bank-accounts-to-receive-funds/ba-p/618252)
- **Payouts API**
  - A Payout is the sum of the transactions in one transfer to an external destination. ListPayoutEntries returns PayoutEntry line items (charges, refunds, fees, deposit fees), each with gross, fee and net amounts. Payouts can be combined with the Payments, Orders and Bank Accounts APIs for reconciliation. [OFFICIAL] — [Payouts API](https://developer.squareup.com/docs/payouts-api/overview); [PayoutEntry](https://developer.squareup.com/reference/square/objects/PayoutEntry)
  - The API gives no summary totals; you compute them yourself. [COMMUNITY] — [Dev forum](https://developer.squareup.com/forums/t/i-would-like-to-retrieve-bank-transfers-in-the-api-and-be-able-to-see-a-summarized-version-of-all-the-entries/7067)
  - A forum thread title reports "Square payout unclear and missing instant transfer fees in API". [COMMUNITY] — [Dev forum](https://developer.squareup.com/forums/t/square-payout-unclear-and-missing-instant-transfer-fees-in-api/13716)
- **Square Credit Card:** can pay vendors through Bill Pay, including vendors that do not accept cards (2026-08-11). This is adjacent to payouts. [OFFICIAL] — [Press](https://squareup.com/us/en/press/square-credit-card-bill-pay-refresh)

### Inferences
- The requester's app can show payout history and reconcile fees through the Payouts API. Triggering instant or same-day transfers and changing transfer settings appear to be Dashboard-only: no API for initiating transfers turned up in any source.
- Using the official current help pages, budget 1.95% for instant payouts.

### Gaps
- No public API was found to initiate an instant transfer or to change the close-of-day time. This is likely Dashboard-only but was not confirmed.
- Exact instant-transfer minimums and maximums, and the default close-of-day time, were not extracted.
- Bank Accounts API operations (list and get linked accounts) were not confirmed in this session; only the documentation section's existence was seen.

## 5. Risk, disputes, fraud tools and compliance

### Takeaway
- **Disputes:** Square charges no chargeback fee. It holds the disputed funds and keeps the processing fee if the seller loses.
- **Chargeback Protection:** discontinued in the US. It once covered up to $250/month; it is still offered in Australia.
- **Risk Manager:** free. Rules can alert, decline or force 3D Secure using AVS, CVV, IP-country and amount conditions. A paid premium tier is "being explored."
- **3D Secure:** applied by regulatory mandate or by Risk Manager rule.
- **Reserves:** rolling reserves can be imposed.
- **PCI:** compliance is included at no fee.
- **APIs:** the Disputes API supports evidence upload and submission.

### Cited Findings
- **Dispute handling:** no extra dispute fee; other processors charge $10 to $25. Square immediately holds the disputed amount from the balance or debits the linked bank. Processing fees are not refunded if the customer wins. [OFFICIAL] — [Manage payment disputes](https://squareup.com/help/us/en/article/3882-payment-disputes-walkthrough); [Chargebacks 101](https://squareup.com/us/en/the-bottom-line/managing-your-finances/what-is-a-chargeback-what-makes-it-happen)
- **ACH:** no chargeback fees on API ACH. [OFFICIAL] — [Payments pricing (dev)](https://developer.squareup.com/docs/payments-pricing)
- **Chargeback Protection (retired, US):** it previously covered dispute losses up to $250 per month, and Square stopped offering it. [COMMUNITY, official Square account] — [Important update about Chargeback Protection](https://community.squareup.com/t5/Your-Square-Account-Information/Important-update-about-Chargeback-Protection/td-p/124986). An Australian Chargeback Protection page still exists, so the product is region-limited. [OFFICIAL AU] — [AU Chargeback Protection](https://squareup.com/au/en/payments/chargeback-protection)
- **Risk Manager pricing:** "Risk Manager is free to use. We're exploring a potential premium version … where certain additional features would include a fee." [OFFICIAL, UK page] — [Risk Manager](https://squareup.com/gb/en/payments/risk-manager). An older article described advanced tools costing a fee after a 90-day free trial. [OFFICIAL-OLD?] — [AU Bottom Line](https://squareup.com/au/en/the-bottom-line/inside-square/risk-manager-protect-your-online-business)
- **Risk Manager rules**
  - Actions are alert, 3D Secure and decline, with precedence 3DS, then Decline, then Alert. [OFFICIAL] — [Risk Manager 3DS help](https://squareup.com/help/gb/en/article/7623-risk-manager-3d-secure-3ds); [US setup](https://squareup.com/help/us/en/article/6816-navigating-square-risk-manager)
  - Conditions include AVS mismatch or AVS unavailable, CVV, Square's risk evaluation (high or moderate), buyer IP country and amount. [OFFICIAL] — [same](https://squareup.com/help/gb/en/article/7623-risk-manager-3d-secure-3ds)
  - Risk Manager helps prevent chargebacks, but sellers remain liable. [OFFICIAL] — [Risk Manager](https://squareup.com/gb/en/payments/risk-manager)
  - Risk Manager rules do not apply to the In-App Payments SDK. [COMMUNITY, about 2024] — [Dev forum](https://developer.squareup.com/forums/t/cvv-not-checked-and-avs-rejected-causing-fraud-alerts-on-our-customers-we-check-out/13786)
- **3D Secure (developer side)**
  - Square triggers 3DS for regulatory mandates or seller Risk Manager rules. [OFFICIAL] — [SCA overview](https://developer.squareup.com/docs/sca-overview)
  - A CreatePayment with a `ccof:` card on file and no verification token or customer details is treated as seller-initiated: no 3DS, and chargeback liability stays with the seller. [OFFICIAL] — [same](https://developer.squareup.com/docs/sca-overview)
  - `verifyBuyer()` is being deprecated in favor of verification inside `Card.tokenize()`. [OFFICIAL] — [Take a card payment](https://developer.squareup.com/docs/web-payments/take-card-payment)
  - From 2025-10-01, all Web Payments SDK pages must use Secure Contexts and a proper Content Security Policy. [OFFICIAL] — [same](https://developer.squareup.com/docs/web-payments/take-card-payment)
- **Reserves:** a rolling reserve holds a percentage of card payments and releases it on a rolling basis, reviewed after at least 6 months. Triggers include prepayment for goods or services and high chargeback rates. [OFFICIAL] — [Manage payment reserves](https://squareup.com/help/us/en/article/6832-reserves-faq)
- **Card-network monitoring programs:** Square documents the networks' high-dispute, chargeback and fraud monitoring programs. [OFFICIAL] — [High dispute monitoring programs](https://api.squareup.com/help/us/en/article/7580-high-dispute-chargeback-and-fraud-monitoring-programs)
- **PCI:** Square software is PCI compliant, with no PCI fees. [OFFICIAL] — [Processing fees explained](https://squareup.com/us/en/the-bottom-line/managing-your-finances/credit-card-processing-fees-and-rates)
- **Disputes API**
  - Text evidence (up to 500 characters) goes through CreateDisputeEvidenceText. Files (PDF, JPEG, PNG, TIFF or HEIF, up to 5 MB) go through CreateDisputeEvidenceFile. SubmitEvidence then moves the dispute to PROCESSING. [OFFICIAL] — [Process disputes](https://developer.squareup.com/docs/disputes-api/process-disputes); [Disputes API](https://developer.squareup.com/docs/disputes-api/overview)
  - Submitted evidence cannot be changed or downloaded later, and the issuing bank decides the outcome. [OFFICIAL] — [Process disputes](https://developer.squareup.com/docs/disputes-api/process-disputes)
- **Bitcoin:** no chargebacks or disputes. [3P] — [AurPay](https://www.aurpay.net/aurspace/square-bitcoin-lightning-payments-merchant-integration-2025/)

### Inferences
- For a prepaid detailing business, collecting deposits far in advance is a stated reserve trigger. Large prepayments could invite a reserve.
- Card-on-file charges made by the seller's app without customer presence carry full chargeback liability. Keep signed authorizations and job photos as dispute evidence; the Disputes API can upload them.

### Gaps
- No public API was found to configure Risk Manager rules; this is likely Dashboard-only.
- Square's exact CVV and AVS behavior on non-API channels (Virtual Terminal, Invoices) was not extracted.
- Whether any paid Risk Manager premium tier has launched in the US by October 2026: the official page still says "exploring."

## 6. Hardware lineup, US prices, financing and leasing

### Takeaway
Current US list prices:

| Item | Price | Status |
|---|---|---|
| Magstripe reader | Free first, $10 each additional | Third-party only |
| Reader (contactless and chip) | $59 | Official |
| Stand / Stand Mount | $149 | Official |
| Terminal | $299 | Official |
| Handheld | $399 | Official |
| Register (2nd gen) | $899 | Official |
| Register Kit | From $1,189 | Official |
| Kiosk (new, AI) | $1,999 plus $99/mo per device | Official |

Monthly financing is shown at checkout; the 12-month figures imply about 15% APR. Square sells no leasing. Printer and cash-drawer prices could not be confirmed on Square's own store.

### Cited Findings
- **Square's US hardware page:**
  - Handheld $399 or $37/mo over 12 months.
  - Terminal $299 or $27/mo over 12 months.
  - Stand $149 or $14/mo over 12 months.
  - Kiosk $1,999 including counter stand.
  - Reader for contactless and chip $59.
  - [OFFICIAL] — [Square hardware](https://squareup.com/us/en/hardware)
- **Register:** $899 before taxes and fees, with hardware financing at checkout. [OFFICIAL] — [Register](https://squareup.com/us/en/hardware/register)
- **Earlier Register price:** Square's 2025 cost guide listed $799 (the 1st-generation price). [OFFICIAL-OLD] — [POS system cost 2025](https://squareup.com/us/en/the-bottom-line/operating-your-business/pos-system-cost)
- **Register Kit:** from $1,189.00, including cash drawer and printer. [OFFICIAL] — [POS kits](https://squareup.com/shop/hardware/us/en/pos-kits); [NerdWallet](https://www.nerdwallet.com/business/software/reviews/square-pos)
- **iPad restaurant setup:** about $689 for an iPad setup with cash drawer, stand and receipt printer (iPad not included). [3P] — [NerdWallet restaurants](https://www.nerdwallet.com/business/software/reviews/square-for-restaurants)
- **Receipt printers:** typically $200 to $350. [3P] — [UpMenu](https://www.upmenu.com/blog/square-pricing/)
- **Magstripe reader:** $0 for the first, $10 each additional. [3P] — [NerdWallet](https://www.nerdwallet.com/business/software/reviews/square-pos)
- **Stand Mount:** $149. [3P] — [NerdWallet](https://www.nerdwallet.com/business/software/reviews/square-pos)
- **Handheld launch:** May 2025 at $399 (6.2-inch screen, IP54). [3P/press] — [TechRadar](https://www.techradar.com/pro/square-launches-new-portable-point-of-sale-handheld-device-thats-barely-bigger-than-a-smartphone-and-theres-even-a-16-megapixel-camera); [Business Wire 2025-05-13](https://www.businesswire.com/news/home/20250513219470/en)
- **Register 2nd gen launch:** 2026-02-04 at $899. [OFFICIAL press] — [Business Wire](https://www.businesswire.com/news/home/20260204804070/en/Second-Generation-Square-Register-Delivers-More-Speed-Power-and-Reliability-to-the-Neighborhood)
- **Kiosk launch:** 2026-10-14 at $1,999 plus $99/mo per device, requiring Plus or Premium. [OFFICIAL press and 3P] — [FinancialContent/Business Wire](https://www.financialcontent.com/article/bizwire-2026-10-14-introducing-the-new-square-kiosk-reimagining-self-service-with-intelligence); [Investing.com](https://www.investing.com/news/company-news/square-launches-aipowered-kiosk-with-voice-ordering-for-1999-93CH-4949752)
- **Hardware financing (Australia, official):** interest-free installments on orders of $59 to $5,000, over 3, 6 or 12 months. Only account owners and authorized representatives can apply. [OFFICIAL AU, region-specific] — [AU hardware financing FAQ](https://squareup.com/help/au/en/article/6225-installments-for-square-hardware-faqs)
- **Hardware financing (US):** carts of $49 to $10,000 at 15% APR over 3 to 24 months. [3P, "checked October 2026", unverified] — [Lone Star Payment](https://lonestarpayment.com/square-hardware.html). Financing was not available in AL, DE, MS, MO, NH or TN. [COMMUNITY, old] — [Thread](https://community.squareup.com/t5/Questions-How-To/How-to-apply-for-hardware-financing/m-p/129964/highlight/true)
- **Offline-capable hardware:** Register, Terminal and Handheld (72-hour upload window); 2nd-generation Reader and Stand (24 hours). [OFFICIAL] — [Offline payments](https://squareup.com/help/us/en/article/7777-process-card-payments-with-offline-mode)

### Inferences
- The official 12-month prices match a 15% APR exactly. For example, $299 at 15% APR over 12 months is about $26.99/mo, and the page shows $27. The Stand ($13.45/mo, shown as $14) and the Handheld ($36.01/mo, shown as $37) fit the same rate with rounding up. This supports the third-party 15% APR US figure; US hardware financing is likely not interest-free, unlike Australia.
- No source mentions Square hardware leasing in the US. It appears Square offers purchase or financing only. Leasing exists only through third-party resellers.
- For a mobile detailer, the relevant hardware is the $59 Reader, Tap to Pay (free) or the $399 Handheld. A Terminal ($299) is an option for a counter or shop.

### Gaps
- Square-store prices for receipt printers, kitchen printers, cash drawers, barcode scanners, the Kitchen Display System, cases, the Terminal hub and the Handheld charging dock were not found. A third-party search returned only marketplace listings.
- The current Square Stand Mount and magstripe reader prices were not confirmed on squareup.com.
- Exact US financing terms (APR, term options, minimum and maximum, eligible states) were not confirmed on an official US page.
- Warranty and return terms were not researched.

## 7. Public API and SDK availability for each feature

### Takeaway
Nearly every money-in feature has a public API:
- Payments (card-present, card-not-present, cash, external, delayed capture, tips, application fees).
- Refunds (including unlinked).
- Cards (card on file).
- Disputes.
- Payouts.
- Terminal API (Square Terminal checkout, tips, signature, surcharge beta).
- Mobile Payments SDK (readers, Tap to Pay, offline).
- Web Payments SDK (cards, Apple Pay, Google Pay, ACH, Afterpay, Cash App Pay, gift cards).
- Checkout API (payment links).
- Invoices API (card, ACH, Afterpay, Cash App Pay acceptance).

No public API turned up for these, which look Dashboard-only:
- Instant and same-day transfer initiation and transfer settings.
- Risk Manager rule configuration.
- Offline-mode settings.
- Hardware purchase and financing.
- Surcharge enrollment.
- Bitcoin acceptance.

The Reader SDK and Mobile Authorization API were retired on 2026-01-22. Use the Mobile Payments SDK instead.

### Cited Findings

| Feature | API / SDK | Notes | Source |
|---|---|---|---|
| Card payments, card on file (`ccof:` source), delayed capture, void/complete | Payments API (CreatePayment, CompletePayment, CancelPayment, UpdatePayment) | `autocomplete=false`; 36 h card-present, 7 d card-not-present | [Delayed capture](https://developer.squareup.com/docs/payments-api/take-payments/card-payments/delayed-capture); [CreatePayment](https://developer.squareup.com/reference/square/payments-api/create-payment) |
| Cash and external tenders (check, bank transfer, etc.) | Payments API, source `CASH` / `EXTERNAL` | Records the tender only | [External payments](https://developer.squareup.com/docs/payments-api/take-payments/external-payments); [Cash](https://developer.squareup.com/docs/payments-api/take-payments/cash-payments) |
| Refunds (full, partial, unlinked or external) | Refunds API | Unlinked refunds need seller authorization | [Refund payments](https://developer.squareup.com/docs/payments-api/refund-payments); [Unlinked](https://developer.squareup.com/docs/refunds-api/unlinked-refunds) |
| Online card, Apple Pay, Google Pay, ACH, Afterpay, Cash App Pay, Square gift card | Web Payments SDK + Payments API | ACH 1% ($1 min, $5 max); Afterpay may fail to initialize when the buyer or amount is ineligible | [Web Payments SDK](https://developer.squareup.com/docs/web-payments/overview); [Afterpay](https://developer.squareup.com/docs/web-payments/add-afterpay); [Digital wallets](https://developer.squareup.com/docs/web-payments/digital-wallets) |
| Charge and store a card in one step | Web Payments SDK "Charge and Store" (Beta) | Beta status at announcement | [Dev forum announcement](https://developer.squareup.com/forums/t/web-payments-sdk-charge-and-store-beta/17934) |
| 3DS / SCA | Web Payments SDK (verification moving into `Card.tokenize()`) + Risk Manager rules | Seller-initiated card-on-file charges skip 3DS | [SCA overview](https://developer.squareup.com/docs/sca-overview) |
| Payment Links / Square-hosted checkout | Checkout API (CreatePaymentLink) | Quick-pay or order-based; tipping, up to 2 custom fields, shipping address, prefilled buyer data | [Checkout API](https://developer.squareup.com/docs/checkout-api); [Optional configs](https://developer.squareup.com/docs/checkout-api/optional-checkout-configurations) |
| Invoices (card, ACH, Afterpay, Cash App Pay; deposits and milestones) | Invoices API (`accepted_payment_methods` incl. `buy_now_pay_later`) | BNPL only with a single BALANCE request | [Invoices API](https://developer.squareup.com/docs/invoices-api/overview); [InvoiceAcceptedPaymentMethods](https://developer.squareup.com/reference/square/objects/InvoiceAcceptedPaymentMethods) |
| Square Terminal checkout from your own app (tips, signature, surcharge) | Terminal API | `collect_signature` (US/CA); `allow_tipping` / `tip_money`; surcharge field added 2026-01-22 (reported buggy) | [Terminal API](https://developer.squareup.com/docs/terminal-api/overview); [Features](https://developer.squareup.com/docs/terminal-api/additional-payment-checkout-features) |
| Readers, Stand, Tap to Pay on iPhone and Android, offline, from your own app | Mobile Payments SDK (iOS, Android, React Native plugin) | GA; Android SDK 2.6.0/2.6.1 (2026); Tap to Pay not offline; 1,000 offline payments per 24 h | [MP SDK](https://developer.squareup.com/docs/mobile-payments-sdk); [GA announcement](https://developer.squareup.com/forums/t/mobile-payments-sdk-is-now-generally-available/19769); [Android releases](https://github.com/square/mobile-payments-sdk-android/releases); [RN changelog](https://github.com/square/mobile-payments-sdk-react-native/blob/main/CHANGELOG.md) |
| Reader SDK, Mobile Authorization API | Retired 2026-01-22 | Existing integrations can no longer take payments | [Changelog 2026-01-22](https://developer.squareup.com/docs/changelog/connect-logs/2026-01-22) |
| Disputes and evidence | Disputes API | Text up to 500 chars; files up to 5 MB | [Disputes API](https://developer.squareup.com/docs/disputes-api/overview) |
| Payouts and fee reconciliation | Payouts API (+ Bank Accounts API) | Read-only | [Payouts API](https://developer.squareup.com/docs/payouts-api/overview) |
| App or platform fee on payments | Payments API `app_fee_money` | | [Collect application fees](https://developer.squareup.com/docs/payments-api/take-payments-and-collect-fees) |
| Surcharge reporting | Payments API (2026-01-22) | | [Changelog 2026-01-22](https://developer.squareup.com/docs/changelog/connect-logs/2026-01-22) |

- **Android SDK 2.6.0:**
  - Targets API 36.
  - Removed the ExternalPaymentDetails / ExternalTenderType / `externalDetails` builder from the Mobile Payments SDK. Record external tenders through the Payments API instead.
  - Added an OBSOLETE_SDK error code.
  - [OFFICIAL GitHub] — [mobile-payments-sdk-android releases](https://github.com/square/mobile-payments-sdk-android/releases)
- **Android SDK 2.6.1:** fixed Tap to Pay on Android being unavailable for up to 2 hours before the daily key rotation. [OFFICIAL GitHub] — [same](https://github.com/square/mobile-payments-sdk-android/releases)
- **React Native plugin:** v2026.8.1 (2026-08-24) moved to Android SDK 2.6.1. [OFFICIAL GitHub] — [RN CHANGELOG](https://github.com/square/mobile-payments-sdk-react-native/blob/main/CHANGELOG.md)
- **API changelog:** versions in 2026 include 2026-01-22, 2026-04-21, 2026-05-20 (Payments and Refunds APIs), 2026-07-15, 2026-08-19 and 2026-09-16, the latest. [OFFICIAL, contents of later entries unread] — [Release notes: Square APIs and SDKs](https://developer.squareup.com/docs/changelog/connect)
- **Developer cost:** Square APIs and SDKs are free; only processing fees apply. [OFFICIAL] — [Payments pricing (dev)](https://developer.squareup.com/docs/payments-pricing)
- **Mobile Payments SDK regions:** US, Canada and Australia; Tap to Pay on Android was labeled Beta on the overview page at one point. [OFFICIAL, possibly stale] — [MP SDK](https://developer.squareup.com/docs/mobile-payments-sdk)

### Inferences
- For Sheen's dispatch app to replace the Square app UI:
  - Technician phones: Mobile Payments SDK, giving Tap to Pay and the $59 Reader.
  - Office and customer payments: Web Payments SDK + Payments API, Checkout API payment links, and the Invoices API.
  - Saved cards: Cards API card on file, with Payments API delayed capture for holds.
  - Back office: the Refunds, Disputes and Payouts APIs.
- Staff would still need the Square Dashboard for:
  - Transfer speed and instant transfers.
  - Risk Manager rules.
  - Surcharge enrollment.
  - Bank-account linking.
  - Bitcoin enablement.
  - Offline-mode limits.
  - Plan changes.
- Surcharging is mostly unavailable to custom integrations (Terminal API flag only, reported unreliable), so passing fees on would need the app's own compliant pricing logic.

### Gaps
The rows below come from pre-2026 knowledge of Square's docs and were not verified in this session. Re-check them at developer.squareup.com:
- **Cards API:** create, list and disable a card on file linked to a Customer.
- **Customers API:** customer records.
- **Gift Cards API and Gift Card Activities API:** create, activate, load and redeem.
- **Orders API:** line items, taxes, discounts, service charges, partial or split tenders on an order, PayOrder.
- **Bank Accounts API:** list linked bank accounts, read-only.
- **In-App Payments SDK:** native card entry, Apple Pay and Google Pay in a custom mobile app; still supported, per prior knowledge.
- **Payment object `receipt_url` and `receipt_number`.**
- **Webhooks:** `payment.created`, `payment.updated`, `refund.*`, `dispute.*`, `payout.*`, `invoice.*`, `terminal.checkout.*`.
- **Terminal API refunds:** Interac in Canada only.
- **Customer-facing receipts:** sent by Square only for Square-app or Terminal flows; API-created payments rely on the app's own receipts or `receipt_url`.

Other open questions:
- Whether any public API exposes bitcoin payments, EBT/SNAP, or Afterpay and Cash App Pay on in-person SDK flows: not found.
- Whether the Mobile Payments SDK supports Square Handheld as a host device, and how the Kiosk relates to the SDK: not confirmed.
- Contents of the 2026-05-20 through 2026-09-16 API changelog entries were not readable, because developer.squareup.com was blocked in this session.
