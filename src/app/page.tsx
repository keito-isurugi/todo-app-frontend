import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>トップページ</h1>
      <Link href="/todos">TODO APP</Link>
      <br />
      <a href="https://nextjs.org/" target='_blank'>Next.js</a>
      <br />
      <a href="https://ja.react.dev/blog/2023/03/16/introducing-react-dev" target='_blank'>React</a>
      <br />
      <a href="https://mui.com/" target='_blank'>MUI</a>
      <br />
      <a href="https://nextjs.org/" target='_blank'>Next.js</a>
      <br />
      <a href="https://ja.react.dev/blog/2023/03/16/introducing-react-dev" target='_blank'>React</a>
      <br />
      <a href="https://mui.com/" target='_blank'>MUI</a>
    </main>
  );
}
