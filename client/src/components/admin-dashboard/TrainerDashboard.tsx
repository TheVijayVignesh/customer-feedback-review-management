import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TrainerCard from "./TrainerCard";
import type { Trainer, Course } from "./types";

const TrainerDashboard: React.FC = () => {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course>("All");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    // Fetch trainers from backend
    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/trainers`);
                const data = await res.json();
                setTrainers(data.data);
            } catch (err) {
                console.error("Failed to fetch trainers", err);
            }
        };

        fetchTrainers();
    }, []);

    const courses = useMemo(
        () => [...new Set(trainers.map((t) => t.course))],
        [trainers]
    );

    const filtered = useMemo(() => {
        return trainers.filter((t) => {
            const matchCourse = selectedCourse === "All" || t.course === selectedCourse;

            const matchSearch =
                t.name.toLowerCase().includes(search.toLowerCase()) ||
                t.course.toLowerCase().includes(search.toLowerCase());

            return matchCourse && matchSearch;
        });
    }, [trainers, selectedCourse, search]);

    return (
        <div className="min-h-screen w-full relative overflow-x-hidden flex bg-gradient-to-br from-[#120530] via-[#5b247a] to-[#2d0a6b] text-[#f0eaff] font-['DM_Sans']">
            {/* Animated Background Blobs */}
            <div className="fixed w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,#5b247a,transparent)] blur-[100px] opacity-35 -top-[120px] -left-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="fixed w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,#e94e77,transparent)] blur-[100px] opacity-30 -bottom-[80px] right-[10%] pointer-events-none animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
            <div className="fixed w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,#2d0a6b,transparent)] blur-[80px] opacity-40 top-[40%] left-[40%] pointer-events-none animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
            
            <Sidebar
                courses={courses}
                selected={selectedCourse}
                onSelect={setSelectedCourse}
                trainerCount={filtered.length}
            />

            <main className="flex-1 p-8 sm:p-12 overflow-y-auto relative z-[2]">
                <header className="flex flex-col lg:flex-row justify-between lg:items-center mb-12 gap-6 pb-6 border-b border-white/[0.05]">
                    <div>
                        <h1 className="font-['Syne'] text-4xl sm:text-[42px] font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white to-[#ff7aa2] tracking-tight mb-2 drop-shadow-sm">
                            Trainer Directory
                        </h1>
                        <p className="text-[15px] text-[#f0eaff]/70 font-medium tracking-wide">
                            {filtered.length} trainer{filtered.length !== 1 ? "s" : ""} found
                        </p>
                    </div>

                    <div className="flex sm:flex-row flex-col gap-4">
                        <div className="relative flex items-center group">
                            <span className="absolute left-5 text-[#f0eaff]/50 group-focus-within:text-[#ff7aa2] transition-colors">🔍</span>
                            <input
                                className="w-[300px] bg-white/[0.07] border border-white/[0.15] rounded-[50px] py-3.5 pr-6 pl-12 text-[#f0eaff] text-sm outline-none placeholder:text-[#f0eaff]/50 focus:border-[#e94e77] focus:bg-white/[0.1] focus:ring-4 focus:ring-[#e94e77]/10 transition-all font-medium backdrop-blur-sm"
                                placeholder="Search by name or course…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="px-8 py-3.5 rounded-[50px] bg-[#e94e77]/[0.22] hover:bg-[#e94e77]/[0.45] border border-[#e94e77]/40 text-[#f0eaff] font-bold cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgba(233,78,119,0.3)] flex items-center gap-2 justify-center"
                        >
                            Logout <span className="opacity-80">🚪</span>
                        </button>
                    </div>
                </header>

                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[350px] gap-6 text-[#f0eaff]/50 bg-white/5 rounded-3xl border border-white/10 border-dashed backdrop-blur-sm">
                        <div className="text-6xl opacity-70">🎓</div>
                        <p className="text-lg font-medium">No trainers match your filters.</p>
                        <button onClick={() => {setSearch(''); setSelectedCourse('All')}} className="mt-2 text-[#ff7aa2] hover:text-[#e94e77] hover:underline font-bold transition-all">Clear Filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7 align-start auto-rows-max">
                        {filtered.map((trainer) => (
                            <TrainerCard key={trainer.id} trainer={trainer} />
                        ))}
                    </div>
                )}

                <button 
                    onClick={() => navigate('/admin-dashboard/sentiment-dashboard')}
                    className="fixed bottom-10 right-10 px-8 py-4 rounded-full bg-gradient-to-r from-[#5b247a] to-[#a52bbf] border border-[#e94e77]/40 text-[#f0eaff] font-bold cursor-pointer transition-all duration-300 ease-out shadow-[0_10px_30px_rgba(91,36,122,0.4)] hover:shadow-[0_15px_40px_rgba(233,78,119,0.5)] hover:-translate-y-1 z-50 flex items-center gap-3 backdrop-blur-md group"
                >
                    <span className="text-xl group-hover:rotate-12 transition-transform">📊</span> 
                    <span>View Analytics</span>
                </button>
            </main>
        </div>
    );
};

export default TrainerDashboard;