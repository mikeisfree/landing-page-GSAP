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

gsap.to(".triangle", 1.5, {
  delay: 3.0,
  opacity: 0,
  rotateZ: 180,
  scale: 0.5,
});

gsap.from(".hero-info", 2, {
  delay: 4.5,
  y: 800,
  ease: "elastick.inOut",
});

gsap.from("nav", 2, {
  delay: 5,
  opacity: 0,
  y: -300,
  ease: "elastick.inOut",
});

gsap.from(".welcome-message", 2, {
  duration: 3,
  delay: 5,
  y: 1000,
  ease: "elastic.inOut",
});

gsap.from("#music-toggle", {
  duration: 3,
  delay: 6,
  rotateZ: 180,
  scale: 3,
  ease: "elastic.inOut",
});
