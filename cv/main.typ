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

== Experience

#work(
  title: "UI/UX Designer",
  location: "Full-time",
  company: "MangoAds — SEO Optimization & Web Design Agency",
  dates: dates-helper(start-date: "May 2026", end-date: "Sep 2026"),
)
- Translated client requirements into information architecture, user flows, responsive UI systems and interaction states for client-facing web projects. *Outcome:* clearer content structures, more consistent interface patterns and implementation-ready handoff.

#work(
  title: "UI/UX Designer",
  location: "Full-time",
  company: "Tikera Technology & Brand Development",
  dates: dates-helper(start-date: "Dec 2025", end-date: "Apr 2026"),
)
- Designed user journeys, wireframes, high-fidelity interfaces and reusable patterns while defining loading, empty, error and recovery states. *Outcome:* stronger UI consistency and clearer implementation decisions across product flows.

#work(
  title: "Intern UI/UX Designer",
  location: "Remote",
  company: "Trésor Solution Company",
  dates: dates-helper(start-date: "Sep 2025", end-date: "Dec 2025"),
)
- Supported responsive product flows, reusable UI patterns and developer handoff specifications. *Outcome:* clearer interaction models and more complete design references for product iteration.

== Selected Personal Projects

#project(
  name: "Nova — Personal Banking & Money Planning",
  role: "Product Thinking · UX/UI · Interactive Prototype",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-nova.html",
)
- *Problem:* account balance alone does not explain what is safe to spend once upcoming obligations and savings plans are considered. *Hypothesis:* combining current balance, known commitments and a protected buffer can support clearer day-to-day money decisions. *Evidence state:* independent concept with validation metrics defined but not yet measured.

#project(
  name: "Sentry — Fraud & Risk Operations Console",
  role: "Complex Workflows · Systems Thinking · Prototype",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-sentry.html",
)
- *Problem:* fraud decisions require analysts to compare multiple risk signals before taking high-consequence actions. *Hypothesis:* a unified queue, evidence workspace and decision dock can reduce context switching while preserving rationale and auditability. *Evidence state:* benchmark-informed independent concept; usability and operational metrics remain a validation plan.

#project(
  name: "Atelier — Luxury Fashion Commerce",
  role: "Art Direction · Interaction Design · Responsive Prototype",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-atelier.html",
)
- *Problem:* editorial expression can build desire while obscuring fit, variant and purchase information. *Design response:* increase information density as purchase intent rises, keeping brand expression distinct from task-critical commerce states.

#project(
  name: "LuxRoom — High-consideration Furniture Commerce",
  role: "Product Detail UX · Decision Support · Responsive Prototype",
  dates: "2026",
  url: "do-anh-nghia-uiux-portfolio.vercel.app/case-study-luxroom.html",
)
- *Problem:* premium furniture decisions depend on practical fit, material, dimensions, context and delivery information. *Design response:* connect room context and editorial discovery to technical product evaluation, saving and checkout.

== Education & Skills

*Education:* University of Science — HCMUS, Information Technology (2021–2026) · Claude Bernard University Lyon 1, Information Technology (2021–2025) · Foundations of Google UX Design (2026).

*UI/UX Design:* wireframing, high-fidelity prototyping, research planning, design systems, information architecture, user flows, interaction design, responsive design and accessibility. *Product & Delivery:* problem framing, hypotheses, success metrics, acceptance criteria, design QA and design-to-code collaboration.
