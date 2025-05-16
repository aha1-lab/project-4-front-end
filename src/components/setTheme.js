function setTheme(themeName) {
  const head = document.head;
  let link = document.getElementById("theme-style");

  if (!link) {
    link = document.createElement("link");
    link.rel = "stylesheet";
    link.id = "theme-style";
    head.appendChild(link);
  }

  link.href = `/styles/${themeName}.css`;
  localStorage.setItem('selectedTheme', themeName);
}

export default setTheme;