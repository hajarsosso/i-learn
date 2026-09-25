export default function PartnersSection() {
  const partners = [
    {
      image:
        "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    },

    {
      image:
        "https://cdn-icons-png.flaticon.com/512/5968/5968520.png",
    },

    {
      image:
        "https://cdn-icons-png.flaticon.com/512/5968/5968672.png",
    },

    {
      image:
        "https://cdn-icons-png.flaticon.com/512/5968/5968866.png",
    },
  ];

  return (
    <section
      className="
        bg-[#08156f]
        px-10
        py-20
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* TOP */}

        <div className="text-center">
          <h2
            className="
              text-5xl
              font-bold
              text-white
            "
          >
            Discover Our Partners &
            Collaborators
          </h2>

          <p
            className="
              text-xl
              text-gray-200
              mt-6
              leading-relaxed
              max-w-3xl
              mx-auto
            "
          >
            Discover interactive courses,
            track your progress, and learn
            through structured lessons and
            quizzes.
          </p>
        </div>

        {/* LOGOS */}

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-14
            items-center
            mt-20
          "
        >
          {partners.map(
            (partner, index) => (
              <div
                key={index}
                className="
                  flex
                  justify-center
                  transition-all
                  duration-300
                  hover:scale-110
                "
              >
                <img
                  src={partner.image}
                  alt="partner"
                  className="
                    h-32
                    object-contain
                    opacity-90
                    hover:opacity-100
                    transition-all
                    duration-300
                  "
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}