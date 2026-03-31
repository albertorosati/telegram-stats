import Link from 'next/link';

export default function HomePage() {
  return (
    <main className='home-shell'>
      <section className='home-card'>
        <p className='home-kicker'>Telegram analytics</p>
        <h1 className='home-title'>Telegram Wrapped</h1>
        <p className='home-copy'>
          Client-side parser, interactive dashboard and standalone HTML export for Telegram chat archives.
        </p>
        <div className='home-actions'>
          <Link className='home-link' href='/wrapped'>
            Open dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}