function loadSVG() {
  fetch("../img/SVG_city_final.svg")
    .then((response) => {
      return response.text();
    })
    .then((svg) => {
      document.getElementById("bg-city").innerHTML = svg;
      document
        .querySelector("#bg-city svg")
        .setAttribute("preserveAspectRatio", "xMidYMax slice");
      setAnimationScroll();
    });
}
loadSVG();
function setAnimationScroll() {
  gsap.registerPlugin(ScrollTrigger);
  let runAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: "#bg-city",
      start: "top top",
      end: "+=2000",
      scrub: true,
      pin: true,
    },
  });

  runAnimation
    .add([
      gsap.to("#bg-city svg", 3, {
        scale: 1.5,
      }),

      gsap.to("#bcg-left", 3, {
        x: -300,
        opacity: 0,
      }),
      gsap.to("#bcg-right", 3, {
        x: 300,
        opacity: 0,
      }),
      gsap.to("#bcg-front", 3, {
        x: 300,
        y: 300,
        opacity: 0,
      }),
    ])

    .add([
      gsap.to("#bg-city svg", 3, {
        scale: 2,
      }),
      gsap.to("#bcg-front-2", 3, {
        x: 300,
        y: 300,
        opacity: 0,
      }),
      gsap.to("#building-2", 3, {
        x: -300,
        y: -300,
        opacity: 0,
      }),
      gsap.to("#building-4", 3, {
        x: 300,
        y: -300,
        opacity: 0,
      }),

      gsap.to("#building-3", 3, {
        x: -300,
        y: 300,
        opacity: 0,
      }),
    ])

    .add([
      gsap.to("#bg-city svg", 3, {
        scale: 2.2,
      }),
      gsap.to("#neightbourhood", 3, {
        y: 55,
        x: 20,
      }),
    ])

    .add([
      gsap.to("#bg-city svg", 3, {
        scale: 2.5,
      }),
      gsap.to("#building-1", 3, {
        filter: "blur(5px)",
      }),
      gsap.to("#building-5", 3, {
        filter: "blur(5px)",
      }),
      gsap.to("#webzone-light", 3, {
        opacity: 0,
      }),
    ])

    .add([
      gsap.to("#roof", 3, {
        y: -50,
        opacity: 0,
      }),

      gsap.to("#building-1", 3, {
        opacity: 0,
      }),
      gsap.to("#building-5", 3, {
        opacity: 0,
      }),
    ])

    .add([
      gsap.to("#bg-city svg", 3, {
        scale: 4.5,
      }),
      gsap.to("#front", 3, {
        opacity: 0.2,
      }),
      gsap.to("#left", 3, {
        opacity: 0.2,
      }),
    ])

    .add([
      gsap.to("#bg-city svg", 3, {
        scale: 5,
      }),
    ]);
}
