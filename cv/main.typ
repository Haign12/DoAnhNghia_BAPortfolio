#import "@preview/basic-resume:0.2.9": *

#let name = "Do Anh Nghia"
#let location = "Ho Chi Minh City, Vietnam"
#let email = "anhnghia9a633@gmail.com"
#let phone = "+84 7988 760 74"
#let personal-site = "haign12.github.io/DoAnhNghia_BAPortfolio"

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
- Translate business requirements into information architecture, user flows, responsive UI systems and interaction states for client-facing web projects. *Outcome:* clearer content structures, more consistent interface patterns and implementation-ready handoff.

#work(
  title: "UI/UX Designer",
  location: "Full-time",
  company: "Tikera Technology & Brand Development",
  dates: dates-helper(start-date: "Dec 2025", end-date: "Apr 2026"),
)
- Designed user flows, wireframes and high-fidelity interfaces while defining interaction states and edge cases. *Outcome:* improved UI consistency and clearer implementation decisions.

#work(
  title: "Intern UI/UX Designer",
  location: "Remote",
  company: "Trésor Solution Company",
  dates: dates-helper(start-date: "Sep 2025", end-date: "Dec 2025"),
)
- Supported responsive product flows, reusable UI patterns and developer handoff. *Outcome:* clearer interaction models for product iterations.

== Selected Personal Projects

#project(
  name: "LuxRoom — Furniture E-commerce Website",
  role: "UI/UX Design · Responsive Prototype",
  dates: "2026",
  url: "haign12.github.io/DoAnhNghia_BAPortfolio/case-study-luxroom.html",
)
- *Problem:* premium furniture shopping can hide the practical information users need to judge fit, material, dimensions and delivery. *Solution:* room context → material preference → product evaluation → save / checkout. *Outcome:* responsive prototype connecting contextual discovery, product specifications, Saved Room and checkout.

#project(
  name: "Atelier — Fashion E-commerce Website",
  role: "UI/UX Design · Mobile-first Prototype",
  dates: "2026",
  url: "haign12.github.io/DoAnhNghia_BAPortfolio/case-study-atelier.html",
)
- *Problem:* editorial fashion experiences can create desire while making product decisions harder. *Solution:* discover → evaluate → buy, with information density increasing as purchase intent grows. *Outcome:* mobile-first prototype covering collection discovery, product decisions, variants and checkout.

#project(
  name: "VAS Education — Website Redesign",
  role: "Information Architecture · Responsive Prototype",
  dates: "2026",
  url: "haign12.github.io/DoAnhNghia_BAPortfolio/case-study-vas-education.html",
)
- *Problem:* prospective families had extensive information but no clear decision path across programs, campuses and admissions. *Solution:* trust → fit → daily reality → action. *Outcome:* responsive prototype connecting brand proof, learning pathways, campus context and admissions into one parent journey.

#project(
  name: "Capital Place — Website Redesign",
  role: "Decision-support UX · Interactive Prototype",
  dates: "2026",
  url: "haign12.github.io/DoAnhNghia_BAPortfolio/case-study-capital-place.html",
)
- *Problem:* brochure-style property content did not support practical leasing decisions. *Solution:* place → space requirement → floor context → enquiry, including Space Finder and contextual enquiry flows. *Outcome:* interactive responsive prototype demonstrating a clearer leasing decision-support experience.

== Education & Skills

*Education:* University of Science — HCMUS, Information Technology (2021–2026) · Claude Bernard University Lyon 1, Information Technology (2021–2025) · Foundations of Google UX Design (2026).

*UI/UX Design:* wireframing, high-fidelity prototyping, user research, design systems, information architecture, user flows, interaction design, responsive design. *Business Analysis:* requirement gathering, user stories, acceptance criteria, process modeling, MVP definition.
