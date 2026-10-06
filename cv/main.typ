#import "@preview/basic-resume:0.2.9": *

#let name = "Do Anh Nghia"
#let location = "Ho Chi Minh City, Vietnam"
#let email = "anhnghia9a633@gmail.com"
#let phone = "+84 7988 760 74"
#let personal-site = "do-anh-nghia-uiux-portfolio.vercel.app"

#show: resume.with(
  author: name,
  location: location,
  email: email,
  phone: phone,
  personal-site: personal-site,
  accent-color: "#111111",
  font: "Noto Sans",
  paper: "a4",
  author-position: left,
  personal-info-position: left,
)

#show heading: set text(font: "Libertinus Serif")

_Product Designer · UI/UX · Design-to-Code with 1+ year of professional experience across agency and product teams, focused on decision-heavy journeys, interaction states, responsive systems and developer-ready handoff._

== Experience

#work(
  title: "UI/UX Designer",
  location: "Full-time",
  company: "MangoAds — SEO Optimization & Web Design Agency",
  dates: dates-helper(start-date: "May 2026", end-date: "Sep 2026"),
)
- Led UI/UX redesign and IA across 8+ client-facing web platforms, standardizing reusable components, responsive rules and handoff.

#work(
  title: "UI/UX Designer",
  location: "Full-time",
  company: "Tikera Technology & Brand Development",
  dates: dates-helper(start-date: "Dec 2025", end-date: "Apr 2026"),
)
- Structured user flows, wireframes and design systems for 15+ product journeys, including loading, empty, error and edge-case states.

#work(
  title: "Intern UI/UX Designer",
  location: "Remote",
  company: "Trésor Solution Company",
  dates: dates-helper(start-date: "Sep 2025", end-date: "Dec 2025"),
)
- Partnered with engineers on responsive product flows, reusable UI patterns and design-to-code specifications for MVP builds.

== Selected Product Work

#project(
  name: "LuxRoom — Furniture E-commerce",
  role: "Product Design · Commerce UX",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-luxroom.html",
)
- *Problem:* Premium imagery creates desire but does not resolve room fit, dimensions, materials, access and delivery uncertainty. *Outcome:* Designed a continuous decision journey across discovery, comparison, saved configuration, cart and checkout, with explicit recovery when purchase confidence breaks down.

#project(
  name: "Nova — Consumer Fintech",
  role: "Product Design · Financial Decision UX",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-nova.html",
)
- *Problem:* Balance alone does not show what is truly safe to spend after bills, savings goals and protected buffers. *Outcome:* Reframed the product around a forward-looking Money Horizon and iterated key decisions using 10 verified direct-user/self-report records across two rounds.

#project(
  name: "Sentry — B2B Fraud Operations",
  role: "Product Design · Operational Systems",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-sentry.html",
)
- *Problem:* Fraud analysts make high-stakes decisions while evidence is fragmented across systems and difficult to reconstruct. *Outcome:* Unified alert priority, forensic evidence, decision controls, rationale and audit recovery in one investigation model with conflict, escalation and failure states.

#project(
  name: "VAS Education — Website Redesign",
  role: "IA · Decision-support UX",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-vas-education.html",
)
- *Problem:* Families must compare programmes, campuses, student support and admissions without a clear path from exploration to action. *Outcome:* Restructured the experience from programme/campus discovery through decision support to admissions or visit requests within one responsive design system.

== Education & Skills

*Education:* University of Science — HCMUS, Information Technology (2021–2026) · Claude Bernard University Lyon 1, Information Technology (2021–2025) · Foundations of Google UX Design (2026).

*Skills:* Product strategy, IA & user flows, interaction/state design, design systems, responsive UI, research, usability testing, requirements and acceptance criteria. *Design-to-code:* Figma, HTML/CSS/JS, React/Next.js prototypes (AI-assisted), Git/GitHub, Playwright + axe-core. *Workflow:* UIUX Factory for repository grounding, implementation support, browser QA and evidence-aware iteration.
