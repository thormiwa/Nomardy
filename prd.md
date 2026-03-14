# Product Requirements Document (PRD)
## Visa-First Travel Planning Platform for African Travelers

> **Working Title:** TBD
> **Version:** 1.0
> **Author:** Solo Developer
> **Target MVP Launch:** 4-6 weeks
> **Initial Market:** Nigerian travelers (soft launch)

---

## 1. Executive Summary

A web-based travel planning platform that solves the unique challenges African travelers face: visa complexity, route planning that avoids transit visa issues, accurate budget planning in local currencies, and step-by-step visa application guidance.

**Core Differentiator:** Visa-first approach. Unlike Kayak/Skyscanner (flights-first) or iVisa (visa-only), this platform leads with "Can I actually go there?" before showing flights and budgets.

---

## 2. MVP Promise

The platform answers two questions quickly:

1. **Can I travel there with my passport?**
2. **What will the trip roughly cost?**

Everything else is secondary.

### Product Principle

If a feature does not directly help answer:
1. Can I travel there with my passport?
2. What will the trip cost?

**It is likely not part of the MVP.**

---

## 3. Problem Statement

African travelers face unique challenges:
- **Visa Complexity:** Most destinations require visas; requirements vary significantly by passport
- **Transit Visa Traps:** Flights with layovers in countries requiring transit visas
- **Information Fragmentation:** Visa requirements, flight prices, and budgets scattered across multiple sites
- **Proof of Funds Confusion:** Different countries have different financial documentation requirements
- **Limited Local Payment Options:** Many travel sites don't accept African payment methods

---

## 4. Target Users

### Primary Persona: Nigerian Traveler
- Age: 25-45
- Income: Middle to upper-middle class
- Travel frequency: 1-3 international trips/year
- Pain points: UK/Schengen/Canada visa process, finding affordable flights, transit visa issues
- Tech-savvy, uses mobile banking, values convenience

### Expansion Markets (Post-MVP)
- Ghana, Kenya, South Africa, Egypt, Morocco

---

## 5. Core Features (MVP)

### 5.1 Visa Checker
- **Input:** User nationality + destination country
- **Output:**
  - Visa requirement status (visa-free, visa-on-arrival, e-visa, embassy visa)
  - Allowed stay duration
  - Step-by-step application guide with document checklist
  - Links to official embassy/consulate sites
  - Last-updated timestamp for data accuracy
- **Smart Suggestions:** Proactively recommend visa-free destinations (ECOWAS for Nigerians, etc.)

### 5.2 Passport-Based Travel Discovery

**Overview:** A discovery feature that answers: "Where can I travel with my passport?"

Instead of starting with a destination search, users select their passport nationality and optionally a budget and trip length. The system recommends destinations they can realistically travel to.

**Inputs:**
- Passport nationality (required)
- Departure city (optional)
- Trip budget (optional)
- Trip length (optional)

**Output:** A ranked list of destinations showing:
- Visa status (visa-free / eVisa / visa-on-arrival / embassy visa)
- Estimated flight price
- Estimated trip cost
- Short itinerary preview

**Destinations grouped by visa difficulty:**
- 🟢 Visa-Free
- 🔵 E-Visa
- 🟡 Visa-On-Arrival
- 🔴 Embassy Visa Required

**Example Result:**
```
🇬🇭 Ghana
   Visa-free | Flight: ~$250 | Trip: ~$700

🇲🇦 Morocco
   Visa-free | Flight: ~$400 | Trip: ~$1,200

🇹🇷 Turkey
   E-Visa | Flight: ~$500 | Trip: ~$1,500
```

**Strategic Importance:** This reinforces the platform's visa-first positioning and creates a highly shareable discovery experience.

### 5.3 Flight Search (MVP)
- **Primary API:** Amadeus only (single integration for MVP)
- **Smart Routing:** Flag routes that likely require transit visas (⚠ warning, not guarantee)
- **Display:** Price, layover details, airline info
- **Action:** Redirect to booking sites with affiliate links (no in-app booking)

