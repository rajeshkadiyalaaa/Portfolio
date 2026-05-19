/**
 * Contact form delivery via Web3Forms (reliable for React SPAs).
 * Get a free access key: https://web3forms.com → enter your email → copy key from inbox.
 */

export type ContactFormPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; reason: 'missing_key' | 'network' | 'rejected'; detail?: string };

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

function getAccessKey(): string {
  return import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? '';
}

export function isContactFormConfigured(): boolean {
  return getAccessKey().length > 0;
}

export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<ContactSubmitResult> {
  const accessKey = getAccessKey();
  if (!accessKey) {
    return { ok: false, reason: 'missing_key' };
  }

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
        from_name: payload.name,
        replyto: payload.email,
        botcheck: false,
      }),
    });

    const data = (await response.json()) as {
      success?: boolean;
      message?: string;
      body?: { message?: string };
    };

    if (response.ok && data.success) {
      return { ok: true };
    }

    const detail =
      data.message ?? data.body?.message ?? `HTTP ${response.status}`;

    return {
      ok: false,
      reason: 'rejected',
      detail,
    };
  } catch (error) {
    return {
      ok: false,
      reason: 'network',
      detail: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/** User-facing hint when submit fails (no secrets). */
export function getContactSubmitErrorMessage(
  result: Extract<ContactSubmitResult, { ok: false }>,
): string {
  if (result.reason === 'missing_key') {
    return import.meta.env.PROD
      ? 'This deploy was built without a Web3Forms key. In Vercel → Settings → Environment Variables, set VITE_WEB3FORMS_ACCESS_KEY to your 36-character access key (from web3forms.com), then Redeploy — saving the variable alone is not enough.'
      : 'Add VITE_WEB3FORMS_ACCESS_KEY to .env.local (see .env.example), then restart npm run dev.';
  }

  if (result.reason === 'network') {
    return `Network error${result.detail ? `: ${result.detail}` : ''}. Check your connection and try again.`;
  }

  const detail = result.detail ?? '';
  const lower = detail.toLowerCase();

  if (lower.includes('domain') || lower.includes('not allowed') || lower.includes('blocked')) {
    return `${detail} If you use a free *.vercel.app URL, Web3Forms may require domain approval — contact https://web3forms.com/contact with your live site URL, or connect a custom domain on Vercel.`;
  }

  if (lower.includes('access') && lower.includes('key')) {
    return `${detail} Use the exact access key from your Web3Forms email (UUID format), not the words "api key".`;
  }

  return detail
    ? `Could not send: ${detail}`
    : 'Could not send right now. Please try again or email directly.';
}
