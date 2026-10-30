import { Career } from "@/features/career";
import { Contact } from "@/features/contact";
import { Hero } from "@/features/hero";
import { Projects } from "@/features/projects";
import { Footer, Header, useMessages } from "@/features/shell";
import { Stack } from "@/features/stack";

import styles from "./App.module.css";

/** The whole site is one page; the header links jump between its sections. */
export function App(): React.JSX.Element {
  const t = useMessages();

  return (
    <>
      <a href="#main" className={styles.skipLink}>
        {t.app.skipToContent}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Projects />
        <Career />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
