document.addEventListener("DOMContentLoaded", () => {
  const stickySectionGal = document.querySelector(".sticky-Gallery");
  const stickyHeader = document.querySelector(".sticky-header");
  const cards = document.querySelectorAll(".card");
  const stickyHeight = window.innerHeight * 5;

  const transforms = [
    [
      [10, 50, -10, 10],
      [20, -10, -45, 20],
    ],
    [
      [0, 47.5, -10, 15],
      [-25, 15, -45, 30],
    ],
    [
      [0, 52.5, -10, 5],
      [15, -5, -40, 60],
    ],
    [
      [0, 50, 30, -80],
      [20, -10, 60, 5],
    ],
    [
      [0, 55, -15, 30],
      [25, -15, 60, 95],
    ],
  ];

  ScrollTrigger.create({
    trigger: stickySectionGal,
    start: "top top",
    end: `+=${stickyHeight}px`,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      const progress = self.progress;

      const maxTranslate = stickyHeader.offsetWidth - window.innerWidth;
      const translateX = -progress * maxTranslate;
      gsap.set(stickyHeader, { x: translateX });

      cards.forEach((card, index) => {
        const delay = index * 0.1125;
        const cardProgress = Math.max(0, Math.min((progress - delay) * 2, 1));

        if (cardProgress > 0) {
          const cardStartX = 25;
          const cardEndX = -650;
          const yPos = transforms[index][0];
          const rotations = transforms[index][1];

          const cardX = gsap.utils.interpolate(
            cardStartX,
            cardEndX,
            cardProgress
          );

          const yProgress = cardProgress * 3;
          const yIndex = Math.min(Math.floor(yProgress), yPos.length - 2);
          const yInterpolation = yProgress - yIndex;
          const cardy = gsap.utils.interpolate(
            yPos[yIndex],
            yPos[yIndex + 1],
            yInterpolation
          );

          const cardRotation = gsap.utils.interpolate(
            rotations[yIndex],
            rotations[yIndex + 1],
            yInterpolation
          );

          gsap.set(card, {
            xPercent: cardX,
            yPercent: cardy,
            rotation: cardRotation,
            opacity: 1,
          });
        } else {
          gsap.set(card, { opacity: 0 });
        }
      });
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const stickySection = document.querySelector(".sticky");
  const totalStickyHeight = window.innerHeight * 20;
  const unicorn = document.querySelector(".unicorn");
  const totalunicornHeight = window.innerHeight * 1;
  const verticalSpacer = document.querySelector(".verticalSpacer");

  // Lenis initialization
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Helper function: Split text into letters
  const introParagraphs = document.querySelectorAll(".intro-col p");
  introParagraphs.forEach((paragraph) => {
    const text = paragraph.textContent;
    paragraph.innerHTML = text
      .split(/(\s+)/)
      .map((part) => {
        if (part.trim() === "") {
          return part;
        } else {
          return part
            .split("")
            .map((char) => `<span class="char">${char}</span>`)
            .join("");
        }
      })
      .join("");
  });

  // Helper function: Split text into letters
  const introCopyParagraphs = document.querySelectorAll(".footer p");
  introCopyParagraphs.forEach((paragraph) => {
    const text = paragraph.textContent;
    paragraph.innerHTML = text
      .split(/(\s+)/)
      .map((part) => {
        if (part.trim() === "") {
          return part;
        } else {
          return part
            .split("")
            .map(
              (char) =>
                `<span style="opacity: 0; display: inline-block;">${char}</span>`
            )
            .join("");
        }
      })
      .join("");
  });

  function flickerAnimation(targets, toOpacity) {
    gsap.to(targets, {
      opacity: toOpacity,
      duration: 0.05,
      stagger: {
        amount: 1,
        from: "random",
      },
    });
  }

  ScrollTrigger.create({
    trigger: stickySection,
    start: "bottom -20%",
    // start: "center center",
    end: () => `${window.innerHeight * 10}`,
    onEnter: () => flickerAnimation(".intro-col p span", 1),
    onLeave: () => flickerAnimation(".intro-col p span", 0),
    onEnterBack: () => flickerAnimation(".intro-col p span", 1),
    onLeaveBack: () => flickerAnimation(".intro-col p span", 0),
  });

  ScrollTrigger.create({
    trigger: stickySection,
    start: "top top",
    end: () => `${window.innerHeight * 8}`,
    onEnter: () => flickerAnimation(".footer p span", 1),
    onLeave: () => flickerAnimation(".footer p span", 0),
    onEnterBack: () => flickerAnimation(".footer p span", 1),
    onLeaveBack: () => flickerAnimation(".footer p span", 0),
  });

  // Pin the sticky section
  ScrollTrigger.create({
    trigger: stickySection,
    start: "top top",
    end: () => `+=${totalStickyHeight}`,
    pin: true,
    pinSpacing: true,
  });

  ScrollTrigger.create({
    trigger: unicorn,
    start: "top top",
    end: () => `+=${totalunicornHeight}`,
    pin: false,
    pinSpacing: false,
  });

  // Scale img-1
  gsap.to(".unicorn", {
    scale: 3,
    ease: "none",
    scrollTrigger: {
      trigger: stickySection,
      start: "bottom -20%",
      end: () => "+=" + window.innerHeight,
      scrub: true,
    },
  });

  // Animate img-2 clip-path
  gsap.to(".img-2", {
    opacity: 1,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "none",
    scrollTrigger: {
      trigger: ".img-1", // Trigger based on img-1
      start: "bottom center", // Start when img-1 is fully in view
      end: () => "+=" + window.innerHeight, // End when scrolling past img-2
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(".img-2", {
          clipPath: `polygon(
      ${gsap.utils.interpolate(40, 0, progress)}% ${gsap.utils.interpolate(
            25,
            0,
            progress
          )}%,
      ${gsap.utils.interpolate(60, 100, progress)}% ${gsap.utils.interpolate(
            25,
            0,
            progress
          )}%,
      ${gsap.utils.interpolate(60, 100, progress)}% ${gsap.utils.interpolate(
            75,
            100,
            progress
          )}%,
      ${gsap.utils.interpolate(40, 0, progress)}% ${gsap.utils.interpolate(
            75,
            100,
            progress
          )}%
    )`,
        });
      },
    },
  });

  // Scale img-2
  gsap.to(".img-2 img", {
    scale: 1.125,
    ease: "none",
    scrollTrigger: {
      trigger: ".img-1",
      start: "bottom center", // Start after img-1 is fully visible
      end: () => "+=" + window.innerHeight,
      scrub: true,
    },
  });

  // // Animate img-3 clip-path
  gsap.to(".img-3", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "none",
    scrollTrigger: {
      trigger: ".img-2",
      start: () => "+=" + window.innerHeight * 2, // Start after img-2 has completed its animation
      end: () => "+=" + window.innerHeight * 2,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(".img-3", {
          clipPath: `polygon(
      ${gsap.utils.interpolate(50, 50, progress)}% ${gsap.utils.interpolate(
            50,
            50,
            progress
          )}%,
      ${gsap.utils.interpolate(50, 100, progress)}% ${gsap.utils.interpolate(
            50,
            50,
            progress
          )}%,
      ${gsap.utils.interpolate(100, 100, progress)}% ${gsap.utils.interpolate(
            50,
            100,
            progress
          )}%,
      ${gsap.utils.interpolate(100, 50, progress)}% ${gsap.utils.interpolate(
            50,
            100,
            progress
          )}%
    )`,
        });
      },
    },
  });

  let intro = gsap.timeline({
    scrollTrigger: {
      trigger: ".intro",
      start: () => "+=" + window.innerHeight * 3.5,
      end: () => "+=" + window.innerHeight,
      scrub: true,
      toggleActions: "play reverse play reverse",
    },
  });

  intro.to(".intro", {
    y: -200,
  });

  let spacer = gsap.timeline({
    scrollTrigger: {
      trigger: ".verticalSpacer",
      start: () => "+=" + window.innerHeight * 4,
      end: () => "+=" + window.innerHeight,
      scrub: true,
      toggleActions: "play reverse play reverse",
    },
  });

  spacer.to(".verticalSpacer", {
    opacity: 1,
    transform: "translateY(0%)",
  });

  // Final copy reveal
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".img-3",
      start: () => "+=" + window.innerHeight * 4,
      end: () => "+=" + window.innerHeight * 5,
      scrub: true,
      toggleActions: "play reverse play reverse",
    },
  });

  tl.to(".copy", {
    opacity: 1,
    // rotateY: 0,
    transform: "rotateY(0deg) rotateX(0deg)",
    scale: 1,
    duration: 1,
  });

  tl.to(".img-3", {
    opacity: 0,
  });

  tl.to(".copy", {
    opacity: 0,
  });

  tl.to(".verticalSpacer", {
    opacity: 0,
    transform: "translateY(-50%)",
  });

  gsap.to(".img-4", {
    opacity: 1,
    rotateY: 120,
    x: 500,
    scale: 0.5,
    clipPath:
      "polygon(100% 50%, 50% 0%, 50% 30%, 0% 30%, 0% 70%, 50% 70%, 50% 100%)",
    ease: "none",
    scrollTrigger: {
      trigger: ".img-3",
      start: () => "+=" + window.innerHeight * 6, // Start after img-3 animation
      end: () => "+=" + window.innerHeight * 6,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(".img-4", {
          clipPath: `polygon(
            ${gsap.utils.interpolate(50, 100, progress)}% 50%,
            ${gsap.utils.interpolate(
              50,
              50,
              progress
            )}% ${gsap.utils.interpolate(50, 0, progress)}%,
            ${gsap.utils.interpolate(
              50,
              50,
              progress
            )}% ${gsap.utils.interpolate(50, 30, progress)}%,
            ${gsap.utils.interpolate(
              50,
              0,
              progress
            )}% ${gsap.utils.interpolate(50, 30, progress)}%,
            ${gsap.utils.interpolate(
              50,
              0,
              progress
            )}% ${gsap.utils.interpolate(50, 70, progress)}%,
            ${gsap.utils.interpolate(
              50,
              50,
              progress
            )}% ${gsap.utils.interpolate(50, 70, progress)}%,
            ${gsap.utils.interpolate(
              50,
              50,
              progress
            )}% ${gsap.utils.interpolate(50, 100, progress)}%
          )`,
        });
      },
    },
  });
});

