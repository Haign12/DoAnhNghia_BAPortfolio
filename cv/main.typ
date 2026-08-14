#import "@preview/basic-resume:0.2.9": *

// Visual portfolio CV: UI/UX-led hierarchy, concise evidence, no BA positioning.
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

UI/UX Designer focused on turning complex product ideas into clear, calm and usable digital experiences. I work across information architecture, user flows, wireframes, high-fidelity interfaces and design systems, with a strong interest in thoughtful interaction details.

== Experience

#work(
  title: "UI/UX Designer",
  location: "Ho Chi Minh City",
  company: "Tikera Technology and Brand Development Company",
  dates: dates-helper(start-date: "Feb 2026", end-date: "May 2026"),
)
- Designed and refined product flows, screen structures and interface patterns for digital products.
- Translated product requirements into user flows, wireframes and high-fidelity interface directions.
- Collaborated with team members to clarify interaction behavior and improve design consistency.

#work(
  title: "Intern UI/UX Designer",
  location: "Remote",
  company: "Trésor Solution Company",
  dates: dates-helper(start-date: "Jun 2025", end-date: "Dec 2025"),
)
- Supported wireframes, user flows and interface iterations across responsive product experiences.
- Helped structure screen behavior, edge cases and reusable interface patterns with the product team.

== Selected UI/UX Work

#project(
  name: "StudioOS",
  role: "Product design / SaaS workspace",
  dates: "2026",
  url: "ngh1aa.github.io/StudioOS",
)
- Designed a calm project workspace for small creative teams, bringing projects, tasks, reviews, calendar and notes into one structured interface.

#project(
  name: "Atelier",
  role: "Mobile-first commerce concept",
  dates: "2025–2026",
  url: "ngh1aa.github.io/Atelier",
)
- Shaped a mobile-first fashion experience around product discovery, editorial hierarchy and a focused path from browsing to purchase.

#project(
  name: "LuxRoom",
  role: "Responsive furniture experience",
  dates: "2025–2026",
  url: "ngh1aa.github.io/LuxRoom",
)
- Designed a responsive furniture experience centered on room context, material language, product detail and intentional exploration.

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

- *Design*: Figma, wireframing, high-fidelity prototyping, user flows, design systems, responsive UI, interaction design.
- *Tools*: HTML, CSS, JavaScript, GitHub, Google UX Design foundations.
