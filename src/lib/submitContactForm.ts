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

    const data = (await response.json()) as { success?: boolean; message?: string };

    if (response.ok && data.success) {
      return { ok: true };
    }

    return {
      ok: false,
      reason: 'rejected',
      detail: data.message ?? `HTTP ${response.status}`,
    };
  } catch (error) {
    return {
      ok: false,
      reason: 'network',
      detail: error instanceof Error ? error.message : 'Network error',
    };
  }
}
