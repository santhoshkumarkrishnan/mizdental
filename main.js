// ===========================================================
// MIZ Dental Clinic — site interactions
// ===========================================================

// --- CONFIG: update these two lines with the clinic's real details ---
const CLINIC_WHATSAPP_NUMBER = "918618826027"; // country code + number, no + or spaces
const CLINIC_NAME = "MIZ Dental Clinic";
// -----------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Floating WhatsApp button -> generic message
  const waFloat = document.getElementById("waFloat");
  if (waFloat) {
    const msg = encodeURIComponent(`Hi ${CLINIC_NAME}, I'd like to know more about your services.`);
    waFloat.href = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${msg}`;
  }

  // Booking modal open/close
  const overlay = document.getElementById("bookingOverlay");
  const openTriggers = [
    document.getElementById("openBooking"),
    document.getElementById("openBookingHero"),
    document.getElementById("openBookingFinal")
  ].filter(Boolean);
  const closeBtn = document.getElementById("bookingClose");

  const openModal = () => {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    const firstInput = document.getElementById("bName");
    if (firstInput) firstInput.focus();
  };
  const closeModal = () => {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  openTriggers.forEach(btn => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay && overlay.classList.contains("open")) closeModal();
  });

  // Booking form -> builds a WhatsApp message and opens wa.me
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("bName").value.trim();
      const service = document.getElementById("bService").value;
      const date = document.getElementById("bDate").value;

      let message = `Hi ${CLINIC_NAME}, I'd like to book an appointment.\n\nName: ${name}\nReason: ${service}`;
      if (date) message += `\nPreferred date: ${date}`;

      const url = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener");
      closeModal();
      bookingForm.reset();
    });
  }

  // Tabbed gallery: infrastructure / procedure gallery
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;

      tabButtons.forEach(btn => {
        const isActive = btn === button;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-selected", String(isActive));
      });

      tabPanels.forEach(panel => {
        const isActive = panel.id === `panel-${target}`;
        panel.classList.toggle("active", isActive);
        panel.hidden = !isActive;
      });
    });
  });

  // Gallery hover preview and full-size viewer.
  const galleryImages = document.querySelectorAll(".showcase-card img");
  if (galleryImages.length) {
    const preview = document.createElement("div");
    preview.className = "gallery-preview";
    preview.innerHTML = '<img alt=""><div class="gallery-preview-label">Click to view full image</div>';
    document.body.appendChild(preview);

    const lightbox = document.createElement("div");
    lightbox.className = "gallery-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Enlarged gallery image");
    lightbox.innerHTML = '<button class="gallery-lightbox-close" type="button" aria-label="Close enlarged image">&times;</button><img alt="">';
    document.body.appendChild(lightbox);

    const previewImage = preview.querySelector("img");
    const lightboxImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector(".gallery-lightbox-close");
    let hidePreviewTimer;

    const hidePreview = () => {
      clearTimeout(hidePreviewTimer);
      preview.classList.remove("visible");
    };

    const openLightbox = (image) => {
      hidePreview();
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      closeButton.focus();
    };

    galleryImages.forEach(image => {
      image.addEventListener("mouseenter", () => {
        clearTimeout(hidePreviewTimer);
        previewImage.src = image.currentSrc || image.src;
        previewImage.alt = image.alt;
        const cardRect = image.closest(".showcase-card").getBoundingClientRect();
        const left = Math.min(cardRect.left, window.innerWidth - preview.offsetWidth - 16);
        preview.style.left = `${Math.max(16, left)}px`;
        preview.style.top = `${Math.min(cardRect.bottom + 12, window.innerHeight - preview.offsetHeight - 16)}px`;
        preview.classList.add("visible");
      });
      image.addEventListener("mouseleave", () => {
        hidePreviewTimer = setTimeout(hidePreview, 120);
      });
      image.addEventListener("click", () => openLightbox(image));
    });

    const closeLightbox = () => {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    };
    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });
  }

  // Scroll-reveal animation
  const revealEls = document.querySelectorAll(".reveal:not(.in)");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }
});
