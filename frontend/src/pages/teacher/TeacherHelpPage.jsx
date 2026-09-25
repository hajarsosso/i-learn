import {
  HelpCircle,
  BookOpen,
  Users,
  ClipboardList,
  MessageCircle,
  Mail,
} from "lucide-react";

function HelpCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-gray-200 transition-colors">

      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
        {icon}
      </div>

      <h3 className="text-base font-semibold text-gray-900">
        {title}
      </h3>

      <p className="text-sm text-gray-400 mt-2 leading-relaxed">
        {description}
      </p>

    </div>
  );
}

export default function TeacherHelpPage() {
  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">

          <HelpCircle size={22} className="text-blue-500" />

          Centre d'aide

        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Tout ce qu'il faut savoir pour utiliser la plateforme enseignant.
        </p>

      </div>

      {/* HELP CARDS */}

      <div className="grid grid-cols-2 gap-5">

        <HelpCard
          icon={<BookOpen size={18} />}
          title="Gestion des cours"
          description="Créez de nouveaux cours, modifiez leurs informations, ajoutez des leçons et organisez votre contenu pédagogique."
        />

        <HelpCard
          icon={<Users size={18} />}
          title="Étudiants"
          description="Suivez les étudiants inscrits, leur progression et consultez leur activité."
        />

        <HelpCard
          icon={<ClipboardList size={18} />}
          title="Quizzes"
          description="Créez des quizzes, ajoutez des questions, évaluez les étudiants et consultez leurs tentatives."
        />

        <HelpCard
          icon={<MessageCircle size={18} />}
          title="Conseils pédagogiques"
          description="Gardez des leçons courtes, des vidéos claires et mettez à jour vos quizzes pour engager vos étudiants."
        />

      </div>

      {/* FAQ */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

        <h2 className="text-lg font-bold text-gray-900 mb-6">

          Questions fréquentes

        </h2>

        <div className="space-y-6">

          <div>

            <h3 className="font-semibold text-sm text-gray-900">
              Comment créer un nouveau cours ?
            </h3>

            <p className="text-sm text-gray-400 mt-1.5">
              Ouvrez "Mes Cours" et cliquez sur le bouton "Créer un cours".
            </p>

          </div>

          <div className="pt-6 border-t border-gray-50">

            <h3 className="font-semibold text-sm text-gray-900">
              Comment les étudiants accèdent-ils à mon cours ?
            </h3>

            <p className="text-sm text-gray-400 mt-1.5">
              Une fois votre cours approuvé, les étudiants peuvent s'y inscrire directement depuis la page Cours.
            </p>

          </div>

          <div className="pt-6 border-t border-gray-50">

            <h3 className="font-semibold text-sm text-gray-900">
              Puis-je modifier une leçon après publication ?
            </h3>

            <p className="text-sm text-gray-400 mt-1.5">
              Oui. Les leçons et quizzes peuvent être modifiés à tout moment depuis la page de gestion du cours.
            </p>

          </div>

        </div>

      </div>

      {/* CONTACT */}

      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">

        <h2 className="text-lg font-bold text-gray-900">

          Besoin d'aide supplémentaire ?

        </h2>

        <p className="text-sm text-gray-500 mt-1.5">
          Contactez l'administrateur de la plateforme en cas de problème technique.
        </p>

        <div className="flex items-center gap-2 mt-4">

          <Mail size={16} className="text-blue-500" />

          <span className="text-sm font-medium text-gray-700">support@i-Learn.ma</span>

        </div>

      </div>

    </div>
  );
}