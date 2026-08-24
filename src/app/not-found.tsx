import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell py-24">
      <p className="kicker">Marina d&apos;Albori</p>
      <h1 className="display mt-0 text-4xl">Not found</h1>
      <p>
        <Link href="/en">English</Link>
        {" · "}
        <Link href="/it">Italiano</Link>
      </p>
    </main>
  );
}
