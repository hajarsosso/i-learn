import { useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import { Mail, CalendarDays, BookOpen, CheckCircle, ClipboardList, Award } from "lucide-react";

export default function ProfilePage() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axiosClient.get("/student/profile").then(res => setProfile(res.data));
    }, []);

    if (!profile) {
        return (
            <div className="flex items-center gap-2 p-10 text-sm text-gray-400">
                <span className="animate-pulse">Loading profile…</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">
                    Mon espace
                </p>
                <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
            </div>

            {/* Profile card */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
                <div className="bg-blue-500 h-0.5" />
                <div className="p-6">

                    {/* Avatar + name */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-semibold shrink-0">
                            {profile.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">{profile.name}</h2>
                            <span className="inline-block bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-semibold mt-0.5">
                                {profile.role}
                            </span>
                        </div>
                    </div>

                    {/* Info rows */}
                    <div className="space-y-4">

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <Mail size={14} />
                                Email
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{profile.email}</span>
                        </div>

                        <div className="h-px bg-gray-50" />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <CalendarDays size={14} />
                                Joined
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{profile.joined_at}</span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                <StatCard
                    title="Courses"
                    value={profile.stats.enrolled_courses}
                    icon={BookOpen}
                    accent="bg-blue-500"
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                />

                <StatCard
                    title="Completed"
                    value={profile.stats.completed_courses}
                    icon={CheckCircle}
                    accent="bg-green-500"
                    iconBg="bg-green-50"
                    iconColor="text-green-600"
                />

                <StatCard
                    title="Quiz Attempts"
                    value={profile.stats.quiz_attempts}
                    icon={ClipboardList}
                    accent="bg-amber-500"
                    iconBg="bg-amber-50"
                    iconColor="text-amber-600"
                />

                <StatCard
                    title="Certificates"
                    value={profile.stats.certificates}
                    icon={Award}
                    accent="bg-teal-500"
                    iconBg="bg-teal-50"
                    iconColor="text-teal-600"
                />

            </div>

        </div>
    );
}

function StatCard({ title, value, icon: Icon, accent, iconBg, iconColor }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
            <div className={`${accent} h-0.5`} />
            <div className="p-4">
                <div className={`${iconBg} ${iconColor} w-9 h-9 rounded-lg flex items-center justify-center mb-3`}>
                    <Icon size={18} />
                </div>
                <p className="text-xs text-gray-400 mb-1">{title}</p>
                <p className="text-3xl font-semibold text-gray-900 leading-none">{value}</p>
            </div>
        </div>
    );
}