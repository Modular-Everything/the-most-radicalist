import gsap from "gsap";

export function RotateLogo(logo: string) {
  gsap.defaults({
    ease: "back.inOut(2)",
  });

  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 0.5,
  });

  return tl
    .to(logo, {
      rotate: -180,
    })
    .to(
      logo,
      {
        rotate: -360,
      },
      "+=0.5"
    );
}
