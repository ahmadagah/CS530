# Square Team Management, Scheduling, Time Tracking, Tips/Commissions & Payroll — US catalog (as of 2026-10-31)

> **How these notes were sourced (read first).** `squareup.com` and `developer.squareup.com` were blocked from direct fetching in this research session (proxy refused the connection). Facts about Square's marketing, pricing and Support Center pages come from **search-engine excerpts of those official pages** (URLs cited). They were not read in full. Treat every price as "official page, as indexed; page date not visible" unless noted. **API facts are primary**: they come from Square's official OpenAPI spec, `square/connect-api-specification` on GitHub (`api.json`, last commit 0689c90 on 2026-09-15, default `Square-Version` 2026-09-16), cloned and parsed locally. Third-party reviews are used only to cross-check and are flagged.
>
> **Premise correction:** Team Plus was not "formerly Square Shifts". Square Shifts (with a Shifts Plus tier) is a separate scheduling and time-tracking subscription. Team Plus was renamed **Advanced Access** in the US on 2024-03-27, and Advanced Access now appears to be bundled into the Square Plus and Premium POS plans. Details are in Q1.

## Q1. Square Team free tier vs paid tiers: what each includes, plan names and prices

### Takeaway
Basic team management is free at any team size: profiles, one team-wide permission set, a single wage per person, clock in/out, breaks, the Square Team app, and basic scheduling. Square Shifts Free is free for up to 5 team members. Paid features come in two overlapping US paid layers, and I could not confirm whether Square still sells each one standalone:
- **Advanced Access** (formerly Team Plus): custom permission sets, multiple wages, and sales attribution by team member. It was $35 per month per location on an older Square page. Square's current Advanced Access page says it is "included with Square Plus ($49/mo per location) or Square Premium ($149/mo per location)".
- **Shifts Plus**: shift swaps, self-set availability, geofenced clock-in, auto clock-out, blocking early clock-ins, and the labor-vs-sales report. It costs "from $4 per team member (incl. owner) per month".

### Cited Findings

