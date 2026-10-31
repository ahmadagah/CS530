# Square Developer Platform: every API, SDK, client library, webhook family, auth model, tool and policy (as of 2026-10-31)

Method note for the report writer: developer.squareup.com and squareup.com could not be fetched from this session (DNS blocked). So the **primary source for the API inventory is Square's own machine-readable OpenAPI spec**, cloned from GitHub (`square/connect-api-specification`, head commit "Release 2026-09-16", 2026-09-15). Every operation, release status (PUBLIC = GA, BETA, DEPRECATED), OAuth scope and webhook event below was extracted from that file with a script. I diffed the spec's own release history (2024-01 → 2026-09) to date what was added or removed. Package versions come from npm, PyPI, RubyGems, NuGet, Packagist, the Go module proxy and GitHub tags. Policy and limit facts come from web-search snippets of Square docs and forums. Doc URLs in the form `developer.squareup.com/reference/square/<name>-api` follow the pattern the spec itself uses (e.g. `/reference/square/cards-api/create-card`), but none could be opened individually.

Key sources used repeatedly:
- SPEC = [Square OpenAPI spec, Release 2026-09-16](https://github.com/square/connect-api-specification/blob/master/api.json)
- SPEC-HISTORY = [spec commit history](https://github.com/square/connect-api-specification/commits/master/api.json)
- MCP-REPO = [square/square-mcp-server README](https://github.com/square/square-mcp-server)

---

## 1. Full list of current APIs, grouped as Square groups them (plus additions 2024–2026 and removals)

### Takeaway
As of API version **2026-09-16**, Square's spec groups the Connect API into 6 categories: Dev Essentials, Payments, Commerce, Customers, Staff and Merchants. Together they hold **40 current APIs** in the reference, plus 3 legacy tags still in the spec (Transactions, Employees, V1 Orders), for **332 REST operations**. Outside the REST spec there is a new cube-based **Reporting API** (open beta) and a special-access **Discount Codes API**. APIs and endpoints added in 2024–2026:
- Events (2024-06)
- Team Jobs (2024-12)
- Labor Timecards and Scheduled Shifts (2025-05)
- Channels and Transfer Orders (2025-10)
- Bank Account create/disable (2026-05)
- Inventory Adjustment Reasons (2026-07)

The Mobile Authorization API is gone (removed 2026-05). There is no "AI API" in the Connect API. Square's AI offering is an MCP server, a tool that sits on top of the same APIs (see Q2).

### Cited Findings

**Category structure (Square's own grouping, in this order):** Dev Essentials → Payments → Commerce → Customers → Staff → Merchants — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json) (`components.x-categories-order`)
- Dev Essentials = OAuth, Webhook Subscriptions, Events
- Payments = Payments, Refunds, Checkout, Terminal, Disputes, Invoices, Cards, Subscriptions, Bank Accounts, Payouts, Devices, Apple Pay
- Commerce = Orders, Order Custom Attributes, Catalog, Inventory, Transfer Order, Bookings, Booking Custom Attributes, Vendors, Channels, Sites, Snippets, Cash Drawers
- Customers = Customers, Customer Custom Attributes, Customer Groups, Customer Segments, Loyalty, Gift Cards, Gift Card Activities
- Staff = Labor, Team
- Merchants = Merchants, Merchant Custom Attributes, Locations, Location Custom Attributes
- Source for all six groupings: [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json) (`components.x-categories`)
- Base URL `https://connect.squareup.com`. Every request carries a `Square-Version` header, whose default in this spec is `2026-09-16` — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json) (`servers`, `x-fern-global-headers`)
- Operation counts per API, with GA/BETA/DEPRECATED splits, were computed from the spec and appear in the tables below. Totals: 332 operations under 43 tags, of which 211 are GA (PUBLIC), 97 BETA and 24 DEPRECATED — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)

#### DEV ESSENTIALS
| API | Status | Endpoints (operationIds) | Notable limits / notes | Ref URL |
|---|---|---|---|---|
| OAuth | GA (3) | ObtainToken `POST /oauth2/token`, RevokeToken `POST /oauth2/revoke`, RetrieveTokenStatus `POST /oauth2/token/status`; authorize URL `https://connect.squareup.com/oauth2/authorize` | RenewToken was removed from the spec in the 2024-04-17 release. `short_lived=true` returns a 24-hour token. `migration_token` grant is legacy (pre-2019-03-13 tokens). See Q3. | developer.squareup.com/reference/square/oauth-api |
| Webhook Subscriptions | GA (8) | ListWebhookEventTypes, ListWebhookSubscriptions, CreateWebhookSubscription, RetrieveWebhookSubscription, UpdateWebhookSubscription, DeleteWebhookSubscription, UpdateWebhookSubscriptionSignatureKey, TestWebhookSubscription | Subscriptions belong to the application, not to a seller, so **OAuth tokens cannot be used**. You must use the app's personal access token. | developer.squareup.com/reference/square/webhook-subscriptions-api |
| Events | **BETA** (4) | SearchEvents `POST /v2/events`, ListEventTypes, EnableEvents, DisableEvents | Searches events from the last **28 days**. Meant for reconciling missed webhooks. **PAT only**, no OAuth tokens. First appeared in the 2024-06 spec. | developer.squareup.com/reference/square/events-api |
Sources: [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json); [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json).

#### PAYMENTS
| API | Status | Endpoints | Notable limits / notes |
|---|---|---|---|
| Payments | GA (7) | ListPayments, CreatePayment, GetPayment, UpdatePayment, CancelPayment, CancelPaymentByIdempotencyKey, CompletePayment | `source_type` values: CARD, BANK_ACCOUNT, WALLET, BUY_NOW_PAY_LATER, SQUARE_ACCOUNT, CASH, EXTERNAL. Delayed capture: `autocomplete=false`. Default `delay_duration` is 36h for card-present and 7 days for card-not-present; `delay_action` defaults to CANCEL. `app_fee_money` ≤ 90% of the payment. New `app_fee_allocations` field splits the fee among parties. `verification_token` comes from Web SDK `verifyBuyer()` (SCA/3DS). `accept_partial_authorization` applies to gift cards. ListPayments page size max 100. `offline_payment_details` is "for internal 1st-party callers only". |
| Refunds | GA (3) | RefundPayment, ListPaymentRefunds, GetPaymentRefund | You cannot refund more than was collected, and only COMPLETED payments can be refunded. If the Square balance is short, Square debits the bank account. The refund stays PENDING until funds are secured; if they cannot be secured it becomes FAILED and no further refunds are allowed on that payment. |
| Checkout (Payment Links) | GA payment links (5); **BETA** checkout settings (4); **DEPRECATED** (1) | GA: CreatePaymentLink, ListPaymentLinks, RetrievePaymentLink, UpdatePaymentLink, DeletePaymentLink. BETA: RetrieveLocationSettings, UpdateLocationSettings, RetrieveMerchantSettings, UpdateMerchantSettings (`/v2/online-checkout/...`). DEPRECATED: CreateCheckout `/v2/locations/{id}/checkouts` | Square-hosted checkout page. Supports configurable payment methods, tipping, custom fields and a redirect URL. |
| Terminal | GA (8) + **BETA** (7) | GA: CreateTerminalCheckout, SearchTerminalCheckouts, GetTerminalCheckout, CancelTerminalCheckout, CreateTerminalRefund, SearchTerminalRefunds, GetTerminalRefund, CancelTerminalRefund. BETA: CreateTerminalAction, SearchTerminalActions, GetTerminalAction, CancelTerminalAction, DismissTerminalAction, DismissTerminalCheckout, DismissTerminalRefund | Drives a paired Square Terminal device. **Terminal refunds are supported only for Interac debit cards in Canada.** |
| Disputes | GA (9) | ListDisputes, RetrieveDispute, AcceptDispute, ListDisputeEvidence, CreateDisputeEvidenceFile, CreateDisputeEvidenceText, RetrieveDisputeEvidence, DeleteDisputeEvidence, SubmitEvidence | AcceptDispute pays the disputed amount out of the Square balance. |
| Invoices | GA (10) | CreateInvoice, ListInvoices, SearchInvoices, GetInvoice, UpdateInvoice, DeleteInvoice, CancelInvoice, PublishInvoice, CreateInvoiceAttachment, DeleteInvoiceAttachment | Works only for orders created with the Orders API. Square hosts the invoice payment page and can email it or auto-charge a card on file. |
| Cards | GA (4) | CreateCard, ListCards, RetrieveCard, DisableCard | Saves a card that any seller using your app can charge (organization access token), or one only a single seller can charge (that seller's token). Replaces the deprecated Customers card endpoints. |
| Subscriptions | GA (7) + **BETA** (5) | GA: CreateSubscription, SearchSubscriptions, RetrieveSubscription, UpdateSubscription, CancelSubscription, ResumeSubscription, ListSubscriptionEvents. BETA: PauseSubscription, SwapPlan, BulkSwapPlan, ChangeBillingAnchorDate, DeleteSubscriptionAction | Subscription plans are created with the Catalog API. |
| Bank Accounts | GA (3) + **BETA** (2) | GA: ListBankAccounts, GetBankAccount, GetBankAccountByV1Id. BETA (added 2026-05-20): CreateBankAccount ("Store a bank account on file for a square account"), DisableBankAccount | Exposes last digits and routing number. Pairs with the Payouts API. |
| Payouts | GA (3) | ListPayouts, GetPayout, ListPayoutEntries | Read-only. A `PAYOUTS_WRITE` scope ("schedule a payout") was added on 2026-05-20, but the spec has no public write endpoint. |
| Devices | GA (3) + **BETA** (2) | GA: CreateDeviceCode, ListDeviceCodes, GetDeviceCode. BETA: ListDevices, GetDevice | Pairs a Square Terminal with a third-party POS. |
| Apple Pay | GA (1) | RegisterDomain `POST /v2/apple-pay/domains` | Lets a platform bulk-activate Apple Pay on the Web for its sellers' domains. Each domain must host a verification file. |
Sources: [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json); [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json).

#### COMMERCE
| API | Status | Endpoints | Notable limits / notes |
|---|---|---|---|
| Orders | GA (4) + **BETA** (4) | GA: CreateOrder, RetrieveOrder, BatchRetrieveOrders, SearchOrders. **BETA: UpdateOrder, PayOrder, CalculateOrder, CloneOrder** | Itemized sales, pushes orders to POS for fulfillment, searches past POS and online sales. **Square charges a transaction fee if the Orders API is used with a non-Square payment provider.** |
| Order Custom Attributes | **BETA** (11) | Definitions: List/Create/Retrieve/Update/Delete. Values: List/Retrieve/Upsert/Delete, BulkUpsert, BulkDelete | |
| Catalog | GA (13) + **BETA** (1) | BatchUpsertCatalogObjects, BatchRetrieveCatalogObjects, BatchDeleteCatalogObjects, UpsertCatalogObject, RetrieveCatalogObject, DeleteCatalogObject, ListCatalog, SearchCatalogObjects, SearchCatalogItems, CatalogInfo, CreateCatalogImage, UpdateItemModifierLists, UpdateItemTaxes. BETA: UpdateCatalogImage | Holds items, variations, categories, discounts, taxes, modifiers, and service items for bookings. Subscription plans live here too. |
| Inventory | GA (6) + **BETA** (7) + **DEPRECATED** (6) | GA: BatchChangeInventory, BatchRetrieveInventoryChanges, BatchRetrieveInventoryCounts, RetrieveInventoryCount, RetrieveInventoryAdjustment, RetrieveInventoryPhysicalCount. BETA (added 2026-07-15): List/Create/Retrieve/Update/Delete/RestoreInventoryAdjustmentReason, UpdateInventoryAdjustment. DEPRECATED: old-URL aliases (DeprecatedBatchChangeInventory etc.) and RetrieveInventoryChanges | RetrieveInventoryTransfer was removed in the 2026-07-15 release. |
| Transfer Orders | **BETA** (8), new 2025-10-16 | CreateTransferOrder, SearchTransferOrders, RetrieveTransferOrder, UpdateTransferOrder, DeleteTransferOrder, StartTransferOrder, ReceiveTransferOrder, CancelTransferOrder | Moves stock between a seller's locations. Uses INVENTORY_* scopes. |
| Bookings | GA (13) | CreateBooking, RetrieveBooking, UpdateBooking, CancelBooking, ListBookings, BulkRetrieveBookings, SearchAvailability, RetrieveBusinessBookingProfile, ListLocationBookingProfiles, RetrieveLocationBookingProfile, ListTeamMemberBookingProfiles, BulkRetrieveTeamMemberBookingProfiles, RetrieveTeamMemberBookingProfile | **Seller-level writes need `APPOINTMENTS_ALL_WRITE` + `APPOINTMENTS_WRITE`, and the seller must subscribe to Appointments Plus or Appointments Premium.** `APPOINTMENTS_ALL_WRITE` allows double-booking a seller. |
| Booking Custom Attributes | GA (11) | Definitions CRUD; values List/Retrieve/Upsert/Delete, BulkUpsert, BulkDelete | |
| Vendors | **BETA** (7) | CreateVendor, BulkCreateVendors, RetrieveVendor, BulkRetrieveVendors, UpdateVendor, BulkUpdateVendors, SearchVendors | Supplier records. |
| Channels | **BETA** (3), new 2025-10-16 | ListChannels, RetrieveChannel, BulkRetrieveChannels | Read-only list of the sales, marketing and fulfillment channels a seller has assigned catalog items to. `CHANNELS_CREATE` and `CHANNELS_UPDATE` scopes exist, but the spec has no create or update endpoints. |
| Sites | GA (1) | ListSites | Square Online. **"Publicly available as part of an early access program."** |
| Snippets | GA (3) | UpsertSnippet, RetrieveSnippet, DeleteSnippet | Injects HTML/CSS/JS into the `<head>` of every Square Online page **except checkout**. Early access program. |
| Cash Drawers | GA (3) | ListCashDrawerShifts, RetrieveCashDrawerShift, ListCashDrawerShiftEvents | Read-only. |
Sources: [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json); [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json).

#### CUSTOMERS
| API | Status | Endpoints | Notes |
|---|---|---|---|
| Customers | GA (12) + **DEPRECATED** (2) | CreateCustomer, RetrieveCustomer, UpdateCustomer, DeleteCustomer, ListCustomers, SearchCustomers, BulkCreateCustomers, BulkRetrieveCustomers, BulkUpdateCustomers, BulkDeleteCustomers (the 4 bulk endpoints added 2024-02-22), AddGroupToCustomer, RemoveGroupFromCustomer. DEPRECATED: CreateCustomerCard, DeleteCustomerCard (use the Cards API) | Supports CRM sync. |
| Customer Custom Attributes | GA (10) | Definitions CRUD; values List/Retrieve/Upsert/Delete, BulkUpsert | |
| Customer Groups | GA (5) | ListCustomerGroups, CreateCustomerGroup, RetrieveCustomerGroup, UpdateCustomerGroup, DeleteCustomerGroup | Membership is managed through the Customers API. The 2024–2026 spec diffs show no changes. |
| Customer Segments | GA (2) | ListCustomerSegments, RetrieveCustomerSegment | **Read-only.** Segments ("smart groups") are created in the Seller Dashboard or POS. |
| Loyalty | GA (17) + **DEPRECATED** (1) | CreateLoyaltyAccount, SearchLoyaltyAccounts, RetrieveLoyaltyAccount, AccumulateLoyaltyPoints, AdjustLoyaltyPoints, CalculateLoyaltyPoints, SearchLoyaltyEvents, RetrieveLoyaltyProgram, ListLoyaltyPromotions, CreateLoyaltyPromotion, RetrieveLoyaltyPromotion, CancelLoyaltyPromotion, CreateLoyaltyReward, SearchLoyaltyRewards, RetrieveLoyaltyReward, RedeemLoyaltyReward, DeleteLoyaltyReward. DEPRECATED: ListLoyaltyPrograms | **A seller can have only one loyalty program, and it is created and managed in the Seller Dashboard.** Requires the seller's Square Loyalty subscription. |
| Gift Cards | GA (7) | CreateGiftCard, ListGiftCards, RetrieveGiftCard, RetrieveGiftCardFromGAN, RetrieveGiftCardFromNonce, LinkCustomerToGiftCard, UnlinkCustomerFromGiftCard | |
| Gift Card Activities | GA (2) | CreateGiftCardActivity, ListGiftCardActivities | Activate, load, redeem, etc. |
Sources: [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json); [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json).

#### STAFF
| API | Status | Endpoints | Notes |
|---|---|---|---|
| Team | GA (8) + **BETA** (4) | GA: CreateTeamMember, BulkCreateTeamMembers, BulkUpdateTeamMembers, SearchTeamMembers, RetrieveTeamMember, UpdateTeamMember, RetrieveWageSetting, UpdateWageSetting. BETA (added 2024-12-18): ListJobs, CreateJob, RetrieveJob, UpdateJob | **"Setting permissions and passcodes still need to be done directly through the Square Dashboard."** |
| Labor | GA (14) + **BETA** (6) + **DEPRECATED** (7) | GA: CreateTimecard, SearchTimecards, RetrieveTimecard, UpdateTimecard, DeleteTimecard (Timecards added 2025-05-21); List/Create/Get/Update/DeleteBreakType; ListTeamMemberWages, GetTeamMemberWage; ListWorkweekConfigs, UpdateWorkweekConfig. BETA (added 2025-05-21): CreateScheduledShift, SearchScheduledShifts, RetrieveScheduledShift, UpdateScheduledShift, PublishScheduledShift, BulkPublishScheduledShifts. DEPRECATED: CreateShift, SearchShifts, GetShift, UpdateShift, DeleteShift, ListEmployeeWages, GetEmployeeWage | Covers time tracking (timecards, breaks, declared cash tips) and scheduling (draft/published scheduled shifts). |
Sources: [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json); [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json).

#### MERCHANTS
| API | Status | Endpoints |
|---|---|---|
| Merchants | GA (2) | ListMerchants, RetrieveMerchant (merchant ID, country, language, status, business name) |
| Merchant Custom Attributes | **BETA** (11) | Definitions CRUD; values List/Retrieve/Upsert/Delete, BulkUpsert, BulkDelete |
| Locations | GA (4) | ListLocations, CreateLocation, RetrieveLocation, UpdateLocation |
| Location Custom Attributes | **BETA** (11) | Definitions CRUD; values List/Retrieve/Upsert/Delete, BulkUpsert, BulkDelete |
Sources: [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json).

#### LEGACY TAGS STILL IN THE SPEC (not in Square's category navigation)
- **Transactions API**: ListTransactions and RetrieveTransaction are DEPRECATED. CaptureTransaction and VoidTransaction were **removed in the 2026-09-16 release**. The spec summary reads "Deprecated - Use the Orders and Payments APIs instead". Payments and Refunds replaced it on 2019-08-15 — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json); [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json)
- **Employees API (v2)**: ListEmployees and RetrieveEmployee are DEPRECATED. The Team API should be used after the 2020-08-26 deprecation — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- **V1 online-store Orders**: V1ListOrders, V1RetrieveOrder and V1UpdateOrder are DEPRECATED. These are the only v1 endpoints left in the spec — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- **V1 Webhooks**: described as "Deprecated - Use V2 Webhooks" — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)

#### APIs OUTSIDE THE REST SPEC / NEW / SPECIAL ACCESS
- **Reporting API (new, open beta)**:
  - Cube-based REST API for sales, payments, customer and catalog metrics. It exposes two universal endpoints, and queries go through `/v1/load` under `connect.squareup.com/reporting`.
  - 43 cubes and 8 views (e.g. Sales, ItemSales). Accepts both PATs and OAuth tokens. The Orders cube is about 15 minutes fresh.
  - Status conflict: the forum calls it "stable and production-ready," while the developer homepage labels it beta.
  - [Reporting API overview](https://developer.squareup.com/docs/reporting-api/overview); [Reporting API reference](https://developer.squareup.com/reference/square/reporting-api); [Forum: Reporting API Open Beta](https://developer.squareup.com/forums/t/reporting-api-open-beta/25897)
  - The spec has a "Reporting" entry with a schema explorer link (`reporting-schema-explorer-production-f.squarecdn.com`) but no paths, and it says "The legacy Reporting API has been retired" — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- **Discount Codes API (special request only)**:
  - Endpoint `/v2/discount-codes`. Staff say access is granted case by case, functionality may change and support isn't guaranteed. Codes must be tied to an eligible Catalog pricing rule and work in POS and online.
  - One developer saw the scopes present while the endpoint returned NOT_FOUND.
  - [Forum: Request for Discount Codes API access](https://developer.squareup.com/forums/t/request-for-discount-codes-api-access-square-vouchers/27905); [Forum: Discount API permissions](https://developer.squareup.com/forums/t/discount-api-permissions/28048)
  - Scopes `DISCOUNT_CODES_READ`/`WRITE` entered the spec in the 2025-02-20 release — [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json)
- **OAuth scopes in the spec with no public endpoints** (they point to private or partner APIs):
  - `ADDON_CONFIGURATIONS_READ`/`WRITE` (added 2024-03-20; "third-party Add-ons", RetrieveConfiguration/CreateConfiguration)
  - `PERMISSION_SETS_READ`/`WRITE` (added 2024-04-17; ListPermissionSets/RetrievePermissionSet)
  - `RESERVATIONS_READ`/`WRITE` (RetrieveReservation/CreateReservation)
  - `RESTAURANT_CHECKS_READ` (RetrieveCheck)
  - `PAYMENTS_WRITE_SHARED_ONFILE` (charge a "shared on file payment method")
  - `CHANNELS_CREATE`/`UPDATE`, `PAYOUTS_WRITE`
  - [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json); [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json)
- **Mobile Authorization API: no longer exists.** CreateMobileAuthorizationCode was marked DEPRECATED in the 2025-02-20 release and **removed in the 2026-05-20 release**. It existed to authorize the Reader SDK, which was retired on 2025-12-31 (see Q5) — [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json)

**Spec change log, 2024–2026 (from diffing release commits):** — [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json)
- 2024-02-22: Bulk Customers endpoints added. V1 ListPayments, RetrievePayment, ListRefunds, CreateRefund, ListSettlements and RetrieveSettlement removed.
- 2024-03-20: ADDON_CONFIGURATIONS scopes.
- 2024-04-17: RenewToken removed; PERMISSION_SETS scopes.
- 2024-06-04: Events API (beta).
- 2024-11-20: multipart endpoints added to the spec (CreateCatalogImage, UpdateCatalogImage beta, CreateDisputeEvidenceFile, CreateInvoiceAttachment).
- 2024-12-18: Team Jobs (beta).
- 2025-02-20: Mobile Authorization deprecated; DISCOUNT_CODES scopes.
- 2025-05-21: Timecards (GA) and Scheduled Shifts (beta) added; Shifts deprecated.
- 2025-06-18: webhook event definitions added to the spec.
- 2025-10-16: Channels (beta) and Transfer Orders (beta) plus transfer_order.* webhooks.
- 2026-05-20: Bank Account create/disable (beta); PAYOUTS_WRITE; Mobile Authorization removed.
- 2026-07-15: Inventory adjustment reasons (beta) and UpdateInventoryAdjustment; RetrieveInventoryTransfer removed.
- 2026-09-16: CaptureTransaction and VoidTransaction removed.
- Release tags in the spec repo: 2024-01-18, 02-22, 03-20, 04-17, 05-15, 06-04, 07-17, 08-21, 09-18, 10-17, 11-20, 12-18; 2025-01-23, 02-20, 03-19, 04-16, 05-21, 06-18, 07-16, 08-20, 09-24, 10-16; 2026-05-20, 07-15, 08-19, 09-16 — [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json)
- The Java SDK also has a `46.0.0.20260122` tag, so API version 2026-01-22 exists even though the spec repo has no release commit for it — [square-java-sdk tags](https://github.com/square/square-java-sdk/tags)

### Inferences
- Items from the requester's list that are confirmed current: every API they named exists **except "Mobile Authorization"**, which was removed in 2026. APIs they missed: **Transfer Orders, Channels, Vendors, Events, Reporting (new), Discount Codes (special access), Devices, Apple Pay, Cash Drawers, Order/Location/Merchant Custom Attributes** (several of these were listed). There is no AI-specific REST API. The MCP server is the AI surface.
- Large parts of the surface are still BETA: Orders UpdateOrder/PayOrder/CalculateOrder/CloneOrder, all Order/Location/Merchant custom attributes, Events, Vendors, Channels, Transfer Orders, Scheduled Shifts, Jobs, Subscriptions pause/swap, and Terminal Actions. A dispatch app that depends on UpdateOrder or PayOrder is building on beta endpoints.
- Endpoints most relevant to a mobile-detailing dispatch app:
  - Bookings (+ Booking Custom Attributes for vehicle and address details)
  - Customers (+ Custom Attributes)
  - Catalog (services and add-ons)
  - Orders, Payments, Cards on file, Invoices, Payment Links
  - Team, Labor Timecards and Scheduled Shifts (beta)
  - Locations, Webhooks
  - Mobile Payments SDK with Tap to Pay for technicians in the field
- Bookings seller-level writes require the seller to pay for Appointments Plus or Premium. This is a cost for every future multi-seller customer too.

### Gaps
- The per-API doc URLs could not be opened individually (developer.squareup.com is blocked). They follow the verified pattern `https://developer.squareup.com/reference/square/<api-name>-api`.
- I could not read the human-written changelog (developer.squareup.com/docs/changelog/connect), so release-note details beyond the spec diffs, such as field-level additions and the 2026-01-22 contents, are not captured.
- Exact Reporting API endpoint names (other than `/v1/load`) and whether it is still beta could not be confirmed.
- No public documentation was found for the Permission Sets, Reservations, Restaurant Checks, Add-on Configurations or "shared on file" APIs implied by the scopes.

---

## 2. SDKs, client libraries, developer tools, MCP/AI toolkit, API Explorer, Sandbox

### Takeaway
There are 7 official server client libraries (Node, Python, Java, .NET, PHP, Ruby, Go), all generated from the OpenAPI spec and all current for API version 2026-09-16. Client SDKs:
- **Web Payments SDK** for browser tokenization
- **In-App Payments SDK** for card entry in native or cross-platform apps
- **Mobile Payments SDK** for Square readers and Tap to Pay inside your own app; this is the Reader SDK's successor
- **Terminal API** for Square Terminal
- **Point of Sale API** for app-switching into Square POS

The **Reader SDK was retired on 2025-12-31**. Square ships an **MCP server**: a hosted remote server at `mcp.squareup.com/mcp` with OAuth sign-in, plus an open-source local server. No "Square CLI" was found.

### Cited Findings
**Server client libraries (latest versions found):**
| Language | Package | Latest version | Released |
|---|---|---|---|
| Node.js/TypeScript | `square` (npm) | 46.0.0 | 2026-09-15 — [npm square](https://www.npmjs.com/package/square) |
| Python | `squareup` (PyPI) | 46.0.0.20260916 | — [PyPI squareup](https://pypi.org/project/squareup/) |
| Java | `com.squareup:square` | 48.0.0.20260916 (git tag) | — [square-java-sdk tags](https://github.com/square/square-java-sdk/tags) |
| .NET | `Square` (NuGet) | 47.0.0 | — [NuGet Square](https://www.nuget.org/packages/Square) |
| PHP | `square/square` (Packagist) | 47.0.0.20260916 | — [Packagist square/square](https://packagist.org/packages/square/square) |
| Ruby | `square.rb` (RubyGems) | 48.0.0.20260916 | — [RubyGems square.rb](https://rubygems.org/gems/square.rb) |
| Go | `github.com/square/square-go-sdk/v5` | v5.0.0 | 2026-09-15 — [Go module square-go-sdk v5](https://pkg.go.dev/github.com/square/square-go-sdk/v5) |
- Version-number suffixes (e.g. `.20260916`) encode the Square API version each SDK targets — [PyPI squareup](https://pypi.org/project/squareup/); [square-java-sdk tags](https://github.com/square/square-java-sdk/tags)
- The spec carries `x-fern-global-headers`, which shows the SDKs are generated with the Fern toolchain from this spec. The spec repo also contains `generate-sdks` tooling and a README — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)

**Web Payments SDK (browser):**
- Produces payment tokens from credit and debit cards, gift cards, digital wallets (Apple Pay, Google Pay), ACH bank transfer, Afterpay, and Cash App Pay. The Payments API accepts every one of these tokens as `source_id` — [Web Payments SDK overview](https://developer.squareup.com/docs/web-payments/overview); [Online payment options](https://developer.squareup.com/docs/online-payment-options)
- ACH uses Plaid for bank authentication and is US-only. It launched as a beta; the current status was not re-verified — [2021-05-13 WPS changelog](https://developer.squareup.com/docs/changelog/webpaymentsdk/2021-05-13); [Blog: Web Payments SDK and ACH Beta](https://developer.squareup.com/blog/web-payments-sdk-and-ach-beta/)
- SCA/3DS: `payments.verifyBuyer()` returns a `verification_token` that "encapsulate[s] customer device information and 3-D Secure challenge results", which is passed to CreatePayment — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- From 2025-10-01, all Web Payments SDK implementations must use Secure Contexts (HTTPS) and a proper Content Security Policy — [Web Payments SDK overview](https://developer.squareup.com/docs/web-payments/overview)
- It replaced the legacy SqPaymentForm, and a migration guide exists — [Migrate to Web Payments SDK](https://developer.squareup.com/docs/web-payments/migrate)
- npm packages: `@square/web-sdk` 2.3.0 (2026-08-18) and `@square/web-payments-sdk-types` 1.87.2 (2026-10-27) — [npm @square/web-sdk](https://www.npmjs.com/package/@square/web-sdk); [npm @square/web-payments-sdk-types](https://www.npmjs.com/package/@square/web-payments-sdk-types)

**In-App Payments SDK (native card entry and tokenization; active):**
- The Payments API docs name the Web Payments SDK and In-App Payments SDK as the ways to generate payment tokens — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- iOS repo latest tag 1.6.7 — [square/in-app-payments-ios](https://github.com/square/in-app-payments-ios)
- React Native plugin `react-native-square-in-app-payments` 2.1.2 (2026-09-25) — [npm](https://www.npmjs.com/package/react-native-square-in-app-payments)
- Flutter `square_in_app_payments` 2.1.0 (2026-10-08) — [pub.dev](https://pub.dev/packages/square_in_app_payments)
- An Android SDK also exists. Its version could not be verified because the repo name probed did not resolve.

**Mobile Payments SDK (Square hardware and Tap to Pay inside your own app; GA):**
- GA was announced on Square's developer blog — [Blog: Announcing Mobile Payments SDK GA](https://developer.squareup.com/blog/announcing-mobile-payments-sdk-ga-and-new-terminal-api-features/)
- Available for sellers in the **US, Canada and Australia** — [Take Payments on Hardware](https://developer.squareup.com/docs/in-person-payment-options)
- Tap to Pay on iPhone requires iPhone XS or newer on iOS 16.7+, does not work on iPad, and the seller must link their Square account to an Apple ID — [MPSDK iOS Tap to Pay](https://developer.squareup.com/docs/mobile-payments-sdk/ios/tap-to-pay)
- Tap to Pay on Android: no other Square readers may be paired during the payment. From Android SDK 2.1.0, developers must give Square the app signature before taking production payments — [MPSDK Android Tap to Pay](https://developer.squareup.com/docs/mobile-payments-sdk/android/tap-to-pay); [2025-02-20 mobile changelog](https://developer.squareup.com/docs/changelog/mobile-logs/2025-02-20)
- Latest tags: iOS 2.7.0, Android 2.7.0, React Native plugin v2026.10.1, Flutter plugin v2026.10.2 — [square/mobile-payments-sdk-ios](https://github.com/square/mobile-payments-sdk-ios); [square/mobile-payments-sdk-android](https://github.com/square/mobile-payments-sdk-android); [square/mobile-payments-sdk-react-native](https://github.com/square/mobile-payments-sdk-react-native); [square/mobile-payments-sdk-flutter](https://github.com/square/mobile-payments-sdk-flutter)

**Reader SDK: RETIRED 2025-12-31.**
- Deprecated, no new releases, Mobile Payments SDK is the successor. Some features have no direct equivalent and need a custom UI — [Forum: Reader SDK Deprecation and Retirement](https://developer.squareup.com/forums/t/action-required-reader-sdk-deprecation-and-retirement/20750); [2025-01-23 changelog](https://developer.squareup.com/docs/changelog/connect-logs/2025-01-23); [Forum: Retirement of Reader SDK](https://developer.squareup.com/forums/t/retirement-of-reader-sdk/24976)
- Last plugin releases: React Native `react-native-square-reader-sdk` 1.4.3 (2023-01-20) and Flutter `square_reader_sdk` 4.0.1 (2024-08-29) — [npm](https://www.npmjs.com/package/react-native-square-reader-sdk); [pub.dev](https://pub.dev/packages/square_reader_sdk)

**Point of Sale API (app-switch):** Your app hands off to the Square POS app to take an in-person payment, and control returns to your app afterward — [POS API for developers](https://squareup.com/ca/en/the-bottom-line/selling-anywhere/pos-api-for-developers-square); [POS API what it does](https://connect.squareup.com/docs/pos-api/what-it-does)

**Terminal API:** see Q1 (REST control of Square Terminal; pairing via the Devices API) — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)

**Square MCP server / AI toolkit:**
- Square hosts a remote MCP server at `https://mcp.squareup.com/mcp` with OAuth sign-in (no token handling), and recommends it. The legacy SSE endpoint `https://mcp.squareup.com/sse` is still served — [MCP-REPO](https://github.com/square/square-mcp-server)
- The local open-source server is labeled "(Beta)". It runs with `npx square-mcp-server start` (npm 0.1.2, 2025-04-25) and is configured with env vars `ACCESS_TOKEN`, `SANDBOX`, `PRODUCTION`, `DISALLOW_WRITES` (read-only mode) and `SQUARE_VERSION` — [MCP-REPO](https://github.com/square/square-mcp-server); [npm square-mcp-server](https://www.npmjs.com/package/square-mcp-server)
- It exposes only 3 meta-tools: `get_service_info`, `get_type_info` and `make_api_request`. Service modules: applepay, bankaccounts, bookingcustomattributes, bookings, cards, cashdrawers, catalog, checkout, customercustomattributes, customergroups, customers, customersegments, devices, disputes, events, giftcardactivities, giftcards, inventory, invoices, labor, locationcustomattributes, locations, loyalty, merchantcustomattributes, merchants, oauth, ordercustomattributes, orders, payments, payouts, refunds, sites, snippets, subscriptions, team, terminal, vendors, webhooksubscriptions — [MCP-REPO](https://github.com/square/square-mcp-server)
- Square docs list Claude.ai, Claude Desktop, Goose, Cursor, Windsurf (and ChatGPT, per the README) as supported clients — [Square MCP docs](https://developer.squareup.com/docs/mcp.md); [MCP-REPO](https://github.com/square/square-mcp-server)

**API Explorer:** an interactive web app that builds and sends requests against Sandbox or production and generates code in cURL and the SDK languages. It covers only public REST APIs, not the Reader SDK, POS API, In-App Payments SDK or Web Payments SDK — [API Explorer docs](https://developer.squareup.com/docs/devtools/api-explorer); [API Explorer](https://developer.squareup.com/explorer/square)

**Other developer tools:** Developer Console (credentials and app settings), Sandbox, API Logs, and Postman collections — [Square Developer Tools](https://developer.squareup.com/docs/devtools/overview)

**Sandbox test values:**
- Nonces: `cnon:card-nonce-ok` (success), `cnon:card-nonce-declined`, `cnon:card-nonce-rejected-cvv`, etc. Test Visa 4111 1111 1111 1111 with any future expiry, CVV and postal code. Real cards are not accepted. Sandbox nonces fail in production — [Sandbox test values](https://developer.squareup.com/docs/testing/test-values); [Forum example](https://developer.squareup.com/forums/t/createpayment-endpoint-of-square-api/430/2)
- **Card-present testing is not supported in Sandbox** per the current Sandbox Payments page. Older docs disagree — [Sandbox Payments](https://developer.squareup.com/docs/devtools/sandbox/payments)

**OpenAPI spec:** the full spec is public in `square/connect-api-specification`, which makes custom code generation possible — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)

### Inferences
- For Sheen's dispatch app: Web Payments SDK (customer booking and deposit page) + Cards API (card on file) + Mobile Payments SDK with Tap to Pay (technicians charging in the driveway). This avoids staff ever opening Square POS. The POS API (app-switch) would contradict the "never open Square" goal.
- The MCP server's generic `make_api_request` tool means it can technically reach any REST endpoint in the SDK. Its service list does not include Channels, Transfer Orders or Reporting, so it likely lags the newest APIs (inferred from the service file list, not tested).
- The Reader SDK is dead. Any legacy tutorial using it, or Mobile Authorization codes, is obsolete.

### Gaps
- No evidence of an official "Square CLI" was found, and there is no npm `@square/square-cli`. Treat as non-existent unless shown otherwise.
- The Android In-App Payments SDK version and the Point of Sale API's current lifecycle status (active or deprecated) were not verified.
- Regional availability of Afterpay/Clearpay and Cash App Pay in the Web Payments SDK was not verified. Cash App Pay is likely US-only and Afterpay US/CA/AU/UK as Clearpay, but this is unverified.
- The Java version was confirmed only from GitHub tags, because Maven Central was blocked.

---

## 3. Auth & platform: tokens, OAuth scopes and expiry, app fees, App Marketplace, versioning, rate limits, idempotency, pagination, webhooks, Events API

### Takeaway
- **Auth:** single-seller apps can use a personal access token (PAT). Multi-seller apps must use OAuth, either the code flow (server apps) or PKCE (mobile and SPA clients). Access tokens last 30 days. Code-flow refresh tokens never expire until revoked; PKCE refresh tokens are single-use and last 90 days.
- **Monetization:** platforms can take `app_fee_money` of up to 90% of each payment, which needs the `PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS` scope.
- **Versioning:** dated `Square-Version` header, with at least 12 months between deprecation and retirement. Retired endpoints return 410.
- **Rate limits:** not published; expect 429 `RATE_LIMITED`.
- **Webhooks:** HMAC-SHA256 signed, with retries using exponential backoff (24h or 72h, the docs conflict). The Events API backfills 28 days.

### Cited Findings
**Tokens / OAuth**
- OAuth access tokens expire after **30 days**. With the **code flow**, refresh tokens are valid until access is revoked and can mint several active access tokens. With **PKCE**, ObtainToken returns a **single-use refresh token that expires in 90 days** (rotate and store each new one). PKCE "must be used by any client that cannot safely store secrets" (mobile apps, SPAs, desktop apps). Losing a refresh token means repeating the whole authorization flow — [OAuth overview](https://developer.squareup.com/docs/oauth-api/overview); [How OAuth works](https://developer.squareup.com/docs/oauth-api/how-it-works)
- `ObtainToken` grant types: `authorization_code`, `refresh_token`, and legacy `migration_token`.
  - `short_lived: true` returns a token that expires in 24 hours.
  - On refresh, `scopes` can narrow permissions to the intersection with the original grant.
  - `code_verifier` is required for PKCE.
  - `RetrieveTokenStatus` returns `scopes` and `expires_at` ("Empty if the token never expires", which applies to PATs).
  - [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- Revocation emits the `oauth.authorization.revoked` webhook — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- PAT-only APIs: Webhook Subscriptions and Events, because they belong to the application rather than a seller — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- **Complete OAuth scope list (2026-09-16 spec):** — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
  - ADDON_CONFIGURATIONS_READ/WRITE
  - APPOINTMENTS_READ/WRITE, APPOINTMENTS_ALL_READ/WRITE, APPOINTMENTS_BUSINESS_SETTINGS_READ
  - BANK_ACCOUNTS_READ
  - CASH_DRAWER_READ
  - CHANNELS_CREATE/READ/UPDATE
  - CUSTOMERS_READ/WRITE
  - DEVICES_READ, DEVICE_CREDENTIAL_MANAGEMENT
  - DISCOUNT_CODES_READ/WRITE
  - DISPUTES_READ/WRITE
  - EMPLOYEES_READ/WRITE (Team API)
  - GIFTCARDS_READ/WRITE
  - INVENTORY_READ/WRITE
  - INVOICES_READ/WRITE
  - ITEMS_READ/WRITE (Catalog)
  - LOYALTY_READ/WRITE
  - MERCHANT_PROFILE_READ/WRITE
  - ONLINE_STORE_SITE_READ, ONLINE_STORE_SNIPPETS_READ/WRITE
  - ORDERS_READ/WRITE
  - PAYMENTS_READ/WRITE, PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS, PAYMENTS_WRITE_IN_PERSON, PAYMENTS_WRITE_SHARED_ONFILE
  - PAYOUTS_READ/WRITE
  - PERMISSION_SETS_READ/WRITE
  - RESERVATIONS_READ/WRITE
  - RESTAURANT_CHECKS_READ
  - SETTLEMENTS_READ
  - SUBSCRIPTIONS_READ/WRITE
  - TIMECARDS_READ/WRITE, TIMECARDS_SETTINGS_READ/WRITE
  - VENDOR_READ/WRITE

**App fees (platform monetization)**
- `app_fee_money` must be ≤ **90%** of the payment total, in the smallest currency unit, and in the seller's currency. "The application must be from a developer account in the same country and using the same currency code as the seller." — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- `app_fee_allocations` (new) splits the fee: allocations must sum to `app_fee_money` and must include every party, the developer among them — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- Up to 3 parties are supported through `app_fee_allocations`.
  - Fees can be set on CreatePayment, or on UpdatePayment while the payment is APPROVED or PENDING.
  - **No fees on CASH or EXTERNAL payments.**
  - The seller must grant `PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS`.
  - On a refund, Square takes the app fee portion back from the designated accounts.
  - You need a Square account in each country where you process payments.
  - Australia has a separate PDS for the Payments API Application Fee (PAAF) service.
  - [Collect Application Fees](https://developer.squareup.com/docs/payments-api/take-payments-and-collect-fees); [Additional considerations](https://developer.squareup.com/docs/payments-api/collect-fees/additional-considerations)
- Per staff on the forum, `PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS` needs no separate approval process — [Forum: Payments write additional recipients](https://developer.squareup.com/forums/t/payments-write-additional-recipients/27139)

**App Marketplace / partner program**
- To list, a developer must (1) be approved as a Square app partner and (2) meet the technical and quality requirements, including the App Marketplace API Usage Requirements — [Publish to App Marketplace](https://developer.squareup.com/docs/app-marketplace); [General requirements](https://developer.squareup.com/docs/app-marketplace/requirements/general)
- Submission happens in the Developer Dashboard by accepting the App Marketplace Partner Terms; a custom partnership agreement supersedes them. Square runs integration and QA review before launch. Larger partners can get a partner manager and profit sharing — [Publish to App Marketplace](https://developer.squareup.com/docs/app-marketplace); [App partner program](https://squareup.com/us/en/partnerships/app-partner); [Listing best practices](https://developer.squareup.com/docs/app-marketplace/listing-best-practices)
- A requirements changelog exists, with entries dated 2024-06-24 and 2024-09-19 — [Requirements changelog 2024-09-19](https://developer.squareup.com/docs/changelog/requirements/change-log/2024-09-19)

**Versioning / lifecycle**
- The date-based `Square-Version` header pins request and response behavior. The current version is 2026-09-16 — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- APIs are typically deprecated **at least 12 months** before retirement. Deprecated APIs still work but are discouraged. **Retired endpoints return 410 GONE regardless of `Square-Version`** — [Square API Lifecycle](https://developer.squareup.com/docs/build-basics/api-lifecycle); [Forum: API retirement policy](https://developer.squareup.com/forums/t/api-retirement-policy/10441)
- A community thread says a deprecated API with a replacement enters maintenance once the replacement is GA, for at least 6 months — [Forum thread](https://developer.squareup.com/forums/t/api-versions-and-deprecation-to-retired-timeframe/3846/2)

**Rate limits**
- Square publishes no numbers. Clients get HTTP 429 `RATE_LIMITED`. Limits are per application and may vary by endpoint. Recommended handling: exponential backoff with jitter, batch endpoints, caching, and contacting Developer Support for higher volume — [Handling errors](https://developer.squareup.com/docs/build-basics/general-considerations/handling-errors); [Forum: rate limits for multi-tenant OAuth app](https://developer.squareup.com/forums/t/rate-limits-for-a-multi-tenant-oauth-app-how-do-they-scale-with-connected-merchants/26925)

**Idempotency & pagination**
- Create-style requests take an `idempotency_key`, e.g. CreatePayment: "must be unique for every CreatePayment request". `CancelPaymentByIdempotencyKey` exists to void a payment whose create call timed out — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- Pagination is cursor-based: pass back the `cursor` from the previous response. ListPayments `limit` defaults to and maxes at 100; legacy ListTransactions maxes at 50 per page — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)

**Webhooks**
- **149 event types in 26 families** in the 2026-09-16 spec. BETA and DEPRECATED events are marked below — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
  - bank_account: created, disabled, verified
  - booking: created, updated; custom_attribute(_definition).owned/visible.* (10)
  - card: created, updated, disabled, forgotten, automatically_updated
  - catalog: version.updated
  - customer: created, updated, deleted; custom_attribute(_definition).owned/visible.* (current); the un-prefixed and `.public.*` custom-attribute events are DEPRECATED
  - device: code.paired; created [BETA]
  - dispute: created, state.updated, evidence.created, evidence.deleted; state.changed, evidence.added, evidence.removed [DEPRECATED]
  - gift_card: created, updated, customer_linked, customer_unlinked, activity.created, activity.updated
  - inventory: count.updated
  - invoice: created, updated, published, canceled, deleted, payment_made, refunded, scheduled_charge_failed
  - job: created, updated [BETA]
  - labor: timecard.created, updated, deleted; scheduled_shift.created, updated, deleted, published [BETA]; shift.* [DEPRECATED]
  - location: created, updated, custom_attribute(_definition).* [all BETA]
  - loyalty: account.created, updated, deleted; event.created; program.created, updated; promotion.created, updated
  - merchant: custom_attribute(_definition).* [BETA]
  - oauth: authorization.revoked
  - online_checkout: location_settings.updated, merchant_settings.updated [BETA]
  - order: created, updated, fulfillment.updated, custom_attribute(_definition).* [all BETA]
  - payment: created, updated
  - payout: sent, paid, failed
  - refund: created, updated
  - subscription: created, updated
  - team_member: created, updated, wage_setting.updated
  - terminal: checkout.created, updated; refund.created, updated; action.created, updated [BETA]
  - transfer_order: created, updated, deleted [BETA]
  - vendor: created, updated [BETA]
- Each event carries the OAuth scope it needs, e.g. payment.* requires PAYMENTS_READ and payout.* requires PAYOUTS_READ or SETTLEMENTS_READ — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- **Signature:** header `x-square-hmacsha256-signature` (HMAC-SHA256). Each subscription has its own signature key, rotatable via UpdateWebhookSubscriptionSignatureKey. The signed payload is the notification URL concatenated with the raw body, base64-encoded (per Webhook Relay; Hookdeck says the concatenation order is undocumented). The legacy `x-square-signature` (HMAC-SHA1) is being retired — [Subscribe to events](https://developer.squareup.com/docs/webhooks/step2subscribe); [Webhook Relay guide](https://webhookrelay.com/verify-square-webhook-signature/); [Hookdeck guide](https://hookdeck.com/webhooks/platforms/guide-to-square-webhooks-features-and-best-practices)
- **Retries:** exponential backoff (first retry about 1 minute, second about 2 minutes). Headers `square-retry-number` and `square-retry-reason` (`http_timeout` after 10s with no response, `http_error`, `ssl_error`, `other_error`). **Retry window conflict:** the Webhooks overview says up to **24 hours**, the "how it works" page says up to **72 hours**. Hookdeck says 11 retries over 24 hours — [Webhooks overview](https://developer.squareup.com/docs/webhooks/overview); [Webhooks how it works](https://developer.squareup.com/docs/webhooks/how-it-works); [Hookdeck guide](https://hookdeck.com/webhooks/platforms/guide-to-square-webhooks-features-and-best-practices)
- **Events API:** searches the last 28 days, works as a disaster-recovery and reconciliation mechanism for missed webhooks, and is still **BETA** — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)

### Inferences
- Multi-seller SaaS for other detailers:
  - Use the OAuth code flow from a backend (refresh tokens don't expire).
  - Refresh access tokens proactively, well before day 30.
  - Subscribe to `oauth.authorization.revoked`.
  - Request `PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS` up front if you plan to charge app fees.
  - Webhook subscriptions are app-level (one subscription covers all authorized sellers), managed with the app's PAT.
- App fees only make sense when charging on behalf of another seller with that seller's OAuth token. A sole operator (Sheen itself) would just use a PAT. The documentation rule "app fee requires OAuth" was not directly quoted in what I could reach, so treat it as inferred.
- Because the webhook retry window is ambiguous, design reconciliation (Events API SearchEvents, or periodic List/Search calls) as a first-class feature.

### Gaps
- The official webhook validation page (`/docs/webhooks/step3validate`) and the exact retry count and window could not be read.
- The full list of App Marketplace technical requirements, the revenue-share terms and listing fees were not found.
- No published per-endpoint rate limits exist.

---

## 4. What third-party apps CANNOT do (features with no public API)

### Takeaway
- **No public API found:** Square Marketing campaigns, Square Messages, Square Payroll (beyond Team/Labor data), Square Banking/Checking, Square Loans/Capital, the Square Online site editor (only Sites list + Snippets), Photo Studio, team permissions and passcodes, loyalty program creation, and customer segment creation.
- **Gated access:** Discount codes (special request) and card-present Sandbox testing (not supported).
- **Reports:** partly opened up by the new Reporting API (beta).

### Cited Findings
- **Square Marketing:** "at this time there isn't an API that can pull the marketing campaign data" (staff answer, roughly 2022) — [Forum: Square Marketing API - Campaigns](https://developer.squareup.com/forums/t/square-marketing-api-campaigns/8255)
- Customer Groups are presented as a way to manage *your own* marketing email schedule, not Square Marketing — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- **Square Messages:** a feature request for a Messages API got only "no public roadmap" from staff — [Forum: Square Messages API](https://developer.squareup.com/forums/t/square-messages-api/3411)
- **Payroll:** no payroll API. Community answers point to the Team and Labor APIs, which are not payroll — [Square Community: Do you have payroll api?](https://community.squareup.com/t5/Staff-Payroll/Do-you-have-payroll-api/m-p/663145); [Forum feature requests](https://developer.squareup.com/forums/c/feature-requests/8)
- The Team API is positioned for syncing data into payroll systems — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- **Team permissions and passcodes:** "still need to be done directly through the Square Dashboard" — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- **Loyalty program setup:** one program per seller, "created and managed from the Seller Dashboard". The API manages accounts, points, promotions and rewards only — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- **Customer Segments:** read-only, because sellers create segments in the Dashboard or POS — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- **Square Online:** only ListSites plus Snippets (head injection; not on checkout pages), and both are under an "early access program". There is no API for the site editor, pages or Online store settings beyond the checkout location/merchant settings (beta) — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- **Banking / Loans:** no API found. Bank Accounts lists linked accounts and, in beta, can create or disable on-file accounts; Payouts is read-only — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- One forum question notes app-fee funds didn't show in the Banking balance — [Forum: oauth-api topics](https://developer.squareup.com/forums/tag/oauth-api/24)
- **Reports:** historically unavailable, but the **Reporting API (open beta)** now exposes cube-based sales, payments, customer and catalog metrics — [Reporting API overview](https://developer.squareup.com/docs/reporting-api/overview); [Forum: Reporting API Open Beta](https://developer.squareup.com/forums/t/reporting-api-open-beta/25897)
- **Discount codes:** special request only, case by case, with no support guarantee — [Forum: Discount Codes API access](https://developer.squareup.com/forums/t/request-for-discount-codes-api-access-square-vouchers/27905)
- **Terminal refunds:** Interac in Canada only — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- **Offline payments:** `offline_payment_details` on CreatePayment is "intended for internal 1st-party callers only" — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- **Sandbox:** card-present testing not supported — [Sandbox Payments](https://developer.squareup.com/docs/devtools/sandbox/payments)
- **Bookings:** seller-level booking writes fail unless the seller subscribes to Appointments Plus or Premium — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- **Orders with non-Square payment providers:** Square charges a transaction fee — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)

### Inferences
- A "replace Square UI entirely" app will still need some one-time Dashboard visits:
  - Loyalty program setup
  - Customer segment definitions
  - Team permissions and passcodes
  - Bank account linking (create is beta)
  - Appointments subscription
  - Square Marketing, Messages, Payroll and Capital if used
- Customer SMS and email messaging must be built in-house, e.g. with Twilio or SendGrid, because Square Messages has no API.
- Square sends its own invoice emails (Invoices API) and receipts. Whether every Square-originated customer communication can be suppressed was not verified.

### Gaps
- No source specifically confirmed or denied APIs for Photo Studio, Square Banking (Checking/Savings), Square Loans/Capital, Square Payroll in 2026, or Square Marketing in 2026. The forum evidence for Marketing and Messages is several years old.
- Whether Square-sent customer notifications (booking confirmations, receipts) can be fully disabled through the API was not researched.

---

## 5. Deprecations and retirements (with dates)

### Takeaway
- **Already gone:** Connect v1 Payments/Refunds/Settlements (removed 2024-02), OAuth RenewToken (2024-04), Mobile Authorization API (2026-05), Reader SDK (2025-12-31), Transactions Capture/Void (2026-09), Inventory RetrieveInventoryTransfer (2026-07).
- **Deprecated but present:** Transactions List/Retrieve, Employees v2, v1 Online Orders, Labor Shifts (deprecated 2025-05-21; documented as retired in version 2026-05-21), EmployeeWages, Customers card endpoints, CreateCheckout, ListLoyaltyPrograms, old Inventory URLs, and several webhook events.
- **Customer Groups:** no change found.

### Cited Findings
| Item | Status / date | Replacement | Source |
|---|---|---|---|
| Transactions API (Charge etc.) | Superseded 2019-08-15. List/Retrieve deprecated; **Capture/Void removed in the 2026-09-16 spec** | Payments + Refunds + Orders | [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json); [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json) |
| Connect v1 Payments, Refunds, Settlements | Removed from spec 2024-02-22 | Payments, Refunds, Payouts | [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json) |
| Connect v1 Online Store Orders (V1ListOrders, V1RetrieveOrder, V1UpdateOrder) | Deprecated, still in spec | Orders API | [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json) |
| V1 Webhooks | Deprecated | V2 webhooks / Webhook Subscriptions API | [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json) |
| v1 Employees / Items / Timecards / Cash drawer endpoints | Spec keeps a v1→v2 mapping table (V1Employees → Team/Labor/CashDrawers; V1Items → Catalog/Inventory) | v2 APIs | [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json); [Migrate from v1](https://developer.squareup.com/docs/migrate-from-v1) |
| Employees API (v2) | Deprecated as of 2020-08-26 | Team API | [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Labor ListEmployeeWages / GetEmployeeWage | Deprecated | ListTeamMemberWages / GetTeamMemberWage | [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Labor Shift endpoints, Shift types, `labor.shift.*` webhooks | **Deprecated in version 2025-05-21; documented as "Retired in version 2026-05-21."** Timecards require Square-Version ≥ 2025-05-21 | Timecard endpoints `/v2/labor/timecards/...` + `labor.timecard.*` webhooks; Scheduled Shifts (beta) for scheduling | [Labor API docs (search snippet)](https://developer.squareup.com/docs/labor-api/what-it-does?preview=true); [2025-05-21 changelog](https://developer.squareup.com/docs/changelog/connect-logs/2025-05-21); [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json) |
| OAuth RenewToken | Removed from spec 2024-04-17 | Refresh tokens via ObtainToken | [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json) |
| Mobile Authorization API (CreateMobileAuthorizationCode) | Deprecated in the 2025-02-20 spec; **removed in the 2026-05-20 spec** | Mobile Payments SDK (OAuth) | [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json) |
| Reader SDK (iOS/Android/React Native/Flutter) | Deprecated in early 2025; **retired 2025-12-31** | Mobile Payments SDK | [2025-01-23 changelog](https://developer.squareup.com/docs/changelog/connect-logs/2025-01-23); [Forum: Reader SDK Deprecation and Retirement](https://developer.squareup.com/forums/t/action-required-reader-sdk-deprecation-and-retirement/20750) |
| Customers CreateCustomerCard / DeleteCustomerCard | Deprecated | Cards API | [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Checkout CreateCheckout | Deprecated | CreatePaymentLink (payment links) | [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Loyalty ListLoyaltyPrograms | Deprecated | RetrieveLoyaltyProgram | [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Inventory legacy URL forms + RetrieveInventoryChanges | Deprecated | BatchChangeInventory etc. at new URLs | [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Inventory RetrieveInventoryTransfer | Removed in the 2026-07-15 spec | (Transfer Orders API, beta; inferred) | [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json) |
| Webhooks: dispute.state.changed, dispute.evidence.added, dispute.evidence.removed | Deprecated | dispute.state.updated, dispute.evidence.created, dispute.evidence.deleted | [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Webhooks: customer.custom_attribute(_definition).{created,updated,deleted} and `.public.*` | Deprecated | `.owned.*` / `.visible.*` variants | [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json) |
| Legacy Reporting API | Retired | Payments API app fees / new Reporting API | [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json) |
| SqPaymentForm | Replaced | Web Payments SDK | [Migrate to Web Payments SDK](https://developer.squareup.com/docs/web-payments/migrate) |
| Legacy webhook signature `x-square-signature` (HMAC-SHA1) | Being retired | `x-square-hmacsha256-signature` | [Webhook Relay guide](https://webhookrelay.com/verify-square-webhook-signature/) |
| Customer Groups API | **No deprecations or changes found** across the 2024-01 → 2026-09 spec diffs | — | [SPEC-HISTORY](https://github.com/square/connect-api-specification/commits/master/api.json) |

### Inferences
- Conflict to flag: the Labor docs say Shift endpoints were "retired in version 2026-05-21," yet the 2026-09-16 spec still lists them as DEPRECATED, and the lifecycle page says retired endpoints return 410 regardless of version. The likely explanation is that the endpoints are blocked for requests using Square-Version ≥ 2026-05-20/21 but kept in the spec for older pinned versions. Treat Shifts as unusable for new code either way.
- A Square-Version of **2026-05-20** appears in the spec repo, while the Labor docs reference **2026-05-21**. The exact date of that version is slightly ambiguous.

### Gaps
- Exact retirement dates for v1 Online Store Orders, the Transactions List/Retrieve endpoints, the Employees v2 API and the legacy webhook signature could not be confirmed from the official migration page, which was unreachable.

---

## 6. Costs: API access vs. payment processing fees (cross-reference only)

### Takeaway
- **API usage:** I found no per-call or subscription fee for the Connect APIs, SDKs, Sandbox or MCP server. Square earns through payment processing and seller software subscriptions. The one documented API-specific charge: **using the Orders API with a non-Square payment provider incurs a transaction fee**.
- **US processing rates** (third-party aggregators; Square's own pricing page was unreachable):
  - Online/API card-not-present: 2.9% + 30¢ on Plus/Premium, and 3.3% + 30¢ on the Free plan per most 2026 sources (disputed)
  - ACH: 1%, $1 minimum (caps vary by source)
  - Afterpay: 6% + 30¢
  - Cash App Pay: unresolved

### Cited Findings
- "If you use the Square Orders API with a non-Square payments provider, Square charges a transaction fee." — [SPEC](https://github.com/square/connect-api-specification/blob/master/api.json)
- Online/invoice card payments: Free plan 3.3% + $0.30, Plus and Premium 2.9% + $0.30 (most 2026 sources). Some sources still list 2.9% + 30¢ for all plans — [Checkout Page: Square fees 2026](https://checkoutpage.com/blog/square-fees); [KORONA POS: Square fees 2026](https://koronapos.com/blog/are-square-pos-fees-too-high/); contradicted by [Guardian Payments 2026](https://guardianpaymentspos.com/blogs/news/square-processing-fees-explained-what-youll-actually-pay-in-2026)
- ACH bank transfer: 1% with a $1 minimum. One source says there is no cap on the Free plan, a $10 cap on Plus/Premium invoices, and a $5 cap for API-based ACH — [Checkout Page fee calculator](https://checkoutpage.com/tools/square-fee-calculator)
- Afterpay: 6% + $0.30 (sources agree) — [Checkout Page fee calculator](https://checkoutpage.com/tools/square-fee-calculator); [QuickSync: Square fees 2026](https://quicksync.pro/blog/square-fees/)
- Cash App Pay: sources conflict. One says 2.6% + 15¢ (the in-person rate), another says it matches the transaction type (2.9% + 30¢ online) — [Checkout Page: Square fees 2026](https://checkoutpage.com/blog/square-fees); [Merchant Insiders: Square fees 2026](https://merchantinsiders.com/blogs/square-fees/)
- Worked example: a $100 online payment costs about $3.60 on the Free plan, $1.00 by ACH and $6.30 by Afterpay — [Checkout Page fee calculator](https://checkoutpage.com/tools/square-fee-calculator)
- The POS API page notes card-present rates differ by region — [POS API for developers](https://squareup.com/ca/en/the-bottom-line/selling-anywhere/pos-api-for-developers-square)

### Inferences
- For Sheen (US, card-not-present booking deposits plus card-present Tap to Pay in the field), the cost model is Square's processing rates plus any seller software subscriptions (e.g. Appointments Plus/Premium, needed for seller-level Bookings API writes). There is no extra charge for using the API.
- If the app is resold to other detailers, platform revenue comes from `app_fee_money` (≤ 90% cap), which sits on top of Square's processing fee.

### Gaps
- Square's official US pricing page (squareup.com/us/en/pricing) and the Square Developer pricing/FAQ could not be fetched, so the "API is free" claim and every rate above are unverified against a primary Square source. Rates should be confirmed on squareup.com before being used in a decision.
- Per-API seller subscription prerequisites were not fully researched: which APIs need Square Loyalty, Appointments Plus/Premium, Square Payroll, Square for Retail Plus (Vendors/Transfer Orders?) and so on. Only Bookings (Appointments Plus/Premium) and Loyalty (Square Loyalty subscription) are documented in the spec.
- The App Marketplace revenue share and listing fees were not found.
