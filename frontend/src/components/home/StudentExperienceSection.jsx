import {
  FaPlay,
} from "react-icons/fa";

export default function StudentExperienceSection() {
  return (
    <section
      className="
        bg-[#08156f]
        px-20
        py-28
      "
    >
      <div
        className="
          max-w-[1600px]
          mx-auto
          grid
          grid-cols-2
          gap-20
          items-center
        "
      >
        {/* LEFT SIDE */}

        <div
          className="
            relative
            bg-[#dfe3ea]
            rounded-3xl
            overflow-hidden
            h-[650px]
            shadow-2xl
          "
        >
          {/* IMAGE */}

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="dashboard"
            className="
              w-full
              h-full
              object-cover
            "
          />

          {/* PLAY BUTTON */}

          <button
            className="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-32
              h-32
              rounded-full
              bg-[#0b73d9]
              flex
              items-center
              justify-center
              shadow-2xl
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[#095cb0]
              active:scale-95
            "
          >
            <FaPlay className="text-white text-5xl ml-2" />
          </button>
        </div>

        {/* RIGHT SIDE */}

        <div className="text-white">
          <h2
            className="
              text-7xl
              font-bold
              leading-tight
            "
          >
            Une Expérience
            <br />
            Étudiante complète
          </h2>

          <p
            className="
              text-2xl
              text-gray-200
              mt-10
              leading-relaxed
            "
          >
            Les étudiants peuvent
            facilement suivre leurs
            cours, contrôler l'avancement
            des leçons, consulter les
            résultats des quiz et
            poursuivre leur apprentissage
            grâce à un tableau de bord
            personnalisé conçu pour
            améliorer l'expérience
            d'apprentissage en ligne.
          </p>

          {/* BUTTON */}

          <button
            className="
              mt-12
              bg-[#ef4423]
              text-white
              px-10
              py-4
              rounded-full
              text-xl
              transition-all
              duration-300
              hover:bg-[#d73718]
              hover:scale-105
              active:scale-95
              shadow-lg
            "
          >
            Commencer
          </button>
        </div>
      </div>
    </section>
  );
}