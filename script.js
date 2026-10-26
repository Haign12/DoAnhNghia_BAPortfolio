(() => {
  const root = document.documentElement;
  const menuButton = document.getElementById("menuBtn");
  const navigation = document.getElementById("navLinks");
  const themeButton = document.getElementById("themeToggle");
  const mobile = window.matchMedia("(max-width: 839px)");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  root.classList.add("js");
  menuButton.hidden = false;
  themeButton.hidden = false;

  function closeMenu(returnFocus = false) {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("open"))
      closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-nav")) closeMenu();
  });
  mobile.addEventListener("change", () => closeMenu());

  function isDark() {
    return root.dataset.theme
      ? root.dataset.theme === "dark"
      : systemTheme.matches;
  }
  function updateThemeLabel() {
    const dark = isDark();
    themeButton.textContent = dark ? "Light" : "Dark";
    themeButton.setAttribute(
      "aria-label",
      dark ? "Switch to light theme" : "Switch to dark theme",
    );
    document.querySelector('meta[name="theme-color"]').content =
      getComputedStyle(root).getPropertyValue("--ds-surface-page").trim();
    document.querySelector('link[rel="icon"]').href =
      `assets/images/brand/xii-an-${dark ? "dark" : "light"}.svg`;
  }
  themeButton.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* Theme works without persistence. */
    }
    updateThemeLabel();
  });
  systemTheme.addEventListener("change", updateThemeLabel);
  updateThemeLabel();

  const filterRow = document.querySelector(".filter-row");
  const filters = [...filterRow.querySelectorAll(".filter")];
  const projects = [...document.querySelectorAll(".index-card")];
  const groups = [...document.querySelectorAll(".project-group")];
  const search = document.getElementById("projectSearch");
  const empty = document.getElementById("catalogEmpty");
  const filterStatus = document.getElementById("filterStatus");
  let category = "all";
  const normalize = (value) =>
    value
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .replaceAll("đ", "d");
  const searchable = new Map(
    projects.map((project) => [project, normalize(project.textContent)]),
  );
  document.querySelector(".project-tools").hidden = false;

  function filterProjects() {
    const query = normalize(search.value.trim());
    filters.forEach((filter) => {
      const active = filter.dataset.filter === category;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    projects.forEach((project) => {
      project.hidden =
        (category !== "all" && project.dataset.cat !== category) ||
        !searchable.get(project).includes(query);
    });
    groups.forEach((group) => {
      const count = [...group.querySelectorAll(".index-card")].filter(
        (project) => !project.hidden,
      ).length;
      group.hidden = count === 0;
      group.querySelector(".group-count").textContent = String(count);
    });
    const count = projects.filter((project) => !project.hidden).length;
    const groupCount = groups.filter((group) => !group.hidden).length;
    empty.hidden = count > 0;
    filterStatus.textContent = `${count} ${count === 1 ? "project" : "projects"} in ${groupCount} ${groupCount === 1 ? "category" : "categories"}`;
  }

  filterRow.addEventListener("click", (event) => {
    const button = event.target.closest(".filter");
    if (!button) return;
    category = button.dataset.filter;
    filterProjects();
  });
  search.addEventListener("input", filterProjects);
  document.getElementById("resetProjects").addEventListener("click", () => {
    category = "all";
    search.value = "";
    filterProjects();
    search.focus();
  });

  function revealAnchor() {
    const id = window.location.hash.slice(1);
    const target = id && document.getElementById(id);
    if (!target) return;
    const group = target.closest(".project-group");
    if (group) {
      if (group.hidden || target.hidden) {
        category = "all";
        search.value = "";
        filterProjects();
      }
      target.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }
  window.addEventListener("hashchange", revealAnchor);
  revealAnchor();
})();
