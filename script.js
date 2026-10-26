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
  const filterStatus = document.getElementById("filterStatus");
  filterRow.hidden = false;
  filterRow.addEventListener("click", (event) => {
    const button = event.target.closest(".filter");
    if (!button) return;
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    projects.forEach((project) => {
      project.hidden =
        button.dataset.filter !== "all" &&
        project.dataset.cat !== button.dataset.filter;
    });
    const count = projects.filter((project) => !project.hidden).length;
    filterStatus.textContent = `${count} ${count === 1 ? "project" : "projects"} shown`;
  });

  function revealAnchor() {
    const id = window.location.hash.slice(1);
    const target = id && document.getElementById(id);
    if (!target) return;
    const details = target.closest("details");
    if (details) {
      details.open = true;
      const all = filterRow.querySelector('[data-filter="all"]');
      if (target.matches(".index-card") && target.hidden) all.click();
    }
  }
  window.addEventListener("hashchange", revealAnchor);
  revealAnchor();
})();
