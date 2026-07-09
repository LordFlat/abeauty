import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70svh] flex-col items-center justify-center gap-6 pt-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="title-xl">page not found</h1>
      <p className="max-w-md text-[14px] leading-[1.8] text-ink/90">The page you are looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="btn-gold">
        Back to home
      </Link>
    </div>
  );
}
