export default function HeroSection() {
  return (
    <section
      className="
        bg-[#0b1975]
        px-24
        py-24
        flex
        items-center
        justify-between
        gap-20
      "
    >
      {/* LEFT SIDE */}

      <div className="max-w-[700px]">
        <h1
          className="
            text-white
            text-7xl
            font-bold
            leading-tight
          "
        >
          Votre parcours
          d'apprentissage
          <br />
          commence ici
        </h1>

        <p
          className="
            text-white/90
            text-2xl
            leading-10
            mt-10
            max-w-[650px]
          "
        >
          Découvrez des cours,
          visionnez des leçons,
          répondez à des quiz et
          suivez vos progrès, le tout
          sur une plateforme simple
          et intuitive.
        </p>

        {/* BUTTONS */}

        <div className="flex items-center gap-10 mt-14">
          <button
            className="
              border-2
              border-white
              text-white
              px-10
              py-4
              rounded-full
              text-xl
              cursor-pointer
              transition-all
              duration-300
              hover:bg-white
              hover:text-[#0b1975]
              hover:scale-105
              active:scale-95
            "
          >
            Let’s Learn Up
          </button>

          <button
            className="
              text-white
              text-xl
              cursor-pointer
              transition-all
              duration-300
              hover:translate-x-2
              hover:text-blue-200
            "
          >
            Explorer les Cours
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          shadow-2xl
          transition-all
          duration-500
          hover:scale-[1.02]
        "
      >
        <img
          src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="learning"
          className="
            w-[700px]
            h-[450px]
            object-cover
          "
        />
      </div>
    </section>
  );
}