> **Note:** Transit visa detection is complex (airlines use Timatic). MVP will flag potential issues, not guarantee compliance. Example: "⚠ Transit visa may be required in UK"

### 5.4 Budget Breakdown
- **Tiered Estimates:** Budget / Mid-range / Luxury per destination
- **Categories:** Accommodation, food, transport, activities, misc
- **Currency:** Multi-currency toggle (NGN, USD, EUR, GBP, destination currency)
- **Data Sources:**
  - Numbeo (cost of living data)
  - Backpacker Index (budget travel estimates)
  - Tourism board official guides
  - Curated manual research

### 5.5 Itinerary Suggestions
- **Templates:** Pre-built 7-day and 14-day itineraries per destination
- **Customizable:** Users can modify, add, remove activities
- **Views:** Toggle between day-by-day cards, timeline, and map view
- **Calendar Sync:** Export to Google Calendar / Apple Calendar (requires account)

### 5.6 AI Usage (MVP)
- **Scope:** Generate 7-day itinerary suggestions only
- **Guardrails:** All visa rules, flight data, and budgets come from deterministic systems (APIs + database)
- **No AI for:** Visa requirements, flight search, budget calculations
- **Why:** Prevents hallucination problems with critical travel information

### 5.7 User Access Model
- **Guest Mode:** Users can search visas, view flights, and explore trips WITHOUT creating an account
- **Account Required For:**
  - Saving trips
  - Calendar export
  - Preferences persistence
- **Auth Methods:** Email/password + Google + Apple social login
- **Profile:** Nationality (single passport), currency preference, saved trips
- **Data Policy:** Minimal data collection, no passport details stored

> **Why Guest Mode:** Removing signup friction massively improves user adoption. Let users experience value before asking for commitment.

---

## 6. Deferred Features (Post-MVP)

| Feature | Priority | Notes |
|---------|----------|-------|
| Additional Flight APIs | P1 | Skyscanner, Kiwi.com for price comparison |
| Packing Lists | P1 | Destination-based (weather, culture) |
| Social Sharing | P2 | Share trips via link |
| Dual Passport Support | P2 | Compare visa requirements |
| Visa Appointment Booking | P2 | Tips + embassy links |
| Travel Insurance Recommendations | P2 | Partner integrations |
| Payments (Premium Subscriptions) | P2 | Paystack + Flutterwave + Stripe |
| Offline Mode | P3 | PWA with cached saved trips |
| Community Reviews | P3 | User-submitted tips |

---

## 7. Technical Architecture

### 7.1 Stack
| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js (React) | SEO, SSR, Vercel hosting |
| Backend | Python (FastAPI) | Fast API development, good for integrations |
| Database | Supabase (PostgreSQL) | Built-in auth, realtime, good free tier |
| Hosting | Vercel (FE) + Railway (BE) | Great DX, easy deploys |
| Auth | Supabase Auth | Email/password + OAuth providers |
| LLM | OpenAI (primary) + Claude (fallback) | Itinerary generation only |
| Analytics | Plausible | Privacy-focused, GDPR compliant |

### 7.2 Monitoring & Logging
| Tool | Purpose |
|------|---------|
| Sentry | Error tracking, crash reporting |
| Railway Logs | Backend application logs |
| API Usage Dashboard | Track Amadeus/LLM API calls and costs |
| Plausible | User analytics (privacy-focused) |

### 7.3 External API Integrations (MVP)

| API | Purpose | Tier |
|-----|---------|------|
| Amadeus | Flight search, pricing | Free tier (5k calls/month) |
| ExchangeRate-API | Currency conversion | Free tier |
| OpenAI GPT-4 | Itinerary generation | Pay-per-use |
| Claude API | LLM fallback | Pay-per-use |

**Visa Data Providers:**
- Sherpa / VisaList (MVP) - Paid with manual overrides
- Future: IATA Timatic integration for airline-grade visa validation

