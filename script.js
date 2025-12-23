/* ===============================
   SECTION REFERENCES
================================ */
const sections = {
  section1: document.getElementById("section-1"),
  section2: document.getElementById("section-2"),
  section3: document.getElementById("section-3"),
  section4: document.getElementById("section-4"),
  section5Video: document.getElementById("section-5-video"),
  section5Audio1: document.getElementById("section-5-audio1"),
  section5Audio2: document.getElementById("section-5-audio2"),
  section6: document.getElementById("section-6"),
};

const sectionOrder = [
  sections.section1,
  sections.section2,
  sections.section3,
  sections.section4,
  sections.section5,
  sections.section5Audio,
  document.getElementById("section-5-audio2"),
  document.getElementById("section-6"),
];


/* BUTTONS */
const enterBtn = document.getElementById("enterStory");
const storyBtn = document.querySelector(".story-btn");
const documentBtn = document.querySelector(".documentation-btn");

let movedFromLanding = false;
let touchStartY = 0;
let touchEndY = 0;

const isMobile = window.innerWidth <= 768;


/* ===============================
   HELPER FUNCTION
================================ */
function activateSection(targetSection) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });
  targetSection.classList.add("active");
}

/* ===============================
   LANDING → STORY
================================ */
function goToStory() {
  if (movedFromLanding) return;
  movedFromLanding = true;
  activateSection(sections.section2);
}

enterBtn?.addEventListener("click", goToStory);

window.addEventListener("wheel", (e) => {
  if (e.deltaY > 0 && sections.section1.classList.contains("active")) {
    goToStory();
  }
});

/* ===============================
   STORY → SECTION 3
================================ */
storyBtn?.addEventListener("click", () => {
  activateSection(sections.section3);
});

/* ===============================
   SECTION 3 → SECTION 4 (SCROLL)
================================ */
window.addEventListener("wheel", (e) => {
  if (e.deltaY > 0 && sections.section3.classList.contains("active")) {
    activateSection(sections.section4);
  }
});

/* ===============================
   SECTION 4 → SECTION 5 VIDEO
================================ */
documentBtn?.addEventListener("click", () => {
  activateSection(sections.section5Video);
});

/* ===============================
   NAVIGATION BUTTONS
================================ */

/* VIDEO → AUDIO 1 */
document
  .querySelector("#section-5-video .nav-next")
  ?.addEventListener("click", (e) => {
    e.preventDefault();
    activateSection(sections.section5Audio1);
  });

/* VIDEO → SECTION 4 */
document
  .querySelector("#section-5-video .nav-back")
  ?.addEventListener("click", (e) => {
    e.preventDefault();
    activateSection(sections.section4);
  });

/* AUDIO 1 → AUDIO 2 */
document
  .querySelector("#section-5-audio1 .nav-next")
  ?.addEventListener("click", (e) => {
    e.preventDefault();
    activateSection(sections.section5Audio2);
  });

/* AUDIO 1 → VIDEO */
document
  .querySelector("#section-5-audio1 .nav-back")
  ?.addEventListener("click", (e) => {
    e.preventDefault();
    activateSection(sections.section5Video);
  });

/* AUDIO 2 → CREDIT */
document
  .querySelector("#section-5-audio2 .nav-next")
  ?.addEventListener("click", (e) => {
    e.preventDefault();
    activateSection(sections.section6);
  });

/* AUDIO 2 → AUDIO 1 */
document
  .querySelector("#section-5-audio2 .nav-back")
  ?.addEventListener("click", (e) => {
    e.preventDefault();
    activateSection(sections.section5Audio1);
  });

/* ===============================
   HASH HANDLING (OPTIONAL)
================================ */
window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash);
  if (target && target.classList.contains("section")) {
    activateSection(target);
  }
});

if (!isMobile) {
  window.addEventListener("wheel", (e) => {
    if (e.deltaY > 0 && sections.section1.classList.contains("active")) {
      goToStory();
    }
  });
}


window.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY;
});
window.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});
function handleSwipe() {
  const swipeDistance = touchStartY - touchEndY;

  // swipe kecil = abaikan
  if (Math.abs(swipeDistance) < 50) return;

  // swipe ke atas
  if (swipeDistance > 0) {
    goNextSection();
  }
  // swipe ke bawah
  else {
    goPrevSection();
  }
}

function getCurrentIndex() {
  return sectionOrder.findIndex(sec =>
    sec.classList.contains("active")
  );
}

function goNextSection() {
  const currentIndex = getCurrentIndex();
  if (currentIndex < sectionOrder.length - 1) {
    activateSection(sectionOrder[currentIndex + 1]);
  }
}

function goPrevSection() {
  const currentIndex = getCurrentIndex();
  if (currentIndex > 0) {
    activateSection(sectionOrder[currentIndex - 1]);
  }
}
