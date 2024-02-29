import gsap from "gsap";

export function brandedText(text: string, logo: string) {
  const tl = gsap.timeline();

  return [
    tl.to(text, {
      y: 0,
      stagger: 0.2,
      duration: 0.25,
      ease: "expo.out",
    }),
    tl.to(logo, {
      width: "auto",
      duration: 0.25,
      delay: 0.5,
      ease: "expo.out",
    }),
    tl.to(logo, {
      rotate: 360,
      duration: 1.5,
      delay: 0.25,
      repeat: -1,
      ease: "expo.out",
    }),
  ];
}
