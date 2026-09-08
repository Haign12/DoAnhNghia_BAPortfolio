#import "@preview/basic-resume:0.2.9": *

// Recruiter-facing UI/UX CV based on portfolio evidence.
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

UI/UX Designer focused on complex web and product experiences. I turn ambiguous business requirements, dense content and multi-step workflows into clear information architecture, responsive interfaces and working front-end prototypes — connecting structure, visual craft and interaction in one design process.

== Design Approach

*Business / user problem* → *Evidence* → *UX hypothesis* → *User flow* → *Interaction* → *UI* → *Prototype* → *Validation* → *Iteration* → *Product outcome*

== Experience

#work(
  title: "UI/UX Designer",
  location: "Vietnam",
  company: "MangoAds — SEO Optimization & Web Design Agency",
  dates: dates-helper(start-date: "Aug 2025", end-date: "Present"),
)
- Shape client-facing web experiences from business goals and content requirements into IA, user flows, responsive page systems, interaction states and implementation-ready UI.
- Work with an implementation-aware mindset: define hierarchy, reusable patterns, responsive behavior and developer-facing details so design decisions survive handoff.

#work(
  title: "UI/UX Designer",
  location: "Ho Chi Minh City",
  company: "Tikera Technology & Brand Development",
  dates: dates-helper(start-date: "Feb 2025", end-date: "Jul 2025"),
)
- Translated product requirements into user flows, wireframes and high-fidelity interfaces; clarified interaction behavior, edge cases and reusable patterns before development.

#work(
  title: "Intern UI/UX Designer",
  location: "Remote",
  company: "Trésor Solution Company",
  dates: dates-helper(start-date: "Jun 2025", end-date: "Dec 2025"),
)
- Supported responsive product flows, screen states and iterative UI refinement, producing clearer interaction models and handoff inputs for team review.

== Selected Case Studies

#project(
  name: "Capital Place",
  role: "Commercial real-estate / leasing decision support",
  dates: "2026",
  url: "haign12.github.io/DoAnhNghia_BAPortfolio/case-study-capital-place.html",
)
- *Problem:* brochure-style property content did not help prospective occupiers make a space decision. *Solution:* reframed the journey around place → requirement → floor context → enquiry, with Space Finder and truthful non-live availability states. *Outcome:* interactive prototype demonstrating a clearer high-consideration decision model.

#project(
  name: "VAS Education",
  role: "Education / information architecture / parent journey",
  dates: "2026",
  url: "haign12.github.io/DoAnhNghia_BAPortfolio/case-study-vas-education.html",
)
- *Problem:* useful school content existed without a clear path for prospective families. *Solution:* reorganized the experience around trust → fit → daily reality → action. *Outcome:* implemented responsive prototype connecting brand proof, learning pathways, campus context and admissions in one continuous journey.

#project(
  name: "StudioOS",
  role: "SaaS workspace / project health / next action",
  dates: "2026",
  url: "haign12.github.io/DoAnhNghia_BAPortfolio/case-study-studioos.html",
)
- *Problem:* creative-team dashboards can either overload attention or remove project context. *Solution:* prioritized project health → focus → context → quiet feedback. *Outcome:* implemented first vertical slice covering overview, search, task completion, project creation, reviews and notifications.

#project(
  name: "Atelier",
  role: "Mobile-first fashion commerce",
  dates: "2026",
  url: "haign12.github.io/DoAnhNghia_BAPortfolio/case-study-atelier.html",
)
- *Problem:* editorial fashion experiences can create desire while hiding practical shopping actions. *Solution:* increased information density with intent across discover → evaluate → buy. *Outcome:* implemented mobile-first commerce prototype preserving brand expression through product and checkout flows.

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

- *UX / Product:* problem framing, information architecture, research synthesis, user flows, interaction design, responsive strategy, validation planning.
- *UI / Prototype:* Figma, design systems, high-fidelity prototyping, HTML, CSS, JavaScript, GitHub.