**Plans and prices (US)**
- Square Team Management (free tier) is free no matter how many team members you add. Team Plus is listed at **$35 per month per location** with a **30-day free trial**. The page is undated. — [Square Team Management page](https://squareup.com/us/en/point-of-sale/team-management)
- Team Plus adds custom permissions, team member badges, reporting with employee attribution, and more. Its comparison table marks "Sales reporting by team member" as Team Plus only. — [Square Team Management page](https://squareup.com/us/en/point-of-sale/team-management); [Square UK team-management features (comparison table)](https://squareup.com/gb/en/point-of-sale/team-management/features)
- **Rename:** In the US, Team Plus was renamed **Advanced Access** starting **2024-03-27**, with no pricing or packaging changes at that time. Legacy Team Plus subscribers kept the name. — [Square Community: "Team Plus renamed to Advanced Access"](https://community.squareup.com/t5/Product-Updates/Team-Plus-renamed-to-Advanced-Access/ba-p/718589)
- **Current Advanced Access pricing:** "Included with Square Plus ($49/mo. per location) or Square Premium ($149/mo. per location). You will be charged for your Square Plus or Square Premium subscription across all active locations." — [Square Advanced Access page](https://squareup.com/us/en/staff/advanced-access). This **conflicts** with the standalone $35/location figure on the team-management page and in a ~323-day-old community post. — [Square Community, Shifts thread](https://community.squareup.com/t5/Product-Updates/Introducing-Square-Shifts/bc-p/615392)
- **Square Shifts (US):** The Free tier is free for **up to 5 team members including the owner**. **Shifts Plus "starts at $4 per team member (including the account owner) per month."** — [Square Shifts pricing (US)](https://squareup.com/us/en/staff/shifts/pricing). Other countries for reference: CA$4.50 per team member per month ([Square CA Shifts pricing](https://squareup.com/ca/en/staff/shifts/pricing)); £3.00 in the UK ([Square GB Shifts features](https://squareup.com/gb/en/staff/shifts/features)).
- Shifts Plus features are bundled into Team Plus, Square for Restaurants Plus, Square for Retail Plus and Square Appointments Premium. — [Square Community: "Introducing Square Shifts"](https://community.squareup.com/t5/Product-Updates/Introducing-Square-Shifts/bc-p/616328)
- A third-party comparison says Square does not publish a universal US Shifts Plus price outside POS bundles. This contradicts Square's own Shifts pricing page excerpt. — [Homebase vs Square (competitor source)](https://www.joinhomebase.com/compare/homebase-vs-square)
- Permission-set limits by plan: Square Shifts or Square for Retail Plus include **two permission sets**. Advanced Access/Team Plus gives unlimited custom sets. The free tier has **one team-wide permission set**. — [Square Community: Square Staff Advanced Access](https://community.squareup.com/t5/Square-Staff-and-Payroll/Square-Staff-Advanced-Access/td-p/739712); [Square Community: Learn how to set up team permissions](https://community.squareup.com/t5/Archived-Articles-Read-Only/Learn-How-to-Set-Up-Team-Permissions-with-Square/ba-p/350999)

**Feature catalog (Free vs Paid; API column summarizes Q4)**

| # | Feature | Free? | Paid tier / price | Public API? | Source |
|---|---|---|---|---|---|
| 1 | Team member profiles (name, email, phone, locations, status) | Free, unlimited team members | — | **Yes**: Team API | [Team Mgmt page](https://squareup.com/us/en/point-of-sale/team-management); [API spec](https://github.com/square/connect-api-specification) |
| 2 | Job titles / roles | Free | — | **Yes (BETA)**: Jobs endpoints (title and tip eligibility) | [API spec](https://github.com/square/connect-api-specification) |
| 3 | Wages: single wage per team member | Free | — | **Yes**: WageSetting / TeamMemberWage | [Team permissions article](https://community.squareup.com/t5/Archived-Articles-Read-Only/Learn-How-to-Set-Up-Team-Permissions-with-Square/ba-p/350999) |
| 4 | Multiple wages per team member (different rate per job) | No | Team Plus / Advanced Access | **Yes**: `WageSetting.job_assignments[]` | same |
| 5 | Overtime exemption flag per team member; hourly or salary pay type | Not confirmed which tier | — | **Yes**: `is_overtime_exempt`, `pay_type` HOURLY/SALARY/NONE, `annual_rate`, `weekly_hours` | [GB features](https://squareup.com/gb/en/point-of-sale/team-management/features); [API spec](https://github.com/square/connect-api-specification) |
| 6 | Permission sets: one team-wide set | Free | — | **No** | [Team permissions article](https://community.squareup.com/t5/Archived-Articles-Read-Only/Learn-How-to-Set-Up-Team-Permissions-with-Square/ba-p/350999) |
| 7 | Custom permission sets (unlimited) | No | Advanced Access (ex-Team Plus) | **No** (OAuth scopes `PERMISSION_SETS_READ/WRITE` exist but no endpoints in the public spec) | [Advanced Access page](https://squareup.com/us/en/staff/advanced-access); [API spec](https://github.com/square/connect-api-specification) |
| 8 | Two permission sets | — | Included with Square Shifts / Retail Plus | No | [Community](https://community.squareup.com/t5/Square-Staff-and-Payroll/Square-Staff-Advanced-Access/td-p/739712) |
| 9 | Team member badges | No | Team Plus / Advanced Access | No | [Team Mgmt page](https://squareup.com/us/en/point-of-sale/team-management) |
| 10 | Personal passcodes for POS login / clock-in | Free (implied; tier not confirmed) | — | **No** (no passcode field in TeamMember) | [API spec](https://github.com/square/connect-api-specification) |
| 11 | Timecards: clock in/out from POS or phone (Square Team app) | Free | — | **Yes**: Timecards endpoints | [Team permissions article](https://community.squareup.com/t5/Archived-Articles-Read-Only/Learn-How-to-Set-Up-Team-Permissions-with-Square/ba-p/350999); [Set up time tracking](https://squareup.com/help/us/en/article/8389-set-up-time-tracking) |
| 12 | Breaks: paid or unpaid, mandatory, auto-convert paid to unpaid once 1+ min over, overage flagged in Workday/Labor Cost reports | Free (break tracking) | — | **Yes**: BreakTypes, plus `Break` inside Timecard (`is_paid`, `expected_duration`) | [Set up breaks](https://squareup.com/help/us/en/article/8391-set-up-breaks) |
| 13 | Clock-in "Allow within" window, with a notification if outside it | Free (implied) | — | No | [Set up time tracking](https://squareup.com/help/us/en/article/8389-set-up-time-tracking) |
| 14 | Block early or unscheduled clock-ins | No | Shifts Plus or Premium plans | No | same |
| 15 | Auto clock-out | No | Shifts Plus or Premium plans | No | same |
| 16 | Geofenced clock-in (location verification in Square Team app; off by default; POS still works as a fallback) | No | Shifts Plus | **No** | [Square Community: Clock-in geofencing](https://community.squareup.com/t5/Product-Updates/Clock-in-geofencing/ba-p/700220) |
| 17 | Overtime rules (Shifts > Settings > Overtime; state rule lookup; 1.5x OT, 2x double time; OT shifts flagged red) | Tier not confirmed | — | **Partial**: WorkweekConfig (week start and day start) only; OT rule config is dashboard-only | [Square Shifts features (US)](https://squareup.com/us/en/staff/shifts/features); [API spec](https://github.com/square/connect-api-specification) |
| 18 | Timecard/Workday report; Labor cost by location CSV export | Free (implied) | — | **No reports API** (compute from Timecards) | [Timecard reporting help](https://squareup.com/help/us/en/article/6140-employee-timecard-reporting) |
| 19 | Labor vs sales report | No | Shifts Plus (wage must be assigned) | No | same |
| 20 | Sales reporting by team member (Team Sales report) | No | Team Plus / Advanced Access | No direct API (orders/payments carry team member IDs; not verified here) | [GB comparison](https://squareup.com/gb/en/point-of-sale/team-management/features) |
| 21 | Shift scheduling (create and publish schedules) | Free (basic) | — | **Yes (BETA)**: ScheduledShifts endpoints | [Manage your schedule](https://squareup.com/help/us/en/article/8394-manage-your-schedule-for-team-members); [API spec](https://github.com/square/connect-api-specification) |
| 22 | Shift swaps between team members (approved by a manager with "Approve open shifts and shift swaps" permission) | **No** | Shifts Plus / Team Plus | **No** | [Square Community: Introducing Square Shifts](https://community.squareup.com/t5/Product-Updates/Introducing-Square-Shifts/bc-p/623183); [Shifts pricing CA](https://squareup.com/ca/en/staff/shifts/pricing) |
| 23 | Team members set their own availability in the Square Team app (managers can also set it in Dashboard) | **No** | Shifts Plus | **No** | same |
| 24 | Shift cover and time-off requests, approved in Dashboard or Team app | Tier not confirmed | — | **No** | [Manage schedule requests](https://squareup.com/help/us/en/article/8388-manage-schedule-requests) |
| 25 | Schedule publishing and team notifications | Free (publishing) | — | Publish: **Yes** (`PublishScheduledShift`, `BulkPublishScheduledShifts`, 1–100 shifts). Whether API publish sends push notifications: **unknown** | [API spec](https://github.com/square/connect-api-specification) |
| 26 | Team messaging and announcements in the Square Team app | Tier not confirmed | — | **No** | [Square Staff page](https://squareup.com/us/en/staff); [Square Team app (App Store)](https://apps.apple.com/us/app/square-team/id1435368303) |
| 27 | Square Team app (employee mobile app: clock in, schedules, messaging, pay stubs) | Free download | — | n/a | [App Store](https://apps.apple.com/us/app/square-team/id1435368303); [Google Play](https://play.google.com/store/apps/details?id=com.squareup.payroll.team&hl=en_CA) |
| 28 | Commissions: flat or tiered (by $ sales or item/service count), deduct costs first, effective date, per-person "Earns commission" toggle, import into Square Payroll via "Import time and wages" | Paid; **eligibility conflicts** (see bullets) | Team Plus / Shifts Plus / Premium plans | **No** | [Set up and manage commissions](https://squareup.com/help/us/en/article/7145-set-up-commission-tracking) |
| 29 | Tip pooling (US page labeled beta): split card tips equally among clocked-in tip-eligible staff; IE/AU pages add split by hours worked or by % per job; unattributed tips split across the day's tip-eligible staff | Tier not confirmed | — | **No** (only `Job.is_tip_eligible`, `Timecard.declared_cash_tip_money`) | [US beta tip pooling](https://squareup.com/help/us/en/article/7599-beta-feature-tip-pooling); [IE tip pooling](https://squareup.com/help/ie/en/article/7654-get-started-with-tip-pooling-for-team-management); [AU tip pooling](https://squareup.com/help/au/en/article/7654-get-started-with-tip-pooling-for-team-management) |
| 30 | Declared cash tips at clock-out | Free (implied) | — | **Yes**: `Timecard.declared_cash_tip_money` | [Tip importing](https://squareup.com/help/us/en/article/6480-square-payroll-tip-importing); [API spec](https://github.com/square/connect-api-specification) |
| 31 | Tip-out (Square for Restaurants) | Restaurants product | — | No | [Tip out restaurant team members](https://squareup.com/help/us/en/article/8141-tip-out-team-members-with-square-for-restaurants) |
| 32 | Team member debit cards: up to **5 Square Debit Cards** (Mastercard) on Square Checking at **no extra cost** (owner plus 4 people; owner orders them and owner controls lock/cancel/notifications) | Free | — | **No** | [Order multiple debit cards](https://squareup.com/help/us/en/article/8471-order-multiple-debit-cards); [Square Community announcement](https://community.squareup.com/t5/Product-Updates/Share-spending-power-with-your-business-partners-with-Square/ba-p/705395) |
| 33 | Payroll pay cards for staff | **Not offered** (per an old community answer) | — | No | [Square Community (~2023)](https://community.squareup.com/t5/Square-Checking/How-can-I-get-direct-deposit-cards-for-my-employees-specifically/m-p/655435) |
| 34 | Multi-location teams (assign to all current and future locations, or to specific ones) | Free | Advanced Access billed per active location | **Yes**: `assigned_locations.assignment_type` = `ALL_CURRENT_AND_FUTURE_LOCATIONS` or `EXPLICIT_LOCATIONS` | [API spec](https://github.com/square/connect-api-specification); [Advanced Access page](https://squareup.com/us/en/staff/advanced-access) |
| 35 | Staff calendars / bookable staff in Square Appointments | Plan-dependent (Appointments plans not researched here) | — | **Partial**: Bookings `TeamMemberBookingProfile` is read-only (`is_bookable`, `display_name`, `description`, `profile_image_url`); bookings carry `team_member_id` per segment; availability search filters by `team_member_id_filter` | [API spec](https://github.com/square/connect-api-specification) |
| 36 | "Job assignment" in the field-service/dispatch sense (assign a work order to a tech) | **Not a Square team feature.** Closest are a booking's `team_member_id` and a scheduled shift's `job_id` (a job is a role or title, not a work order) | — | via Bookings / ScheduledShifts | [API spec](https://github.com/square/connect-api-specification) |
| 37 | Cash drawer shifts (POS cash management; not labor) | POS | — | Yes: read-only CashDrawers endpoints | [API spec](https://github.com/square/connect-api-specification) |

**More detail behind the table**
- Time-tracking settings live at Staff > Settings > Clock in/out. Managers can block early or unscheduled clock-ins and set an "Allow within" window. Team members get a notification if they try to clock in outside the limit. **Auto clock-out and blocking early/unscheduled clock-ins require Shifts Plus or Premium plans.** — [Set up time tracking](https://squareup.com/help/us/en/article/8389-set-up-time-tracking)
- Breaks: paid breaks count toward overtime and unpaid breaks do not. A break that runs at least 1 minute over is flagged in Workday and Labor Cost reports. — [Set up breaks](https://squareup.com/help/us/en/article/8391-set-up-breaks)
- Labor cost report path: Shifts > Time tracking > Timecards > Export > "Labor cost by location" (CSV). The **labor vs. sales report requires Shifts Plus**, and each team member needs a wage assigned. — [Timecard reporting](https://squareup.com/help/us/en/article/6140-employee-timecard-reporting)
- Geofencing is a Shifts Plus feature that is off by default, enabled at Shifts > Settings > Clock in/out. If the app can't verify location, team members can still clock in on the POS. The post is from about late 2023. — [Square Community: Clock-in geofencing](https://community.squareup.com/t5/Product-Updates/Clock-in-geofencing/ba-p/700220)
- Commissions: set per team member in Staff settings (none, flat rate, or tiers). Tiers can be by dollar value or by item/service count. Costs can be deducted before commission is calculated. Each person needs "Earns commission" toggled on. Commissions flow to Square Payroll via "Import time and wages". No commission is paid when an Appointments Package is purchased. — [Set up and manage commissions](https://squareup.com/help/us/en/article/7145-set-up-commission-tracking); [Square Community: commissions on packages](https://community.squareup.com/t5/Square-Staff-and-Payroll/Commissions-on-packages/m-p/748827)
- **Commission eligibility conflicts.** One community post says it is available with Appointments, Team Plus, Payroll, Retail Plus and Restaurants. A later post says "Square Shifts Plus and the Premium plans for Appointments, Retail and Restaurants". — [Square Community commission threads](https://community.squareup.com/t5/Staff-Payroll/How-can-I-pay-commission-based-employees/m-p/649934/highlight/true)
- With Team Plus, the Team Sales report shows sales per employee, tips, average sale size and **revenue per labor hour**. This comes from a search excerpt of the community commission threads; the exact page is uncertain. — [Square Community commission threads](https://community.squareup.com/t5/Staff-Payroll/How-can-I-pay-commission-based-employees/m-p/649934/highlight/true)
- **Tip pooling and payroll sync conflict.** The older US beta page says "If using Square Payroll you'll need to manually enter tips in Payroll". Square marketing (search excerpt) says Team Management and Payroll "automatically calculate tip amounts and sync tip payouts to employees' payroll". — [US beta tip pooling](https://squareup.com/help/us/en/article/7599-beta-feature-tip-pooling); [Square Bottom Line: tip pooling](https://squareup.com/us/en/the-bottom-line/operating-your-business/what-you-need-to-know-about-tip-pooling) (attribution of the marketing quote uncertain)
- A retailer reported only **one tip pool / distribution method per location**. The post is about 400 days old. — [Square Community: pool tips by job](https://community.squareup.com/t5/Orders-Menu-Items-Catalog/Is-it-possible-to-pool-tips-based-on-job/td-p/742694)
- Square Team app: real-time team messaging and announcements. Square's staff page says teams can "message instantly, post announcements and share information". — [Square Staff page](https://squareup.com/us/en/staff); [App Store listing](https://apps.apple.com/us/app/square-team/id1435368303)

**Retired or renamed (team side)**
- Team Plus became Advanced Access (US, 2024-03-27). — [Square Community](https://community.squareup.com/t5/Product-Updates/Team-Plus-renamed-to-Advanced-Access/ba-p/718589)
- Square Shifts was introduced as a standalone labor-management subscription with Free and Shifts Plus tiers. It was **not** renamed to Team Plus. — [Square Community: Introducing Square Shifts](https://community.squareup.com/t5/Product-Updates/Introducing-Square-Shifts/ba-p/613383)

### Inferences
- In late 2026 the practical US paid path is likely **Square Plus ($49/location/mo)**, which includes Advanced Access. Shifts Plus ($4 per person per month) may still be sold for the scheduling extras. The $35 standalone Team Plus price looks legacy. Both price pages were indexed without dates, so neither can be confirmed as the current price list.
- For a mobile detailing crew, the field-relevant Square features are geofenced clock-in, shift swaps, availability and auto clock-out. All of them sit behind Shifts Plus, and **none is exposed by the public API**. A replacement app would have to build its own geofencing and availability logic.
- Square's "Jobs" are job titles with tip eligibility. They are not dispatchable work orders. Square has no native technician dispatch, route or job-assignment feature in its team products.

### Gaps
- I could not read the live US Square pricing/compare-plans page, so whether standalone Advanced Access ($35) is still sold to new US sellers in late 2026 is **unconfirmed**.
- Exactly which features are free vs Shifts Plus for messaging/announcements, overtime settings, shift cover/time-off requests and passcodes was not confirmed on an official comparison table.
- Tip pooling: current GA status in the US (the page was labeled beta), plan requirement, and whether it auto-syncs to Square Payroll are unresolved (conflicting sources).
- Square Appointments staff-calendar features and Appointments plan prices were not researched here; other researchers may cover them.
- No source found for a "team member card" product beyond the 5 Square Debit Cards on Square Checking.

## Q2. Square Payroll: pricing, features, benefits, and Oregon-specific handling

### Takeaway
Square Payroll has two plans:
- **Full-service:** $35/month plus $6 per person paid, including federal and state tax filing and payment.
- **Contractor-only:** $6 per person paid, no base fee, and no tax filing.

Paper W-2/1099 mailing costs an extra $3 per person per year. Square's Oregon help article confirms that Square pays and files Oregon state taxes and fully supports **Paid Leave Oregon**. However, the employer cannot elect to cover the employee's Paid Leave Oregon share. I could **not** confirm whether Square handles the **Statewide Transit Tax** or the **TriMet** tax. Square has **no public Payroll API**.

### Cited Findings

**Pricing (official pricing page, via search excerpt)**
- Full-service payroll is **$35/month + $6 per person paid**. **Contractor-only payroll is $6 per person paid per month with no base fee.** Mailing paper W-2/1099 copies costs **$3 per employee or contractor per year**. — [Square Payroll pricing](https://squareup.com/us/en/payroll/pricing)
- Tax filings and payments are included at no additional charge. — [Square Payroll for small business](https://squareup.com/us/en/payroll/small-business)
- The per-person fee is charged only in months you pay that person. The contractor-only plan excludes automated federal/state tax payments and filings and new-hire reporting. — [Gusto guide to Square pricing (competitor source)](https://gusto.com/resources/guides/switch-payroll-providers/square-pricing)
- One review says off-cycle payments are excluded from the contractor-only tier. Not confirmed on Square's own page. — [Gusto guide (competitor source)](https://gusto.com/resources/guides/switch-payroll-providers/square-pricing)

**Payroll feature catalog**

| Feature | Plan | Extra cost | Public API? | Source |
|---|---|---|---|---|
| W-2 employee payroll (hourly, salary) | Full-service | in $35 + $6 | **No** | [Pricing](https://squareup.com/us/en/payroll/pricing) |
| 1099 contractor payments | Both plans | $6 per person paid | **No** | same |
| Automatic federal/state payroll tax calculation, payment and filing | Full-service only | included | No | [Small business page](https://squareup.com/us/en/payroll/small-business) |
| Year-end W-2 and federal 1099-NEC filing (state 1099 requirements must be checked separately) | Full-service (W-2); 1099s for contractors | paper copies $3 per person per year | No | [Pricing](https://squareup.com/us/en/payroll/pricing); [Square Payroll review (third party)](https://www.business.org/finance/accounting/square-payroll-review/) |
| New-hire reporting (opt-in checkbox when adding an employee; filed in the state where the business is located) | Full-service | included | No | [Gusto guide](https://gusto.com/resources/guides/switch-payroll-providers/square-pricing); [Business.org review](https://www.business.org/finance/accounting/square-payroll-review/) |
| Direct deposit: standard ~4 days, 2-day option, next-day (third-party: requires Square Checking as the funding account, or pre-loaded Square balance — sources differ) | Full-service | no fee cited | No | [TechRepublic review](https://www.techrepublic.com/article/square-payroll-review/); [Forbes Advisor review](https://www.forbes.com/advisor/business/square-payroll-review/) |
| Instant payments to employees via **Cash App**, even on weekends, funded from Square balance; payroll can be run as late as 1 business day before payday | Payroll | not stated | No | [Send instant payments with Square Payroll](https://squareup.com/help/us/en/article/6917-square-payroll-pay-your-team-faster-using-your-square-balance) |
| Unlimited pay runs and off-cycle payments | Full-service | included | No | [Business.org review](https://www.business.org/finance/accounting/square-payroll-review/) |
| Tip import (card tips for W-2 employees; cash tips declared at clock-out) | Payroll + Square POS | included | No (tips come from POS data) | [Import tips with Square Payroll](https://squareup.com/help/us/en/article/6480-square-payroll-tip-importing) |
| Timecard, wage and commission import ("Import time and wages") | Payroll + Team/Shifts | included | No | [Commissions help](https://squareup.com/help/us/en/article/7145-set-up-commission-tracking) |
| PTO and sick-leave policies: accrue by hours worked or fixed amount, optional cap, OT/double-time hours count 1:1; set per profile or in Payroll settings | Payroll | included (one review says holiday/sick pay may be an add-on — unconfirmed) | No | [PTO and sick leave](https://squareup.com/help/us/en/article/5664-paid-time-off-and-sick-leave); [Merchant Maverick review](https://www.merchantmaverick.com/reviews/square-payroll-review/) |
| Post-tax deductions and garnishments (recurring). **Employer must pay the agency after each pay cycle** — Square withholds but does not remit | Payroll | included | No | [Post-tax deductions and garnishments](https://squareup.com/help/us/en/article/6063-square-payroll-post-tax-deductions-and-garnishments) |
| Multi-state payroll: all 50 states + DC, no per-state fee; **limits:** one employee can't span multiple jurisdictions; no multiple EINs per account | Full-service | included | No | [Business.org review](https://www.business.org/finance/accounting/square-payroll-review/); [Payroll Detective review](https://www.payrolldetective.com/payroll-providers/square-payroll-review) |
| Employee self-onboarding (email invite: create account, enter own info) | Full-service | included | No | [Business.org review](https://www.business.org/finance/accounting/square-payroll-review/) |
| Employee self-service (view pay stubs, edit info, access forms online; Square Team app) | Payroll | included | No | [Business.org review](https://www.business.org/finance/accounting/square-payroll-review/); [App Store](https://apps.apple.com/us/app/square-team/id1435368303) |
| Health insurance (medical/dental/vision) via **SimplyInsured**; employer pays ≥50% of premiums; plans "from $190/month" (third party) | Add-on | partner pricing | No | [Square press release (2018)](https://squareup.com/us/en/press/payroll-benefits); [CNBC 2018](https://www.cnbc.com/2018/11/14/square-offers-health-care-and-benefits-for-small-businesses-using-its-payroll-system-.html); [TechRepublic](https://www.techrepublic.com/article/square-payroll-review/) |
| Retirement: **Guideline** (401(k), Roth 401(k), 403(b), 457(b), IRA); one newer guide says **Vestwell** — current partner unconfirmed | Add-on | partner pricing | No | [Square press release (2018)](https://squareup.com/us/en/press/payroll-benefits); [Forbes Advisor](https://www.forbes.com/advisor/business/square-payroll-review/) |
| Workers' comp, pay-as-you-go: launched with **AP Intego** (2018); current reviews name **NEXT Insurance** | Add-on | partner pricing | No | [Square press release (2018)](https://squareup.com/us/en/press/payroll-benefits); [TechRepublic](https://www.techrepublic.com/article/square-payroll-review/) |
| Pre-tax commuter/health spending via **Alice** (2018 launch partner) | Add-on (status unknown) | — | No | [Coverager (2018)](https://coverager.com/square-payroll-introduces-benefits-offerings/) |
| Life, disability and accident insurance | **Not offered** | — | — | [Wise review](https://wise.com/us/blog/batchtransfer-square-payroll-review) |
| Benefit deductions for 1099 contractors | **Not supported** | — | — | same |
| Payroll payouts in Square balance activity | — | — | **Read-only trace only**: balance-activity types `SQUARE_PAYROLL_TRANSFER` / `_REVERSED` | [API spec](https://github.com/square/connect-api-specification) |

- Reviewers flag Square Payroll for **weaker HR and reporting features** and **fewer benefits** than competitors such as OnPay. — [Business.org review](https://www.business.org/finance/accounting/square-payroll-review/); [HR.software review](https://www.hr.software/reviews/square-payroll)
- An old Square staff answer said post-tax deductions couldn't be withheld from direct-deposit employees. This conflicts with the current help article and is probably outdated. — [Square Community (archived)](https://community.squareup.com/t5/Archived-Discussions-Read-Only/For-those-of-you-using-Square-Payroll-how-do-you-handle/m-p/375120); vs [Post-tax deductions help](https://squareup.com/help/us/en/article/6063-square-payroll-post-tax-deductions-and-garnishments)

**Oregon-specific (state-specific; flagged)**

| Oregon item | Square handles it? | Evidence | Official rate / rule |
|---|---|---|---|
| Oregon state income-tax withholding, payment and filing | **Yes**, once you register with the Oregon DOR | [Square: Oregon employer tax information](https://squareup.com/help/us/en/article/6216-oregon-employer-tax-information) | — |
| Oregon unemployment insurance (Employment Dept) | **Yes**; you must supply your Oregon UI tax rate | same | — |
| **Paid Leave Oregon** premiums | **Yes**: "Square Payroll supports Paid Leave Oregon premium calculations, withholdings, payments, and reporting." **No option for the employer to cover the employee's share.** | same | 1% total, 60% employee / 40% employer; employer share applies only at 25+ employees (third-party) — [QuickBooks OR guide](https://quickbooks.intuit.com/r/oregon/a-guide-to-payroll-taxes-in-oregon/) |
| **Statewide Transit Tax** (employee-paid, withheld) | **Unconfirmed**; not in the indexed excerpt | — | **0.1%**, withheld from wages of OR residents (wherever they work) and of nonresidents working in OR — [OR DOR 2026 combined payroll instructions](https://www.oregon.gov/dor/forms/FormsPubs/combined-payroll_211-155-2_2026.pdf); [QuickBooks](https://quickbooks.intuit.com/r/oregon/a-guide-to-payroll-taxes-in-oregon/) |
| **TriMet transit payroll tax** (employer-paid) | **Unconfirmed.** The Square article excerpt lists a **City of Sandy transit tax** account number, which suggests some local transit taxes are tracked, but TriMet wasn't in the excerpt | [Square OR article](https://squareup.com/help/us/en/article/6216-oregon-employer-tax-information) | **0.8237%** of wages for services performed in the TriMet district (effective 2025-01-01) — [OR DOR TriMet page](https://www.oregon.gov/dor/programs/businesses/pages/trimet-transit.aspx); 0.008237 in [DOR 2026 instructions](https://www.oregon.gov/dor/forms/FormsPubs/combined-payroll_211-155-2_2026.pdf) |
| Lane Transit District tax | Unconfirmed | — | 0.0080 — [DOR 2026 instructions](https://www.oregon.gov/dor/forms/FormsPubs/combined-payroll_211-155-2_2026.pdf); [DOR Lane page](https://www.oregon.gov/dor/programs/businesses/pages/lane-county-transit-district-payroll-tax.aspx) |
| Oregon sick time (statutory accrual) | **Partial**: Square provides configurable PTO/sick policies (hours-worked accrual, caps) but tells employers to check state/local rules. No Oregon-specific automation found | [PTO and sick leave](https://squareup.com/help/us/en/article/5664-paid-time-off-and-sick-leave) | not researched |

- The transit rates differ across third-party sites (e.g., TriMet 0.7937%, 0.8137%, 0.8237%; Lane 0.0079 vs 0.0080). The **DOR figures above are authoritative.** — [GoCo](https://www.goco.io/blog/oregon-employer-payroll-taxes-guide); [OR DOR](https://www.oregon.gov/dor/programs/businesses/pages/trimet-transit.aspx)
- Transit district taxes are employer-paid and based on gross wages for services performed **in** the district. — [OR DOR TriMet page](https://www.oregon.gov/dor/programs/businesses/pages/trimet-transit.aspx)
- Other payroll systems handle this with a per-employee "works in TriMet / Lane district" flag, for example Patriot. — [Patriot Software: Oregon local taxes](https://www.patriotsoftware.com/payroll/training/help/oregon-local-taxes/)

### Inferences
- For Sheen (Portland), wages for detailing done at customer sites **inside the TriMet district** are subject to the employer-paid 0.8237% TriMet tax. The Statewide Transit Tax (0.1%) applies to Oregon-resident technicians regardless of where they work.
- Technicians who also service customers outside the district (e.g., Clackamas County rural areas or Vancouver, WA) create apportionment questions. Square's reported "one employee can't span multiple jurisdictions" limit could be a real constraint for mobile techs who cross into Washington.
- A replacement app that takes over "payroll and tax filing" must handle all of these: federal 941/940, W-2/W-3, 1099-NEC, OR withholding, OR UI, Paid Leave Oregon, Statewide Transit, TriMet, and the Oregon Combined Payroll Tax Report. Square exposes **none** of its payroll computations or filings by API. Realistically that means embedding a payroll provider rather than reimplementing tax filing.
- Square withholds garnishments but leaves remittance to the employer, a gap any replacement could improve on.

### Gaps
- **Statewide Transit Tax and TriMet support in Square Payroll are not confirmed.** Only an excerpt of help article 6216 was visible. Its full text (likely listing STT/TriMet account numbers) should be read directly.
- Whether Square Payroll supports withholding Portland-area local personal income taxes (Metro Supportive Housing Services tax, Multnomah County Preschool for All tax) was not researched.
- Oregon Workers' Benefit Fund (WBF) assessment handling: not researched.
- Exact current pricing and timing of next-day direct deposit (and whether it requires Square Checking) is not confirmed on an official page.
- The current 401(k) partner (Guideline vs Vestwell) and workers'-comp partner (NEXT vs AP Intego) are not confirmed on a current official Square page.
- Official confirmation that the contractor-only plan excludes off-cycle payments was not found.

## Q3. HR features (document storage, compliance alerts, hiring/onboarding, background checks)

### Takeaway
Square offers only light HR, tied to Payroll:
- Email-based new-hire self-onboarding.
- Employee self-service: pay stubs, personal info and forms.
- New-hire reporting.
- PTO/sick policies.

I found **no evidence** of a Square HR suite with document storage, compliance alerts, applicant tracking/hiring or background checks. Reviewers consistently rate Square's HR features as weaker than competitors'.

### Cited Findings
- Square can email new hires so they create their own online accounts and complete onboarding. — [Business.org review](https://www.business.org/finance/accounting/square-payroll-review/)
- Employees get online self-service to view pay stubs, edit information and access forms. — [Business.org review](https://www.business.org/finance/accounting/square-payroll-review/)
- New-hire reporting is an opt-in during employee setup and is filed per the business's state. — [Gusto guide (competitor)](https://gusto.com/resources/guides/switch-payroll-providers/square-pricing)
- PTO and sick-leave policies are configurable, and Square advises checking state and local rules. That advice is the only compliance guidance found; no automated compliance alerts. — [PTO and sick leave](https://squareup.com/help/us/en/article/5664-paid-time-off-and-sick-leave)
- Square publishes educational compliance content, such as a paid sick leave policy guide on its blog. That is not a product feature. — [Square Bottom Line: Paid sick leave](https://squareup.com/us/en/the-bottom-line/growing-your-team/paid-sick-leave)
- Reviewers note "fewer employee benefits and HR features than competitors like OnPay" and weaker HR and reporting overall. — [Business.org review](https://www.business.org/finance/accounting/square-payroll-review/); [HR.software review](https://www.hr.software/reviews/square-payroll)
- Team-member badges and custom permission sets (Advanced Access) are the only role/access-control "HR-adjacent" features found. — [Square Team Management page](https://squareup.com/us/en/point-of-sale/team-management)

### Inferences
- Document storage (I-9, signed handbooks), hiring/ATS, background checks and compliance alerting are **not Square features**. A replacement app gives up nothing here and could add value (e.g., storing tech driver's licenses and auto-insurance certificates, which matter for mobile detailing).

### Gaps
- I found no source confirming or ruling out an HR add-on (e.g., an HR-advisor partner) inside Square Payroll in 2025–2026. A direct read of squareup.com/us/en/payroll would settle it.
- Whether Square Payroll collects Form I-9 or only W-4 data during onboarding was not found.

## Q4. Public API availability: Team API, Labor API, Bookings team profiles, and whether Square Payroll has an API

### Takeaway
Public APIs cover these areas:
- **Team members:** create, bulk create/update, search, retrieve, update, and wage settings.
- **Jobs:** BETA.
- **Labor:** timecards with breaks and declared cash tips, break types, workweek configs, team-member wages, and **scheduled shifts** (BETA, with draft/publish).
- **Bookings:** read-only team-member booking profiles.
- **Webhooks:** for all of the above.

There is **no public Payroll API**. There are also **no public endpoints** for:
- permission sets
- passcodes
- commissions
- tip pooling
- availability or time-off
- shift swaps
- team messaging
- geofencing
- PTO
- labor reports

The old Shift endpoints were deprecated 2025-05-21 with a retirement date of 2026-05-21, which has now passed. The Employees API was retired 2021-08-26.

### Cited Findings
All items below come from Square's official OpenAPI spec (`api.json`, commit 0689c90, 2026-09-15; default Square-Version **2026-09-16**) unless another source is given. — [square/connect-api-specification](https://github.com/square/connect-api-specification)

**Team API** (scopes `EMPLOYEES_READ` / `EMPLOYEES_WRITE`)
- `POST /v2/team-members` CreateTeamMember
- `POST /v2/team-members/bulk-create`
- `POST /v2/team-members/bulk-update`
- `POST /v2/team-members/search` (filter by location IDs, ACTIVE/INACTIVE, is_owner)
- `GET/PUT /v2/team-members/{id}`
- `GET/PUT /v2/team-members/{id}/wage-setting`

All of these are PUBLIC. There is no delete; set status to INACTIVE instead.

**TeamMember and wage fields**
- `TeamMember` fields: `id, reference_id, is_owner, status (ACTIVE|INACTIVE), given_name, family_name, email_address, phone_number, created_at, updated_at, assigned_locations{assignment_type: ALL_CURRENT_AND_FUTURE_LOCATIONS|EXPLICIT_LOCATIONS, location_ids}, wage_setting`. **No passcode, permission-set, commission or tip-pool fields.**
- `WageSetting`: `team_member_id, job_assignments[], is_overtime_exempt, version`.
- `JobAssignment`: `job_title, pay_type (NONE|HOURLY|SALARY), hourly_rate, annual_rate, weekly_hours, job_id`.

**Jobs (BETA)**
- `GET/POST /v2/team-members/jobs`
- `GET/PUT /v2/team-members/jobs/{job_id}`
- `Job` fields: `id, title, is_tip_eligible, version`. Title changes propagate to JobAssignment, Shift and TeamMemberWage.

**Labor API: timecards (PUBLIC; scopes `TIMECARDS_READ/WRITE`)**
- `POST /v2/labor/timecards` (create)
- `POST /v2/labor/timecards/search` (filter by location, team member, OPEN/CLOSED status, start/end, workday)
- `GET/PUT/DELETE /v2/labor/timecards/{id}`
- `Timecard` fields: `id, location_id, timezone, start_at, end_at, wage{title, hourly_rate, job_id, tip_eligible}, breaks[], status, version, team_member_id, declared_cash_tip_money`.

**Labor API: settings (PUBLIC; scopes `TIMECARDS_SETTINGS_READ/WRITE`)**
- Break types: `GET/POST /v2/labor/break-types`, `GET/PUT/DELETE /v2/labor/break-types/{id}`. `BreakType` fields: `location_id, break_name, expected_duration, is_paid`.
- Workweek: `GET /v2/labor/workweek-configs`, `PUT /v2/labor/workweek-configs/{id}`. Fields: `start_of_week, start_of_day_local_time`, "for overtime calculations and reporting periods".

**Labor API: wages (PUBLIC, read-only)**
- `GET /v2/labor/team-member-wages`, `GET /v2/labor/team-member-wages/{id}` (`EMPLOYEES_READ`).

**Labor API: scheduled shifts (BETA)**
- `POST /v2/labor/scheduled-shifts` (create)
- `POST /v2/labor/scheduled-shifts/search` (filter by location, team member, start/end, workday, assignment status, scheduled-shift status)
- `GET/PUT /v2/labor/scheduled-shifts/{id}`
- `POST /v2/labor/scheduled-shifts/{id}/publish`
- `POST /v2/labor/scheduled-shifts/bulk-publish` (1–100 shifts)
- `ScheduledShift` = `draft_shift_details` and `published_shift_details`, each with `team_member_id, location_id, job_id, start_at, end_at, notes, is_deleted, timezone`.
- Publishing copies draft into published. Requires Square-Version 2025-05-21 or later. — [Square Labor API: manage scheduled shifts](https://developer.squareup.com/docs/labor-api/manage-scheduled-shifts); [Changelog 2025-05-21](https://developer.squareup.com/docs/changelog/connect-logs/2025-05-21)

**Deprecations and retirements**
- `/v2/labor/shifts` (Create/Search/Get/Update/Delete Shift): **DEPRECATED 2025-05-21, retirement 2026-05-21**, replaced by Timecard endpoints. The Shift object was renamed Timecard in version 2025-05-21. — [Spec x-deprecation]; [Changelog 2025-05-21](https://developer.squareup.com/docs/changelog/connect-logs/2025-05-21); [Labor API overview](https://developer.squareup.com/docs/labor-api/what-it-does)
- `/v2/labor/employee-wages`: **DEPRECATED 2020-08-26, retirement "TBD"**, replaced by ListTeamMemberWages.
- **Employees API** (`/v2/employees`): **deprecated 2020-08-26, retired 2021-08-26**, replaced by SearchTeamMembers (Team API).

**Webhooks (event names in spec)**
- `team_member.created`, `team_member.updated`, `team_member.wage_setting.updated`
- `job.created`, `job.updated`
- `labor.timecard.created|updated|deleted`
- `labor.scheduled_shift.created|updated|deleted|published`
- Deprecated `labor.shift.created|updated|deleted`. Creating a timecard fires both `labor.shift.*` and `labor.timecard.*`; Square advises moving to Timecard events. — [Square Labor API webhooks guide](https://developer.squareup.com/docs/labor-api/webhooks)

**Bookings team profiles (read-only; `APPOINTMENTS_BUSINESS_SETTINGS_READ`)**
- `GET /v2/bookings/team-member-booking-profiles`
- `POST .../bulk-retrieve`
- `GET .../{team_member_id}`
- `TeamMemberBookingProfile` fields: `team_member_id, description, display_name, is_bookable, profile_image_url`.
- `AppointmentSegment.team_member_id` / `any_team_member` and `SegmentFilter.team_member_id_filter` (availability search) link staff to bookings.

**Payroll: no API**
- The spec has **no `/payroll` paths**. "Payroll" appears only as:
  - balance-activity types `SQUARE_PAYROLL_TRANSFER` / `SQUARE_PAYROLL_TRANSFER_REVERSED` ("a payroll payment that was transferred to a team member's bank account");
  - a `PAYROLL` product-source enum value.
- The Team API and Labor API descriptions say they exist to sync data **into** external payroll systems.

**Permission sets: scopes but no endpoints**
- OAuth scopes `PERMISSION_SETS_READ` / `PERMISSION_SETS_WRITE` are defined and reference "ListPermissionSets and RetrievePermissionSet endpoints". **No such paths exist in the public spec.**

**Other**
- Cash drawer shifts (`/v2/cash-drawers/shifts`, `CASH_DRAWER_READ`) are read-only POS cash-management records, unrelated to labor.
- A search excerpt noted that Square cookbook examples still call shift endpoints with Square-Version 2026-09-16, which conflicts with the 2026-05-21 retirement date. Verify live behavior. — [Labor API cookbook: add breaks](https://developer.squareup.com/docs/labor-api/cookbook/add-shift-breaks)

### Inferences
- **What a replacement app can migrate out of Square via API:** team roster, wages and job assignments, jobs, historical timecards (with breaks and declared cash tips), break types, workweek config, scheduled shifts, and booking-profile flags.
- **What cannot be migrated via API (dashboard-only):** permission sets, passcodes, commissions rules, tip-pool settings, availability, time-off, swap requests, messages and announcements, geofence settings, overtime rule settings, PTO balances, and **all Square Payroll data** (pay runs, tax filings, W-2s, deductions, benefits). These would need dashboard CSV exports or manual re-entry.
- New integrations should use only Timecard endpoints and `labor.timecard.*` webhooks. ScheduledShifts and Jobs are still BETA as of Square-Version 2026-09-16.

### Gaps
- Whether calling the Labor API (especially ScheduledShifts) requires a paid Shifts Plus or Advanced Access subscription on the seller account was not found in the spec, and the docs pages couldn't be fetched.
- Whether publishing scheduled shifts via the API triggers Square Team app notifications to team members is not documented in the spec.
- Whether the retired Shift endpoints still answer after 2026-05-21 (possible grace period) is unverified.
- Square Payroll CSV export formats (payroll register, tax reports) were not researched. They are the only path to migrate historical payroll data.
