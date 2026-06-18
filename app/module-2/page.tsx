"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";


export default function Module2() {
  const [ex1Done, setEx1Done] = useState(false);

// oefening 2
const [ex2Time, setEx2Time] = useState(6);
const [ex2Count, setEx2Count] = useState(0);
const [ex2Running, setEx2Running] = useState(false);

// oefening 3
const [ex3Time, setEx3Time] = useState(8);
const [ex3Count, setEx3Count] = useState(0);
const [ex3Running, setEx3Running] = useState(false);

const [exJawDone, setExJawDone] = useState(false);
const [jawTime, setJawTime] = useState(50);
const [jawCount, setJawCount] = useState(0);
const [jawRunning, setJawRunning] = useState(false);

  const { data: session, status } = useSession();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!ex2Running) return;

    if (ex2Time === 0) {
      setEx2Count((c) => {
        const newCount = c + 1;

        if (newCount >= 10) {
          setEx2Running(false);
        } else {
          setEx2Time(6);
        }

        return newCount;
      });

      return;
    }

    const timer = setTimeout(() => {
      setEx2Time((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [ex2Running, ex2Time]);

  useEffect(() => {
    if (!session?.user?.id) return;

    let count = 0;

    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const key = `exercise1-${session.user.id}-${date.toDateString()}`;

      if (localStorage.getItem(key) === "done") {
        count++;
      } else {
        break;
      }
    }

    setStreak(count);
  }, [session]);

  if (streak < 6) {
  return (
    <div className="text-center mt-10">
      <p className="text-lg">
        🔒 Module 2 wordt beschikbaar na 6 dagen oefenen
      </p>
      <p className="text-gray-500">
        Je huidige voortgang: {streak}/6
      </p>
    </div>
   
  );
}


  useEffect(() => {
  if (!jawRunning) return;

  if (jawTime === 0) {
    setJawCount((c) => {
      const newCount = c + 1;

      if (newCount >= 2) {
        setJawRunning(false);
      } else {
        setJawTime(50);
      }

      return newCount;
    });

    return;
  }

  const timer = setTimeout(() => {
    setJawTime((t) => t - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [jawRunning, jawTime]);

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
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Module 2 – Ontspanning & mobilisatie
          </h1>
          <p className="text-gray-600">
            In deze module werk je aan ontspanning en bewegelijkheid.
          </p>
        </div>

        {/* OEFENING 1 */}
        <div className="card bg-base-100 shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Oefening 1 – Ontspanning kaakspieren
          </h2>

          <div className="aspect-video">
      <iframe
        className="w-full h-full rounded-lg"
        src="https://www.youtube.com/embed/qkDvvADzK6E"
        title="Oefening uitleg"
        allowFullScreen
      />
    </div>

    

          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Masseer je kauwspieren licht</li>
            <li>Doe briezen (lippen trillen)</li>
            <li>Pof lucht uit je mond</li>
            <li>Fluit zachtjes</li>
            <li>Gebruik een lauwwarme kop thee tegen je wangen</li>
          </ul>

          <div className="alert">
            Doel: ontspanning van de kauwspieren
          </div>
          
{!ex1Done ? (
    <button
      className="btn btn-primary w-full"
      onClick={() => setEx1Done(true)}
    >
      Oefening gedaan ✅
    </button>
  ) : (
    <div className="alert alert-success">
      ✅ Klaar
    </div>
  )}

        </div>
{/* OEFENING 2 */}
<div className="card bg-base-100 shadow-md p-6 space-y-4">
  <h2 className="text-xl font-semibold">
    Oefening 2 – Onderkaak beweging
  </h2>

  <p>
    Beweeg je onderkaak rustig naar links en rechts.
    Houd de beweging klein en gecontroleerd.
  </p>

  {/* TIMER */}
  <div className="text-4xl text-center text-primary">
    {jawTime}s
  </div>

  <p className="text-center text-sm">
    Herhaling: {jawCount} / 2
  </p>

  <progress
    className="progress progress-primary w-full"
    value={(jawCount / 2) * 100}
    max="100"
  />

  <div className="alert">
    Doel: verbeteren van controle en ontspanning van de kaakspieren
  </div>

  <button
    className="btn btn-primary w-full"
    onClick={() => setJawRunning(true)}
    disabled={jawRunning}
  >
    {jawRunning ? "Bezig..." : "Start oefening"}
  </button>

  {jawCount >= 2 && (
    <div className="alert alert-success">
      ✅ Oefening voltooid
    </div>
  )}
</div>

        {/* OEFENING 3 */}
        <div className="card bg-base-100 shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Oefening 3 – Core tegen de muur
          </h2>

          <p>
            Herhaal de oefening uit module 1, maar nu tegen een deur of muur.
          </p>

          <div className="text-center">
            <p className="text-lg font-semibold">
              10 × 6 seconden vasthouden
            </p>
          </div>

          <div className="alert">
            Tip: rug tegen de ondergrond duwen, buik aanspannen
          </div>
          
  <div className="text-4xl text-center text-primary">
    {ex3Time}s
  </div>

  <p className="text-center text-sm">
    Herhaling: {ex3Count} / 10
  </p>

  <progress
    className="progress progress-primary w-full"
    value={(ex3Count / 10) * 100}
    max="100"
  />

  <button
    className="btn btn-primary w-full"
    onClick={() => setEx3Running(true)}
    disabled={ex3Running}
  >
    {ex3Running ? "Bezig..." : "Start oefening"}
  </button>

  {ex3Count >= 10 && (
    <div className="alert alert-success">
      ✅ Oefening voltooid
    </div>
  )}

        </div>

        {/* OEFENING 4 */}
        <div className="card bg-base-100 shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Oefening 4 – Mobilisatie (indraaien)
          </h2>

          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/StSQrz5M0XI"
              title="Oefening uitleg"
              allowFullScreen
            />
          </div>

          <p className="text-center">
            Houd elke positie 8 seconden vast
          </p>

          <p className="text-center font-semibold">
            4× per kant
          </p>

          <div className="alert">
            Doel: verbeteren van mobiliteit en rotatie
          </div>
        </div>
        
<div className="text-4xl text-center text-primary">
    {ex3Time}s
  </div>

  <p className="text-center text-sm">
    Herhaling: {ex3Count} / 8
  </p>

  <p className="text-center text-sm text-gray-500">
    4x per kant
  </p>

  <progress
    className="progress progress-primary w-full"
    value={(ex3Count / 8) * 100}
    max="100"
  />

  <button
    className="btn btn-primary w-full"
    onClick={() => setEx3Running(true)}
    disabled={ex3Running}
  >
    {ex3Running ? "Bezig..." : "Start oefening"}
  </button>

  {ex3Count >= 8 && (
    <div className="alert alert-success">
      ✅ Oefening voltooid
    </div>
  )}
</div>


      </div>
    
  );
}