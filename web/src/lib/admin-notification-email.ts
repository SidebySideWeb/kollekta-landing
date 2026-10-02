type InterestPayload = {
  companyName: string;
  fullName: string;
  email: string;
  phone: string;
  plan: string;
  planUnsure: boolean;
};

const DEFAULT_FROM = 'Kollekta <notifications@kollekta.gr>';
const DEFAULT_ADMIN = 'dgeronikolos@sidebysideweb.gr';

function studioEditUrl(documentId: string): string {
  const base = (import.meta.env.SANITY_STUDIO_URL || 'https://kollekta.sanity.studio').replace(
    /\/$/,
    '',
  );
  return `${base}/intent/edit/id=${documentId};type=formSubmission`;
}

function buildEmail(payload: InterestPayload, documentId: string) {
  const studioUrl = studioEditUrl(documentId);
  const planLine = payload.planUnsure
    ? `${payload.plan} (δεν είναι σίγουρος/η)`
    : payload.plan;

  const lines = [
    'Νέα εκδήλωση ενδιαφέροντος — Kollekta',
    '',
    `Επωνυμία: ${payload.companyName}`,
    `Ονοματεπώνυμο: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Τηλέφωνο: ${payload.phone}`,
    `Πακέτο: ${planLine}`,
    '',
    `Προβολή στο Studio: ${studioUrl}`,
  ];

  const subject = `[Kollekta] Νέο ενδιαφέρον από ${payload.companyName}`;

  const html = `
    <p style="font-family:sans-serif;font-size:15px;line-height:1.5">
      Νέα υποβολή φόρμας εκδήλωσης ενδιαφέροντος.
    </p>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;line-height:1.5">
      <tr><td style="padding:6px 12px 6px 0;font-weight:600">Επωνυμία</td><td>${escapeHtml(payload.companyName)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;font-weight:600">Ονοματεπώνυμο</td><td>${escapeHtml(payload.fullName)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;font-weight:600">Email</td><td><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>
      <tr><td style="padding:6px 12px 6px 0;font-weight:600">Τηλέφωνο</td><td>${escapeHtml(payload.phone)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;font-weight:600">Πακέτο</td><td>${escapeHtml(planLine)}</td></tr>
    </table>
    <p style="margin-top:24px;font-family:sans-serif;font-size:14px">
      <a href="${studioUrl}">Άνοιγμα στο Sanity Studio</a>
    </p>
  `;

  return { subject, text: lines.join('\n'), html };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Sends admin notification via Resend. Never throws — logs and returns on failure
 * so a mail outage does not fail the form submission.
 */
export async function sendInterestAdminEmail(
  payload: InterestPayload,
  documentId: string,
): Promise<void> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.ADMIN_NOTIFICATION_EMAIL || DEFAULT_ADMIN;
  const from = import.meta.env.RESEND_FROM_EMAIL || DEFAULT_FROM;

  if (!apiKey) {
    console.warn('[admin-notification] Skipped: RESEND_API_KEY not set');
    return;
  }

  const { subject, text, html } = buildEmail(payload, documentId);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[admin-notification] Resend error (${response.status}):`, errorBody);
    }
  } catch (error) {
    console.error('[admin-notification] Failed to send email:', error);
  }
}
