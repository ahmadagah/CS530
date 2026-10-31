# Square Customer Engagement, Marketing and Communication Features (US, as of 2026-10-31)

> **How this was checked (read first).** The session's network blocked direct fetches of squareup.com, developer.squareup.com, block.xyz, businesswire.com and foodondemand.com (HTTP 403 / DNS refusal). Everything attributed to a Square page below comes from **search-engine extracts of that Square page**, not from reading the full page. Treat every price as "reported by Square's page via search, not read in full." Several snapshots were 1–2 years old, and the age is noted where it was known.
> **API coverage is the strongest evidence here.** It comes from Square's public OpenAPI spec, cloned from GitHub ([square/connect-api-specification api.json](https://github.com/square/connect-api-specification/blob/master/api.json); commit 0689c901, 2026-09-15; default `Square-Version` 2026-09-16). If a feature has no endpoint in that spec, these notes call it "no public API."
> **Pricing context.** On **2025-10-06** Square replaced 18 à la carte subscriptions with three per-location plans: **Square Free $0, Square Plus $49/mo per location, and Square Premium $149/mo per location** ([Square press release](https://squareup.com/us/en/press/unified-pricing-and-packaging)). Most engagement tools that used to be paid add-ons (Marketing, Loyalty, Messages Plus) now come with Plus or Premium. Other researchers cover POS, Online, Appointments, Invoices and Payments pricing. Plans are mentioned here only where they gate engagement features.

---

## Q1. Customer Directory (CRM): profiles, notes, custom fields, groups, smart segments, cards on file, history, import/export, merge, marketing preferences, feedback. Free or paid?

### Takeaway
The Customer Directory is **free on every plan, including Square Free**. Its core data is almost fully exposed by public APIs: the Customers API (CRUD and bulk), the Customer Groups API (CRUD), the Customer Segments API (**read-only**), the Customer Custom Attributes API, the Cards API and webhooks. Several things are **dashboard-only**:
- merging duplicates
- defining smart groups
- CSV import/export
- receipt feedback
- SMS marketing consent
- computed visit and spend statistics

### Cited Findings
**Features and pricing**
- Square markets the Customer Directory as "free customer relationship management (CRM) software." A profile is created automatically after a sale, and later transactions are de-duplicated and enriched. Sellers can see purchase history, filter and segment, and track lapsed customers. — [Square Customer Directory page](https://squareup.com/us/en/point-of-sale/features/customer-directory)
- Square Free ($0) "maintains access to all the tools Square has offered sellers without a software subscription." Plus and Premium add marketing and loyalty on top of that. — [Square press release, 2025-10-06](https://squareup.com/us/en/press/unified-pricing-and-packaging)
- **Merge duplicates (dashboard/POS only).** Open the profile, use the ••• menu, choose Merge, pick the other profile and confirm. A merge **cannot be undone**. Square flags likely duplicates automatically when profiles share an email and/or phone number, and the Duplicate Suggestion view offers Merge, Merge All or Ignore. Profiles with different names, emails or phones are not flagged. — [Square help 8401: Edit, merge, or delete customer profiles](https://squareup.com/help/us/en/article/8401-edit-merge-or-delete-customer-profiles)
- **Import/export.** Bulk import works only in the Dashboard (Customers → Import/Export → Import customers, upload a file, map fields). Rows that match existing customers enrich those profiles. Files must be **.CSV** (.xls and .numbers are not supported). Export is available. — [Square help 5498](https://squareup.com/help/us/en/article/5498-manage-your-customer-directory-online); [Square Community: Importing customers](https://community.squareup.com/t5/Payments-Troubleshooting/Importing-customers/td-p/618326)
- **Custom fields.** Create them under Dashboard Settings → Configure profiles, or POS Settings → Customers. Types are **text, toggle, address and date**. Custom fields are needed to filter on anything outside Square's default filters. — [Square help 5860: Create custom fields](https://squareup.com/help/us/en/article/5860-creating-custom-fields-in-your-customer-directory)
- **Groups and smart groups.**
  - Manual groups have hand-picked members.
  - **Smart groups** are dynamic: members join and leave as they meet the filters. Two come by default, **Regulars** and **Lapsed**. Create one via Customers → Customer directory → + Create Group → Smart group, starting from a template or custom filters.
  - Per a community answer, customers are not added to manual groups automatically on import.
  - Sources: [Square help 6245: Create customer groups and filters](https://squareup.com/help/us/en/article/6245-manage-customer-groups-and-filters); [Square Community](https://community.squareup.com/t5/Payments-Troubleshooting/How-am-I-able-to-add-multiple-customers-to-a-Group-I-have/m-p/178916)
- **Cards on file.** Cards are stored per customer through the Cards API. The US rate for card-on-file or manual-entry payments is reported as **3.5% + 15¢**, versus 2.6% + 15¢ in person, as quoted in the Square gift-card fee table. — [Square gift card pricing](https://squareup.com/us/en/gift-cards/pricing). A search extract of a Square page quoted "2.5% per transaction" for card on file. This conflicts with the US figure and is probably a non-US page, so it is **unverified**. — [Square AU Customer Directory/Card on File post](https://squareup.com/au/en/the-bottom-line/reaching-customers/serve-your-customers-better-introducing-square-customer-directory-and-card-on-file)

**What the API exposes** (all from the [Square OpenAPI spec](https://github.com/square/connect-api-specification/blob/master/api.json))
- **Customers API:** `ListCustomers`, `CreateCustomer`, `RetrieveCustomer`, `UpdateCustomer`, `DeleteCustomer`, `SearchCustomers`, `BulkCreateCustomers`, `BulkRetrieveCustomers`, `BulkUpdateCustomers`, `BulkDeleteCustomers`, `AddGroupToCustomer`, `RemoveGroupFromCustomer`. `CreateCustomerCard` and `DeleteCustomerCard` are **DEPRECATED** in favour of the Cards API.
- **Customer object fields:** given_name, family_name, nickname, company_name, email_address, address, phone_number, birthday (YYYY-MM-DD; year optional as 0000), reference_id (your own system's ID), note (one free-text field), preferences, creation_source, group_ids, segment_ids, version (optimistic concurrency), tax_ids (EU/UK only).
- **Marketing preference via API:** `preferences` contains **only `email_unsubscribed` (boolean)**. There is **no SMS/text marketing opt-in field**.
- **`creation_source` values:** OTHER, APPOINTMENTS, COUPON, DELETION_RECOVERY, DIRECTORY, EGIFTING, EMAIL_COLLECTION, FEEDBACK, IMPORT, INVOICES, LOYALTY, MARKETING, MERGE, ONLINE_STORE, INSTANT_PROFILE, TERMINAL, THIRD_PARTY, THIRD_PARTY_IMPORT, UNMERGE_RECOVERY. This shows that feedback, marketing, eGift, merge and instant profiles all create Directory records.
- **SearchCustomers filters:** creation_source, created_at, updated_at, email_address, phone_number, reference_id, group_ids, segment_ids, and up to 10 custom-attribute filters.
- **Customer Groups API:** List, Create, Retrieve, Update and Delete groups (full CRUD).
- **Customer Segments API:** `ListCustomerSegments` and `RetrieveCustomerSegment` **only**. The spec says segments ("Smart Groups") "are defined and created within the Customer Directory in the Square Seller Dashboard or Point of Sale."
- **Customer Custom Attributes API:**
  - Definitions: List, Create, Retrieve, Update, Delete.
  - Values: List, Retrieve, Upsert, Delete, and `BulkUpsertCustomerCustomAttributes`.
  - Visibility levels and webhook variants: owned, visible, public.
- **Cards API:** `CreateCard`, `ListCards` (filter by customer), `RetrieveCard`, `DisableCard`.
- **Webhooks:** customer.created, customer.updated, customer.deleted, customer.custom_attribute.* and customer.custom_attribute_definition.* (owned/visible/public), and card.created, card.updated, card.disabled, card.forgotten, card.automatically_updated.

### Inferences
- A replacement app can fully own customer profiles, notes, custom fields and manual groups through the API and keep them in sync with webhooks.
- Smart segments can be **read but not created** through the API, so the app would need its own segmentation engine.
- Merge has no endpoint. A merge done in Square appears via the API only as a profile with `creation_source = MERGE` plus deletions and updates delivered by webhook.
- "Visit count", "total spend" and "last visit", which the Dashboard shows, are not fields on the Customer object. They would have to be computed from the Orders/Payments APIs filtered by `customer_id` (those APIs are covered by other researchers).
- SMS consent is not readable or writable through the API. A custom app sending marketing texts must keep its own TCPA/opt-in records.

### Gaps
- Could not read the full help pages, so it is unconfirmed whether the dashboard allows multiple timestamped notes or reminders per customer (the API exposes a single `note` string).
- It is unclear whether CSV export includes custom fields, cards and history.
- Whether a "Customer insights/analytics" report is limited to Premium ("advanced reporting") was not confirmed.
- No official source was found for the exact US card-on-file rate in late 2026 (it belongs to the Payments researcher).

---

## Q2. Square Marketing (email and SMS): free vs paid, send limits, automations, coupons, social, ads, AI, reporting

### Takeaway
Since Oct 2025, Square Marketing comes with **Square Plus ($49/location/mo) or Premium ($149/location/mo)**:
- **unlimited email campaign sends**
- texts: **Plus includes 500/mo per account, then 3¢ each; Premium includes 2,500/mo, then 1.5¢ each**
- an MMS counts as 3 texts

Square Free does not include Marketing. A legacy standalone price list (email from $15/mo by contact count; texting with a $10/mo base fee plus usage) still appears on Square's pricing page. **There is no public API for campaigns, automations, coupons, SMS sends or marketing reports.**

### Cited Findings
**Pricing (current bundled model)**
- Square Plus "offers everything in Square Free, along with advanced POS features … loyalty programs, marketing tools, and staff management." It costs $49/mo per location, with a 30-day free trial. Premium is $149/mo per location with "nearly all" Square software, 24/7 phone support and advanced reporting. — [Square press release 2025-10-06](https://squareup.com/us/en/press/unified-pricing-and-packaging); [Square Bottom Line: "A Simpler Way Forward"](https://squareup.com/us/en/the-bottom-line/inside-square/pricing-plans)
- "Square Plus: Unlimited email campaign sends and 500 included texts per month (each text over 500 is 3¢ each). Square Premium: Unlimited email campaign sends and 2500 included texts per month (each text over 2500 is 1.5¢ each)." Text marketing **requires** Plus or Premium. The text allowance is **per account, not per location**. — [Square Marketing page](https://squareup.com/us/en/marketing); [Square pricing](https://squareup.com/us/en/pricing)
- An MMS (image text) is billed as 3 texts. Each phone number a campaign reaches counts as one text. — [Square Marketing pricing page](https://squareup.com/us/en/software/marketing/pricing); [Square Community](https://community.squareup.com/t5/Square-Marketing/messages-vs-text-marketing/m-p/698626)

**Pricing (legacy standalone, still on Square's page)**
- **Email:** priced by subscribed contacts, unlimited sends: **$15/mo for up to 500 contacts, $30 for 501–1,000, … $90 for 4,001–9,000**.
- **Text:** "$10 monthly subscription fee, plus a cost based on how many texts you send that month," after a 30-day free trial. — [Square Marketing pricing page](https://squareup.com/us/en/software/marketing/pricing)
- The older text schedule: $10 base with 0 texts, **$20 for 1–250, $25 for 251–500, $35 for 501–1,000**, with the base fee included in each total. — [Square Community: pricing for text message marketing](https://community.squareup.com/t5/Customer-Engagement/Need-clarification-on-pricing-for-text-message-mar/td-p/369708); 1–250 at $20 also in [Merchant Maverick](https://www.merchantmaverick.com/what-is-square-marketing/). This looks outdated.
- **Third-party email tiers disagree with Square's page:**
  - $15 / $25 / $35 for ≤500 / 501–1,000 / 1,001–2,000 contacts — [SaaSworthy](https://www.saasworthy.com/product/square-marketing/pricing)
  - $15 / $30 / $40 for the same bands — [Remote People](https://remotepeople.com/providers/square-review/pricing/)
  - "1.5% per email": implausible — [Research.com](https://research.com/software/reviews/square-marketing)
  - Use Square's page over these.
- **Seller reports:**
  - A seller reported text costs about 3× the expected bill after moving to Premium (one anecdote). — [Square Community thread](https://community.squareup.com/t5/Customer-Engagement/Square-text-message-marketing-cost-more-than-expected/td-p/830331)
  - Another seller hoping to get Marketing inside Plus was quoted a higher price for email add-ons, and some accounts were told they were "ineligible to switch," so migration outcomes vary. — [Square Community: New paid plans thread](https://community.squareup.com/t5/Customer-Engagement/New-Square-Paid-Plans-Square-Plus-and-Square-Premium-Help-me/m-p/823190)

**Features**
- **Automated campaigns** (email and text): **welcome new customers, abandoned-cart reminders, birthday coupons, and lapsed-customer win-back**. — [Square Marketing page](https://squareup.com/us/en/marketing)
  - Square's own claims: 14% of lapsed customers return after a win-back email; birthday-offer emails raise the return-to-purchase rate by 72%. — [Square Bottom Line: 5 marketing automation examples](https://squareup.com/us/en/the-bottom-line/reaching-customers/5-marketing-automation-examples-for-small-businesses-2)
- **One-off campaigns** (email builder with text blocks). The **AI "Generate content"** button writes or rewrites any text block. — [Square help 8412: Create marketing campaigns](https://squareup.com/help/us/en/article/8412-create-marketing-campaigns). The AI writer is described as built on OpenAI. — [Square Email Marketing page](https://squareup.com/us/en/software/marketing/email)
- **Coupons:** create them and send by email or text, then track redemptions in the Dashboard. A Square Online coupon code can be inserted into a campaign but is **redeemable online only**. — [Square help 6922](https://squareup.com/help/us/en/article/6922-add-an-online-store-coupon-to-a-marketing-campaign); [Square Marketing page](https://squareup.com/us/en/marketing)
- **Google review request automation** is a Marketing feature (details in Q7). — [Square help 8418: Collect Google reviews](https://squareup.com/help/us/en/article/8418-collect-google-reviews)
- **Facebook:**
  - Post promotions, announcements and events to a Facebook business page from the Dashboard (older pages).
  - A Square staff Q&A said Marketing subscribers had free access to create Facebook ad campaigns. — [Square Community Live Q&A (archived)](https://community.squareup.com/t5/Archived-Discussions-Read-Only/Live-Q-amp-A-Ask-us-anything-about-Square-Marketing/m-p/137997)
  - The pricing page lists "Connect your Facebook and Instagram to your Square Online website, and create and manage targeted Facebook ads." — [Square pricing](https://squareup.com/us/en/pricing)
  - Meta catalog/Shop sync: [Square help 7887: Connect Square Online with Meta for Business](https://squareup.com/help/us/en/article/7887-connect-square-online-with-meta-for-business)
- **Instagram:** an older staff answer (about 2.3 years old) said there was no organic Instagram posting integration. Newer pages describe only catalog sync and Instagram ads through Square Online/Meta. — [Square Community archived Q&A](https://community.squareup.com/t5/Archived-Discussions-Read-Only/Live-Q-amp-A-Ask-us-anything-about-Square-Marketing/m-p/137997)
- **Loyalty promotions plus text marketing:** an AI promotion builder (four templates) can generate the text-marketing message announcing the promotion. — [Square Community Product Update: Loyalty promotions AI](https://community.squareup.com/t5/Product-Updates/-Square-Loyalty-promotions-AI/ba-p/720312)
- **Neighborhoods (Cash App):** sellers can send marketing campaigns inside Cash App to customers who follow them. This is a separate channel from Square Marketing; see Q3. — [Square press: Neighborhoods](https://squareup.com/us/en/press/neighborhoods-by-cash-app)
- **Country notes:** Square Marketing and Loyalty launched in the UK in Oct 2021 and Ireland in Mar 2022. Prices differ outside the US. — [BusinessWire UK](https://www.businesswire.com/news/home/20211020005465/en/Square-Loyalty-and-Square-Marketing-Launch-for-UK-Businesses); [BusinessWire IE](https://www.businesswire.com/news/home/20220310005085/en/5164250/Square-Loyalty-and-Square-Marketing-Launch-for-Irish-Businesses)

**What the API exposes**
- The OpenAPI spec has **no Marketing, Campaign, Coupon-campaign or SMS endpoints and no matching schemas**. The only marketing-related API surface is `Customer.preferences.email_unsubscribed`, plus Customer Groups (the spec suggests groups such as "Weekly/Monthly" for marketing schedules). — [Square OpenAPI spec](https://github.com/square/connect-api-specification/blob/master/api.json)
- Payment links (Checkout API) carry `enable_coupon` and `enable_loyalty` options, which let coupons and loyalty be used at an API-created checkout. — [Square OpenAPI spec](https://github.com/square/connect-api-specification/blob/master/api.json)

### Inferences
- Marketing is **dashboard-only**. An app that replaces Square has to send its own email/SMS (for example via an ESP or Twilio) and keep its own consent, unsubscribe and campaign logic. It can only *read and write* `email_unsubscribed` back to Square.
- For a small mobile detailer, Square Plus at $49/mo per location bundles Marketing, Loyalty and the business number. An app that rebuilds these features avoids the plan only if nothing else (Appointments Plus features and so on) needs it.

### Gaps
- Could not confirm the full current legacy email table (all tiers above 9,000 contacts) or whether new sellers can still buy standalone Marketing after Oct 2025.
- No official source found for:
  - an AI "generate a whole campaign" feature or AI social-post generation in 2026
  - **Square Photo Studio's** current status (it appears only as a menu label)
  - marketing **reporting** metrics beyond coupon-redemption tracking and the Google Reviews stats page (open/click/attributed-sales reporting is believed to exist but was not confirmed this session)
- Whether Google Ads integration exists inside Square Marketing: no evidence found.

---

## Q3. Square Loyalty: pricing, program types, rewards, SMS enrollment, loyalty marketing, 2025–2026 changes (Neighborhoods / Cash App)

### Takeaway
Square Loyalty is **included in Square Plus ($49/location/mo) and Premium ($149/location/mo)** and is not in Square Free. The old standalone add-on, tiered by monthly "loyalty visits" per location, is legacy. There is **one program per seller**, configured in the Dashboard. Points are earned per visit, per amount spent, or per item/category bought, and can be redeemed across multiple reward tiers. The **Loyalty API** covers accounts, points, rewards and promotions but **cannot create the program itself**.

The big 2025–2026 change is Block's **Neighborhoods** in Cash App, launched Oct 2025. It is a free-to-seller, Cash App-funded "Local Cash" reward network: customers earn 10% back, up to $10 per order. Sellers can also send marketing to their Cash App followers. It has **no public API**.

### Cited Findings
**Pricing**
- Plus includes "staff management tools, marketing, loyalty, and a customizable website." — [Square Bottom Line: A Simpler Way Forward](https://squareup.com/us/en/the-bottom-line/inside-square/pricing-plans); [Square press release 2025-10-06](https://squareup.com/us/en/press/unified-pricing-and-packaging)
- Loyalty is marked unavailable on Square Free; Premium includes it. — [tryloyaltycards (third-party, cites Square pricing)](https://tryloyaltycards.com/blog/square-loyalty-program-cost). One community poster on Free claimed to have Loyalty added. **Unverified.**
- After moving to Plus, a separately billed **legacy Loyalty subscription** can be cancelled without losing features (community answer). — [Square Community](https://community.squareup.com/t5/Hardware-Setup-Troubleshooting/Can-I-cancel-my-legacy-Loyalty-plan-without-losing-features/td-p/823836)
- **Legacy standalone pricing:**
  - Charged per location and tiered by the previous month's "loyalty visits." A visit is an enrollment, a point earned or a reward redeemed. Billed on the 1st of the month. 30-day free trial.
  - Tier figures: **Canada CAD $60 / $100 / $140** and **Ireland €39 / €65 / €90 + VAT**, for 0–500 / 501–1,500 / 1,501–10,000 visits. — [Square CA Loyalty](https://squareup.com/ca/en/software/loyalty); [Square IE Loyalty](https://squareup.com/ie/en/software/loyalty)
  - The Square AU loyalty page lists $49 / $99 / $149 for the same tiers (probably AUD, not confirmed as US). — [Square AU beauty loyalty](https://squareup.com/au/en/solutions/beauty/loyalty)
  - Third parties put the **US legacy** price at "from $45/mo per location." — [loop.fans review](https://loop.fans/blog/square-loyalty-program-review)

**Program mechanics**
- Program types (accrual rules) in the API: **VISIT, SPEND, ITEM_VARIATION, CATEGORY**.
- A program has reward tiers (points needed plus a discount defined by a pricing rule), an optional points `expiration_policy`, custom terminology (for example, "Stars" instead of "Points") and the locations it applies to.
- "Square sellers can have only one loyalty program, which is created and managed from the Seller Dashboard."
- A loyalty account is keyed by the buyer's **phone number** (E.164), which is how phone/SMS enrollment works.
- Source for all four points: [Square OpenAPI spec (LoyaltyProgram, LoyaltyAccountMapping)](https://github.com/square/connect-api-specification/blob/master/api.json)
- **Loyalty promotions** (extra points on top of the base program):
  - The API describes them as `POINTS_MULTIPLIER` or `POINTS_ADDITION`, with a minimum spend, qualifying items/categories, available time windows and a trigger limit (ALL_TIME or DAY). There is a maximum of **10 active/scheduled** promotions. — [Square OpenAPI spec](https://github.com/square/connect-api-specification/blob/master/api.json)
  - The Dashboard offers **four AI-powered promotion templates** ("our generative AI tool will do the rest") that tie into Text Message Marketing; one promotion trigger per customer per day. — [Square Community Product Update](https://community.squareup.com/t5/Product-Updates/-Square-Loyalty-promotions-AI/ba-p/720312)
- Points-balance texts go to members automatically (third-party claim). — [tryloyaltycards](https://tryloyaltycards.com/blog/square-loyalty-program-cost)
- A third-party review says Square Loyalty has **no referral features**. — [loop.fans](https://loop.fans/blog/square-loyalty-program-review)

**What the API exposes** (from the [Square OpenAPI spec](https://github.com/square/connect-api-specification/blob/master/api.json))
- **Accounts:** `CreateLoyaltyAccount`, `SearchLoyaltyAccounts`, `RetrieveLoyaltyAccount`.
- **Points:** `AccumulateLoyaltyPoints`, `AdjustLoyaltyPoints`, `CalculateLoyaltyPoints`, `SearchLoyaltyEvents`.
- **Program:** `RetrieveLoyaltyProgram` (`ListLoyaltyPrograms` is **DEPRECATED**).
- **Promotions:** `List`, `Create`, `Retrieve`, `Cancel`.
- **Rewards:** `CreateLoyaltyReward`, `SearchLoyaltyRewards`, `RetrieveLoyaltyReward`, `DeleteLoyaltyReward`, `RedeemLoyaltyReward`.
- **Event types:** ACCUMULATE_POINTS, CREATE_REWARD, REDEEM_REWARD, DELETE_REWARD, ADJUST_POINTS, EXPIRE_POINTS, ACCUMULATE_PROMOTION_POINTS, OTHER.
- **Webhooks:** loyalty.account.created/updated/deleted, loyalty.event.created, loyalty.program.created/updated, loyalty.promotion.created/updated.
- There is **no endpoint to create or edit the program**, its accrual rules or its reward tiers.

**Neighborhoods (Block / Cash App local network)**
- Square's press release ("Introducing Neighborhoods on Cash App") describes a network connecting Square sellers with Cash App customers. It launched in **October 2025**.
  - Sellers appear on a map in Cash App's **Neighborhoods tab**, and users can **follow** them.
  - Sellers can "reach them directly with marketing campaigns in Cash App."
  - Source: [Square press: Neighborhoods by Cash App](https://squareup.com/us/en/press/neighborhoods-by-cash-app); [Payments Dive](https://www.paymentsdive.com/news/building-blocks-square-base/828712/)
- **Local Cash rewards:** 10% of the order subtotal, **capped at $10 per order**, redeemable on a later visit. **Cash App funds Local Cash** for an initial period, so it is "a no-cost way to reward customers"; this is reported as the first 12 months. New customers can get a one-time **$5** Local Cash bonus on a qualifying first purchase. — [Block/BusinessWire 2026-08-25 via Nasdaq](https://www.nasdaq.com/press-release/blocks-neighborhoods-adds-30000-more-sellers-square-and-cash-app-help-build-local); [PYMNTS](https://www.pymnts.com/checkout-conversion/2026/blocks-local-commerce-network-adds-30000-sellers/)
- **Scale:**
  - Aug 25 2026: added **30,000 sellers**, nearly 10× since June 2026.
  - June 2026: participating sellers represented $1B in annualized GPV, up more than 220% from March.
  - Became available on **Square Terminal** in June 2026.
  - Follower spend reaches about 10% of a seller's GPV after about three quarters; Yahoo's wording of the timing differs slightly.
  - Sources: [Nasdaq/BusinessWire](https://www.nasdaq.com/press-release/blocks-neighborhoods-adds-30000-more-sellers-square-and-cash-app-help-build-local); [Yahoo Finance](https://finance.yahoo.com/markets/stocks/articles/block-sq-rapid-neighborhoods-expansion-161626635.html)
- **Seller economics:** Payments Dive reports Square sellers get a **1% processing fee on orders from Cash App users**, about half the usual fee. — [Payments Dive](https://www.paymentsdive.com/news/building-blocks-square-base/828712/)
- Trade press (2026-08-26) reports a "Cash App-native loyalty solution" jump-started by a Square integration. The article could not be fetched. — [Food On Demand](https://foodondemand.com/08262026/square-integration-jumpstarts-cash-app-native-loyalty-solution/)
- The OpenAPI spec (2026-09-16) has **no Neighborhoods, Local Cash or follower endpoints**. — [Square OpenAPI spec](https://github.com/square/connect-api-specification/blob/master/api.json)

### Inferences
- A custom app can run Square-backed loyalty fully over the API: look up the account by phone, add points on a completed order, create and redeem rewards, and run promotions. The program itself (point rules, tiers, expiry) must be set up once in the Dashboard.
- Neighborhoods could be an acquisition channel for a Portland mobile detailer. However, it is tied to Square POS/Terminal payment acceptance and Cash App users, it is not controllable from a custom app, and its eligibility for mobile service businesses was not confirmed.

### Gaps
- Could not confirm the exact **US** legacy standalone tier prices.
- Could not confirm whether loyalty SMS enrollment and points texts use up the Plus/Premium marketing text allowance.
- Not confirmed: Neighborhoods eligibility by industry (service/mobile businesses), opt-in steps, whether the seller-funded period after 12 months has a set cost, and whether the "1% fee" is current.
- The Food On Demand "Cash App-native loyalty" article could not be read.

---

## Q4. Square Gift Cards: physical and eGift, pricing/fees, online eGift store, promotions, balance checks

### Takeaway
- **eGift cards are free to set up.** Physical cards cost **about $0.50–$1.50 per card**, depending on type and quantity.
- Every **load or reload carries up to a 2.5% load fee**, introduced in the 1/31/2024 repricing, and it is **waived on Square Premium**. Standard processing fees also apply. Redemption is free and cards don't expire.
- The **Gift Cards API and Gift Card Activities API** fully cover issuing, loading, redeeming, adjusting, blocking and linking cards to customers, including custom card numbers ("GAN source OTHER").
- The eGift storefront design, physical card ordering and the check-balance page are dashboard/hosted only.

### Cited Findings
**Pricing**
- "eGift cards are free to set up." Physical card prices conflict between search extracts of the same Square pricing page:
  - (a) Starter packs from **$1.50/card**, quick cards **65¢**, custom **50¢**
  - (b) Quick cards from **$1.50/card**, custom from **65¢**
  - Both say "plus a 2.5% load fee and standard processing fees," and per-card price varies with quantity.
  - Source: [Square Gift Cards pricing](https://squareup.com/us/en/gift-cards/pricing); [Square Gift Cards](https://squareup.com/us/en/gift-cards)
- "Up to a 2.5% load fee each time funds are added to a gift card or eGift card."
  - **Square Premium sellers pay no gift card load fees**, but still pay processing. Free and Plus pay the 2.5%.
  - "No additional fees when a customer redeems a card."
  - Source: [Square Gift Cards pricing](https://squareup.com/us/en/gift-cards/pricing); [Square pricing](https://squareup.com/us/en/pricing)
- The load fee arrived with the **1/31/2024 repricing**. — [Square Community: Questions about Square Gift Cards Repricing (1-31-24)](https://community.squareup.com/t5/Payments-Troubleshooting/Questions-about-Square-Gift-Cards-Repricing-1-31-24/m-p/714093)
- **Processing on gift card sales:** in person 2.6% + 15¢; manual entry or card on file 3.5% + 15¢; eGift bought on the online order page **2.9% + 30¢**. An older help article says 3.3% + 30¢. — [Square Gift Cards pricing](https://squareup.com/us/en/gift-cards/pricing); [Square help 5068: fees](https://squareup.com/help/us/en/article/5068-what-are-square-s-fees)

**Features**
- **Balance check:** the Dashboard generates a **check-balance page link** to put on a website or send to customers. Buyers scan the card's QR code or enter the 16-digit number and 4-digit PIN. — [Square help 8405: Check gift card balances](https://squareup.com/help/us/en/article/8405-check-gift-card-balances)
- **Hosted eGift order page:** customers buy and send eGift cards. — [Square help 6355](https://squareup.com/help/us/en/article/6355-send-an-egift-card)
- **Reloads** happen on the same page ("Reload card"). **Discount/promo codes** can be applied at purchase or reload, which is how gift card promotions work. — [Square help 8403: Reload eGift cards](https://squareup.com/help/us/en/article/8403-reload-egift-cards)
- Square gift cards **do not expire**. — [Square Gift Cards pricing](https://squareup.com/us/en/gift-cards/pricing)
- Free printable gift certificate templates are available. — [Square gift certificate templates](https://squareup.com/us/en/gift-cards/gift-certificate-templates)

**What the API exposes** (from the [Square OpenAPI spec](https://github.com/square/connect-api-specification/blob/master/api.json))
- **Gift Cards API:** `ListGiftCards`, `CreateGiftCard`, `RetrieveGiftCard`, `RetrieveGiftCardFromGAN`, `RetrieveGiftCardFromNonce`, `LinkCustomerToGiftCard`, `UnlinkCustomerFromGiftCard`.
  - Types: **PHYSICAL, DIGITAL**.
  - GAN source: **SQUARE** or **OTHER** (bring your own card numbers).
  - States: ACTIVE, DEACTIVATED, BLOCKED, PENDING.
- **Gift Card Activities API:** `ListGiftCardActivities` and `CreateGiftCardActivity`. Activity types:
  - ACTIVATE, LOAD, REDEEM
  - CLEAR_BALANCE, DEACTIVATE
  - ADJUST_INCREMENT, ADJUST_DECREMENT
  - REFUND, UNLINKED_ACTIVITY_REFUND
  - IMPORT, IMPORT_REVERSAL
  - BLOCK, UNBLOCK
  - TRANSFER_BALANCE_FROM, TRANSFER_BALANCE_TO
- **Webhooks:** gift_card.created, gift_card.updated, gift_card.customer_linked, gift_card.customer_unlinked, gift_card.activity.created, gift_card.activity.updated.

### Inferences
- A custom app can sell eGift cards in its own checkout: create a DIGITAL card, take payment, ACTIVATE with that amount, then email its own card design. Balance checks and redemption can also be done over the API, so Square's hosted eGift page is not needed.
- Whether the 2.5% load fee applies to API-created activations was not confirmed. Plan for it on Free/Plus.

### Gaps
- Physical card unit prices conflict, as above; read the live page.
- Not confirmed: a native "bonus card" promotion (for example "buy $100, get $20") beyond discount codes, and whether Cash App sells or holds Square merchant gift cards.

---

## Q5. Square Subscriptions / memberships / recurring service plans (for monthly detailing maintenance plans)

### Takeaway
There are two native options:
- **Square Subscriptions** (item subscription plans) have **no monthly fee**; standard processing applies. Square positions them for **items, not Appointments services**.
- **Appointments Packages** are prepaid service bundles, available only on Plus/Premium per the community, and they are **not recurring**.

The **Subscriptions API** together with the Catalog API (`SUBSCRIPTION_PLAN` / `SUBSCRIPTION_PLAN_VARIATION`) is full-featured: create, pause, resume, swap plan, cancel, change billing anchor, multi-phase pricing, and checkout links. It is the strongest Square building block for a "monthly maintenance detail" plan, while booking and visit-entitlement logic would live in the custom app. Packages have no API.

### Cited Findings
**Features and limits**
- Square Subscriptions: "no monthly fees or fixed costs."
  - Limitations: **you cannot change a plan's price after creation, cannot set custom billing dates, and cannot add pickup fulfillment**.
  - Managed in Dashboard → Items → Subscriptions.
  - Source: [Square help 7627: Manage item subscription plans](https://squareup.com/help/us/en/article/7627-get-started-with-subscriptions-in-dashboard)
- Processing on subscription charges is quoted as 2.9% + 30¢ in 2021–2022 community posts. This is dated and unofficial. — [Square Community archived Q&A](https://community.squareup.com/t5/Archived-Discussions-Read-Only/Grow-your-business-Ask-us-anything-about-subscriptions-and/m-p/298093)
- Moderators say "Subscriptions are not used for services/Appointment bookings… more for items," and point users to Packages. Appointments does not integrate with subscription checkout links. — [Square Community: Subscriptions in Appointments](https://community.squareup.com/t5/Appointments-Bookings/Subscriptions-In-Appointments/m-p/772924); [Square Community: memberships](https://community.squareup.com/t5/Appointments-Bookings/Customer-memberships-subscriptions-how-do-you-book-and-check/m-p/708413)
- **Packages:**
  - A "prepaid series of services or classes," created under Items & services → Items → Packages, with chosen service variations.
  - Automatically applied at checkout when a booked service is covered.
  - The profile shows remaining credits, but package history, contents and expiration cannot be edited.
  - Packages need Plus or Premium (community answer).
  - Sources: [Square help 8268: Packages](https://squareup.com/help/us/en/article/8268-create-and-manage-packages-with-square-appointments); [Square help 8440: Sell and redeem packages](https://squareup.com/help/us/en/article/8440-sell-and-redeem-packages); [Square Community](https://community.squareup.com/t5/Appointments-Bookings/How-are-Subscriptions-Packages-Redeemed/td-p/780408)

**What the API exposes** (from the [Square OpenAPI spec](https://github.com/square/connect-api-specification/blob/master/api.json))
- **Subscriptions API:** `CreateSubscription`, `SearchSubscriptions`, `RetrieveSubscription`, `UpdateSubscription`, `CancelSubscription`, `ResumeSubscription`, `ListSubscriptionEvents`, plus **BETA** `PauseSubscription`, `SwapPlan`, `BulkSwapPlan`, `ChangeBillingAnchorDate`, `DeleteSubscriptionAction`.
- **Cadences:** DAILY, WEEKLY, EVERY_TWO_WEEKS, THIRTY_DAYS, SIXTY_DAYS, NINETY_DAYS, MONTHLY, EVERY_TWO_MONTHS, QUARTERLY, EVERY_FOUR_MONTHS, EVERY_SIX_MONTHS, ANNUAL, EVERY_TWO_YEARS.
- **Phases:** STATIC or RELATIVE pricing (for example an intro price, then a regular price).
- **Subscription fields:** card_id (card on file), invoice_ids (each bill creates an Invoice), price_override_money, monthly_billing_anchor_date, status (PENDING / ACTIVE / CANCELED / DEACTIVATED / PAUSED / COMPLETED).
- **Plans** live in the Catalog API as `SUBSCRIPTION_PLAN` (with eligible_item_ids, eligible_category_ids, all_items) and `SUBSCRIPTION_PLAN_VARIATION` (phases, can_prorate, successor_plan_variation_id).
- **Payment links** (Checkout API) accept `subscription_plan_id`, so a hosted "subscribe" checkout can be created over the API.
- **Webhooks:** subscription.created, subscription.updated, plus invoice.* events (including invoice.scheduled_charge_failed).
- **No Packages endpoints** exist in the spec.

### Inferences
- For a monthly detailing plan, the most practical setup is: the Square Subscriptions API handles billing (catalog plan → payment link or card on file → subscription), and the custom app tracks entitlement (for example "1 maintenance wash per month") and books the visits. Square's own packages and appointments link is not exposed to developers.
- The "cannot change price after creation" limit is a dashboard rule. Through the API, `price_override_money` on a subscription or a plan swap is the workaround (the API fields exist, but this behaviour was not tested).

### Gaps
- Current official processing rate for subscription charges in 2026: not confirmed.
- Whether Packages are still Plus/Premium-only after the Oct 2025 restructure: not confirmed.
- No sign of a dedicated "memberships" product for service businesses in 2025–2026.

---

## Q6. Square Messages, business phone number, calling, voicemail, AI receptionist / voice agent, missed-call text-back

### Takeaway
Square Messages is a two-way text and email inbox.
- **Messages Free ($0):** reply-only.
- **Messages Plus ($10/mo, per location per a community report):** adds outbound conversations and a **dedicated toll-free business number**. This standalone price predates Oct 2025.
- **Current plans:** each **paid (Plus/Premium) location gets a dedicated toll-free business number**. It handles **inbound texts, inbound calls to voicemail and missed-call notifications**, but has **no outbound calling** and reportedly **no call forwarding out**.

Square's only voice AI is **AI voice ordering**, which answers calls on the Square business number and is restaurant/pickup-focused, in beta, with an unpublished price. There is **no native AI receptionist for service booking** and no evidence of missed-call text-back. **Square Assistant** is a free, text-only appointment bot. **None of Messages, phone, voicemail, Assistant or voice ordering has a public API.**

### Cited Findings
**Square Messages pricing**
- Messages pricing page:
  - **Free $0/mo:** "reply to customer inquiries and manage transactions via text and email."
  - **Plus $10/mo:** "start new conversations and receive messages from a dedicated phone number." Plus also lists "Conversational AI" among its features.
  - The snapshot was about 449 days old (about Aug 2025).
  - Source: [Square Messages pricing](https://squareup.com/us/en/messages/pricing)
- A seller reported paying **$10 per location per month** for Messages Plus. — [Square Community: "Messages Plus" thread](https://community.squareup.com/t5/Payments-Troubleshooting/Anyone-else-annoyed-by-the-quot-Messages-Plus-quot-loss-of/m-p/681914)

**Dedicated business number**
- Each **paid location receives a dedicated toll-free business number**, subject to mandatory industry-wide (toll-free) verification. This came from a Square help-center extract; the exact article is uncertain, one of the two below. — [Square help 7985: Set up and manage Messages](https://squareup.com/help/us/en/article/7985-get-started-with-square-messages-plus); [Square help 8494](https://squareup.com/help/us/en/article/8494-set-up-and-manage-your-dedicated-business-number)
- The number receives **calls and voicemails**, sends and receives **texts and emails**, and handles **missed-call notifications**.
  - It needs an active Square subscription.
  - Claim it from Messages inbox → "Claim number." Verification status, the voicemail greeting and "Edit voicemail" are managed in the Dashboard or POS.
  - Cancelling during verification goes through support.
  - Source: [Square help 8494: Set up and manage your dedicated business number](https://squareup.com/help/us/en/article/8494-set-up-and-manage-your-dedicated-business-number)
- "Get a unique phone number for your business that customers can text or call to leave a voicemail. **This feature does not support outbound calling.**" This appears on the plans pricing page next to the $0 / $49 / $149 tiers. — [Square Online/plans pricing](https://squareup.com/us/en/online-store/plans)
- Community reports (about 13 months old) say there is **no way to forward calls** from the Square number to another line and **no in-app outbound calls**. — [Square Community: forward Square number](https://community.squareup.com/t5/Appointments-Bookings/Can-i-forward-the-Square-number-to-my-business-phone-number/td-p/798108); [Square Community: Messaging numbers for voice calls](https://community.squareup.com/t5/Appointments-Bookings/Square-Messaging-mobile-numbers-for-voice-calls-is-not-ideal/td-p/763168)

**Inbox features**
- **Do Not Disturb** sends a fixed, **non-customizable** auto-reply saying direct messaging is not active. — [Square Messages pricing](https://squareup.com/us/en/messages/pricing)
- There is no custom out-of-office or after-hours auto-reply (feature requests remain open). — [Square Community feature request](https://community.squareup.com/t5/Feature-Requests/Automated-custom-out-of-office-messages/idi-p/722635); [Square Community: Auto-reply](https://community.squareup.com/t5/Customer-Engagement/Square-Messages-Turn-off-or-Auto-reply/m-p/761478)
- There is no AI reply to general messages (open feature request "Respond to Square messages with AI"). — [Square Community feature request](https://community.squareup.com/t5/Feature-Requests/Respond-to-Square-messages-with-AI/idi-p/840457)
- Messaging customers is covered in [Square help 8415: Message your customers](https://squareup.com/help/us/en/article/8415-reply-to-customers-with-square-messages).

**Square Assistant**
- Automated SMS that lets clients **confirm, cancel or reschedule appointments 24/7**, syncing to the calendar. It is **free**, on by default, and available to Appointments Free/Plus/Premium and Messages Free/Plus users. It is **text-only and does not answer calls**. — [Square Assistant page](https://squareup.com/us/en/appointments/scheduling-features/square-assistant); [Square help 6731](https://squareup.com/help/us/en/article/6731-get-started-with-square-assistant-on-appointments); [Square Bottom Line: Introducing Square Assistant](https://squareup.com/us/en/the-bottom-line/reaching-customers/introducing-square-assistant)
- Turning Assistant off stops only its automated replies; reminders and confirmations continue (community). — [Square Community](https://community.squareup.com/t5/Appointments-Bookings/If-I-turn-Square-Assistant-off/m-p/774754)

**AI voice ordering and other voice AI**
- **AI voice ordering:**
  - "Square AI can answer calls to your Square business number and help you take customer orders." It "works only with your Square-provided business numbers." An existing line can **forward order calls to the Square number**.
  - Built for **food and beverage pickup**; "not set up for… reservations and booking" (Square product team reply).
  - Listed as **beta** on the pricing page, next to Premium; **no separate price was found**.
  - Square says it "answers 100% of incoming calls."
  - Sources: [Square help 8568: AI-powered voice ordering](https://squareup.com/help/us/en/article/8568-take-orders-with-ai-powered-voice-ordering); [Square Community: Voice AI Ordering feedback](https://community.squareup.com/t5/Feedback-Discussions/Voice-AI-Ordering-Initial-Setup-and-Feedback/m-p/830041); [Square press: Square Releases food & beverage](https://squareup.com/us/en/press/square-releases-food-beverage)
- No official Square AI receptionist for service or appointment calls was found. Third-party vendors say Square does not answer inbound calls with conversational AI. **Vendor claims, not verified:**
  - Voka (from $19/mo) — [Voka](https://vokaai.com/compare/best-ai-receptionist-for-square-appointments)
  - ReceptionAly (from $79/mo) — [ReceptionAly](https://receptionaly.com/blog/square-assistant-vs-ai-receptionist)
  - AgentZap ($109–$138/mo) — [AgentZap](https://agentzap.ai/blog/how-to-stop-missing-booking-calls-in-square-appointments-a-business-owners-guide-2026)
  - Others: [Smith.ai](https://smith.ai/integrates-with/square-appointments), [NextPhone](https://www.getnextphone.com/blog/square-nextphone-integration), [Relay](https://zhukauai.com/integrations/square), [Foreva.AI on Square App Marketplace](https://squareup.com/us/en/app-marketplace/app/foreva-ai)
- **Square AI** (a dashboard insights assistant, not customer-facing):
  - Open beta for US sellers from **June 2025**; owners and admins only. — [Square press: Square AI open beta](https://squareup.com/us/en/press/square-ai-open-beta); [PYMNTS](https://www.pymnts.com/artificial-intelligence-2/2025/square-adds-conversational-ai-assistant-to-business-technology-platform/)
  - Reportedly expanded to UK/CA/AU by March 2026 (third-party). — [Stork.ai](https://www.stork.ai/en/square)
- **Square Kiosk** (launched 2026-10-14; restaurant self-ordering with agentic AI voice): **$1,999** hardware and **$99/mo per device**, and it requires Plus or Premium. Not relevant to detailing. — [Fast Casual](https://www.fastcasual.com/news/square-launches-ai-voice-ordering-kiosk-for-restaurants/); [Unite.AI](https://www.unite.ai/square-launches-flagship-kiosk-with-agentic-ai-voice-ordering/)
- Square launched a **ChatGPT app and a Claude plugin** for eligible US food and beverage sellers using Square Online Ordering; no price was given. — [e-commerce.news](https://e-commerce.news/story/square-launches-chatgpt-app-claude-plugin-for-sellers)

**What the API exposes**
- The OpenAPI spec has **no endpoints or schemas for Messages, conversations, SMS sending, phone numbers, calls, voicemail, Square Assistant or voice ordering**. The only SMS-related API values are the Invoices delivery/request methods `SMS`, `SMS_CHARGE_CARD_ON_FILE` and `SMS_CHARGE_BANK_ON_FILE`, and the spec says those **cannot be set through the Invoices API**. — [Square OpenAPI spec](https://github.com/square/connect-api-specification/blob/master/api.json)

### Inferences
- Square's "business phone number" is a toll-free, inbound-only text and voicemail line inside the Square inbox. It is not a full phone system: no outbound calls, no forwarding out, no IVR, no AI receptionist for bookings, and no text-back of missed calls. It also cannot be driven from a custom app.
- A replacement dispatch app needs its own telephony (for example Twilio or Telnyx) for texting, calling, voicemail, missed-call text-back and any AI receptionist. Square cannot supply these over an API.
- A detailer moving customers onto their own number should note that the Square toll-free number cannot be forwarded out (community-reported), so customers would need to be told about the new number.

### Gaps
- Not confirmed whether **Messages Plus ($10)** can still be bought on its own after Oct 2025, or whether it was folded fully into Plus/Premium. Sources conflict.
- Not confirmed what "Conversational AI" on the Messages Plus tier does.
- Not confirmed: the voice-ordering price and plan requirement, whether voicemail transcription exists, and whether a **local** (non-toll-free) number is offered.
- No official Square page found for "missed-call text-back."

---

## Q7. Customer feedback and reviews: post-purchase feedback, Google review requests, review management

### Takeaway
- **Private feedback via digital receipts** (smiley or sad face, a reason and a note) is built in and exportable to CSV. It stays private in Square.
- The **"Collect Google reviews"** automation sends review requests by email or text to customers who become regulars or leave positive feedback. It needs Marketing, which now means Plus/Premium, and a connected Google Business Profile.
- Square **cannot publish reviews to Google** and offers no way to manage or reply to reviews.
- **No public API** exists for feedback or review requests.

### Cited Findings
- **Receipt feedback** is turned on in the Dashboard; customers leave it from digital receipts. Feedback is **confidential and not public** and can be **exported as CSV**. — [Square help 5241: Set up customer feedback collection](https://squareup.com/help/us/en/article/5241-get-started-with-square-feedback)
- The format is a smiley or sad face, a reason and a private note (community descriptions). Sellers have asked for years for feedback to be shareable publicly; Square passes the request on without a timeline. — [Square Community](https://community.squareup.com/t5/Archived-Discussions-Read-Only/How-can-I-make-my-customer-feedback-public/m-p/279348)
- **Google reviews automation:**
  - Dashboard path: Customers → Marketing → Google reviews. Sign in to Google Business Profile and launch the campaign.
  - Triggers: when a customer **becomes a "regular" (3 purchases in the past year)** or **leaves positive feedback**.
  - A **Google Reviews stats page** shows new reviews from the past 4 weeks and how the automation is performing.
  - Written for Square Marketing subscribers.
  - Source: [Square help 8418: Collect Google reviews](https://squareup.com/help/us/en/article/8418-collect-google-reviews)
- Users report the automation is greyed out without a Marketing subscription, and that the trigger cannot be set to "after first checkout." — [Square Community: automation greyed out](https://community.squareup.com/t5/Payments-Troubleshooting/Google-review-automation-grey-ed-out-on-Square/m-p/777833); [Square Community](https://community.squareup.com/t5/Customer-Engagement/Is-anyone-using-square-marketing-to-help-gain-google-reviews/m-p/765500)
- Square **cannot publish or transfer Square-collected reviews to Google**. — [Square Community](https://community.squareup.com/t5/Customer-Engagement/Can-Square-reviews-be-published-to-our-Google-profile/m-p/825905)
- **Workaround:** put a Google review URL or QR code into the **receipt image** (Receipts settings). — [Square Community](https://community.squareup.com/t5/Payments-Troubleshooting/Can-a-Google-Review-QR-code-be-printed-on-a-checkout-receipt/td-p/675386)
- There are no native post-appointment reviews of individual service providers; sellers use Zapier and similar tools. — [Square Community](https://community.squareup.com/t5/Beauty-Wellness/Post-Appointment-Reviews-of-Service-Providers/m-p/833140)
- **API:** no feedback or review endpoints. `FEEDBACK` appears only as a Customer `creation_source` value. — [Square OpenAPI spec](https://github.com/square/connect-api-specification/blob/master/api.json)

### Inferences
- A replacement app should build its own post-job feedback request (for example a text after the job is marked complete), with a rating gate that sends happy customers to the Google review link. That is more flexible than Square's "3 purchases or positive feedback" trigger, which suits a detailing business poorly because visits are infrequent.

### Gaps
- Not confirmed whether sellers can reply to receipt feedback or attach a coupon to a reply in 2026 (an older Square Feedback capability).
- No Square Google-review *management* (reading or replying to reviews) was found.

---

## Q8. Consumer-facing: Square Go app, Square Online customer accounts, digital receipts, Cash App integrations, referral programs

### Takeaway
Square's customer-facing pieces are:
- **Square Go**, a free consumer booking app launched Aug 2023 for Appointments beauty and personal-care sellers. Its 2026 status was not confirmed.
- **Square Online customer accounts**: order history, reorder, saved details.
- **Hosted pages**: eGift order and reload, check balance, and the digital receipt carrying feedback and a review link.
- **Cash App Neighborhoods**: follow, Local Cash, in-app marketing.

**There is no native customer-referral program.** Square's referral program is seller-to-seller only. None of these consumer surfaces has a public API, apart from the data underneath them (customers, gift cards, loyalty).

### Cited Findings
- **Square Go:**
  - Launched in **Aug 2023** for US iOS. Consumers find nearby businesses by location, service and availability, book, and confirm/reschedule/cancel. Bookings sync into Square Appointments.
  - **Free for consumers and businesses.** Limited to Appointments **beauty and personal care** sellers at launch.
  - Square-reported results: 23% higher rebook rates and 55% fewer no-shows.
  - Promised later: waitlists and in-app payment.
  - Sources: [Square press: Square Go](https://squareup.com/us/en/press/square-go); [Square Go page](https://squareup.com/us/en/appointments/square-go); [The Paypers](https://thepaypers.com/payments/news/square-launches-square-go-consumer-booking-app)
- **Square Online customer accounts:**
  - Enable via Channels → Square Online → Website settings → Customer accounts.
  - Buyers can view order history (from when the account was created), view order confirmations and reorder.
  - Saved addresses and payment info are hidden if the feature is disabled; accounts are kept.
  - Available in the US (an older community post says not in the UK).
  - Sources: [Square help 7802: Customer accounts for your website](https://squareup.com/help/us/en/article/7802-customer-accounts-for-square-online); [Square Community product update](https://community.squareup.com/t5/Product-Updates-Feedback-read/New-Customer-accounts-for-Square-Online/ba-p/381006); [Square Buyer Account Terms](https://squareup.com/us/en/legal/general/buyer-account-terms)
- **Digital receipts** carry the feedback prompt (Q7). A receipt image can carry a Google review QR code or link. — [Square help 5241](https://squareup.com/help/us/en/article/5241-get-started-with-square-feedback); [Square Community](https://community.squareup.com/t5/Questions-How-To/Is-there-a-way-to-add-link-of-Google-reviews-to-re/td-p/83153)
- **Cash App:**
  - **Neighborhoods** (Oct 2025–): map, follow, Local Cash 10% up to $10, $5 first-purchase bonus, in-app marketing to followers. — [Square press: Neighborhoods](https://squareup.com/us/en/press/neighborhoods-by-cash-app)
  - A Square restaurant-ordering network inside Cash App (food and beverage). — [Restaurant Business](https://www.restaurantbusinessonline.com/technology/square-launches-restaurant-ordering-network-cash-app); [Payments Dive](https://www.paymentsdive.com/news/why-cash-app-wants-food-orders-square-merchants-dining/825040/)
- **Referral program:** Square's program is for **sellers referring other sellers**. Rewards are free processing on up to $1,000 in sales for 180 days, or $20 off a Square Reader, via Account & settings → Get free processing. — [Square help 5209](https://squareup.com/help/us/en/article/5209-square-s-referral-program)
- There is **no native customer-to-customer referral program**; sellers use third-party tools. — [Square Community](https://community.squareup.com/t5/Online-Store/How-do-you-offer-referral-incentive-to-customers/m-p/787779); [loop.fans](https://loop.fans/blog/square-loyalty-program-review)

### Inferences
- A custom dispatch app has to supply its own customer portal (job history, rebooking, saved cards via the Cards API, loyalty balance via the Loyalty API, gift card balance via the Gift Cards API) and its own referral logic. Square's consumer surfaces are Square-hosted and not embeddable or controllable through the API.
- Square Go and Neighborhoods are discovery channels that only work while the business keeps transacting through Square.

### Gaps
- Square Go's 2026 status (still live, expanded beyond beauty, or retired) was not confirmed. No 2025–2026 source was found.
- Not confirmed: whether customers can see a loyalty balance or "customer status page" link on receipts, and whether Square offers a branded consumer app for sellers.

---

## Q9. Master inventory: each feature, free or paid, and API exposure (for the coding agent)

### Takeaway
Square's **data primitives** have public APIs: customers, groups (CRUD), segments (read), custom attributes, cards on file, loyalty, gift cards, subscriptions and webhooks. Square's **communication and engagement channels are dashboard-only with no API**: Marketing email/SMS, Messages inbox, business phone number, voicemail, AI voice ordering, Square Assistant, receipt feedback, Google review automation, Square Go and Neighborhoods. A replacement app can keep Square as the system of record for customers, loyalty, gift cards and subscriptions, but it has to run all customer communications itself.

### Cited Findings
Unless marked otherwise, price sources are those cited in Q1–Q8. API evidence is the [Square OpenAPI spec, Square-Version 2026-09-16](https://github.com/square/connect-api-specification/blob/master/api.json).

| # | Feature | Free / paid (US) | Public API |
|---|---|---|---|
| 1 | Customer profiles (name, email, phone, address, birthday, company, nickname, reference_id) | Free (all plans) | **Customers API** (CRUD, bulk, search) |
| 2 | Customer note | Free | Customers API (`note`, a single string) |
| 3 | Custom fields (text, toggle, address, date) | Free | **Customer Custom Attributes API** (definitions plus values, bulk upsert, filters in search) |
| 4 | Manual customer groups | Free | **Customer Groups API** (CRUD) plus Customers add/remove group |
| 5 | Smart groups / segments (Regulars, Lapsed, custom filters) | Free | **Customer Segments API — read-only** (create or define in Dashboard only) |
| 6 | Cards on file | Free to store; card-on-file payment rate reported at 3.5% + 15¢ | **Cards API** (create, list, retrieve, disable); old Customers card endpoints deprecated |
| 7 | Purchase / visit history | Free | Not a customer field; compute from Orders/Payments APIs by customer_id (other researchers) |
| 8 | Import CSV / export | Free | Dashboard only (API alternative: BulkCreateCustomers) |
| 9 | Merge duplicates / duplicate suggestions | Free | **No API** (results visible as creation_source MERGE plus webhooks) |
| 10 | Email marketing opt-out | Free field | Customers API `preferences.email_unsubscribed` only |
| 11 | SMS marketing opt-in/consent | Part of Marketing | **No API** |
| 12 | Customer change notifications | — | Webhooks customer.*, customer.custom_attribute*, card.* |
| 13 | Email campaigns (one-off) | Plus $49/loc/mo or Premium $149: unlimited sends. Legacy standalone from $15/mo (≤500 contacts) | **No API** |
| 14 | Text (SMS/MMS) campaigns | Plus: 500/mo per account then 3¢; Premium: 2,500 then 1.5¢; MMS = 3 texts. Legacy: $10/mo plus usage | **No API** |
| 15 | Automations: welcome, birthday, lapsed/win-back, abandoned cart | In Marketing (Plus/Premium) | **No API** |
| 16 | AI content generation in email builder ("Generate content") | In Marketing | **No API** |
| 17 | Marketing coupons (email/SMS, redemption tracking); Square Online coupons in campaigns (online-only) | In Marketing | No campaign API; payment links have `enable_coupon` |
| 18 | Facebook page posting and Facebook/Instagram ads (via Square Online/Meta) | Marketing / Online (older docs) | **No API** |
| 19 | Google review request automation and stats | In Marketing (needs Google Business Profile) | **No API** |
| 20 | Receipt feedback (private, CSV export) | Free (receipts) | **No API** (only creation_source FEEDBACK) |
| 21 | Square Loyalty program (visit / spend / item / category; reward tiers; expiry; terminology) | Included in Plus/Premium; not in Free; legacy standalone tiered by visits (US from about $45/loc/mo, third-party) | **Loyalty API**: retrieve program only (create or edit in Dashboard) |
| 22 | Loyalty accounts, points, rewards, redemptions, events | Plus/Premium | **Loyalty API** (full) plus loyalty.* webhooks |
| 23 | Loyalty promotions (multiplier or bonus points; AI templates in Dashboard) | Plus/Premium | **Loyalty API** promotions (create, list, retrieve, cancel); AI templates Dashboard-only |
| 24 | Loyalty at API checkout | — | Payment links `enable_loyalty` |
| 25 | Neighborhoods (Cash App follow, Local Cash 10% up to $10, $5 bonus, in-app marketing) | Free to sellers while Cash App funds (initial about 12 months); reported 1% fee on Cash App user orders | **No API** |
| 26 | eGift cards and hosted eGift order/reload page | Free setup; up to 2.5% load fee (waived on Premium); 2.9% + 30¢ online processing | **Gift Cards API** plus **Gift Card Activities API** (hosted page itself: no API) |
| 27 | Physical gift cards | About $0.50–$1.50 per card (conflicting extracts) plus 2.5% load fee | Gift Cards API (PHYSICAL; custom GANs via gan_source OTHER) |
| 28 | Gift card balance check page | Free | Hosted page: no API; balances via RetrieveGiftCardFromGAN |
| 29 | Gift card promo / discount codes on eGift purchase or reload | Free feature | No API for the promo; activities via API |
| 30 | Square Subscriptions (item subscription plans) | No monthly fee; processing applies | **Subscriptions API** plus Catalog (SUBSCRIPTION_PLAN / _VARIATION); payment links `subscription_plan_id`; subscription.* and invoice.* webhooks |
| 31 | Appointments Packages (prepaid service bundles) | Plus/Premium (community) | **No API** |
| 32 | Messages inbox (two-way text and email) | Free tier: reply-only. Messages Plus $10/mo per location (pre-Oct-2025); now bundled with paid plans | **No API** |
| 33 | Dedicated toll-free business number (inbound texts, inbound calls to voicemail, missed-call notifications; no outbound calls) | Paid plan locations (toll-free verification required) | **No API** |
| 34 | Do Not Disturb auto-reply (fixed text) | Messages | **No API** |
| 35 | Square Assistant (SMS confirm / cancel / reschedule bot) | Free | **No API** |
| 36 | AI voice ordering (answers calls on the Square number; F&B pickup) | Beta; price not published | **No API** |
| 37 | AI receptionist for service bookings / missed-call text-back | **Not offered by Square** (third-party apps $19–$138/mo, vendor claims) | n/a |
| 38 | Square AI (dashboard insights assistant) | Beta (June 2025 onward) | **No API** |
| 39 | Square Go consumer booking app | Free (beauty/personal care, US, 2023) | **No API** (bookings flow into the Bookings API) |
| 40 | Square Online customer accounts | Included with Square Online | **No API** for accounts (customers sync to Directory) |
| 41 | Seller-to-seller referral program | Free processing on up to $1,000 for 180 days, or $20 off a Reader | n/a |
| 42 | Customer referral program | **Not offered natively** | n/a |

**Retired or renamed items**
- Oct 2025: 18 à la carte subscriptions replaced by Free / Plus / Premium. Standalone **Marketing**, **Loyalty**, **Messages Plus** and Appointments/Online paid tiers became legacy. Legacy subscribers migrate one-way. — [Square press release](https://squareup.com/us/en/press/unified-pricing-and-packaging); [Square help 8569: Switch to the new Square subscription plans](https://squareup.com/help/us/en/article/8569-switch-to-the-new-square-subscription-plans); [Square help 8657](https://squareup.com/help/us/en/article/8657-migrate-from-square-online-to-the-new-square-plans)
- **API deprecations:**
  - `ListLoyaltyPrograms` → use `RetrieveLoyaltyProgram`
  - `CreateCustomerCard` / `DeleteCustomerCard` → use the Cards API
  - `CreateCheckout` → use payment links
  - Source: [Square OpenAPI spec](https://github.com/square/connect-api-specification/blob/master/api.json)

### Inferences
- **Build plan the evidence supports:**
  1. Use Square as the backend for **customers, custom attributes, groups, cards on file, loyalty, gift cards and subscriptions** (all CRUD over the API with webhooks).
  2. Build **marketing (email/SMS), two-way messaging, the business phone number, voicemail, AI receptionist, missed-call text-back, feedback and review requests, referrals, and the customer portal** inside the custom app with your own providers. Square has no API for any of these.
  3. Copy computed segments into the custom app, because Smart Groups cannot be created through the API.
- If the custom app replaces all of the communication features, the main reason left to pay for **Square Plus ($49/location/mo)** is **Loyalty, which the API requires to have a program set up**. Loyalty has no standalone purchase for new sellers (inferred from the bundling; not confirmed). The gift card load-fee waiver needs Premium ($149).

### Gaps
- None of the Square marketing or pricing pages could be read in full this session (network block). A human should check the live pages before committing to these numbers:
  - [squareup.com/us/en/pricing](https://squareup.com/us/en/pricing)
  - [/software/marketing/pricing](https://squareup.com/us/en/software/marketing/pricing)
  - [/messages/pricing](https://squareup.com/us/en/messages/pricing)
  - [/gift-cards/pricing](https://squareup.com/us/en/gift-cards/pricing)
- OAuth scopes needed per API (CUSTOMERS_READ/WRITE, LOYALTY_*, GIFTCARDS_*, SUBSCRIPTIONS_*) were not catalogued here. They are listed in the same spec file.
