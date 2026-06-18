"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Module1() {
  const { data: session } = useSession();
  const [timeLeft, setTimeLeft] = useState(6);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [remindersOn, setRemindersOn] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  
const [step, setStep] = useState(1);
const [step3Count, setStep3Count] = useState(0);
const [step3Time, setStep3Time] = useState(6);
const [step3Running, setStep3Running] = useState(false);
const [phase, setPhase] = useState<"hold" | "reset">("hold");


  useEffect(() => {
    if (!running) return;

    if (timeLeft === 0) {
  setRunning(false);

  
setCount((c) => {
  const newCount = c + 1;

  if (newCount >= 7 && session?.user?.id) {
    const today = new Date().toDateString();
localStorage.setItem(`exercise1-${session.user.id}-${today}`, "done");

  }

  // ✅ MAX LIMIT
  return Math.min(newCount, 7);
});


  setTimeLeft(6);
  return;
}

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [running, timeLeft]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
  if (!step3Running) return;

  if (step3Time === 0) {

    if (phase === "hold") {

      setStep3Count((c) => {
        
  const newCount = c + 1;

  if (newCount >= 10 && session?.user?.id) {
    setStep3Running(false);
    localStorage.setItem(`exercise2-${session.user.id}`, "done");
  } else {
    setPhase("reset");
    setStep3Time(3);
  }

  // ✅ MAX LIMIT
  return Math.min(newCount, 10);
});


      return;
    }

    if (phase === "reset") {
      // ✅ terug naar hold fase
      setPhase("hold");
      setStep3Time(6);
      return;
    }
  }

  const timer = setTimeout(() => {
    setStep3Time((t) => t - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [step3Running, step3Time, phase]);

  const startReminders = () => {
    console.log("Reminders gestart ✅");
    setRemindersOn(true);

    if (Notification.permission === "granted") {
      new Notification("Test notificatie 👀", {
        body: "Als je dit ziet, werkt het!",
      });
    }

    const id = window.setInterval(() => {
      if (Notification.permission === "granted") {
        new Notification("Kaak oefening", {
          body: "Tong tegen gehemelte • 6 seconden",
        });
      }
    }, 2 * 60 * 60 * 1000);

    setIntervalId(id);
  };

  const stopReminders = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setRemindersOn(false);
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content">

      {/* HERO */}
      <div className="hero bg-base-100 shadow-md border border-base-300">
        <div className="hero-content text-center max-w-2xl">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              Module 1 – Begrip van kaakklachten
            </h1>

            <p className="py-4 text-gray-600">
              In deze module leer je herkennen wanneer je spanning opbouwt in je kaak. Als ondersteuning van de behandeling van je kaakfysiotherapeut.
            </p>

            
            
<a
  href="https://www.borisdrogtfysio.nl/afspraak"
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-primary mt-2 flex gap-2 items-center"
>
  📅 Plan afspraak
</a>

          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto p-6 space-y-8">

        

        {/* VIDEO */}
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          <figure className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ygXUlgSiN5k"
              title="Module 1 video"
              allowFullScreen
            />
          </figure>

          <div className="card-body">
            <p className="text-sm text-gray-600">
              Bekijk eerst deze uitleg voordat je begint.
            </p>
          </div>
        </div>

        {/* OEFENING */}
        <div className="card bg-base-100 shadow-md p-5 space-y-4">
          <h2 className="text-xl font-semibold">Oefening 1 – Bewustwording</h2>

          <p>
            Ga rechtop zitten en let 1 minuut op je kaak.
            Zijn je kiezen op elkaar? Of hangen ze los?
          </p>

          <div className="alert">
            Tip: Lippen op elkaar, tanden los
          </div>

          <button
            className="btn btn-primary w-full"
            onClick={() => setRunning(true)}
            disabled={running}
          >
            {running ? `Timer loopt (${timeLeft}s)` : "Start 6 sec timer"}
          </button>

          <p className="text-sm text-gray-500">
            Herhaald: {count} / 7 keer vandaag
          </p>
        </div>
        {/* PROGRESS */}
        <div>
          <p className="text-sm mb-2">Voortgang</p>
          <progress className="progress progress-primary w-full" value={(count / 7) * 100} max="100"></progress>
        </div>



<button
  className={`btn w-full ${remindersOn ? "btn-success" : "btn-outline btn-primary"}`}
  onClick={remindersOn ? stopReminders : startReminders}
>
  {remindersOn ? "Herinneringen actief ✅" : "Zet herinneringen aan"}
</button>

{/* OEFENING 2 */}
<div className="card bg-base-100 shadow-md p-5 space-y-4">
  <h2 className="text-xl font-semibold">
    Oefening 2 – Spiercontrole
  </h2>

  <div className="card bg-base-100 shadow-md p-6 space-y-4">

    <h2 className="text-xl font-semibold">
      Oefening 2 – Rug & core activatie
    </h2>

    {/* VIDEO */}
    <div className="aspect-video">
      <iframe
        className="w-full h-full rounded-lg"
        src="https://www.youtube.com/embed/zzFRys0yrEg"
        title="Oefening uitleg"
        allowFullScreen
      />
    </div>

    {/* STAPPEN */}
    {step === 1 && (
      <div className="space-y-3 text-center">
        <p className="text-lg font-semibold">Stap 1</p>
        <p>Breng je knieën rustig naar je toe</p>

        <button
          className="btn btn-primary"
          onClick={() => setStep(2)}
        >
          Volgende
        </button>
      </div>
    )}

    {step === 2 && (
      <div className="space-y-3 text-center">
        <p className="text-lg font-semibold">Stap 2</p>
        <p>Duw je knieën weer rustig van je af</p>

        <button
          className="btn btn-primary"
          onClick={() => setStep(3)}
        >
          Ga naar oefening
        </button>
      </div>
    )}

    {step === 3 && (
      <div className="space-y-4 text-center">

        <p className="text-lg font-semibold">
          {phase === "hold"
            ? "Duw je onderrug in de grond en span je buik aan"
            : "Beweeg je knieën naar je toe en weer van je af"}
        </p>

        <div className="text-4xl font-bold text-primary">
          {step3Time}s
        </div>

        <p className="text-sm text-gray-500">
          {phase === "hold"
            ? "Spanning vasthouden"
            : "Ontspanning / reset"}
        </p>

        <p className="text-sm text-gray-500">
          Herhaling: {step3Count} / 10
        </p>

        {/* Progress bar */}
        <progress
          className="progress progress-primary w-full"
          value={(step3Count / 10) * 100}
          max="100"
        />

        <button
          className="btn btn-primary w-full"
          onClick={() => setStep3Running(true)}
          disabled={step3Running}
        >
          {step3Running
            ? `Bezig (${step3Time}s)`
            : "Start oefening"}
        </button>

        {step3Count >= 10 && (
          <div className="alert alert-success">
            ✅ Oefening voltooid!
          </div>
        )}

      </div>
    )}

  </div>
</div>
        {/* MODULE INFO */}
        <div className="grid grid-cols-3 gap-4">

          <div className="stat bg-base-100 shadow-sm p-4 rounded-lg text-center">
            <div className="stat-title">Duur</div>
            <div className="stat-value text-primary text-lg">7 min</div>
          </div>

          <div className="stat bg-base-100 shadow-sm p-4 rounded-lg text-center">
            <div className="stat-title">Niveau</div>
            <div className="stat-value text-primary text-lg">Beginner</div>
          </div>

          <div className="stat bg-base-100 shadow-sm p-4 rounded-lg text-center">
            <div className="stat-title">Doel</div>
            <div className="stat-value text-primary text-lg">Voelen</div>
          </div>

        </div>

        {/* CTA */}
        <div className="flex justify-between items-center">
          <a href="/aanpak" className="btn btn-ghost">
            Terug
          </a>

          <a href="/dashboard" className="btn btn-outline btn-primary">
            Ga naar dashboard
          </a>
        </div>

      </main>

    </div>
  );
}


