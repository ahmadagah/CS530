# Square core business software: plan-by-plan feature inventory (US, as of 2026-10-31)

Scope: POS plans, Square Invoices, Square Appointments, Square Online/websites, Dashboard and reports, item/service catalog and inventory, Square AI / Managerbot. Prepared for Sheen Mobile Auto Detailing (mobile auto detailing, Portland OR), which plans to replace Square with its own dispatch app.

**Method and limits (read first).** Direct page fetches of `squareup.com` and `developer.squareup.com` were blocked in this research session (DNS / network allow-list error), so no official page could be read in full. Every finding below comes from web-search results, in two kinds: (a) summaries of official Square pages (squareup.com press releases, help-center articles, pricing pages, developer docs), labeled **[official]**; (b) third-party reviews, labeled **[3rd-party]**. Prices marked **[official]** were shown in search summaries of Square's own pages but were **not read on the live pricing page**. To confirm them, allow `squareup.com` and `developer.squareup.com` in the session's network settings and re-check: squareup.com/us/en/pricing, /invoices/pricing, /appointments/pricing, /online-store/plans, and the developer API reference.

---

## Q1. Square's 2026 plan structure, prices, vertical editions, and fit for a mobile service business

### Takeaway
Since October 2025, all US sellers on the new plans share one structure: **Square Free ($0), Square Plus ($49 per active location per month) and Square Premium ($149 per active location per month)**. These three plans replaced 18 separate add-on subscriptions. The old vertical products (Square for Retail, Restaurants, Appointments, Invoices) are now **"modes"** inside one Square POS app (launched April 2025), and every plan includes every mode. A mobile detailer would use the **Professional Services** or **Health & Beauty/Bookings** mode on Free or Plus.

