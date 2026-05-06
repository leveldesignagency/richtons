"use server";

export type ContactState =
  | { ok: true; message: string }
  | { ok: false; message: string }
  | null;

function toMultilineText(input: string): string {
  return input.replace(/\r\n/g, "\n").trim();
}

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

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || "tony@richtons.co.uk";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Richtons Contact <onboarding@resend.dev>";

  if (!resendApiKey) {
    return {
      ok: false,
      message:
        "Form email is not configured yet. Please add RESEND_API_KEY in environment variables.",
    };
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    toMultilineText(message),
  ];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `[Website Enquiry] ${subject}`,
      text: lines.join("\n"),
      reply_to: email,
    }),
  });

  if (!response.ok) {
    return {
      ok: false,
      message:
        "Sorry, we could not send your enquiry right now. Please try again shortly.",
    };
  }

  return {
    ok: true,
    message: "Thanks, we have received your message and will be in touch shortly.",
  };
}