function startLoader() {
  let counterElement = document.querySelector(".counter");
  let currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) {
      return;
    }
    currentValue += Math.floor(Math.random() * 10) + 1;
    if (currentValue > 100) {
      currentValue = 100;
    }

    counterElement.textContent = currentValue;
    let delay = Math.floor(Math.random() * 200) + 50;
    setTimeout(updateCounter, delay);
  }
  updateCounter();
}

startLoader();

gsap.to(".counter", 0.25, {
  delay: 3.5,
  opacity: 0,
});

gsap.to(".bar", 1.5, {
  delay: 3.5,
  height: 0,
  stagger: {
    amount: 0.5,
  },
  ease: "power4.inOut",
});

gsap.from(".hero-info", 2, {
  delay: 4.5,
  y: 800,
  ease: "elastick.inOut",
});

gsap.from("nav", 2, {
  delay: 5,
  y: -300,
  ease: "elastick.inOut",
});
window.addEventListener("DOMContentLoaded", function () {
  gsap.set("nav", { y: -300 });

  gsap.defaults({ duration: 1, ease: "power1.inOut" });
  const tl = gsap.timeline({ pause: true, delay: 1 });

  tl.to(
    "nav",
    {
      y: 0,
    },
    ">"
  );
});

const heroInfo = document.querySelector(".hero-info");

