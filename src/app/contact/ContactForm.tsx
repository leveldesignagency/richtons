"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import buttonStyles from "@/components/Button.module.css";
import { submitContact } from "./actions";
import styles from "./page.module.css";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.lg} ${buttonStyles.glow} ${styles.formSubmit}`}
      disabled={pending}
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, null);

  if (state?.ok) {
    return (
      <div className={styles.formSuccess} role="status">
        <p className={styles.formSuccessText}>{state.message}</p>
        <p className={styles.formSuccessHint}>
          You can also call us on{" "}
          <a href="tel:01206700769" className={styles.formInlineLink}>
            01206 700 769
          </a>{" "}
          for urgent queries.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} action={formAction} noValidate>
      {state && !state.ok && (
        <p className={styles.formError} role="alert">
          {state.message}
        </p>
      )}

      <div className={styles.formRow2}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your name"
            aria-invalid={state && !state.ok ? true : undefined}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className={styles.formRow2}>
        <div className={styles.field}>
          <label htmlFor="contact-phone">Phone (optional)</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="For a quicker callback"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-subject">Subject</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            placeholder="e.g. Asbestos survey enquiry"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project, location, and preferred contact times…"
        />
      </div>

      <div className={styles.formActions}>
        <SubmitButton />
        <p className={styles.formNote}>
          By sending this form you agree to us using your details to respond to
          your enquiry.
        </p>
      </div>
    </form>
  );
}
