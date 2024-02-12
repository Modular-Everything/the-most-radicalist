import clsx from "clsx";
import Image from "next/image";

import { Pill } from "@/components/Pill";
import { relativeDate } from "@/helpers/relativeDate";
import { CardProps } from "@/types/cards";

import styles from "./Cards.module.scss";

export function CardMedium({
  className,
  artist,
  media,
  date,
  track,
  copy,
  tags,
  ...rest
}: CardProps) {
  return (
    <article className={clsx(styles.card__medium, className)} {...rest}>
      <div className={styles.card__medium__info}>
        <div className={styles.card__medium__date}>
          {date && <Pill label={relativeDate(date)} />}
        </div>

        <div className={styles.card__medium__meta}>
          {artist && <h4>{artist}</h4>}
          {track && <h6>{track}</h6>}
          {copy && <p>{copy}</p>}

          <ul className={styles.card__medium__tags}>
            {tags?.map((tag, index) => <li key={index}>{tag}</li>)}
          </ul>
        </div>
      </div>
      {media && (
        <div className={styles.card__medium__media}>
          <Image
            src={media}
            alt=""
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 90vw"
          />
        </div>
      )}
    </article>
  );
}
