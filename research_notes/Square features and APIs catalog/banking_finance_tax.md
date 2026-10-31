# Square Banking, Financing, Bookkeeping/Accounting and Tax Features: US, as of late 2026 (researched 2026-10-31)

> **Method and reliability note (read first).** In this session, direct page fetches of squareup.com, developer.squareup.com, block.xyz, businesswire.com and ffnews.com were **blocked by the network policy** (proxy 403). Every "official Square" fact below therefore comes from **search-engine extracts of official Square pages** (help center, press releases, product pages, developer docs), plus third-party reviews where marked. I could not read full fee disclosures or fine print myself. Treat exact numbers as "reported on the cited page as indexed", and re-verify any number before building pricing logic on it. To re-verify, allow `squareup.com` and `developer.squareup.com` in the session's network settings.
> This is product research, not tax advice.

---

## 1. Square Checking and Square Debit Card (fees, FDIC, instant access, ATM, deposits, transfers)

### Takeaway
Square Checking is a free business checking account with no monthly, minimum-balance or overdraft fees. Card sales processed by Square land in it instantly. Square says it is now included with every Square account. It is provided by **Sutton Bank** (Member FDIC), with up to $250,000 of pass-through FDIC coverage. It comes with up to 5 free Square Debit Cards (Mastercard) and no Square ATM fee. It does **not** support wires, and sources disagree on cash and check deposits. **No public API exposes Checking balances, transactions or debit cards.**

