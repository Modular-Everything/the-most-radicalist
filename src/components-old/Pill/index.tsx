import styles from "./Pill.module.scss";

export function Pill({ label }: { label: string }) {
  return <div className={styles.pill}>{label}</div>;
}
