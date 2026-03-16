import React from "react";
import type { Course } from "./types";

interface SidebarProps {
    courses: string[];
    selected: Course;
    onSelect: (course: Course) => void;
    trainerCount: number;
}

const NAV_ICONS: Record<string, string> = {
    All: "⬡",
    "Web Development": "🌐",
    "Data Science": "📊",
    "UI/UX Design": "🎨",
    "Machine Learning": "🤖",
    Cybersecurity: "🔐",
    "Mobile Development": "📱",
    DevOps: "⚙️",
};

const Sidebar: React.FC<SidebarProps> = ({ courses, selected, onSelect, trainerCount }) => {
    return (
        <aside className="w-[270px] min-h-screen bg-white/[0.07] backdrop-blur-[18px] border-r border-white-[0.15] flex flex-col pt-8 pb-6 px-5 sticky top-0 z-10 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-3 mb-10 pl-2">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#e94e77] to-[#5b247a] flex items-center justify-center font-['Syne'] font-extrabold text-[#f0eaff] text-xl shadow-md">
                    A
                </div>
                <div className="flex flex-col">
                    <div className="font-['Syne'] font-bold text-[#f0eaff] text-lg leading-tight">AdminPanel</div>
                    <div className="text-sm text-[#f0eaff]/60 font-['DM_Sans']">Trainer Management</div>
                </div>
            </div>

            <div className="text-xs font-bold text-[#f0eaff]/40 tracking-widest uppercase mb-4 pl-3">
                FILTER BY COURSE
            </div>

            <nav className="flex flex-col gap-2 flex-1 relative z-10">
                {["All", ...courses].map((course) => (
                    <button
                        key={course}
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl border transition-all duration-200 cursor-pointer font-['DM_Sans'] group relative overflow-hidden ${
                            selected === course
                                ? "bg-gradient-to-br from-[#e94e77]/[0.22] to-[#5b247a]/[0.35] border-[#e94e77]/40 text-[#f0eaff] shadow-inner"
                                : "bg-transparent border-transparent text-[#f0eaff]/60 hover:bg-white/[0.07] hover:border-white/[0.15] hover:text-[#f0eaff]"
                        }`}
                        onClick={() => onSelect(course as Course)}
                    >
                        <span className={`text-xl transition-transform duration-200 ${selected === course ? 'scale-110 drop-shadow-md' : 'group-hover:scale-110'}`}>
                            {NAV_ICONS[course] ?? "📚"}
                        </span>
                        <span className="font-medium text-left flex-1 whitespace-nowrap text-[15px]">{course}</span>
                        {selected === course && (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#ff7aa2] shadow-[0_0_8px_#ff7aa2] animate-pulse absolute right-4 hidden sm:block" />
                        )}
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10 px-3">
                <div className="flex items-center gap-4">
                    <span className="text-3xl font-extrabold font-['Syne'] text-[#f0eaff] bg-clip-text text-transparent bg-gradient-to-b from-[#f0eaff] to-[#a52bbf]">
                        {trainerCount}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-[#f0eaff]/50 font-semibold leading-tight max-w-[80px]">
                        Trainers Listed
                    </span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;