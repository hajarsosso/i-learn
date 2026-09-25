import VisionCard from "./VisionCard";

export default function AboutSection() {
  const cards = [
    {
      title: "Apprentissage\nInteractif",

      description:
        "Accédez à des cours structurés, des leçons vidéo et des quiz conçus pour rendre l'apprentissage en ligne simple et attrayant.",
    },

    {
      title: "Gestion de Cours\nExperte",

      description:
        "Les enseignants peuvent facilement créer des cours, organiser des leçons et suivre les progrès des élèves grâce à des tableaux de bord dédiés.",
    },

    {
      title:
        "Plateforme Sécurisée\net Accessible",

      description:
        "La plateforme est réactive, sécurisée et accessible sur ordinateur, tablette et appareil mobile pour apprendre partout.",
    },
  ];

  return (
    <section className="bg-[#f7f7f7] px-10 py-20">
      <div className="max-w-7xl mx-auto">
        {/* TOP */}

        <div className="text-center">
          <button
            className="
              border
              border-gray-300
              px-8
              py-3
              rounded-full
              text-gray-700
              text-lg
            "
          >
            À propos de nous
          </button>

          <h2
            className="
              text-5xl
              font-bold
              text-black
              mt-8
            "
          >
            Notre Vision Éducative
          </h2>

          <p
            className="
              text-gray-400
              text-xl
              mt-10
              leading-relaxed
            "
          >
            Aider les élèves à apprendre,
            les enseignants à créer et les
            connaissances à se développer
            grâce à la technologie.
          </p>
        </div>

        {/* CARDS */}

        <div className="grid grid-cols-3 gap-10 mt-24">
          {cards.map((card, index) => (
            <VisionCard
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}