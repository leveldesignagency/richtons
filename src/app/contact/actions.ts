"use server";

export type ContactState =
  | { ok: true; message: string }
  | { ok: false; message: string }
  | null;

export async function submitContact(
  _prev: ContactState | null,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (name.length < 2) {
    return { ok: false, message: "Please enter your name." };
  }
  if (email.length < 5 || !email.includes("@")) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (subject.length < 2) {
    return { ok: false, message: "Please add a short subject line." };
  }
  if (message.length < 10) {
    return {
      ok: false,
      message: "Please tell us a bit more in your message (at least 10 characters).",
    };
  }

  // In production, pass { name, email, phone, subject, message } to your email provider or CRM.
  void phone;

  return {
    ok: true,
    message: "Thanks — we have received your message and will be in touch shortly.",
  };
}
