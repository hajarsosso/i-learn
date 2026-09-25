import CourseCard from "./CourseCard";
import CategoryButton from "./CategoryButton";

export default function CoursesSection() {
  const categories = [
    "Data Science",
    "Graphic Design",
    "Marketing",
    "Web Development",
    "UI/UX Design",
    "Business Management",
  ];

  const courses = [
    {
      title: "Python Learning",
      author: "John Doe",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },

    {
      title: "Figma UI Design",
      author: "John Doe",
      category: "UI/UX Design",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },

    {
      title: "Business Management 101",
      author: "John Doe",
      category: "Business",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    },

    {
      title: "Python Learning",
      author: "John Doe",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    },

    {
      title: "Creative Design",
      author: "John Doe",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931",
    },

    {
      title: "Marketing Basics",
      author: "John Doe",
      category: "Marketing",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    },
  ];

  return (
    <section className="px-20 py-28 bg-[#f7f7f7]">
      {/* TOP */}

      <div className="text-center">
        <button
          className="
            border
            border-gray-300
            px-6
            py-2
            rounded-full
            text-gray-700
          "
        >
          Nos cours
        </button>

        <h2
          className="
            text-6xl
            font-bold
            text-[#111827]
            mt-8
            leading-tight
          "
        >
          Découvrez de nouvelles
          opportunités
          <br />
          d'apprentissage
        </h2>

        <p
          className="
            text-gray-400
            text-2xl
            mt-8
            leading-10
          "
        >
          Découvrez des cours interactifs,
          suivez vos progrès et
          <br />
          apprenez grâce à des leçons et
          des quiz structurés.
        </p>
      </div>

      {/* CATEGORIES */}

      <div className="flex flex-wrap justify-center gap-5 mt-14">
        {categories.map((category) => (
          <CategoryButton
            key={category}
            text={category}
          />
        ))}
      </div>

      {/* COURSES */}

      <div className="grid grid-cols-3 gap-10 mt-20">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            image={course.image}
            title={course.title}
            author={course.author}
            category={course.category}
          />
        ))}
      </div>

      {/* BUTTON */}

      <div className="flex justify-center mt-20">
        <button
          className="
            bg-[#1f2f8d]
            text-white
            px-10
            py-4
            rounded-full
            text-lg
            transition-all
            duration-300
            hover:bg-[#162472]
            hover:scale-105
            active:scale-95
          "
        >
          Explorez Tous les Cours
        </button>
      </div>
    </section>
  );
}