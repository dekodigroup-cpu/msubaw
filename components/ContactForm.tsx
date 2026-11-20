"use client";

import { useRef, useState } from "react";
import { SITE } from "@/lib/site";

const TOPICS = [
  "Black Alumni Weekend",
  "Scholarships and giving",
  "Sponsorship",
  "Mentorship",
  "Photographs",
  "Press",
  "Something else",
] as const;

type FieldName = "name" | "email" | "message";

/**
 * Contact form with no backend dependency.
 *
 * It validates in the browser, then hands the composed message to the
 * visitor's own mail client, so nothing is dropped into a void if a
 * third-party form service lapses and the sender keeps a copy in their
 * sent folder. Replace `handleSubmit` with a server action once an email
 * provider is wired up.
 */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [sent, setSent] = useState(false);

  function validate(form: FormData) {
    const next: Partial<Record<FieldName, string>> = {};
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (!name) next.name = "Add your name so we know who is writing.";
    if (!email) {
      next.email = "Add an email address so we can reply.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "That email address looks incomplete.";
    }
    if (!message) next.message = "Tell us what you need.";
    return next;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const found = validate(form);
    setErrors(found);

    // Move focus to the first field in error.
    const firstError = (["name", "email", "message"] as FieldName[]).find(
      (f) => found[f],
    );
    if (firstError) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstError}"]`)
        ?.focus();
      return;
    }

    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const topic = String(form.get("topic") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Topic: ${topic}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href =
      `mailto:${SITE.email}` +
      `?subject=${encodeURIComponent(`${topic}: ${name}`)}` +
      `&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  /** Cmd/Ctrl+Enter submits from inside the textarea. */
  function handleTextareaKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  const base =
    "mt-2 w-full border bg-void px-4 py-3.5 text-chalk transition-colors duration-200 placeholder:text-smoke focus:border-wine-lit focus:outline-none";
  const ok = `${base} border-slate`;
  const bad = `${base} border-wine-glow`;
  const labelCls = "eyebrow block text-smoke";

  const err = (f: FieldName) =>
    errors[f] ? (
      <p id={`cf-${f}-error`} className="mt-2 text-sm text-wine-glow">
        {errors[f]}
      </p>
    ) : null;

  const aria = (f: FieldName) => ({
    "aria-invalid": errors[f] ? (true as const) : undefined,
    "aria-describedby": errors[f] ? `cf-${f}-error` : undefined,
  });

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="border border-slate bg-void p-7 md:p-9"
      noValidate
    >
      <h2 className="font-display text-2xl font-semibold text-chalk">
        Send a message
      </h2>
      <p className="mt-2.5 text-sm leading-relaxed text-ash">
        This opens your email app with the message ready to send, so you keep a
        copy in your sent folder.
      </p>

      <div className="mt-7 space-y-5">
        <div>
          <label className={labelCls} htmlFor="cf-name">
            Name <span className="text-wine-glow">(required)</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            className={errors.name ? bad : ok}
            placeholder="Your name"
            {...aria("name")}
          />
          {err("name")}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="cf-email">
              Email <span className="text-wine-glow">(required)</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              className={errors.email ? bad : ok}
              placeholder="you@example.com"
              {...aria("email")}
            />
            {err("email")}
          </div>
          <div>
            <label className={labelCls} htmlFor="cf-phone">
              Phone <span className="text-smoke">(optional)</span>
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={ok}
              placeholder="(555) 123 4567"
            />
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="cf-topic">
            What is this about?
          </label>
          <select
            id="cf-topic"
            name="topic"
            className={ok}
            defaultValue={TOPICS[0]}
          >
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="cf-message">
            Message <span className="text-wine-glow">(required)</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            onKeyDown={handleTextareaKey}
            className={`${errors.message ? bad : ok} resize-y`}
            placeholder="Tell us what you need."
            {...aria("message")}
          />
          {err("message")}
        </div>
      </div>

      {sent && (
        <p role="status" className="mt-5 text-sm text-ash">
          Your email app should have opened. If it did not, write to{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="link-draw font-semibold text-wine-glow"
          >
            {SITE.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        className="group mt-7 flex min-h-12 w-full items-center justify-center bg-wine-lit px-7 font-semibold text-chalk transition-colors duration-300 hover:bg-wine-deep sm:w-auto"
      >
        Send message
        <span
          aria-hidden="true"
          className="ml-2.5 inline-block transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </button>
    </form>
  );
}
