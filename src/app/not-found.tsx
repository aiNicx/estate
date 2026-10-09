import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell py-24">
      <p className="kicker">Marina d’Albori</p>
      <h1 className="display mt-0 text-4xl"><span lang="it">Pagina non trovata</span></h1>
      <p lang="it">La pagina richiesta non è disponibile. Puoi tornare alla presentazione della proprietà.</p>
      <p lang="en">The requested page is unavailable. You can return to the property presentation.</p>
      <p><Link href="/it" lang="it">Presentazione in italiano</Link>{" · "}<Link href="/en" lang="en">English presentation</Link></p>
    </main>
  );
}
