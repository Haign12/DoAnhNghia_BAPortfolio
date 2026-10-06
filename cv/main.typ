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

_Product Designer · UI/UX · Design-to-Code with 1+ year of professional experience across agency and product teams. I structure decision-heavy journeys from requirements and IA through interaction states, responsive prototypes and developer handoff, using AI-assisted workflows for implementation support and QA while keeping product judgment and evidence boundaries human-owned._

== Experience

#work(
  title: "UI/UX Designer",
  location: "Full-time",
  company: "MangoAds — SEO Optimization & Web Design Agency",
  dates: dates-helper(start-date: "May 2026", end-date: "Sep 2026"),
)
- Led UI/UX redesign and information architecture across 8+ client-facing web platforms, standardizing reusable components, responsive rules and implementation-ready handoff.

#work(
  title: "UI/UX Designer",
  location: "Full-time",
  company: "Tikera Technology & Brand Development",
  dates: dates-helper(start-date: "Dec 2025", end-date: "Apr 2026"),
)
- Structured user flows, wireframes and design systems for 15+ product journeys, defining loading, empty, error and edge-case states before development.

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
  role: "Product Design · Commerce UX · Responsive Prototype",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-luxroom.html",
)
- *Problem:* High-consideration furniture purchases rely on premium imagery, but shoppers still lack decision-critical context around room fit, dimensions, materials, access and delivery. *Outcome:* Designed an end-to-end decision journey that carries room context and product configuration across discovery, comparison, saved items, cart and checkout, with explicit recovery paths when fit or purchase confidence breaks down.

#project(
  name: "Nova — Consumer Fintech",
  role: "Product Design · Financial Decision UX · Responsive Prototype",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-nova.html",
)
- *Problem:* A bank balance does not tell users what is actually safe to spend when upcoming bills, savings goals, protected buffers and unusual transactions compete for attention. *Outcome:* Reframed the experience around a forward-looking Money Horizon and consequence-aware financial decisions, then iterated key flows using 10 verified direct-user/self-report records across two research rounds without overstating production or usability impact.

#project(
  name: "Sentry — B2B Fraud Operations",
  role: "Product Design · Operational Systems · Investigation UX",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-sentry.html",
)
- *Problem:* Fraud analysts must make high-stakes decisions while evidence is fragmented across multiple systems, increasing context switching and making fast actions difficult to justify or reconstruct. *Outcome:* Designed a unified investigation workspace that keeps alert priority, forensic evidence, decision controls, rationale and audit recovery in one operational model, including conflict, escalation and failure states around consequential actions.

#project(
  name: "VAS Education — Website Redesign",
  role: "Information Architecture · Decision-support UX · Responsive Prototype",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-vas-education.html",
)
- *Problem:* Prospective families must evaluate programmes, campuses, student support and admissions across a large information space without a clear decision path from exploration to action. *Outcome:* Restructured the experience into a coherent education journey from programme and campus discovery through decision support to admissions or visit requests, while preserving one responsive design system across distinct page roles instead of duplicating layouts.

== Education & Skills

*Education:* University of Science — HCMUS, Information Technology (2021–2026) · Claude Bernard University Lyon 1, Information Technology (2021–2025) · Foundations of Google UX Design (2026).

*Product Design:* product strategy, information architecture, user flows, interaction/state design, design systems, responsive UI, research and usability testing. *Design-to-code:* Figma, HTML/CSS/JS, React/Next.js prototypes (AI-assisted), Git/GitHub, Playwright + axe-core accessibility QA. *Workflow:* UIUX Factory for repository grounding, design contracts, implementation support, browser QA and evidence-aware iteration. *Business Analysis:* requirement gathering, user stories, acceptance criteria, process modeling and MVP definition.
