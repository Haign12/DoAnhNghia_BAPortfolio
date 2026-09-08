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

== Profile

UI/UX Designer focused on complex web and product experiences. I turn dense content, ambiguous requirements and multi-step workflows into clear information architecture, responsive interfaces and working front-end prototypes.

== Design Process

*Business problem* → *User problem* → *Evidence* → *UX hypothesis* → *User flow* → *Interaction* → *UI* → *Prototype* → *Validation* → *Iteration* → *Product outcome*

== Experience

#work(
  title: "UI/UX Designer",
  location: "Vietnam",
  company: "MangoAds — SEO Optimization & Web Design Agency",
  dates: dates-helper(start-date: "Aug 2025", end-date: "Present"),
)
- Translate business goals and content requirements into IA, user flows, responsive page systems, interaction states and implementation-ready UI. *Outcome:* clearer structure, reusable patterns and developer-facing handoff details across client web work.

#work(
  title: "UI/UX Designer",
  location: "Ho Chi Minh City",
  company: "Tikera Technology & Brand Development",
  dates: dates-helper(start-date: "Feb 2025", end-date: "Jul 2025"),
)
- Turned product requirements into flows, wireframes and high-fidelity interfaces, clarifying edge cases and interaction behavior before development. *Outcome:* more consistent interface decisions and handoff inputs.

#work(
  title: "Intern UI/UX Designer",
  location: "Remote",
  company: "Trésor Solution Company",
  dates: dates-helper(start-date: "Jun 2025", end-date: "Dec 2025"),
)
- Supported responsive flows, screen states and reusable UI patterns for product iterations. *Outcome:* clearer interaction models for team review and implementation.

== Selected Case Studies

#project(
  name: "Capital Place",
  role: "Commercial real-estate / leasing decision support",
  dates: "2026",
  url: "haign12.github.io/DoAnhNghia_BAPortfolio/case-study-capital-place.html",
)
- For prospective occupiers, reframed brochure-style property content around place → requirement → floor context → enquiry, including Space Finder and truthful non-live availability states. *Outcome:* interactive prototype demonstrating a clearer high-consideration decision model.

#project(
  name: "VAS Education",
  role: "Education / IA / parent journey",
  dates: "2026",
  url: "haign12.github.io/DoAnhNghia_BAPortfolio/case-study-vas-education.html",
)
- For prospective families, reorganized a broad content ecosystem around trust → fit → daily reality → action. *Outcome:* responsive prototype connecting brand proof, learning pathways, campus context and admissions in one continuous journey.

#project(
  name: "StudioOS",
  role: "SaaS workspace / project health / next action",
  dates: "2026",
  url: "haign12.github.io/DoAnhNghia_BAPortfolio/case-study-studioos.html",
)
- For small creative teams, reduced dashboard overload with project health → focus → context → quiet feedback. *Outcome:* implemented first vertical slice covering overview, search, task completion, project creation, reviews and notifications.

== Education & Skills

*Education:* University of Science — HCMUS, Information Technology (2021–2026) · Claude Bernard University Lyon 1, Information Technology (2021–2025).

*UX / Product:* problem framing, information architecture, research synthesis, user flows, interaction design, responsive strategy, validation planning. *UI / Prototype:* Figma, design systems, high-fidelity prototyping, HTML, CSS, JavaScript, GitHub.
