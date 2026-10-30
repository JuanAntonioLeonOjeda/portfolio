import { useSyncExternalStore } from "react";

import type { Lang } from "@/content/types";
import { MESSAGES, type Messages } from "@/i18n";

/** Kept in step with the inline script in index.html, which applies it before first paint. */
const STORAGE_KEY = "portfolio-idioma";

const listeners = new Set<() => void>();

/** The language lives in `<html lang>`: screen readers and the browser read it from there. */
function readLanguage(): Lang {
  return document.documentElement.lang === "en" ? "en" : "es";
}

function syncDocument(lang: Lang): void {
  document.documentElement.lang = lang;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", MESSAGES[lang].app.description);
}

export function setLanguage(lang: Lang): void {
  syncDocument(lang);
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Storage blocked: the choice lasts until the page is reloaded.
  }
  listeners.forEach((listener) => {
    listener();
  });
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useLanguage(): Lang {
  return useSyncExternalStore(subscribe, readLanguage);
}

export function useMessages(): Messages {
  return MESSAGES[useLanguage()];
}
