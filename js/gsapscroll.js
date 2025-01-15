document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const stickySection = document.querySelector(".sticky");
  const totalStickyHeight = window.innerHeight * 16;
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
    end: () => `${window.innerHeight * 9}`,
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
    anticipatePin: 1,
    invalidateOnRefresh: true,
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
    y: -window.innerHeight / 2,
  });

  let introUp = gsap.timeline({
    scrollTrigger: {
      trigger: ".intro",
      start: () => "+=" + window.innerHeight * 5.5,
      end: () => "+=" + window.innerHeight,
      scrub: true,
      toggleActions: "play reverse play reverse",
    },
  });

  introUp.to(".intro-col", {
    y: -window.innerHeight / 2,
    stagger: 0.3,
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
    delay: 1,
    opacity: 0,
  });

  tl.to(".copy", {
    delay: 1,
    opacity: 0,
  });

  tl.to(".verticalSpacer", {
    opacity: 0,
    transform: "translateY(-50%)",
  });

  ///////////////////////////////////////////////////

  // const img4Timeline = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".img-3",
  //     start: () => "+=" + window.innerHeight * 6,
  //     end: () => "+=" + window.innerHeight * 6,
  //     scrub: true,
  //     onUpdate: (self) => {
  //       const progress = self.progress;
  //       gsap.set(".img-4", {
  //         clipPath: `polygon(
  //         ${gsap.utils.interpolate(50, 100, progress)}% 50%,
  //         ${gsap.utils.interpolate(50, 50, progress)}% ${gsap.utils.interpolate(
  //           50,
  //           0,
  //           progress
  //         )}%,
  //         ${gsap.utils.interpolate(50, 50, progress)}% ${gsap.utils.interpolate(
  //           50,
  //           30,
  //           progress
  //         )}%,
  //         ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(
  //           50,
  //           30,
  //           progress
  //         )}%,
  //         ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(
  //           50,
  //           70,
  //           progress
  //         )}%,
  //         ${gsap.utils.interpolate(50, 50, progress)}% ${gsap.utils.interpolate(
  //           50,
  //           70,
  //           progress
  //         )}%,
  //         ${gsap.utils.interpolate(50, 50, progress)}% ${gsap.utils.interpolate(
  //           50,
  //           100,
  //           progress
  //         )}%
  //       )`,
  //       });

  //       // Show .tryitout at 50% progress of img-4 animation
  //       if (progress >= 0.5) {
  //         gsap.to(".container-gallery", {
  //           opacity: 1,
  //           duration: 0.3,
  //           ease: "power2.out",
  //         });
  //       } else {
  //         gsap.to(".container-gallery", {
  //           opacity: 0,
  //           duration: 0.3,
  //           ease: "power2.in",
  //         });
  //       }
  //     },
  //   },
  // });

  // img4Timeline.to(".img-4", {
  //   opacity: 1,
  //   rotateY: 120,
  //   x: 500,
  //   scale: 0.5,
  //   ease: "none",
  // });

  // // Keep .tryitout visible until pinned section is scrolled
  // ScrollTrigger.create({
  //   trigger: stickySection,
  //   start: "top top",
  //   end: () => `+=${totalStickyHeight}`,
  //   onLeave: () => {
  //     gsap.to(".container-gallery", {
  //       opacity: 0,
  //       duration: 0.3,
  //       ease: "power2.in",
  //     });
  //   },
  //   onEnterBack: () => {
  //     gsap.to(".container-gallery", {
  //       opacity: 1,
  //       duration: 0.3,
  //       ease: "power2.out",
  //     });
  //   },
  // });
  ///////////////////////////////////////////////////

  ///////////////////////////// ARROW Version

  let tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: ".container-gallery",
      start: "bottom bottom",
      end: "bottom -160%",
      scrub: true,
      ease: {
        power: 1,
        duration: 2,
      },
      toggleActions: "play reverse play reverse",
    },
  });

  tl4.to(".img-4", {
    rotateZ: 90,
    // y: -50,
    duration: 1.2,
  });

  tl4.to(".img-4", {
    scale: 33,
  });

  let tl5 = gsap.timeline({
    scrollTrigger: {
      trigger: ".marker-container-main",
      start: "center center",
      end: "bottom 50%",
      scrub: true,
      pin: true,
      pinSpacing: false,
      markers: true,
      ease: {
        power: 1,
        duration: 2,
      },
      toggleActions: "play reverse play reverse",
    },
  });

  tl5.from(".slider-wrapper", {
    x: -1700,
  });

  ///////////////////////////// ARROW Version

  //   gsap.to(".img-4", {
  //     opacity: 1,
  //     rotateY: 120,
  //     x: 250,
  //     scale: 0.5,
  //     clipPath:
  //       "polygon(100% 50%, 50% 0%, 50% 30%, 0% 30%, 0% 70%, 50% 70%, 50% 100%)",
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: ".img-3",
  //       start: () => "+=" + window.innerHeight * 6, // Start after img-3 animation
  //       end: () => "+=" + window.innerHeight * 6,
  //       scrub: true,
  //       onUpdate: (self) => {
  //         const progress = self.progress;
  //         gsap.set(".img-4", {
  //           clipPath: `polygon(
  //           ${gsap.utils.interpolate(50, 100, progress)}% 50%,
  //           ${gsap.utils.interpolate(50, 50, progress)}% ${gsap.utils.interpolate(
  //             50,
  //             0,
  //             progress
  //           )}%,
  //           ${gsap.utils.interpolate(50, 50, progress)}% ${gsap.utils.interpolate(
  //             50,
  //             30,
  //             progress
  //           )}%,
  //           ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(
  //             50,
  //             30,
  //             progress
  //           )}%,
  //           ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(
  //             50,
  //             70,
  //             progress
  //           )}%,
  //           ${gsap.utils.interpolate(50, 50, progress)}% ${gsap.utils.interpolate(
  //             50,
  //             70,
  //             progress
  //           )}%,
  //           ${gsap.utils.interpolate(50, 50, progress)}% ${gsap.utils.interpolate(
  //             50,
  //             100,
  //             progress
  //           )}%
  //         )`,
  //         });
  //       },
  //     },
  //   });
  // });

  ///////////////////////////// CUBE Version

  const cubeSize = 8; // Controge)
  const cubeCenterX = 50; // X posils the size of the cube (percentation of the center of the cube (percentage)
  const cubeCenterY = 50; // Y position of the center of the cube (percentage)

  gsap.to(".img-4", {
    opacity: 1,
    y: 50,
    // rotateY: 120,
    // x: 500,
    scale: 1,
    clipPath: `polygon(
          ${cubeCenterX}% ${cubeCenterY - cubeSize / 2}%,
          ${cubeCenterX + cubeSize / 2}% ${cubeCenterY}%,
          ${cubeCenterX}% ${cubeCenterY + cubeSize / 2}%,
          ${cubeCenterX - cubeSize / 2}% ${cubeCenterY}%
        )`,
    ease: "none",
    scrollTrigger: {
      trigger: ".img-3",
      start: () => "+=" + window.innerHeight * 5, // Start after img-3 animation
      end: () => "+=" + window.innerHeight * 5,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const size = gsap.utils.interpolate(0, cubeSize, progress);

        gsap.set(".img-4", {
          clipPath: `polygon(
              ${cubeCenterX}% ${cubeCenterY - size / 2}%,
              ${cubeCenterX + size / 2}% ${cubeCenterY}%,
              ${cubeCenterX}% ${cubeCenterY + size / 2}%,
              ${cubeCenterX - size / 2}% ${cubeCenterY}%
            )`,
        });
      },
    },
  });

  const marker = document.querySelector(".grab");
  const markerWrapper = document.querySelector(".marker");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");
  const activeSlide = document.querySelector(".active-slide");

  let dragging = false;
  let startX;
  let markerOffsetLeft;
  let maxMarkerMove = markerWrapper.offsetWidth - marker.offsetWidth;
  let maxScroll = sliderWrapper.offsetWidth - window.innerWidth;

  // Set the marker initially to the center of the marker-wrapper
  const initialMarkerPosition = maxMarkerMove / 2;
  marker.style.transform = `translateX(${initialMarkerPosition}px)`;

  // Function to update slider and marker on drag
  function moveSlider(sliderPosition) {
    gsap.to(sliderWrapper, {
      duration: 0.6,
      x: sliderPosition,
      ease: "power2.out",
    });

    // Update active slide text based on the marker's position
    const moveRatio = -sliderPosition / maxScroll;
    const currentSlide = Math.round(moveRatio * 10) + 1;
    activeSlide.textContent = `${currentSlide}/10`;

    // Trigger animations for slides entering and exiting the viewport
    animateSlides(sliderPosition);
  }

  // Mouse down event to start dragging
  marker.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.pageX;
    markerOffsetLeft = marker.offsetLeft;
  });

  // Mouse move event to handle dragging
  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    // Calculate how far the marker has moved based on initial position and drag distance
    const x = e.pageX - startX;
    let markerPosition = markerOffsetLeft + x;

    // Ensure the marker doesn't go out of bounds (within markerWrapper width)
    markerPosition = Math.min(Math.max(0, markerPosition), maxMarkerMove);

    // Update marker position with no animation (immediate move)
    marker.style.transform = `translateX(${markerPosition}px)`;

    // Calculate the corresponding scroll position for the slides
    const moveRatio = markerPosition / maxMarkerMove;
    const sliderPosition = -moveRatio * maxScroll;

    // Move the slider-wrapper smoothly based on marker position
    moveSlider(sliderPosition);
  });

  // Mouse up event to stop dragging
  document.addEventListener("mouseup", () => {
    dragging = false;
  });

  // Adjust maxScroll when the window is resized
  window.addEventListener("resize", () => {
    maxScroll = sliderWrapper.offsetWidth - window.innerWidth;
    maxMarkerMove = markerWrapper.offsetWidth - marker.offsetWidth;
  });

  // Function to animate the slides based on their position relative to the viewport
  function animateSlides(sliderPosition) {
    const viewportWidth = window.innerWidth;
    const entryExitMargin = viewportWidth * 0.1; // 10% margin on each side

    slides.forEach((slide) => {
      const slidePosition = slide.offsetLeft + sliderPosition;
      const isInView =
        slidePosition >= -entryExitMargin &&
        slidePosition <= viewportWidth - entryExitMargin;

      // Scale and fade in slides entering the viewport
      if (isInView) {
        gsap.to(slide, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      } else {
        // Scale and fade out slides leaving the viewport
        gsap.to(slide, {
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        });
      }
    });
  }

  // Initial slide animation check when the page loads
  function initializeSlides() {
    animateSlides(0); // Check the initial visibility of slides
  }

  // Call this to run the initial check
  initializeSlides();
});