heroInfo.addEventListener("mouseenter", () => {
  heroInfo.addEventListener(
    "wheel",
    function (e) {
      // Stop the page from scrolling while over .hero-info
      e.stopPropagation();
    },
    { passive: false }
  );
});

heroInfo.addEventListener("mouseleave", () => {
  heroInfo.removeEventListener("wheel", function (e) {
    e.stopPropagation();
  });
});

/***********************************
Cursor
************************************/

let curs = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;
  curs.style.left = x - 15 + "px";
  curs.style.top = y - 15 + "px";
});

let menuEls = document.querySelectorAll("a, p, h1, h2, h3,h4, h5");
menuEls.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    setTimeout(() => {
      curs.classList.add("cursor-fade");
    }, 300);
  });

  el.addEventListener("mouseleave", () => {
    curs.classList.remove("cursor-fade");
  });
});

$(document).ready(function () {
  $(".slick-slider").slick({
    autoplay: true, // Enable Autoplay
    slidesToShow: 2,
    draggable: true,
    centerMode: true,
    arrows: false,
    centerPadding: "100px",
    adaptiveHeight: true,
    // speed: 100000,
    autoplaySpeed: 1000,
    cssEase: "linear", // Set a longer autoplay speed for smooth transition
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });
});

// Select all .info-item elements
const infoItems = document.querySelectorAll(".info-item");

