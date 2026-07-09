'use client';

import { useState } from 'react';
import { categories } from '@/lib/categories';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputCls =
  'w-full border border-line bg-cream/60 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-gold';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');

  // UK number after +44: digits only, no leading zero, max 10
  function onPhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    let v = e.target.value.replace(/\D/g, '');
    if (v.startsWith('44')) v = v.slice(2);
    v = v.replace(/^0+/, '');
    setPhone(v.slice(0, 10));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (phone) data.phone = `+44 ${phone}`;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Something went wrong. Please try again or email us directly.');
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex h-full min-h-72 flex-col items-center justify-center gap-4 text-center">
        <p className="heading-md">thank you!</p>
        <p className="max-w-sm text-[14px] leading-[1.8] text-ink/90">
          Your enquiry has been sent. Anastasia will reply personally as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <p className="text-xs text-ink-soft">
        Fields marked <span className="text-gold">*</span> are required.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-ink">
            Name <span className="text-gold">*</span>
          </span>
          <input name="name" required maxLength={120} placeholder="Your name" className={inputCls} />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-ink">Phone (UK)</span>
          <div className="flex">
            <span className="flex items-center border border-r-0 border-line bg-beige/60 px-4 py-3 text-sm text-ink">
              +44
            </span>
            <input
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              value={phone}
              onChange={onPhoneChange}
              pattern="[1-9][0-9]{8,9}"
              title="UK number after +44: 9–10 digits, without the leading 0"
              placeholder="7455 340555"
              className={`${inputCls} flex-1`}
            />
          </div>
        </label>
      </div>
      <label className="block space-y-2">
        <span className="text-sm text-ink">
          Email <span className="text-gold">*</span>
        </span>
        <input name="email" type="email" required maxLength={160} placeholder="you@example.com" className={inputCls} />
      </label>
      <label className="block space-y-2">
        <span className="text-sm text-ink">Treatment of interest</span>
        <select name="treatment" defaultValue="" className={inputCls}>
          <option value="">Select a treatment…</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.title}>
              {c.title}
            </option>
          ))}
          <option value="Other">Other / not sure yet</option>
        </select>
      </label>
      <label className="block space-y-2">
        <span className="text-sm text-ink">
          Message <span className="text-gold">*</span>
        </span>
        <textarea name="message" required maxLength={4000} rows={6} placeholder="How can we help?" className={inputCls} />
      </label>
      {status === 'error' && <p className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={status === 'sending'} className="btn-dark disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
      </button>
    </form>
  );
}
