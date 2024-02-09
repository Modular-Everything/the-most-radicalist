import gsap from "gsap";

export function showPoster(poster: string) {
  return gsap.to(poster, {
    autoAlpha: 1,
    duration: 2,
    ease: "power2.inOut",
  });
}

export function showYouTubeBanner(banner: string) {
  return gsap.to(banner, {
    autoAlpha: 1,
    duration: 2,
    ease: "power2.inOut",
  });
}
