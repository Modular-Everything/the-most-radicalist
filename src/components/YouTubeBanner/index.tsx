import ReactPlayer from "react-player";

import styles from "./YouTubeBanner.module.scss";

export function YouTubeBanner() {
  return (
    <section className={styles.youtube}>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=x_acAPULk38?t=20s"
        muted
        playing
        width="100%"
        height="auto"
        playsinline
        className={styles.youtube__embed}
      />
    </section>
  );
}
