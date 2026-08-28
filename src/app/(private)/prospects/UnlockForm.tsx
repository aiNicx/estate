"use client";

import { useActionState } from "react";
import { unlockProspects } from "./actions";
import { prospectsCopy } from "@/lib/prospects/copy";

export function UnlockForm() {
  const copy = prospectsCopy.pin;
  const [state, action, pending] = useActionState(unlockProspects, null);

  return (
    <main className="mx-auto flex min-h-full max-w-md flex-col justify-center px-6 py-16">
      <p className="kicker">{copy.kicker}</p>
      <h1 className="display mt-0 text-[clamp(2.4rem,6vw,3.6rem)]">{copy.title}</h1>
      <p className="lede">{copy.body}</p>
      <form action={action} className="mt-8">
        <label className="form-field">
          <span>{copy.label}</span>
          <input
            name="pin"
            type="password"
            autoComplete="off"
            autoFocus
            required
            maxLength={64}
            spellCheck={false}
            aria-invalid={state?.error ? true : undefined}
          />
        </label>
        {state?.error ? (
          <p role="alert" className="mb-4 text-[var(--terracotta)]">
            {copy.error}
          </p>
        ) : null}
        <button className="btn" type="submit" disabled={pending}>
          {copy.submit}
        </button>
      </form>
    </main>
  );
}
