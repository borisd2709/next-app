import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-10">

      {/* HERO */}
      <section className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          Hallo {session && <span>{session.user!.name}</span>}
        </h1>
        <p className="text-3xl font-bold text-primary">
          Heb je last van kaakklachten? Je bent niet de enige.
        </p>
      </section>

      {/* Symptomen */}
      <section className="card bg-base-100 shadow-md border-base-300">
        <h2 className="text-xl font-semibold mb-4">Herken je dit?</h2>
        <ul className="list-disc list-inside">
          <li>Je wordt wakker met een gespannen kaak</li>
          <li>Je merkt dat je overdag je tanden op elkaar zet</li>
          <li>Je hebt al een bitje, maar klachten blijven</li>
          <li>Spanning in je nek</li>
          <li>Hoofdpijn bij slapen of achterhoofd</li>
        </ul>
      </section>

      {/* Uitleg */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow-md border-base-300">
          <h3 className="font-semibold mb-2">Wat gebeurt er?</h3>
          <p>
            Kaakklachten zijn meestal geen los probleem, maar ontstaan door een combinatie van spierbelasting, gewoontes en stress.
          </p>
        </div>

        <div className="card bg-base-100 shadow-md border-base-300">
          <h3 className="font-semibold mb-2">Oorzaken</h3>
          <ul className="list-disc list-inside">
            <li>Spierbelasting</li>
            <li>Gewoontes</li>
            <li>Stressreacties</li>
            <li>Overbelasting</li>
          </ul>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="card bg-base-100 shadow-md border-base-300">
        <h2 className="text-3xl font-bold text-primary">Werkwijze</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Tandarts constateert spanning</li>
          <li>Verwijzing naar kaakfysiotherapie</li>
          <li>Je start met gerichte oefeningen</li>
        </ol>
      </section>

      {/* Video */}
      <section className="card bg-base-100 shadow-xl">
        <figure className="aspect-video w-full">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/004RlR9wC5Y"
            title="Kaak fysiotherapie uitleg"
            allowFullScreen
          />
        </figure>
      </section>
      

      {/* CTA */}
      <section className="text-center">
        <a href="/module-1" className="btn btn-primary">
          Start module
        </a>
      </section>

    </main>
  );
}