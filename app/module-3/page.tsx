
"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Module3() {

  const { data: session, status } = useSession();

  const [ex2Phase, setEx2Phase] = useState<"in" | "out" | "rest">("in");
  const [ex2Time, setEx2Time] = useState(3);
  const [ex2Count, setEx2Count] = useState(0);
  const [ex2Running, setEx2Running] = useState(false);

  const [ex3Time, setEx3Time] = useState(8);
  const [ex3Count, setEx3Count] = useState(0);
  const [ex3Running, setEx3Running] = useState(false);

  // ✅ HOOKS ALTIJD BOVENIN

  useEffect(() => {
    if (!ex2Running) return;

    if (ex2Time === 0) {
      if (ex2Phase === "in") {
        setEx2Phase("out");
        setEx2Time(6);
      } else if (ex2Phase === "out") {
        setEx2Phase("rest");
        setEx2Time(2);
      } else {
        setEx2Count((c) => {
          const newCount = c + 1;
          if (newCount >= 10) {
            setEx2Running(false);
          }
          return newCount;
        });

        setEx2Phase("in");
        setEx2Time(3);
      }

      return;
    }

    const timer = setTimeout(() => {
      setEx2Time((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [ex2Running, ex2Time, ex2Phase]);

  useEffect(() => {
    if (!ex3Running) return;

    if (ex3Time === 0) {
      setEx3Count((c) => {
        const newCount = c + 1;

        if (newCount >= 8) {
          setEx3Running(false);
        } else {
          setEx3Time(8);
        }

        return newCount;
      });

      return;
    }

    const timer = setTimeout(() => {
      setEx3Time((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [ex3Running, ex3Time]);
  useEffect(() => {
  if (!session?.user?.id) return;

  if (ex2Count >= 10 && ex3Count >= 8) {
    localStorage.setItem(
      `module3-${session.user.id}`,
      "done"
    );
  }
}, [ex2Count, ex3Count, session]);

  // ✅ PAS HIERNA JE CONDITIONAL RENDERS

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
          Module 3 – Ademhaling & ontspanning
        </h1>

        {/* OEFENING 1 */}
        <div className="card bg-base-100 p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Oefening 1 – Ontspanning
          </h2>

          <div className="aspect-video">
          <iframe
        className="w-full h-full rounded-lg"
        src="https://www.youtube.com/embed/0_VWARTbNpk"
        title="Oefening uitleg"
        allowFullScreen
      />
      </div>
    </div>

    <div className="aspect-video">
      <iframe
        className="w-full h-full rounded-lg"
        src="https://www.youtube.com/embed/nKPg-50yMcY"
        title="Oefening uitleg"
        allowFullScreen
      />

          <div className="alert">
            Focus op ademhaling en algemene ontspanning
          </div>
        </div>

        {/* OEFENING 2 */}
        <div className="card bg-base-100 p-6 space-y-4 text-center">
          <h2 className="text-xl font-semibold">
            Oefening 2 – Ademhaling + core
          </h2>

          <div className="text-4xl text-primary">{ex2Time}s</div>

          <p>
            {ex2Phase === "in" && "Adem in (3 sec)"}
            {ex2Phase === "out" && "Adem uit + buik aanspannen (6 sec)"}
            {ex2Phase === "rest" && "Rust (2 sec)"}
          </p>

          <p>Herhaling: {ex2Count} / 10</p>

          <progress
            className="progress progress-primary w-full"
            value={(ex2Count / 10) * 100}
            max="100"
          />

          <button
            className="btn btn-primary"
            onClick={() => setEx2Running(true)}
            disabled={ex2Running}
          >
            Start oefening
          </button>
        </div>

        {/* OEFENING 3 */}
        <div className="card bg-base-100 p-6 space-y-4 text-center">
          <h2 className="text-xl font-semibold">
            Oefening 3 – Mobilisatie & dorsale keten
          </h2>

          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/l-v87yrp4t8"
              title="Oefening uitleg"
              allowFullScreen
            />
          </div>

          <div className="text-4xl text-primary">{ex3Time}s</div>

          <p>Herhaling: {ex3Count} / 8</p>

          <button
            className="btn btn-primary"
            onClick={() => setEx3Running(true)}
            disabled={ex3Running}
          >
            Start oefening
          </button>
        </div>

      </div>
    </div>
  );
}