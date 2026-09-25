import { useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import { Award, Hash, Calendar } from "lucide-react";

export default function CertificatesPage() {

  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/certificates")
      .then((res) => setCertificates(res.data));
  }, []);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">
          Réussites
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">My Certificates</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Your earned course certificates.
        </p>
      </div>

      {/* Empty state */}
      {certificates.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 flex flex-col items-center gap-3 text-center">
          <div className="bg-yellow-50 text-yellow-500 w-14 h-14 rounded-xl flex items-center justify-center">
            <Award size={24} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-1">No certificates yet</h2>
            <p className="text-sm text-gray-400">Complete a course to earn your first certificate.</p>
          </div>
        </div>
      ) : (

        <div className="space-y-3">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors"
            >
              <div className="bg-yellow-400 h-0.5" />
              <div className="p-5 flex items-center gap-4">

                {/* Icon */}
                <div className="bg-yellow-50 text-yellow-500 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                  <Award size={20} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold text-gray-900 truncate">
                    {certificate.course.title}
                  </h2>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Hash size={11} />
                      {certificate.certificate_number}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={11} />
                      {certificate.issued_at}
                    </span>
                  </div>
                </div>

                {/* Badge */}
                <span className="shrink-0 text-xs font-semibold bg-yellow-50 text-yellow-600 px-2.5 py-1 rounded-full">
                  Certified
                </span>

              </div>
            </div>
          ))}
        </div>

      )}

    </div>
  );
}