#import "@preview/basic-resume:0.2.9": *

// UI/UX CV: problem framing -> design decisions -> implemented outcome.
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

UI/UX Designer turning business and user problems into clear flows, responsive interfaces and working prototypes, with decisions tied to evidence, implementation constraints and bounded outcomes.

== Design Process

*Business problem* → *User problem* → *Evidence* → *UX hypothesis* → *User flow* → *Interaction* → *UI* → *Prototype* → *Validation* → *Iteration* → *Product outcome*

== Experience

#work(
  title: "UI/UX Designer",
  location: "Vietnam",
  company: "MangoAds",
  dates: dates-helper(start-date: "Aug 2026", end-date: "Present"),
)
- Translate business goals into IA, user flows, responsive UI and interaction states for client-facing web work. *Outcome:* implementation-ready structure, hierarchy and developer handoff without claiming unverified client impact.

#work(
  title: "UI/UX Designer",
  location: "Ho Chi Minh City",
  company: "Tikera Technology & Brand Development",
  dates: dates-helper(start-date: "Feb 2025", end-date: "Jul 2025"),
)
- Converted product requirements into flows, wireframes and high-fidelity screens, clarifying edge cases before development. *Outcome:* more consistent interface patterns and implementation decisions.

#work(
  title: "Intern UI/UX Designer",
  location: "Remote",
  company: "Trésor Solution Company",
  dates: dates-helper(start-date: "Jun 2025", end-date: "Dec 2025"),
)
- Supported responsive flows, screen states and reusable patterns for product iterations. *Outcome:* clearer interaction models and handoff inputs for team review.

== Selected UI/UX Work

#project(
  name: "VAS Education",
  role: "IA / responsive education experience",
  dates: "2026",
  url: "ngh1aa.github.io/RedesignVAS",
)
- For prospective families choosing a school, solved “information without a path” with a question-led sequence: trust → fit → daily reality → action. *Outcome:* responsive prototype connecting brand proof, pathways, campuses and admissions; no conversion claim.

#project(
  name: "StudioOS",
  role: "Product design / SaaS workspace",
  dates: "2026",
  url: "ngh1aa.github.io/StudioOS",
)
- For small creative teams, reduced dashboard overload with project health → focus → context → quiet feedback. *Outcome:* first implemented slice covering overview, search, tasks, creation, reviews and notifications; next step is real-team IA validation.

#project(
  name: "Atelier",
  role: "Mobile-first fashion commerce",
  dates: "2025–2026",
  url: "ngh1aa.github.io/Atelier",
)
- For fashion shoppers, balanced editorial desire with purchase clarity by increasing information density from discover → evaluate → buy. *Outcome:* mobile-first prototype from discovery through checkout; no commercial-performance claim.

== Education & Skills

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

- *UX / Product*: problem framing, IA, research synthesis, user flows, interaction, validation planning. *Tools*: Figma, design systems, HTML, CSS, JavaScript, GitHub.
