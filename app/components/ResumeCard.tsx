import { useState } from "react";
import { Link } from "react-router";
import type { Resume } from "../../types"; //

interface ScoreCircleProps {
    score: number;
}

const ScoreCircle = ({ score }: ScoreCircleProps) => {
    return (
        <div className="relative flex items-center justify-center w-12 h-12">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                    className="stroke-slate-100"
                    strokeWidth="2.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                    className="stroke-indigo-600 transition-all duration-1000"
                    strokeWidth="2.5"
                    strokeDasharray={`${score}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
            </svg>
            <span className="absolute text-[10px] font-bold text-slate-700">{score}/100</span>
        </div>
    );
};

interface ResumeCardProps {
    resume: Resume;
}

const ResumeCard = ({ resume }: ResumeCardProps) => {
    // මෙහිදී 'resumePath' භාවිත කර ඇත
    const { id, companyName, jobTitle, feedback, resumePath } = resume as any;
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPreviewOpen(true);
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
        @keyframes customFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-duration-1000 {
          animation: customFadeIn 1000ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

            <Link
                to={`/resume/${id}`}
                className="resume-card animate-duration-1000 flex flex-col gap-5 p-5 bg-white border border-slate-100 shadow-md rounded-2xl hover:shadow-xl hover:border-indigo-100 transition-all cursor-pointer w-full max-w-sm mx-auto"
            >
                <div className="resume-card-header flex justify-between items-start w-full">
                    <div className="flex flex-col gap-1 text-left">
                        <h2 className="text-slate-900 text-xl font-bold break-words">{companyName}</h2>
                        <h3 className="text-sm break-words text-slate-500 font-medium">{jobTitle}</h3>
                    </div>
                    <div className="flex-shrink-0">
                        <ScoreCircle score={feedback.overallScore} />
                    </div>
                </div>

                <div
                    onClick={handleImageClick}
                    className="gradient-border border border-slate-200 rounded-xl overflow-hidden bg-slate-50 w-full group relative cursor-zoom-in"
                >
                    <img
                        src={resumePath}
                        alt="resume"
                        className="w-full h-[320px] object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-slate-900/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
              Click to Preview
            </span>
                    </div>
                </div>
            </Link>

            {/* IMAGE PREVIEW MODAL */}
            {isPreviewOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
                    onClick={() => setIsPreviewOpen(false)}
                >
                    <button
                        className="absolute top-6 right-6 text-white bg-slate-900/50 p-2 rounded-full w-10 h-10 flex items-center justify-center text-xl"
                        onClick={() => setIsPreviewOpen(false)}
                    >
                        ✕
                    </button>
                    <div
                        className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img src={resumePath} alt="Resume Preview" className="w-full h-auto object-contain" />
                    </div>
                </div>
            )}
        </>
    );
};

export default ResumeCard;