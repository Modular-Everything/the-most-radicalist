import gsap from "gsap";

function getStagger(index: number) {
  if (index === 0) {
    return 0.5;
  }
  if (index === 1) {
    return 1.25;
  }
  if (index === 2) {
    return 0.25;
  }
  if (index === 3) {
    return 1;
  }
  if (index > 3 && index < 8) {
    return 0.5;
  }
  return 0;
}

export function animateMediumCards(card: string) {
  return gsap.fromTo(
    // stagger in the cards, starting with the first card and scaling down to the last card
    card,
    {
      scale: 1.25,
      autoAlpha: 0,
    },
    {
      scale: 1,
      autoAlpha: 1,
      ease: "power2.out",
      duration: 1.25,
      transformOrigin: "center center",
      stagger: getStagger,
    }
  );
}