### Cited Findings
**Plan structure and prices**
- Square announced "New Unified Plans & Pricing": three plans (Square Free, Square Plus, Square Premium) that replace **18 different à la carte subscriptions**. They are available to all new US sellers, and most existing US sellers can opt in from the Dashboard. Sources disagree on the date: the release page shows **Oct 6, 2025**, the press archive lists **Oct 1, 2025**, and a reseller repost says Oct 8. **[official]** — [Square press release](https://squareup.com/us/en/press/unified-pricing-and-packaging); [Square press archive](https://squareup.com/us/en/press/archive); [TSG Payments repost](https://tsgpayments.com/square-simplifies-commerce-software-with-new-unified-plans-pricing/)
- **Square Free: $0/month per location.** It "maintains access to all the tools Square has offered sellers without a software subscription": POS, websites, online ordering, invoicing and Square Banking. Free sellers can create **multiple locations at no extra cost**. **[official]** — [Square press release](https://squareup.com/us/en/press/unified-pricing-and-packaging); [Square Bottom Line: thinking behind new plans](https://squareup.com/us/en/the-bottom-line/inside-square/pricing-plans)
- **Square Plus: $49/month per active location.** Adds advanced POS features, advanced inventory, loyalty, marketing and staff management. **[official]** — [Square press release](https://squareup.com/us/en/press/unified-pricing-and-packaging)
- **Square Premium: $149/month per active location.** Includes "nearly all of Square's software" plus **24/7 phone support** and **advanced reporting**. **[official]** — [Square press release](https://squareup.com/us/en/press/unified-pricing-and-packaging)
- Paid plans are billed per *active* location. Sellers can lower the bill by deactivating unused locations. **[official]** — [Help: Switch to the new Square subscription plans](https://squareup.com/help/us/en/article/8569-switch-to-the-new-square-subscription-plans)
- **Features cannot be mixed between plans.** Sellers cannot add or remove individual features across Free, Plus and Premium. All three plans include **all point-of-sale modes** and Square Banking, and there are **no per-device POS fees**. **[official]** — [Help 8569](https://squareup.com/help/us/en/article/8569-switch-to-the-new-square-subscription-plans)
- **Switching is one-way.** After moving to Free, Plus or Premium, a seller cannot go back to a legacy subscription. **[official]** — [Help 8569](https://squareup.com/help/us/en/article/8569-switch-to-the-new-square-subscription-plans)
- Sellers on legacy Square Online Plus or Premium can migrate from the Dashboard. The old hosting plan is cancelled automatically and unused days are refunded pro rata. **[official]** — [Help 8657: Migrate from Square Online to the new Square plans](https://squareup.com/help/us/en/article/8657-migrate-from-square-online-to-the-new-square-plans)
- Some sellers in the Square Community report being told they were ineligible to switch, or being charged more than the advertised price. **[community]** — [Square Community thread](https://community.squareup.com/t5/Customer-Engagement/New-Square-Paid-Plans-Square-Plus-and-Square-Premium-Help-me/m-p/823190)
- One third-party guide says the old Plus price of **$29/mo for some business types moved to $49/mo** under the unified plans. **[3rd-party]** — [Markate pricing update](https://www.markate.com/product-updates/announcement-square-pricing-update-36)

**Processing rates tied to each plan** (other researchers cover fees in detail; listed here only because the rate depends on the plan)
- In person: Free **2.6% + 15¢**, Plus **2.5% + 15¢**, Premium **2.4% + 15¢**. **[official]** — [Square press release](https://squareup.com/us/en/press/unified-pricing-and-packaging); [Square vs Toast compare page](https://squareup.com/us/en/compare/square-vs-toast)
- Online and invoices: Free **3.3% + 30¢**, Plus and Premium **2.9% + 30¢**. **[official]** — [Square vs Clover compare page](https://squareup.com/us/en/compare/square-vs-clover); [Square vs Toast](https://squareup.com/us/en/compare/square-vs-toast)
- The Free plan's online/invoice rate rose from 2.9% + 30¢ to 3.3% + 30¢ in **January 2026**. **[3rd-party]** — [AGMS](https://agms.com/square-price-increase-2026-alternatives/)
- Sources conflict on the Free in-person rate: one third-party source lists **2.6% + 10¢**, while Square's own pages give 2.6% + 15¢. **[3rd-party]** — [CostBench / Swipesum summary](https://www.swipesum.com/insights/square-fees-explained-understanding-your-payment-costs)
- Unconfirmed claim: Premium's gift-card load fee is 0% (versus 2.5% on Free and Plus). Only one third-party source says this. — [dpl.company](https://dpl.company/square-guides/square-pricing-free-plus-premium-and-monthly-costs/)

**Other regions (do not apply to the US)**
- Australia Retail Plus is **A$109/mo**. Ireland Appointments Plus is **€19/mo + VAT per location**. A Canadian page shows Plus at **C$79/mo**. **[official, non-US]** — [AU retail pricing](https://squareup.com/au/en/point-of-sale/retail/pricing); [IE appointments pricing](https://squareup.com/ie/en/appointments/pricing); [CA retail pricing](https://squareup.com/ca/en/point-of-sale/retail/pricing)

**Vertical editions → POS modes**
- In **April 2025** Square launched a unified Square Point of Sale app. It merges what used to be separate products (Square for Restaurants, Square for Retail, Square Appointments, Square Invoices). **[official]** — [Block: next-gen POS app](https://block.xyz/inside/introducing-the-next-generation-square-point-of-sale-app); [Block IR](https://investors.block.xyz/investor-news/news-details/2025/Introducing-the-Next-Generation-Square-Point-of-Sale-App--A-Single-Unified-App-to-Power-Commerce-and-Growth-for-Every-Seller/default.aspx)
- The app has **seven modes**: Standard, Bars, Quick-Service Restaurant, Full-Service Restaurant, Retail, Health & Beauty (bookings/appointments), and Professional Services. **[official/3rd-party]** — [Square US POS page](https://squareup.com/us/en/point-of-sale); [Business News Daily](https://www.businessnewsdaily.com/square-review); [PYMNTS](https://www.pymnts.com/news/point-of-sale/2025/square-launches-customizable-unified-pos-app/)
- What each mode covers:
  - **Services mode:** managing appointments, sending invoices, accepting payments. **[official]** — [App Store listing](https://apps.apple.com/app/id335393788)
  - **Bookings mode:** scheduling, client management and payments for beauty and wellness businesses. **[3rd-party]** — [Retail Insider](https://retail-insider.com/retail-insider/2025/05/introducing-the-next-generation-square-point-of-sale-app-a-single-unified-app-to-power-commerce-and-growth-for-every-seller/)
  - **Restaurant modes:** table and course management, pre-authorized bar tabs. **[official]** — [Square US POS page](https://squareup.com/us/en/point-of-sale)
  - **Retail mode:** complex inventory, varied pricing, multi-location. **[3rd-party]** — [PYMNTS](https://www.pymnts.com/news/point-of-sale/2025/square-launches-customizable-unified-pos-app/)

### Inferences
- **Best fit for Sheen:** the Professional Services mode (invoices, estimates, appointments) or the Health & Beauty/Bookings mode (booking-first). Both come with every plan, so the plan decision is only Free vs Plus vs Premium.
- **For an exit from Square,** the features that matter most for Sheen sit on **Plus ($49/location/mo)**:
  - API writes to seller-level bookings (Q3)
  - invoice custom fields and installment/milestone payments
  - multi-package estimates
  - no-show fees and waitlist
  - the lower 2.9% + 30¢ online/invoice rate
- **Premium mostly adds** advanced reporting, 24/7 phone support, resource booking and the 2.4% in-person rate. These matter little to a single-location mobile detailer.
- **Product names likely to appear in older material** (renamed or retired): "Square for Retail Plus", "Square for Restaurants Plus/Premium", "Square Appointments Plus/Premium", "Square Invoices Plus", "Square Online Plus/Premium". Most are among the "18 à la carte subscriptions" that were replaced. Legacy subscribers may still hold them until they switch.

### Gaps
- The official US plan comparison page (squareup.com/us/en/pricing) could not be fetched, so the line-by-line feature matrix (which feature is Free, Plus or Premium) was assembled from search summaries and third-party reviews.
- It is unconfirmed whether standalone legacy add-ons (Invoices Plus $20, Appointments Plus/Premium, Online Plus/Premium) can still be bought by new US sellers in late 2026, or whether only Free/Plus/Premium are sold.
- No official full list of the 18 retired subscriptions was found.

---

## Q2. Square Invoices: Free vs paid features (and API exposure)

### Takeaway
Basic invoicing is free on every plan: unlimited invoices, estimates, contracts and recurring invoices. The former **Invoices Plus** feature set needs a paid plan: multi-package estimates, automatic estimate-to-invoice conversion, milestone/installment payments, custom fields, custom templates and batch sending. Invoices Plus was a standalone **$20/mo** add-on in older pricing; in 2026 these features are unlocked by **Square Plus or Premium (or a legacy Invoices Plus subscription)**. The Invoices API handles invoices, deposits, installments, card-on-file autopay, scheduling and attachments, but **not estimates or contracts**.

### Cited Findings
**Feature inventory**

**Free plan (all sellers)**
- Unlimited invoices, estimates and contracts, plus **recurring invoices**. **[3rd-party]** — [FitSmallBusiness review](https://fitsmallbusiness.com/square-invoice-review/); [Merchant Maverick](https://www.merchantmaverick.com/reviews/square-invoices-review/); [Forbes Advisor](https://www.forbes.com/advisor/business/software/square-invoices-review/)
- **Estimates:** create and send estimates from Dashboard or app. **[official]** — [Help 7215: Create and send invoice estimates](https://squareup.com/help/us/en/article/7215-create-an-estimate-online)
- **Contracts:** sellers can attach an optional Square Contract to an invoice or estimate. Contract fields can include check boxes, text fields and questions. **[official]** — [Help 7202: attach a contract](https://squareup.com/help/gb/en/article/7202-attach-a-contract-to-your-invoices-or-estimates-online); [Square Invoices Plus press](https://squareup.com/us/en/press/invoices-plus)
- **Projects** (grouping estimates, invoices and contracts per job): one third-party source says this is on the free tier; not confirmed elsewhere. **[3rd-party]** — [FitSmallBusiness](https://fitsmallbusiness.com/square-invoice-review/)
- **Create and send invoices** (Dashboard, Invoices app, POS app): **[official]** — [Help 8387: Create and send invoices](https://squareup.com/help/us/en/article/8387-create-and-send-invoices)

**Invoices Plus feature set → now Square Plus / Premium**
- **Multi-option / package estimates:** at least 2 and at most 9 packages per estimate. The customer picks one. **[official]** — [Invoices Plus press release](https://squareup.com/us/en/press/invoices-plus); [Help 7215](https://squareup.com/help/us/en/article/7215-create-an-estimate-online)
- **Auto-convert an accepted estimate into an invoice.** **[official]** — [Invoices Plus press](https://squareup.com/us/en/press/invoices-plus)
- **Milestone payments:** split an invoice balance into milestones by percentage or amount, all within one invoice. This is effectively progress invoicing. **[official]** — [Invoices Plus press](https://squareup.com/us/en/press/invoices-plus); [Invoices Plus blog](https://squareup.com/us/en/blog/invoices-plus)
- **Reusable custom invoice templates.** **[official]** — [Invoices Plus press](https://squareup.com/us/en/press/invoices-plus)
- **Custom fields** on invoices. **[official]** — [Invoices Plus press](https://squareup.com/us/en/press/invoices-plus)
- **Batch sending of invoices.** **[official]** — [Invoices Plus press](https://squareup.com/us/en/press/invoices-plus)
- **Custom fields in contracts** (check boxes, text, questions). Per the Appointments pricing page, "custom contract fields" is listed under Premium for Appointments. **[official]** — [Square Appointments pricing (search summary)](https://squareup.com/us/en/appointments/pricing)
- **Which plans unlock these today:** a Square help article says **Square Plus, Square Premium, or Square Invoices Plus** subscribers can send batch invoices and create custom fields. **[official]** — [Help 8387](https://api.squareup.com/help/us/en/article/8387-create-and-send-invoices)
- **Legacy price:** Invoices Plus was **$20/month (US)** with a 30-day free trial, per an older Square press release. This is a legacy figure, not 2026 pricing. **[official, dated]** — [Invoices Plus press](https://squareup.com/us/en/press/invoices-plus)

**Invoice payment fees** (other researchers cover fees in detail)
- Card payments on invoices: **3.3% + 30¢ on Free**, **2.9% + 30¢ on Plus/Premium**. **[official/3rd-party]** — [Square vs Clover](https://squareup.com/us/en/compare/square-vs-clover); [Koronapos](https://koronapos.com/blog/square-fee-calculator/)
- **Conflict:** one site lists invoice card payments at 3.5% + 15¢. — [EcomCalcTools](https://ecomcalctools.com/blog/fees-square/square-invoice-fees/)
- Card on file / keyed: **3.5% + 15¢**. **[3rd-party]** — [Koronapos](https://koronapos.com/blog/square-fee-calculator/)
- ACH bank transfer on invoices: **1%, $1 minimum**. One source says Plus/Premium **cap it at $10**. **[3rd-party, unconfirmed]** — [transferfees.io](https://transferfees.io/square-fee-calculator/)

**API exposure (Invoices API)**
- The Invoices API works together with the **Orders API** (invoice line items live on an order), the **Customers API** and the **Cards API**. **[official]** — [Invoices API overview](https://developer.squareup.com/docs/invoices-api/overview)
- **Payment schedules** use `payment_requests` of three types:
  - **BALANCE:** a single full payment.
  - **DEPOSIT:** a deposit, followed by either a BALANCE or 2–12 INSTALLMENTs.
  - **INSTALLMENT:** installment payments.
  - At most **13 payment requests** per invoice. Each DEPOSIT or INSTALLMENT takes a percentage or a fixed amount, and installment percentages must sum to 100. `due_date` and `request_type` are required.
  - **INSTALLMENT requires an Invoices Plus subscription.**
  - **[official]** — [Create and Publish Invoices](https://developer.squareup.com/docs/invoices-api/create-publish-invoices); [InvoicePaymentRequest object](https://developer.squareup.com/reference/square/objects/InvoicePaymentRequest)
- **Custom fields:** up to **2** per invoice; adding them **requires Invoices Plus**. **[official]** — [Invoice object](https://developer.squareup.com/reference/square/objects/Invoice); [Invoices API overview](https://developer.squareup.com/docs/invoices-api/overview)
- **Plan check for premium fields:** the seller needs an active or trial subscription when the invoice is created, and premium features stay supported for the invoice's lifetime. Requests that use premium features without a plan fail with BAD_REQUEST; the app must strip those features and retry. **[official]** — [Invoices API overview](https://developer.squareup.com/docs/invoices-api/overview); [Dev forum](https://developer.squareup.com/forums/t/issue-with-square-invoices-api-bad-request-error-when-adding-custom-fields/21446)
- **Autopay:** set `automatic_payment_source = CARD_ON_FILE` with a `card_id` from the Cards API, and Square charges it on the due date. If the charge fails, all requests on the invoice revert to `NONE`. **[official]** — [Create and Publish Invoices](https://developer.squareup.com/docs/invoices-api/create-publish-invoices)
- **Scheduled invoices:** `scheduled_at` sets when Square processes or sends a published invoice. **[official]** — [Create and Publish Invoices](https://developer.squareup.com/docs/invoices-api/create-publish-invoices)
- **Payment methods:** `accepted_payment_methods` sets which methods the Square-hosted invoice page offers. **[official]** — [Create and Publish Invoices](https://developer.squareup.com/docs/invoices-api/create-publish-invoices)
- **Attachments:** managed only through the `CreateInvoiceAttachment` and `DeleteInvoiceAttachment` endpoints; attachment metadata on the invoice is read-only. **[official]** — [Invoice object](https://developer.squareup.com/reference/square/objects/Invoice)
- **No API for paying invoices or marking them paid.** Collection happens on Square's hosted page or by autopay. **[official]** — [Pay/refund invoices](https://developer.squareup.com/docs/invoices-api/pay-refund-invoices)

### Inferences
- **The API's "Invoices Plus" requirement** probably counts Square Plus/Premium as well, since the help center treats them as equivalent. The developer docs found in search still name only "Invoices Plus". Test this in sandbox before relying on it.
- **Estimates, multi-package estimates, contracts/e-signature and Projects** showed no API surface in any search result. Treat them as **Dashboard/app-only**. Sheen's app will need its own estimate → approval → invoice flow; this is also the clearest feature to build rather than integrate.
- **Recurring invoices:** the search results show no Invoices API endpoint for a recurring series. Recurring billing through the API is usually done with the separate Subscriptions API plus `CatalogSubscriptionPlan` (prior knowledge, not checked this session).

### Gaps
- No source was found for these invoice features or which plan includes them:
  - reminder scheduling (count and timing; whether automatic reminders are free)
  - tipping on invoices
  - partial-payment acceptance by the customer
  - invoice branding (logo/colors)
  - sending invoices by SMS
  - invoice tracking/read receipts
  - the "Invoices" app vs POS-app feature split
- Whether a `reminders` field exists on the Invoice object was not confirmed in search results.
- Whether estimates are exposed by any Square API was not confirmed either way; developer docs could not be fetched.

---

## Q3. Square Appointments: Free / Plus / Premium features (and API exposure)

### Takeaway
**Free ($0)** includes unlimited staff calendars, an online booking site and appointment reminders. **Plus ($49/location/mo)** adds no-show/cancellation fees, waitlist, multi-staff booking and, importantly, **API seller-level booking writes**. **Premium ($149/location/mo)** adds resource booking, advanced access/permissions, rostering, custom commissions and custom contract fields. Appointments "at the customer's location" exist and capture the customer's address. However, **there is no travel-time calculation, no service-area/zip filtering, and only "after" buffers**. These are weak spots for a mobile detailer.

### Cited Findings
**Pricing and tiers**
- **Free:** $0 per location, unlimited staff calendars, online booking site, appointment reminders. This is attributed to Square's own pricing page "as of this month" (Oct 2026). **[3rd-party citing official]** — [Koalendar](https://koalendar.com/blog/square-appointments-pricing)
- **Conflict:** one review says Free is limited to **1 user**. **[3rd-party]** — [Koalendar summary of other reviews](https://koalendar.com/blog/square-appointments-pricing); [Lilach Bullock](https://www.lilachbullock.com/square-appointments/)
- **Plus:** $49/month per location. **Premium:** $149/month per location. **[official]** — [Square Appointments pricing (search summary)](https://squareup.com/us/en/appointments/pricing)
- **Conflict:** older review sites still show the legacy **$29 / $69** prices, and one regional page showed $40 / $90. **[3rd-party]** — [Koalendar](https://koalendar.com/blog/square-appointments-pricing)
- **Premium features** listed on the pricing page: everything in Plus, plus **Advanced Access**, **select rostering features from Square Staff**, **resource management**, **custom staff commissions**, and **custom contract fields**. **[official]** — [Appointments pricing](https://squareup.com/us/en/appointments/pricing)
- **Plus features:** no-show fees, waitlist, multi-staff booking. **Premium:** resource scheduling, advanced staff permissions, time tracking, advanced reporting. **[3rd-party]** — [Koalendar](https://koalendar.com/blog/square-appointments-pricing); [FitSmallBusiness review](https://fitsmallbusiness.com/square-appointments-review/)

**Booking channels**
- Online booking site; bookings through **Google Search, Google Maps and Instagram** ("and more"), turned on from the Square Dashboard. **[official]** — [Google Play listing](https://play.google.com/store/apps/details?id=com.squareup.apos&hl=en_US); [Help 5355: Set up online booking](https://squareup.com/help/us/en/article/5355-set-up-online-booking-with-square-appointments)
- Instagram and Google integrations are also listed on Square's IE page. **[official, IE]** — [Square IE Appointments](https://squareup.com/ie/en/appointments)
- No search result detailed Facebook booking, a website embed widget, or "Book with Google"/Reserve with Google setup.

**Appointments at the customer's location (mobile services)**
- Setting: Dashboard → Appointments → Settings → Calendar & Booking → Appointment Preferences. The seller chooses business location, **customer's location**, both, or virtual. **[official]** — [Help 5351: appointment settings](https://squareup.com/help/us/en/article/5351-manage-your-square-appointments-account-settings)
- With customer location on, **customers enter their address at checkout**. Repeat clients can enter a different address per booking. **[official/community]** — [Square Appointments FAQ](https://squareup.com/help/us/en/article/6238-square-appointments-faqs); [Community](https://community.squareup.com/t5/Appointments-Bookings/I-have-a-Mobile-Service-How-do-I-remove-my-business-address-from/m-p/673237)
- **No service-area or zip filtering.** The workaround is "Business must accept or decline all appointment requests" plus a custom address field (Settings → Calendar & Booking → Customer Profile Fields). **[community]** — [Community thread](https://community.squareup.com/t5/Payments-Troubleshooting/Appointments-service-based-on-location-and-user-provided-info/m-p/726205)
- Mobile businesses complain that the business address still shows in checkout and that there is only one location. **[community]** — [Community thread](https://community.squareup.com/t5/Appointments-Bookings/I-have-a-Mobile-Service-How-do-I-remove-my-business-address-from/m-p/673237)

**Buffers and travel time**
- **No automatic travel-time calculation.** The workaround is the per-service "Block Extra Time" toggle in the Service Library, which adds time **after** an appointment only. It can be adjusted or disabled per appointment. **[community]** — [Travel-time thread](https://community.squareup.com/t5/Payments-Troubleshooting/Appointment-apply-a-quot-travel-time-quot-buffer-between/td-p/207920); [Buffer-before idea (archived)](https://community.squareup.com/t5/Archived-Ideas-Read-Only/Square-Appointments-Can-I-buffer-time-before-an-appointment/idi-p/86008)

**Calendar sync**
- **Two-way Google Calendar sync:** personal Google events block Square availability, and Square bookings appear in Google. Covers events from **1 month ago to 2 years ahead**. Setup: Settings → Calendar & Booking → Manage Calendar Sync → Link Google Calendar (desktop). **[official, AU page]** — [Google Calendar sync feature page](https://squareup.com/au/en/appointments/features/google-calendar-sync)
- Reviews disagree on which tier includes sync and whether it is limited. **[3rd-party]** — [FitSmallBusiness](https://fitsmallbusiness.com/square-appointments-review/)
- **Outlook:** a community request for native Outlook integration suggests it is not supported natively. **[community]** — [Community thread](https://community.squareup.com/t5/Appointments-Bookings/I-need-my-Square-Appointment-to-integrate-an-Outlo-and-a/td-p/777398)

**Policies, deposits, no-shows**
- **No-show protection:** card held at booking or **prepayment** required, plus custom **cancellation policies and fees**. **[official]** — [Help 5493: cancellation & prepayment policies](https://squareup.com/help/us/en/article/5493-set-a-custom-cancellation-policy-with-square-appointments); [Bottom Line: No-show protection](https://squareup.com/us/en/the-bottom-line/reaching-customers/say-goodbye-to-missed-appointments-with-no-show-protection)
- Reviews say no-show protection needs a paid plan. **[3rd-party]** — [FitSmallBusiness](https://fitsmallbusiness.com/square-appointments-review/)

**Other features**
- **Waitlist** automatically fills openings left by cancellations (Plus per reviews). **[official/3rd-party]** — [Square GB waitlist page](https://squareup.com/gb/en/appointments/features/waitlist-software); [FitSmallBusiness](https://fitsmallbusiness.com/square-appointments-review/)
- **Classes / group booking:** a maximum capacity per time slot. **[official, IE/GB]** — [Square GB Appointments](https://squareup.com/gb/en/appointments)
- **Intake forms and contracts** collected during booking and stored with the client. **[official, GB/IE]** — [Square GB Appointments](https://squareup.com/gb/en/appointments)
- **Multi-location scheduling** has its own feature page. **[official]** — [Multi-location page](https://squareup.com/us/en/appointments/features/multi-location)
- Appointment settings also cover booking-request acceptance, confirmations, and customer profile fields. **[official]** — [Help 5351](https://squareup.com/help/us/en/article/5351-manage-your-square-appointments-account-settings)

**API exposure (Bookings API)**
- **Two permission levels:**
  - **Buyer-level** (as the customer) works on **every plan, including Free**: create, update and cancel buyer-level bookings, and read any readable booking field.
  - **Seller-level** writes (create, update or cancel any booking as the business) require the seller to hold an **active or trial paid Appointments plan (Appointments Plus/Premium)**. Without one, calls return **403**.
  - Scopes: `APPOINTMENTS_ALL_WRITE` + `APPOINTMENTS_WRITE`.
  - **[official]** — [Bookings API: what it is](https://developer.squareup.com/docs/bookings-api/what-it-is); [Onboard to Square Appointments](https://developer.squareup.com/docs/bookings-api/onboard-to-the-api)
- **Availability search:** `POST /v2/bookings/availability/search` filters by location and by segment (service variation + team members). The time range must be **≥24 hours and ≤31 days**. Scopes: buyer `APPOINTMENTS_READ`; seller `APPOINTMENTS_ALL_READ` + `APPOINTMENTS_READ`. **[official]** — [SearchAvailability reference](https://developer.squareup.com/reference/square/bookings-api/search-availability)
- **Booking address:** a booking takes `location_type`; the `address` field is stored **only when `location_type = CUSTOMER_LOCATION`**. **[official]** — [Booking object](https://developer.squareup.com/reference/square/objects/Booking); [Create and Manage Bookings](https://developer.squareup.com/docs/bookings-api/use-the-api)
- **Typical flow:** look up services in the Catalog API → SearchAvailability → CreateBooking with a customer. **[official]** — [Create and Manage Bookings](https://developer.squareup.com/docs/bookings-api/use-the-api)
- **Known bugs** (dev forum):
  - New classes get every location added to `absent_at_location_ids`.
  - An empty location appears when creating a CUSTOMER_LOCATION booking.
  - **[official forum]** — [Dev forum](https://developer.squareup.com/forums/t/creating-a-new-class-adds-only-location-to-absent-at-location-ids-array/23909)
- **Booking Custom Attributes API** exists; developers report access problems on some accounts. **[official forum]** — [Dev forum](https://developer.squareup.com/forums/t/unable-to-access-bookingcustomattributes-endpoints/22733)

### Inferences
- For Sheen, Square's core gaps are exactly what a mobile dispatch app has to solve:
  - travel time and drive-time buffers
  - a service-area/zip gate
  - route-aware availability
  - removing the business address from checkout
- These are good candidates to build in-house rather than replicate.
- If Sheen keeps Square Appointments during a transition and wants its app to **create or reschedule bookings as the business**, it needs at least **Square Plus ($49/location/mo)**. Search results name "Appointments Plus/Premium"; whether new Square Plus counts was not confirmed.
- **Probably Dashboard-only** (no API surface appeared in any search result): waitlist, classes, intake forms, resource booking, reminders configuration, cancellation-fee configuration, booking-site design, Google/Instagram channel setup.

### Gaps
- **AI receptionist / AI booking:** no evidence of an AI receptionist or AI phone-answering in Square Appointments in any source found. Managerbot (Q5) is an operations agent, not a customer-facing booking agent.
- **Unconfirmed tiers** for several features:
  - SMS vs email reminder limits
  - confirmation/reminder customization
  - recurring appointments
  - rescheduling rules
  - service add-ons/variations in online booking
  - per-staff availability
  - "Book with Google" (Reserve with Google) and Facebook booking
  - website booking widget
- Whether the free plan is truly "unlimited staff" (vs 1 user) is disputed between sources.

---

## Q4. Square Online / websites

### Takeaway
Square Online is free to use on a **square.site subdomain with Square ads in the footer**. A **custom domain, ad removal, advanced site stats, abandoned-cart emails and gift-card support** needed **Online Plus** (legacy $29/mo); real-time shipping and product reviews needed **Online Premium**. Under the October 2025 plans these unlock with **Square Plus/Premium**, and legacy Online subscribers can migrate. Generative-AI tools (website copy, item descriptions, Photo Studio) exist. A full "AI-generated website" builder could not be confirmed. The only public website APIs are the **Sites API** (read-only list) and the **Snippets API** (code injection), both in an early-access program.

### Cited Findings
**Free plan**
- Free sites run on a **square.site** subdomain with Square branding/ads (a small ad in the footer). **[3rd-party]** — [All About Cookies](https://allaboutcookies.org/square-online-review); [SiteBuilderReport](https://www.sitebuilderreport.com/best-free-website-builder)
- Free sites support online ordering and websites at **no monthly fee**. **[official]** — [Square press release](https://squareup.com/us/en/press/unified-pricing-and-packaging)
- **Online card rate:** 3.3% + 30¢ on Free; 2.9% + 30¢ on Plus/Premium. **[official]** — [Square vs Clover](https://squareup.com/us/en/compare/square-vs-clover)

**Paid features**
- **Custom domain** requires a paid plan. One review says paid plans include a **free domain for up to one year**. **[3rd-party]** — [Square Online review (litextension)](https://litextension.com/blog/square-online-store-review/); [namechk review](https://namechk.com/website-builders/square-online/review/)
- **Plus** includes: custom domain, no Square ads, advanced site stats, abandoned-cart emails, gift-card support, advanced reporting, priority support. **[3rd-party; this table shows the legacy $29 Online Plus price]** — [The Retail Exec](https://theretailexec.com/tools/square-pricing/)
- **Premium adds** real-time shipping rates and customer (product) reviews. **[3rd-party]** — [The Retail Exec](https://theretailexec.com/tools/square-pricing/)

**Migration**
- Legacy **Online Plus/Premium** sellers can migrate to the new Square plans from the Dashboard (old hosting plan cancelled, pro-rated refund). **[official]** — [Help 8657](https://squareup.com/help/us/en/article/8657-migrate-from-square-online-to-the-new-square-plans); [Online plans page](https://squareup.com/us/en/online-store/plans)

**AI features**
- Square launched generative-AI tools in **Sept/Oct 2023**: an AI **website copy generator** in Square Online (SEO-oriented), AI **item-description** generation for the POS catalog (synced across channels), and a **restaurant menu generator**. **[official/press]** — [Square press: New Generative AI features](https://squareup.com/us/en/press/square-ai-tools); [TechCrunch](https://techcrunch.com/2023/10/18/squares-new-ai-features-include-a-website-and-restaurant-menu-generator); [Yahoo Finance](https://finance.yahoo.com/news/squares-ai-features-website-restaurant-130002588.html)
- **Photo Studio** app: AI backgrounds for product photos, with 50+ style prompts (2023 figure). **[3rd-party]** — [WebsiteBuilderExpert](https://www.websitebuilderexpert.com/news/square-online-new-ai-features/)
- **Item-description AI workflow:** enter keywords in an AI panel, then rewrite with a new length, tone or keywords. **[official]** — [Help 8335: Create and edit items](https://squareup.com/help/us/en/article/8335-create-and-edit-items)
- **AI-driven discovery (July 1, 2026):** a Square **ChatGPT app and Claude plugin** let eligible sellers be found and take orders inside AI chats. There are no added fees, and sellers are enrolled automatically. The first wave is **US Food & Beverage sellers with an active Square Online Ordering profile**, with orders flowing into POS/KDS. Square says it is also working on **Google** (open commerce standard for Search and Gemini; possibly "coming soon") and **Amazon Alexa+**. **[official]** — [Square press: ChatGPT and Claude integrations](https://squareup.com/us/en/press/claude-chatgpt-integrations); [Business Wire](https://www.businesswire.com/news/home/20260701594157/en/Square-Introduces-New-ChatGPT-and-Claude-Integrations-Helping-Sellers-Reach-Customers-Through-AI-Powered-Discovery)

**API exposure**
- **Sites API:** `ListSites` returns site metadata (ID, title, domain, published status) only. **[official]** — [Sites API overview](https://developer.squareup.com/docs/sites-api/overview)
- **Snippets API:** inject custom HTML/CSS/JS snippets into Square Online site pages (pop-ups, modals). **Not available in Sandbox.** **[official]** — [Snippets API overview](https://developer.squareup.com/docs/snippets-api/overview); [Add a Snippet](https://developer.squareup.com/docs/snippets-api/add-a-snippet)
- Both APIs are publicly available through an **early access program (EAP)**. **[official]** — [Square Online developer docs](https://developer.squareup.com/docs/online-api)

### Inferences
- **No public API** for page content, site builder, blog, forms, SEO settings, customer accounts, pickup/delivery configuration, or theme. Store items and orders are reached through the Catalog API and Orders API, which feed Square Online.
- Square Online is effectively a closed CMS. **For Sheen, replicate** (own website plus booking page) **rather than integrate.**
- The July 2026 ChatGPT/Claude ordering integration currently targets restaurants. It does not appear to cover service bookings for a detailer.

### Gaps
- **Unconfirmed tiers** for these Square Online features in the new plans:
  - blog
  - contact/custom forms
  - customer accounts
  - SEO tools
  - pickup/delivery/local delivery radius
  - Instagram/Facebook shop sync
  - the "Book" (appointments) section on sites
- No official 2026 confirmation that a full **AI website generator** exists; only third-party claims were found.
- Whether a free domain (1 year) is still bundled with Square Plus is unconfirmed.

---

## Q5. Dashboard, reports and analytics; Square AI / Managerbot and other AI

### Takeaway
Every plan gets the Dashboard, standard reports, custom reports and CSV export. "Advanced reporting" is marketed as a **Premium** feature (some sources say Plus), and some advanced reports need a paid plan. **Square AI** (a conversational assistant for business data) opened in US beta in 2025. On **April 28, 2026** it was succeeded by **Managerbot**, an agent that proposes actions for approval. Managerbot is free during beta but limited to F&B, retail and health & beauty sellers. **There is no public reporting API and no public Square AI/Managerbot API.**

### Cited Findings
**Reports**
- **Custom reports** (Dashboard → Reports) are built from blocks: key statistics, sales summary, payment methods, item sales, taxes, and more. They can be **exported but not printed** and **cannot be viewed in the POS app**. **[official]** — [Help 6104: Create custom reports](https://squareup.com/help/us/en/article/6104-creating-custom-reports-in-the-online-dashboard)
- **Export:** many reports offer a **Summary CSV** or **Detail CSV**; reports can be printed, exported or emailed. **[official]** — [Help 8362: Print, export, or email reports](https://squareup.com/help/us/en/article/8362-print-export-or-email-your-reports)
- **Standard reports:** Sales Summary, Sales Trends and Payment Methods. Help 5530 says **some advanced reports require paid subscriptions** but does not list which. **[official]** — [Help 5530](https://squareup.com/help/us/en/article/5530-advanced-reporting); [Help 5072: Set up analytics and reporting](https://squareup.com/help/us/en/article/5072-summaries-and-reports-from-the-online-dashboard)
- **Email summaries:** monthly and yearly Sales Summary emails can be turned on. Automatic emailing of *advanced* reports was not available as of an older post. **[community, dated]** — [Community: reporting FAQs](https://community.squareup.com/t5/New-to-Square/Reporting-Options-with-Square-FAQs/m-p/261192)
- **Advanced reporting tier:** Premium is positioned as the advanced-reporting tier. One third-party review says Plus includes advanced reporting (legacy Online Plus context); another says Plus lacks it. **[official/3rd-party]** — [Square press release](https://squareup.com/us/en/press/unified-pricing-and-packaging); [The Retail Exec](https://theretailexec.com/tools/square-pricing/)

**Square AI (2025)**
- **Square AI open beta (US, 2025):** a conversational assistant in the Dashboard that answers natural-language questions about the seller's own data. Square reports that **60% of queries concern business operations**. **[official]** — [Square press: Square AI open beta](https://squareup.com/us/en/press/square-ai-open-beta); [Square press: beta insights](https://squareup.com/us/en/press/square-ai-beta-insights); [PYMNTS](https://www.pymnts.com/artificial-intelligence-2/2025/square-adds-conversational-ai-assistant-to-business-technology-platform/)
- **Access:** limited to **account owners and admins**. Square says it never sends sensitive information to model providers, and that data is not retained by third parties or used for training. **[official]** — [Square press: Square AI open beta](https://squareup.com/us/en/press/square-ai-open-beta)
- **Free launches abroad:** Australia (**Mar 25, 2026**) and the UK, with local context such as weather and events. **[official]** — [Square AU press: Introducing Square AI](https://squareup.com/au/en/press/square-ai); [ecommercenews.com.au](https://ecommercenews.com.au/story/square-ai-launched-in-australia-for-small-businesses)
- **Zenlytic:** Square acquired Zenlytic, a conversational-analytics startup, to build its data assistant. **[3rd-party]** — [Small Business Trends](https://smallbiztrends.com/square-integrates-zenlytics-ai-to-simplify-business-data-for-sellers/)

**Managerbot (2026, successor to Square AI)**
- **Open beta from Apr 28, 2026.** Managerbot is an AI business agent in the Square Dashboard, positioned as the successor to Square AI. It monitors operations, surfaces insights and automates routine tasks. **It proposes an action and waits for seller approval.** **[official]** — [Square press: Managerbot open beta](https://squareup.com/us/en/press/managerbot-open-beta); [Block IR](https://investors.block.xyz/investor-news/news-details/2026/Square-Brings-Managerbot-to-More-Sellers-Giving-Main-Street-an-Intelligent-Business-Agent/default.aspx)
- **Eligibility:** most **non-franchise US food & beverage, retail and health & beauty** sellers, at **no added cost** during beta. **[3rd-party]** — [PYMNTS](https://www.pymnts.com/news/artificial-intelligence/2026/new-square-ai-agent-automates-daily-tasks-for-main-street-sellers/)
- **Capabilities reported:**
  - real-time sales and labor monitoring
  - inventory vs sales velocity
  - **drafting staff schedules**
  - marketing opportunities
  - flagging catalog issues (missing photos, duplicate tax rates)
  - proposing changes such as item availability
  - **[3rd-party]** — [VentureBeat](https://venturebeat.com/data/block-introduces-managerbot-a-proactive-square-ai-agent-and-the-clearest); [Shopifreaks](https://www.shopifreaks.com/square-opens-managerbot-ai-business-agent-to-broader-group-of-sellers-in-open-beta-inside-square-dashboard/)
- **Models:** built on frontier models from OpenAI and Anthropic. **[3rd-party]** — [The Useful Daily](https://www.theusefuldaily.com/article/block-square-managerbot-ai-agent-small-business)
- **Post-beta pricing undisclosed:** Block declined to say whether Managerbot will be bundled or carry a fee. **[3rd-party]** — [Shopifreaks](https://www.shopifreaks.com/square-opens-managerbot-ai-business-agent-to-broader-group-of-sellers-in-open-beta-inside-square-dashboard/)
- **Rollout claim:** one source says it was already deployed to over 1M sellers and targeted to reach every seller by June 2026. This is unverified; the date has passed. **[3rd-party]** — [Shopifreaks](https://www.shopifreaks.com/square-opens-managerbot-ai-business-agent-to-broader-group-of-sellers-in-open-beta-inside-square-dashboard/)
- **"Moneybot":** a separate Block AI product, reported by eMarketer. Its scope relative to Square was not verified. — [eMarketer](https://www.emarketer.com/content/block-announces-moneybot--wraparound-ai-support-feature-smb-owners)

**Other generative AI:** website copy generator, item-description generator, menu generator and Photo Studio (see Q4). — [Square press: generative AI tools](https://squareup.com/us/en/press/square-ai-tools)

### Inferences
- **Renamed or moved:** "Square AI" (2025) → **Managerbot** (2026) in the US. Older "Square Assistant" branding may appear in old material.
- **Professional-services mode may not be covered:** Managerbot's beta cohort does not list it explicitly, so a mobile detailer may not get it yet.
- **No public report or AI APIs:** none appeared in search results. Sheen's own app must compute reports from raw data pulled through the **Orders, Payments, Invoices, Bookings, Labor and Customers APIs**. The legacy v1 reporting endpoints were retired years ago (prior knowledge, not checked this session).
- **Replicating Square's AI** means natural-language Q&A over Sheen's own database, plus approve-before-execute agent actions. Managerbot's approval-gated design is a good pattern to copy.

### Gaps
- The exact list of reports that are Free vs Plus vs Premium (e.g., team sales, labor vs sales, discount, modifier, category, section, void, gift card, kitchen performance) was not found.
- **Multi-location reporting** and the **Square Dashboard mobile app** feature set were not confirmed in this session.
- Whether Square AI still exists separately from Managerbot in the US, and any AI customer-messaging, AI receptionist or AI marketing features in 2026, were not confirmed.

---

## Q6. Item/service library, modifiers, pricing rules, discounts, taxes, inventory, devices, permissions, multi-location, vertical features

### Takeaway
**Free includes** item/service setup, AI item descriptions, basic stock tracking that updates with sales, daily low-stock email alerts, and stock export. **Plus adds** inventory counts, purchase orders, smart stock forecasting, COGS, vendor management, barcode label printing and cycle counts. **Premium adds** transfer orders and cross-location returns. Public APIs: **Catalog, Inventory and Vendors**. Purchase orders appear to be Dashboard-only.

### Cited Findings
**Inventory: Free**
- Stock counts update automatically with sales. A **daily email lists low-stock or out-of-stock items**. Stock levels can be exported to a spreadsheet. **[official]** — [Square inventory management page](https://squareup.com/us/en/point-of-sale/features/inventory-management); [Help 7746: Track your inventory](https://squareup.com/help/us/en/article/7746-tracking-your-inventory-with-square-for-retail)
- Inventory can be viewed, received and adjusted from the POS app. **[official]** — [Help 6110](https://squareup.com/help/us/en/article/6110-manage-inventory-with-the-retail-pos-app)

**Inventory: Plus**
- Inventory counting tools, **purchase order management**, smart stock forecasting, **COGS tracking**, **vendor management**, barcode generation. **[official]** — [Square vs Clover](https://squareup.com/us/en/compare/square-vs-clover)
- Also listed for Plus: inventory management and stock intake, vendors and POs, cost of goods and inventory reports, barcode label printing. **[3rd-party]** — [dpl.company](https://dpl.company/square-guides/square-pricing-free-plus-premium-and-monthly-costs/)
- **Auto-suggested purchase orders** when stock runs low. **[official, CA]** — [Square CA retail pricing](https://squareup.com/ca/en/point-of-sale/retail/pricing)
- **Cycle counts / stocktakes.** **[official, AU]** — [Square AU inventory reporting](https://squareup.com/au/en/point-of-sale/retail/features/inventory-reporting)
- Downgrading to Free loses smart inventory features, multi-location stock management and barcode label printing. **[official]** — [Square inventory page (search summary)](https://squareup.com/us/en/point-of-sale/features/inventory-management)

**Inventory: Premium**
- **Transfer orders** and **cross-location returns**. **[3rd-party]** — [The Retail Exec](https://theretailexec.com/tools/square-pricing/)

**Catalog**
- Create and edit items, with an **AI-generated item description** option. **[official]** — [Help 8335](https://squareup.com/help/us/en/article/8335-create-and-edit-items)
- New inventory-management tools are described on Square's blog. **[official]** — [Bottom Line: inventory tools](https://squareup.com/us/en/the-bottom-line/operating-your-business/new-tools-to-make-inventory-management-even-easier)

**APIs**
- **Vendors API:** manage a seller's suppliers. **[official]** — [OAuth permissions reference](https://developer.squareup.com/docs/oauth-api/square-permissions); [Commerce API overview](https://developer.squareup.com/docs/commerce)
- The OAuth permissions reference lists the permission scopes per API (catalog, inventory, vendors, appointments, invoices, and others). **[official]** — [OAuth permissions reference](https://developer.squareup.com/docs/oauth-api/square-permissions)

**Plan-level staff and POS items**
- **Plus** adds staff management and advanced POS features. **Premium** adds the advanced access/permissions and rostering listed for Appointments. **[official]** — [Square press release](https://squareup.com/us/en/press/unified-pricing-and-packaging); [Appointments pricing](https://squareup.com/us/en/appointments/pricing)
- **Restaurant mode:** table/course management and bar tabs. **Retail mode:** advanced inventory and multi-location. **[official]** — [Square US POS page](https://squareup.com/us/en/point-of-sale)

### Inferences
- **For a detailer:** services (with duration, price, variations such as sedan/SUV/truck, and add-on modifiers) live in the **Catalog API**. Stock of chemicals and supplies can live in the **Inventory API** plus the **Vendors API**. Purchase orders, forecasting and COGS reports are probably Dashboard-only, and Sheen would replicate them if needed.
- **Catalog/Inventory API detail (prior knowledge of the developer docs, pre-2026; NOT re-verified because developer.squareup.com was blocked; confirm before use):**
  - The Catalog API covers items, item variations, `APPOINTMENTS_SERVICE` items (duration, bookable team members), modifier lists, categories, taxes, discounts, pricing rules (with product sets and time periods), item options, images, custom-attribute definitions and subscription plans.
  - The Inventory API covers counts, adjustments, physical counts and changes by state.
- **Likely Dashboard-only** (no API surface seen; also unverified): device management/device codes beyond the Devices/Terminal APIs, permission sets, and the customer-facing display configuration.

### Gaps
- No confirmed 2026 Free/Plus/Premium tiers were found for:
  - pricing rules / automatic discounts
  - modifiers and variations
  - tax setup
  - permission sets (custom roles)
  - multi-location catalog management
  - device management
  - customer-facing display
- These are believed to be largely free for core use, but that was not verified.
- Whether a Transfer Orders or Purchase Orders API exists in late 2026 is unconfirmed.

---

## Q7. Public API map: which Square API exposes each feature

### Takeaway
Square's public APIs cover the transactional core (catalog, inventory, vendors, customers, orders, payments, invoices, bookings, team/labor, locations). **Most configuration and "smart" features have no API:** estimates, contracts, Projects, booking-site settings, reminders and policies, waitlist, classes, resources, website builder, reports, Square AI/Managerbot, purchase orders. Two API features are gated by plan: seller-level booking writes need a paid Appointments plan, and invoice installments/custom fields need Invoices Plus.

### Cited Findings
- **Invoices API** (with the Orders, Customers and Cards APIs):
  - invoices, deposits, installments (Plus), custom fields (Plus, max 2), card-on-file autopay, scheduling (`scheduled_at`), accepted payment methods, attachments (Create/Delete)
  - no API payment or status management
  - — [Invoices API overview](https://developer.squareup.com/docs/invoices-api/overview); [Create and Publish Invoices](https://developer.squareup.com/docs/invoices-api/create-publish-invoices); [Invoice object](https://developer.squareup.com/reference/square/objects/Invoice); [Pay/refund invoices](https://developer.squareup.com/docs/invoices-api/pay-refund-invoices)
- **Bookings API:**
  - bookings, availability search, `CUSTOMER_LOCATION` address
  - buyer-level access free; seller-level writes need a paid Appointments plan (otherwise 403)
  - Booking Custom Attributes API exists
  - — [Bookings API](https://developer.squareup.com/docs/bookings-api/what-it-is); [Booking object](https://developer.squareup.com/reference/square/objects/Booking); [Dev forum](https://developer.squareup.com/forums/t/unable-to-access-bookingcustomattributes-endpoints/22733)
- **Sites API** (ListSites, metadata only) and **Snippets API** (code injection; not in Sandbox), both EAP. — [Sites API](https://developer.squareup.com/docs/sites-api/overview); [Snippets API](https://developer.squareup.com/docs/snippets-api/overview)
- **Vendors API:** suppliers. — [Commerce API overview](https://developer.squareup.com/docs/commerce)
- **Square MCP server:** an official one is listed by an API directory; its tool scope was not verified. — [APITracker](https://apitracker.io/a/square)

### Inferences
**Feature → API map**

Tags: [V] = confirmed in this session's sources; [K] = prior knowledge of Square developer docs (2024–2025), not re-verified because developer.squareup.com was blocked.

| Feature area | API | Notes |
|---|---|---|
| Invoices, deposits, installments, autopay, scheduled send, attachments | Invoices API [V] + Orders API [V] + Cards API [V] + Customers API [V] | Installments and custom fields gated by Invoices Plus |
| Estimates, multi-package estimates, contracts/e-sign, Projects | None found | Dashboard/app only (absence of evidence) |
| Recurring invoices | None found on Invoices API; Subscriptions API + CatalogSubscriptionPlan [K] | |
| Bookings, availability, customer-location address | Bookings API [V] | Seller-level writes need a paid plan |
| Booking custom fields | Booking Custom Attributes API [V] | |
| Staff booking profiles, business booking profile | Bookings API [K] | |
| Waitlist, classes, resources, intake forms, reminders, cancellation-policy config, booking channels | None found | Dashboard only |
| Services, variations, modifiers, categories, taxes, discounts, pricing rules, images | Catalog API [K] | |
| Stock levels, adjustments, counts | Inventory API [K] | |
| Vendors | Vendors API [V] | |
| Purchase orders, forecasting, COGS reports | None found | |
| Customers, groups, segments, custom fields | Customers API [V]; Customer Groups / Segments / Customer Custom Attributes APIs [K] | |
| Sales, orders, fulfillments (pickup/shipment/delivery), service charges | Orders API [V] | Fulfillment types [K] |
| Payments, refunds, payment links / checkout | Payments, Refunds [V]; Checkout / Payment Links [K] | |
| Team members, wages; shifts and scheduled shifts | Team API, Labor API [K] | |
| Locations, merchant info, custom attributes | Locations, Merchants, Location/Merchant Custom Attributes APIs [K] | |
| Devices / Terminal | Devices API, Terminal API [K] | |
| Website | Sites API, Snippets API [V] | Read-only list + code injection; no content/builder API |
| Reports / analytics | No reporting API [K] | Rebuild from Orders/Payments search |
| Square AI / Managerbot / Photo Studio | No API found | |
| Webhooks for all of the above | Webhook subscriptions / Events API [K] | |

**Build vs integrate (implication for Sheen):**
- **Integrate (APIs exist):** Customers, Catalog, Orders/Payments, Invoices (only while migrating), Bookings (on a paid plan).
- **Must be built (no API):** estimates, contracts, travel-aware scheduling, reports, AI, website.

### Gaps
- The full API reference (current API version string, deprecated APIs, a Transfer Orders API, and any Estimates or Reports API added in 2026) could not be retrieved because developer.squareup.com was blocked. Every [K] row needs verification.
- The Square MCP server's tool list and scope were not verified.
