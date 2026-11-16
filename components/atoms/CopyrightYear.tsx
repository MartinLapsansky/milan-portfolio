"use client";

import { useSyncExternalStore } from "react";

/* The year never changes between subscriptions, so the store is static. */
const subscribe = () => () => {};

/**
 * Renders the current year on the client only. Reading `new Date()` during
 * prerender is rejected by Cache Components, so the server snapshot is empty
 * and React swaps in the real year after hydration (no hydration mismatch).
 */
export default function CopyrightYear() {
  const year = useSyncExternalStore<number | null>(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );

  return <>{year ?? ""}</>;
}
