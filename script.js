/* ============================================================
   Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll(".nav__link");

  /* --- Analytics helper ---
     GoatCounter loads async and may be blocked, so always guard. */
  const track = (path, title) => {
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: path, title: title, event: true });
    }
  };

  /* --- Sticky nav background on scroll --- */
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu toggle --- */
  const closeMenu = () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* --- Scroll reveal --- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* --- Active nav link on scroll (scroll spy) --- */
  const sections = [...links]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((l) =>
              l.classList.toggle("active", l.getAttribute("href") === "#" + id)
            );
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -40% 0px" }
    );
    sections.forEach((sec) => spy.observe(sec));
  }

  /* --- Stat count-up animation --- */
  const statNums = document.querySelectorAll(".stat__num");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animateStat = (el) => {
    // Only pure numbers (with optional +) count up; text tiles like 21R1→25R1 stay put
    const match = el.textContent.trim().match(/^(\d+)(\+?)$/);
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!reduceMotion && "IntersectionObserver" in window && statNums.length) {
    const statIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStat(entry.target);
            statIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    statNums.forEach((el) => statIo.observe(el));
  }

  /* --- Video lightbox --- */
  const lightbox = document.getElementById("lightbox");
  const lbVideo = document.getElementById("lightboxVideo");
  const lbClose = document.getElementById("lightboxClose");
  const playBtns = document.querySelectorAll(".project__play");

  if (lightbox && lbVideo) {
    // Which demo is open, and which of its events have already been sent.
    // Reset per open so each viewing is counted once, not once per second.
    let demoName = "demo";
    let sentPlay = false;
    let sentWatched = false;

    const openLightbox = (btn) => {
      demoName = btn.dataset.track || "demo";
      sentPlay = false;
      sentWatched = false;
      lbVideo.src = btn.dataset.video;   // only fetched when opened
      if (btn.dataset.poster) lbVideo.poster = btn.dataset.poster;
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
      lbClose.focus();
      lbVideo.play().catch(() => {});    // autoplay may be blocked; controls remain
    };

    /* Count a real play, not just the click — autoplay can be blocked,
       and someone may open the lightbox without ever starting it. */
    lbVideo.addEventListener("play", () => {
      if (sentPlay) return;
      sentPlay = true;
      track(demoName + "-play", "Demo played");
    });

    /* A 16-minute demo makes "opened" a weak signal, so also record who
       actually stayed. Fires once, after a full minute of watching. */
    lbVideo.addEventListener("timeupdate", () => {
      if (sentWatched || lbVideo.currentTime < 60) return;
      sentWatched = true;
      track(demoName + "-watched-1min", "Demo watched 1+ min");
    });

    const closeLightbox = () => {
      lbVideo.pause();
      lbVideo.removeAttribute("src");
      lbVideo.load();                    // free the buffer
      lightbox.hidden = true;
      document.body.classList.remove("lightbox-open");
    };

    playBtns.forEach((btn) =>
      btn.addEventListener("click", () => openLightbox(btn))
    );
    // Deep link: /#demo (e.g. from the CV) scrolls to Projects and opens the video
    if (window.location.hash === "#demo" && playBtns.length) {
      const btn = playBtns[0];
      document.getElementById("projects")?.scrollIntoView();
      setTimeout(() => openLightbox(btn), 400);
      track("demo-from-cv", "Demo opened from CV link");
    }

    lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-close")) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  /* --- Count CV downloads ---
     The PDF can't report on itself (no JS in a PDF), and the download
     attribute means no page load either, so the click is counted here. */
  document.querySelectorAll('a[href$="CV.pdf"]').forEach((link) => {
    link.addEventListener("click", () => track("cv-download", "CV downloaded"));
  });

  /* --- Footer year --- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
