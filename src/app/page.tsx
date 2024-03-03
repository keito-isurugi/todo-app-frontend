import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>トップページ</h1>
      <Link href="/todos">TODO APP</Link>
      <br />
      <a href="https://nextjs.org/" target='_blank'>Next.js</a>
      <br />
      <a href="https://nextjs.org/" target='_blank'>Next.js</a>
    </main>
  );
}
