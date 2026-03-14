# **Nomardy**

## **What we're building**

Nomardy is a **visa-first travel planning platform for African travelers**.

Two questions. That's it:

1. Can I travel there with my passport?

2. What will the trip roughly cost?

Read `prd.md` for full context.

---

# **Product Principle**

If a feature does **not directly help answer those two questions**, it is **not part of the MVP**.

---

# **MVP Priority**

For the MVP, it is better to have:

* one **polished landing page**

* one **working visa-check flow**

than many unfinished features.

Choose:

* clarity

* polish

* momentum

over feature density.

---

# **MVP Scope**

## **Week 1–2**

* Project scaffold

* Frontend \+ backend setup

* Supabase connection

* Mock visa-checker endpoint

* Landing page (styled, not placeholder)

* Basic UI flow: nationality select → destination search → visa result card

## **Week 3–4**

* Real visa API integration

* Flight search (Amadeus only)

* Budget estimates

## **Week 5–6**

* Itinerary generation (OpenAI)

* Save trips

* Calendar export

---

# **Out of Scope (Do NOT Build)**

* Payments

* Social features

* Multi-passport support

* Offline mode

* Multiple flight APIs

* Mobile apps

* Complex dashboards

---

# **Tech Stack**

Frontend  
 Next.js \+ React \+ TypeScript → Vercel

Backend  
 Python FastAPI → Railway

Database  
 Supabase (PostgreSQL \+ Auth)

LLM  
 OpenAI GPT-4 for itinerary generation only

APIs  
 Amadeus (flights)  
 Sherpa or VisaList (visa data)

---

# **Backend Rules**

* REST only

* No microservices

* No background workers

* Prefer simple readable code

* Avoid over-engineering

Endpoints:

/visa-check  
/flight-search  
/budget-estimate  
/itinerary-generate  
---

# **API Response Format**

### **Success**

{  
 "status": "success",  
 "data": {},  
 "timestamp": "ISO8601"  
}

### **Error**

{  
 "status": "error",  
 "message": "description",  
 "timestamp": "ISO8601"  
}  
---

# **Frontend Design (Non-Negotiable)**

Nomardy should feel:

* editorial

* premium

* warm

* alive

* aspirational

Reference aesthetics:

* Monocle

* Aesop

* Kinfolk

* Apple editorial

This is **NOT a generic SaaS product**  
 and **NOT an AI startup landing page**.

---

# **Emotional Direction**

Travel should feel:

* fun

* exciting

* light

* aspirational

* warm

* elegant

* full of possibility

But still:

* trustworthy

* calm

* clear

* readable

---

# **Visual Direction**

Prefer:

* warm cream backgrounds

* strong serif headlines

* refined sans-serif body text

* generous whitespace

* asymmetrical editorial layouts

* rounded cards

* subtle borders

* minimal shadows

* warm sunlight / glow atmosphere

* calm premium composition

Avoid:

* green

* purple

* gradients

* Inter

* Roboto

* Arial

* heavy shadows

* crowded dashboards

* fintech-style layouts

* generic AI startup aesthetics

* excessive icons

* cramped layouts

---

# **Typography Direction**

Typography should carry the visual identity.

Prefer:

* large serif headlines

* refined sans for UI text

* strong hierarchy

* generous spacing

* editorial line lengths

---

# **Motion**

Motion should feel subtle and intentional.

Prefer:

* soft fades

* calm hover states

* smooth transitions

Avoid:

* flashy animations

* bouncing effects

* gimmicky motion

---

# **Landing Page Target**

The MVP landing page should include:

1. Header / navigation

2. Hero section

3. Passport input card

4. Destination preview cards

5. “How it works” section

6. Trust / advisory section

---

# **Hero Section Requirements**

The hero must communicate:

* passport-aware travel

* warmth

* excitement

* confidence

The hero should feel **premium and memorable**, not generic.

---

# **Destination Cards**

Destination cards should feel **aspirational and collectible**, not like dashboard widgets.

Each card includes:

* country flag

* destination name

* visa status

* estimated trip cost

---

# **Trust Section**

Must clearly communicate:

* visa information is advisory only

* data includes "last verified" timestamps

* official embassy links are provided

---

# **Code Rules**

* Never hardcode API keys

* Always read secrets from `.env`

* Guest mode must work without login

* Do NOT add auth gates to search flows

* Visa data is **never AI generated**

* AI is used **only for itinerary generation**

* Always show **"last verified" timestamps**

* Always display this disclaimer:

Visa information is advisory only.  
Always confirm with official embassy sources.  
---

# **Project Structure**

root  
├ frontend  
│  ├ app  
│  ├ components  
│  ├ lib  
│  └ styles  
│  
├ backend  
│  └ app  
│     ├ routes  
│     ├ services  
│     ├ models  
│     └ main.py  
│  
├ docs  
│  └ prd.md  
│  
└ codex.md  
---

# **How codex Should Work**

codex should:

* propose file structure before editing

* show diffs before modifying files

* make small incremental edits

* explain architectural decisions

* avoid rewriting large sections without explanation

Prefer:

* a few **beautiful sections**

* over many **average ones**

---

# **Current Status**

PRD approved.

Week 1 in progress.

Current goal:

* scaffold project

* no real APIs yet

* no extra features

Build:

* repo structure

* frontend \+ backend setup

* Supabase connection

* mock `/visa-check` endpoint

* first landing page

* first visa-check UI flow

