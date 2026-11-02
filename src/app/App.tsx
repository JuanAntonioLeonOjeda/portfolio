import { Education, Experience } from "@/features/career";
import { Contact } from "@/features/contact";
import { Hero } from "@/features/hero";
import { Projects } from "@/features/projects";
import { Footer, Header, useMessages } from "@/features/shell";
import { Stack } from "@/features/stack";
import { WorkProjects } from "@/features/work-projects";

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
        <WorkProjects />
        <Experience />
        <Education />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