///////////////////////////// CUBE Version

////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const stickyBar = document.querySelector(".gallery-start");
  const footerTrigger = document.querySelector(".gallery-end");
  const footerTriggerHeight = footerTrigger.offsetHeight;

  function getStickyBarCenter() {
    return stickyBar.offsetTop + stickyBar.offsetHeight / 2;
  }
  document.querySelectorAll(".row").forEach((row) => {
    ScrollTrigger.create({
      trigger: row,
      start: () => `top+=${getStickyBarCenter() - 550} center`,
      end: () => `top+=${getStickyBarCenter() - 450} center`,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const maxGap = window.innerWidth < 900 ? 10 : 15;
        const minGap = window.innerWidth < 900 ? 2 : 5;
        const currentGap = minGap + (maxGap - minGap) * progress;
        row.style.gap = `${currentGap}em`;

        // Additional styling (scale 2x, opacity 1, and blue color for text in .log p)
        row.style.transform = `scale(${1 + progress})`; // Scale x2
        // row.style.opacity = progress; // Fade in
        // row.querySelectorAll(".log p").forEach((p) => {
        //   p.style.color = `rgba(0, 0, 255, ${progress})`; // Transition to blue as progress increases
        // });
      },
    });
  });
  document.querySelectorAll(".row").forEach((row) => {
    ScrollTrigger.create({
      trigger: row,
      start: () => `top+=${getStickyBarCenter() - 400} center`,
      end: () => `top+=${getStickyBarCenter() - 300} center`,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const maxGap = window.innerWidth < 900 ? 2 : 5;
        const minGap = window.innerWidth < 900 ? 10 : 15;
        const currentGap = minGap + (maxGap - minGap) * progress;
        row.style.gap = `${currentGap}em`;

        // Additional styling (reset scale, opacity, and color to initial state as progress goes to 0)
        // row.style.transform = `scale(${1 + progress / 4})`; // Scale 2x
        // row.style.opacity = progress; // Fade out
        // row.querySelectorAll(".log p").forEach((p) => {
        //   p.style.color = progress > 0 ? "blue" : ""; // Set color to blue or reset
        // });
      },
    });
  });

  ScrollTrigger.create({
    trigger: footerTrigger,
    start: "top bottom",
    end: () => `-=${footerTriggerHeight - window.innerHeight} center`,
    scrub: true,
    onUpdate: (self) => {
      const startTop = 50;
      const endTop = 100; // Define the final position here
      const currentTop = startTop + (endTop - startTop) * self.progress; // Use `currentTop` for calculations
      stickyBar.style.top = `${currentTop}px`;
    },
  });
});

////////////////////////////////////////////
