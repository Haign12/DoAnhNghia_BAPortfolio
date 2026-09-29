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

_Product Designer focused on decision-heavy fintech/B2B products, responsive systems and AI-assisted design-to-code. I use AI for repository grounding, synthesis, alternative exploration, implementation support and browser QA while keeping product judgment, direct user evidence and consequential design decisions human-owned._

== Experience

#work(
  title: "UI/UX Designer",
  location: "Full-time",
  company: "MangoAds — SEO Optimization & Web Design Agency",
  dates: dates-helper(start-date: "May 2026", end-date: "Sep 2026"),
)
- Translated client requirements into IA, user flows, and responsive UI systems across 8+ web projects; standardized reusable Figma components and handoff specifications for more consistent implementation.

#work(
  title: "UI/UX Designer",
  location: "Full-time",
  company: "Tikera Technology & Brand Development",
  dates: dates-helper(start-date: "Dec 2025", end-date: "Apr 2026"),
)
- Designed user journeys, wireframes, and design systems for 15+ product flows; specified empty, error, loading and edge-case states before development to reduce ambiguity during implementation and QA.

#work(
  title: "Intern UI/UX Designer",
  location: "Remote",
  company: "Trésor Solution Company",
  dates: dates-helper(start-date: "Sep 2025", end-date: "Dec 2025"),
)
- Supported responsive product flows, reusable UI patterns and developer handoff specifications across MVP work; partnered with engineering on design-to-code details and implementation-ready states.

== Selected Product & Systems Work

#project(
  name: "UIUX Factory — AI-assisted Product Design Workflow",
  role: "DesignOps · AI Workflow · Governance · Browser QA",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-uiux-factory.html",
)
- *Problem:* AI can accelerate plausible output while project truth, ownership and quality evidence remain ambiguous. *System:* evidence states, ADOPT/ADAPT/REJECT decisions, phase-aware skill routing, implementation support, Playwright/axe/Lighthouse QA and root-cause repair. *Boundary:* repository and workflow are real; adoption and efficiency impact remain planned validation.

#project(
  name: "Nova — Consumer Fintech",
  role: "Product Design · Financial Decision UX · Responsive Prototype",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-nova.html",
)
- *Problem:* account balance alone can hide obligations that make part of the money unsafe to spend. *Decision:* pair present balance with future commitments and a protected buffer. *Evidence:* alternatives, trade-offs, recovery states and a working prototype; Round 01 usability validation is recruiting (0 verified sessions), with no measured business uplift claimed.

#project(
  name: "Sentry — Fraud Operations",
  role: "Product Design · Operational Systems · Investigation UX",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-sentry.html",
)
- *Problem:* investigators can lose decision context when alert priority, evidence and consequences are fragmented. *Decision:* keep evidence-to-action inside one stable investigation model with explicit recovery paths. *Evidence:* implemented operational prototype and decision-focused case study.

#project(
  name: "VAS Education — Website Redesign",
  role: "Information Architecture · Decision-support UX · Responsive Prototype",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-vas-education.html",
)
- *Problem:* prospective families had extensive information but no clear decision path across programs, campuses and admissions. *Decision:* structure the journey as trust → fit → daily reality → action. *Evidence:* implemented responsive prototype; production enrollment impact is not claimed.

== Education & Skills

*Education:* University of Science — HCMUS, Information Technology (2021–2026) · Claude Bernard University Lyon 1, Information Technology (2021–2025) · Foundations of Google UX Design (2026).

*Product Design:* problem framing, information architecture, user flows, interaction design, responsive systems, prototyping, state design, trade-off articulation, validation planning, metric trees and evidence boundaries. *AI-assisted workflow:* repository grounding, synthesis, alternative exploration, critique, coding-agent collaboration, design contracts, documentation and root-cause repair. *Implementation & QA:* Figma, HTML/CSS/JavaScript, React/Next.js/TypeScript (Resolve AI — CI-verified), Git/GitHub, Playwright/Chromium, axe-core and Lighthouse. *Business Analysis:* requirement gathering, user stories, acceptance criteria, process modeling and MVP definition.
