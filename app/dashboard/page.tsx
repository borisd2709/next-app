"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
const [exercise1, setExercise1] = useState(false);
const [exercise2, setExercise2] = useState(false);
const [m2, setM2] = useState(false);
const [m3, setM3] = useState(false);
const [m4, setM4] = useState(false);
const [streak, setStreak] = useState(0);
const module2Unlocked = streak >= 6;



  

const { data: session } = useSession();
const userId = session?.user?.id;

useEffect(() => {
  if (!userId) return;

  const e1 =
    localStorage.getItem(`exercise1-${userId}`) === "done";
  const e2 =
    localStorage.getItem(`exercise2-${userId}`) === "done";
  const module2 =
    localStorage.getItem(`module2-${userId}`) === "done";
  const module3 =
    localStorage.getItem(`module3-${userId}`) === "done";
  const module4 =
    localStorage.getItem(`module4-${userId}`) === "done";

    

  

  setExercise1(e1);
  setExercise2(e2);
  setM2(module2);
  setM3(module3);
  setM4(module4);

}, [userId]);


useEffect(() => {
  if (!userId) return;

  let count = 0;

  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const key = `exercise1-${userId}-${date.toDateString()}`;

    if (localStorage.getItem(key) === "done") {
      count++;
    } else {
      break; // stopt als dag gemist is
    }
  }

  setStreak(count);
}, [userId]);

  if (!userId) {
  return <p>Dashboard laden...</p>;
  }
    
const total = 5;

const done =
  Number(exercise1) +
  Number(exercise2) +
  Number(m2) +
  Number(m3) +
  Number(m4);

const progress = (done / total) * 100;

  return (
    <div className="min-h-screen bg-base-200 p-6">

      <div className="max-w-3xl mx-auto space-y-8">

        {/* TITEL */}
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Jouw voortgang vandaag
          </p>
        </div>

        {/* PROGRESS */}
        <div className="card bg-base-100 shadow-md p-6">
          <h2 className="font-semibold mb-2">
            Dag voortgang
          </h2>

          <progress
            className="progress progress-primary w-full"
            value={progress || 0}
            max="100"
          />

          <p className="text-sm mt-2 text-gray-600">
            {progress}% voltooid
          </p>
        </div>

        {/* OEFENINGEN */}
        <div className="grid gap-4">

          <div className="card bg-base-100 shadow-md p-5 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">
                Oefening 1 (kaak)
              </h3>
              <p className="text-sm text-gray-500">
                7x per dag
              </p>
            </div>

            {exercise1 ? (
              <span className="badge badge-success">
                ✅ Klaar
              </span>
            ) : (
              <a href="/module-1" className="btn btn-primary btn-sm">
                Ga verder
              </a>
            )}
          </div>

          <div className="card bg-base-100 shadow-md p-5 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">
                Oefening 2 (rug/core)
              </h3>
              <p className="text-sm text-gray-500">
                10 herhalingen
              </p>
            </div>

            {exercise2 ? (
              <span className="badge badge-success">
                ✅ Klaar
              </span>
            ) : (
              <a href="/module-1" className="btn btn-primary btn-sm">
                Ga verder
              </a>
            )}
          </div>

        </div>

        {/* DAG COMPLEET */}
        {exercise1 && exercise2 && (
          <div className="alert alert-success">
            🎉 Goed gedaan! Je hebt alles vandaag afgerond
          </div>
        )}

      <div className="card bg-base-100 shadow-md p-5 flex justify-between items-center">
  <div>
    <h3 className="font-semibold text-primary">
      Module 2
    </h3>
    <p className="text-sm text-gray-500">
      Ontspanning & mobilisatie
    </p>

    <p className="text-xs text-gray-400">
      {streak}/6 dagen voltooid
    </p>
  </div>

  {module2Unlocked ? (
    m2 ? (
      <span className="badge badge-success">✅ Klaar</span>
    ) : (
      <a href="/module-2" className="btn btn-primary btn-sm">
        Start
      </a>
    )
  ) : (
    <div className="text-center text-xs text-gray-400">
      🔒 Nog {6 - streak} dagen oefenen
    </div>
  )}
</div>

  <div className="grid gap-4">
</div>
{/* MODULE 3 */}
<div className="card bg-base-100 shadow-md p-5 flex justify-between items-center">
  <div>
    <h3 className="font-semibold text-primary">
      Module 3
    </h3>
    <p className="text-sm text-gray-500">
      Ademhaling & ontspanning
    </p>
  </div>

  {m3 ? (
    <span className="badge badge-success">✅ Klaar</span>
  ) : (
    <a href="/module-3" className="btn btn-primary btn-sm">
      Ga naar module
    </a>
  )}
</div>

{/* MODULE 4 */}
<div className="card bg-base-100 shadow-md p-5 flex justify-between items-center">
  <div>
    <h3 className="font-semibold text-primary">
      Module 4
    </h3>
    <p className="text-sm text-gray-500">
      Houding & integratie
    </p>
  </div>

  {m4 ? (
    <span className="badge badge-success">✅ Klaar</span>
  ) : (
    <a href="/module-4" className="btn btn-primary btn-sm">
      Ga naar module
    </a>
  )}
</div>
</div>
    </div>
  );
}
