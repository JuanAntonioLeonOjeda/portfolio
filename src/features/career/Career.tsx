import { education, experience } from "@/content/career";
import { useMessages } from "@/features/shell";
import { Section } from "@/features/ui";

import { CareerTimeline } from "./CareerTimeline";

/** Jobs, with teaching marked apart. Shares its year axis with Education, so they line up. */
export function Experience(): React.JSX.Element {
  const t = useMessages();

  return (
    <Section id="experience" heading={t.experience.heading} lead={t.experience.lead}>
      <CareerTimeline entries={experience} label={t.experience.chartLabel} />
    </Section>
  );
}

export function Education(): React.JSX.Element {
  const t = useMessages();

  return (
    <Section id="education" heading={t.education.heading} lead={t.education.lead}>
      <CareerTimeline entries={education} label={t.education.chartLabel} />
    </Section>
  );
}
