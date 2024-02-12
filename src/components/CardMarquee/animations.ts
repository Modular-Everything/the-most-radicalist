import gsap from "gsap";

export function animateMediumCards(card: string) {
  return [
    gsap.defaults({
      ease: "power2.inOut",
      duration: 1.25,
      transformOrigin: "center center",
      stagger: function (index) {
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
      },
    }),

    // stagger in the cards, starting with the first card and scaling down to the last card
    gsap.fromTo(
      ".card",
      {
        scale: 1.25,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
      }
    ),
  ];
}
