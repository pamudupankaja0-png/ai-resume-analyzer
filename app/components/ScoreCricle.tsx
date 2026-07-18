import { Link } from "react-router";
import type { Resume } from "../../types"; //

interface ScoreCircleProps {
    score: number;
}

const ScoreCircle = ({ score }: ScoreCircleProps) => {
    const strokeColor = score >= 70 ? "stroke-emerald-500" : score >= 50 ? "stroke-amber-500" : "stroke-rose-500";
    const textColor = score >= 70 ? "text-emerald-400" : score >= 50 ? "text-amber-400" : "text-rose-400";

    return (
        <div className="relative flex items-center justify-center w-12 h-12">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                    className="stroke-white/10"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                    className={`transition-all duration-1000 ${strokeColor}`}
                    strokeWidth="3"
                    strokeDasharray={`${score}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
            </svg>
            <span className={`absolute text-sm font-bold ${textColor}`}>{score}</span>
        </div>
    );
};

interface ResumeCardProps {
    resume: Resume;
}

const ResumeCard = ({ resume }: ResumeCardProps) => {
    const { id, companyName, jobTitle, feedback } = resume;

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
        @keyframes customFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-duration-1000 {
          animation: customFadeIn 1000ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

            <Link
                to={`/resume/${id}`}
                className="resume-card animate-duration-1000 flex flex-col justify-between p-6 border border-white/10 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 hover:border-white/20 transition-all cursor-pointer h-48 w-full"
            >
                {/* ඉහළ කොටස - Text විස්තර */}
                <div className="flex flex-col gap-1 text-left">
                    <h2 className="text-white text-xl font-bold truncate">{companyName}</h2>
                    <h3 className="text-sm text-gray-400 truncate">{jobTitle}</h3>
                </div>

                {/* පහළ කොටස - ScoreCircle එක දකුණට වෙන්න */}
                <div className="flex justify-end items-center mt-auto">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </Link>
        </>
    );
};

export default ResumeCard;