#import "@preview/basic-resume:0.2.9": *

// UI/UX portfolio CV: problem framing -> design decisions -> implemented outcome.
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

== Profile

UI/UX Designer who turns business and user problems into structured flows, responsive interfaces and working prototypes. I connect design decisions to evidence, implementation constraints and clearly bounded product outcomes rather than treating UI as decoration.

== Design Process

*Business problem* → *User problem* → *Research / evidence* → *UX hypothesis* → *User flow* → *Interaction* → *UI* → *Prototype* → *Validation* → *Iteration* → *Product outcome*

== Experience

#work(
  title: "UI/UX Designer",
  location: "Vietnam",
  company: "MangoAds",
  dates: dates-helper(start-date: "Aug 2026", end-date: "Present"),
)
- Translate business goals and content-heavy requirements into information architecture, user flows, responsive UI, visual systems and interaction states for client-facing web work.
- *Outcome:* implementation-ready interface directions that connect structure, hierarchy and developer handoff; client impact is only claimed when verified.

#work(
  title: "UI/UX Designer",
  location: "Ho Chi Minh City",
  company: "Tikera Technology & Brand Development",
  dates: dates-helper(start-date: "Feb 2025", end-date: "Jul 2025"),
)
- Turned product requirements into user flows, wireframes and high-fidelity screens, clarifying edge cases and interaction behavior before development.
- *Outcome:* more consistent interface patterns and clearer implementation decisions across product work.

#work(
  title: "Intern UI/UX Designer",
  location: "Remote",
  company: "Trésor Solution Company",
  dates: dates-helper(start-date: "Jun 2025", end-date: "Dec 2025"),
)
- Supported responsive product flows, screen states and reusable interface patterns, with attention to edge cases and iteration feedback.
- *Outcome:* reviewable interaction models and clearer handoff inputs for the product team.

== Selected UI/UX Work

#project(
  name: "VAS Education",
  role: "Information architecture / responsive education experience",
  dates: "2026",
  url: "ngh1aa.github.io/RedesignVAS",
)
- *For / problem / why:* prospective families choosing a school; a broad content ecosystem existed without a clear decision path, so I reorganized the experience around changing family questions: trust → fit → daily reality → action.
- *Outcome:* implemented responsive prototype connecting brand proof, learning pathways, campus context and admissions in one continuous journey; no conversion outcome claimed.

#project(
  name: "StudioOS",
  role: "Product design / SaaS workspace",
  dates: "2026",
  url: "ngh1aa.github.io/StudioOS",
)
- *For / problem / why:* small creative teams; dashboards can overload attention or remove project context, so I shaped the interaction model around project health → focus → context → quiet feedback.
- *Outcome:* implemented first vertical slice with overview, search, task completion, project creation, reviews and notifications; next validation is real-team information-architecture testing.

#project(
  name: "Atelier",
  role: "Mobile-first fashion commerce",
  dates: "2025–2026",
  url: "ngh1aa.github.io/Atelier",
)
- *For / problem / why:* fashion shoppers; editorial storytelling can create desire while hiding practical product decisions, so information density increases with intent across discover → evaluate → buy.
- *Outcome:* implemented mobile-first prototype preserving editorial identity across product discovery, product decisions and checkout; no commercial-performance claim.

== Education

#edu(
  institution: "University of Science — HCMUS",
  location: "Ho Chi Minh City",
  dates: dates-helper(start-date: "2021", end-date: "2026"),
  degree: "Information Technology",
)

#edu(
  institution: "Claude Bernard University Lyon 1",
  location: "Lyon, France",
  dates: dates-helper(start-date: "2021", end-date: "2025"),
  degree: "Information Technology",
)

== Skills

- *UX / Product*: problem framing, research synthesis, information architecture, UX hypotheses, user flows, interaction design, validation planning, responsive strategy.
- *UI / Prototyping*: Figma, design systems, high-fidelity prototyping, HTML, CSS, JavaScript, GitHub.
