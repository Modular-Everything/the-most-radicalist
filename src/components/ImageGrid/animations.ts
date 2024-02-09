import { gsap } from "gsap";

gsap.defaults({
  duration: 1.2,
  ease: "expo.inOut",
});

export function moveSideImages(leftImage: string, rightImage: string) {
  return [
    gsap.to(leftImage, {
      xPercent: -50,
      scale: 2,
      transformOrigin: "center right",
    }),

    gsap.to(rightImage, {
      xPercent: 50,
      scale: 2,
      transformOrigin: "center left",
    }),
  ];
}

export function scaleCenterImage(image: string, srcImage: string) {
  return [
    gsap.to(image, {
      width: "100%",
      height: "100%",
    }),
    gsap.to(srcImage, {
      scale: 1,
    }),
  ];
}

export function moveTitleUp(title: string) {
  return gsap.to(title, {
    yPercent: -100,
    duration: 1,
  });
}

export function moveTextUpFromDown(text: string) {
  return [
    gsap.set(text, {
      yPercent: 100,
    }),
    gsap.to(text, {
      yPercent: 0,
      duration: 1,
    }),
  ];
}
