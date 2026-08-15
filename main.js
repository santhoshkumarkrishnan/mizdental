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
