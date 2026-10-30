import { profile } from "@/content/profile";

import { useMessages } from "./language";
import styles from "./Shell.module.css";

// Read once at load: a page left open over New Year can keep the old year.
const YEAR = new Date().getFullYear();

export function Footer(): React.JSX.Element {
  const t = useMessages();

  return (
    <footer className={styles.footer}>
      <p>
        © {YEAR} {profile.name.given} {profile.name.family}
      </p>
      <p>{t.shell.footer}</p>
    </footer>
  );
}
