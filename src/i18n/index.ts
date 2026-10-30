import type { Lang } from "@/content/types";

import { en } from "./en";
import { es, type Messages } from "./es";

export type { Messages };

export const MESSAGES: Readonly<Record<Lang, Messages>> = { es, en };