**Post-MVP APIs:** Skyscanner (affiliate), Kiwi.com (multi-city routing)

### 7.4 Data Architecture

```
Users
├── id, email, password_hash
├── nationality (country_code)
├── currency_preference
├── created_at, updated_at

SavedTrips
├── id, user_id
├── destination, start_date, end_date
├── budget_tier (budget/mid/luxury)
├── itinerary (JSON)
├── created_at

Destinations
├── id, country_code, city
├── visa_requirements (JSON per nationality)
├── budget_estimates (JSON per tier)
├── itinerary_templates (JSON)
├── last_verified_at

VisaGuides
├── id, origin_country, destination_country
├── requirement_type (visa-free, eVisa, etc)
├── documents_required (JSON array)
├── step_by_step_guide (markdown)
├── official_links (JSON)
├── last_updated_at
```

---

## 8. User Flows

### 8.1 Primary Flow: Passport Discovery (Visa-First)
```
Landing Page → Select Passport Nationality
    → "Where Can I Go?"
    → Destination Suggestions (grouped by visa difficulty)
    → Select Destination
    → Visa Guide (step-by-step if required)
    → Flight Options (smart-routed)
    → Budget Breakdown (tiered)
    → Itinerary Suggestions
    → Save Trip / Export Calendar
```

### 8.2 Alternative Flow: Destination-First
```
Landing Page → Select Nationality → Enter Specific Destination
    → Visa Status (with application guide if needed)
    → Flight Search Results (smart-routed)
    → Budget Breakdown (tiered)
    → Itinerary Suggestions
    → Save Trip / Export Calendar
```

### 8.3 Alternative Flow: Budget-First
```
Landing Page → Select Nationality → "I have $X budget"
    → Show matching destinations (filtered by affordability)
    → Select → Full trip planning flow
```

---

## 9. UI/UX Guidelines

### Design Principles
- **Minimal & Clean:** Lots of whitespace, simple typography, subtle colors
- **Mobile-First:** 70%+ users expected on mobile
- **Fast:** Target <3s initial load, <1s interactions
- **Accessible:** WCAG 2.1 AA compliance

### Key Screens
1. **Onboarding:** Select nationality, create account
2. **Dashboard:** Saved trips, quick search, visa-free suggestions
3. **Trip Planner:** Tabbed interface (Visa | Flights | Budget | Itinerary)
4. **Visa Guide:** Step-by-step with checkboxes, document list
5. **Itinerary Builder:** Day-by-day with drag-drop, map integration

---

## 10. Monetization Strategy

### Revenue Streams
1. **Affiliate Commissions:** Flight/hotel bookings via redirect links (primary)
2. **Premium Subscription:** (future)
   - Unlimited saved trips (free: 3)
   - AI-powered personalized itineraries
   - Visa application deadline reminders
   - Price drop alerts

### Pricing (Future)
- Free tier: Core features, 3 saved trips
- Premium: $5-10/month or $50-80/year

---

## 11. Compliance & Legal

### Data Protection
- **GDPR Compliant:** EU users data rights
- **NDPR Compliant:** Nigerian data protection regulation
- **Data Minimization:** Only collect necessary data
- **No Passport Storage:** Users enter passport details each time (not stored)

### Liability Protection
- Clear disclaimers: "Information is advisory only"
- Always link to official embassy sources
- Show "last verified" timestamps on visa data
- Terms of Service with liability limitations

---

## 12. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Visa data inaccuracy | Hybrid approach: API + manual verification + user reports + disclaimers |
| API costs scaling | Aggressive caching, rate limiting, upgrade to paid tiers as needed |
| Flight API failures | Graceful degradation (hide unavailable sections) |
| Solo dev timeline pressure | Launch partial + iterate; cut to visa checker only if needed |
| User acquisition | SEO focus, content marketing (visa guides), social proof |

### SEO Strategy (Organic Growth Lever)

