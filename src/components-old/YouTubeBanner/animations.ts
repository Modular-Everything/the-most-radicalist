import gsap from "gsap";

export function showPoster(poster: string) {
  return gsap.to(poster, {
    opacity: 1,
    duration: 2,
    ease: "power2.inOut",
  });
}

export function showYouTubeBanner(banner: string) {
  return gsap.to(banner, {
    opacity: 1,
    duration: 2,
    ease: "power2.inOut",
  });
}
