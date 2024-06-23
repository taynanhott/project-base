import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Project Name</h1>
      <hr />
      <nav className="mt-6">
        <Link className="text-blue-500" href="/portal">
          Access project
        </Link>{' '}
        or{' '}
        <Link className="text-blue-500" target="_blank" href="https://github.com/taynanhott">
          View repository
        </Link>
      </nav>
    </main>
  );
}
