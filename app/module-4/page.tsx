"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Module4() {
  const { data: session, status } = useSession();
  
  useEffect(() => {
  if (!session?.user?.id) return;

  localStorage.setItem(
    `module4-${session.user.id}`,
    "done"
  );
}, [session]);
  if (status === "loading") return <p>laden...</p>;

  if (!session) {
    return (
      <div className="text-center mt-10">
        <p>Log in om deze module te gebruiken</p>
        <button onClick={() => signIn("google")} className="btn btn-primary mt-4">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* TITEL */}
        <h1 className="text-3xl font-bold text-primary">
          Module 4 – Houding & integratie
        </h1>

        {/* OEFENING 1 */}
        <div className="card bg-base-100 shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Oefening 1 – Optimale houding
          </h2>

          <p>
            Trek je buik licht in, open je borst en breng je hoofd recht
            boven je romp.
          </p>

          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>Buikspieren licht aanspannen</li>
            <li>Borst openen</li>
            <li>Schouders ontspannen</li>
            <li>Hoofd recht boven de romp</li>
          </ul>

          <div className="alert">
            Dit zorgt voor ontspanning in de musculus sternocleidomastoideus
          </div>
        </div>

        {/* UITLEG */}
        <div className="card bg-base-100 shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Waarom is dit belangrijk?
          </h2>

          <p>
            De musculus sternocleidomastoideus speelt een belangrijke rol
            bij kaakbeweging en kan bij spanning invloed hebben op:
          </p>

          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>Het openen van de mond</li>
            <li>Het scharnieren van de kaak</li>
            <li>Doorbloeding (arteria carotis)</li>
            <li>Het zenuwstelsel (nervus vagus)</li>
          </ul>

          <div className="alert alert-info">
            Ontspanning van deze spier kan direct invloed hebben op je klachten
          </div>
        </div>

        {/* VIDEO KAak */}
        <div className="card bg-base-100 shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Video – 'Alles komt uit de kaak' (Bonus)
          </h2>

          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/KM4wh41En5w"
              title="Kaak video"
              allowFullScreen
            />
          </div>
        </div>

        {/* RELATIE LICHAAM */}
        <div className="card bg-base-100 shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Kaak en lichaam
          </h2>

          <p>
            Kaakklachten staan niet op zichzelf. Er is vaak een relatie
            met houding en het bekken.
          </p>

          <p className="text-sm text-gray-600">
            Je fysiotherapeut kan dit verder onderzoeken en behandelen.
          </p>

          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/0Ra7NEu7R8c"
              title="Bekken/kaak video"
              allowFullScreen
            />
          </div>
        </div>

      </div>
      <button
  className="btn btn-primary w-full"
  onClick={() => {
    localStorage.setItem(
      `module4-${session.user.id}`,
      "done"
    );
  }}
>
  Module afgerond ✅
</button>
    </div>
  );
}