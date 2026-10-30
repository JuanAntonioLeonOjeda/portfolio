import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { useMessages } from "@/features/shell";

interface ExternalLinkProps {
  href: string;
  className?: string | undefined;
  children: ReactNode;
}

/** A link that opens in a new tab and says so, with the arrow as the visual cue. */
export function ExternalLink({ href, className, children }: ExternalLinkProps): React.JSX.Element {
  const t = useMessages();

  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowUpRight aria-hidden size="1em" />
      <span className="visually-hidden"> {t.contact.external}</span>
    </a>
  );
}
