import { HelpCircle, Mail } from "lucide-react";

export default function HelpPage() {

    const faqs = [
        {
            q: "How do I enroll in a course?",
            a: "Open the course page and click the Enroll button."
        },
        {
            q: "How do I complete a lesson?",
            a: "Watch the lesson and click 'Mark as completed'."
        },
        {
            q: "How do quizzes work?",
            a: "Complete all lesson content, then start the quiz. Each quiz can only be submitted once."
        },
        {
            q: "How do I earn a certificate?",
            a: "Complete the course and pass its quiz."
        }
    ];

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">
                    Support
                </p>
                <h1 className="text-2xl font-semibold text-gray-900">Help Center</h1>
                <p className="text-sm text-gray-400 mt-0.5">
                    Answers to the most common questions.
                </p>
            </div>

            {/* FAQ card */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
                <div className="bg-blue-500 h-0.5" />
                <div className="p-6">

                    <div className="flex items-center gap-2.5 mb-6">
                        <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                            <HelpCircle size={16} />
                        </div>
                        <h2 className="text-base font-semibold text-gray-900">Frequently asked questions</h2>
                    </div>

                    <div className="space-y-0">
                        {faqs.map((faq, index) => (
                            <div key={index}>
                                <div className="py-4">
                                    <p className="text-sm font-semibold text-gray-900 mb-1">{faq.q}</p>
                                    <p className="text-sm text-gray-400">{faq.a}</p>
                                </div>
                                {index < faqs.length - 1 && <div className="h-px bg-gray-50" />}
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Contact card */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
                <div className="bg-teal-500 h-0.5" />
                <div className="p-6">

                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="bg-teal-50 text-teal-600 w-8 h-8 rounded-lg flex items-center justify-center">
                            <Mail size={16} />
                        </div>
                        <h2 className="text-base font-semibold text-gray-900">Need more help?</h2>
                    </div>

                    <p className="text-sm text-gray-400 mb-3">
                        Contact your instructor or reach us directly.
                    </p>

                    
                         <a  href="mailto:support@i-Learn.ma"
                        className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                        <Mail size={14} />
                        support@i-Learn.ma
                    </a>

                </div>
            </div>

        </div>
    );
}