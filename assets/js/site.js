(() => {
  const doc = document;
  const root = doc.documentElement;
  const $ = id => doc.getElementById(id);

  const setFooterYear = () => {
    const el = $("footer-year");
    if (!el) return;
    el.textContent = `${new Date().getFullYear()} · Frankfurt, Germany`;
  };

  const initLoader = () => {
    const loader = $("pre-load");
    if (!loader) return;
    let hidden = false;
    const hide = () => {
      if (hidden) return;
      hidden = true;
      loader.classList.add("loader--hidden");
      setTimeout(() => loader.remove(), 800);
    };
    const scheduleHide = () => {
      if (hidden) return;
      const raf = window.requestAnimationFrame;
      if (typeof raf === "function") {
        raf(() => hide());
        return;
      }
      hide();
    };
    setTimeout(scheduleHide, 0);
    window.addEventListener("load", scheduleHide, { once: true });
    setTimeout(scheduleHide, 2000);
  };

  const initConsent = () => {
    const banner = $("cookie-consent");
    const accept = $("consent-accept");
    const decline = $("consent-decline");
    const gtagScript = $("gtag-script");
    if (!banner || !accept || !decline || !gtagScript) return;
    const key = "ay_ga_consent";
    const loadAnalytics = accepted => {
      if (accepted) {
        gtagScript.innerHTML = "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-2R92LFMXD5');";
        gtagScript.setAttribute("async", "");
        gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-2R92LFMXD5";
        return;
      }
      window["ga-disable-G-2R92LFMXD5"] = true;
    };
    const toggleBanner = visible => {
      banner.classList.toggle("is-visible", visible);
      banner.setAttribute("aria-hidden", visible ? "false" : "true");
    };
    const stored = localStorage.getItem(key);
    if (stored === "accepted") {
      loadAnalytics(true);
    } else if (stored === "declined") {
      loadAnalytics(false);
    } else {
      toggleBanner(true);
    }
    accept.addEventListener("click", () => {
      localStorage.setItem(key, "accepted");
      loadAnalytics(true);
      toggleBanner(false);
    });
    decline.addEventListener("click", () => {
      localStorage.setItem(key, "declined");
      loadAnalytics(false);
      toggleBanner(false);
    });
  };

  const initEmail = () => {
    const link = $("email-link");
    const meta = $("email-meta");
    if (!link || !meta) return;
    const address = "artyom.yagovdik@gmail.com";
    link.addEventListener("click", event => {
      event.preventDefault();
      window.location.href = `mailto:${address}`;
    });
    meta.textContent += address;
  };

  const initTheme = () => {
    const btn = $("theme-toggle-btn");
    const label = $("theme-toggle-label");
    if (!btn || !label) return;
    const hevyIcon = $("hevy-icon");
    const key = "ay_theme";
    let userSelection = localStorage.getItem(key);
    const setHevyIcon = theme => {
      if (!hevyIcon) return;
      const src = theme === "dark" ? hevyIcon.dataset.darkSrc : hevyIcon.dataset.lightSrc;
      if (src && hevyIcon.src !== src) hevyIcon.src = src;
    };
    const applyTheme = theme => {
      root.setAttribute("data-theme", theme);
      label.textContent = theme;
      setHevyIcon(theme);
    };
    const current = root.getAttribute("data-theme") || "light";
    applyTheme(userSelection || current);
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    const handleSystem = event => {
      if (userSelection) return;
      applyTheme(event.matches ? "dark" : "light");
    };
    if (media) {
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", handleSystem);
      } else if (typeof media.addListener === "function") {
        media.addListener(handleSystem);
      }
    }
    btn.addEventListener("click", () => {
      const next = (root.getAttribute("data-theme") || "light") === "light" ? "dark" : "light";
      userSelection = next;
      applyTheme(next);
      localStorage.setItem(key, next);
    });
  };

  const initHiddenLinks = () => {
    const trigger = $("elsewhere-trigger");
    if (!trigger) return;
    const container = doc.querySelector(".links");
    if (!container) return;
    const links = ["fragrantica-link", "telegram-link", "instagram-link"].map(id => $(id)).filter(Boolean);
    if (!links.length) return;
    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      links.forEach(link => {
        link.classList.remove("is-hidden");
        container.appendChild(link);
      });
      trigger.classList.add("section-label--active");
      trigger.setAttribute("aria-expanded", "true");
      revealed = true;
    };
    trigger.addEventListener("click", reveal);
  };

  const initPrint = () => {
    const btn = $("print-btn");
    if (!btn) return;
    btn.addEventListener("click", () => window.print());
  };

  doc.addEventListener("DOMContentLoaded", () => {
    setFooterYear();
    initLoader();
    initConsent();
    initEmail();
    initTheme();
    initHiddenLinks();
    initPrint();
  });
})();
