import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gradient-to-br from-brand-cream via-brand-ice to-brand-caramel/30">
      <div className="w-24 h-24 bg-brand-caramel/25 rounded-full flex items-center justify-center mb-8">
        <span className="text-5xl font-bold text-brand-bronze">404</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-brand-ink mb-4">Page Not Found</h1>
      <p className="text-lg text-brand-ink/70 mb-8 max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or no longer exists.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="bg-brand-bronze hover:bg-brand-caramel text-brand-cream px-8 py-3 rounded-full font-medium transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/shop"
          className="border-2 border-brand-taupe hover:border-brand-bronze text-brand-ink/80 hover:text-brand-bronze px-8 py-3 rounded-full font-medium transition-colors"
        >
          Browse Shop
        </Link>
      </div>
    </div>
  );
}
