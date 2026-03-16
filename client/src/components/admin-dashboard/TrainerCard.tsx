import React from "react";
import type { Trainer } from "./types";

interface TrainerCardProps {
    trainer: Trainer;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
    const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(trainer.rating));

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(233,78,119,0.25)] flex flex-col items-start text-left relative overflow-hidden group">
            {/* Top Header section */}
            <div className="flex items-start gap-4 w-full">
                <div className="w-[52px] h-[52px] rounded-xl bg-gradient-to-br from-[#5b247a] to-[#e94e77] text-white flex items-center justify-center font-bold font-['Syne'] shrink-0 text-lg shadow-md">
                    {trainer.avatar}
                </div>
                <div className="flex flex-col flex-1">
                    <h3 className="text-[#f0eaff] font-bold text-lg leading-tight">{trainer.name}</h3>
                    <div className="inline-block self-start mt-1.5 px-3 py-1 rounded-full bg-[#e94e77]/20 border border-[#e94e77]/40 text-[#ff7aa2] text-xs font-medium">
                        {trainer.course}
                    </div>
                </div>
            </div>

            <p className="mt-4 text-sm text-[#f0eaff]/60 leading-relaxed font-['DM_Sans'] flex-1">
                {trainer.bio}
            </p>

            {/* Stats section */}
            <div className="flex w-full mt-5 gap-3">
                <div className="flex flex-col">
                    <span className="text-[#f0eaff] text-lg font-bold leading-none">{trainer.students}</span>
                    <span className="text-[#f0eaff]/50 text-xs font-semibold uppercase tracking-wider mt-1">Students</span>
                </div>
                <div className="w-px bg-white/15 h-auto mx-1"></div>
                <div className="flex flex-col flex-1">
                    <span className="text-[#f0eaff] text-sm font-bold leading-none truncate block whitespace-nowrap overflow-hidden pr-2">{trainer.experience}</span>
                    <span className="text-[#f0eaff]/50 text-xs font-semibold uppercase tracking-wider mt-1">Experience</span>
                </div>
                <div className="w-px bg-white/15 h-auto mx-1"></div>
                <div className="flex flex-col items-end">
                    <span className="text-[#f0eaff] text-lg font-bold leading-none">{trainer.rating.toFixed(1)}</span>
                    <span className="text-[#f0eaff]/50 text-xs font-semibold uppercase tracking-wider mt-1">Rating</span>
                </div>
            </div>

            {/* Stars row */}
            <div className="flex gap-1 mt-4">
                {stars.map((filled, i) => (
                    <span key={i} className={`text-base drop-shadow-sm ${filled ? "text-[#ff7aa2]" : "text-white/15"}`}>
                        ★
                    </span>
                ))}
            </div>
            
            {/* Subtle interactive background glow */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#e94e77]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-b-2xl" />
        </div>
    );
};

export default TrainerCard;