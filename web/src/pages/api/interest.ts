export const prerender = false;

import type { APIRoute } from 'astro';
import { writeClient } from '../../lib/sanity';

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!import.meta.env.SANITY_WRITE_TOKEN) {
      return new Response(
        JSON.stringify({
          error: 'Η φόρμα δεν είναι ακόμα ρυθμισμένη (λείπει SANITY_WRITE_TOKEN).',
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const body = await request.json();
    const companyName = String(body.companyName || '').trim();
    const fullName = String(body.fullName || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const plan = String(body.plan || 'Pro').trim();
    const planUnsure = Boolean(body.planUnsure);
    const consent = Boolean(body.consent);

    if (!companyName || !fullName || !email || !phone || !consent) {
      return new Response(JSON.stringify({ error: 'Συμπληρώστε όλα τα υποχρεωτικά πεδία.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!emailOk(email)) {
      return new Response(JSON.stringify({ error: 'Μη έγκυρο email.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await writeClient.create({
      _type: 'formSubmission',
      formType: 'interest',
      companyName,
      plan,
      planUnsure,
      fullName,
      email,
      phone,
      consent,
      read: false,
      starred: false,
      submittedAt: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[interest]', error);
    return new Response(JSON.stringify({ error: 'Αποτυχία αποθήκευσης. Δοκιμάστε ξανά.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
