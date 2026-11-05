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
  const archive = document.getElementById("projectArchive");
  const groups = [...archive.querySelectorAll(".project-group")].map((element) => ({
    element,
    id: element.dataset.group,
    label: element.dataset.filterLabel,
    cards: [...element.querySelectorAll(".index-card")],
    count: element.querySelector(".group-count"),
  })).filter((group) => group.cards.length);
  const total = groups.reduce((sum, group) => sum + group.cards.length, 0);
  const filters = [{ id: "all", label: "All Projects", size: total }, ...groups.map(
    ({ id, label, cards }) => ({ id, label, size: cards.length }),
  )].map(({ id, label, size }) => {
    const button = document.createElement("button");
    button.className = "filter";
    button.type = "button";
    button.dataset.filter = id;
    button.setAttribute("aria-controls", "projectResults");
    button.textContent = label;
    const badge = document.createElement("span");
    badge.textContent = String(size);
    button.append(badge);
    filterRow.append(button);
    return button;
  });
  document.getElementById("archiveLabel").textContent = "Browse all " + total + " projects";
  archive.querySelector(".archive-summary-note").textContent = groups.length + " industries";
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
  const searchable = new Map(groups.flatMap(({ label, cards }) => cards.map(
    (card) => [card, normalize(label + " " + [...card.querySelector(".index-card-copy").children]
      .filter((field) => !field.classList.contains("artifact-links"))
      .map((field) => field.textContent).join(" "))],
  )));

  function filterProjects() {
    const query = normalize(search.value.trim());
    filters.forEach((filter) => {
      const active = filter.dataset.filter === category;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    let count = 0;
    let groupCount = 0;
    groups.forEach((group) => {
      let visible = 0;
      group.cards.forEach((card) => {
        card.hidden =
          (category !== "all" && group.id !== category) ||
          !searchable.get(card).includes(query);
        if (!card.hidden) visible += 1;
      });
      group.element.hidden = visible === 0;
      group.count.textContent = String(visible);
      if (visible) groupCount += 1;
      count += visible;
    });
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
    const archive = target.closest(".project-archive") || target.querySelector(".project-archive");
    if (archive) archive.open = true;
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
  filterProjects();
  filterStatus.hidden = false;
  archive.querySelector(".project-tools").hidden = false;
  window.addEventListener("hashchange", revealAnchor);
  revealAnchor();
})();
