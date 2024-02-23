import gsap from "gsap";

export function revealPage(
  loader: string,
  wrapper: string,
  setLoading: (loading: boolean) => void
) {
  const tl = gsap.timeline();

  return [
    tl.to(loader, {
      scaleY: 1,
      stagger: 0.5,
      duration: 0.5,
      ease: "expo.inOut",
    }),
    tl.to(wrapper, {
      yPercent: -100,
      duration: 0.5,
      ease: "expo.inOut",
      onComplete: () => setLoading(false),
    }),
  ];
}
