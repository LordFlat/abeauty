import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { site } from '@/lib/site';

export const runtime = 'nodejs';

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim().slice(0, 120);
  const phone = String(body.phone ?? '').trim().slice(0, 40);
  const email = String(body.email ?? '').trim().slice(0, 160);
  const treatment = String(body.treatment ?? '').trim().slice(0, 120);
  const message = String(body.message ?? '').trim().slice(0, 4000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Please fill in the required fields.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: `Email sending is not configured yet. Please email us directly at ${site.email}.` },
      { status: 503 }
    );
  }

  const to = process.env.ENQUIRY_TO || site.email;
  const from = process.env.ENQUIRY_FROM || 'AD Beauty Website <onboarding@resend.dev>';

  const html = `
    <h2 style="font-family:Georgia,serif;">New enquiry — ${esc(site.name)}</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;">
      <tr><td style="padding:6px 16px 6px 0;color:#6B6258;">Name</td><td style="padding:6px 0;"><strong>${esc(name)}</strong></td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#6B6258;">Email</td><td style="padding:6px 0;">${esc(email)}</td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#6B6258;">Phone</td><td style="padding:6px 0;">${esc(phone || '—')}</td></tr>
      <tr><td style="padding:6px 16px 6px 0;color:#6B6258;">Treatment</td><td style="padding:6px 0;">${esc(treatment || '—')}</td></tr>
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;border-left:3px solid #A88A63;padding-left:12px;">${esc(message)}</p>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry from ${name}${treatment ? ` — ${treatment}` : ''}`,
      html,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('enquiry send failed:', err);
    return NextResponse.json(
      { error: `We could not send your message right now. Please email us directly at ${site.email}.` },
      { status: 502 }
    );
  }
}