Create indexed, SEO-optimized pages targeting high-volume search queries:

**Passport Pages:**
- `/passport/nigeria` - "Nigerian passport visa-free countries"
- `/passport/kenya` - "Kenyan passport travel destinations"
- `/passport/ghana` - "Where can Ghanaians travel without visa"

**Discovery Pages:**
- `/visa-free-countries-for-nigerians`
- `/cheapest-countries-nigerians-can-travel`
- `/easiest-visas-for-african-passports`

**Destination Guides:**
- `/nigeria-to-uk-visa-guide`
- `/nigeria-to-canada-visa-guide`
- `/nigeria-to-dubai-travel-cost`

**Why This Matters:** These keywords have huge search volume from target users actively planning travel. Each page answers questions and funnels users into the product.

---

## 13. MVP Milestones

### Week 1-2: Foundation
- [ ] Project setup (Next.js + FastAPI + Supabase)
- [ ] Auth system (email/password + Google)
- [ ] Database schema + migrations
- [ ] Basic UI components + design system

### Week 3-4: Core Features
- [ ] Visa checker integration (Sherpa API + manual data)
- [ ] Flight search (Amadeus API integration)
- [ ] Budget breakdown (static data for top 20 destinations)
- [ ] Basic itinerary templates

### Week 5-6: Polish & Launch
- [ ] Smart flight routing (filter transit visa issues)
- [ ] Currency toggle
- [ ] Save/load trips
- [ ] Calendar export
- [ ] Error handling + Sentry setup
- [ ] Landing page + SEO basics
- [ ] Soft launch to Nigerian users

---

## 14. Success Metrics

### Launch Metrics (First 30 days)
- 500+ signups
- 200+ visa checks
- 100+ saved trips
- 50+ trip plans generated
- 10+ affiliate clicks/day

### Growth Metrics (90 days)
- 2,000+ MAU
- 500+ trip plans generated
- 30% returning users
- First affiliate revenue
- NPS > 40

> **Key Metric:** "Trip Plans Generated" is the true product success metric - it shows users got value from the platform.

---

## 15. Competitive Analysis

| Competitor | Strength | Weakness | Our Advantage |
|------------|----------|----------|---------------|
| Kayak/Skyscanner | Flight search | No visa info, not Africa-focused | Visa-first, transit routing |
| iVisa/VisaHQ | Visa processing | Expensive, no trip planning | Full trip planning, free info |
| Wakanow | African market | Booking focus, outdated UX | Modern UX, visa guidance |
| Travelbeta | Nigerian market | Limited features | Comprehensive planning |

---

## 16. Open Questions

1. **App Name:** Need to decide on branding before launch
2. **Visa Data Provider:** Sherpa vs VisaList vs custom - need to evaluate pricing
3. **LLM Costs:** Monitor usage and costs for itinerary personalization
4. **Transit Visa Data:** Need reliable source for transit visa requirements

---

## 17. Verification & Testing Plan

### Critical Path Tests (Automated)
- User registration/login flow
- Visa checker returns correct data for Nigerian passport
- Flight search returns results
- Trip save/load functionality
- Calendar export generates valid ICS

### Manual Testing
- Cross-browser testing (Chrome, Safari, Firefox)
- Mobile responsiveness
- API failure graceful degradation
- Guest mode flow (no login required for search)

### End-to-End Verification
1. Create account as Nigerian user
2. Search "UK" destination → verify visa guide shows
3. Search flights Lagos → London → verify smart routing
4. View budget breakdown → verify NGN currency works
5. Generate itinerary → verify customization works
6. Save trip → verify appears in dashboard
7. Export to calendar → verify ICS downloads

---

## Next Steps

1. **Finalize app name and branding**
2. **Set up project repository and CI/CD**
3. **Begin Week 1 implementation**
4. **Sign up for API accounts (Amadeus, Sherpa, etc.)**
5. **Create design mockups for key screens**