### Cited Findings
**Account and fees**
- No recurring fees: "no minimum balance fees, no services fees, no monthly maintenance fees, no overdraft fees." — [Square Business Banking](https://squareup.com/us/en/banking); [Square Checking page](https://squareup.com/us/en/banking/checking)
- Every new Square account comes with a free business checking account and debit card, and sales are available instantly. The page was roughly 659 days old when indexed, so this dates from about early 2025. — [Every Square Account Now Includes Square Checking (The Bottom Line)](https://squareup.com/us/en/the-bottom-line/inside-square/square-checking-account)
- Funds from Square payment processing are "generally available in the Square Checking account balance immediately after a payment is processed." Instant availability does **not** apply to funds added by ACH transfer. — [Square Business Banking](https://squareup.com/us/en/banking); [Manage checking account transfers (help 7604)](https://squareup.com/help/us/en/article/7604-square-checking-transfers)
- April 2025 press release: new tools give sellers "instant access to their cash flow". Sellers get round-the-clock account access and **free instant transfers to Square Checking**. Sellers spent $3.6B via Square Checking debit cards in 2024, up 29% from 2023. — [Square Expands Banking Services (press, Apr 2025)](https://squareup.com/us/en/press/square-expands-banking-services); [Nasdaq copy](https://www.nasdaq.com/press-release/square-expands-banking-services-give-sellers-better-control-their-cash-flow-2025-04)
- **FDIC:** "Up to $250,000 of your balance may be covered by FDIC insurance on a pass-through basis through Sutton Bank, Member FDIC", subject to aggregation and conditions. — [Square Business Banking](https://squareup.com/us/en/banking). Sutton Bank's own support page calls Square Checking a "Square Merchant product" that can't be applied for through Sutton and routes questions to Square support. — [Sutton Bank prepaid card support](https://www.suttonbank.com/services-tools/tools/prepaid-card-support.html)
- **Conflict:** one third-party review describes Square Checking as held at Square Financial Services. Square's own pages name Sutton Bank for Checking. — [Aspire review](https://aspireapp.com/en-us/blog/square-checking-account-review) vs. [Square Business Banking](https://squareup.com/us/en/banking)
- Block SEC filings describe Square Checking as "provided by our bank partner" and eligible for FDIC insurance if conditions are met. The 2021 launch release named Sutton Bank. — [Block 10-K FY2024](https://www.sec.gov/Archives/edgar/data/1512673/000162828025007376/sq-20241231.htm); [Introducing Square Banking (2021 press)](https://squareup.com/us/en/press/introducing-square-banking)
- Square Checking does **not** support wire transfers. — reported in search extracts of [help 7604](https://squareup.com/help/us/en/article/7604-square-checking-transfers) and [Relay review](https://relayfi.com/blog/square-checking-review/) (third-party)

**Square Debit Card (physical and virtual)**
- The card is a Mastercard debit card that works at any ATM accepting Mastercard debit. "Square does not charge ATM fees, but third-party ATM operator fees may apply." — [Square Business Banking](https://squareup.com/us/en/banking); [Business Debit Card page](https://squareup.com/us/en/banking/business-debit-card)
- **ATM withdrawal limits** (vary by account): $500–$3,000 per transaction; $1,000–$3,000 per day; $1,000–$7,000 per week; $2,000–$10,000 per month. — Square Support Center extract via [Business Debit Card page](https://squareup.com/us/en/banking/business-debit-card) / [Finder](https://www.finder.com/business-banking/square-business-debit-card)
- **Spend limits:** maximum $10,000 per transaction, $25,000 per day, $50,000 per week, $150,000 per month. New accounts can start as low as $500 per transaction. Limits are shared across all cards on the account. — [Get Started with Square Debit Card (help 6589)](https://square.com/help/us/en/article/6589-get-started-with-square-card)
- **Up to 5 debit cards** per Checking account at no additional cost, for the owner or up to four other people. Only the owner can lock or cancel cards, view transactions or dispute. — [help 6589](https://square.com/help/us/en/article/6589-get-started-with-square-card)
- **Receipt capture and notes:** text a receipt photo, which is auto-matched to the card transaction. Receipts and notes are included in the transaction-history export, and a ZIP of receipt images can be downloaded (limit 366 days or 500 receipts). — [Capture receipts and add notes (help 8658)](https://squareup.com/help/us/en/article/8658-capture-receipts-and-add-notes-to-square-debit-card-transactions); [View your Square Checking activity (help 6822)](https://squareup.com/help/us/en/article/6822-view-your-square-card-activity)
- A virtual card exists alongside the physical card. Square's Debit Card page and help 6589 describe ordering and managing cards. I could not read the virtual-card details directly. — [Business Debit Card page](https://squareup.com/us/en/banking/business-debit-card)

**Deposits (conflicting)**
- **Cash deposits:** one review says "No-fee cash deposits available through participating retailers". Others say "There's no way to deposit cash into a Square Checking account." — [Finder](https://www.finder.com/business-banking/square-business-debit-card) vs. [Relay](https://relayfi.com/blog/square-checking-review/) / [Merchant Maverick](https://www.merchantmaverick.com/reviews/square-card-review/)
- **Check deposits:** one source lists "digital checks, mobile check deposits". Another says "you cannot deposit cash or checks". — [Aspire](https://aspireapp.com/en-us/blog/square-checking-account-review) vs. [TechRepublic](https://www.techrepublic.com/article/square-checking-account-review/)

**Transfers out of Square (payout layer; cross-reference to payments research)**
- Standard next-business-day transfers to an external bank are **free**. — [Transfer options with Square (help 3807)](https://square.com/help/us/en/article/3807-deposit-options-with-square)
- **Instant or same-day transfer fee, conflicting:** 1.75% per transfer, on top of processing fees, per [Instant Transfers page](https://square.com/us/en/payments/instant-transfers) and [help 5405](https://square.com/help/us/en/article/5405-set-up-and-manage-instant-deposits). **1.95%** per transfer per [Square help 5440](https://squareup.com/help/us/en/article/5440) and a third-party guide checked May 5, 2026 ([Swipesum](https://swipesum.com/insights/square-fees-explained-understanding-your-payment-costs)). Separately, a May 2026 review lists 1.5% with a $0.25 minimum and $15 cap, unconfirmed ([Merchant Maverick](https://www.merchantmaverick.com/square-instant-deposit-work/)).
- Instant transfer minimum balance is $25; same-day minimum is $1. Single instant transfer maximum is $10,000. Same-day transfers send at end of business day. — [help 5405](https://square.com/help/us/en/article/5405-set-up-and-manage-instant-deposits)
- Moving funds from Square Checking to an external bank instantly is reported at **1.95%** per transfer. — [Square Banking page extract](https://squareup.com/us/en/banking); [help 7604](https://squareup.com/help/us/en/article/7604-square-checking-transfers)
- 2026 feature log (March–April 2026): a top navigation menu was added to the Square Banking section, and the Balance page now shows estimated arrival timing for transferred funds. — [Square Feature Log](https://www.squareup.com/us/en/feature-log)

### Inferences
- For Sheen's app, Square Checking is a destination account, not something to integrate. No public Square API returns Checking balances, debit card transactions or receipt captures (see section 11). Reconciliation would have to work from Payouts API data or the seller's CSV and statement exports.
- The 1.75% vs. 1.95% conflict suggests Square raised the instant-transfer fee from 1.75% to 1.95% sometime in 2025–2026 and some pages lag. A replacement app should not hard-code either number.
- "Instant access" applies only to Square-processed sales into Square Checking, not to ACH-added funds.

### Gaps
- Debit-card **cash back** or rewards: no source found. No evidence of a cash-back program on Square Debit Card in 2026.
- Whether Checking now pays any interest: no source found (likely none).
- Current status of cash and check deposit could not be resolved because the help center was unreadable.
- Exact virtual-card features, and whether team cards can have per-card limits, were not confirmed.
- Monthly statement availability and format for Square Checking was not confirmed. Exports of transaction history are confirmed via help 8658.

---

## 2. Square Savings (APY, folders, automatic set-aside, sales-tax folder, 2025–2026 changes)

### Takeaway
Square Savings is issued by **Square Financial Services** (Block's Utah industrial bank), with no monthly fees or minimums. It pays a **1.00% APY base**. Since a June 11, 2026 press release, it pays **3.50% APY when the total savings balance across all folders is at least $10,000** (APY as of 6/8/2026). Older Square pages still show a **4.25%** tier, which conflicts. Eligible deposits get FDIC coverage up to **$2.5M** via a multi-bank sweep. Folders can auto-sweep up to **75% of card sales**, and an **Automated Sales Tax folder** sets aside the tax collected on each card sale. **No public API.**

### Cited Findings
- **APY tiers:** base "1.00% based on your total savings balance". "You may qualify for an increased APY of 3.50% if your total savings balance (inclusive of all folders and accrued unpaid interest) is at least $10,000." Announced in a press release dated June 11, 2026, with APY current as of 6/8/2026. — [Business Wire: SFS Introduces 3.50% APY High Yield Savings (2026-06-11)](https://www.businesswire.com/news/home/20260611611379/en/Square-Financial-Services-Introduces-3.50-APY-High-Yield-Savings-for-Square-Sellers-More-Than-8-Times-the-National-Average); [Block newsroom copy](https://block.xyz/inside/square-financial-services-introduces-3-50-apy-high-yield-savings-for-square-sellers-more-than-8-times-the-national-average); [Square Savings page](https://squareup.com/us/en/banking/savings); [Finextra](https://www.finextra.com/pressarticle/110125/square-offers-sellers-35-savings-rate)
- **Conflict:** Square's older help article and banking page cite "an increased APY of 4.25%" at the same $10,000 threshold. — [Manage your savings account (help 7418)](https://squareup.com/help/us/en/article/7418-square-savings-faq); [Square Business Banking](https://squareup.com/us/en/banking). A July 2026 Finder review matches 1.00% and 3.50%. — [Finder Square Savings review](https://www.finder.com/business-banking/square-savings-account)
- The August 11, 2026 credit-card press release says Square Savings "now earns up to 3.50% APY". — [Square press: Credit Card Levels Up (2026-08-11)](https://squareup.com/us/en/press/square-credit-card-bill-pay-refresh)
- **Issuer and FDIC:** Square Savings is held at Square Financial Services, Inc., a Utah-chartered industrial bank and independently governed Block subsidiary. Deposits are spread across multiple FDIC-insured partner banks, giving eligible deposits FDIC coverage up to $2.5 million. Pending balances are not FDIC-insured. — [Square Savings page](https://squareup.com/us/en/banking/savings); [Block 10-K FY2024](https://www.sec.gov/Archives/edgar/data/1512673/000162828025007376/sq-20241231.htm) ("FDIC-insured, interest earning business savings account at Square Financial Services, with no monthly fees or minimums")
- **Folders and automation:** sellers choose the % of card sales that moves into each folder, up to **75% of card sales** in total across folders. — [Manage your savings account (help 7418)](https://squareup.com/help/us/en/article/7418-square-savings-faq); [Set up a savings account (help 7605)](https://squareup.com/help/us/en/article/7605-get-started-with-square-savings)
- **Automated Sales Tax folder:** "of each card sale you set is always set aside automatically based on the tax rate applied at the point of sale". "Sales tax rates are pulled directly from your existing Square tax settings." — [Square Release Notes (June 18; year not shown on the indexed page)](https://squareup.com/us/en/release-notes/release-notes-june-18th); also described on [Square Business Banking](https://squareup.com/us/en/banking)
- Square's tax-season article markets a tax folder for "quarterly, payroll, and income taxes" by automatically setting aside a percentage of card sales. — [Tax Season, Simplified (The Bottom Line)](https://squareup.com/us/en/the-bottom-line/inside-square/prepare-for-tax-season-with-square)
- April 2025: Savings added "personalized savings recommendations, informed by cash flow data and industry insights" to sort funds into folders for taxes and supplies. — [Square Expands Banking Services (Apr 2025)](https://squareup.com/us/en/press/square-expands-banking-services)

### Inferences
- **Oregon note:** Oregon has no state sales tax (per the requester's brief). For Sheen, the Automated Sales Tax folder would sweep $0 unless a tax rate is configured. The **percentage-of-sales tax folder** is the relevant feature, for estimated federal income and self-employment tax, Oregon personal income tax, and local taxes. A replacement app can mimic it with a "reserve X% of each payment" ledger, but it cannot move money into Square Savings (no API).
- The 4.25% to 3.50% discrepancy most likely reflects an earlier, higher-rate tier that was cut. The June 2026 release is the newest primary source, so treat **3.50%** as current.

### Gaps
- The exact date the 4.25% tier ended could not be confirmed.
- The maximum number of folders, withdrawal limits and transfer timing between Savings and Checking were not found.
- Whether the Sales Tax folder is generally available or still rolling out is unclear. One extract called it "coming soon" and another describes it as live.

---

## 3. Square Credit Card (business credit card)

### Takeaway
The Square Credit Card exists. It is a business charge-and-revolve card on the **American Express** network, **issued by Celtic Bank**. It is invite-only and offered to eligible sellers in the Dashboard. It has no annual, late or foreign-transaction fees. The August 11, 2026 refresh pays **3% unlimited cash back on Square Bill Pay** and **1.5% on everything else**, redeemable to Savings, statement credit or free processing. The APR is individualized, with a 2023 range of 13.9%–26.9% that may be outdated. **No public API.**

### Cited Findings
- Aug 11, 2026 refresh: "unlimited 3% cash back on Square Bill Pay transactions and 1.5% on other purchases". Rewards are redeemable as a Square Savings deposit, a statement credit or free processing. Card can fund Bill Pay vendor payments "even when the vendor doesn't accept cards". Since expanding eligibility at the end of 2025, active card users have doubled. — [Square press: Credit Card Levels Up (2026-08-11)](https://squareup.com/us/en/press/square-credit-card-bill-pay-refresh); [Yahoo Finance copy](https://finance.yahoo.com/small-business/articles/square-credit-card-levels-rewards-130000275.html); [PYMNTS](https://www.pymnts.com/?p=4065319); [eMarketer](https://www.emarketer.com/content/square-sweetens-smb-credit-card--bill-pay-capture-larger-ticket-sizes)
- Square says the 3% "always covers the Bill Pay fee". Cardrates notes the 3% only nominally exceeds a 2.9% fee. — [Cardrates](https://www.cardrates.com/news/square-credit-card-adds-3-cash-back-but-theres-a-catch/)
- **Fees:** "no late fees, annual fees, foreign transaction fees, or any other fees". The card is invite-only for eligible sellers and usable anywhere Amex is accepted. — [Apply for and manage a Square Credit Card (help 7471)](https://squareup.com/help/us/en/article/7471-square-credit-card-faqs); [Square Credit Card page](https://squareup.com/us/en/banking/credit-card)
- **Issuer:** "Square Credit Cards are issued by Celtic Bank pursuant to a license from American Express." — [Square Credit Card page](https://squareup.com/us/en/banking/credit-card)
- **Terms:** credit limit, interest rate and terms are set from Square sales volume, account history and status. The offer is shown in Dashboard under Banking > Credit Card. Limit increases are invite-only and can't be requested. Individual transactions are capped at $25,000. — [help 7471](https://squareup.com/help/us/en/article/7471-square-credit-card-faqs); [Manage credit limit offers (help 8662)](https://squareup.com/help/us/en/article/8662-manage-credit-limit-offers-with-square-credit-card)
- **APR:** a Square spokesperson in 2023 gave a range of 13.9%–26.9%, which may be outdated. — via [search extract of Banking Dive / Payments Dive coverage](https://www.bankingdive.com/news/square-beta-testing-credit-card-block-amex-payments-pos-smb-capital/654208/)
- **History:** beta launched June 2023 with "$1 in free processing for every $3 spent" on the Amex network. — [Business Wire 2023-06-28](https://www.businesswire.com/news/home/20230628384131/en/Square-Unveils-Square-Credit-Card-and-New-Cash-Flow-Management-Products-in-Beta-as-Banking-Adoption-Grows); [Yahoo/American Banker](https://finance.yahoo.com/news/square-rounds-banking-services-rewards-130000966.html)

### Inferences
- Rewards changed from "free processing per $3" (2023) to 3%/1.5% cash back (Aug 2026). Older reviews ([BestCards](https://www.bestcards.com/credit-cards/square-credit-card/)) may show stale terms.
- The card is not relevant to API integration. It is a spend product only.

### Gaps
- The current cardholder agreement, 2026 APR range and grace period were not readable.

---

## 4. Square Loans (formerly Square Capital) and other financing

### Takeaway
Square Loans are **invitation-only** loans made by Square Financial Services (formerly branded Square Capital). They range from **$100 to $500K**. Each carries a **single fixed fee** with no interest, and is repaid as a **fixed % of daily card sales**. A minimum of **1/18 of the original amount every 60 days** applies, with full repayment within **18 months**. There is no credit check. 2026 changes include ML-based expanded eligibility, availability in all 50 states, a smaller "Cash Flow Boost" offer, and CBD sellers being excluded. **No public API.**

### Cited Findings
- Invitation-only, based on processing volume, account history and payment frequency. No minimum credit score is disclosed and there is no credit check. — [NerdWallet](https://www.nerdwallet.com/business/loans/reviews/square-capital); [Merchant Maverick](https://www.merchantmaverick.com/understanding-square-capital-loan-offer/)
- Amounts: "$100–$500K, depending on your business performance" (Square figure as reported). One review says a $250K cap, which conflicts. — [SMB Compass 2026](https://www.smbcompass.com/square-loans-review/); [United Capital Source](https://www.unitedcapitalsource.com/business-loans/lender-reviews/square-capital-review/)
- **Fee:** one fixed fee, generally 10%–16% of principal (third-party), or a multiple of 1.1–1.16. — [Merchant Maverick](https://www.merchantmaverick.com/understanding-square-capital-loan-offer/); [Lilach Bullock](https://www.lilachbullock.com/square-loans/)
- **Repayment:** a fixed % of daily card sales, typically 9%–13% (third-party). A minimum of 1/18 of the original loan is due every 60 days, with full repayment within 18 months. If sales fall short, the linked bank account may be debited and the repayment rate may increase. — [Resolve](https://resolvepay.com/blog/square-loans-reviews); [Merchant Maverick](https://www.merchantmaverick.com/understanding-square-capital-loan-offer/). Finder reports "60%–80%" offers, which is likely an error.
- **Collateral and guarantee (conflicting):** no collateral up to $100K, a UCC filing possible above $100K, and a personal guarantee above $250K. Another review puts the lien threshold at $75K. — [SMB Compass](https://www.smbcompass.com/square-loans-review/) / [Finder](https://www.finder.com/business-loans/square-loans-review)
- **2026 changes:** eligibility is reviewed daily, with the seller notified by email and Dashboard ([Square Community "Square loans 2026"](https://community.squareup.com/t5/Banking-With-Square/Square-loans-2026/m-p/832755)). "Cash Flow Boost" offers of up to $10K on 120-day terms are anecdotal ([Community p.3](https://community.squareup.com/t5/Banking-With-Square/Square-loans-2026/m-p/837933)). As of August 2026, CBD businesses are not eligible for new loans ([Finder](https://www.finder.com/business-loans/square-loans-review)). Square's feature log for March–April 2026 shows "Access Loans now available in 50 states" ([Square Feature Log](https://www.squareup.com/us/en/feature-log)). American Banker headline from 2026-03-27: "Square Updates AI to Expand and Speed up Merchant Lending", headline only ([pulse.bot summary](https://www.pulse.bot/banking/news/square-updates-ai-to-expand-and-speed-up-merchant-lending-cd7f5fd2-a48f-46c9-96d7-ae429bbbbfce)).
- Square Financial Services launched as an industrial loan company in March 2021, allowing it to make loans to Square sellers directly. — [Wikipedia: Square (financial services)](https://en.wikipedia.org/wiki/Square_(financial_services))
- **Customer financing (Afterpay / Cash App Pay buy-now-pay-later):** out of scope here, covered elsewhere. Cross-reference only.

### Inferences
- **Rename:** Square Capital became Square Loans, and many third-party URLs still use "square-capital" (e.g., NerdWallet slug). The product is a sales-based loan resembling a merchant cash advance, not a term loan. No "flex installment" or "term loan" product was found.
- For Sheen's replacement app, Square Loans **cannot be replicated or integrated**. If Sheen leaves Square processing, any outstanding loan would be repaid by bank debit. Leaving Square also forfeits future loan offers, which depend on Square processing volume.

### Gaps
- Official fee and repayment ranges from Square's own pages were not readable. The figures above are third-party.
- Details of the March 2026 ML underwriting change were not verified.

---

## 5. Bill Pay, vendor payments and expense management

### Takeaway
**Square Bill Pay** pays vendor bills by ACH, digital check or paper check. Funding from Square Checking, Square debit card or external ACH is **free**. Funding by card costs **2.9%**, or **1.5% vs 2.9%** with the Square Credit Card per conflicting help pages. Since August 2026, Bill Pay is open beyond Checking holders, and paying with the Square Credit Card earns 3% back. "Expense management" consists of team debit cards, shared spend limits, receipt capture and notes, and exports. No full expense-categorization or AP-automation product was found. **No public API for Bill Pay.** The Vendors API manages inventory vendors only.

### Cited Findings
- **Fees by funding method:** Square Checking or debit card: "No fee". External ACH: free. External credit card: 2.9%. Square Credit Card: 2.9% fee alongside 3% cash back per one help article, or 1.5% per another. — [Square Bill Pay (help 7727)](https://squareup.com/help/us/en/article/7727-square-bill-pay); [Bill Pay FAQ (help 8189)](https://squareup.com/help/us/en/article/8189-bill-pay-faq); [Manage Bill Pay payment methods and vendors (help 8469)](https://squareup.com/help/us/en/article/8469-manage-bill-pay-payment-methods-and-vendors); [Square Bill Pay legal terms](https://Square.com/legal/general/billpay)
- **Delivery:** vendors choose ACH, a digital check (a PDF to print and deposit, valid 90 days), or a paper check if an address or PO box is given. ACH arrives in 1–2 business days. Payments can't be cancelled after 5pm PT. — [help 8189](https://squareup.com/help/us/en/article/8189-bill-pay-faq); [Receive Square Bill Pay payments as a vendor (help 8048)](https://squareup.com/help/us/en/article/8048-receive-square-bill-pay-payments-as-a-vendor)
- Card networks prohibit card-funding certain vendor categories. — [help 8189](https://squareup.com/help/us/en/article/8189-bill-pay-faq)
- **August 2026:** Bill Pay now covers rent, insurance and marketing bills. It was previously available only to sellers with Square Checking. The card can fund vendors who don't accept cards. — [Square press 2026-08-11](https://squareup.com/us/en/press/square-credit-card-bill-pay-refresh); [PYMNTS](https://www.pymnts.com/?p=4065319); [Digital Transactions (Sept 2026)](https://www.digitaltransactions.net/eye-on-small-business-square-expands-its-credit-card-program-j-p-morgan-backs-dream-payouts-launch/)
- Bill Pay and "new cash flow management products" were first unveiled in beta in June 2023 alongside the credit card. — [Business Wire 2023-06-28](https://www.businesswire.com/news/home/20230628384131/en/Square-Unveils-Square-Credit-Card-and-New-Cash-Flow-Management-Products-in-Beta-as-Banking-Adoption-Grows); [The Paypers](https://thepaypers.com/fintech/news/square-launches-credit-card-and-new-cash-flow-management-products)
- **Expense tools:** up to 5 free debit cards with shared limits, receipt-by-text capture auto-matched to transactions, notes, CSV export including receipts and notes, and a ZIP of receipt images. — [help 6589](https://square.com/help/us/en/article/6589-get-started-with-square-card); [help 8658](https://squareup.com/help/us/en/article/8658-capture-receipts-and-add-notes-to-square-debit-card-transactions). Square's banking navigation lists "Expense Management", but no description of categorization was found. — [Square Business Banking](https://squareup.com/us/en/banking)

### Inferences
- The two Square Credit Card fee figures (1.5% vs 2.9%) probably straddle the August 2026 refresh. Either way, Square positions the 3% reward as fully offsetting the fee.
- For Sheen, Bill Pay is a "pay suppliers" convenience, not core. A replacement app would need its own AP flow, for example ACH via a bank API, or would simply record vendor bills for bookkeeping.

### Gaps
- No evidence of a Square **spend-management** product with per-employee card budgets, approval flows or automatic expense categorization as of Oct 2026.
- Bill Pay transaction limits and whether bills can be imported by email or OCR were not found.

---

## 6. Bitcoin features (Bitcoin Payments, Bitcoin Conversions, wallet, Bitkey)

### Takeaway
US sellers can (a) **accept bitcoin payments** over the Lightning Network, which rolled out November 10, 2025, with a **0% processing fee through December 31, 2026, then 1%**. They can (b) use **Bitcoin Conversions** to automatically convert a share of daily sales into bitcoin, for a **1%** conversion fee, or 0.50% on some plans per the bitcoin page. They can (c) hold, buy, sell and withdraw BTC in a **Square bitcoin wallet** in the Dashboard. Bitcoin payments are not available in New York and have no chargeback or dispute support. **Bitkey** is Block's separate self-custody hardware wallet. **No public Square API for bitcoin features was found.**

### Cited Findings
- "Bitcoin payments have a 0% processing fee until December 31, 2026, after which it will be 1%." Not available in New York, and Square doesn't support disputes or chargebacks for bitcoin payments. — [Accept and manage bitcoin payments (help 8622)](https://squareup.com/help/us/en/article/8622-accept-and-manage-bitcoin-payments). The bitcoin product page is inconsistent ("until 2027" vs "through 2026"). — [Square Bitcoin page](https://squareup.com/us/en/bitcoin)
- **Conversion fee:** "1% of the total amount of your daily converted sales". The bitcoin page lists 0.50% on some plans and 1.00% on others. — [help 8622](https://squareup.com/help/us/en/article/8622-accept-and-manage-bitcoin-payments); [Square Bitcoin page](https://squareup.com/us/en/bitcoin)
- Bitcoin Conversions automatically converts up to 50% of a seller's daily card or ACH revenue into bitcoin held in a Square wallet. — [Finextra](https://www.finextra.com/newsarticle/46891/square-rolls-out-bitcoin-payments-to-4-million-merchants) (third-party)
- **Rollout:** a pilot began July 2025. Bitcoin Payments rolled out to US sellers on November 10, 2025, settled over Lightning, with Square converting to fiat if the seller chooses. A native wallet lets sellers buy, sell, hold and withdraw BTC. — [Square press: Block to roll out bitcoin payments on Square (May 2025)](https://squareup.com/us/en/press/block-to-roll-out-bitcoin-payments-on-square); [Finextra press article](https://www.finextra.com/pressarticle/107424/square-introduces-integrated-bitcoin-payments-and-wallet-solution-for-local-businesses); [Cryptobriefing](https://cryptobriefing.com/square-bitcoin-payments-cashapp-merchants)
- **Bitkey:** on 2026-04-27 Block announced a new Bitkey hardware wallet with a touchscreen, available for preorder, and a tap-to-pay rollout to "bring simpler bitcoin acceptance to Square sellers across the U.S." — [Block newsroom 2026-04-27](https://block.xyz/inside/block-launches-bitkey-wallet-with-screen-automatic-bitcoin-earning-on-cash-app-and-proof-of-reserves)
- About 800,000 sellers were auto-enabled for bitcoin acceptance. This is a third-party claim. — [Oshi blog](https://oshi.tech/blog/square-bitcoin-2026)

### Inferences
- **Time-sensitive:** the 0% bitcoin-payment fee expires in two months (Dec 31, 2026). The fee becomes 1%, which is still cheaper than card rates.
- For a mobile detailer in Oregon, bitcoin acceptance is available, since only New York is excluded, but it is low-priority. A replacement app would need a separate Lightning processor to offer it.

### Gaps
- Whether the Payments API surfaces bitcoin tenders, and how, was not verified (developer docs blocked).
- Bitcoin wallet withdrawal fees and limits were not found.

---

## 7. Sales tax handling in Square (setup, automatic rates, reports, filing and remittance)

### Takeaway
Square lets sellers create tax rates (additive or inclusive, item- or order-level) and **calculates and collects** sales tax at checkout. Square Online can do destination-based rates via TaxJar. Square provides a **Taxes report** (taxable vs non-taxable sales). Square **does not register, file or remit sales tax**. Third-party TaxJar (with AutoFile) can import Square transactions. **Oregon has no state sales tax**, so Sheen's taxes list should be empty or $0. Tax configuration **is** exposed by API (Catalog `CatalogTax`, Orders taxes).

### Cited Findings
- Square calculates and collects sales tax at checkout but "does not file sales tax returns or remit payments on your behalf". The seller must register, file and remit. Square does not keep rates current, so the seller must update settings. — [Webgility](https://www.webgility.com/blog/square-sales-tax) (third-party); [Gateway 2000](https://gw2k.com/does-square-remit-sales-tax/) (third-party). Square's own tax-season article says Square helps you prepare, with no mention of filing. — [Tax Season, Simplified](https://squareup.com/us/en/the-bottom-line/inside-square/prepare-for-tax-season-with-square)
- Square pre-configures tax registrations based on Square locations. Square Online's automatic destination-based calculation runs through TaxJar. Standard Square Invoices do not pull the customer's address for the local rate. — [Square Community: Local Taxes in Square Invoices](https://community.squareup.com/t5/Orders-Menu-Items-Catalog/Local-Taxes-in-Square-Invoices/m-p/851730); [Sales Tax on Out of State shipments](https://community.squareup.com/t5/Online-Store/Sales-Tax-on-Out-of-State-shipments/m-p/772899)
- **Reports:** the Taxes report shows how tax rates were used in a period, including taxable and non-taxable sales. The Fees report covers transaction fees, taxes on fees and cost of payments. A service-charge report also exists. — [View tax, fee and service charge reports (help 8360)](https://squareup.com/help/us/en/article/8360-view-tax-fee-and-service-charge-reports)
- **TaxJar for Square:** one-click link, daily sync, reports of tax collected by city and county across nexus states, deadline tracking and **AutoFile** state filing (paid). 2014 pricing of $9.95/month is outdated. — [TaxJar Square integration](https://www.taxjar.com/product/integration/square); [TaxJar support](https://support.taxjar.com/article/153-collecting-sales-tax-in-square); [TechCrunch 2014](https://techcrunch.com/2014/09/04/in-a-business-platform-play-square-adds-sales-tax-reporting-through-taxjar)
- **Avalara:** no Square integration found in searches. A 2021 forum anecdote says "TaxJar and Avalara do not fully integrate with Square". — [Square Community 2021](https://community.squareup.com/t5/Questions-How-To/Real-time-sales-tax-rates-for-ecommerce-sales/m-p/287774)
- **API (tax config and data):** `CatalogTax` has `inclusion_type` (ADDITIVE/INCLUSIVE), `calculation_phase` (subtotal or total phase) and `percentage` (string, "7.5" = 7.5%). Orders carry `OrderLineItemTax` with ORDER or LINE_ITEM scope, `applied_taxes`, per-line and order `total_tax_money`, and `applied_money`. — [CatalogTax reference](https://developer.squareup.com/reference/square/objects/CatalogTax); [Build with Catalog](https://developer.squareup.com/docs/catalog-api/build-with-catalog); [OrderLineItemTax](https://developer.squareup.com/reference/square/objects/OrderLineItemTax); [Order object](https://developer.squareup.com/reference/square/objects/Order)

### Inferences
- **Oregon:** with no state sales tax and no Portland sales tax, Sheen should configure no sales tax in Square or in its own app. The replacement app should still model tax as a configurable per-line or per-order rate (mirroring `CatalogTax`) for future-proofing or out-of-state work. Square's "automatic" tax is really location-based preset rates for in-person sales plus TaxJar-powered destination rates for Square Online. It is not a filing service.
- **Portland and Oregon taxes Square does NOT handle (requester flag):** Oregon personal income tax, the Oregon Corporate Activity Tax, and Portland/Multnomah County business taxes. Square has no feature for any of these; the app's own tax module or an accountant would have to cover them. (No source fetched for Oregon tax rules. Verify with Oregon DOR and the Portland Revenue Division.)

### Gaps
- Square's own help article on "automatic tax rates" or location-based tax setup for US POS could not be read. The degree of automation in Square POS vs Square Online is only partly confirmed.

---

## 8. Tax forms, 1099-K, payroll taxes (cross-reference), income tax and Block tax products: what Square does and does NOT do

### Takeaway
**Square DOES:** issue **Form 1099-K** to qualifying US sellers, downloadable in the Dashboard by **January 31**. The federal threshold for TY2025 and TY2026 is **more than $20,000 and more than 200 transactions**, restored by the One Big Beautiful Bill Act. Square also provides tax-related reports (Sales Summary, Taxes, Fees, Balance/Transfers) and savings folders to set money aside. **Square Payroll** (paid) files payroll tax forms; cross-reference only. **Square does NOT:** file or remit sales tax, prepare or file income tax returns (Schedule C, Form 1040, Oregon returns), file estimated quarterly taxes, or provide bookkeeping or categorized P&L tax returns. Block's **Cash App Taxes** is a free consumer filing tool that reportedly supports Schedule C, but no Square data import was found.

### Cited Findings
- **1099-K in Dashboard:** forms for each tax year are available by January 31 of the following year (or the next business day). Download and corrections are in the Dashboard. If no form appears on the Tax Forms tab, the seller most likely didn't qualify. — [Manage your Form 1099-K (help 5048)](https://squareup.com/help/us/en/article/5048-1099-k-overview)
- Dashboard path: Account & Settings → Business information → Tax forms. — [Square Community: where do I find my 1099K](https://community.squareup.com/t5/Questions-How-To/How-do-you-get-a-print-out-of-the-income-you-received-from/m-p/1079)
- **TY2025 Square criteria:** federal threshold of $20,000 gross sales and more than 200 card transactions. — [Square Community News: 2025 1099-K tax season overview](https://community.squareup.com/t5/Community-News/1099-K-tax-forms-and-tax-season-overview-for-US-sellers/ba-p/828532)
- **TY2026 federal threshold:** more than $20,000 **and** more than 200 transactions (both required, per platform), per the One Big Beautiful Bill Act's reversal of the $600 schedule. Income below the threshold is still taxable. — [Fidelity](https://www.fidelity.com/learning-center/personal-finance/form-1099-k); [TaxAct blog](https://blog.taxact.com/new-form-1099-k-reporting-thresholds/); [1099 Express (2026-10-03)](https://1099express.com/2026/10/03/form-1099-k-in-2026-the-20000-and-200-transaction-threshold-is-back/). IRS.gov was not directly fetched.
- Some states use lower thresholds, as low as $600. — [Money Under 30](https://www.moneyunder30.com/1099-k-threshold-2026-side-hustle-taxes/); [Stripe state requirements](https://docs.stripe.com/connect/1099-k)
- **Oregon 1099-K (conflicting):** secondary sources say Oregon follows the federal threshold when no Oregon tax is withheld, while 1099pro says Oregon requires all OR 1099-K forms. The Oregon DOR bulletin lists 1099-K among forms due March 31. — [TaxBandits Oregon](https://support.taxbandits.com/art/16858/oregon-1099-state-filing-requirements); [1099pro wiki](https://wiki.1099pro.com/x/cwAWBg); [Oregon DOR revenue bulletins](https://www.oregon.gov/dor/Pages/revenue-bulletins.aspx); [Oregon DOR iWire brochure](https://www.oregon.gov/dor/forms/FormsPubs/iwire-information-return-brochure_206-002.pdf)
- **Square Payroll (cross-reference):** full-service at $35/month plus $6 per person paid. Contractor-only at $6/month per person (verified by CostBench on 2026-06-13). Whether full-service includes tax filing is disputed between sources. — [CostBench verify page](https://costbench.com/verify/square-payroll/); [Gusto guide](https://gusto.com/resources/guides/switch-payroll-providers/square-pricing); [Capterra](https://www.capterra.com/p/170266/Square-Payroll/pricing). Square Payroll "automatically generates and electronically files Forms 1099-NEC" for contractors. — [FreshBooks](https://www.freshbooks.com/hub/taxes/square-1099). Payroll syncs to QuickBooks Online. — [Sync Square Payroll with QuickBooks Online (help 6299)](https://squareup.com/help/us/en/article/6299-sync-square-payroll-with-quickbooks-online)
- **Sales tax:** Square does not file or remit (see section 7). — [Webgility](https://www.webgility.com/blog/square-sales-tax)
- **Square tax-season tooling:** a Savings tax folder (1% APY base) to set aside a % of card sales for "quarterly, payroll, and income taxes", plus reports. — [Tax Season, Simplified](https://squareup.com/us/en/the-bottom-line/inside-square/prepare-for-tax-season-with-square)
- Without a 1099-K, sellers can use the Sales Summary to report income. — [Square Community moderator post](https://community.squareup.com/t5/Questions-How-To/Download-your-Sales-Summary-if-you-didn-t-receive-a-1099-K/m-p/32096)
- **Cash App Taxes (Block):** free federal and state filing, reportedly supporting Schedule C and Schedule SE (one state only, no multi-state). It is the former Credit Karma Tax. Sources are weak affiliate blogs, and one contradicts the others on self-employment support. — [Wealthvieu review](https://wealthvieu.com/taxes/tax-filing/cash-app-taxes-review/); [jupid blog](https://jupid.com/blog/cash-app-taxes-irs-reporting-2026). I found no evidence that Block sold it, and no Square-to-Cash App Taxes data import.

### Inferences
- **Clear statement for the requester:** Square's tax role ends at (1) calculating and collecting sales tax per the seller's settings, (2) issuing the information return 1099-K, (3) reports and exports, (4) letting you set money aside, and (5) payroll tax filing **only if** you pay for Square Payroll. Square does **not** compute income tax owed, does not produce a Schedule C or P&L tax return, does not file Oregon or Portland returns, and does not pay estimated taxes. A "first invoice to tax filing" app must add a categorized ledger of income and expenses, mileage (relevant for mobile detailing), estimated-tax calculations, and exports for a tax preparer or software.
- For a sole-proprietor detailer, a Schedule C filer, Cash App Taxes could be a free filing endpoint, but data would have to be entered manually or by CSV.

### Gaps
- IRS.gov's page on the TY2026 1099-K threshold was not fetched. Confirm on irs.gov.
- Square's own TY2026 1099-K criteria page (to be posted early 2027) is not yet available.
- Whether Square Payroll full-service files and pays federal and state payroll taxes (including Oregon-specific payroll taxes such as Statewide Transit, Paid Leave Oregon, and Portland/Metro taxes) is not confirmed from Square's own pages.

---

## 9. Accounting integrations and exportable reports (QuickBooks, Xero, App Marketplace, statements)

### Takeaway
**QuickBooks Online:** Intuit's free "Sync with Square" (Square Connector) imports sales, fees, taxes and deposits daily into QBO's For Review tab. **Xero:** a free Amaka-built integration posts a daily summary invoice or per-order invoices with fees, tips, refunds and taxes, available in the US. Paid third-party options include Synder, Commerce Sync and Amaka paid tiers. Square's own reports (Sales Summary, Taxes, Fees, Balance/Transfers, Payment Methods) export to CSV or PDF. **No public Reporting API.** Integrators build on the Payments, Orders, Refunds and Payouts APIs.

### Cited Findings
- **QuickBooks (Intuit-built, free):** a one-way import of sales, fees, taxes and deposits, with automatic daily sync and no manual sync. Transactions appear in QBO's banking For Review tab, usually within 2 hours. Square's App Marketplace calls it "Sync with Square". — [Intuit help: Connect and manage Square transactions in QBO](https://quickbooks.intuit.com/learn-support/en-us/help-article/manage-integrations/connect-manage-square-transactions-quickbooks/L0mBsyBTP_US_en_US); [Square App Marketplace: Intuit QuickBooks Online](https://squareup.com/ca/en/app-marketplace/app/intuit-quickbooks-online); [Intuit Welcome Guide PDF](https://appcenter.intuit.com/cmsimages/square/Welcome-Guide-QB-with-Square.pdf)
- **Third-party QBO/Xero sync pricing (unverified vendor or comparison blogs):** Synder Basic at $52/month billed yearly or $65 monthly for up to 500 transactions, syncing about hourly. Commerce Sync Essential at $20/month. Amaka has a free plan with daily sync and Pro at $29/month. The QBO subscription is extra. — [QuickSync comparison](https://quicksync.pro/blog/best-square-quickbooks-integration-apps/); [Synder](https://synder.com/integrations/quickbooks/square/); [Amaka](https://amaka.com/integrations/square/quickbooks/)
- **Xero:** built with partner Amaka and "free for all Square sellers" (Xero fees still apply). Daily summary invoice or per-order invoices, capturing fees, tips, refunds, gift cards, surcharges and taxes. Available in AU, UK, IE, US and CA. — [Xero: Square partnership (US)](https://www.xero.com/us/partnerships/square/); [Xero App Store: Square](https://apps.xero.com/app/Square); [Square App Marketplace: Xero](https://squareup.com/us/es/app-marketplace/app/xero)
- **Square Payroll ↔ QBO sync.** — [help 6299](https://squareup.com/help/us/en/article/6299-sync-square-payroll-with-quickbooks-online)
- **Reports:** Sales Summary (gross sales, refunds, net, discounts, tips, taxes, tender types, fees; export CSV). Taxes report. Fees report. Balance/Transfers report (each transfer with its payments, gross, fees, net). Print to PDF or export. — [help 8360](https://squareup.com/help/us/en/article/8360-view-tax-fee-and-service-charge-reports); [Get Started with Square Analytics and Reporting](https://squ.re/2Lor5yJ); [Square Community: transfer summary report](https://community.squareup.com/t5/Questions-How-To/Is-there-a-way-to-print-the-transfer-summary-report-like-the-old/m-p/330846); [Heard support: download Sales Summary](https://support.joinheard.com/hc/en-us/articles/28465856207639-How-to-download-Square-Sales-Summary-Report). Users report the transfer export sometimes omits fees and taxes. — [Square Community](https://community.squareup.com/t5/Questions-How-To/Is-there-a-way-to-print-the-transfer-summary-report-like-the-old/m-p/285583)
- **Square Checking transaction export** includes receipts and notes, for reconciliation with accounting software. — [help 8658](https://squareup.com/help/us/en/article/8658-capture-receipts-and-add-notes-to-square-debit-card-transactions)
- **Built-in bookkeeping:** no Square-native general ledger, chart of accounts or expense-categorization product was found in 2026 sources. Square defers to QBO, Xero and partners. — inferred from [search of Square Releases and feature log](https://www.squareup.com/us/en/feature-log) returning no such feature.

### Inferences
- The Intuit connector imports exactly the dataset a replacement app needs to own: gross sales, tax, tips, fees and net deposits per payout. Sheen's app can replicate it using Payments (processing fees), Orders (tax), Refunds and Payouts (deposits plus fee entries), or can push the same summary entries to QBO or Xero via their APIs.

### Gaps
- The current Square App Marketplace US accounting category (full list, e.g., Wave, FreshBooks, Zoho Books, Bench and others) could not be browsed.
- Square Checking monthly PDF statement availability was not confirmed.

---

## 10. Square Financial Services (Block's bank): what it backs, and retired or renamed products

### Takeaway
Square Financial Services, Inc. (SFS) is a Utah-chartered industrial loan company, an independently governed Block subsidiary launched March 2021. It **makes Square Loans** and **issues Square Savings**, with up to $2.5M FDIC via sweep. **Square Checking** and the Debit Card are provided by **Sutton Bank**, and the **Square Credit Card** is issued by **Celtic Bank** (Amex license). Block itself is not a bank.

### Cited Findings
- SFS was launched as an ILC in March 2021, enabling direct business lending. — [Wikipedia](https://en.wikipedia.org/wiki/Square_(financial_services)); [Block 10-K FY2023](https://www.sec.gov/Archives/edgar/data/1512673/000162828024006354/sq-20231231.htm)
- Square Savings is at SFS, a Utah-chartered industrial bank and Block subsidiary, with sweep FDIC coverage up to $2.5M. — [Square Savings page](https://squareup.com/us/en/banking/savings); [Block 10-K FY2024](https://www.sec.gov/Archives/edgar/data/1512673/000162828025007376/sq-20241231.htm)
- Square Checking is via Sutton Bank, with $250K pass-through FDIC. — [Square Business Banking](https://squareup.com/us/en/banking)
- The Credit Card is issued by Celtic Bank. — [Square Credit Card page](https://squareup.com/us/en/banking/credit-card)
- "Block, Inc. is a financial services platform and not an FDIC-insured bank." — [Square Savings page](https://squareup.com/us/en/banking/savings)
- **Retired or renamed products** (evidence from help-article slugs vs current titles):
  - Square Capital → **Square Loans** ([NerdWallet slug "square-capital"](https://www.nerdwallet.com/business/loans/reviews/square-capital))
  - "Square Card" → **Square Debit Card** (slug "get-started-with-square-card", now titled "Get Started with Square Debit Card": [help 6589](https://square.com/help/us/en/article/6589-get-started-with-square-card))
  - "Instant Deposit" → **Instant Transfer** (slug "set-up-and-manage-instant-deposits", now titled "Set Up and Manage Instant Transfers": [help 5405](https://square.com/help/us/en/article/5405-set-up-and-manage-instant-deposits))
  - "Deposit options" → **Transfer options** ([help 3807](https://square.com/help/us/en/article/3807-deposit-options-with-square))
  - Credit Card rewards: "free processing per $3 spent" (2023 beta) → **3%/1.5% cash back** (Aug 2026) ([Square press 2026-08-11](https://squareup.com/us/en/press/square-credit-card-bill-pay-refresh))
  - Savings top tier: **4.25%** (older pages) → **3.50%** (June 2026) ([help 7418](https://squareup.com/help/us/en/article/7418-square-savings-faq); [Business Wire 2026-06-11](https://www.businesswire.com/news/home/20260611611379/en/Square-Financial-Services-Introduces-3.50-APY-High-Yield-Savings-for-Square-Sellers-More-Than-8-Times-the-National-Average))
  - v1 Settlements API → **Payouts API** (Payouts API launched in beta as the reconciliation replacement: [Square Developer Forums: New Payouts API in Beta](https://developer.squareup.com/forums/t/new-payouts-api-in-beta/5738))

### Inferences
- Third-party claims that Square Checking is at SFS are probably conflating it with Savings. Square's own Checking disclosures still name Sutton Bank.

### Gaps
- Whether Square plans to migrate Checking deposits from Sutton Bank to SFS is unknown. No announcement was found.

---

## 11. API exposure matrix: which features have a public Square API

### Takeaway
Public Square APIs cover **money-in data**: Payments (including processing fees), Orders and Catalog (taxes), Refunds, Disputes, Invoices, Payouts (deposits and fee entries), and Bank Accounts (read-only list of linked payout accounts). **Every banking, financing, Bill Pay, bitcoin, tax-form and report feature is Dashboard-only, with no public API found.** Square Checking, Savings, Debit Card, Credit Card, Loans, Bill Pay, Bitcoin Conversions and wallet, 1099-K download, Sales Summary, Taxes and Fees reports, and Square Payroll all fall in this group.

### Cited Findings
- **Payouts API:** lists payouts to the seller's bank destination and their payout entries. Each `PayoutEntry` carries `fee_amount_money`. Fees should be computed from PayoutEntry because the payout-level fee field is only returned for card-bound Instant Deposits. Under Gross Settlement, fees are debited monthly as separate payout entries. It is used with the Bank Accounts API to identify the receiving account. — [Payouts API overview](https://developer.squareup.com/docs/payouts-api/overview); [Payouts API reference](https://developer.squareup.com/reference/square/payouts-api); [PayoutEntry object](https://developer.squareup.com/reference/square/objects/PayoutEntry); [List Payout Entries](https://developer.squareup.com/reference/square/payouts-api/list-payout-entries)
- Developer forum report: Instant Transfer fees missing from payout data. This is a roughly 2.5-year-old post and may be fixed. — [Square Developer Forums](https://developer.squareup.com/forums/t/square-payout-unclear-and-missing-instant-transfer-fees-in-api/13716)
- **Bank Accounts API:** `GET /v2/bank-accounts` (ListBankAccounts) returns BankAccount objects linked to the seller, filterable by `location_id`, paginated, limit up to 1000. The bank must first be linked in the Seller Dashboard. — [ListBankAccounts reference](https://developer.squareup.com/reference/square/bank-accounts-api/list-bank-accounts); [Bank Accounts API docs](https://developer.squareup.com/docs/bank-accounts-api?q=pricing)
- **Catalog and Orders tax data:** `CatalogTax` (inclusion_type, calculation_phase, percentage). `OrderLineItemTax` and `applied_taxes`. `total_tax_money` on line items and orders. — [CatalogTax](https://developer.squareup.com/reference/square/objects/CatalogTax); [OrderLineItemTax](https://developer.squareup.com/reference/square/objects/OrderLineItemTax); [Order](https://developer.squareup.com/reference/square/objects/Order)

**Feature-by-feature matrix**

| Feature | Free or paid (as reported) | Public API? |
|---|---|---|
| Square Checking (account, instant sales access) | Free; no monthly, minimum or overdraft fees | None found (Dashboard and app only) |
| Square Debit Card (up to 5, physical and virtual) | Free; no Square ATM fee; 3rd-party ATM fees | None found |
| Debit receipt capture, notes, export | Free | None found (CSV/ZIP export only) |
| Transfer Square balance → Checking (instant) | Free (Apr 2025) | Payouts API shows payouts |
| Standard next-business-day transfer | Free | Payouts API |
| Instant or same-day transfer to external bank | 1.75% or 1.95% (conflict) | Payouts API (fee via PayoutEntry; gaps reported) |
| Checking → external bank instant | 1.95% reported | None found |
| Square Savings + folders + auto % of sales (≤75%) | Free; 1.00% APY, 3.50% at ≥$10K (June 2026; older 4.25%) | None found |
| Automated Sales Tax folder | Free | None found |
| Square Credit Card | No annual, late or FX fees; individualized APR; 3% Bill Pay / 1.5% other cash back | None found |
| Square Loans | Fixed fee (~10–16% third-party); % of daily sales | None found |
| Square Bill Pay | Free via Checking, debit or ACH; 2.9% external card; Square CC 1.5% or 2.9% (conflict) | None found (Vendors API manages inventory vendors only, not Bill Pay, from prior knowledge) |
| Bitcoin Payments | 0% through 2026-12-31, then 1% | Not verified |
| Bitcoin Conversions | 1% of converted sales (0.50% on some plans) | None found |
| Bitcoin wallet (buy, sell, withdraw) | Not found | None found |
| Sales tax setup, calculation, collection | Included | **Yes**: Catalog API (`CatalogTax`), Orders API |
| Sales tax filing or remittance | Not offered by Square (TaxJar AutoFile, paid) | N/A |
| Taxes, Fees, Sales Summary, Balance reports | Included | No Reporting API; rebuild from Payments, Orders, Refunds and Payouts |
| Form 1099-K | Included (if threshold met) | None found (Dashboard download) |
| Square Payroll (payroll tax forms, 1099-NEC) | $35/mo + $6/person; contractor-only $6/person | None found |
| QuickBooks Online sync (Intuit) | Free (QBO subscription extra) | Built on Square APIs by Intuit |
| Xero sync (Amaka) | Free (Xero subscription extra) | Built on Square APIs by Amaka |
| Cash App Taxes (Block) | Free (reported) | None found |

### Inferences
- The following come from prior knowledge of Square's developer reference and were **not re-verified** this session because developer.squareup.com was blocked:
  - The `Payment` object exposes `processing_fee[]` (per-payment Square fee) and `app_fee_money`.
  - The Refunds, Disputes, Invoices (tax via linked Order), Cash Drawer Shifts and Vendors APIs exist.
  - There is no public Payroll, Banking, Loans or Reporting API.
- The confirmed fact is that the searches surfaced no Square developer documentation for Checking, Savings, Loans, Bill Pay, Credit Card or bitcoin. The Bank Accounts API is a read-only list of linked payout bank accounts and is not a banking API.
- **Implication for Sheen's app:** to own "first invoice to tax filing", the app must itself hold the ledger for income (from its own payments processor), fees, tax collected ($0 in Oregon), deposits, expenses (from its own bank feed, e.g., a Plaid-type aggregator), and set-aside reserves. Square provides no programmatic hooks into its banking or lending stack.

### Gaps
- Whether the 2026 Payments API returns bitcoin (Lightning) tenders and their 0%/1% fees could not be checked.
- Whether a `Get Bank Account` endpoint, or one that accepts v1 IDs, still exists was not confirmed. Only List was confirmed in search extracts.
- Full re-verification of every API claim requires access to developer.squareup.com.
