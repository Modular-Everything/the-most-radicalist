import gsap from "gsap";

gsap.defaults({
  duration: 1.2,
  ease: "expo.inOut",
});

export function animateCopy(lines: Element[]) {
  return gsap.from(lines, {
    yPercent: 100,
    stagger: 0.25,
  });
}

export function animateTitle(title: string) {
  return gsap.to(title, {
    yPercent: -100,
  });
}

export function animateOverlay(overlay: string) {
  return gsap.to(overlay, {
    y: 0,
    autoAlpha: 1,
  });
}
