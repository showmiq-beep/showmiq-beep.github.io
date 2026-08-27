(function () {
  "use strict";

  const grid = document.getElementById("projectGrid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  function cardHTML(p) {
    const chipClass = p.group === "common" ? "chip-common" : "chip-major";
    const chipLabel = p.group === "common" ? "Core" : "Concentration";
    return `
      <div class="card" data-group="${p.group}" data-id="${p.id}" style="--card-bg:url('${p.image}')">
        <div class="card-inner">
          <button class="card-open" aria-haspopup="dialog">
            <div class="card-top">
              <span class="card-num">FILE №${String(p.id).padStart(2, "0")}</span>
              <span class="card-chip ${chipClass}">${chipLabel}</span>
            </div>
            <h3>${p.title}</h3>
            <div class="card-meta">
              <strong>${p.type}</strong> · ${p.term}<br>${p.course}
            </div>
            <p class="card-summary">${p.summary}</p>
          </button>
          <div class="card-foot">
            <button class="card-open card-open-link" aria-haspopup="dialog">Open case file →</button>
            ${p.featured ? '<span class="featured-flag">★ Highlight</span>' : ""}
          </div>
          <a class="card-pdf-link" href="${p.pdf}" rel="noopener">
            View original PDF ↗
          </a>
        </div>
      </div>
    `;
  }

  function renderGrid() {
    grid.innerHTML = PROJECTS.map(cardHTML).join("");
    grid.querySelectorAll(".card").forEach((card) => {
      const id = Number(card.dataset.id);
      card.querySelectorAll(".card-open").forEach((trigger) => {
        trigger.addEventListener("click", () => openModal(id));
      });
    });
  }

  function applyFilter(filter) {
    document.querySelectorAll(".card").forEach((card) => {
      const match = filter === "all" || card.dataset.group === filter;
      card.classList.toggle("hidden", !match);
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.dataset.filter);
    });
  });

  // ---------- Modal ----------
  const backdrop = document.getElementById("modalBackdrop");
  const modalEyebrow = document.getElementById("modalEyebrow");
  const modalTitle = document.getElementById("modalTitle");
  const modalMeta = document.getElementById("modalMeta");
  const modalDescription = document.getElementById("modalDescription");
  const modalJustification = document.getElementById("modalJustification");
  const modalClose = document.getElementById("modalClose");
  const modalPdfLink = document.getElementById("modalPdfLink");
  let lastFocused = null;

  function openModal(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    lastFocused = document.activeElement;

    modalEyebrow.textContent = `File №${String(p.id).padStart(2, "0")} · ${p.group === "common" ? "Common Portfolio" : "PR Concentration"}`;
    modalTitle.textContent = p.title;
    modalMeta.innerHTML = `<strong>${p.type}</strong> · ${p.term} · ${p.course}${p.role ? `<br>Role: <strong>${p.role}</strong>` : ""}
      <div class="modal-tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>`;
    modalDescription.textContent = p.description;
    modalJustification.textContent = p.justification;
    modalPdfLink.href = p.pdf;

    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  modalClose.addEventListener("click", closeModal);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("open")) closeModal();
  });

  // ---------- Mobile nav ----------
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  renderGrid();
})();