// Function to pause animations on all items
function pauseAnimations() {
  infoItems.forEach((item) => (item.style.animationPlayState = "paused"));
}

// Function to resume animations on all items
function resumeAnimations() {
  infoItems.forEach((item) => (item.style.animationPlayState = "running"));
}

// Add event listeners to each .info-item
infoItems.forEach((item) => {
  item.addEventListener("mouseenter", pauseAnimations);
  item.addEventListener("mouseleave", resumeAnimations);
});

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.addEventListener("DOMContentLoaded", () => {
  const originalTexts = new Map(); // To store the original text of each element

  const startShuffling = (event) => {
    const element = event.target;
    if (!element.matches(".scramble")) return;

    if (!originalTexts.has(element)) {
      originalTexts.set(element, element.innerText);
    }

    const originalText = originalTexts.get(element);
    let iteration = 0;
    const originalValue = element.innerText;
    let timeout = null;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      clearInterval(interval);
      element.innerText = originalText; // Restore original text
    }, 2000); // Increase timeout for a slower animation

    const interval = setInterval(() => {
      element.innerText = originalValue
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return originalValue[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= originalValue.length) {
        clearInterval(interval);
        element.innerText = originalText; // Restore original text
      }

      iteration += 1 / 6; // Decrease iteration speed for a smoother animation
    }, 10); // Increase interval duration for slower animation
  };

  // Use event delegation to handle mouseover events on the document
  document.addEventListener("mouseover", startShuffling);

  // Apply the effect to elements already on the page
  document.querySelectorAll(".scramble").forEach((element) => {
    element.addEventListener("mouseover", startShuffling);
  });
});

///////////////////////
// Text-type effect
///////////////////////

const typetext = document.querySelector(".type-text");

function animatetypetext() {
  let originalText = typetext.textContent;
  let currentText = "";
  let index = 0;

  const revealText = setInterval(() => {
    if (index < originalText.length) {
      currentText += originalText[index];
      typetext.textContent = currentText;
      index++;
    } else {
      clearInterval(revealText);
    }
  }, 35);
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animatetypetext();
        observer.observe(entry.target); // if Run only once "observer.unobserve(entry.target);"
      }
    });
  },
  { threshold: 0.5 } // Trigger when 50% of the element is visible
);

// Start observing the element
observer.observe(typetext);

///////////////////////
// Progress Battery
///////////////////////

document.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = (scrollTop / documentHeight) * 100;

  const loader = document.querySelector(".loader");
  loader.style.backgroundSize = `${scrollPercentage}% 100%`;
});
