export default function Aanpak() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">

      {/* HERO */}
      <div className="hero bg-base-100 py-12 shadow-sm">
        <div className="hero-content text-center max-w-2xl">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              Aanpak van kaakklachten
            </h1>

            <p className="py-4 text-base text-gray-600">
              Kaakklachten behandelen we met een combinatie van inzicht,
              therapie en actieve oefeningen.
            </p>

            <a href="/module-1" className="btn btn-primary mt-2">
              Start Module 1
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto p-6 space-y-10">

        {/* STAPPENPLAN */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Ons 4-stappenplan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="card bg-base-100 shadow-md p-5">
              <span className="text-2xl font-bold text-primary">1</span>
              <h3 className="font-semibold">Inzicht</h3>
              <p>Begrip van het probleem en je kaakgedrag</p>
            </div>

            <div className="card bg-base-100 shadow-md p-5">
              <span className="text-2xl font-bold text-primary">2</span>
              <h3 className="font-semibold">Herstel</h3>
              <p>Balans in spieren en ontspanning</p>
            </div>

            <div className="card bg-base-100 shadow-md p-5">
              <span className="text-2xl font-bold text-primary">3</span>
              <h3 className="font-semibold">Gedrag</h3>
              <p>Verandering van kaakbelasting</p>
            </div>

            <div className="card bg-base-100 shadow-md p-5">
              <span className="text-2xl font-bold text-primary">4</span>
              <h3 className="font-semibold">Voorkomen</h3>
              <p>Terugval voorkomen</p>
            </div>

          </div>
        </section>

        {/* VIDEO */}
        <section className="card bg-base-100 shadow-xl">
          <figure className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/Nj96eWDtesY"
              title="Kaak fysiotherapie uitleg"
              allowFullScreen
            />
          </figure>
          <div className="card-body">
            <p className="text-sm text-gray-600">
              In deze video leggen we uit hoe kaakklachten ontstaan.
            </p>
          </div>
        </section>
        <section className="card bg-base-100 shadow-xl overflow-hidden">
          <figure className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/YwbQS0zQv5E"
              title="Uitleg behandeling"
              allowFullScreen
            />
          </figure>

          <div className="card-body">
            <p className="text-sm text-gray-600">
              In deze video leggen we uit hoe de behandeling werkt.
            </p>

            <div className="card-actions justify-between items-center">

              <div className="flex gap-4">
                <div className="stat">
                  <div className="stat-title">Duur</div>
                  <div className="stat-value text-primary text-lg">7 min</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Niveau</div>
                  <div className="stat-value text-primary text-lg">Beginner</div>
                </div>
              </div>

              <a href="/afspraak" className="btn btn-outline btn-primary">
                Plan afspraak
              </a>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
