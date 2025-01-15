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

let menuEls = document.querySelectorAll("p, h1, h2, h3,h4, h5");
menuEls.forEach((elCursor) => {
  elCursor.addEventListener("mouseenter", () => {
    setTimeout(() => {
      curs.classList.add("cursor-fade");
    }, 300);
  });

  elCursor.addEventListener("mouseleave", () => {
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

const typetext = document.querySelectorAll(".type-text");

function animatetypetext(element) {
  let originalText = element.innerHTML; // Use innerHTML to preserve HTML tags
  let currentText = "";
  let index = 0;

  const revealText = setInterval(() => {
    if (index < originalText.length) {
      currentText += originalText[index];
      element.innerHTML = currentText; // Use innerHTML to preserve HTML tags
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
        animatetypetext(entry.target);
        // observer.unobserve(entry.target); // Uncomment to run only once
      }
    });
  },
  { threshold: 0.5 } // Trigger when 50% of the element is visible
);

// Start observing each .text-type element
typetext.forEach((element) => {
  observer.observe(element);
});

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

///////////////////////
// Sound Effects
///////////////////////

const musicToggle = document.getElementById("music-box");
const mainAudio = new Audio("./audio/music.mp3"); // Replace with your main audio file path

// Array of sound effect paths
const soundEffects = [
  "./audio/sfx1.mp3",
  "./audio/sfx2.mp3",
  "./audio/sfx3.mp3",
  "./audio/sfx4.mp3",
  "./audio/sfx5.mp3",
  "./audio/sfx6.mp3",
];

musicToggle.addEventListener("click", function () {
  if (mainAudio.paused) {
    // Use mainAudio here
    mainAudio.play();
    musicToggle.classList.add("playing");
  } else {
    mainAudio.pause(); // Use mainAudio here
    musicToggle.classList.remove("playing");
  }
});

const musicVolumeSlider = document.getElementById("music-volume");
const sfxVolumeSlider = document.getElementById("sfx-volume");

// Set initial volumes
mainAudio.volume = musicVolumeSlider.value;

// Function to update music volume
function updateMusicVolume() {
  mainAudio.volume = musicVolumeSlider.value;
}

// Function to update SFX volume
function updateSFXVolume(sound) {
  // Takes a sound Audio object as input
  sound.volume = sfxVolumeSlider.value;
}

// Event listeners for volume slider changes
musicVolumeSlider.addEventListener("input", updateMusicVolume);

// Apply SFX volume on hover (create new Audio objects)
const hoverElements = document.querySelectorAll(".scramble");
hoverElements.forEach((element) => {
  element.addEventListener("mouseover", function () {
    const randomIndex = Math.floor(Math.random() * soundEffects.length);
    const randomSound = new Audio(soundEffects[randomIndex]);
    updateSFXVolume(randomSound); // Apply SFX volume to the new sound
    randomSound.play();
  });
});

const sliders = document.querySelectorAll("input[type=range]");
sliders.forEach((slider) => {
  slider.addEventListener("input", function () {
    this.style.setProperty("--value", `${this.value * 100}%`);
  });
});

if (mainAudio) {
  mainAudio.addEventListener("ended", () => {
    mainAudio.play();
  });
}

///THIS IS TEMP
document.querySelectorAll(".threeAnim1").forEach((element) => {
  const hoverDistort = new hoverEffect({
    parent: element,
    intensity: 1,
    image1: "img/4.webp",
    image2: "img/3.webp",
    displacementImage: "img/1.webp",
  });
});
// const hoverDistort1 = new hoverEffect({
//   parent: document.querySelector(".threeAnim1"),
//   intensity: 1.5,
//   imagesRatio: 1,
//   image1: "img/4.webp",
//   image2: "img/3.webp",
//   displacementImage: "img/1.webp",
// });

const hoverDistort2 = new hoverEffect({
  parent: document.querySelector(".threeAnim2"),
  intensity1: 0.25,
  intensity2: 0.25,
  angle1: Math.PI / 2,
  angle2: -Math.PI / 2,
  image1: "img/4.webp",
  image2: "img/1.webp",
  displacementImage: "img/2.webp",
});

const items = document.querySelectorAll(".log");

items.forEach((el) => {
  const image = el.querySelector("img");

  el.addEventListener("mouseenter", (e) => {
    gsap.to(image, {
      autoAlpha: 1,
      transformOrigin: "center 50%",
      scale: 0.8,
      x: -200,
      y: -200,
      rotateZ: () => gsap.utils.random(-10, 10),
      duration: 0.5,
    });
  });

  el.addEventListener("mouseleave", (e) => {
    gsap.to(image, { autoAlpha: 0 });
  });

  el.addEventListener("mousemove", (e) => {
    gsap.set(image, { x: e.offsetX - 200 });
  });
});

const borderAnimElements = document.querySelectorAll(".borderAnim");

borderAnimElements.forEach((borderAnim) => {
  const validationSpan = borderAnim.querySelector("span.jsvalidation");

  borderAnim.addEventListener("click", () => {
    if (validationSpan) {
      // Remove shimmer immediately
      if (validationSpan.classList.contains("shimmer")) {
        console.log("Removing shimmer class immediately for animation");
        validationSpan.classList.remove("shimmer");
      }

      // Re-add shimmer after the animation finishes (e.g., 600ms)
      setTimeout(() => {
        console.log("Re-adding shimmer class after animation");
        validationSpan.classList.add("shimmer");
      }, 1000000); // Adjust this timing to match the animation duration
    }
  });
});

// const marker = document.querySelector(".marker");
// const markerWrapper = document.querySelector(".marker-wrapper");
// const sliderWrapper = document.querySelector(".slider-wrapper");
// const slides = document.querySelectorAll(".slide");
// const activeSlide = document.querySelector(".active-slide");

// let dragging = false;
// let startX;
// let markerOffsetLeft;
// let maxMarkerMove = markerWrapper.offsetWidth - marker.offsetWidth;
// let maxScroll = sliderWrapper.offsetWidth - window.innerWidth;

// // Set the marker initially to the center of the marker-wrapper
// const initialMarkerPosition = maxMarkerMove / 2;
// marker.style.transform = `translateX(${initialMarkerPosition}px)`;

// // Function to update slider and marker on drag
// function moveSlider(sliderPosition) {
//   gsap.to(sliderWrapper, {
//     duration: 0.6,
//     x: sliderPosition,
//     ease: "power2.out",
//   });

//   // Update active slide text based on the marker's position
//   const moveRatio = -sliderPosition / maxScroll;
//   const currentSlide = Math.round(moveRatio * 10) + 1;
//   activeSlide.textContent = `${currentSlide}/10`;

//   // Trigger animations for slides entering and exiting the viewport
//   animateSlides(sliderPosition);
// }

// // Mouse down event to start dragging
// marker.addEventListener("mousedown", (e) => {
//   dragging = true;
//   startX = e.pageX;
//   markerOffsetLeft = marker.offsetLeft;
// });

// // Mouse move event to handle dragging
// document.addEventListener("mousemove", (e) => {
//   if (!dragging) return;

//   // Calculate how far the marker has moved based on initial position and drag distance
//   const x = e.pageX - startX;
//   let markerPosition = markerOffsetLeft + x;

//   // Ensure the marker doesn't go out of bounds (within markerWrapper width)
//   markerPosition = Math.min(Math.max(0, markerPosition), maxMarkerMove);

//   // Update marker position with no animation (immediate move)
//   marker.style.transform = `translateX(${markerPosition}px)`;

//   // Calculate the corresponding scroll position for the slides
//   const moveRatio = markerPosition / maxMarkerMove;
//   const sliderPosition = -moveRatio * maxScroll;

//   // Move the slider-wrapper smoothly based on marker position
//   moveSlider(sliderPosition);
// });

// // Mouse up event to stop dragging
// document.addEventListener("mouseup", () => {
//   dragging = false;
// });

// // Adjust maxScroll when the window is resized
// window.addEventListener("resize", () => {
//   maxScroll = sliderWrapper.offsetWidth - window.innerWidth;
//   maxMarkerMove = markerWrapper.offsetWidth - marker.offsetWidth;
// });

// // Function to animate the slides based on their position relative to the viewport
// function animateSlides(sliderPosition) {
//   const viewportWidth = window.innerWidth;
//   const entryExitMargin = viewportWidth * 0.1; // 10% margin on each side

//   slides.forEach((slide) => {
//     const slidePosition = slide.offsetLeft + sliderPosition;
//     const isInView =
//       slidePosition >= -entryExitMargin &&
//       slidePosition <= viewportWidth - entryExitMargin;

//     // Scale and fade in slides entering the viewport
//     if (isInView) {
//       gsap.to(slide, {
//         scale: 1,
//         opacity: 1,
//         duration: 0.8,
//         ease: "power2.out",
//       });
//     } else {
//       // Scale and fade out slides leaving the viewport
//       gsap.to(slide, {
//         scale: 0.5,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power2.in",
//       });
//     }
//   });
// }

// // Initial slide animation check when the page loads
// function initializeSlides() {
//   animateSlides(0); // Check the initial visibility of slides
// }

// // Call this to run the initial check
// initializeSlides();
